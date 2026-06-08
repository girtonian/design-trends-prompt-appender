/**
 * Utility functions for storing and retrieving design trend data
 * from Figma nodes using the Plugin Data API
 */

import { Trend } from "../../data/trends";

/**
 * Data structure for trend information stored on Figma nodes
 */
export interface StoredTrendData {
  trendId: number;
  trendTitle: string;
  selectedVariationIndex: number | null;
  selectedVariation: string | null;
  fullPrompt: string | null;
  appliedAt: number; // timestamp
}

/**
 * The key used to store trend data in Figma's plugin data
 */
const PLUGIN_DATA_KEY = 'designTrend';

/**
 * Checks if a node type supports plugin data storage
 * @param node - The Figma node to check
 * @returns true if the node can store plugin data
 */
export function canStoreData(node: any): boolean {
  if (!node || !node.type) return false;

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

/**
 * Saves trend data to a Figma node
 * @param node - The Figma node to store data on
 * @param trend - The trend object being applied
 * @param variation - Optional specific variation text
 * @param fullPrompt - Optional complete generated prompt
 * @param variationIndex - Optional index of the selected variation
 */
export function saveTrendToNode(
  node: any,
  trend: Trend,
  variation?: string,
  fullPrompt?: string,
  variationIndex?: number
): void {
  if (!canStoreData(node)) {
    console.warn('Cannot store data on this node type:', node.type);
    return;
  }

  const data: StoredTrendData = {
    trendId: trend.id,
    trendTitle: trend.title,
    selectedVariationIndex: variationIndex ?? null,
    selectedVariation: variation ?? null,
    fullPrompt: fullPrompt ?? null,
    appliedAt: Date.now(),
  };

  try {
    node.setPluginData(PLUGIN_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save trend data to node:', error);
  }
}

/**
 * Retrieves trend data from a Figma node
 * @param node - The Figma node to read data from
 * @returns Stored trend data or null if none exists
 */
export function getTrendFromNode(node: any): StoredTrendData | null {
  if (!canStoreData(node)) {
    return null;
  }

  try {
    const dataString = node.getPluginData(PLUGIN_DATA_KEY);
    if (!dataString) {
      return null;
    }

    const data = JSON.parse(dataString) as StoredTrendData;
    return data;
  } catch (error) {
    console.error('Failed to retrieve trend data from node:', error);
    return null;
  }
}

/**
 * Clears trend data from a Figma node
 * @param node - The Figma node to clear data from
 */
export function clearTrendFromNode(node: any): void {
  if (!canStoreData(node)) {
    return;
  }

  try {
    node.setPluginData(PLUGIN_DATA_KEY, '');
  } catch (error) {
    console.error('Failed to clear trend data from node:', error);
  }
}

/**
 * Saves trend data to multiple nodes at once (batch operation)
 * @param nodes - Array of Figma nodes
 * @param trend - The trend object being applied
 * @param variation - Optional specific variation text
 * @param fullPrompt - Optional complete generated prompt
 * @param variationIndex - Optional index of the selected variation
 * @returns Number of nodes successfully updated
 */
export function saveTrendToNodes(
  nodes: any[],
  trend: Trend,
  variation?: string,
  fullPrompt?: string,
  variationIndex?: number
): number {
  let successCount = 0;

  nodes.forEach((node) => {
    if (canStoreData(node)) {
      saveTrendToNode(node, trend, variation, fullPrompt, variationIndex);
      successCount++;
    }
  });

  return successCount;
}

/**
 * Clears trend data from multiple nodes at once (batch operation)
 * @param nodes - Array of Figma nodes to clear
 * @returns Number of nodes successfully cleared
 */
export function clearTrendFromNodes(nodes: any[]): number {
  let successCount = 0;

  nodes.forEach((node) => {
    if (canStoreData(node)) {
      clearTrendFromNode(node);
      successCount++;
    }
  });

  return successCount;
}
