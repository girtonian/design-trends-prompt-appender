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
      className={`figma-card group relative flex flex-col overflow-hidden text-left ${
        isSelected ? "figma-card-selected" : ""
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--figma-color-bg-secondary,rgba(0,0,0,0.03))]">
        <ImageWithFallback
          src={trend.imageUrl}
          alt={trend.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-1.5 top-1.5 text-[10px] font-mono font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {String(trend.id).padStart(2, "0")}
        </span>
        {isApplied && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--figma-color-bg-success,#14ae5c)] text-white">
            <Check className="h-2.5 w-2.5" />
          </span>
        )}
      </div>
      <div className="px-2 py-1.5 border-t border-border">
        <p className="text-[10px] font-medium leading-tight line-clamp-2 text-foreground">
          {trend.title}
        </p>
      </div>
    </button>
  );
}
