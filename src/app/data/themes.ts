export type ThemeId =
  | "food-drink"
  | "nature-weather"
  | "animals"
  | "architecture-places"
  | "transport-travel"
  | "symbols-badges"
  | "patterns-tiles"
  | "mascots-characters";

export interface PromptTheme {
  id: ThemeId;
  label: string;
  subjectPrompt: string;
}

export const promptThemes: PromptTheme[] = [
  {
    id: "food-drink",
    label: "Food & Drink",
    subjectPrompt:
      "food and drink subjects only, beverages, fruits, meals, cafe items",
  },
  {
    id: "nature-weather",
    label: "Nature & Weather",
    subjectPrompt:
      "nature and weather subjects only, clouds, trees, sun, rain, plants",
  },
  {
    id: "animals",
    label: "Animals",
    subjectPrompt: "animal subjects only, wildlife, pets, creatures",
  },
  {
    id: "architecture-places",
    label: "Architecture & Places",
    subjectPrompt:
      "architecture and place subjects only, buildings, landmarks, cityscapes",
  },
  {
    id: "transport-travel",
    label: "Transport & Travel",
    subjectPrompt:
      "transport and travel subjects only, vehicles, airplanes, luggage, maps",
  },
  {
    id: "symbols-badges",
    label: "Symbols & Badges",
    subjectPrompt:
      "symbol and badge subjects only, emblems, seals, crests, labels",
  },
  {
    id: "patterns-tiles",
    label: "Patterns & Tiles",
    subjectPrompt:
      "pattern and tile subjects only, repeating motifs, geometric tiles",
  },
  {
    id: "mascots-characters",
    label: "Mascots & Characters",
    subjectPrompt:
      "mascot and character subjects only, cute characters, figurines, avatars",
  },
];

export function getThemeById(id: ThemeId): PromptTheme | undefined {
  return promptThemes.find((theme) => theme.id === id);
}

export function getThemeSubjectPrompt(themeId: ThemeId | null): string | null {
  if (!themeId) return null;
  return getThemeById(themeId)?.subjectPrompt ?? null;
}

export function getThemeLabel(themeId: ThemeId | null): string {
  if (!themeId) return "";
  return getThemeById(themeId)?.label ?? "";
}

export function getThemeFooterSuffix(
  themeId: ThemeId | null,
  stickerFormat: "off" | "single" | "sheet",
  chibiMode = false
): string {
  if ((stickerFormat === "off" && !chibiMode) || !themeId) return "";
  const label = getThemeLabel(themeId);
  return label ? ` · ${label}` : "";
}

export function resolveActiveThemeSubjectPrompt(
  stickerFormat: "off" | "single" | "sheet",
  themeId: ThemeId | null,
  chibiMode = false
): string | null {
  if (stickerFormat === "off" && !chibiMode) return null;
  return getThemeSubjectPrompt(themeId);
}

export function formatPromptToastSuffix(
  stickerFormat: "off" | "single" | "sheet",
  themeId: ThemeId | null,
  chibiMode = false
): string {
  const parts: string[] = [];
  const stickerLabel = stickerFormat === "single"
    ? "single sticker"
    : stickerFormat === "sheet"
      ? "sticker sheet"
      : "";
  if (stickerLabel) parts.push(stickerLabel);
  if (chibiMode) parts.push("chibi");
  const themeLabel = getThemeLabel(themeId);
  if (themeLabel && (stickerFormat !== "off" || chibiMode)) parts.push(themeLabel);
  return parts.length > 0 ? ` (${parts.join(", ")})` : "";
}
