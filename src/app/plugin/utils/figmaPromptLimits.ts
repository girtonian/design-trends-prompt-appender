import type { ThemeId } from "../../data/themes";
import { DITHERING_ASCII_TREND_ID } from "../../data/trendIds";
import { getPatchTypeById, type PatchTypeId } from "../../data/patchTypes";
import {
  getStickerSheetLayout,
  STICKER_SHEET_VARIETY,
  type StickerSheetLayoutSpec,
} from "./stickerSheetLayout";
import type { AspectRatioPreset } from "./aspectRatioPresets";

/** Figma Make an image prompt field limit (empirical). */
export const FIGMA_PROMPT_MAX_LENGTH = 1500;

export const CHIBI_SUFFIX_FIGMA =
  "chibi kawaii mascot, big eyes, cute proportions";

export const CHIBI_NEGATIVE_FIGMA =
  "realistic proportions, uncanny face, harsh lighting";

export const DITHERING_COLOR_SUFFIX_FIGMA =
  "full color ASCII dither on subject glyphs, vibrant colored halftone tones in artwork, colored dither shading not background";

export const DITHERING_COLOR_GUARDRAILS =
  "pure greyscale art, monochrome-only subject palette";

export const DITHERING_MONO_GUARDRAILS = "";

export const STICKER_OUTPUT_CONTRACT_SINGLE =
  "One single die-cut sticker on transparent background, centered, one subject only, no grid, no sticker sheet";

export const STICKER_OUTPUT_CONTRACT_SHEET_PREFIX = "Sticker sheet layout";

export const STICKER_DIE_CUT_FIGMA =
  "die-cut sticker, white outline, transparent bg, isolated cutout";

export const STICKER_SINGLE_FINISH_FIGMA = "thick white sticker border";

/** Single-sticker mode: block sheet/grid output only (no ad-hoc artifact terms). */
export function buildStickerSingleGuardrails(): string {
  return "sticker sheet layout, multi-subject grid, repeated sticker grid";
}

/** Sticker-sheet mode: block wrong layout/count and duplicate designs. */
export function buildStickerSheetGuardrails(spec: StickerSheetLayoutSpec): string {
  return [
    "single lone sticker",
    "one subject only",
    "duplicate repeated designs",
    "identical stickers",
    "overlapping or cropped stickers",
    "uneven sticker sizing",
    `not ${spec.columns} column by ${spec.rows} row grid`,
    `not ${spec.stickerCount} sticker sheet`,
  ].join(", ");
}

/** @deprecated Use buildStickerSingleGuardrails() */
export const STICKER_SINGLE_GUARDRAILS = buildStickerSingleGuardrails();

/** @deprecated Use buildStickerSheetGuardrails() */
export const STICKER_SHEET_GUARDRAILS =
  "single lone sticker, one subject only, overlapping or cropped stickers, uneven sticker sizing";

/** @deprecated Use buildStickerSingleGuardrails() */
export const STICKER_SINGLE_NEGATIVE_FIGMA = STICKER_SINGLE_GUARDRAILS;

/** @deprecated Use buildStickerSheetGuardrails() */
export const STICKER_SHEET_NEGATIVE_FIGMA = STICKER_SHEET_GUARDRAILS;

export interface ModifierNegativeInput {
  stickerFormat: "off" | "single" | "sheet";
  aspectRatio: AspectRatioPreset;
  trendId: number;
  chibiMode: boolean;
  patchMode: boolean;
  patchType: PatchTypeId;
  ditheringColorMode: boolean;
  trendNegatives: string;
}

/**
 * Builds the negative-prompt clause from active refinements only.
 * Sticker/chibi/patch/color guardrails are omitted when their refine toggle is off.
 */
export function collectModifierNegatives(input: ModifierNegativeInput): string {
  const parts: string[] = [];

  if (input.stickerFormat === "single") {
    parts.push(buildStickerSingleGuardrails());
  } else if (input.stickerFormat === "sheet") {
    parts.push(
      buildStickerSheetGuardrails(getStickerSheetLayout(input.aspectRatio))
    );
  }

  if (input.chibiMode) {
    parts.push(CHIBI_NEGATIVE_FIGMA);
  }

  if (input.patchMode) {
    const patchType = getPatchTypeById(input.patchType);
    if (patchType) parts.push(patchType.negativeGuardrail);
  }

  if (input.trendId === DITHERING_ASCII_TREND_ID && input.ditheringColorMode) {
    parts.push(DITHERING_COLOR_GUARDRAILS);
  } else if (input.trendId === DITHERING_ASCII_TREND_ID) {
    parts.push(DITHERING_MONO_GUARDRAILS);
  }

  parts.push(limitCommaSeparatedParts(input.trendNegatives, 2));

  return parts.filter(Boolean).join(", ");
}

/** @deprecated Use DITHERING_COLOR_GUARDRAILS */
export const DITHERING_COLOR_NEGATIVE_FIGMA = DITHERING_COLOR_GUARDRAILS;

/** @deprecated Use DITHERING_MONO_GUARDRAILS */
export const DITHERING_MONO_NEGATIVE_FIGMA = DITHERING_MONO_GUARDRAILS;

/** @deprecated Use STICKER_OUTPUT_CONTRACT_SINGLE + STICKER_SINGLE_FINISH_FIGMA */
export const STICKER_SINGLE_SUFFIX_FIGMA =
  `${STICKER_DIE_CUT_FIGMA}, one single centered sticker only, one subject, no grid, no sticker sheet`;

const THEME_SUBJECT_COMPACT: Record<ThemeId, string> = {
  "food-drink": "food and drink only",
  "nature-weather": "nature and weather only",
  animals: "animals only",
  "architecture-places": "architecture and places only",
  "transport-travel": "transport and travel only",
  "symbols-badges": "symbols and badges only",
  "patterns-tiles": "patterns and tiles only",
  "mascots-characters": "mascots and characters only",
};

export function getCompactThemeSubject(themeId: ThemeId | null): string | null {
  if (!themeId) return null;
  return THEME_SUBJECT_COMPACT[themeId] ?? null;
}

export function buildStickerSheetSuffixFigma(
  spec: StickerSheetLayoutSpec
): string {
  const marginNote =
    spec.offsetY > 0
      ? `${spec.offsetY}px top/bottom margin, `
      : spec.offsetX > 0
        ? `${spec.offsetX}px side margin, `
        : "";

  return (
    `${STICKER_OUTPUT_CONTRACT_SHEET_PREFIX} ${spec.width}x${spec.height}, ${spec.columns}x${spec.rows} grid, ` +
    `${spec.cellSize}px cells, ${marginNote}${spec.stickerCount} ${STICKER_SHEET_VARIETY}, ` +
    `${STICKER_DIE_CUT_FIGMA}, slice-ready grid, no overlap`
  );
}

export function limitCommaSeparatedParts(text: string, maxParts: number): string {
  return text
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, maxParts)
    .join(", ");
}

const ULTRA_COMPACT_NEGATIVES = "scene bg, wrong layout, overlap, realism";

function trimPositiveParts(parts: string[], maxLength: number, negClause: string): string {
  const working = [...parts];
  while (working.length > 1) {
    const candidate = `${working.join(", ")}${negClause}`;
    if (candidate.length <= maxLength) return candidate;
    working.pop();
  }
  return `${working[0] ?? ""}${negClause}`;
}

export interface FitPromptOptions {
  /** Guardrail negatives that must survive trimming (sticker/dithering packs). */
  preservedNegatives?: string;
}

/**
 * Ensures a plugin clipboard prompt fits Figma's Make an image limit.
 * Shortens positives first; guardrail negatives are preserved when provided.
 */
export function fitPromptToFigmaLimit(
  prompt: string,
  maxLength: number = FIGMA_PROMPT_MAX_LENGTH,
  options: FitPromptOptions = {}
): string {
  if (prompt.length <= maxLength) return prompt;

  const preservedNegatives = options.preservedNegatives ?? "";
  const noMatch = prompt.match(/^(.*)\. No (.*)\.$/);
  const avoidMatch = prompt.match(/^(.*)\. Avoid: (.*)\.$/);

  if (noMatch) {
    const [, positive, negatives] = noMatch;
    const guardrails =
      preservedNegatives ||
      negatives;
    const negClause = `. No ${guardrails}.`;
    const trimmed = trimPositiveParts(
      positive.split(", ").map((p) => p.trim()).filter(Boolean),
      maxLength,
      negClause
    );
    if (trimmed.length <= maxLength) return trimmed;
  }

  if (avoidMatch) {
    const [, positive, negatives] = avoidMatch;
    const guardrails =
      preservedNegatives ||
      negatives;
    const negClause = `. Avoid: ${guardrails}.`;
    const trimmed = trimPositiveParts(
      positive.split(", ").map((p) => p.trim()).filter(Boolean),
      maxLength,
      negClause
    );
    if (trimmed.length <= maxLength) return trimmed;
  }

  if (preservedNegatives) {
    const negClause = `. No ${preservedNegatives}.`;
    const positiveOnly = prompt.replace(/\. (No|Avoid): .+\.$/, "");
    const trimmed = trimPositiveParts(
      positiveOnly.split(", ").map((p) => p.trim()).filter(Boolean),
      maxLength,
      negClause
    );
    if (trimmed.length <= maxLength) return trimmed;
  }

  const fallbackNeg = preservedNegatives || ULTRA_COMPACT_NEGATIVES;
  const negClause = `. No ${fallbackNeg}.`;
  const positiveOnly = prompt.replace(/\. (No|Avoid): .+\.$/, "");
  const trimmed = trimPositiveParts(
    positiveOnly.split(", ").map((p) => p.trim()).filter(Boolean),
    maxLength,
    negClause
  );
  if (trimmed.length <= maxLength) return trimmed;

  return prompt
    .slice(0, maxLength - 1)
    .replace(/[,.\s]+\S*$/, "")
    .concat(".");
}
