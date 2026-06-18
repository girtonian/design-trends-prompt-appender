/**
 * Utility functions for building Midjourney prompts from trend data
 * Extracted from PromptGenerator component for reusability
 */

import {
  STICKER_SHEET_ASPECT_RATIO,
  STICKER_SHEET_NEGATIVE_ADDITIONS,
  STICKER_SHEET_SUFFIX,
} from "./stickerSheetLayout";

export type StickerFormat = "off" | "single" | "sheet";

export const STICKER_SINGLE_SUFFIX =
  "die-cut vinyl sticker, thick white outline border following subject silhouette, isolated cutout subject, white background, subtle drop shadow, single centered sticker";

export const STICKER_SINGLE_NEGATIVE_ADDITIONS =
  "full scene background, rectangular photo crop, no border, multiple scattered subjects, sticker sheet layout";

export const STICKER_SINGLE_ASPECT_RATIO = "--ar 1:1";

export {
  STICKER_SHEET_ASPECT_RATIO,
  STICKER_SHEET_NEGATIVE_ADDITIONS,
  STICKER_SHEET_SUFFIX,
};

export interface BuildFullPromptOptions {
  stickerFormat?: StickerFormat;
  themeSubjectPrompt?: string | null;
}

export function resolveStickerFormatFromLegacy(
  stickerFormat?: StickerFormat,
  stickerMode?: boolean
): StickerFormat {
  if (stickerFormat) return stickerFormat;
  return stickerMode ? "single" : "off";
}

export function getStickerFormatLabel(format: StickerFormat): string {
  switch (format) {
    case "single":
      return "single sticker";
    case "sheet":
      return "sticker sheet";
    default:
      return "";
  }
}

export function getStickerFormatFooterSuffix(format: StickerFormat): string {
  switch (format) {
    case "single":
      return " · Single sticker";
    case "sheet":
      return " · Sticker sheet";
    default:
      return "";
  }
}

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
 * First 3 comma-separated style anchors from a master prompt (token-efficient).
 */
export function extractStyleAnchor(masterPrompt: string): string {
  return masterPrompt
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");
}

/**
 * Compact Figma Weave prompt: subject + variation hook + short style anchor + sticker sheet + negatives.
 * Omits Midjourney flags and avoids repeating the full master prompt to save credits.
 */
export interface BuildWeaveThemePromptOptions {
  stickerFormat?: Extract<StickerFormat, "off" | "sheet">;
  themeSubjectPrompt?: string | null;
}

export function buildWeaveThemePrompt(
  masterPrompt: string,
  variation: string,
  negativePrompts: string,
  subject: string,
  options: BuildWeaveThemePromptOptions = { stickerFormat: "sheet" }
): string {
  const { stickerFormat = "sheet", themeSubjectPrompt = null } = options;
  const hook = cleanVariation(variation)
    .replace(/--style \S+/g, "")
    .trim();
  const styleAnchor = extractStyleAnchor(masterPrompt);
  const positiveParts = [subject, hook, styleAnchor];

  if (themeSubjectPrompt) {
    positiveParts.push(themeSubjectPrompt);
  }
  if (stickerFormat === "sheet") {
    positiveParts.push(STICKER_SHEET_SUFFIX);
  }

  const mergedNegatives =
    stickerFormat === "sheet"
      ? `${negativePrompts}, ${STICKER_SHEET_NEGATIVE_ADDITIONS}`
      : negativePrompts;

  return `${positiveParts.join(", ")}. No ${mergedNegatives}`;
}

/**
 * Appends sticker-format parameters to a master prompt (no variation or --no clause).
 */
export function applyStickerToMasterPrompt(
  masterPrompt: string,
  stickerFormat: "single" | "sheet",
  themeSubjectPrompt?: string | null
): string {
  const parts = [masterPrompt];
  if (themeSubjectPrompt) {
    parts.push(themeSubjectPrompt);
  }
  parts.push(
    stickerFormat === "sheet" ? STICKER_SHEET_SUFFIX : STICKER_SINGLE_SUFFIX
  );
  return parts.join(", ");
}

/**
 * Master prompt for clipboard copy (sticker/theme modifiers when active).
 */
export function buildMasterPromptText(
  masterPrompt: string,
  stickerFormat: StickerFormat,
  themeSubjectPrompt?: string | null
): string {
  if (stickerFormat === "off") {
    return masterPrompt;
  }
  return applyStickerToMasterPrompt(
    masterPrompt,
    stickerFormat,
    themeSubjectPrompt
  );
}

/**
 * Builds a complete Midjourney prompt from components
 * @param masterPrompt - The base prompt for the trend
 * @param variation - The specific variation text
 * @param aspectRatios - Available aspect ratios for the trend
 * @param negativePrompts - Things to exclude from the generation
 * @param options - Optional flags such as stickerFormat
 * @returns Complete, ready-to-use Midjourney prompt
 */
export function buildFullPrompt(
  masterPrompt: string,
  variation: string,
  aspectRatios: string[],
  negativePrompts: string,
  options: BuildFullPromptOptions = {}
): string {
  const stickerFormat = options.stickerFormat ?? "off";
  const themeSubjectPrompt = options.themeSubjectPrompt ?? null;

  const aspectRatio =
    stickerFormat === "single"
      ? STICKER_SINGLE_ASPECT_RATIO
      : stickerFormat === "sheet"
        ? STICKER_SHEET_ASPECT_RATIO
        : extractAspectRatio(variation) || aspectRatios[0];

  const cleanedVariation = cleanVariation(variation);
  const positiveParts = [masterPrompt, cleanedVariation];

  if (themeSubjectPrompt && stickerFormat !== "off") {
    positiveParts.push(themeSubjectPrompt);
  }

  if (stickerFormat === "single") {
    positiveParts.push(STICKER_SINGLE_SUFFIX);
  } else if (stickerFormat === "sheet") {
    positiveParts.push(STICKER_SHEET_SUFFIX);
  }

  const mergedNegatives =
    stickerFormat === "single"
      ? `${negativePrompts}, ${STICKER_SINGLE_NEGATIVE_ADDITIONS}`
      : stickerFormat === "sheet"
        ? `${negativePrompts}, ${STICKER_SHEET_NEGATIVE_ADDITIONS}`
        : negativePrompts;

  return `${positiveParts.join(", ")} ${aspectRatio} --no ${mergedNegatives}`;
}
