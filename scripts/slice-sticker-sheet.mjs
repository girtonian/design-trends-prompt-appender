// scripts/slice-sticker-sheet.ts
import { mkdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import sharp from "sharp";

// src/app/plugin/utils/stickerSheetLayout.ts
var STICKER_SHEET_WIDTH = 1920;
var STICKER_SHEET_HEIGHT = 1080;
var STICKER_SHEET_COLUMNS = 6;
var STICKER_SHEET_ROWS = 3;
var STICKER_SHEET_CELL_SIZE = 320;
var STICKER_SHEET_OFFSET_Y = 60;
function getStickerSheetSliceRects() {
  const rects2 = [];
  let index = 1;
  for (let row = 0; row < STICKER_SHEET_ROWS; row += 1) {
    for (let col = 0; col < STICKER_SHEET_COLUMNS; col += 1) {
      rects2.push({
        x: col * STICKER_SHEET_CELL_SIZE,
        y: STICKER_SHEET_OFFSET_Y + row * STICKER_SHEET_CELL_SIZE,
        width: STICKER_SHEET_CELL_SIZE,
        height: STICKER_SHEET_CELL_SIZE,
        index
      });
      index += 1;
    }
  }
  return rects2;
}

// scripts/slice-sticker-sheet.ts
var args = process.argv.slice(2).filter((arg) => arg !== "--");
var inputPath = args[0];
var outputDir = resolve(args[1] ?? "sliced-stickers");
if (!inputPath) {
  console.error("Usage: pnpm run slice-sheet <input.png> [output-dir]");
  process.exit(1);
}
var normalized = await sharp(inputPath).resize(STICKER_SHEET_WIDTH, STICKER_SHEET_HEIGHT, {
  fit: "cover",
  position: "centre"
}).png().toBuffer();
mkdirSync(outputDir, { recursive: true });
var rects = getStickerSheetSliceRects();
for (const rect of rects) {
  const tile = await sharp(normalized).extract({
    left: rect.x,
    top: rect.y,
    width: rect.width,
    height: rect.height
  }).png().toBuffer();
  const filename = `sticker-${String(rect.index).padStart(2, "0")}.png`;
  writeFileSync(join(outputDir, filename), tile);
  console.log(`Wrote ${join(outputDir, filename)}`);
}
console.log(
  `Sliced ${rects.length} stickers from ${inputPath} (${STICKER_SHEET_WIDTH}\xD7${STICKER_SHEET_HEIGHT})`
);
