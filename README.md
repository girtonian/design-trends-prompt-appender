# Design Trends Prompt Appender

A Figma plugin that applies curated 2026 aesthetic trends to your AI image workflow. Browse trends, copy Midjourney prompts, and save them to selected Figma nodes.

## Features

- **10 curated design trends** with example imagery
- **100 Midjourney prompts** — 10 variations per trend
- **Dual persistence** — prompts copied to clipboard and saved as node metadata
- **Batch operations** — apply to multiple selections at once
- **Carousel UI** — paginated trend browser with inline detail panel

## Development

### Prerequisites

- Node.js 18+
- pnpm
- Figma Desktop (for testing)

### Setup

```bash
pnpm install
pnpm run build
```

### Commands

| Command | Description |
|---------|-------------|
| `pnpm run watch` | Rebuild UI + sandbox code on file changes |
| `pnpm run build` | Production build (`dist/code.js` + `dist/index.html`) |
| `pnpm run build:ui` | UI bundle only |
| `pnpm run build:code` | Sandbox code only |
| `pnpm run export-prompts` | Regenerate `PROMPTS.md` and FLORA CSV files from trend data |

### Project structure

```
src/
├── app/
│   ├── plugin/
│   │   ├── PluginController.tsx   # State + Figma message handling
│   │   ├── TrendBrowser.tsx       # Main carousel + detail UI
│   │   └── utils/
│   │       ├── figmaMessaging.ts  # UI ↔ sandbox postMessage API
│   │       └── promptBuilder.ts   # Midjourney prompt assembly
│   ├── components/
│   │   ├── TrendCarouselCard.tsx  # Carousel trend card
│   │   ├── TrendDetailPanel.tsx   # Image + prompt variations
│   │   ├── figma/ImageWithFallback.tsx
│   │   └── ui/sonner.tsx          # Toast notifications
│   ├── data/trends.ts             # Trend definitions + prompts
│   └── App.tsx
├── plugin-code.ts                 # Figma sandbox (node read/write)
├── main.tsx                       # React entry
└── styles/                        # Tailwind + theme tokens

dist/                              # Build output (gitignored)
├── code.js
└── index.html
```

## Testing in Figma

1. Run `pnpm run build` (or `pnpm run watch` during development).
2. In Figma Desktop: **Plugins → Development → Import plugin from manifest**.
3. Select `manifest.json` from this directory.
4. Create or select a frame, run the plugin, pick a trend, and copy a prompt variation.
5. Re-open the plugin on the same frame — the applied trend is highlighted in the carousel.

## Prompt library for Figma Weave & FLORA.ai

All 100 variation prompts plus 10 master prompts are exported in [`PROMPTS.md`](PROMPTS.md).

| File | Use |
|------|-----|
| [`PROMPTS-flora-batch.csv`](PROMPTS-flora-batch.csv) | **Upload to FLORA Batch Node** — no header, prompt in column 1 (100 rows) |
| [`PROMPTS-flora-reference.csv`](PROMPTS-flora-reference.csv) | Spreadsheet reference with trend ID, title, and variation number |
| [`PROMPTS.md`](PROMPTS.md) | Full prompt library with Weave-ready and Midjourney formats |

**FLORA Batch Node:** drag `PROMPTS-flora-batch.csv` onto a text Batch Node. FLORA reads only the first column and does not skip headers, so the batch file intentionally has no header row. [FLORA Batch Node docs](https://docs.flora.ai/nodes/batch-node)

Regenerate after editing `src/app/data/trends.ts`:

```bash
pnpm run export-prompts
```

## Architecture

**Sandbox (`plugin-code.ts`)** handles Figma API access: selection tracking, `setPluginData` / `getPluginData`.

**UI (React iframe)** sends messages via `parent.postMessage` and receives updates from the sandbox.

Trend data stored on nodes:

```typescript
node.setPluginData("designTrend", JSON.stringify({
  trendId: 1,
  trendTitle: "Naïve Design",
  selectedVariationIndex: 2,
  selectedVariation: "marker scribbles...",
  fullPrompt: "naïve childlike illustration...",
  appliedAt: 1234567890,
}));
```

Supported node types: Frame, Component, Instance, shapes, Text, Group, Section. Document, Page, and Slice nodes are not supported.

## Troubleshooting

**Plugin doesn't load**
- Ensure `dist/code.js` and `dist/index.html` exist — run `pnpm run build`.
- Confirm `manifest.json` paths point to `dist/code.js` and `dist/index.html`.

**Datadog / network errors in console**
- `browser-intake-datadoghq.com` failures are Figma's internal telemetry, not this plugin. Safe to ignore.

**Prompts not saving**
- Select a supported node type before copying a prompt.
- Check the plugin console: **Plugins → Development → Open Console**.

## License

MIT

## Credits

- Trend imagery: [Unsplash](https://unsplash.com)
- Icons: [Lucide](https://lucide.dev)
- Toasts: [Sonner](https://sonner.emilkowal.ski)
