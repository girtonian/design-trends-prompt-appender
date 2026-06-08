import { Trend } from "../data/trends";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft } from "lucide-react";
import { PromptGenerator } from "./PromptGenerator";

interface TrendDetailProps {
  trend: Trend;
  onBack: () => void;
}

export function TrendDetail({ trend, onBack }: TrendDetailProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: trend.color }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-12 text-gray-700 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Index</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <div className="mb-6">
              <span className="text-sm text-gray-500 mb-4 block">
                Trend {String(trend.id).padStart(2, '0')}
              </span>
              <h1 className="mb-4">{trend.title}</h1>
              <p className="text-2xl text-gray-600">{trend.tagline}</p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="mb-3">Overview</h2>
                <p className="text-gray-700 leading-relaxed">
                  {trend.description}
                </p>
              </div>

              <div>
                <h3 className="mb-3">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {trend.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-gray-800"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3">Mood</h3>
                <p className="text-gray-700">{trend.mood}</p>
              </div>

              <div>
                <h3 className="mb-3">Applications</h3>
                <ul className="space-y-2">
                  {trend.applications.map((application) => (
                    <li
                      key={application}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-gray-400 mt-1">•</span>
                      <span>{application}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-12">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={trend.imageUrl}
                alt={trend.title}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Midjourney Prompt Generator Section */}
        <div className="max-w-5xl mx-auto">
          <PromptGenerator trend={trend} />
        </div>
      </div>
    </div>
  );
}