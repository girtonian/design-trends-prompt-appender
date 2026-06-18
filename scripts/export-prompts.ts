/**
 * Generates PROMPTS.md and FLORA.ai CSV exports from src/app/data/trends.ts
 * Run: pnpm run export-prompts
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { trends } from "../src/app/data/trends.ts";
import { promptThemes, type ThemeId } from "../src/app/data/themes.ts";
import { getThemeTrendSubject } from "../src/app/data/themeSubjects.ts";
import {
  buildFullPrompt,
  buildStickerSheetBatchPrompt,
  buildWeaveThemePrompt,
  cleanVariation,
  STICKER_SHEET_ASPECT_RATIO,
} from "../src/app/plugin/utils/promptBuilder.ts";
import {
  STICKER_SHEET_HEIGHT,
  STICKER_SHEET_WIDTH,
} from "../src/app/plugin/utils/stickerSheetLayout.ts";

const STICKER_SHEET_ASPECT_RATIO_LABEL = STICKER_SHEET_ASPECT_RATIO.replace(
  "--ar ",
  ""
);

const rootDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(rootDir, "..");

function weavePrompt(
  masterPrompt: string,
  variation: string,
  negativePrompts: string
): string {
  const cleaned = cleanVariation(variation)
    .replace(/--style \S+/g, "")
    .trim();
  return `${masterPrompt}, ${cleaned}. Avoid: ${negativePrompts}.`;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function csvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

interface PromptRow {
  trendId: number;
  trendTitle: string;
  variation: number;
  prompt: string;
}

const promptRows: PromptRow[] = [];

for (const trend of trends) {
  const { masterPrompt, negativePrompts, variations } = trend.midjourneyPrompts;
  variations.forEach((variation, index) => {
    promptRows.push({
      trendId: trend.id,
      trendTitle: trend.title,
      variation: index + 1,
      prompt: weavePrompt(masterPrompt, variation, negativePrompts),
    });
  });
}

// --- PROMPTS.md ---

const lines: string[] = [
  "# Design Trends Prompt Appender — Prompt Library",
  "",
  "All prompts exported from the plugin source (`src/app/data/trends.ts`).",
  "Use these with **Figma Weave**, **FLORA.ai**, or any image generation tool.",
  "",
  "## How to use with Figma Weave",
  "",
  "1. Open Weave in Figma and start a new image generation.",
  "2. Copy a **Weave-ready prompt** below (natural language, no Midjourney flags).",
  "3. Paste into Weave and generate.",
  "",
  "## How to use with FLORA.ai Batch Node",
  "",
  "1. Upload [`PROMPTS-flora-batch.csv`](PROMPTS-flora-batch.csv) to a text Batch Node.",
  "2. FLORA reads **only the first column** — this file has no header row and is ready to upload.",
  "3. Each row becomes one batch item (100 prompts total, FLORA's per-run limit).",
  "",
  "See [`PROMPTS-flora-reference.csv`](PROMPTS-flora-reference.csv) for trend labels and variation numbers.",
  "",
  "> **Weave-ready** prompts strip `--ar`, `--style`, and `--no` flags.",
  "",
  "> **Midjourney full** prompts match exactly what the plugin copies to your clipboard.",
  "",
  "---",
  "",
  "## Quick reference",
  "",
  "| # | Trend | Variations |",
  "|---|-------|------------|",
];

for (const trend of trends) {
  lines.push(
    `| ${pad(trend.id)} | ${trend.title} | ${trend.midjourneyPrompts.variations.length} |`
  );
}

lines.push("", "---", "");

for (const trend of trends) {
  const { masterPrompt, aspectRatios, negativePrompts, variations } =
    trend.midjourneyPrompts;

  lines.push(`## ${pad(trend.id)} — ${trend.title}`);
  lines.push("");
  lines.push(`*${trend.tagline}*`);
  lines.push("");
  lines.push(`**Keywords:** ${trend.keywords.join(", ")}`);
  lines.push("");
  lines.push(`**Mood:** ${trend.mood}`);
  lines.push("");
  lines.push("### Master prompt");
  lines.push("");
  lines.push("```");
  lines.push(masterPrompt);
  lines.push("```");
  lines.push("");
  lines.push(`**Negative guidance:** ${negativePrompts}`);
  lines.push("");
  lines.push(`**Default aspect ratios:** ${aspectRatios.join(", ")}`);
  lines.push("");
  lines.push("### Variations");
  lines.push("");

  variations.forEach((variation, index) => {
    const num = pad(index + 1);
    const weave = weavePrompt(masterPrompt, variation, negativePrompts);
    const midjourney = buildFullPrompt(
      masterPrompt,
      variation,
      aspectRatios,
      negativePrompts
    );

    lines.push(`#### ${pad(trend.id)}.${num} — Variation ${num}`);
    lines.push("");
    lines.push("**Weave-ready prompt**");
    lines.push("");
    lines.push("```");
    lines.push(weave);
    lines.push("```");
    lines.push("");
    lines.push("**Midjourney full prompt**");
    lines.push("");
    lines.push("```");
    lines.push(midjourney);
    lines.push("```");
    lines.push("");
  });

  lines.push("---");
  lines.push("");
}

lines.push("## All Weave-ready prompts (flat list)");
lines.push("");

let flatIndex = 1;
for (const row of promptRows) {
  lines.push(`${flatIndex}. ${row.prompt}`);
  lines.push("");
  flatIndex++;
}

writeFileSync(join(projectRoot, "PROMPTS.md"), lines.join("\n"), "utf-8");

// --- FLORA.ai batch CSV (upload-ready: no header, prompt in column 1) ---

const floraBatchCsv = promptRows
  .map((row) => csvCell(row.prompt))
  .join("\n");

writeFileSync(
  join(projectRoot, "PROMPTS-flora-batch.csv"),
  floraBatchCsv + "\n",
  "utf-8"
);

// --- FLORA reference CSV (with headers — do NOT upload to FLORA Batch Node) ---

const floraReferenceCsv = [
  ["prompt", "trend_id", "trend_title", "variation"].join(","),
  ...promptRows.map((row) =>
    [
      csvCell(row.prompt),
      row.trendId,
      csvCell(row.trendTitle),
      row.variation,
    ].join(",")
  ),
].join("\n");

writeFileSync(
  join(projectRoot, "PROMPTS-flora-reference.csv"),
  floraReferenceCsv + "\n",
  "utf-8"
);

// --- Figma Weave Array exports (8 themes × 10 trends) ---

interface ThemeArrayRow {
  themeId: ThemeId;
  themeLabel: string;
  trendId: number;
  trendTitle: string;
  prompt: string;
  masterBatchPrompt: string;
}

const themeArrayRows: ThemeArrayRow[] = [];

for (const theme of promptThemes) {
  trends.forEach((trend, trendIndex) => {
    const { masterPrompt, negativePrompts, variations } = trend.midjourneyPrompts;
    const variation = variations[trendIndex] ?? variations[0];
    const subject = getThemeTrendSubject(theme.id, trendIndex);
    themeArrayRows.push({
      themeId: theme.id,
      themeLabel: theme.label,
      trendId: trend.id,
      trendTitle: trend.title,
      prompt: buildWeaveThemePrompt(
        masterPrompt,
        variation,
        negativePrompts,
        subject,
        {
          stickerFormat: "sheet",
          themeSubjectPrompt: theme.subjectPrompt,
        }
      ),
      masterBatchPrompt: buildStickerSheetBatchPrompt(
        masterPrompt,
        variation,
        negativePrompts,
        subject,
        theme.subjectPrompt
      ),
    });
  });
}

const weaveArrayJson = Object.fromEntries(
  promptThemes.map((theme) => [
    theme.id,
    {
      label: theme.label,
      prompts: themeArrayRows
        .filter((row) => row.themeId === theme.id)
        .map((row) => ({
          trendId: row.trendId,
          trendTitle: row.trendTitle,
          prompt: row.prompt,
        })),
    },
  ])
);

writeFileSync(
  join(projectRoot, "PROMPTS-weave-arrays.json"),
  JSON.stringify(weaveArrayJson, null, 2) + "\n",
  "utf-8"
);

const weaveArrayMd: string[] = [
  "# Figma Weave Array — Theme × Design Trend Prompts",
  "",
  "Eight arrays (one per theme), each with **10 prompts** — one per design trend.",
  "Every prompt includes the **sticker sheet** layout suffix and matching negative guidance.",
  "Prompts are compact to maximize Weave output and reduce credit usage.",
  "",
  "## How to use with Figma Weave",
  "",
  "1. Add an **Array** node and a **Text Iterator** (or **List**) node.",
  "2. Paste the 10 prompts from a theme section below into the Array items.",
  "3. Connect Array → Text Iterator → your image model.",
  "4. Run once to batch-generate all 10 trend styles for that theme.",
  "",
  "**Credit tips:** Each prompt leads with a concrete subject, uses one variation hook,",
  "and only 3 style anchors from the master prompt (not the full master + variation stack).",
  "Negatives use `No` instead of `Avoid:` to save tokens.",
  "",
  "Or upload `PROMPTS-weave-arrays.csv` — filter by `theme_id` for a single theme batch.",
  "",
  "## Master sticker batch (all themes × all trends)",
  "",
  "**80 prompts** — every sticker theme paired with every design trend (8 × 10).",
  "Each prompt uses the **1920×1080** sticker sheet layout (6×3 grid, 18 die-cut stickers).",
  "Master batch prompts include the **full design trend master prompt**, variation hook, theme constraint, and sticker sheet layout (not the compact 3-anchor Weave version).",
  "",
  "| File | Use |",
  "|------|-----|",
  "| [`PROMPTS-weave-master-batch.csv`](PROMPTS-weave-master-batch.csv) | **Upload to a Batch / Array node** — no header, prompt in column 1 (80 rows) |",
  "| [`PROMPTS-weave-master-reference.csv`](PROMPTS-weave-master-reference.csv) | Spreadsheet reference with theme, trend, and explicit 1920×1080 dimensions |",
  "",
  "1. Upload `PROMPTS-weave-master-batch.csv` to a text Batch Node, Array, or List node.",
  "2. Connect to your image model and set output size to **1920 × 1080** (16:9) if the platform exposes size separately.",
  "3. Run once to generate all 80 sticker sheets.",
  "4. Use the reference CSV to filter or sort by `theme_id` or `trend_id`.",
  "",
  "---",
  "",
];

for (const theme of promptThemes) {
  const rows = themeArrayRows.filter((row) => row.themeId === theme.id);
  weaveArrayMd.push(`## ${theme.label} (\`${theme.id}\`)`);
  weaveArrayMd.push("");
  weaveArrayMd.push("```json");
  weaveArrayMd.push(
    JSON.stringify(
      rows.map((row) => row.prompt),
      null,
      2
    )
  );
  weaveArrayMd.push("```");
  weaveArrayMd.push("");
  weaveArrayMd.push("| # | Trend | Prompt |");
  weaveArrayMd.push("|---|-------|--------|");
  rows.forEach((row) => {
    weaveArrayMd.push(
      `| ${String(row.trendId).padStart(2, "0")} | ${row.trendTitle} | ${row.prompt.replace(/\|/g, "\\|")} |`
    );
  });
  weaveArrayMd.push("");
  weaveArrayMd.push("---");
  weaveArrayMd.push("");
}

writeFileSync(
  join(projectRoot, "PROMPTS-weave-arrays.md"),
  weaveArrayMd.join("\n"),
  "utf-8"
);

const weaveArrayCsv = [
  ["prompt", "theme_id", "theme_label", "trend_id", "trend_title"].join(","),
  ...themeArrayRows.map((row) =>
    [
      csvCell(row.prompt),
      row.themeId,
      csvCell(row.themeLabel),
      row.trendId,
      csvCell(row.trendTitle),
    ].join(",")
  ),
].join("\n");

writeFileSync(
  join(projectRoot, "PROMPTS-weave-arrays.csv"),
  weaveArrayCsv + "\n",
  "utf-8"
);

// Per-theme batch CSVs (no header — paste or upload one file per theme)
for (const theme of promptThemes) {
  const rows = themeArrayRows.filter((row) => row.themeId === theme.id);
  const themeCsv = rows.map((row) => csvCell(row.prompt)).join("\n");
  writeFileSync(
    join(projectRoot, `PROMPTS-weave-${theme.id}.csv`),
    themeCsv + "\n",
    "utf-8"
  );
}

// Master sticker batch CSV (upload-ready: no header, all 80 theme×trend prompts)
const weaveMasterBatchCsv = themeArrayRows
  .map((row) => csvCell(row.masterBatchPrompt))
  .join("\n");

writeFileSync(
  join(projectRoot, "PROMPTS-weave-master-batch.csv"),
  weaveMasterBatchCsv + "\n",
  "utf-8"
);

// Master sticker reference CSV (with headers — do NOT upload to Batch Node)
const weaveMasterReferenceCsv = [
  [
    "prompt",
    "theme_id",
    "theme_label",
    "trend_id",
    "trend_title",
    "width",
    "height",
    "aspect_ratio",
  ].join(","),
  ...themeArrayRows.map((row) =>
    [
      csvCell(row.masterBatchPrompt),
      row.themeId,
      csvCell(row.themeLabel),
      row.trendId,
      csvCell(row.trendTitle),
      STICKER_SHEET_WIDTH,
      STICKER_SHEET_HEIGHT,
      STICKER_SHEET_ASPECT_RATIO_LABEL,
    ].join(",")
  ),
].join("\n");

writeFileSync(
  join(projectRoot, "PROMPTS-weave-master-reference.csv"),
  weaveMasterReferenceCsv + "\n",
  "utf-8"
);

console.log(`Wrote PROMPTS.md (${promptRows.length} variation prompts)`);
console.log(`Wrote PROMPTS-flora-batch.csv (${promptRows.length} rows, no header — upload to FLORA Batch Node)`);
console.log(`Wrote PROMPTS-flora-reference.csv (${promptRows.length} rows with metadata)`);
console.log(`Wrote PROMPTS-weave-arrays.json (${themeArrayRows.length} theme×trend prompts)`);
console.log(`Wrote PROMPTS-weave-arrays.md`);
console.log(`Wrote PROMPTS-weave-arrays.csv`);
console.log(
  `Wrote PROMPTS-weave-master-batch.csv (${themeArrayRows.length} rows, no header — upload to Batch Node)`
);
console.log(
  `Wrote PROMPTS-weave-master-reference.csv (${themeArrayRows.length} rows with metadata)`
);
for (const theme of promptThemes) {
  console.log(`Wrote PROMPTS-weave-${theme.id}.csv (10 prompts)`);
}
