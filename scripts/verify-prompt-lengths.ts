import type { Trend } from "../src/app/data/trends.ts";
import { buildTrendTapPrompt } from "../src/app/plugin/utils/buildTrendTapPrompt.ts";
import {
  FIGMA_PROMPT_MAX_LENGTH,
  STICKER_OUTPUT_CONTRACT_SINGLE,
} from "../src/app/plugin/utils/figmaPromptLimits.ts";

/** Minimal trend fixtures for verification (no image imports). */
const DITHERING_ASCII: Trend = {
  id: 10,
  title: "Dithering ASCII",
  tagline: "",
  description: "",
  keywords: [],
  mood: "",
  applications: [],
  imageUrl: "",
  color: "",
  midjourneyPrompts: {
    masterPrompt:
      "ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition",
    aspectRatios: ["--ar 3:4", "--ar 1:1"],
    negativePrompts:
      "color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering",
    variations: [
      "terminal ASCII portrait with dense glyph clusters --ar 3:4",
      "dot-matrix halftone landscape, character-based shading --ar 4:5",
      "monochrome dither poster with blocky bitmap forms --ar 1:1",
      "retro CRT ASCII still life, layered noise texture --ar 3:4",
      "lo-fi computational portrait, screenprint tonal breakup --ar 4:5",
      "type-as-texture abstract composition, structured glyph noise --ar 1:1",
      "early computer graphics scene, gritty bitmap detail --ar 3:4",
      "ASCII symbol mosaic with halftone depth gradients --ar 4:5",
      "terminal cyber poster, high-contrast dither gradients --ar 1:1",
      "dot-matrix character shading study, raw digital texture --ar 3:4",
    ],
  },
};

const XEROX_PUNK: Trend = {
  id: 8,
  title: "Xerox Punk",
  tagline: "",
  description: "",
  keywords: [],
  mood: "",
  applications: [],
  imageUrl: "",
  color: "",
  midjourneyPrompts: {
    masterPrompt:
      "xerox punk zine aesthetic, high-contrast black photocopy texture, gritty punk flyer design, harsh halftone dots, rough paper grain, DIY underground print culture, distressed ink bleeds, raw rebellious energy, lo-fi reproduction artifacts, stark typography, anarchic collage energy",
    aspectRatios: ["--ar 3:4"],
    negativePrompts:
      "clean vector, glossy polish, soft gradients, corporate branding, photorealistic rendering",
    variations: Array.from({ length: 10 }, (_, i) => `xerox variation ${i + 1} --ar 3:4`),
  },
};

const IMPERFECT_MINIMALISM: Trend = {
  id: 1,
  title: "Imperfect Minimalism",
  tagline: "",
  description: "",
  keywords: [],
  mood: "",
  applications: [],
  imageUrl: "",
  color: "",
  midjourneyPrompts: {
    masterPrompt:
      "naïve childlike illustration, hand-drawn doodles, shaky marker outlines",
    aspectRatios: ["--ar 1:1"],
    negativePrompts: "realism, vector clean lines",
    variations: ["crayon notebook doodles --ar 1:1"],
  },
};

let failures = 0;

function assert(condition: boolean, message: string): void {
  if (!condition) {
    console.error(`ASSERT FAILED: ${message}`);
    failures++;
  }
}

const ditheringSingleColor = buildTrendTapPrompt({
  trend: DITHERING_ASCII,
  variationIndex: 9,
  modifiers: {
    stickerFormat: "single",
    themeId: "food-drink",
    chibiMode: false,
    xeroxPatchMode: false,
    ditheringColorMode: true,
    aspectRatio: "1:1",
    isPro: true,
  },
});

assert(
  ditheringSingleColor.startsWith(STICKER_OUTPUT_CONTRACT_SINGLE),
  "Dithering Single+Color must start with single output contract"
);
assert(
  ditheringSingleColor.includes("ASCII coffee mug glyph portrait"),
  "Dithering Single+Food must include theme subject"
);
assert(
  !ditheringSingleColor.includes("food and drink only"),
  "Dithering Single+Food must not include compact category label"
);
assert(
  ditheringSingleColor.includes("pure greyscale art"),
  "Dithering Single+Color must include color guardrails"
);
assert(
  !ditheringSingleColor.includes("purple backdrop"),
  "Must not include purple backdrop in negatives"
);
assert(
  !ditheringSingleColor.includes("colored solid background"),
  "Must not include colored solid background in negatives"
);
assert(
  !ditheringSingleColor.includes("identical die-cut"),
  "Sheet/single prompts must not request identical stickers"
);
assert(
  ditheringSingleColor.includes("sticker sheet layout"),
  "Dithering Single guardrails must include anti-sheet terms"
);
assert(
  !ditheringSingleColor.includes("3x3 grid"),
  "Dithering Single guardrails must not include hardcoded 3x3 grid"
);
assert(
  !ditheringSingleColor.includes("nine stickers"),
  "Dithering Single guardrails must not include hardcoded nine stickers"
);
assert(
  ditheringSingleColor.length <= FIGMA_PROMPT_MAX_LENGTH,
  "Dithering Single+Color must fit Figma limit"
);

const xeroxSinglePatches = buildTrendTapPrompt({
  trend: XEROX_PUNK,
  variationIndex: 7,
  modifiers: {
    stickerFormat: "single",
    themeId: "animals",
    chibiMode: false,
    xeroxPatchMode: true,
    ditheringColorMode: false,
    aspectRatio: "1:1",
    isPro: true,
  },
});

assert(
  xeroxSinglePatches.startsWith(STICKER_OUTPUT_CONTRACT_SINGLE),
  "Xerox Single+Patches must start with output contract"
);
assert(
  xeroxSinglePatches.includes("embroidered patches"),
  "Xerox Patches modifier must be present"
);
const forbiddenObservationTerms = [
  "purple background",
  "colored backdrop",
  "colored fill background",
  "3x3 grid",
  "nine stickers",
  "multiple subjects",
  "repeated grid",
  "scene background",
  "multiple mugs",
];
for (const term of forbiddenObservationTerms) {
  assert(
    !xeroxSinglePatches.includes(term),
    `Xerox Single+Patches must not include observation term: ${term}`
  );
}
assert(
  xeroxSinglePatches.endsWith(
    ". No sticker sheet layout, multi-subject grid, repeated sticker grid, flat print only, no textile texture, clean vector, glossy polish."
  ),
  "Xerox Single+Patches negatives must be refine-specific only"
);

const sheetPrompt = buildTrendTapPrompt({
  trend: IMPERFECT_MINIMALISM,
  variationIndex: 0,
  modifiers: {
    stickerFormat: "sheet",
    themeId: "food-drink",
    chibiMode: false,
    xeroxPatchMode: false,
    ditheringColorMode: false,
    aspectRatio: "1:1",
    isPro: true,
  },
});

assert(
  sheetPrompt.includes("Sticker sheet layout"),
  "Sheet mode must include sheet layout contract"
);
assert(
  sheetPrompt.includes("not 4 column by 4 row grid"),
  "Sheet mode guardrails must reference layout grid dimensions"
);
assert(
  sheetPrompt.includes("unique varied die-cut stickers"),
  "Sheet mode must require unique varied stickers"
);
assert(
  sheetPrompt.includes("each cell a different subject"),
  "Sheet mode must require a different subject per cell"
);
assert(
  sheetPrompt.includes("food and drink only"),
  "Sheet mode must include compact theme category for variety"
);
assert(
  !sheetPrompt.includes("identical die-cut"),
  "Sheet mode must not request identical stickers"
);
for (const term of forbiddenObservationTerms) {
  assert(
    !sheetPrompt.includes(term),
    `Sheet prompt must not include observation term: ${term}`
  );
}

const xeroxOff = buildTrendTapPrompt({
  trend: XEROX_PUNK,
  variationIndex: 0,
  modifiers: {
    stickerFormat: "off",
    themeId: null,
    chibiMode: false,
    xeroxPatchMode: false,
    ditheringColorMode: false,
    aspectRatio: "16:9",
    isPro: true,
  },
});

assert(
  !xeroxOff.includes("sticker sheet layout"),
  "Sticker off must not include sticker guardrails"
);
assert(
  !xeroxOff.includes("3x3 grid"),
  "Sticker off must not include grid guardrails"
);
assert(
  !xeroxOff.includes("flat print only"),
  "Sticker off with patches off must not include patch guardrails"
);
assert(
  xeroxOff.endsWith(". No clean vector, glossy polish."),
  "Xerox Punk with no refinements must use only trend negatives"
);
for (const term of forbiddenObservationTerms) {
  assert(
    !xeroxOff.includes(term),
    `Xerox off must not include observation term: ${term}`
  );
}
assert(
  !sheetPrompt.startsWith(STICKER_OUTPUT_CONTRACT_SINGLE),
  "Sheet mode must not use single output contract"
);

console.log("\nDithering ASCII · Single · Food · Color sample:");
console.log(ditheringSingleColor);
console.log(`\nLength: ${ditheringSingleColor.length}`);

console.log("\nXerox Punk · no refinements:");
console.log(xeroxOff);

if (failures > 0) {
  process.exit(1);
}

console.log("\nAll golden prompt checks passed.");
