import { Trend } from "../data/trends";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Check } from "lucide-react";

interface TrendCarouselCardProps {
  trend: Trend;
  isSelected: boolean;
  isApplied?: boolean;
  isCopied?: boolean;
  onClick: () => void;
}

export function TrendCarouselCard({
  trend,
  isSelected,
  isApplied = false,
  isCopied = false,
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
      <div className="figma-card-thumb relative overflow-hidden bg-[var(--figma-color-bg-secondary,rgba(0,0,0,0.03))]">
        <ImageWithFallback
          src={trend.imageUrl}
          alt={trend.title}
          className="h-full w-full object-cover"
        />
        <span className="figma-card-index">
          {String(trend.id).padStart(2, "0")}
        </span>
        {isApplied && (
          <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--figma-color-bg-success,#14ae5c)] text-white">
            <Check className="h-2 w-2" />
          </span>
        )}
        {isCopied && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--figma-color-bg-success,#14ae5c)] text-white">
              <Check className="h-3 w-3" />
            </span>
          </span>
        )}
      </div>
      <div className="figma-card-label">
        <p className="figma-card-label-text">{trend.title}</p>
      </div>
    </button>
  );
}
