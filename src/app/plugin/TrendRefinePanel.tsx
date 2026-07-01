import type { ThemeId } from "../data/themes";
import { DITHERING_ASCII_TREND_ID } from "../data/trendIds";
import type { PatchTypeId } from "../data/patchTypes";
import { ControlToggleRow } from "../components/ControlToggleRow";
import { ThemeSelect } from "../components/ThemeSelect";
import { PatchTypeSelect } from "../components/PatchTypeSelect";
import { AspectRatioSelect } from "../components/AspectRatioSelect";
import type { StickerFormat } from "./utils/promptBuilder";
import type { AspectRatioPreset } from "./utils/aspectRatioPresets";

const STICKER_FORMAT_OPTIONS: { value: StickerFormat; label: string }[] = [
  { value: "off", label: "Off" },
  { value: "single", label: "Single" },
  { value: "sheet", label: "Sheet" },
];

const TOGGLE_OPTIONS: { value: boolean; label: string }[] = [
  { value: false, label: "Off" },
  { value: true, label: "On" },
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
  patchMode: boolean;
  onPatchModeChange: (enabled: boolean) => void;
  patchType: PatchTypeId;
  onPatchTypeChange: (id: PatchTypeId) => void;
  onPatchTypeMenuOpenChange?: (open: boolean) => void;
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
  patchMode,
  onPatchModeChange,
  patchType,
  onPatchTypeChange,
  onPatchTypeMenuOpenChange,
  ditheringColorMode,
  onDitheringColorModeChange,
  effectiveAspectRatio,
  onAspectRatioChange,
}: TrendRefinePanelProps) {
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

      <div className="figma-control-row figma-patch-row shrink-0 mb-2 min-w-0">
        <span className="figma-section-title shrink-0">Patches</span>
        <div className="figma-control-actions">
          <div className="figma-segment-group" role="group" aria-label="Patches">
            {TOGGLE_OPTIONS.map(({ value, label }) => {
              const isActive = patchMode === value;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => onPatchModeChange(value)}
                  aria-pressed={isActive}
                  className={`figma-segment ${isActive ? "figma-segment-active" : ""}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <PatchTypeSelect
            value={patchType}
            onChange={onPatchTypeChange}
            onOpenChange={onPatchTypeMenuOpenChange}
            disabled={!patchMode}
          />
        </div>
      </div>

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
