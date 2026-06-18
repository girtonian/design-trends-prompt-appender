/**
 * Figma Plugin Sandbox Code
 * This file runs in Figma's sandbox environment and has access to the Figma API
 * It communicates with the UI (React app) via postMessage
 */

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
})();
