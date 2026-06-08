/**
 * Sidebar panel component
 * Displays selection status, current trend, and quick actions
 */

import { usePluginContext } from "./PluginController";
import { trends } from "../data/trends";
import { canStoreData } from "./utils/figmaStorage";
import { clearTrendData } from "./utils/figmaMessaging";
import { Sparkles, Grid3x3, Copy, Trash2, Info } from "lucide-react";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { toast } from "sonner@2.0.3";

/**
 * Formats timestamp to relative time (e.g., "2 minutes ago")
 */
function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function Sidebar() {
  const {
    selectedNodes,
    currentTrendData,
    setModalOpen,
    setModalView,
    refreshSelection,
  } = usePluginContext();

  /**
   * Opens the trend browser modal
   */
  const handleBrowseTrends = () => {
    setModalView('grid');
    setModalOpen(true);
  };

  /**
   * Copies the last applied prompt to clipboard
   */
  const handleCopyPrompt = async () => {
    if (!currentTrendData || !currentTrendData.fullPrompt) {
      toast.error('No prompt to copy');
      return;
    }

    try {
      await navigator.clipboard.writeText(currentTrendData.fullPrompt);
      toast.success('Prompt copied to clipboard!');
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = currentTrendData.fullPrompt;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success('Prompt copied to clipboard!');
      } catch (fallbackError) {
        toast.error('Failed to copy prompt');
      }
      document.body.removeChild(textArea);
    }
  };

  /**
   * Clears trend data from selected node(s)
   */
  const handleClearTrend = () => {
    if (selectedNodes.length === 0) {
      toast.error('No nodes selected');
      return;
    }

    const nodeIds = selectedNodes.map((node) => node.id);
    clearTrendData(nodeIds);

    toast.success(`Cleared trend from ${nodeIds.length} node${nodeIds.length !== 1 ? 's' : ''}`);
    refreshSelection();
  };

  /**
   * Determines what content to show based on selection state
   */
  const getSelectionStatus = () => {
    if (selectedNodes.length === 0) {
      return {
        type: 'none',
        message: 'Select a frame or image to apply design trends',
      };
    }

    if (selectedNodes.length === 1) {
      const node = selectedNodes[0];
      const nodeName = node.name || 'Unnamed';

      // Check if node type supports storage (using type property)
      const unsupportedTypes = ['DOCUMENT', 'PAGE', 'SLICE'];
      if (unsupportedTypes.includes(node.type)) {
        return {
          type: 'invalid',
          message: `"${nodeName}" doesn't support metadata storage`,
          hint: 'Try selecting a frame, component, or shape',
        };
      }

      return {
        type: 'valid',
        message: `1 node selected: "${nodeName}"`,
      };
    }

    const unsupportedTypes = ['DOCUMENT', 'PAGE', 'SLICE'];
    const validNodes = selectedNodes.filter((node) => !unsupportedTypes.includes(node.type));

    return {
      type: 'multiple',
      message: `${selectedNodes.length} nodes selected`,
      hint: `${validNodes.length} can store metadata`,
    };
  };

  const selectionStatus = getSelectionStatus();
  const currentTrend = currentTrendData
    ? trends.find((t) => t.id === currentTrendData.trendId)
    : null;

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold">Design Trends</h2>
        </div>
        <p className="text-sm text-gray-500">
          Apply 2026 aesthetic styles to your images
        </p>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Selection Status */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selection</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">{selectionStatus.message}</p>
              {selectionStatus.hint && (
                <p className="text-xs text-gray-500 mt-1">{selectionStatus.hint}</p>
              )}
            </div>
          </div>

          {/* Current Trend Display */}
          {currentTrend && currentTrendData && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Applied Trend</h3>
              <div
                className="rounded-lg p-4 border-2"
                style={{
                  backgroundColor: currentTrend.color,
                  borderColor: currentTrend.color,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{currentTrend.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{currentTrend.tagline}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-white/60 rounded-full text-gray-700">
                    #{currentTrend.id}
                  </span>
                </div>

                {currentTrendData.selectedVariation && (
                  <div className="mt-3 pt-3 border-t border-gray-300/30">
                    <p className="text-xs text-gray-600 mb-1">Variation:</p>
                    <p className="text-xs text-gray-700 line-clamp-2">
                      {currentTrendData.selectedVariation}
                    </p>
                  </div>
                )}

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                  <Info className="w-3 h-3" />
                  <span>Applied {formatTimeAgo(currentTrendData.appliedAt)}</span>
                </div>
              </div>
            </div>
          )}

          {/* No Trend Applied */}
          {!currentTrend && selectionStatus.type === 'valid' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Applied Trend</h3>
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                <p className="text-sm text-gray-500 text-center">
                  No trend applied yet
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-200 space-y-2">
        <Button
          onClick={handleBrowseTrends}
          className="w-full"
          size="lg"
        >
          <Grid3x3 className="w-4 h-4 mr-2" />
          Browse Trends
        </Button>

        {currentTrendData && currentTrendData.fullPrompt && (
          <Button
            onClick={handleCopyPrompt}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Prompt
          </Button>
        )}

        {currentTrendData && (
          <Button
            onClick={handleClearTrend}
            variant="outline"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
            size="lg"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Trend
          </Button>
        )}
      </div>
    </div>
  );
}
