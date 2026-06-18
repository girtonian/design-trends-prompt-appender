/**
 * Batch-slice a sticker sheet PNG into individual square tiles.
 * Run: pnpm run slice-sheet <input.png> [output-dir] [--aspect 1:1]
 *
 * Normalizes input to the layout canvas size (cover, center crop) before slicing.
 * Defaults to 16:9 (1920×1080, 6×3 @ 320px).
 */

import { mkdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import sharp from "sharp";
import {
  isAspectRatioPreset,
  type AspectRatioPreset,
} from "../src/app/plugin/utils/aspectRatioPresets.ts";
import {
  getStickerSheetLayout,
  getStickerSheetSliceRects,
} from "../src/app/plugin/utils/stickerSheetLayout.ts";

const rawArgs = process.argv.slice(2).filter((arg) => arg !== "--");
let aspectRatio: AspectRatioPreset = "16:9";
const args: string[] = [];

for (let i = 0; i < rawArgs.length; i += 1) {
  const arg = rawArgs[i];
  if (arg === "--aspect") {
    const value = rawArgs[i + 1];
    if (!value || !isAspectRatioPreset(value)) {
      console.error(
        `Invalid --aspect value. Use one of: 16:9, 4:3, 3:2, 1:1, 2:3, 3:4, 9:16`
      );
      process.exit(1);
    }
    aspectRatio = value;
    i += 1;
    continue;
  }
  args.push(arg);
}

const inputPath = args[0];
const outputDir = resolve(args[1] ?? "sliced-stickers");

if (!inputPath) {
  console.error(
    "Usage: pnpm run slice-sheet <input.png> [output-dir] [--aspect 1:1]"
  );
  process.exit(1);
}

const layout = getStickerSheetLayout(aspectRatio);

const normalized = await sharp(inputPath)
  .resize(layout.width, layout.height, {
    fit: "cover",
    position: "centre",
  })
  .png()
  .toBuffer();

mkdirSync(outputDir, { recursive: true });

const rects = getStickerSheetSliceRects(aspectRatio);

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
  `Sliced ${rects.length} stickers from ${inputPath} (${layout.width}×${layout.height}, ${aspectRatio}, ${layout.columns}×${layout.rows} @ ${layout.cellSize}px)`
);
