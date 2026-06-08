/**
 * Modal component for browsing trends
 * Displays grid view and detail view of design trends
 */

import { useEffect } from "react";
import { usePluginContext } from "./PluginController";
import { trends } from "../data/trends";
import { TrendCard } from "../components/TrendCard";
import { TrendDetail } from "../components/TrendDetail";
import { X } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";

export function TrendModal() {
  const {
    modalView,
    selectedTrendId,
    currentTrendData,
    setModalOpen,
    setModalView,
    setSelectedTrendId,
  } = usePluginContext();

  /**
   * Handle ESC key to close modal
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [setModalOpen]);

  /**
   * Handle clicking trend card to show detail view
   */
  const handleTrendClick = (trendId: number) => {
    setSelectedTrendId(trendId);
    setModalView('detail');
  };

  /**
   * Handle back button from detail view to grid
   */
  const handleBack = () => {
    setModalView('grid');
    setSelectedTrendId(null);
  };

  /**
   * Handle close button
   */
  const handleClose = () => {
    setModalOpen(false);
    setModalView('grid');
    setSelectedTrendId(null);
  };

  /**
   * Handle backdrop click to close
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Get selected trend for detail view
  const selectedTrend = selectedTrendId
    ? trends.find((t) => t.id === selectedTrendId)
    : null;

  // Check if a trend is currently applied
  const appliedTrendId = currentTrendData?.trendId;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-7xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Modal Content */}
        {modalView === 'grid' ? (
          // Grid View
          <ScrollArea className="h-full">
            <div className="p-12">
              <header className="mb-12">
                <h1 className="mb-4">2026 Design Trends</h1>
                <p className="text-gray-600 text-xl max-w-4xl">
                  Browse and apply aesthetic direction to your images.
                  Select a trend to view details and generate Midjourney prompts.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trends.map((trend) => (
                  <TrendCard
                    key={trend.id}
                    trend={trend}
                    onClick={() => handleTrendClick(trend.id)}
                    isApplied={appliedTrendId === trend.id}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
        ) : (
          // Detail View
          selectedTrend && (
            <TrendDetail
              trend={selectedTrend}
              onBack={handleBack}
            />
          )
        )}
      </div>
    </div>
  );
}
