/**
 * Batch-slice a sticker sheet PNG into 18 individual 320×320 tiles.
 * Run: pnpm run slice-sheet <input.png> [output-dir]
 *
 * Normalizes input to exactly 1920×1080 (cover, center crop) before slicing.
 */

import { mkdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import sharp from "sharp";
import {
  getStickerSheetSliceRects,
  STICKER_SHEET_HEIGHT,
  STICKER_SHEET_WIDTH,
} from "../src/app/plugin/utils/stickerSheetLayout.ts";

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const inputPath = args[0];
const outputDir = resolve(args[1] ?? "sliced-stickers");

if (!inputPath) {
  console.error("Usage: pnpm run slice-sheet <input.png> [output-dir]");
  process.exit(1);
}

const normalized = await sharp(inputPath)
  .resize(STICKER_SHEET_WIDTH, STICKER_SHEET_HEIGHT, {
    fit: "cover",
    position: "centre",
  })
  .png()
  .toBuffer();

mkdirSync(outputDir, { recursive: true });

const rects = getStickerSheetSliceRects();

for (const rect of rects) {
  const tile = await sharp(normalized)
    .extract({
      left: rect.x,
      top: rect.y,
      width: rect.width,
      height: rect.height,
    })
    .png()
    .toBuffer();

  const filename = `sticker-${String(rect.index).padStart(2, "0")}.png`;
  writeFileSync(join(outputDir, filename), tile);
  console.log(`Wrote ${join(outputDir, filename)}`);
}

console.log(
  `Sliced ${rects.length} stickers from ${inputPath} (${STICKER_SHEET_WIDTH}×${STICKER_SHEET_HEIGHT})`
);
