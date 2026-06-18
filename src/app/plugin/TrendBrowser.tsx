/**
 * Main plugin UI — trend grid (tap card to copy prompt + resize Make an image placeholder)
 */

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { usePluginContext } from "./PluginController";
import { trends, type Trend } from "../data/trends";
import {
  formatPromptToastSuffix,
  getThemeFooterSuffix,
  resolveActiveThemeSubjectPrompt,
} from "../data/themes";
import { TrendCarouselCard } from "../components/TrendCarouselCard";
import { PluginResizeHandles } from "../components/PluginResizeHandles";
import { ThemeSelect } from "../components/ThemeSelect";
import { AspectRatioSelect } from "../components/AspectRatioSelect";
import {
  clearTrendData,
  onPluginMessage,
  resizeGenerationTarget,
  saveAspectRatioPreference,
  saveTrendData,
} from "./utils/figmaMessaging";
import {
  buildMasterPromptText,
  getStickerFormatFooterSuffix,
  type StickerFormat,
} from "./utils/promptBuilder";
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

/** Set to true to restore TrendDetailPanel import + bottom variations section */
export const SHOW_PROMPT_VARIATIONS = false;

const STICKER_FORMAT_OPTIONS: { value: StickerFormat; label: string }[] = [
  { value: "off", label: "Off" },
  { value: "single", label: "Single" },
  { value: "sheet", label: "Sheet" },
];

const MAKE_IMAGE_TOAST =
  "Prompt copied — open Make an image and paste (⌘V)";

const NO_PLACEHOLDER_TOAST =
  "Prompt copied — select a Make an image placeholder to set size";

export function TrendBrowser() {
  const {
    selectedNodes,
    currentTrendData,
    refreshSelection,
    stickerFormat,
    setStickerFormat,
    selectedThemeId,
    setSelectedThemeId,
    selectedAspectRatio,
    setSelectedAspectRatio,
    activeGenerationTarget,
  } = usePluginContext();

  const [selectedTrendId, setSelectedTrendId] = useState(1);
  const [copiedTrendId, setCopiedTrendId] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  const appliedTrendId = currentTrendData?.trendId ?? null;
  const stickerFooterSuffix = getStickerFormatFooterSuffix(stickerFormat);
  const themeFooterSuffix = getThemeFooterSuffix(selectedThemeId, stickerFormat);
  const toastSuffix = formatPromptToastSuffix(stickerFormat, selectedThemeId);
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
  const nodesToSaveTrend = selectedNodes.filter(
    (node) => !node.isMakeImageTarget
  );

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
    const cleanup = onPluginMessage((message) => {
      if (message.type !== "generation-target-ready") return;
      if (!message.userInitiated) return;
      if (!message.resized) {
        toast.message("Select a Make an image placeholder to resize");
      }
    });

    return cleanup;
  }, []);

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

  const copyMasterForTrend = async (trend: Trend) => {
    const themeSubjectPrompt = resolveActiveThemeSubjectPrompt(
      stickerFormat,
      selectedThemeId
    );
    const text = buildMasterPromptText(
      trend.midjourneyPrompts.masterPrompt,
      stickerFormat,
      themeSubjectPrompt,
      effectiveAspectRatio
    );
    const copied = await copyTextToClipboard(text);

    if (nodesToSaveTrend.length > 0) {
      saveTrendData(
        nodesToSaveTrend.map((n) => n.id),
        {
          trendId: trend.id,
          trendTitle: trend.title,
          selectedVariationIndex: null,
          selectedVariation: null,
          fullPrompt: text,
          appliedAt: Date.now(),
          stickerFormat,
          selectedThemeId,
        }
      );
    }

    const promptToast = hasMakeImageTargetSelected
      ? MAKE_IMAGE_TOAST
      : NO_PLACEHOLDER_TOAST;

    if (copied) {
      if (nodesToSaveTrend.length > 0) {
        toast.success(
          `${promptToast} · Saved to ${nodesToSaveTrend.length} node${nodesToSaveTrend.length !== 1 ? "s" : ""}${toastSuffix}`
        );
      } else {
        toast.success(
          toastSuffix ? `${promptToast}${toastSuffix}` : promptToast
        );
      }
    } else if (nodesToSaveTrend.length > 0) {
      toast.success(
        `Prompt saved to ${nodesToSaveTrend.length} node${nodesToSaveTrend.length !== 1 ? "s" : ""}${toastSuffix} (clipboard unavailable)`
      );
    } else {
      toast.error("Failed to copy prompt");
    }

    return copied;
  };

  const handleTrendActivate = async (trend: Trend) => {
    setSelectedTrendId(trend.id);
    const copied = await copyMasterForTrend(trend);
    if (copied) {
      setCopiedTrendId(trend.id);
      setTimeout(() => setCopiedTrendId(null), 2000);
    }
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
      toast.message("Choose a theme for sticker subjects");
    }
  };

  const handleClearTrend = () => {
    if (nodesToSaveTrend.length === 0) return;
    const nodeIds = nodesToSaveTrend.map((n) => n.id);
    clearTrendData(nodeIds);
    toast.success(`Cleared trend from ${nodeIds.length} node${nodeIds.length !== 1 ? "s" : ""}`);
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

  const selectionLabel =
    selectedNodes.length === 0
      ? targetLabel ??
        (stickerFormat === "sheet"
          ? `Sticker sheet · ${effectiveAspectRatio}${sheetFooterSuffix}`
          : stickerFormat !== "off"
            ? "No selection — sticker prompts copy to clipboard only"
            : "No selection — prompts copy to clipboard only")
      : selectedNodes.length === 1
        ? hasMakeImageTargetSelected
          ? `1 node: "${selectedNodes[0].name || "Unnamed"}" · ${makeImageAspectLabel}${stickerFooterSuffix}${sheetFooterSuffix}${themeFooterSuffix}`
          : `1 node: "${selectedNodes[0].name || "Unnamed"}"${stickerFooterSuffix}${sheetFooterSuffix}${themeFooterSuffix}`
        : `${selectedNodes.length} nodes selected${stickerFooterSuffix}${sheetFooterSuffix}${themeFooterSuffix}`;

  return (
    <div
      ref={rootRef}
      data-narrow={isNarrow ? "true" : undefined}
      className="figma-plugin-root flex flex-col h-screen bg-background text-foreground"
    >
      <PluginResizeHandles />
      <section className="figma-trends-section flex flex-1 flex-col px-3 pt-3 pb-2 min-h-0">
        <div className="figma-controls-row shrink-0 flex items-center gap-2 mb-2 min-w-0 flex-wrap">
          <h1 className="figma-section-title shrink-0">Design Trend</h1>
          <div className="figma-segment-group" role="group" aria-label="Sticker format">
            {STICKER_FORMAT_OPTIONS.map(({ value, label }) => {
              const isActive = stickerFormat === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleStickerFormatChange(value)}
                  aria-pressed={isActive ? "true" : "false"}
                  className={`figma-segment ${isActive ? "figma-segment-active" : ""}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <ThemeSelect
            value={selectedThemeId}
            onChange={setSelectedThemeId}
            stickerFormat={stickerFormat}
          />
        </div>

        <AspectRatioSelect
          value={effectiveAspectRatio}
          onChange={handleAspectRatioChange}
        />

        <div className="figma-trend-grid flex-1 min-h-0">
          {trends.map((trend) => (
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
      </section>

      <footer className="figma-footer shrink-0 flex items-center justify-between gap-3 px-4 py-2 text-[11px]">
        <span className="truncate">{selectionLabel}</span>
        {currentTrendData && appliedTrendId === selectedTrendId && nodesToSaveTrend.length > 0 && (
          <button
            type="button"
            onClick={handleClearTrend}
            className="figma-link-danger shrink-0"
          >
            Clear applied trend
          </button>
        )}
      </footer>
    </div>
  );
}
