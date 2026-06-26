import type { ThemeId } from "../data/themes";
import {
  DITHERING_ASCII_TREND_ID,
  XEROX_PUNK_TREND_ID,
} from "../data/trendIds";
import { ControlToggleRow } from "../components/ControlToggleRow";
import { ThemeSelect } from "../components/ThemeSelect";
import { AspectRatioSelect } from "../components/AspectRatioSelect";
import type { StickerFormat } from "./utils/promptBuilder";
import type { AspectRatioPreset } from "./utils/aspectRatioPresets";

const STICKER_FORMAT_OPTIONS: { value: StickerFormat; label: string }[] = [
  { value: "off", label: "Off" },
  { value: "single", label: "Single" },
  { value: "sheet", label: "Sheet" },
];

export interface TrendRefinePanelProps {
  selectedTrendId: number;
  stickerFormat: StickerFormat;
  onStickerFormatChange: (value: StickerFormat) => void;
  selectedThemeId: ThemeId | null;
  onThemeChange: (id: ThemeId | null) => void;
  onThemeMenuOpenChange?: (open: boolean) => void;
  themeSelectEnabled: boolean;
  chibiMode: boolean;
  onChibiModeChange: (enabled: boolean) => void;
  xeroxPatchMode: boolean;
  onXeroxPatchModeChange: (enabled: boolean) => void;
  ditheringColorMode: boolean;
  onDitheringColorModeChange: (enabled: boolean) => void;
  effectiveAspectRatio: AspectRatioPreset;
  onAspectRatioChange: (preset: AspectRatioPreset) => void;
}

export function TrendRefinePanel({
  selectedTrendId,
  stickerFormat,
  onStickerFormatChange,
  selectedThemeId,
  onThemeChange,
  onThemeMenuOpenChange,
  themeSelectEnabled,
  chibiMode,
  onChibiModeChange,
  xeroxPatchMode,
  onXeroxPatchModeChange,
  ditheringColorMode,
  onDitheringColorModeChange,
  effectiveAspectRatio,
  onAspectRatioChange,
}: TrendRefinePanelProps) {
  const showPatches = selectedTrendId === XEROX_PUNK_TREND_ID;
  const showColor = selectedTrendId === DITHERING_ASCII_TREND_ID;

  return (
    <div className="figma-refine-panel shrink-0 mb-2 min-w-0 border-t border-border pt-2">
      <p className="figma-label-muted mb-2 px-0.5">Refine</p>

      <div className="figma-control-row figma-sticker-row shrink-0 mb-2 min-w-0">
        <span className="figma-section-title shrink-0">Sticker</span>
        <div className="figma-control-actions">
          <div className="figma-segment-group" role="group" aria-label="Sticker format">
            {STICKER_FORMAT_OPTIONS.map(({ value, label }) => {
              const isActive = stickerFormat === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onStickerFormatChange(value)}
                  aria-pressed={isActive}
                  className={`figma-segment ${isActive ? "figma-segment-active" : ""}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <ThemeSelect
            value={selectedThemeId}
            onChange={onThemeChange}
            onOpenChange={onThemeMenuOpenChange}
            disabled={!themeSelectEnabled}
          />
        </div>
      </div>

      <ControlToggleRow
        label="Chibi"
        value={chibiMode}
        onChange={onChibiModeChange}
        ariaLabel="Chibi mode"
      />

      {showPatches && (
        <ControlToggleRow
          label="Patches"
          value={xeroxPatchMode}
          onChange={onXeroxPatchModeChange}
          ariaLabel="Embroidered patches (Xerox Punk)"
        />
      )}

      {showColor && (
        <ControlToggleRow
          label="Color"
          value={ditheringColorMode}
          onChange={onDitheringColorModeChange}
          ariaLabel="Full color mode (Dithering ASCII)"
        />
      )}

      <AspectRatioSelect
        value={effectiveAspectRatio}
        onChange={onAspectRatioChange}
      />
    </div>
  );
}
