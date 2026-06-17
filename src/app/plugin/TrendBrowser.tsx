/**
 * Main plugin UI — wireframe layout with trend carousel + detail panel
 */

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { usePluginContext } from "./PluginController";
import { trends } from "../data/trends";
import {
  formatPromptToastSuffix,
  getThemeFooterSuffix,
  resolveActiveThemeSubjectPrompt,
} from "../data/themes";
import { TrendCarouselCard } from "../components/TrendCarouselCard";
import { TrendDetailPanel } from "../components/TrendDetailPanel";
import { ThemeSelect } from "../components/ThemeSelect";
import { clearTrendData } from "./utils/figmaMessaging";
import {
  applyStickerToMasterPrompt,
  getStickerFormatFooterSuffix,
  type StickerFormat,
} from "./utils/promptBuilder";
import { copyTextToClipboard } from "./utils/copyToClipboard";

const CARDS_PER_PAGE = 4;

const STICKER_FORMAT_OPTIONS: { value: StickerFormat; label: string }[] = [
  { value: "off", label: "Off" },
  { value: "single", label: "Single" },
  { value: "sheet", label: "Sheet" },
];

export function TrendBrowser() {
  const {
    selectedNodes,
    currentTrendData,
    refreshSelection,
    stickerFormat,
    setStickerFormat,
    selectedThemeId,
    setSelectedThemeId,
  } = usePluginContext();

  const [selectedTrendId, setSelectedTrendId] = useState(1);
  const [carouselPage, setCarouselPage] = useState(0);
  const [copiedMaster, setCopiedMaster] = useState(false);

  const selectedTrend = trends.find((t) => t.id === selectedTrendId) ?? trends[0];
  const appliedTrendId = currentTrendData?.trendId ?? null;
  const totalPages = Math.ceil(trends.length / CARDS_PER_PAGE);
  const stickerFooterSuffix = getStickerFormatFooterSuffix(stickerFormat);
  const themeFooterSuffix = getThemeFooterSuffix(selectedThemeId, stickerFormat);
  const toastSuffix = formatPromptToastSuffix(stickerFormat, selectedThemeId);

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
    const masterPrompt = selectedTrend.midjourneyPrompts.masterPrompt;
    const themeSubjectPrompt = resolveActiveThemeSubjectPrompt(
      stickerFormat,
      selectedThemeId
    );
    const text =
      stickerFormat === "off"
        ? masterPrompt
        : applyStickerToMasterPrompt(
            masterPrompt,
            stickerFormat,
            themeSubjectPrompt
          );
    const copied = await copyTextToClipboard(text);
    if (copied) {
      setCopiedMaster(true);
      toast.success(
        toastSuffix ? `Master prompt copied!${toastSuffix}` : "Master prompt copied!"
      );
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
      ? stickerFormat !== "off"
        ? "No selection — sticker prompts copy to clipboard only"
        : "No selection — prompts copy to clipboard only"
      : selectedNodes.length === 1
        ? `1 node: "${selectedNodes[0].name || "Unnamed"}"${stickerFooterSuffix}${themeFooterSuffix}`
        : `${selectedNodes.length} nodes selected${stickerFooterSuffix}${themeFooterSuffix}`;

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <section className="shrink-0 px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <h1 className="figma-section-title shrink-0">Design Trend</h1>
            <div className="figma-segment-group" role="group" aria-label="Sticker format">
              {STICKER_FORMAT_OPTIONS.map(({ value, label }) => {
                const isActive = stickerFormat === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStickerFormat(value)}
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
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={carouselPage === 0}
              className="figma-btn"
              aria-label="Previous trends"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={carouselPage >= totalPages - 1}
              className="figma-btn"
              aria-label="Next trends"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
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

      <section className="flex-1 min-h-0 flex flex-col px-4 py-3">
        <div className="flex items-center gap-2 mb-2 shrink-0">
          <h2 className="figma-subtitle">
            {String(selectedTrend.id).padStart(2, "0")} {selectedTrend.title}
          </h2>
          <button
            type="button"
            onClick={handleCopyMasterPrompt}
            className="figma-btn"
            title="Copy master prompt"
            aria-label="Copy master prompt"
          >
            {copiedMaster ? (
              <Check className="h-3.5 w-3.5 figma-icon-success" />
            ) : (
              <Copy className="h-3.5 w-3.5 opacity-70" />
            )}
          </button>
        </div>

        <TrendDetailPanel key={selectedTrend.id} trend={selectedTrend} />
      </section>

      <footer className="figma-footer shrink-0 flex items-center justify-between gap-3 px-4 py-2 text-[11px]">
        <span className="truncate">{selectionLabel}</span>
        {currentTrendData && appliedTrendId === selectedTrendId && (
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
