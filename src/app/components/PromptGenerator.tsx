import { useState } from "react";
import { Trend } from "../data/trends";
import { Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { buildFullPrompt } from "../plugin/utils/promptBuilder";
import { saveTrendData } from "../plugin/utils/figmaMessaging";
import { usePluginContext } from "../plugin/PluginController";

interface PromptGeneratorProps {
  trend: Trend;
  onPromptSelect?: (variation: string, fullPrompt: string, index: number) => void;
}

export function PromptGenerator({ trend, onPromptSelect }: PromptGeneratorProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { selectedNodes } = usePluginContext();

  const copyToClipboard = async (text: string, index: number, variation: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);

      // Store to Figma node if selection exists
      if (selectedNodes.length > 0) {
        const trendData = {
          trendId: trend.id,
          trendTitle: trend.title,
          selectedVariationIndex: index,
          selectedVariation: variation,
          fullPrompt: text,
          appliedAt: Date.now(),
        };

        const nodeIds = selectedNodes.map((node) => node.id);
        saveTrendData(nodeIds, trendData);

        toast.success(`Prompt copied and saved to ${nodeIds.length} node${nodeIds.length !== 1 ? 's' : ''}!`);
      } else {
        toast.success("Prompt copied to clipboard!");
      }

      // Call optional callback
      if (onPromptSelect) {
        onPromptSelect(variation, text, index);
      }

      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedIndex(index);
        toast.success("Prompt copied to clipboard!");
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (fallbackErr) {
        console.error("Copy failed:", fallbackErr);
        toast.error("Failed to copy prompt. Please copy manually.");
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-gray-700" />
        <h2>Midjourney Prompt Generator</h2>
      </div>

      <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/60">
        <h3 className="mb-3">Master Prompt</h3>
        <p className="text-sm text-gray-700 leading-relaxed italic">
          {trend.midjourneyPrompts.masterPrompt}
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600">
            Aspect Ratios: {trend.midjourneyPrompts.aspectRatios.join(", ")}
          </span>
        </div>
      </div>

      <div>
        <h3 className="mb-4">Prompt Variations (Click to Copy)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trend.midjourneyPrompts.variations.map((variation, index) => {
            const fullPrompt = buildFullPrompt(
              trend.midjourneyPrompts.masterPrompt,
              variation,
              trend.midjourneyPrompts.aspectRatios,
              trend.midjourneyPrompts.negativePrompts
            );
            const isCopied = copiedIndex === index;

            return (
              <button
                key={index}
                onClick={() => copyToClipboard(fullPrompt, index, variation)}
                className="group relative bg-white/60 backdrop-blur-sm hover:bg-white/80 rounded-lg p-4 border border-white/60 hover:border-gray-300 transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs mt-0.5">
                    {index + 1}
                  </span>
                  <p className="flex-1 text-sm text-gray-800 pr-8">
                    {variation}
                  </p>
                  <div className="absolute top-4 right-4">
                    {isCopied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-100/60 backdrop-blur-sm rounded-lg p-4 text-sm text-gray-600">
        <p>
          <strong>How it works:</strong> Each variation is automatically combined with the master prompt and negative prompts. 
          Click any variation to copy the complete, ready-to-use Midjourney prompt.
        </p>
      </div>
    </div>
  );
}