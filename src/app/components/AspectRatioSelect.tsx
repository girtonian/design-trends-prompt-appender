import {
  ASPECT_RATIO_PRESETS,
  type AspectRatioPreset,
} from "../plugin/utils/aspectRatioPresets";

interface AspectRatioSelectProps {
  value: AspectRatioPreset;
  onChange: (preset: AspectRatioPreset) => void;
  disabled?: boolean;
}

export function AspectRatioSelect({
  value,
  onChange,
  disabled = false,
}: AspectRatioSelectProps) {
  return (
    <div className="figma-control-row shrink-0 mb-2 min-w-0">
      <span className="figma-section-title shrink-0">Aspect</span>
      <div className="figma-control-actions">
        <div
          className="figma-segment-group figma-aspect-segments"
          role="group"
          aria-label="Aspect ratio"
        >
          {ASPECT_RATIO_PRESETS.map((preset) => {
            const isActive = value === preset;
            return (
              <button
                key={preset}
                type="button"
                disabled={disabled}
                onClick={() => onChange(preset)}
                aria-pressed={isActive ? "true" : "false"}
                className={`figma-segment figma-aspect-segment ${isActive ? "figma-segment-active" : ""}`}
              >
                {preset}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
