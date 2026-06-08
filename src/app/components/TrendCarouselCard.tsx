import { Trend } from "../data/trends";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Check } from "lucide-react";

interface TrendCarouselCardProps {
  trend: Trend;
  isSelected: boolean;
  isApplied?: boolean;
  onClick: () => void;
}

export function TrendCarouselCard({
  trend,
  isSelected,
  isApplied = false,
  onClick,
}: TrendCarouselCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col overflow-hidden rounded-lg border-2 bg-white text-left transition-all ${
        isSelected
          ? "border-black shadow-sm"
          : "border-black/20 hover:border-black/50"
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-black/[0.03]">
        <ImageWithFallback
          src={trend.imageUrl}
          alt={trend.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-2 top-2 text-xs font-mono font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {String(trend.id).padStart(2, "0")}
        </span>
        {isApplied && (
          <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
            <Check className="h-3 w-3" />
          </span>
        )}
      </div>
      <div className="px-2 py-2 border-t border-black/10">
        <p className="text-[11px] font-medium leading-tight line-clamp-2">
          {trend.title}
        </p>
      </div>
    </button>
  );
}
