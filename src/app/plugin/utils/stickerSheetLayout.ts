export const STICKER_SHEET_WIDTH = 1920;
export const STICKER_SHEET_HEIGHT = 1080;
export const STICKER_SHEET_COLUMNS = 6;
export const STICKER_SHEET_ROWS = 3;
export const STICKER_SHEET_CELL_SIZE = 320;
export const STICKER_SHEET_OFFSET_Y = 60;
export const STICKER_SHEET_STICKER_COUNT = 18;
export const STICKER_SHEET_ASPECT_RATIO = "--ar 16:9";
export const STICKER_SHEET_SLICED_CONTAINER_NAME = "Sticker Sheet — Sliced";

export interface StickerSheetSliceRect {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
}

export function getStickerSheetSliceRects(): StickerSheetSliceRect[] {
  const rects: StickerSheetSliceRect[] = [];
  let index = 1;

  for (let row = 0; row < STICKER_SHEET_ROWS; row += 1) {
    for (let col = 0; col < STICKER_SHEET_COLUMNS; col += 1) {
      rects.push({
        x: col * STICKER_SHEET_CELL_SIZE,
        y: STICKER_SHEET_OFFSET_Y + row * STICKER_SHEET_CELL_SIZE,
        width: STICKER_SHEET_CELL_SIZE,
        height: STICKER_SHEET_CELL_SIZE,
        index,
      });
      index += 1;
    }
  }

  return rects;
}

export function isStickerSheetDimensions(width: number, height: number): boolean {
  return (
    Math.round(width) === STICKER_SHEET_WIDTH &&
    Math.round(height) === STICKER_SHEET_HEIGHT
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

export const STICKER_SHEET_SUFFIX =
  `sticker sheet layout, exact 1920 by 1080 pixel canvas, rigid 6 column by 3 row grid with 320px square cells edge-to-edge, 60px empty transparent margin top and bottom, grid occupies middle 960px, 18 identical die-cut stickers each centered in its cell fully inside cell bounds, each sticker ${STICKER_DIE_CUT_APPEARANCE}, pixel-perfect grid alignment, zero inter-cell gaps, slice-ready uniform sizing, rows and columns of isolated cutout subjects, all stickers fully contained within canvas bounds, nothing cropped at sheet edges, non-overlapping sticker layout, no overlapping stickers or shadows`;

export const STICKER_SHEET_NEGATIVE_ADDITIONS =
  `single lone sticker, one subject only, full scene background, empty sheet, stickers touching frame edge, cropped or clipped stickers, overlapping stickers, overlapping drop shadows, stickers bleeding outside bounds, tight edge-to-edge layout, zero margin, uneven sticker sizes, non-uniform icon dimensions, irregular spacing, staggered layout, freeform placement, different sticker scales, misaligned grid, overlapping cells, variable cell sizes, content bleeding across cell lines, wrong canvas size, inter-cell gutters, wrong aspect ratio, ${STICKER_DIE_CUT_NEGATIVE_ADDITIONS}`;
