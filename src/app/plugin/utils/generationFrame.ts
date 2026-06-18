import type { AspectRatioPreset } from "../plugin/utils/aspectRatioPresets";

export interface GenerationTargetData {
  aspectRatio: AspectRatioPreset;
  trendId: number;
  trendTitle: string;
  createdAt: number;
}

export interface PrepareGenerationFramePayload {
  trendId: number;
  trendTitle: string;
  aspectRatio: AspectRatioPreset;
  width: number;
  height: number;
}

export interface GenerationFrameReadyMessage {
  type: "generation-frame-ready";
  frameId: string;
  width: number;
  height: number;
  aspectRatio: AspectRatioPreset;
}

export interface AspectRatioPreferenceMessage {
  type: "aspect-ratio-preference";
  aspectRatio: AspectRatioPreset | null;
}

export const GENERATION_TARGET_KEY = "generationTarget";
export const ASPECT_RATIO_STORAGE_KEY = "aspectRatioPreference";

export function getGenerationFrameName(
  aspectRatio: AspectRatioPreset,
  trendTitle: string
): string {
  return `Make Image ${aspectRatio} — ${trendTitle}`;
}
