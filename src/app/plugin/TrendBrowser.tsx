/**
 * Main plugin UI — wireframe layout with trend carousel + detail panel
 */

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { usePluginContext } from "./PluginController";
import { trends } from "../data/trends";
import { TrendCarouselCard } from "../components/TrendCarouselCard";
import { TrendDetailPanel } from "../components/TrendDetailPanel";
import { clearTrendData } from "./utils/figmaMessaging";
import { copyTextToClipboard } from "./utils/copyToClipboard";

const CARDS_PER_PAGE = 4;

export function TrendBrowser() {
  const {
    selectedNodes,
    currentTrendData,
    refreshSelection,
  } = usePluginContext();

  const [selectedTrendId, setSelectedTrendId] = useState(1);
  const [carouselPage, setCarouselPage] = useState(0);
  const [copiedMaster, setCopiedMaster] = useState(false);

  const selectedTrend = trends.find((t) => t.id === selectedTrendId) ?? trends[0];
  const appliedTrendId = currentTrendData?.trendId ?? null;
  const totalPages = Math.ceil(trends.length / CARDS_PER_PAGE);

  useEffect(() => {
    if (appliedTrendId) {
      setSelectedTrendId(appliedTrendId);
      setCarouselPage(Math.floor((appliedTrendId - 1) / CARDS_PER_PAGE));
    }
  }, [appliedTrendId]);

  const handlePrevPage = () => {
    setCarouselPage((p) => Math.max(0, p - 1));
  };

  const handleNextPage = () => {
    setCarouselPage((p) => Math.min(totalPages - 1, p + 1));
  };

  const handleTrendSelect = (trendId: number) => {
    setSelectedTrendId(trendId);
  };

  const handleCopyMasterPrompt = async () => {
    const text = selectedTrend.midjourneyPrompts.masterPrompt;
    const copied = await copyTextToClipboard(text);
    if (copied) {
      setCopiedMaster(true);
      toast.success("Master prompt copied!");
      setTimeout(() => setCopiedMaster(false), 2000);
    } else {
      toast.error("Failed to copy master prompt");
    }
  };

  const handleClearTrend = () => {
    if (selectedNodes.length === 0) return;
    const nodeIds = selectedNodes.map((n) => n.id);
    clearTrendData(nodeIds);
    toast.success(`Cleared trend from ${nodeIds.length} node${nodeIds.length !== 1 ? "s" : ""}`);
    refreshSelection();
  };

  const visibleTrends = trends.slice(
    carouselPage * CARDS_PER_PAGE,
    carouselPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const selectionLabel =
    selectedNodes.length === 0
      ? "No selection — prompts copy to clipboard only"
      : selectedNodes.length === 1
        ? `1 node: "${selectedNodes[0].name || "Unnamed"}"`
        : `${selectedNodes.length} nodes selected`;

  return (
    <div className="flex flex-col h-screen bg-white text-foreground">
      {/* Trend carousel section */}
      <section className="shrink-0 px-5 pt-5 pb-4 border-b border-black/10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold tracking-tight">Design Trend</h1>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={carouselPage === 0}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black/80 bg-white hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous trends"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={carouselPage >= totalPages - 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black/80 bg-white hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next trends"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {visibleTrends.map((trend) => (
            <TrendCarouselCard
              key={trend.id}
              trend={trend}
              isSelected={selectedTrendId === trend.id}
              isApplied={appliedTrendId === trend.id}
              onClick={() => handleTrendSelect(trend.id)}
            />
          ))}
        </div>
      </section>

      {/* Detail panel section */}
      <section className="flex-1 min-h-0 flex flex-col px-5 py-4">
        <div className="flex items-center gap-2 mb-3 shrink-0">
          <h2 className="text-base font-semibold">
            {String(selectedTrend.id).padStart(2, "0")} {selectedTrend.title}
          </h2>
          <button
            type="button"
            onClick={handleCopyMasterPrompt}
            className="flex h-7 w-7 items-center justify-center rounded border border-black/20 bg-white hover:bg-black/5 transition-colors"
            title="Copy master prompt"
            aria-label="Copy master prompt"
          >
            {copiedMaster ? (
              <Check className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-black/60" />
            )}
          </button>
        </div>

        <TrendDetailPanel key={selectedTrend.id} trend={selectedTrend} />
      </section>

      {/* Footer status bar */}
      <footer className="shrink-0 flex items-center justify-between gap-3 px-5 py-2.5 border-t border-black/10 bg-black/[0.02] text-xs text-muted-foreground">
        <span className="truncate">{selectionLabel}</span>
        {currentTrendData && appliedTrendId === selectedTrendId && (
          <button
            type="button"
            onClick={handleClearTrend}
            className="shrink-0 text-destructive hover:underline"
          >
            Clear applied trend
          </button>
        )}
      </footer>
    </div>
  );
}
