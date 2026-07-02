# CLAUDE.md — Trend Tap

## Project overview

**Trend Tap** is a Figma plugin (formerly "Design Trends Prompt Appender") that turns curated 2026 aesthetic trends into ready-to-paste AI image prompts. The plugin browses 10 design trends, generates layered prompts for Figma's "Make an image" / Weave feature, and saves prompt metadata to selected Figma nodes.

Free tier: 6 trends + aspect ratio controls. Pro tier (license key, sold via Lemon Squeezy): all 10 trends + Sticker, Theme, Chibi, Patches, and Color modes.

---

## Architecture

This is a **dual-process Figma plugin**:

| Process | File | Runtime |
|---------|------|---------|
| **Sandbox** | `src/plugin-code.ts` | Figma's JS sandbox — has full Figma API access, no DOM |
| **UI iframe** | `src/main.tsx` → React app | Browser iframe inside the plugin panel — no Figma API access |

The two processes communicate exclusively via `postMessage`. The UI calls `parent.postMessage({ pluginMessage: ... }, '*')` and the sandbox responds via `figma.ui.postMessage(...)`. The message contract is typed in `src/app/plugin/utils/figmaMessaging.ts`.

**Build output** (gitignored `dist/`):
- `dist/index.html` — UI bundle (single-file HTML via `vite-plugin-singlefile`)
- `dist/code.js` — Sandbox bundle (esbuild, ES2017, no bundled DOM APIs)

---

## Directory structure

```
src/
├── plugin-code.ts              # Sandbox entry — Figma API, message handler
├── main.tsx                    # UI React entry point
├── styles/                     # Tailwind + global CSS
└── app/
    ├── App.tsx                 # Root React component
    ├── data/
    │   ├── trends.ts           # Trend definitions + all 100 Midjourney prompts
    │   ├── trendImages.ts      # Imports static PNGs → trendImageById map
    │   ├── trendIds.ts         # Named constants for specific trend IDs (e.g. DITHERING_ASCII_TREND_ID)
    │   ├── themes.ts           # ThemeId type, 8 subject themes, helper fns
    │   ├── themeSubjects.ts    # Per-theme per-variation subject strings
    │   ├── patchTypes.ts       # Patch type definitions + prompt suffixes
    │   └── tierConfig.ts       # FREE_TREND_IDS [1-6], PRO_TREND_IDS [7-10]
    ├── components/
    │   ├── TrendCarouselCard.tsx
    │   ├── TrendDetailPanel.tsx
    │   ├── AspectRatioSelect.tsx
    │   ├── PatchTypeSelect.tsx
    │   ├── ThemeSelect.tsx
    │   ├── ControlToggleRow.tsx
    │   ├── PluginResizeHandles.tsx
    │   ├── UpgradePanel.tsx    # License key entry + Buy Pro CTA
    │   └── figma/ImageWithFallback.tsx
    └── plugin/
        ├── PluginController.tsx  # Root state + PluginContext provider
        ├── TrendBrowser.tsx      # Carousel + detail UI, prompt copy logic
        ├── TrendRefinePanel.tsx  # Pro refinement controls (sticker, chibi, etc.)
        └── utils/
            ├── figmaMessaging.ts      # postMessage helpers (UI→sandbox)
            ├── buildTrendTapPrompt.ts # Layered prompt builder (primary entry point)
            ├── promptBuilder.ts       # Legacy/lower-level prompt helpers
            ├── figmaPromptLimits.ts   # Constants, negative builders, fitPromptToFigmaLimit()
            ├── aspectRatioPresets.ts  # AspectRatioPreset type + dimension map
            ├── stickerSheetLayout.ts  # Grid layout specs per aspect ratio
            ├── generationFrame.ts     # Frame resize payload types + storage key
            ├── makeImageTarget.ts     # Detects/tags/resizes Make Image frames
            ├── licenseTypes.ts        # LicenseUiStatus, StoredLicense types
            ├── licenseSandbox.ts      # Lemon Squeezy activate/validate (sandbox only)
            ├── licenseConfig.ts       # API endpoint + product IDs
            ├── pluginPreferences.ts   # PluginPreferences type + storage key
            └── copyToClipboard.ts     # Clipboard write helper

scripts/
├── export-prompts.ts     # Regenerates PROMPTS.md + all CSV files from trends.ts
├── slice-sticker-sheet.ts # Slices reference PNGs into per-cell images
└── verify-prompt-lengths.ts

src/assets/trends/        # Static PNG thumbnails for each trend (imported in trendImages.ts)
manifest.json             # Figma plugin manifest
index.html                # Vite HTML template
```

---

## Build system

| Tool | Role |
|------|------|
| **Vite** + `@vitejs/plugin-react` | UI bundle (`dist/index.html`) |
| `vite-plugin-singlefile` | Inlines all assets into a single HTML file |
| **esbuild** | Sandbox bundle (`dist/code.js`), target ES2017 |
| **Tailwind CSS v4** | Utility classes in the React UI |
| **pnpm** | Package manager (workspace root + `pnpm-workspace.yaml`) |

### Commands

| Command | What it does |
|---------|-------------|
| `pnpm run build` | Full production build (UI + sandbox) |
| `pnpm run build:ui` | UI bundle only |
| `pnpm run build:code` | Sandbox bundle only |
| `pnpm run watch` | Concurrent watch mode for both bundles |
| `pnpm run export-prompts` | Regenerate `PROMPTS.md` and all CSV files |
| `pnpm run slice-sheet` | Slice sticker sheet PNGs into individual cells |

Always run `pnpm run build` before loading the plugin in Figma Desktop.

---

## Key data models

### `Trend` (`src/app/data/trends.ts`)

```ts
interface Trend {
  id: number;          // 1–10; 1–6 = free, 7–10 = pro
  title: string;
  tagline: string;
  description: string;
  keywords: string[];
  mood: string;
  applications: string[];
  imageUrl: string;    // imported PNG from src/assets/trends/
  color: string;       // accent color (CSS rgb string)
  midjourneyPrompts: {
    masterPrompt: string;      // full style description
    aspectRatios: string[];    // suggested --ar flags
    negativePrompts: string;   // comma-separated negatives
    variations: string[];      // 10 variation strings per trend
  };
}
```

### `StoredTrendData` — what gets written to Figma nodes

```ts
interface StoredTrendData {
  trendId: number;
  trendTitle: string;
  selectedVariationIndex: number | null;
  selectedVariation: string | null;
  fullPrompt: string | null;
  appliedAt: number;           // epoch ms
  baseLayerName?: string;      // original layer name before suffix was appended
  stickerFormat?: StickerFormat;
  selectedThemeId?: ThemeId | null;
}
```

Stored on nodes via `node.setPluginData('designTrend', JSON.stringify(data))`.

Layer names are modified: `"FrameName — Trend Title"` when a trend is applied; restored to `baseLayerName` on clear.

### Supported node types (sandbox `canStoreData`)

`FRAME`, `COMPONENT`, `COMPONENT_SET`, `INSTANCE`, `RECTANGLE`, `ELLIPSE`, `POLYGON`, `STAR`, `VECTOR`, `TEXT`, `GROUP`, `SECTION`. Document, Page, and Slice nodes are not supported.

---

## Prompt building

The primary entry point is `buildTrendTapPrompt()` in `src/app/plugin/utils/buildTrendTapPrompt.ts`.

### Layered structure (L0 → L4)

| Layer | Content | When included |
|-------|---------|--------------|
| L0 — output contract | Single sticker spec or sticker sheet grid spec | `stickerFormat !== "off"` |
| L1 — theme subject | e.g. "food and drink subjects only, ..." | `themeId` set + sticker or patch mode |
| L2 — style | `masterPrompt` + variation hook | Always |
| L3 — trend modifiers | Patch type suffix or dithering color clause | Feature enabled |
| L4 — chibi | `"chibi kawaii mascot, big eyes, cute proportions"` | `chibiMode` |

Followed by a negative clause: `. No <guardrails>.` (or `. Avoid: ...` for chibi-only).

### Prompt length enforcement

`fitPromptToFigmaLimit()` in `figmaPromptLimits.ts` trims positive parts from the end while preserving guardrail negatives, ensuring the result fits Figma's empirical 1500-character limit.

### Pro gating in prompt builder

All Pro modifiers are zeroed if `isPro === false`:
- `effectiveStickerFormat = isPro ? stickerFormat : "off"`
- `effectiveChibiMode = isPro && chibiMode`
- `effectivePatchMode = isPro && patchMode`
- `effectiveDitheringColorMode = isPro && trendId === DITHERING_ASCII_TREND_ID && ditheringColorMode`
- `effectiveThemeId = isPro ? themeId : null`

---

## UI state (`PluginController.tsx`)

`PluginController` is the root stateful component. It provides `PluginContext` (accessed via `usePluginContext()`) throughout the tree.

State includes: `selectedNodes`, `currentTrendData`, `stickerFormat`, `selectedThemeId`, `selectedAspectRatio`, `chibiMode`, `patchMode`, `patchType`, `ditheringColorMode`, `isPro`, `licenseStatus`.

Preferences (`stickerFormat`, `selectedThemeId`, `chibiMode`, `patchMode`, `patchType`, `ditheringColorMode`) are persisted to `figma.clientStorage` under the key defined in `pluginPreferences.ts`.

---

## Sandbox ↔ UI message protocol

All messages are plain objects with a `type` string. Key message types:

| Direction | `type` | Purpose |
|-----------|--------|---------|
| UI → sandbox | `get-selection` | Request current selection |
| Sandbox → UI | `selection-changed` | Push `FigmaNode[]` |
| UI → sandbox | `save-trend-data` | Write `StoredTrendData` to node(s) |
| UI → sandbox | `get-trend-data` | Read stored data for a node |
| Sandbox → UI | `trend-data` | Response with stored data |
| UI → sandbox | `clear-trend-data` | Clear data + restore layer name |
| UI → sandbox | `resize-ui` | Resize plugin panel |
| UI → sandbox | `prepare-generation-frame` | Resize selected frame to aspect ratio dimensions |
| UI → sandbox | `resize-generation-frame` | Resize + zoom to frame (user-initiated) |
| Sandbox → UI | `generation-target-ready` | Confirm resize outcome |
| UI → sandbox | `load-license-status` | Check stored license |
| UI → sandbox | `activate-license` | Call Lemon Squeezy API |
| Sandbox → UI | `license-status` / `license-activated` / `license-error` | License results |
| UI → sandbox | `save-plugin-preferences` | Persist user preferences |
| UI → sandbox | `load-plugin-preferences` | Load preferences on startup |
| Sandbox → UI | `plugin-preferences` | Push loaded preferences |
| UI → sandbox | `open-checkout` | Open external URL via `figma.openExternal` |

---

## Monetization / license system

Pro features are gated by a Lemon Squeezy license key. See `MONETIZATION.md` for the full setup guide.

- **Checkout URL**: set `VITE_PRO_CHECKOUT_URL` in `.env` (see `.env.example`)
- **Activation**: `licenseSandbox.ts` calls the Lemon Squeezy license API from the sandbox (allowed domain: `https://api.lemonsqueezy.com`)
- **Offline grace period**: 7 days (`LICENSE_GRACE_MS` in `licenseTypes.ts`)
- **Storage**: license is stored in `figma.clientStorage` under `"proLicense"`
- **Tier config**: `src/app/data/tierConfig.ts` defines `FREE_TREND_IDS = [1,2,3,4,5,6]` and `PRO_TREND_IDS = [7,8,9,10]`

---

## Prompt library & CSV exports

`pnpm run export-prompts` regenerates from `src/app/data/trends.ts`:

| File | Use |
|------|-----|
| `PROMPTS.md` | Human-readable full prompt library |
| `PROMPTS-flora-batch.csv` | No-header CSV for FLORA Batch Node (100 rows) |
| `PROMPTS-flora-reference.csv` | Reference CSV with trend ID + title |
| `PROMPTS-weave-master-batch.csv` | 8 themes × 10 trends sticker sheet batch (80 rows) |
| `PROMPTS-weave-master-reference.csv` | Reference version of the sticker batch |
| `PROMPTS-weave-arrays.md` | Per-theme prompt arrays + docs |
| `PROMPTS-weave-{theme}.csv` | Per-theme CSVs |

Run this script whenever `src/app/data/trends.ts` or `src/app/data/themes.ts` changes.

---

## Development workflow

### Local dev loop

```bash
pnpm install
pnpm run watch          # rebuilds on save
# In Figma Desktop: Plugins → Development → Import plugin from manifest
# Select manifest.json from this directory
```

### Testing in Figma

1. Build or watch.
2. Import from manifest in Figma Desktop.
3. Create/select a frame.
4. Open plugin, browse trends, copy a prompt.
5. Re-open on the same frame — the applied trend is highlighted in the carousel.

### Adding a new trend

1. Add a new `Trend` object to the `trends` array in `src/app/data/trends.ts` with `id: 11` (or next).
2. Add a PNG to `src/assets/trends/` and import it in `trendImages.ts`.
3. Update `tierConfig.ts` if it's a Pro-only trend.
4. Add variation subject strings in `themeSubjects.ts` if themes should apply.
5. Run `pnpm run export-prompts` to regenerate CSV/Markdown files.
6. Rebuild and test.

### Adding a new Pro modifier

1. Define the modifier flag in `PluginController.tsx` state and `PluginContextState`.
2. Add the message type to `figmaMessaging.ts` if sandbox persistence is needed.
3. Add the prompt layer in `buildTrendTapPrompt.ts` with a Pro gate (`isPro && flag`).
4. Add a negative guardrail to `collectModifierNegatives()` in `figmaPromptLimits.ts`.
5. Persist in `pluginPreferences.ts` and `plugin-code.ts` `sanitizePluginPreferences`.

---

## Conventions

- **No tests**: there is no test suite. Verify by loading the plugin in Figma Desktop.
- **TypeScript strict**: the project uses strict TS. Don't use `any` without a comment.
- **No ESLint config present**: follow existing code style (2-space indent, single quotes in TS).
- **Sandbox vs UI split**: never import DOM APIs in `plugin-code.ts`; never call `figma.*` in `src/app/`. The `--loader:.png=empty` esbuild flag silences PNG imports in sandbox builds.
- **Deprecated exports**: `figmaPromptLimits.ts` has several `@deprecated` constants kept for backwards compatibility. Prefer the function-based replacements (`buildStickerSingleGuardrails()`, etc.).
- **Layer name mutations**: the sandbox appends ` — TrendTitle` to layer names on save and strips it on clear. Always use `baseLayerName` from stored data — never re-parse the current name.
- **`VITE_` prefix**: only env vars prefixed with `VITE_` are available in the UI bundle. Lemon Squeezy server-side keys must never use this prefix.
- **UI size**: clamped between 280×400 and 680×900 (`plugin-code.ts`). Persisted in `figma.clientStorage` under `"uiSize"`.
