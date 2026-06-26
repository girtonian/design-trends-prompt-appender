const TOGGLE_OPTIONS: { value: boolean; label: string }[] = [
  { value: false, label: "Off" },
  { value: true, label: "On" },
];

interface ControlToggleRowProps {
  label: string;
  value: boolean;
  onChange: (enabled: boolean) => void;
  ariaLabel: string;
}

export function ControlToggleRow({
  label,
  value,
  onChange,
  ariaLabel,
}: ControlToggleRowProps) {
  return (
    <div className="figma-control-row shrink-0 mb-2 min-w-0">
      <span className="figma-section-title shrink-0">{label}</span>
      <div className="figma-control-actions">
        <div className="figma-segment-group" role="group" aria-label={ariaLabel}>
          {TOGGLE_OPTIONS.map(({ value: optionValue, label: optionLabel }) => {
            const isActive = value === optionValue;
            return (
              <button
                key={optionLabel}
                type="button"
                onClick={() => onChange(optionValue)}
                aria-pressed={isActive ? "true" : "false"}
                className={`figma-segment ${isActive ? "figma-segment-active" : ""}`}
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
