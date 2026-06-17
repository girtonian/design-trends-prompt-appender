import { promptThemes, type ThemeId } from "../data/themes";
import type { StickerFormat } from "../plugin/utils/promptBuilder";

interface ThemeSelectProps {
  value: ThemeId | null;
  onChange: (id: ThemeId | null) => void;
  stickerFormat: StickerFormat;
}

export function ThemeSelect({
  value,
  onChange,
  stickerFormat,
}: ThemeSelectProps) {
  const disabled = stickerFormat === "off";

  return (
    <select
      className="figma-select"
      value={value ?? ""}
      disabled={disabled}
      title={
        disabled
          ? "Select Single or Sheet to choose a theme"
          : "Theme category for sticker subjects"
      }
      aria-label="Theme category"
      onChange={(event) => {
        const next = event.target.value;
        onChange(next ? (next as ThemeId) : null);
      }}
    >
      <option value="">Theme…</option>
      {promptThemes.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.label}
        </option>
      ))}
    </select>
  );
}
