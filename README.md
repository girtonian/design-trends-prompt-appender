# Design Trends Prompt Appender - Figma Plugin

A Figma plugin that bridges design and AI image generation by applying curated 2026 aesthetic trends to your creative workflow.

## Features

- **10 Curated Design Trends**: Naïve Design, Trinket Design, Grainy Gradient Blur, Fuzzy Amorphous Creatures, Acid Blur, Blurry Ethereal Florals, Type Collage, Punk Grunge Revival, Signal Graphics, Future Medieval Design
- **100 Midjourney Prompts**: 10 variations per trend, ready to use
- **Dual Persistence**: Prompts saved as node metadata + copied to clipboard
- **Batch Operations**: Apply trends to multiple selections at once
- **Smart Selection**: Real-time selection tracking with node type validation

## Development Setup

### Prerequisites

- Node.js 18+ and pnpm
- Figma desktop app (for testing)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development Workflow

```bash
# Watch mode for development (auto-rebuilds on changes)
pnpm run watch

# Build for production
pnpm run build

# Build UI only
pnpm run build:ui

# Build plugin code only
pnpm run build:code
```

### Project Structure

```
src/
├── app/
│   ├── plugin/                    # Plugin-specific code
│   │   ├── PluginController.tsx   # Root plugin component
│   │   ├── Sidebar.tsx            # Sidebar panel UI
│   │   ├── TrendModal.tsx         # Trend browser modal
│   │   └── utils/
│   │       ├── figmaStorage.ts    # Plugin data utilities
│   │       ├── figmaMessaging.ts  # UI<->Plugin messaging
│   │       └── promptBuilder.ts   # Prompt generation logic
│   ├── components/                # React components
│   │   ├── TrendCard.tsx          # Trend preview cards
│   │   ├── TrendDetail.tsx        # Trend detail view
│   │   ├── PromptGenerator.tsx    # Prompt UI with copy
│   │   └── ui/                    # shadcn/ui components
│   ├── data/
│   │   └── trends.ts              # 10 design trends data
│   └── App.tsx                    # Main app component
├── plugin-code.ts                 # Figma plugin sandbox code
└── main.tsx                       # React entry point

dist/                              # Build output
├── code.js                        # Plugin sandbox bundle
└── index.html                     # UI bundle (single HTML file)
```

## Testing in Figma

1. **Build the plugin**:
   ```bash
   pnpm run build
   ```

2. **Load in Figma Desktop**:
   - Open Figma Desktop app
   - Go to `Plugins` → `Development` → `Import plugin from manifest`
   - Select `manifest.json` from this directory
   - Plugin appears in `Plugins` menu

3. **Test workflow**:
   - Create a frame in Figma
   - Run the plugin from the Plugins menu
   - Select the frame
   - Click "Browse Trends"
   - Choose a trend and click a prompt variation
   - Verify prompt is copied and saved to node

4. **Verify persistence**:
   - Close and re-open the plugin
   - Select the same frame
   - Sidebar should show the applied trend

## Publishing to Figma Community

### 1. Prepare for Publication

Update `manifest.json` with your details:
```json
{
  "name": "Design Trends Prompt Appender",
  "id": "YOUR_UNIQUE_PLUGIN_ID",
  "api": "1.0.0",
  "main": "dist/code.js",
  "ui": "dist/index.html",
  "editorType": ["figma"]
}
```

### 2. Build Production Bundle

```bash
# Clean build
rm -rf dist
pnpm run build
```

### 3. Create Plugin Icon

Create a 128×128px PNG icon:
- Save as `icon.png` in root directory
- Represents your plugin in Figma plugin browser
- Should be clear at small sizes

### 4. Publish to Figma

1. **In Figma Desktop**:
   - Go to `Plugins` → `Development` → Select your plugin → `Publish`

2. **Fill out plugin listing**:
   - **Name**: Design Trends Prompt Appender
   - **Tagline**: Apply 2026 aesthetic trends to your AI image prompts
   - **Description**: (Use the description from this README)
   - **Category**: Productivity, AI Tools
   - **Tags**: AI, Midjourney, Prompts, Design Trends, 2026

3. **Upload assets**:
   - Plugin icon (128×128px)
   - Cover image (1920×960px recommended)
   - Screenshots showing:
     - Sidebar with selection
     - Trend browser grid
     - Trend detail with prompts
     - Applied trend indicator

4. **Set permissions**:
   - Network access: `https://images.unsplash.com` (for trend images)

5. **Submit for review**:
   - Review submission will take 1-3 days
   - Figma team will review for quality and security
   - Address any feedback and resubmit

### 5. Update Workflow

After initial publish:
```bash
# Increment version in manifest.json
# Make changes
pnpm run build
# Publish update via Figma Desktop
```

## Architecture Notes

### Message Passing

The plugin uses a message-based architecture:

**Plugin Code (sandbox)** ↔ **UI Code (React in iframe)**

```typescript
// UI sends to plugin
parent.postMessage({ pluginMessage: { type: 'save-trend-data', ... } }, '*');

// Plugin sends to UI
figma.ui.postMessage({ type: 'selection-changed', selection: [...] });
```

### Plugin Data Storage

Trends are stored on Figma nodes using `setPluginData()`:

```typescript
node.setPluginData('designTrend', JSON.stringify({
  trendId: 1,
  trendTitle: "Naïve Design",
  selectedVariationIndex: 2,
  selectedVariation: "marker scribbles...",
  fullPrompt: "naïve childlike illustration...",
  appliedAt: 1234567890
}));
```

### Supported Node Types

Can store plugin data:
- Frames, Components, Component Sets, Instances
- Shapes (Rectangle, Ellipse, Polygon, Star, Vector)
- Text, Groups, Sections

Cannot store plugin data:
- Document, Page, Slice nodes

## Troubleshooting

### Build Issues

**Error: `vite-plugin-singlefile` not found**
```bash
pnpm install vite-plugin-singlefile --save-dev
```

**Error: `esbuild` not found**
```bash
pnpm install esbuild --save-dev
```

### Plugin Issues

**Plugin doesn't load in Figma**
- Check `dist/code.js` and `dist/index.html` exist
- Verify `manifest.json` points to correct paths
- Check browser console for errors (Figma → Plugins → Development → Open Console)

**Selection not updating**
- Ensure message listener is set up in `PluginController.tsx`
- Check plugin code console for errors
- Verify selection events are being sent

**Prompts not saving**
- Check that node types are supported (use Frames, not Document/Page)
- Verify `setPluginData` calls in `plugin-code.ts`
- Check browser console for postMessage errors

## License

MIT

## Credits

- Design trends research: 2026 aesthetic forecasting
- UI components: shadcn/ui (Radix UI + Tailwind CSS)
- Icons: Lucide React
- Trend imagery: Unsplash
