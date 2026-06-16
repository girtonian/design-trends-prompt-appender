/**
 * Figma Plugin Sandbox Code
 * This file runs in Figma's sandbox environment and has access to the Figma API
 * It communicates with the UI (React app) via postMessage
 */

// Show the plugin UI
figma.showUI(__html__, {
  width: 680,
  height: 780,
  themeColors: true,
});

/**
 * Message handler for UI -> Plugin communication
 * The React app sends messages here to interact with Figma nodes
 */
figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case 'get-selection':
      // Send current selection to UI
      figma.ui.postMessage({
        type: 'selection-changed',
        selection: figma.currentPage.selection.map((node) => ({
          id: node.id,
          name: node.name,
          type: node.type,
        })),
      });
      break;

    case 'save-trend-data':
      // Save trend data to node(s) and append trend to layer name
      const { nodeIds, trendData } = msg;
      nodeIds.forEach((nodeId: string) => {
        const node = figma.getNodeById(nodeId);
        if (node && canStoreData(node)) {
          const existing = getStoredTrendData(node);
          const baseLayerName = resolveBaseLayerName(node, existing);
          const dataToStore = { ...trendData, baseLayerName };

          node.setPluginData('designTrend', JSON.stringify(dataToStore));
          applyTrendToLayerName(node, baseLayerName, trendData.trendTitle);
        }
      });
      figma.ui.postMessage({
        type: 'save-success',
        count: nodeIds.length,
      });
      break;

    case 'get-trend-data':
      // Retrieve trend data from a node
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

    case 'clear-trend-data':
      // Clear trend data from node(s) and restore original layer name
      const { nodeIds: clearNodeIds } = msg;
      clearNodeIds.forEach((nodeId: string) => {
        const node = figma.getNodeById(nodeId);
        if (node && canStoreData(node)) {
          const existing = getStoredTrendData(node);
          node.setPluginData('designTrend', '');
          restoreBaseLayerName(node, existing);
        }
      });
      figma.ui.postMessage({
        type: 'clear-success',
        count: clearNodeIds.length,
      });
      break;

    case 'close-plugin':
      figma.closePlugin();
      break;

    default:
      console.warn('Unknown message type:', msg.type);
  }
};

/**
 * Listen for selection changes and notify UI
 */
figma.on('selectionchange', () => {
  figma.ui.postMessage({
    type: 'selection-changed',
    selection: figma.currentPage.selection.map((node) => ({
      id: node.id,
      name: node.name,
      type: node.type,
    })),
  });
});

const TREND_NAME_SEPARATOR = ' — ';

interface StoredTrendData {
  trendTitle: string;
  baseLayerName?: string;
}

/**
 * Check if a node type supports plugin data storage
 */
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

// Send initial selection on load
figma.ui.postMessage({
  type: 'selection-changed',
  selection: figma.currentPage.selection.map((node) => ({
    id: node.id,
    name: node.name,
    type: node.type,
  })),
});
