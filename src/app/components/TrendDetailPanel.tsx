import { useState } from "react";
import { Trend } from "../data/trends";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, Sparkles, Check } from "lucide-react";
import { buildTrendTapPrompt } from "../plugin/utils/buildTrendTapPrompt";
import { saveTrendData } from "../plugin/utils/figmaMessaging";
import { copyTextToClipboard } from "../plugin/utils/copyToClipboard";
import { usePluginContext } from "../plugin/PluginController";
import {
  DITHERING_ASCII_TREND_ID,
  XEROX_PUNK_TREND_ID,
} from "../data/trendIds";
import { getEffectiveAspectRatio } from "../plugin/utils/aspectRatioPresets";

interface TrendDetailPanelProps {
  trend: Trend;
}

export function TrendDetailPanel({ trend }: TrendDetailPanelProps) {
  const {
    selectedNodes,
    stickerFormat,
    selectedThemeId,
    selectedAspectRatio,
    chibiMode,
    xeroxPatchMode,
    ditheringColorMode,
    isPro,
  } = usePluginContext();
  const [variationIndex, setVariationIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const variations = trend.midjourneyPrompts.variations;

  const handlePrevVariation = () => {
    setVariationIndex((i) => (i > 0 ? i - 1 : variations.length - 1));
  };

  const handleNextVariation = () => {
    setVariationIndex((i) => (i < variations.length - 1 ? i + 1 : 0));
  };

  const copyPrompt = async (index: number) => {
    const variation = variations[index];
    const effectiveAspectRatio = getEffectiveAspectRatio(
      stickerFormat,
      selectedAspectRatio
    );
    const fullPrompt = buildTrendTapPrompt({
      trend,
      variationIndex: index,
      modifiers: {
        stickerFormat,
        themeId: selectedThemeId,
        chibiMode,
        xeroxPatchMode:
          trend.id === XEROX_PUNK_TREND_ID ? xeroxPatchMode : false,
        ditheringColorMode:
          trend.id === DITHERING_ASCII_TREND_ID ? ditheringColorMode : false,
        aspectRatio: effectiveAspectRatio,
        isPro,
      },
    });

    const copied = await copyTextToClipboard(fullPrompt);
    setVariationIndex(index);

    if (selectedNodes.length > 0) {
      saveTrendData(
        selectedNodes.map((n) => n.id),
        {
          trendId: trend.id,
          trendTitle: trend.title,
          selectedVariationIndex: index,
          selectedVariation: variation,
          fullPrompt,
          appliedAt: Date.now(),
          stickerFormat,
          selectedThemeId,
        }
      );
    }

    if (copied) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="figma-panel flex-1 min-h-0 flex flex-col">
      <div className="figma-detail-grid flex-1 min-h-0">
        <div className="figma-detail-preview relative border-r border-border bg-[var(--figma-color-bg-secondary,rgba(0,0,0,0.02))] p-2 flex flex-col">
          <div className="relative flex-1 min-h-0 rounded overflow-hidden border border-border bg-background">
            <ImageWithFallback
              src={trend.imageUrl}
              alt={trend.title}
              className="h-full w-full object-cover"
            />
            <span className="absolute left-2 top-2 font-mono text-[11px] font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {String(variationIndex + 1).padStart(2, "0")}
            </span>

            <div className="absolute bottom-2 left-2 flex items-center gap-0.5">
              <button
                type="button"
                onClick={handlePrevVariation}
                className="figma-btn"
                aria-label="Previous variation"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextVariation}
                className="figma-btn"
                aria-label="Next variation"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => copyPrompt(variationIndex)}
              className="figma-btn absolute bottom-2 right-2 gap-1.5 px-2"
              title="Copy Weave-ready prompt"
            >
              {copiedIndex === variationIndex ? (
                <Check className="h-3.5 w-3.5 figma-icon-success" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 opacity-70" />
              )}
              <span className="text-[10px] font-medium">Weave prompt</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col min-h-0 bg-background">
          <div className="shrink-0 px-3 py-1.5 border-b border-border">
            <p className="figma-label-muted">Prompt variations</p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto">
            {variations.map((variation, index) => {
              const isActive = index === variationIndex;
              const isCopied = copiedIndex === index;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setVariationIndex(index);
                    copyPrompt(index);
                  }}
                  className={`figma-list-row w-full text-left px-3 py-2 ${
                    isActive ? "figma-list-row-active" : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground pt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="flex-1 text-[11px] leading-relaxed text-foreground/90 line-clamp-3">
                      {variation.replace(/--ar \S+/g, "").trim()}
                    </p>
                    <span className="shrink-0 pt-0.5">
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 figma-icon-success" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 opacity-25" />
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
