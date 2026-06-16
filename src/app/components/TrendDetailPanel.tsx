import { useState } from "react";
import { Trend } from "../data/trends";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { buildFullPrompt, getStickerFormatLabel } from "../plugin/utils/promptBuilder";
import { saveTrendData } from "../plugin/utils/figmaMessaging";
import { copyTextToClipboard } from "../plugin/utils/copyToClipboard";
import { usePluginContext } from "../plugin/PluginController";

interface TrendDetailPanelProps {
  trend: Trend;
}

export function TrendDetailPanel({ trend }: TrendDetailPanelProps) {
  const { selectedNodes, stickerFormat } = usePluginContext();
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
    const fullPrompt = buildFullPrompt(
      trend.midjourneyPrompts.masterPrompt,
      variation,
      trend.midjourneyPrompts.aspectRatios,
      trend.midjourneyPrompts.negativePrompts,
      { stickerFormat }
    );

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
        }
      );
    }

    if (copied) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }

    const stickerLabel = getStickerFormatLabel(stickerFormat);
    const stickerSuffix = stickerLabel ? ` (${stickerLabel})` : "";

    if (selectedNodes.length > 0) {
      toast.success(
        copied
          ? `Prompt copied & saved to ${selectedNodes.length} node${selectedNodes.length !== 1 ? "s" : ""}${stickerSuffix}`
          : `Prompt saved to ${selectedNodes.length} node${selectedNodes.length !== 1 ? "s" : ""}${stickerSuffix} (clipboard unavailable)`
      );
    } else if (copied) {
      toast.success(
        stickerLabel
          ? `Midjourney prompt copied! (${stickerLabel})`
          : "Midjourney prompt copied!"
      );
    } else {
      toast.error("Failed to copy prompt");
    }
  };

  return (
    <div className="flex-1 min-h-0 rounded-lg border-2 border-black/80 overflow-hidden flex flex-col">
      <div className="flex-1 min-h-0 grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* Example image + controls */}
        <div className="relative border-r border-black/10 bg-black/[0.02] p-3 flex flex-col">
          <div className="relative flex-1 min-h-0 rounded-md overflow-hidden border border-black/15 bg-white">
            <ImageWithFallback
              src={trend.imageUrl}
              alt={trend.title}
              className="h-full w-full object-cover"
            />
            <span className="absolute left-2.5 top-2.5 font-mono text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {String(variationIndex + 1).padStart(2, "0")}
            </span>

            {/* Variation navigation — bottom-left */}
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-0.5">
              <button
                type="button"
                onClick={handlePrevVariation}
                className="flex h-7 w-7 items-center justify-center rounded border border-black/20 bg-white/90 hover:bg-white transition-colors"
                aria-label="Previous variation"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextVariation}
                className="flex h-7 w-7 items-center justify-center rounded border border-black/20 bg-white/90 hover:bg-white transition-colors"
                aria-label="Next variation"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Midjourney prompt copy — bottom-right */}
            <button
              type="button"
              onClick={() => copyPrompt(variationIndex)}
              className="absolute bottom-2.5 right-2.5 flex h-8 items-center gap-1.5 rounded border border-black/20 bg-white/95 px-2.5 hover:bg-white transition-colors shadow-sm"
              title="Copy Midjourney prompt"
            >
              {copiedIndex === variationIndex ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-black/70" />
              )}
              <span className="text-[10px] font-medium">MJ prompt</span>
            </button>
          </div>
        </div>

        {/* Prompt variations list */}
        <div className="flex flex-col min-h-0 bg-white">
          <div className="shrink-0 px-3 py-2 border-b border-black/10">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
              Prompt variations
            </p>
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
                  className={`w-full text-left px-3 py-2.5 border-b border-black/5 transition-colors ${
                    isActive ? "bg-black/[0.04]" : "hover:bg-black/[0.02]"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground pt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="flex-1 text-xs leading-relaxed text-foreground/90 line-clamp-3">
                      {variation.replace(/--ar \S+/g, "").trim()}
                    </p>
                    <span className="shrink-0 pt-0.5">
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 text-black/25" />
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
