import type { StickerFormat } from "./promptBuilder";
import type { ThemeId } from "../../data/themes";
import type { PatchTypeId } from "../../data/patchTypes";

export const PLUGIN_PREFERENCES_STORAGE_KEY = "pluginPreferences";

export interface PluginPreferences {
  stickerFormat?: StickerFormat;
  selectedThemeId?: ThemeId | null;
  chibiMode?: boolean;
  patchMode?: boolean;
  patchType?: PatchTypeId;
  ditheringColorMode?: boolean;
}
