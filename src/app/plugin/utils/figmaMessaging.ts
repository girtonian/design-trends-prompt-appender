/**
 * Messaging utilities for communicating between UI and plugin code
 */

import type { StickerFormat } from "./promptBuilder";
import type { ThemeId } from "../../data/themes";
import type { AspectRatioPreset } from "./aspectRatioPresets";
import type { ResizeGenerationTargetPayload } from "./generationFrame";

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  isMakeImageTarget?: boolean;
  width?: number;
  height?: number;
}

export interface StoredTrendData {
  trendId: number;
  trendTitle: string;
  selectedVariationIndex: number | null;
  selectedVariation: string | null;
  fullPrompt: string | null;
  appliedAt: number;
  baseLayerName?: string;
  stickerFormat?: StickerFormat;
  /** @deprecated Use stickerFormat; true maps to "single" on restore */
  stickerMode?: boolean;
  selectedThemeId?: ThemeId | null;
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
export function saveTrendData(nodeIds: string[], trendData: StoredTrendData) {
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
    type: "clear-trend-data",
    nodeIds,
  });
}

/**
 * Resize the plugin UI window (handled in sandbox via figma.ui.resize)
 */
export function resizePluginUI(width: number, height: number) {
  postToPlugin({
    type: "resize-ui",
    width,
    height,
  });
}

export function prepareGenerationTarget(payload: ResizeGenerationTargetPayload) {
  postToPlugin({
    type: "prepare-generation-frame",
    ...payload,
  });
}

export function resizeGenerationTarget(payload: ResizeGenerationTargetPayload) {
  postToPlugin({
    type: "resize-generation-frame",
    ...payload,
  });
}

export function saveAspectRatioPreference(aspectRatio: AspectRatioPreset) {
  postToPlugin({
    type: "save-aspect-ratio",
    aspectRatio,
  });
}

export function loadAspectRatioPreference() {
  postToPlugin({
    type: "load-aspect-ratio",
  });
}
