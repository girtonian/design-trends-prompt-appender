export type AspectRatioPreset =
  | "16:9"
  | "4:3"
  | "3:2"
  | "1:1"
  | "2:3"
  | "3:4"
  | "9:16";

export const DEFAULT_ASPECT_RATIO: AspectRatioPreset = "1:1";

export const ASPECT_RATIO_PRESETS: AspectRatioPreset[] = [
  "16:9",
  "4:3",
  "3:2",
  "1:1",
  "2:3",
  "3:4",
  "9:16",
];

const PRESET_DIMENSIONS: Record<
  AspectRatioPreset,
  { width: number; height: number }
> = {
  "16:9": { width: 1920, height: 1080 },
  "4:3": { width: 1600, height: 1200 },
  "3:2": { width: 1200, height: 800 },
  "1:1": { width: 1024, height: 1024 },
  "2:3": { width: 800, height: 1200 },
  "3:4": { width: 768, height: 1024 },
  "9:16": { width: 1080, height: 1920 },
};

export function getDimensionsForPreset(preset: AspectRatioPreset): {
  width: number;
  height: number;
  label: AspectRatioPreset;
} {
  const { width, height } = PRESET_DIMENSIONS[preset];
  return { width, height, label: preset };
}

export function isAspectRatioPreset(value: string): value is AspectRatioPreset {
  return ASPECT_RATIO_PRESETS.includes(value as AspectRatioPreset);
}

const PRESET_RATIOS: Record<AspectRatioPreset, number> = {
  "16:9": 16 / 9,
  "4:3": 4 / 3,
  "3:2": 3 / 2,
  "1:1": 1,
  "2:3": 2 / 3,
  "3:4": 3 / 4,
  "9:16": 9 / 16,
};

export function getClosestAspectRatioPreset(
  width: number,
  height: number
): AspectRatioPreset {
  if (width <= 0 || height <= 0) {
    return DEFAULT_ASPECT_RATIO;
  }

  const ratio = width / height;
  let closest = DEFAULT_ASPECT_RATIO;
  let smallestDelta = Infinity;

  for (const preset of ASPECT_RATIO_PRESETS) {
    const presetRatio = PRESET_RATIOS[preset];
    const delta = Math.abs(Math.log(ratio) - Math.log(presetRatio));
    if (delta < smallestDelta) {
      smallestDelta = delta;
      closest = preset;
    }
  }

  return closest;
}

export function getEffectiveAspectRatio(
  _stickerFormat: "off" | "single" | "sheet",
  selected: AspectRatioPreset
): AspectRatioPreset {
  return selected;
}
