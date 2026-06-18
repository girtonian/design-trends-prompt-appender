import type { AspectRatioPreset } from "../plugin/utils/aspectRatioPresets";

export interface MakeImageTargetData {
  aspectRatio: AspectRatioPreset;
  updatedAt: number;
}

export interface ResizeGenerationTargetPayload {
  aspectRatio: AspectRatioPreset;
  width: number;
  height: number;
  userInitiated?: boolean;
}

export interface GenerationTargetReadyMessage {
  type: "generation-target-ready";
  resized: boolean;
  userInitiated: boolean;
  aspectRatio: AspectRatioPreset;
  width: number;
  height: number;
  nodeId?: string;
  nodeName?: string;
}

export interface AspectRatioPreferenceMessage {
  type: "aspect-ratio-preference";
  aspectRatio: AspectRatioPreset | null;
}

/** @deprecated Legacy plugin-created white frames */
export const GENERATION_TARGET_KEY = "generationTarget";

export const MAKE_IMAGE_TARGET_KEY = "makeImageTarget";

export const ASPECT_RATIO_STORAGE_KEY = "aspectRatioPreference";
