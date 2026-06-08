/**
 * Utility functions for building Midjourney prompts from trend data
 * Extracted from PromptGenerator component for reusability
 */

/**
 * Extracts aspect ratio from a variation string if present
 * @param variation - The variation text that may contain --ar flag
 * @returns The aspect ratio string (e.g., "--ar 1:1") or null if not found
 */
export function extractAspectRatio(variation: string): string | null {
  const arMatch = variation.match(/--ar \S+/);
  return arMatch ? arMatch[0] : null;
}

/**
 * Removes aspect ratio flags from variation text
 * @param variation - The variation text to clean
 * @returns Cleaned variation without aspect ratio flags
 */
export function cleanVariation(variation: string): string {
  return variation.replace(/--ar \S+/g, '').trim();
}

/**
 * Builds a complete Midjourney prompt from components
 * @param masterPrompt - The base prompt for the trend
 * @param variation - The specific variation text
 * @param aspectRatios - Available aspect ratios for the trend
 * @param negativePrompts - Things to exclude from the generation
 * @returns Complete, ready-to-use Midjourney prompt
 */
export function buildFullPrompt(
  masterPrompt: string,
  variation: string,
  aspectRatios: string[],
  negativePrompts: string
): string {
  // Extract aspect ratio from variation if it exists, otherwise use default
  const aspectRatio = extractAspectRatio(variation) || aspectRatios[0];

  // Remove aspect ratio from variation if it's there
  const cleanedVariation = cleanVariation(variation);

  // Construct the full prompt
  const fullPrompt = `${masterPrompt}, ${cleanedVariation} ${aspectRatio} --no ${negativePrompts}`;

  return fullPrompt;
}
