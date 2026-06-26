/**
 * Utility functions for building Midjourney prompts from trend data
 * Extracted from PromptGenerator component for reusability
 */

import type { AspectRatioPreset } from "./aspectRatioPresets";
import {
  STICKER_DIE_CUT_APPEARANCE,
  STICKER_DIE_CUT_NEGATIVE_ADDITIONS,
  STICKER_SHEET_ASPECT_RATIO,
  STICKER_SHEET_NEGATIVE_ADDITIONS,
  STICKER_SHEET_SUFFIX,
  buildStickerSheetSuffix,
  getStickerSheetAspectRatioFlag,
  getStickerSheetLayout,
} from "./stickerSheetLayout";
import {
  fitPromptToFigmaLimit,
  limitCommaSeparatedParts,
} from "./figmaPromptLimits";
import { trends } from "../../data/trends";
import { buildTrendTapPrompt } from "./buildTrendTapPrompt";

export type StickerFormat = "off" | "single" | "sheet";

export const STICKER_SINGLE_SUFFIX =
  `${STICKER_DIE_CUT_APPEARANCE}, single centered sticker`;

export const STICKER_SINGLE_NEGATIVE_ADDITIONS =
  `sticker sheet layout, multi-subject grid, repeated sticker grid, ${STICKER_DIE_CUT_NEGATIVE_ADDITIONS}`;

export const STICKER_SINGLE_ASPECT_RATIO = "--ar 1:1";

export const CHIBI_SUFFIX =
  "adorable chibi character design, cute kawaii proportions, big expressive eyes, small body big head, charming lovable mascot style";

export const CHIBI_NEGATIVE_ADDITIONS =
  "realistic human proportions, adult features, uncanny valley, harsh dramatic lighting, gritty realism";

export {
  STICKER_DIE_CUT_APPEARANCE,
  STICKER_DIE_CUT_NEGATIVE_ADDITIONS,
  STICKER_SHEET_ASPECT_RATIO,
  STICKER_SHEET_NEGATIVE_ADDITIONS,
  STICKER_SHEET_SUFFIX,
};

export interface BuildFullPromptOptions {
  stickerFormat?: StickerFormat;
  themeSubjectPrompt?: string | null;
  aspectRatio?: AspectRatioPreset;
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

export function getChibiFooterSuffix(chibiMode: boolean): string {
  return chibiMode ? " · Chibi" : "";
}

export function getXeroxPatchFooterSuffix(xeroxPatchMode: boolean): string {
  return xeroxPatchMode ? " · Patches" : "";
}

export function getDitheringColorFooterSuffix(ditheringColorMode: boolean): string {
  return ditheringColorMode ? " · Color" : "";
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
  aspectRatio?: AspectRatioPreset;
}

export function buildWeaveThemePrompt(
  masterPrompt: string,
  variation: string,
  negativePrompts: string,
  subject: string,
  options: BuildWeaveThemePromptOptions = { stickerFormat: "sheet" }
): string {
  const { stickerFormat = "sheet", themeSubjectPrompt = null, aspectRatio = "16:9" } = options;
  const hook = cleanVariation(variation)
    .replace(/--style \S+/g, "")
    .trim();
  const styleAnchor = extractStyleAnchor(masterPrompt);
  const positiveParts = [subject, hook, styleAnchor];

  if (themeSubjectPrompt) {
    positiveParts.push(themeSubjectPrompt);
  }
  if (stickerFormat === "sheet") {
    positiveParts.push(buildStickerSheetSuffix(getStickerSheetLayout(aspectRatio)));
  }

  const mergedNegatives =
    stickerFormat === "sheet"
      ? `${negativePrompts}, ${STICKER_SHEET_NEGATIVE_ADDITIONS}`
      : negativePrompts;

  return `${positiveParts.join(", ")}. No ${mergedNegatives}`;
}

/**
 * Full sticker-sheet batch prompt: subject + complete master prompt + variation hook +
 * theme constraint + sticker sheet layout + negatives. Used for master batch CSV exports
 * where the full design trend style must be preserved (not token-truncated).
 */
export function buildStickerSheetBatchPrompt(
  masterPrompt: string,
  variation: string,
  negativePrompts: string,
  subject: string,
  themeSubjectPrompt?: string | null,
  aspectRatio: AspectRatioPreset = "16:9"
): string {
  const hook = cleanVariation(variation)
    .replace(/--style \S+/g, "")
    .trim();
  const positiveParts = [subject, masterPrompt, hook];

  if (themeSubjectPrompt) {
    positiveParts.push(themeSubjectPrompt);
  }
  positiveParts.push(buildStickerSheetSuffix(getStickerSheetLayout(aspectRatio)));

  const mergedNegatives = `${negativePrompts}, ${STICKER_SHEET_NEGATIVE_ADDITIONS}`;
  return `${positiveParts.join(", ")}. No ${mergedNegatives}`;
}

export interface BuildPluginWeavePromptOptions {
  stickerFormat: StickerFormat;
  themeSubjectPrompt?: string | null;
  /** Theme-specific subject hook (sticker sheet + theme). */
  subject?: string | null;
  /** Theme id for compact subject labels when subject hook is absent. */
  themeId?: import("../../data/themes").ThemeId | null;
  aspectRatio?: AspectRatioPreset;
  chibiMode?: boolean;
  trendId?: number;
  xeroxPatchMode?: boolean;
  ditheringColorMode?: boolean;
  /** When false, sticker/theme/chibi/trend modifiers are stripped. */
  isPro?: boolean;
}

/** Strip Pro-only prompt modifiers for free-tier copies. */
export function resolveProPromptOptions(
  options: BuildPluginWeavePromptOptions
): BuildPluginWeavePromptOptions {
  if (options.isPro !== false) return options;
  return {
    ...options,
    stickerFormat: "off",
    themeSubjectPrompt: null,
    subject: null,
    themeId: null,
    chibiMode: false,
    xeroxPatchMode: false,
    ditheringColorMode: false,
  };
}

/**
 * Weave-ready clipboard prompt for the plugin: delegates to layered buildTrendTapPrompt.
 */
export function buildPluginWeavePrompt(
  masterPrompt: string,
  variation: string,
  negativePrompts: string,
  options: BuildPluginWeavePromptOptions
): string {
  const resolved = resolveProPromptOptions(options);
  const trendId = resolved.trendId ?? 1;
  const trend = trends.find((t) => t.id === trendId);

  if (!trend) {
    const hook = cleanVariation(variation).replace(/--style \S+/g, "").trim();
    const stylePart = extractStyleAnchor(masterPrompt);
    const positive = hook ? `${stylePart}, ${hook}` : stylePart;
    const negatives = limitCommaSeparatedParts(negativePrompts, 3);
    return fitPromptToFigmaLimit(`${positive}. Avoid: ${negatives}.`);
  }

  const variationIndex = Math.max(
    0,
    trend.midjourneyPrompts.variations.indexOf(variation)
  );
  const resolvedIndex =
    variationIndex >= 0 ? variationIndex : trendId - 1;

  return buildTrendTapPrompt({
    trend,
    variationIndex: resolvedIndex,
    modifiers: {
      stickerFormat: resolved.stickerFormat,
      themeId: resolved.themeId ?? null,
      chibiMode: resolved.chibiMode ?? false,
      xeroxPatchMode: resolved.xeroxPatchMode ?? false,
      ditheringColorMode: resolved.ditheringColorMode ?? false,
      aspectRatio: resolved.aspectRatio ?? "16:9",
      isPro: options.isPro !== false,
    },
  });
}

/**
 * Appends sticker-format parameters to a master prompt (no variation or --no clause).
 */
export function applyStickerToMasterPrompt(
  masterPrompt: string,
  stickerFormat: "single" | "sheet",
  themeSubjectPrompt?: string | null,
  aspectRatio: AspectRatioPreset = "16:9"
): string {
  const parts = [masterPrompt];
  if (themeSubjectPrompt) {
    parts.push(themeSubjectPrompt);
  }
  parts.push(
    stickerFormat === "sheet"
      ? buildStickerSheetSuffix(getStickerSheetLayout(aspectRatio))
      : STICKER_SINGLE_SUFFIX
  );
  return parts.join(", ");
}

/**
 * Master prompt for clipboard copy (sticker/theme modifiers when active).
 */
export function buildMasterPromptText(
  masterPrompt: string,
  stickerFormat: StickerFormat,
  themeSubjectPrompt?: string | null,
  aspectRatio: AspectRatioPreset = "16:9"
): string {
  if (stickerFormat === "off") {
    return masterPrompt;
  }
  return applyStickerToMasterPrompt(
    masterPrompt,
    stickerFormat,
    themeSubjectPrompt,
    aspectRatio
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
  const sheetAspectRatio = options.aspectRatio ?? "16:9";

  const aspectRatio =
    stickerFormat === "single"
      ? STICKER_SINGLE_ASPECT_RATIO
      : stickerFormat === "sheet"
        ? getStickerSheetAspectRatioFlag(sheetAspectRatio)
        : extractAspectRatio(variation) || aspectRatios[0];

  const cleanedVariation = cleanVariation(variation);
  const positiveParts = [masterPrompt, cleanedVariation];

  if (themeSubjectPrompt && stickerFormat !== "off") {
    positiveParts.push(themeSubjectPrompt);
  }

  if (stickerFormat === "single") {
    positiveParts.push(STICKER_SINGLE_SUFFIX);
  } else if (stickerFormat === "sheet") {
    positiveParts.push(buildStickerSheetSuffix(getStickerSheetLayout(sheetAspectRatio)));
  }

  const mergedNegatives =
    stickerFormat === "single"
      ? `${negativePrompts}, ${STICKER_SINGLE_NEGATIVE_ADDITIONS}`
      : stickerFormat === "sheet"
        ? `${negativePrompts}, ${STICKER_SHEET_NEGATIVE_ADDITIONS}`
        : negativePrompts;

  return `${positiveParts.join(", ")} ${aspectRatio} --no ${mergedNegatives}`;
}
