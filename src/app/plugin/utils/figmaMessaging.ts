/**
 * Messaging utilities for communicating between UI and plugin code
 * In standalone plugins, the UI runs in an iframe and communicates via postMessage
 */

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
}

export interface SelectionChangedMessage {
  type: 'selection-changed';
  selection: FigmaNode[];
}

export interface SaveTrendMessage {
  type: 'save-trend-data';
  nodeIds: string[];
  trendData: any;
}

export interface GetTrendMessage {
  type: 'get-trend-data';
  nodeId: string;
}

export interface ClearTrendMessage {
  type: 'clear-trend-data';
  nodeIds: string[];
}

/**
 * Send a message to the plugin code
 */
export function postToPlugin(message: any) {
  parent.postMessage({ pluginMessage: message }, '*');
}

/**
 * Listen for messages from the plugin code
 */
export function onPluginMessage(callback: (message: any) => void) {
  const handler = (event: MessageEvent) => {
    if (event.data.pluginMessage) {
      callback(event.data.pluginMessage);
    }
  };

  window.addEventListener('message', handler);

  return () => window.removeEventListener('message', handler);
}

/**
 * Request current selection from plugin
 */
export function requestSelection() {
  postToPlugin({ type: 'get-selection' });
}

/**
 * Save trend data to Figma nodes
 */
export function saveTrendData(nodeIds: string[], trendData: any) {
  postToPlugin({
    type: 'save-trend-data',
    nodeIds,
    trendData,
  });
}

/**
 * Get trend data from a Figma node
 */
export function getTrendData(nodeId: string) {
  postToPlugin({
    type: 'get-trend-data',
    nodeId,
  });
}

/**
 * Clear trend data from Figma nodes
 */
export function clearTrendData(nodeIds: string[]) {
  postToPlugin({
    type: 'clear-trend-data',
    nodeIds,
  });
}

/**
 * Close the plugin
 */
export function closePlugin() {
  postToPlugin({ type: 'close-plugin' });
}
