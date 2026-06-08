import { Trend } from "../data/trends";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Check } from "lucide-react";

interface TrendCardProps {
  trend: Trend;
  onClick: () => void;
  isApplied?: boolean;
}

export function TrendCard({ trend, onClick, isApplied = false }: TrendCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 text-left w-full"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={trend.imageUrl}
          alt={trend.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-sm text-gray-400">
            {String(trend.id).padStart(2, '0')}
          </span>
          <h3 className="flex-1">{trend.title}</h3>
        </div>

        <p className="text-gray-500 mb-4">{trend.tagline}</p>

        <div className="flex flex-wrap gap-2">
          {trend.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: trend.color }}
      />

      {/* Applied Indicator Badge */}
      {isApplied && (
        <div className="absolute top-4 right-4 bg-green-600 text-white rounded-full p-2 shadow-lg">
          <Check className="w-4 h-4" />
        </div>
      )}
    </button>
  );
}
