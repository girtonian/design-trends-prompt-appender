import type { AspectRatioPreset } from "./aspectRatioPresets";
import { getDimensionsForPreset } from "./aspectRatioPresets";

export interface StickerSheetLayoutSpec {
  aspectRatio: AspectRatioPreset;
  width: number;
  height: number;
  columns: number;
  rows: number;
  cellSize: number;
  offsetX: number;
  offsetY: number;
  stickerCount: number;
}

export const STICKER_SHEET_LAYOUTS: Record<AspectRatioPreset, StickerSheetLayoutSpec> = {
  "16:9": {
    aspectRatio: "16:9",
    width: 1920,
    height: 1080,
    columns: 6,
    rows: 3,
    cellSize: 320,
    offsetX: 0,
    offsetY: 60,
    stickerCount: 18,
  },
  "1:1": {
    aspectRatio: "1:1",
    width: 1024,
    height: 1024,
    columns: 4,
    rows: 4,
    cellSize: 256,
    offsetX: 0,
    offsetY: 0,
    stickerCount: 16,
  },
  "4:3": {
    aspectRatio: "4:3",
    width: 1600,
    height: 1200,
    columns: 5,
    rows: 4,
    cellSize: 320,
    offsetX: 0,
    offsetY: 0,
    stickerCount: 20,
  },
  "3:2": {
    aspectRatio: "3:2",
    width: 1200,
    height: 800,
    columns: 6,
    rows: 4,
    cellSize: 200,
    offsetX: 0,
    offsetY: 0,
    stickerCount: 24,
  },
  "2:3": {
    aspectRatio: "2:3",
    width: 800,
    height: 1200,
    columns: 4,
    rows: 6,
    cellSize: 200,
    offsetX: 0,
    offsetY: 0,
    stickerCount: 24,
  },
  "3:4": {
    aspectRatio: "3:4",
    width: 768,
    height: 1024,
    columns: 3,
    rows: 4,
    cellSize: 256,
    offsetX: 0,
    offsetY: 0,
    stickerCount: 12,
  },
  "9:16": {
    aspectRatio: "9:16",
    width: 1080,
    height: 1920,
    columns: 3,
    rows: 6,
    cellSize: 320,
    offsetX: 60,
    offsetY: 0,
    stickerCount: 18,
  },
};

const LAYOUT_16_9 = STICKER_SHEET_LAYOUTS["16:9"];

export const STICKER_SHEET_WIDTH = LAYOUT_16_9.width;
export const STICKER_SHEET_HEIGHT = LAYOUT_16_9.height;
export const STICKER_SHEET_COLUMNS = LAYOUT_16_9.columns;
export const STICKER_SHEET_ROWS = LAYOUT_16_9.rows;
export const STICKER_SHEET_CELL_SIZE = LAYOUT_16_9.cellSize;
export const STICKER_SHEET_OFFSET_Y = LAYOUT_16_9.offsetY;
export const STICKER_SHEET_STICKER_COUNT = LAYOUT_16_9.stickerCount;
export const STICKER_SHEET_ASPECT_RATIO = "--ar 16:9";
export const STICKER_SHEET_SLICED_CONTAINER_NAME = "Sticker Sheet — Sliced";

export interface StickerSheetSliceRect {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
}

export function getStickerSheetLayout(
  aspectRatio: AspectRatioPreset = "16:9"
): StickerSheetLayoutSpec {
  return STICKER_SHEET_LAYOUTS[aspectRatio];
}

export function getStickerSheetAspectRatioFlag(
  aspectRatio: AspectRatioPreset
): string {
  return `--ar ${aspectRatio}`;
}

export function getStickerSheetSliceRectsForLayout(
  spec: StickerSheetLayoutSpec = LAYOUT_16_9
): StickerSheetSliceRect[] {
  const rects: StickerSheetSliceRect[] = [];
  let index = 1;

  for (let row = 0; row < spec.rows; row += 1) {
    for (let col = 0; col < spec.columns; col += 1) {
      rects.push({
        x: spec.offsetX + col * spec.cellSize,
        y: spec.offsetY + row * spec.cellSize,
        width: spec.cellSize,
        height: spec.cellSize,
        index,
      });
      index += 1;
    }
  }

  return rects;
}

export function getStickerSheetSliceRects(
  aspectRatio: AspectRatioPreset = "16:9"
): StickerSheetSliceRect[] {
  return getStickerSheetSliceRectsForLayout(getStickerSheetLayout(aspectRatio));
}

export function isStickerSheetDimensions(
  width: number,
  height: number,
  aspectRatio: AspectRatioPreset = "16:9"
): boolean {
  const spec = getStickerSheetLayout(aspectRatio);
  return (
    Math.round(width) === spec.width && Math.round(height) === spec.height
  );
}

export type ImageTransformMatrix = [
  [number, number, number],
  [number, number, number],
];

export function imageTransformForCrop(
  sheetWidth: number,
  sheetHeight: number,
  cropX: number,
  cropY: number,
  cropWidth: number,
  cropHeight: number
): ImageTransformMatrix {
  return [
    [sheetWidth / cropWidth, 0, -cropX / cropWidth],
    [0, sheetHeight / cropHeight, -cropY / cropHeight],
  ];
}

export const STICKER_DIE_CUT_APPEARANCE =
  "die-cut vinyl sticker, thick white outline border following subject silhouette, transparent background, no fill behind subject, isolated cutout subject, only white border around sticker edge, no scene background, no colored backdrop";

export const STICKER_DIE_CUT_NEGATIVE_ADDITIONS =
  "colored background, grey backing, gradient backdrop, scene environment, drop shadow, cast shadow, fill behind subject, rectangular photo crop, full bleed background, environment behind subject";

function describeLayoutMargins(spec: StickerSheetLayoutSpec): string {
  const parts: string[] = [];

  if (spec.offsetY > 0) {
    parts.push(
      `${spec.offsetY}px empty transparent margin top and bottom, grid occupies middle ${spec.rows * spec.cellSize}px`
    );
  }
  if (spec.offsetX > 0) {
    parts.push(
      `${spec.offsetX}px empty transparent margin left and right, grid occupies middle ${spec.columns * spec.cellSize}px`
    );
  }
  if (parts.length === 0) {
    parts.push("full-bleed grid edge-to-edge on canvas");
  }

  return parts.join(", ");
}

export function buildStickerSheetSuffix(
  spec: StickerSheetLayoutSpec = LAYOUT_16_9
): string {
  const marginDescription = describeLayoutMargins(spec);

  return (
    `sticker sheet layout, exact ${spec.width} by ${spec.height} pixel canvas, ` +
    `rigid ${spec.columns} column by ${spec.rows} row grid with ${spec.cellSize}px square cells edge-to-edge, ` +
    `${marginDescription}, ${spec.stickerCount} identical die-cut stickers each centered in its cell fully inside cell bounds, ` +
    `each sticker ${STICKER_DIE_CUT_APPEARANCE}, pixel-perfect grid alignment, zero inter-cell gaps, slice-ready uniform sizing, ` +
    `rows and columns of isolated cutout subjects, all stickers fully contained within canvas bounds, nothing cropped at sheet edges, ` +
    `non-overlapping sticker layout, no overlapping stickers or shadows`
  );
}

export const STICKER_SHEET_SUFFIX = buildStickerSheetSuffix(LAYOUT_16_9);

export const STICKER_SHEET_NEGATIVE_ADDITIONS =
  `single lone sticker, one subject only, full scene background, empty sheet, stickers touching frame edge, cropped or clipped stickers, overlapping stickers, overlapping drop shadows, stickers bleeding outside bounds, tight edge-to-edge layout, zero margin, uneven sticker sizes, non-uniform icon dimensions, irregular spacing, staggered layout, freeform placement, different sticker scales, misaligned grid, overlapping cells, variable cell sizes, content bleeding across cell lines, wrong canvas size, inter-cell gutters, wrong aspect ratio, ${STICKER_DIE_CUT_NEGATIVE_ADDITIONS}`;

export function formatSheetLayoutLabel(spec: StickerSheetLayoutSpec): string {
  return `${spec.columns}×${spec.rows} (${spec.width}×${spec.height})`;
}

export function getCanvasDimensionsForMode(
  stickerFormat: "off" | "single" | "sheet",
  aspectRatio: AspectRatioPreset
): { width: number; height: number; label: AspectRatioPreset } {
  if (stickerFormat === "sheet") {
    const layout = getStickerSheetLayout(aspectRatio);
    return { width: layout.width, height: layout.height, label: aspectRatio };
  }
  return getDimensionsForPreset(aspectRatio);
}
