/**
 * Generates PROMPTS.md and FLORA.ai CSV exports from src/app/data/trends.ts
 * Run: pnpm run export-prompts
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { trends } from "../src/app/data/trends.ts";
import {
  buildFullPrompt,
  cleanVariation,
} from "../src/app/plugin/utils/promptBuilder.ts";

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

console.log(`Wrote PROMPTS.md (${promptRows.length} variation prompts)`);
console.log(`Wrote PROMPTS-flora-batch.csv (${promptRows.length} rows, no header — upload to FLORA Batch Node)`);
console.log(`Wrote PROMPTS-flora-reference.csv (${promptRows.length} rows with metadata)`);
