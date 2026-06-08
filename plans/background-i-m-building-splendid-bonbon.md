# Figma Plugin Conversion Plan: Design Trends Prompt Appender

## Context

This conversion transforms the existing Figma Make moodboard application into a fully functional Figma Plugin that allows users to apply 2026 design trend styles to their image prompts directly within Figma.

**Why this change is needed:**
- Current state: Standalone moodboard library displaying 10 design trends with Midjourney prompt generation
- Desired state: Figma plugin that integrates into the design workflow, allowing users to select frames/images and append design trend prompts
- User workflow: Select image in Figma → choose trend from plugin → prompt stored as metadata on node + copied to clipboard for immediate Midjourney use

**User Requirements (confirmed):**
1. **Dual persistence**: Store prompts as metadata on Figma nodes (persistent, editable) AND copy to clipboard (immediate use)
2. **Dual UI**: Sidebar panel for quick access + modal window for browsing all trends

This is already a Figma Make project with infrastructure in place (`__figma__entrypoint__.ts`, Vite config), so the heavy lifting is adapting the UI and integrating Figma's Plugin API.

---

## Implementation Approach

### Architecture Overview

**Plugin Structure:**
```
Plugin UI (React)
├── Sidebar Panel (compact, always visible)
│   ├── Selection status indicator
│   ├── Currently applied trend display
│   └── Quick actions (browse, clear, copy)
├── Modal Browser (expanded view)
│   ├── Full trend grid (reuse TrendCard)
│   └── Detail view with prompt generator (reuse TrendDetail)
└── Figma Plugin Backend
    ├── Selection change listener
    ├── Plugin data storage (setPluginData/getPluginData)
    └── Clipboard API integration
```

**Data Flow:**
```
User selects node in Figma
  ↓
Plugin detects selection change
  ↓
Check if node has stored trend data
  ↓
Display current trend in sidebar (if exists)
  ↓
User clicks "Browse Trends" → Modal opens with full grid
  ↓
User selects trend → Detail view → Clicks prompt variation
  ↓
BOTH actions happen:
  1. Store trend data on Figma node via setPluginData()
  2. Copy full prompt to clipboard
  ↓
Toast confirmation + Update sidebar to show applied trend
```

---

## Critical Files to Modify/Create

### 1. **New Plugin Architecture Files**

**`src/app/plugin/PluginController.tsx`** (NEW)
- Root plugin component managing sidebar + modal state
- Handles Figma selection changes via `figma.on('selectionchange')`
- Manages communication between UI and Figma backend
- Stores plugin state (selected nodes, current trend, modal open/closed)

**`src/app/plugin/Sidebar.tsx`** (NEW)
- Compact panel UI (300-400px wide recommended)
- Displays:
  - Selection status ("1 frame selected", "No selection", "3 nodes selected")
  - Currently applied trend (if exists on selected node)
  - Buttons: "Browse Trends", "Clear Trend", "Copy Prompt"
- Reads pluginData from selected node to show current state

**`src/app/plugin/TrendModal.tsx`** (NEW)
- Expanded modal overlaying Figma canvas
- Reuses existing components:
  - Grid view with `TrendCard` components
  - Detail view with `TrendDetail` + `PromptGenerator`
- Closable via X button or ESC key
- Passes selection context to child components

**`src/app/plugin/utils/figmaStorage.ts`** (NEW)
- Utility functions for Figma plugin data operations:
  ```typescript
  export interface StoredTrendData {
    trendId: number;
    trendTitle: string;
    selectedVariationIndex: number | null;
    selectedVariation: string | null;
    fullPrompt: string | null;
    appliedAt: number; // timestamp
  }
  
  export function saveTrendToNode(node: SceneNode, trend: Trend, variation?: string, fullPrompt?: string): void
  export function getTrendFromNode(node: SceneNode): StoredTrendData | null
  export function clearTrendFromNode(node: SceneNode): void
  export function canStoreData(node: SceneNode): boolean // Check if node type supports pluginData
  ```

**`src/app/plugin/utils/promptBuilder.ts`** (NEW)
- Extract prompt building logic from `PromptGenerator.tsx` into reusable utility:
  ```typescript
  export function buildFullPrompt(
    masterPrompt: string,
    variation: string,
    aspectRatios: string[],
    negativePrompts: string
  ): string
  
  export function extractAspectRatio(variation: string): string | null
  export function cleanVariation(variation: string): string
  ```

### 2. **Modified Existing Files**

**`src/app/App.tsx`** (MODIFY)
- Replace current two-view system with plugin controller
- Wrap with `PluginController` as root component
- Remove standalone navigation (now handled by sidebar + modal)

**`src/app/components/PromptGenerator.tsx`** (MODIFY)
- Add `onPromptSelect` callback prop to notify parent when variation is clicked
- Keep existing copy-to-clipboard functionality
- Add integration with Figma plugin data storage:
  ```typescript
  const copyToClipboard = async (text: string, index: number, variation: string) => {
    // Existing clipboard logic...
    
    // NEW: Store to Figma node if selection exists
    if (figma.currentPage.selection.length > 0) {
      const node = figma.currentPage.selection[0];
      saveTrendToNode(node, trend, variation, text);
    }
    
    // Existing toast notification...
  }
  ```

**`src/app/components/TrendCard.tsx`** (MODIFY - minimal)
- Add optional `isApplied` prop to show visual indicator if trend is currently applied to selection
- Add checkmark badge overlay when `isApplied={true}`

**`src/app/components/TrendDetail.tsx`** (MODIFY - minimal)
- Pass Figma selection context to `PromptGenerator`
- No major structural changes needed

### 3. **Figma Plugin API Integration**

**`__figma__entrypoint__.ts`** (MODIFY - if needed)
- Currently just imports and lazy-loads App
- May need to add plugin manifest configuration if permissions are required
- Likely no changes needed since Figma Make handles this automatically

---

## Reusable Code & Components

**Preserve these existing components (no major changes):**
- `src/app/data/trends.ts` - All 10 trends data (298 lines) - **REUSE AS-IS**
- `src/app/components/TrendCard.tsx` - Visual trend cards - **MINOR MODIFICATION**
- `src/app/components/TrendDetail.tsx` - Full trend view - **MINOR MODIFICATION**
- `src/app/components/PromptGenerator.tsx` - Prompt UI + copy logic - **ENHANCE**
- `src/app/components/figma/ImageWithFallback.tsx` - Image error handling - **REUSE AS-IS**
- `src/app/components/ui/*` - All shadcn components - **REUSE AS-IS**

**Extract and refactor:**
- Prompt building logic from `PromptGenerator.tsx` → new `promptBuilder.ts` utility
- This allows both UI component and Figma storage layer to share the same prompt construction logic

---

## Edge Cases & Handling

### Selection States

| State | Sidebar Display | Behavior |
|-------|----------------|----------|
| No selection | "Select a frame or image to apply trends" | Browse button still works, stores to selection when made |
| 1 node selected (valid type) | Show node name + current trend (if exists) | Normal operation |
| 1 node selected (invalid type) | "This node type doesn't support metadata" | Can still browse/copy, but can't store |
| Multiple nodes | "3 nodes selected - click to apply trend to all" | Batch apply same trend to all selected nodes |

**Invalid node types for pluginData:**
- Document nodes, Page nodes, Slice nodes
- Handle gracefully with message: "Plugin data can only be stored on frames, components, and instances"

### Prompt Variations

**When node has stored trend:**
- Sidebar shows: Trend title + last selected variation (if any)
- "Copy Last Prompt" button appears in sidebar
- User can browse and apply a different variation to replace

**When no variation selected yet:**
- Node stores trend ID but no specific prompt
- Sidebar shows: "Trend applied - click to select a variation"

### Multi-Selection Batch Apply

**Workflow:**
```
User selects 5 frames
  ↓
Clicks "Browse Trends" → Selects "Naïve Design" → Clicks variation #3
  ↓
Plugin applies same prompt to all 5 frames
  ↓
Toast: "Applied 'Naïve Design' to 5 nodes"
```

---

## Technical Implementation Details

### Figma Plugin API Usage

**Selection Listener:**
```typescript
figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection;
  updateSidebarState(selection);
});
```

**Plugin Data Storage:**
```typescript
// Store
node.setPluginData('designTrend', JSON.stringify({
  trendId: 1,
  trendTitle: "Naïve Design",
  selectedVariationIndex: 2,
  selectedVariation: "marker scribbles with emotional looseness...",
  fullPrompt: "naïve childlike illustration, marker scribbles...",
  appliedAt: Date.now()
}));

// Retrieve
const data = node.getPluginData('designTrend');
const trendData = data ? JSON.parse(data) : null;

// Clear
node.setPluginData('designTrend', '');
```

**Node Type Validation:**
```typescript
function canStoreData(node: SceneNode): boolean {
  return node.type === 'FRAME' 
    || node.type === 'COMPONENT' 
    || node.type === 'INSTANCE'
    || node.type === 'RECTANGLE'
    || node.type === 'ELLIPSE'
    || node.type === 'VECTOR'
    || node.type === 'GROUP';
}
```

### UI Sizing

**Sidebar Panel:**
- Width: 320px (Figma standard)
- Height: 100vh (full height)
- Position: Fixed right side
- Collapsible: Optional "minimize" button

**Modal Window:**
- Max width: 1200px
- Centered overlay with backdrop blur
- Scrollable content for trend grid + detail views
- ESC key to close

### State Management

**React Context for Plugin State:**
```typescript
interface PluginContextState {
  selectedNodes: SceneNode[];
  currentTrend: Trend | null;
  modalOpen: boolean;
  modalView: 'grid' | 'detail';
  selectedTrendId: number | null;
}
```

**No additional state libraries needed** - React hooks + context sufficient for this scope.

---

## Implementation Sequence

### Phase 1: Foundation (Plugin Infrastructure)
1. Create `src/app/plugin/` directory structure
2. Build `figmaStorage.ts` utility with pluginData functions
3. Build `promptBuilder.ts` utility (extract from PromptGenerator)
4. Create basic `PluginController.tsx` with selection listener
5. Test: Verify selection changes are detected and logged

### Phase 2: Sidebar UI
1. Create `Sidebar.tsx` component with static layout
2. Integrate with selection state (display selected node info)
3. Add "Browse Trends" button (opens modal state)
4. Add current trend display (read from node pluginData)
5. Add "Clear Trend" and "Copy Prompt" actions
6. Test: Sidebar updates on selection changes

### Phase 3: Modal Browser
1. Create `TrendModal.tsx` wrapper component
2. Integrate existing `TrendCard` grid view (reuse from App.tsx)
3. Integrate existing `TrendDetail` view with navigation
4. Add modal open/close state management
5. Connect modal to sidebar triggers
6. Test: Modal opens, displays trends, closes on ESC/X

### Phase 4: Prompt Application
1. Modify `PromptGenerator.tsx` to call storage on click
2. Implement dual action: clipboard copy + pluginData save
3. Add toast notifications for success states
4. Handle edge cases (no selection, invalid node types)
5. Add batch application for multi-selection
6. Test: Prompts stored correctly, readable on re-selection

### Phase 5: Polish & UX
1. Add visual indicators (checkmark on applied trends)
2. Add loading states for async operations
3. Add keyboard shortcuts (ESC to close modal)
4. Add "Applied X minutes ago" timestamp display
5. Add clear all trends action for multi-selection
6. Test: Full workflow from selection → browse → apply → verify

---

## Verification Plan

### Manual Testing Checklist

**Basic Workflow:**
1. ✅ Open Figma file with plugin installed
2. ✅ Plugin sidebar appears on right side
3. ✅ Select a frame → Sidebar shows "1 frame selected"
4. ✅ Click "Browse Trends" → Modal opens with 10 trends in grid
5. ✅ Click trend card → Detail view appears
6. ✅ Click prompt variation → Prompt copied to clipboard AND stored on node
7. ✅ Toast notification appears confirming action
8. ✅ Modal closes → Sidebar shows applied trend
9. ✅ Deselect and re-select same frame → Sidebar still shows trend (persistence verified)

**Edge Cases:**
1. ✅ No selection → Sidebar shows "Select a frame to apply trends"
2. ✅ Invalid node type (e.g., text layer) → Sidebar shows "This node type doesn't support metadata"
3. ✅ Multiple selection (3 frames) → Apply trend to all 3 → Verify all 3 have stored data
4. ✅ Apply different variation to same node → Old data replaced with new
5. ✅ Click "Clear Trend" → PluginData removed, sidebar updates
6. ✅ ESC key closes modal
7. ✅ Modal backdrop click closes modal

**Data Integrity:**
1. ✅ Stored prompt matches clipboard content exactly
2. ✅ Variation index stored correctly (retrievable for "Copy Last Prompt")
3. ✅ Timestamp stored and displayed correctly
4. ✅ Trend ID matches trend in data file
5. ✅ JSON parsing/stringifying works without errors

**UI/UX:**
1. ✅ Sidebar scrollable when content overflows
2. ✅ Modal scrollable for trend grid
3. ✅ Images load with fallback handling
4. ✅ Hover states on all interactive elements
5. ✅ Copy icons change to checkmarks on success
6. ✅ Applied trend shows checkmark badge on TrendCard

### Automated Testing (Optional Future Work)

```typescript
// Unit tests for utilities
describe('promptBuilder', () => {
  test('builds full prompt correctly', () => {
    const result = buildFullPrompt(master, variation, aspectRatios, negatives);
    expect(result).toContain(master);
    expect(result).toContain('--ar 1:1');
    expect(result).toContain('--no');
  });
});

describe('figmaStorage', () => {
  test('saves and retrieves trend data', () => {
    saveTrendToNode(mockNode, trend);
    const retrieved = getTrendFromNode(mockNode);
    expect(retrieved.trendId).toBe(trend.id);
  });
});
```

---

## Dependencies & Requirements

**No new npm packages required** - all needed dependencies already in package.json:
- ✅ React 18.3.1
- ✅ Radix UI components (Dialog for modal, ScrollArea, etc.)
- ✅ Lucide React (icons)
- ✅ Sonner (toast notifications)
- ✅ Tailwind CSS (styling)

**Figma Plugin API access:**
- Already configured via `figma:foundry-client-api` import in entrypoint
- No manifest changes needed (Figma Make handles this)

---

## Success Criteria

### Minimum Viable Plugin (MVP)

- [x] Plugin sidebar displays in Figma
- [x] User can select frame and see selection status
- [x] User can browse all 10 trends in modal
- [x] User can view trend details and variations
- [x] User can click variation to copy AND store prompt
- [x] Stored prompts persist across Figma sessions
- [x] Sidebar shows currently applied trend on selected node

### Full Feature Set

- [x] All MVP features
- [x] Multi-selection batch application
- [x] Clear trend action
- [x] Copy last prompt from sidebar
- [x] Timestamp display
- [x] Visual indicators (checkmarks, badges)
- [x] Keyboard shortcuts (ESC to close)
- [x] Edge case handling (invalid nodes, no selection)
- [x] Responsive UI (scrolling, overflow)

---

## Notes & Considerations

**Performance:**
- Plugin data storage is synchronous and fast (no performance concerns)
- Image loading uses existing `ImageWithFallback` component with error handling
- Modal rendering only when opened (lazy loading)

**Future Enhancements (Out of Scope for Initial Conversion):**
- Export all applied trends as CSV/JSON report
- Bulk operations (apply trend to all frames in page)
- Search/filter trends by keyword
- Custom user-defined variations
- Trend suggestion based on selected image colors/style

**Design System Compliance:**
- Continue using existing Tailwind theme from `/src/styles/theme.css`
- Maintain consistent spacing, typography, colors
- Plugin UI should feel native to Figma (subtle, minimal chrome)

**Code Organization:**
- Keep plugin-specific code in `src/app/plugin/` directory
- Shared components remain in `src/app/components/`
- Data models remain in `src/app/data/`
- Clear separation of concerns: UI vs Figma API vs business logic
