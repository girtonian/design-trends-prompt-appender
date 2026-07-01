/**
 * Main plugin UI — trend grid first, refine panel after selection, auto-copy on changes
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import { usePluginContext } from "./PluginController";
import { trends, type Trend } from "../data/trends";
import { getThemeFooterSuffix } from "../data/themes";
import { isTrendAvailableForTier, isFreeTrendId, PRO_FEATURE_SUMMARY } from "../data/tierConfig";
import { TrendCarouselCard } from "../components/TrendCarouselCard";
import { UpgradePanel } from "../components/UpgradePanel";
import { PluginResizeHandles } from "../components/PluginResizeHandles";
import { AspectRatioSelect } from "../components/AspectRatioSelect";
import { TrendRefinePanel } from "./TrendRefinePanel";
import {
  clearTrendData,
  activateLicense,
  onPluginMessage,
  resizeGenerationTarget,
  saveAspectRatioPreference,
  saveTrendData,
} from "./utils/figmaMessaging";
import {
  getChibiFooterSuffix,
  getDitheringColorFooterSuffix,
  getStickerFormatFooterSuffix,
  getPatchFooterSuffix,
  type StickerFormat,
} from "./utils/promptBuilder";
import { DITHERING_ASCII_TREND_ID } from "../data/trendIds";
import type { PatchTypeId } from "../data/patchTypes";
import {
  getEffectiveAspectRatio,
  type AspectRatioPreset,
} from "./utils/aspectRatioPresets";
import {
  formatSheetLayoutLabel,
  getCanvasDimensionsForMode,
  getStickerSheetLayout,
} from "./utils/stickerSheetLayout";
import { copyTextToClipboard } from "./utils/copyToClipboard";
import { buildTrendTapPrompt } from "./utils/buildTrendTapPrompt";

/** Set to true to restore TrendDetailPanel import + bottom variations section */
export const SHOW_PROMPT_VARIATIONS = false;

const RECOPY_DEBOUNCE_MS = 300;
const FOOTER_NOTICE_MS = 2200;

type FooterNotice =
  | { type: "updated" }
  | { type: "hint"; message: string };

export function TrendBrowser() {
  const {
    selectedNodes,
    currentTrendData,
    refreshSelection,
    stickerFormat,
    setStickerFormat,
    selectedThemeId,
    setSelectedThemeId,
    chibiMode,
    setChibiMode,
    patchMode,
    setPatchMode,
    patchType,
    setPatchType,
    ditheringColorMode,
    setDitheringColorMode,
    isPro,
    licenseStatus,
    licenseKeyMasked,
    setLicenseActivating,
    selectedAspectRatio,
    setSelectedAspectRatio,
    activeGenerationTarget,
  } = usePluginContext();

  const [selectedTrendId, setSelectedTrendId] = useState<number | null>(null);
  const [copiedTrendId, setCopiedTrendId] = useState<number | null>(null);
  const [footerNotice, setFooterNotice] = useState<FooterNotice | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);
  const recopyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipNextRecopyRef = useRef(false);
  const suppressRecopyRef = useRef(false);
  const buildAndCopyPromptRef = useRef<(trend: Trend) => Promise<boolean>>(
    async () => false
  );
  const footerNoticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const appliedTrendId = currentTrendData?.trendId ?? null;
  const selectedTrend = selectedTrendId
    ? trends.find((t) => t.id === selectedTrendId) ?? null
    : null;

  const stickerFooterSuffix = getStickerFormatFooterSuffix(stickerFormat);
  const chibiFooterSuffix = getChibiFooterSuffix(chibiMode);
  const patchFooterSuffix = getPatchFooterSuffix(patchMode, patchType);
  const ditheringColorFooterSuffix = getDitheringColorFooterSuffix(
    ditheringColorMode
  );
  const themeFooterSuffix = getThemeFooterSuffix(
    selectedThemeId,
    stickerFormat,
    patchMode
  );
  const themeSelectEnabled = stickerFormat !== "off" || patchMode;
  const effectiveAspectRatio = getEffectiveAspectRatio(
    stickerFormat,
    selectedAspectRatio
  );
  const sheetLayout =
    stickerFormat === "sheet"
      ? getStickerSheetLayout(effectiveAspectRatio)
      : null;
  const hasMakeImageTargetSelected = selectedNodes.some(
    (node) => node.isMakeImageTarget
  );
  const nodesToSaveTrend = useMemo(
    () => selectedNodes.filter((node) => !node.isMakeImageTarget),
    [selectedNodes]
  );
  const nodesToSaveTrendIds = useMemo(
    () => nodesToSaveTrend.map((node) => node.id),
    [nodesToSaveTrend]
  );

  const flashFooterHint = useCallback((message: string) => {
    if (footerNoticeTimerRef.current) {
      clearTimeout(footerNoticeTimerRef.current);
    }
    setFooterNotice({ type: "hint", message });
    footerNoticeTimerRef.current = setTimeout(
      () => setFooterNotice(null),
      FOOTER_NOTICE_MS
    );
  }, []);

  const flashPromptUpdated = useCallback(() => {
    if (footerNoticeTimerRef.current) {
      clearTimeout(footerNoticeTimerRef.current);
    }
    setFooterNotice({ type: "updated" });
    footerNoticeTimerRef.current = setTimeout(
      () => setFooterNotice(null),
      FOOTER_NOTICE_MS
    );
  }, []);

  useEffect(() => {
    if (appliedTrendId) {
      setSelectedTrendId(appliedTrendId);
    }
  }, [appliedTrendId]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? root.clientWidth;
      setIsNarrow(width < 360);
    });

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (footerNoticeTimerRef.current) {
        clearTimeout(footerNoticeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const cleanup = onPluginMessage((message) => {
      if (message.type === "license-activated") {
        flashPromptUpdated();
        return;
      }
      if (message.type === "license-error") {
        flashFooterHint(message.error ?? "License activation failed.");
      }
    });

    return cleanup;
  }, [flashFooterHint, flashPromptUpdated]);

  const resizeCanvasForCurrentMode = (
    format: StickerFormat,
    aspectRatio: AspectRatioPreset,
    userInitiated: boolean
  ) => {
    const { width, height } = getCanvasDimensionsForMode(format, aspectRatio);
    resizeGenerationTarget({
      aspectRatio,
      width,
      height,
      userInitiated,
    });
  };

  const buildAndCopyPrompt = useCallback(
    async (trend: Trend): Promise<boolean> => {
      const effectiveStickerFormat = isPro ? stickerFormat : "off";
      const effectiveChibiMode = isPro && chibiMode;
      const effectivePatchMode = isPro && patchMode;
      const effectiveDitheringColorMode =
        isPro &&
        trend.id === DITHERING_ASCII_TREND_ID &&
        ditheringColorMode;
      const effectiveThemeId = isPro ? selectedThemeId : null;

      const text = buildTrendTapPrompt({
        trend,
        variationIndex: trend.id - 1,
        modifiers: {
          stickerFormat: effectiveStickerFormat,
          themeId: effectiveThemeId,
          chibiMode: effectiveChibiMode,
          patchMode: effectivePatchMode,
          patchType,
          ditheringColorMode: effectiveDitheringColorMode,
          aspectRatio: effectiveAspectRatio,
          isPro,
        },
      });

      const copied = await copyTextToClipboard(text);

      if (nodesToSaveTrendIds.length > 0) {
        saveTrendData(nodesToSaveTrendIds, {
            trendId: trend.id,
            trendTitle: trend.title,
            selectedVariationIndex: null,
            selectedVariation: null,
            fullPrompt: text,
            appliedAt: Date.now(),
            stickerFormat,
            selectedThemeId,
        });
      }

      if (copied) {
        flashPromptUpdated();
      }

      return copied;
    },
    [
      isPro,
      stickerFormat,
      chibiMode,
      patchMode,
      patchType,
      ditheringColorMode,
      selectedThemeId,
      effectiveAspectRatio,
      nodesToSaveTrendIds,
      flashPromptUpdated,
    ]
  );

  buildAndCopyPromptRef.current = buildAndCopyPrompt;

  const handleTrendActivate = async (trend: Trend) => {
    skipNextRecopyRef.current = true;
    setSelectedTrendId(trend.id);

    if (!isTrendAvailableForTier(trend.id, isPro)) {
      flashFooterHint(PRO_FEATURE_SUMMARY);
      return;
    }

    const copied = await buildAndCopyPrompt(trend);
    if (copied) {
      setCopiedTrendId(trend.id);
      setTimeout(() => setCopiedTrendId(null), 2000);
    }
  };

  useEffect(() => {
    if (selectedTrendId == null || selectedTrend == null) return;
    if (!isTrendAvailableForTier(selectedTrendId, isPro)) return;
    if (suppressRecopyRef.current) return;

    if (skipNextRecopyRef.current) {
      skipNextRecopyRef.current = false;
      return;
    }

    if (recopyTimerRef.current) {
      clearTimeout(recopyTimerRef.current);
    }

    recopyTimerRef.current = setTimeout(async () => {
      if (suppressRecopyRef.current) return;
      await buildAndCopyPromptRef.current(selectedTrend);
    }, RECOPY_DEBOUNCE_MS);

    return () => {
      if (recopyTimerRef.current) {
        clearTimeout(recopyTimerRef.current);
      }
    };
  }, [
    selectedTrendId,
    selectedTrend,
    stickerFormat,
    selectedThemeId,
    chibiMode,
    patchMode,
    patchType,
    ditheringColorMode,
    selectedAspectRatio,
    isPro,
  ]);

  const handleThemeMenuOpenChange = (open: boolean) => {
    suppressRecopyRef.current = open;
  };

  const handleAspectRatioChange = (preset: AspectRatioPreset) => {
    if (preset === selectedAspectRatio) {
      resizeCanvasForCurrentMode(stickerFormat, preset, true);
      return;
    }

    setSelectedAspectRatio(preset);
    saveAspectRatioPreference(preset);
    resizeCanvasForCurrentMode(stickerFormat, preset, true);
  };

  const handleStickerFormatChange = (value: StickerFormat) => {
    const enteringSheet = value === "sheet" && stickerFormat !== "sheet";
    setStickerFormat(value);
    if (enteringSheet && !selectedThemeId) {
      flashFooterHint("Choose a theme for sticker subjects");
    }
  };

  const handleChibiModeChange = (enabled: boolean) => {
    setChibiMode(enabled);
    if (enabled && !selectedThemeId) {
      flashFooterHint("Choose a theme for chibi characters");
    }
  };

  const handlePatchModeChange = (enabled: boolean) => {
    setPatchMode(enabled);
    if (enabled && !selectedThemeId) {
      flashFooterHint("Add a theme to focus patch subjects");
    }
  };

  const handlePatchTypeChange = (id: PatchTypeId) => {
    setPatchType(id);
  };

  const handleActivateLicense = (licenseKey: string) => {
    setLicenseActivating();
    activateLicense(licenseKey);
  };

  const handleClearTrend = () => {
    if (nodesToSaveTrend.length === 0) return;
    const nodeIds = nodesToSaveTrend.map((n) => n.id);
    clearTrendData(nodeIds);
    refreshSelection();
  };

  const targetLabel = activeGenerationTarget
    ? `Image placeholder · ${activeGenerationTarget.aspectRatio} (${activeGenerationTarget.width}×${activeGenerationTarget.height})`
    : null;

  const sheetFooterSuffix = sheetLayout
    ? ` · ${formatSheetLayoutLabel(sheetLayout)}`
    : "";

  const makeImageAspectLabel =
    activeGenerationTarget && hasMakeImageTargetSelected
      ? `${activeGenerationTarget.aspectRatio} (${activeGenerationTarget.width}×${activeGenerationTarget.height})`
      : effectiveAspectRatio;

  const visibleTrends = isPro
    ? trends
    : trends.filter((trend) => isFreeTrendId(trend.id));

  const selectionLabel =
    selectedNodes.length === 0
      ? targetLabel ??
        (selectedTrendId == null
          ? "Pick a trend to copy a prompt"
          : stickerFormat === "sheet"
            ? `Sticker sheet · ${effectiveAspectRatio}${sheetFooterSuffix}`
            : stickerFormat !== "off"
              ? "No selection — sticker prompts copy to clipboard only"
              : "No selection — prompts copy to clipboard only")
      : selectedNodes.length === 1
        ? hasMakeImageTargetSelected
          ? `1 node: "${selectedNodes[0].name || "Unnamed"}" · ${makeImageAspectLabel}${stickerFooterSuffix}${chibiFooterSuffix}${patchFooterSuffix}${ditheringColorFooterSuffix}${sheetFooterSuffix}${themeFooterSuffix}`
          : `1 node: "${selectedNodes[0].name || "Unnamed"}"${stickerFooterSuffix}${chibiFooterSuffix}${patchFooterSuffix}${ditheringColorFooterSuffix}${sheetFooterSuffix}${themeFooterSuffix}`
        : `${selectedNodes.length} nodes selected${stickerFooterSuffix}${chibiFooterSuffix}${patchFooterSuffix}${ditheringColorFooterSuffix}${sheetFooterSuffix}${themeFooterSuffix}`;

  const footerPrimaryLabel =
    footerNotice?.type === "hint" ? footerNotice.message : selectionLabel;

  return (
    <div
      ref={rootRef}
      data-narrow={isNarrow ? "true" : undefined}
      className="figma-plugin-root flex flex-col h-screen bg-background text-foreground"
    >
      <PluginResizeHandles />
      <section className="figma-trends-section flex flex-1 flex-col px-3 pt-3 pb-2 min-h-0">
        {!isPro && licenseStatus !== "loading" && (
          <UpgradePanel
            licenseStatus={licenseStatus}
            licenseKeyMasked={licenseKeyMasked}
            onActivate={handleActivateLicense}
            onError={flashFooterHint}
          />
        )}

        <div
          className="figma-trend-grid flex-1 min-h-0"
          data-tier={isPro ? "pro" : "free"}
        >
          {visibleTrends.map((trend) => (
            <TrendCarouselCard
              key={trend.id}
              trend={trend}
              isSelected={selectedTrendId === trend.id}
              isApplied={appliedTrendId === trend.id}
              isCopied={copiedTrendId === trend.id}
              onClick={() => handleTrendActivate(trend)}
            />
          ))}
        </div>

        {isPro && selectedTrendId != null && (
          <TrendRefinePanel
            selectedTrendId={selectedTrendId}
            stickerFormat={stickerFormat}
            onStickerFormatChange={handleStickerFormatChange}
            selectedThemeId={selectedThemeId}
            onThemeChange={setSelectedThemeId}
            onThemeMenuOpenChange={handleThemeMenuOpenChange}
            themeSelectEnabled={themeSelectEnabled}
            chibiMode={chibiMode}
            onChibiModeChange={handleChibiModeChange}
            patchMode={patchMode}
            onPatchModeChange={handlePatchModeChange}
            patchType={patchType}
            onPatchTypeChange={handlePatchTypeChange}
            onPatchTypeMenuOpenChange={handleThemeMenuOpenChange}
            ditheringColorMode={ditheringColorMode}
            onDitheringColorModeChange={setDitheringColorMode}
            effectiveAspectRatio={effectiveAspectRatio}
            onAspectRatioChange={handleAspectRatioChange}
          />
        )}

        {!isPro && (
          <AspectRatioSelect
            value={effectiveAspectRatio}
            onChange={handleAspectRatioChange}
          />
        )}
      </section>

      <footer className="figma-footer shrink-0 flex items-center justify-between gap-3 px-4 py-2 text-[11px]">
        <span className="truncate min-w-0">{footerPrimaryLabel}</span>
        <div className="figma-footer-actions shrink-0 flex items-center gap-3">
          {footerNotice?.type === "updated" && (
            <span className="figma-footer-updated" aria-live="polite">
              <Check className="figma-footer-check" aria-hidden="true" />
              Prompt updated
            </span>
          )}
          {currentTrendData &&
            appliedTrendId === selectedTrendId &&
            nodesToSaveTrend.length > 0 && (
              <button
                type="button"
                onClick={handleClearTrend}
                className="figma-link-danger shrink-0"
              >
                Clear applied trend
              </button>
            )}
        </div>
      </footer>
    </div>
  );
}
