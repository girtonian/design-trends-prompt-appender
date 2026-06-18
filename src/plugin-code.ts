/**
 * Figma Plugin Sandbox Code
 * This file runs in Figma's sandbox environment and has access to the Figma API
 * It communicates with the UI (React app) via postMessage
 */

import { ASPECT_RATIO_STORAGE_KEY } from "./app/plugin/utils/generationFrame";
import {
  isAspectRatioPreset,
  type AspectRatioPreset,
} from "./app/plugin/utils/aspectRatioPresets";
import {
  findMakeImageTargetInSelection,
  isMakeImageTarget,
  resizeMakeImageTarget,
  tagMakeImageTarget,
} from "./app/plugin/utils/makeImageTarget";

const UI_SIZE_KEY = 'uiSize';
const DEFAULT_UI_SIZE = { width: 360, height: 520 };
const MIN_UI_SIZE = { width: 280, height: 400 };
const MAX_UI_SIZE = { width: 680, height: 900 };
const RELAUNCH_COMMAND = 'open';

function clampUiSize(width: number, height: number) {
  return {
    width: Math.min(MAX_UI_SIZE.width, Math.max(MIN_UI_SIZE.width, Math.round(width))),
    height: Math.min(MAX_UI_SIZE.height, Math.max(MIN_UI_SIZE.height, Math.round(height))),
  };
}

function canSetRelaunchData(node: BaseNode): node is SceneNode {
  return 'setRelaunchData' in node;
}

function setRelaunchForNode(node: BaseNode) {
  if (canSetRelaunchData(node)) {
    node.setRelaunchData({ [RELAUNCH_COMMAND]: '' });
  }
}

function clearRelaunchForNode(node: BaseNode) {
  if (canSetRelaunchData(node)) {
    node.setRelaunchData({});
  }
}

async function loadUiSize() {
  try {
    const saved = await figma.clientStorage.getAsync(UI_SIZE_KEY);
    if (
      saved &&
      typeof saved === 'object' &&
      typeof (saved as { width?: number }).width === 'number' &&
      typeof (saved as { height?: number }).height === 'number'
    ) {
      return clampUiSize(
        (saved as { width: number }).width,
        (saved as { height: number }).height
      );
    }
  } catch {
    // Use default size
  }
  return DEFAULT_UI_SIZE;
}

async function persistUiSize(size: { width: number; height: number }) {
  try {
    await figma.clientStorage.setAsync(UI_SIZE_KEY, size);
  } catch {
    // Non-fatal
  }
}

function postSelectionChanged() {
  figma.ui.postMessage({
    type: 'selection-changed',
    selection: figma.currentPage.selection.map((node) => ({
      id: node.id,
      name: node.name,
      type: node.type,
      isMakeImageTarget: isMakeImageTarget(node),
    })),
  });
}

let lastMakeImageTargetId: string | null = null;

function resolveMakeImageTarget(): (RectangleNode | FrameNode) | null {
  const fromSelection = findMakeImageTargetInSelection(figma.currentPage.selection);
  if (fromSelection) return fromSelection;

  if (lastMakeImageTargetId) {
    const node = figma.getNodeById(lastMakeImageTargetId);
    if (node && isMakeImageTarget(node)) return node;
  }

  return null;
}

function postGenerationTargetReady(payload: {
  resized: boolean;
  userInitiated: boolean;
  aspectRatio: AspectRatioPreset;
  width: number;
  height: number;
  node?: RectangleNode | FrameNode;
}) {
  figma.ui.postMessage({
    type: "generation-target-ready",
    resized: payload.resized,
    userInitiated: payload.userInitiated,
    aspectRatio: payload.aspectRatio,
    width: payload.width,
    height: payload.height,
    nodeId: payload.node?.id,
    nodeName: payload.node?.name,
  });
}

function applyGenerationTargetSize(payload: {
  aspectRatio: AspectRatioPreset;
  width: number;
  height: number;
  userInitiated?: boolean;
}): boolean {
  const userInitiated = payload.userInitiated ?? false;
  const target = resolveMakeImageTarget();
  if (!target) {
    postGenerationTargetReady({
      resized: false,
      userInitiated,
      aspectRatio: payload.aspectRatio,
      width: payload.width,
      height: payload.height,
    });
    return false;
  }

  resizeMakeImageTarget(target, payload.width, payload.height);
  tagMakeImageTarget(target, payload.aspectRatio);
  figma.currentPage.selection = [target];
  figma.viewport.scrollAndZoomIntoView([target]);
  lastMakeImageTargetId = target.id;

  postGenerationTargetReady({
    resized: true,
    userInitiated,
    aspectRatio: payload.aspectRatio,
    width: payload.width,
    height: payload.height,
    node: target,
  });

  return true;
}

function prepareGenerationTarget(payload: {
  aspectRatio: AspectRatioPreset;
  width: number;
  height: number;
}) {
  applyGenerationTargetSize({ ...payload, userInitiated: false });
  postSelectionChanged();
}

function resizeGenerationTarget(payload: {
  aspectRatio: AspectRatioPreset;
  width: number;
  height: number;
  userInitiated?: boolean;
}) {
  applyGenerationTargetSize(payload);
  postSelectionChanged();
}

/**
 * Message handler for UI -> Plugin communication
 */
figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case 'get-selection':
      postSelectionChanged();
      break;

    case 'save-trend-data': {
      const { nodeIds, trendData } = msg;
      nodeIds.forEach((nodeId: string) => {
        const node = figma.getNodeById(nodeId);
        if (node && canStoreData(node)) {
          const existing = getStoredTrendData(node);
          const baseLayerName = resolveBaseLayerName(node, existing);
          const dataToStore = { ...trendData, baseLayerName };

          node.setPluginData('designTrend', JSON.stringify(dataToStore));
          applyTrendToLayerName(node, baseLayerName, trendData.trendTitle);
          setRelaunchForNode(node);
        }
      });
      figma.ui.postMessage({
        type: 'save-success',
        count: nodeIds.length,
      });
      break;
    }

    case 'get-trend-data': {
      const { nodeId } = msg;
      const targetNode = figma.getNodeById(nodeId);
      if (targetNode && canStoreData(targetNode)) {
        const data = targetNode.getPluginData('designTrend');
        figma.ui.postMessage({
          type: 'trend-data',
          nodeId,
          data: data ? JSON.parse(data) : null,
        });
      } else {
        figma.ui.postMessage({
          type: 'trend-data',
          nodeId,
          data: null,
        });
      }
      break;
    }

    case 'clear-trend-data': {
      const { nodeIds: clearNodeIds } = msg;
      clearNodeIds.forEach((nodeId: string) => {
        const node = figma.getNodeById(nodeId);
        if (node && canStoreData(node)) {
          const existing = getStoredTrendData(node);
          node.setPluginData('designTrend', '');
          restoreBaseLayerName(node, existing);
          clearRelaunchForNode(node);
        }
      });
      figma.ui.postMessage({
        type: 'clear-success',
        count: clearNodeIds.length,
      });
      break;
    }

    case 'resize-ui': {
      const size = clampUiSize(msg.width, msg.height);
      figma.ui.resize(size.width, size.height);
      void persistUiSize(size);
      figma.ui.postMessage({
        type: 'ui-resized',
        width: size.width,
        height: size.height,
      });
      break;
    }

    case 'prepare-generation-frame': {
      prepareGenerationTarget({
        aspectRatio: msg.aspectRatio,
        width: msg.width,
        height: msg.height,
      });
      break;
    }

    case 'resize-generation-frame': {
      resizeGenerationTarget({
        aspectRatio: msg.aspectRatio,
        width: msg.width,
        height: msg.height,
        userInitiated: msg.userInitiated === true,
      });
      break;
    }

    case 'save-aspect-ratio': {
      if (isAspectRatioPreset(msg.aspectRatio)) {
        void figma.clientStorage.setAsync(ASPECT_RATIO_STORAGE_KEY, msg.aspectRatio);
      }
      break;
    }

    case 'load-aspect-ratio': {
      void (async () => {
        try {
          const saved = await figma.clientStorage.getAsync(ASPECT_RATIO_STORAGE_KEY);
          figma.ui.postMessage({
            type: 'aspect-ratio-preference',
            aspectRatio:
              typeof saved === 'string' && isAspectRatioPreset(saved) ? saved : null,
          });
        } catch {
          figma.ui.postMessage({
            type: 'aspect-ratio-preference',
            aspectRatio: null,
          });
        }
      })();
      break;
    }

    case 'close-plugin':
      figma.closePlugin();
      break;

    default:
      console.warn('Unknown message type:', msg.type);
  }
};

figma.on('selectionchange', () => {
  postSelectionChanged();
});

const TREND_NAME_SEPARATOR = ' — ';

interface StoredTrendData {
  trendTitle: string;
  baseLayerName?: string;
}

function canStoreData(node: BaseNode): boolean {
  const supportedTypes = [
    'FRAME',
    'COMPONENT',
    'COMPONENT_SET',
    'INSTANCE',
    'RECTANGLE',
    'ELLIPSE',
    'POLYGON',
    'STAR',
    'VECTOR',
    'TEXT',
    'GROUP',
    'SECTION',
  ];

  return supportedTypes.includes(node.type);
}

function canRename(node: BaseNode): node is SceneNode {
  return 'name' in node;
}

function getTrendNameSuffix(trendTitle: string): string {
  return `${TREND_NAME_SEPARATOR}${trendTitle}`;
}

function stripTrendNameSuffix(name: string, trendTitle: string): string {
  const suffix = getTrendNameSuffix(trendTitle);
  return name.endsWith(suffix) ? name.slice(0, -suffix.length) : name;
}

function getStoredTrendData(node: BaseNode): StoredTrendData | null {
  const raw = node.getPluginData('designTrend');
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredTrendData;
  } catch {
    return null;
  }
}

function resolveBaseLayerName(
  node: BaseNode,
  existing: StoredTrendData | null
): string {
  if (existing?.baseLayerName) {
    return existing.baseLayerName;
  }

  if (!canRename(node)) {
    return '';
  }

  if (existing?.trendTitle) {
    return stripTrendNameSuffix(node.name, existing.trendTitle);
  }

  return node.name;
}

function applyTrendToLayerName(
  node: BaseNode,
  baseLayerName: string,
  trendTitle: string
): void {
  if (!canRename(node) || !baseLayerName) return;
  node.name = `${baseLayerName}${getTrendNameSuffix(trendTitle)}`;
}

function restoreBaseLayerName(
  node: BaseNode,
  existing: StoredTrendData | null
): void {
  if (!canRename(node) || !existing) return;

  const baseName =
    existing.baseLayerName ??
    (existing.trendTitle
      ? stripTrendNameSuffix(node.name, existing.trendTitle)
      : null);

  if (baseName) {
    node.name = baseName;
  }
}

void (async () => {
  const size = await loadUiSize();
  figma.showUI(__html__, {
    width: size.width,
    height: size.height,
    themeColors: true,
  });
  postSelectionChanged();

  try {
    const saved = await figma.clientStorage.getAsync(ASPECT_RATIO_STORAGE_KEY);
    figma.ui.postMessage({
      type: 'aspect-ratio-preference',
      aspectRatio:
        typeof saved === 'string' && isAspectRatioPreset(saved) ? saved : null,
    });
  } catch {
    figma.ui.postMessage({
      type: 'aspect-ratio-preference',
      aspectRatio: null,
    });
  }
})();
