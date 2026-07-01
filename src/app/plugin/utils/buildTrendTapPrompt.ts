import type { Trend } from "../../data/trends";
import type { ThemeId } from "../../data/themes";
import { getThemeTrendSubject } from "../../data/themeSubjects";
import { DITHERING_ASCII_TREND_ID } from "../../data/trendIds";
import { getPatchTypeById, type PatchTypeId } from "../../data/patchTypes";
import type { AspectRatioPreset } from "./aspectRatioPresets";
import {
  CHIBI_SUFFIX_FIGMA,
  collectModifierNegatives,
  DITHERING_COLOR_SUFFIX_FIGMA,
  STICKER_OUTPUT_CONTRACT_SINGLE,
  STICKER_SINGLE_FINISH_FIGMA,
  buildStickerSheetSuffixFigma,
  fitPromptToFigmaLimit,
  getCompactThemeSubject,
} from "./figmaPromptLimits";
import type { StickerFormat } from "./promptBuilder";
import { getStickerSheetLayout } from "./stickerSheetLayout";

export interface TrendTapModifiers {
  stickerFormat: StickerFormat;
  themeId: ThemeId | null;
  chibiMode: boolean;
  patchMode: boolean;
  patchType: PatchTypeId;
  ditheringColorMode: boolean;
  aspectRatio: AspectRatioPreset;
  isPro: boolean;
}

export interface TrendTapPromptInput {
  trend: Trend;
  variationIndex: number;
  modifiers: TrendTapModifiers;
}

function cleanVariation(variation: string): string {
  return variation.replace(/--ar \S+/g, "").trim();
}

function extractStyleAnchor(masterPrompt: string): string {
  return masterPrompt
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");
}

function buildColorAwareStyleAnchor(masterPrompt: string): string {
  return masterPrompt
    .split(",")
    .map((part) => part.trim())
    .filter(
      (part) =>
        part &&
        !/monochrome|black-and-white|black and white|limited palette/i.test(part)
    )
    .slice(0, 3)
    .join(", ");
}

function buildStyleLayer(
  masterPrompt: string,
  hook: string,
  trendId: number,
  ditheringColorMode: boolean,
  includeHook: boolean
): string {
  if (trendId === DITHERING_ASCII_TREND_ID && ditheringColorMode) {
    const anchor = buildColorAwareStyleAnchor(masterPrompt);
    return includeHook && hook ? `${anchor}, ${hook}` : anchor;
  }

  const styleAnchor = extractStyleAnchor(masterPrompt);
  if (includeHook && hook) {
    const anchored = `${styleAnchor}, ${hook}`;
    const full = `${masterPrompt}, ${hook}`;
    return full.length <= 480 ? full : anchored;
  }
  return styleAnchor;
}

function adjustTrendNegatives(
  trendId: number,
  ditheringColorMode: boolean,
  negativePrompts: string
): string {
  if (trendId === DITHERING_ASCII_TREND_ID && ditheringColorMode) {
    return negativePrompts
      .split(",")
      .map((part) => part.trim())
      .filter((part) => !/^color photography$/i.test(part))
      .join(", ");
  }
  return negativePrompts;
}

/**
 * Layered prompt builder: output contract → subject → style → trend modifiers → chibi.
 */
export function buildTrendTapPrompt(input: TrendTapPromptInput): string {
  const { trend, variationIndex, modifiers } = input;
  const {
    stickerFormat,
    themeId,
    chibiMode,
    patchMode,
    patchType,
    ditheringColorMode,
    aspectRatio,
    isPro,
  } = modifiers;

  const trendId = trend.id;
  const effectivePatchMode = isPro && patchMode;
  const effectiveDitheringColorMode =
    isPro && trendId === DITHERING_ASCII_TREND_ID && ditheringColorMode;
  const effectiveStickerFormat = isPro ? stickerFormat : "off";
  const effectiveChibiMode = isPro && chibiMode;
  const effectiveThemeId = isPro ? themeId : null;

  const variation =
    trend.midjourneyPrompts.variations[variationIndex] ??
    trend.midjourneyPrompts.variations[0];
  const hook = cleanVariation(variation).replace(/--style \S+/g, "").trim();
  const masterPrompt = trend.midjourneyPrompts.masterPrompt;
  const trendNegatives = adjustTrendNegatives(
    trendId,
    effectiveDitheringColorMode,
    trend.midjourneyPrompts.negativePrompts
  );

  const themeSubject =
    effectiveThemeId &&
    (effectiveStickerFormat === "single" ||
      effectiveStickerFormat === "sheet" ||
      effectivePatchMode)
      ? getThemeTrendSubject(effectiveThemeId, variationIndex)
      : null;

  const positiveParts: string[] = [];

  // L0 — output contract
  if (effectiveStickerFormat === "single") {
    positiveParts.push(STICKER_OUTPUT_CONTRACT_SINGLE);
  } else if (effectiveStickerFormat === "sheet") {
    positiveParts.push(
      buildStickerSheetSuffixFigma(getStickerSheetLayout(aspectRatio))
    );
  }

  // L1 — theme subject
  if (themeSubject) {
    if (effectiveStickerFormat === "sheet") {
      positiveParts.push(`${themeSubject} style direction`);
      const compactTheme = effectiveThemeId
        ? getCompactThemeSubject(effectiveThemeId)
        : null;
      if (compactTheme) positiveParts.push(compactTheme);
    } else {
      positiveParts.push(themeSubject);
    }
  }

  // L2 — style (+ variation hook when no theme subject, or sheet mode)
  if (themeSubject && effectiveStickerFormat === "sheet") {
    positiveParts.push(hook);
    positiveParts.push(
      buildStyleLayer(masterPrompt, hook, trendId, effectiveDitheringColorMode, false)
    );
  } else if (themeSubject) {
    positiveParts.push(
      buildStyleLayer(masterPrompt, hook, trendId, effectiveDitheringColorMode, false)
    );
  } else {
    positiveParts.push(
      buildStyleLayer(masterPrompt, hook, trendId, effectiveDitheringColorMode, true)
    );
  }

  // L3 — trend-specific modifiers
  if (effectivePatchMode) {
    const patchTypeOption = getPatchTypeById(patchType);
    if (patchTypeOption) {
      positiveParts.push(patchTypeOption.promptSuffix);
    }
  }

  if (effectiveDitheringColorMode) {
    positiveParts.push(DITHERING_COLOR_SUFFIX_FIGMA);
  }

  // L4 — chibi
  if (effectiveChibiMode) {
    positiveParts.push(CHIBI_SUFFIX_FIGMA);
  }

  if (effectiveStickerFormat === "single") {
    positiveParts.push(STICKER_SINGLE_FINISH_FIGMA);
  }

  const guardrails = collectModifierNegatives({
    stickerFormat: effectiveStickerFormat,
    aspectRatio,
    trendId,
    chibiMode: effectiveChibiMode,
    patchMode: effectivePatchMode,
    patchType,
    ditheringColorMode: effectiveDitheringColorMode,
    trendNegatives,
  });

  const negativeClause =
    effectiveStickerFormat === "off" && effectiveChibiMode
      ? `. Avoid: ${guardrails}.`
      : `. No ${guardrails}.`;

  const prompt = `${positiveParts.filter(Boolean).join(", ")}${negativeClause}`;

  return fitPromptToFigmaLimit(prompt, undefined, {
    preservedNegatives: guardrails,
  });
}
