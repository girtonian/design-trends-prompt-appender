import type { StickerFormat } from "./promptBuilder";
import type { ThemeId } from "../../data/themes";

export const PLUGIN_PREFERENCES_STORAGE_KEY = "pluginPreferences";

export interface PluginPreferences {
  stickerFormat?: StickerFormat;
  selectedThemeId?: ThemeId | null;
  chibiMode?: boolean;
  xeroxPatchMode?: boolean;
  ditheringColorMode?: boolean;
}
