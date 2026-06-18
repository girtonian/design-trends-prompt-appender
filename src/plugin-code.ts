/**
 * Figma Plugin Sandbox Code
 * This file runs in Figma's sandbox environment and has access to the Figma API
 * It communicates with the UI (React app) via postMessage
 */

import {
  ASPECT_RATIO_STORAGE_KEY,
  GENERATION_TARGET_KEY,
  getGenerationFrameName,
  type GenerationTargetData,
} from "./app/plugin/utils/generationFrame";
import {
  isAspectRatioPreset,
  type AspectRatioPreset,
} from "./app/plugin/utils/aspectRatioPresets";

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
    })),
  });
}

let lastGenerationFrameId: string | null = null;

function getGenerationTargetData(node: BaseNode): GenerationTargetData | null {
  if (!("getPluginData" in node)) return null;

  const raw = node.getPluginData(GENERATION_TARGET_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as GenerationTargetData;
  } catch {
    return null;
  }
}

function isGenerationFrame(node: BaseNode): node is FrameNode {
  return node.type === "FRAME" && getGenerationTargetData(node) !== null;
}

function applyGenerationFrameMetadata(
  frame: FrameNode,
  data: GenerationTargetData
) {
  frame.setPluginData(GENERATION_TARGET_KEY, JSON.stringify(data));
  frame.name = getGenerationFrameName(data.aspectRatio, data.trendTitle);
}

function configureGenerationFrame(frame: FrameNode, width: number, height: number) {
  frame.resize(width, height);
  frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
}

function findGenerationFrameByTrendId(trendId: number): FrameNode | null {
  for (const node of figma.currentPage.children) {
    if (node.type !== "FRAME") continue;
    const data = getGenerationTargetData(node);
    if (data?.trendId === trendId) {
      return node;
    }
  }
  return null;
}

function resolveGenerationFrame(trendId: number): FrameNode | null {
  const selection = figma.currentPage.selection;
  if (selection.length === 1 && isGenerationFrame(selection[0])) {
    return selection[0];
  }

  const existing = findGenerationFrameByTrendId(trendId);
  if (existing) return existing;

  if (lastGenerationFrameId) {
    const lastFrame = figma.getNodeById(lastGenerationFrameId);
    if (lastFrame && lastFrame.type === "FRAME" && isGenerationFrame(lastFrame)) {
      return lastFrame;
    }
  }

  return null;
}

function createGenerationFrameAtViewportCenter(
  width: number,
  height: number
): FrameNode {
  const frame = figma.createFrame();
  configureGenerationFrame(frame, width, height);

  const center = figma.viewport.center;
  frame.x = center.x - width / 2;
  frame.y = center.y - height / 2;

  figma.currentPage.appendChild(frame);
  return frame;
}

function finalizeGenerationFrame(
  frame: FrameNode,
  data: GenerationTargetData,
  width: number,
  height: number
) {
  configureGenerationFrame(frame, width, height);
  applyGenerationFrameMetadata(frame, data);
  figma.currentPage.selection = [frame];
  figma.viewport.scrollAndZoomIntoView([frame]);
  lastGenerationFrameId = frame.id;

  figma.ui.postMessage({
    type: "generation-frame-ready",
    frameId: frame.id,
    width,
    height,
    aspectRatio: data.aspectRatio,
  });
}

function prepareGenerationFrame(payload: {
  trendId: number;
  trendTitle: string;
  aspectRatio: AspectRatioPreset;
  width: number;
  height: number;
}) {
  const data: GenerationTargetData = {
    aspectRatio: payload.aspectRatio,
    trendId: payload.trendId,
    trendTitle: payload.trendTitle,
    createdAt: Date.now(),
  };

  const existing = resolveGenerationFrame(payload.trendId);
  const frame =
    existing ?? createGenerationFrameAtViewportCenter(payload.width, payload.height);

  finalizeGenerationFrame(frame, data, payload.width, payload.height);
  postSelectionChanged();
}

function resizeGenerationFrame(payload: {
  aspectRatio: AspectRatioPreset;
  width: number;
  height: number;
  trendTitle?: string;
}) {
  const selection = figma.currentPage.selection;
  let frame: FrameNode | null = null;

  if (selection.length === 1 && isGenerationFrame(selection[0])) {
    frame = selection[0];
  } else if (lastGenerationFrameId) {
    const lastFrame = figma.getNodeById(lastGenerationFrameId);
    if (lastFrame && lastFrame.type === "FRAME" && isGenerationFrame(lastFrame)) {
      frame = lastFrame;
    }
  }

  if (!frame) return;

  const existing = getGenerationTargetData(frame);
  const data: GenerationTargetData = {
    aspectRatio: payload.aspectRatio,
    trendId: existing?.trendId ?? 0,
    trendTitle: payload.trendTitle ?? existing?.trendTitle ?? "Untitled",
    createdAt: existing?.createdAt ?? Date.now(),
  };

  finalizeGenerationFrame(frame, data, payload.width, payload.height);
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
      prepareGenerationFrame({
        trendId: msg.trendId,
        trendTitle: msg.trendTitle,
        aspectRatio: msg.aspectRatio,
        width: msg.width,
        height: msg.height,
      });
      break;
    }

    case 'resize-generation-frame': {
      resizeGenerationFrame({
        aspectRatio: msg.aspectRatio,
        width: msg.width,
        height: msg.height,
        trendTitle: msg.trendTitle,
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
