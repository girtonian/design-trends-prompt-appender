# Trend Tap — Prompt Library

All prompts exported from the plugin source (`src/app/data/trends.ts`).
Use these with **Figma Weave**, **FLORA.ai**, or any image generation tool.

## How to use with Figma Weave

1. Open Weave in Figma and start a new image generation.
2. Copy a **Weave-ready prompt** below (natural language, no Midjourney flags).
3. Paste into Weave and generate.

## How to use with FLORA.ai Batch Node

1. Upload [`PROMPTS-flora-batch.csv`](PROMPTS-flora-batch.csv) to a text Batch Node.
2. FLORA reads **only the first column** — this file has no header row and is ready to upload.
3. Each row becomes one batch item (100 prompts total, FLORA's per-run limit).

See [`PROMPTS-flora-reference.csv`](PROMPTS-flora-reference.csv) for trend labels and variation numbers.

> **Weave-ready** prompts strip `--ar`, `--style`, and `--no` flags.

> **Midjourney full** prompts match exactly what the plugin copies to your clipboard.

---

## Quick reference

| # | Trend | Variations |
|---|-------|------------|
| 01 | Imperfect Minimalism | 10 |
| 02 | Object Nostalgia | 10 |
| 03 | Atmospheric Gradient | 10 |
| 04 | Plush Surrealism | 10 |
| 05 | Psychedelic Optics | 10 |
| 06 | Ethereal Botanics | 10 |
| 07 | Fragmented Type | 10 |
| 08 | Xerox Punk | 10 |
| 09 | Broadcast Signals | 10 |
| 10 | Dithering ASCII | 10 |

---

## 01 — Imperfect Minimalism

*Imperfect on purpose.*

**Keywords:** Hand-drawn, Playful, Imperfect, Authentic, Whimsical

**Mood:** Joyful, approachable, human

### Master prompt

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm
```

**Negative guidance:** realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures

**Default aspect ratios:** --ar 1:1, --ar 3:4

### Variations

#### 01.01 — Variation 01

**Weave-ready prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, crayon notebook doodles, messy childlike shapes, vibrant primaries, uneven coloring outside the lines. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.
```

**Midjourney full prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, crayon notebook doodles, messy childlike shapes, vibrant primaries, uneven coloring outside the lines  --style raw --ar 1:1 --no realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures
```

#### 01.02 — Variation 02

**Weave-ready prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, marker scribbles with emotional looseness, sketchbook aesthetic, naïve proportions. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.
```

**Midjourney full prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, marker scribbles with emotional looseness, sketchbook aesthetic, naïve proportions --ar 4:5 --no realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures
```

#### 01.03 — Variation 03

**Weave-ready prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, kids' scribble animals, expressive wiggly outlines, crayon texture noise. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.
```

**Midjourney full prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, kids' scribble animals, expressive wiggly outlines, crayon texture noise --ar 1:1 --no realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures
```

#### 01.04 — Variation 04

**Weave-ready prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, simple storytelling scene drawn like a child, paper grain, bright messy strokes. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.
```

**Midjourney full prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, simple storytelling scene drawn like a child, paper grain, bright messy strokes --ar 3:4 --no realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures
```

#### 01.05 — Variation 05

**Weave-ready prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, naïve faces with uneven eyes and giant smiles, doodle whimsy. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.
```

**Midjourney full prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, naïve faces with uneven eyes and giant smiles, doodle whimsy --ar 1:1 --no realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures
```

#### 01.06 — Variation 06

**Weave-ready prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, chaotic notebook scratchings with playful icons, hand-scrawled look. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.
```

**Midjourney full prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, chaotic notebook scratchings with playful icons, hand-scrawled look --ar 1:1 --no realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures
```

#### 01.07 — Variation 07

**Weave-ready prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, simple symbolic shapes drawn in crayon, raw innocence, thick strokes. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.
```

**Midjourney full prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, simple symbolic shapes drawn in crayon, raw innocence, thick strokes --ar 5:4 --no realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures
```

#### 01.08 — Variation 08

**Weave-ready prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, childlike scenery with uneven trees and wobbly sun, messy coloring. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.
```

**Midjourney full prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, childlike scenery with uneven trees and wobbly sun, messy coloring --ar 1:1 --no realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures
```

#### 01.09 — Variation 09

**Weave-ready prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, marker-drawn patterns, repetitive childish motifs, fun irregular rhythm. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.
```

**Midjourney full prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, marker-drawn patterns, repetitive childish motifs, fun irregular rhythm --ar 3:4 --no realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures
```

#### 01.10 — Variation 10

**Weave-ready prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, analog crayon blobs and characters, emotional naïve energy. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.
```

**Midjourney full prompt**

```
naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, analog crayon blobs and characters, emotional naïve energy --ar 1:1 --no realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures
```

---

## 02 — Object Nostalgia

*Small treasures, big stories.*

**Keywords:** Intricate, Collectible, Detailed, Precious, Miniature

**Mood:** Curious, intimate, treasured

### Master prompt

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel
```

**Negative guidance:** messy background, dramatic lighting, depth perspective

**Default aspect ratios:** --ar 4:5

### Variations

#### 02.01 — Variation 01

**Weave-ready prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, museum catalog of nostalgic trinkets, clean flat-lay grid, labeled objects. Avoid: messy background, dramatic lighting, depth perspective.
```

**Midjourney full prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, museum catalog of nostalgic trinkets, clean flat-lay grid, labeled objects --ar 4:5 --no messy background, dramatic lighting, depth perspective
```

#### 02.02 — Variation 02

**Weave-ready prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, index sheet of childhood artifacts, isolated on cream background. Avoid: messy background, dramatic lighting, depth perspective.
```

**Midjourney full prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, index sheet of childhood artifacts, isolated on cream background --ar 3:4 --no messy background, dramatic lighting, depth perspective
```

#### 02.03 — Variation 03

**Weave-ready prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, flat-lay layout of tools and toys, evenly spaced, neat grid. Avoid: messy background, dramatic lighting, depth perspective.
```

**Midjourney full prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, flat-lay layout of tools and toys, evenly spaced, neat grid --ar 4:5 --no messy background, dramatic lighting, depth perspective
```

#### 02.04 — Variation 04

**Weave-ready prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, object archive aesthetic, numbered labels, monospaced type. Avoid: messy background, dramatic lighting, depth perspective.
```

**Midjourney full prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, object archive aesthetic, numbered labels, monospaced type --ar 1:1 --no messy background, dramatic lighting, depth perspective
```

#### 02.05 — Variation 05

**Weave-ready prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, floating trinket collection, symmetrical arrangement. Avoid: messy background, dramatic lighting, depth perspective.
```

**Midjourney full prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, floating trinket collection, symmetrical arrangement --ar 4:5 --no messy background, dramatic lighting, depth perspective
```

#### 02.06 — Variation 06

**Weave-ready prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, vintage memory-box contents catalogued neatly. Avoid: messy background, dramatic lighting, depth perspective.
```

**Midjourney full prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, vintage memory-box contents catalogued neatly --ar 3:4 --no messy background, dramatic lighting, depth perspective
```

#### 02.07 — Variation 07

**Weave-ready prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, colorful small items displayed like specimens. Avoid: messy background, dramatic lighting, depth perspective.
```

**Midjourney full prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, colorful small items displayed like specimens --ar 4:5 --no messy background, dramatic lighting, depth perspective
```

#### 02.08 — Variation 08

**Weave-ready prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, paper-cutout silhouettes labeled by number. Avoid: messy background, dramatic lighting, depth perspective.
```

**Midjourney full prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, paper-cutout silhouettes labeled by number --ar 1:1 --no messy background, dramatic lighting, depth perspective
```

#### 02.09 — Variation 09

**Weave-ready prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, flat index of objects with even spacing and crisp isolation. Avoid: messy background, dramatic lighting, depth perspective.
```

**Midjourney full prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, flat index of objects with even spacing and crisp isolation --ar 4:5 --no messy background, dramatic lighting, depth perspective
```

#### 02.10 — Variation 10

**Weave-ready prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, clean archival poster of random artifacts, organized grid. Avoid: messy background, dramatic lighting, depth perspective.
```

**Midjourney full prompt**

```
flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, clean archival poster of random artifacts, organized grid --ar 3:4 --no messy background, dramatic lighting, depth perspective
```

---

## 03 — Atmospheric Gradient

*Texture meets atmosphere.*

**Keywords:** Textured, Atmospheric, Soft, Analog, Warm

**Mood:** Dreamy, tactile, nostalgic

### Master prompt

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture
```

**Negative guidance:** sharp edges, crisp realism, cluttered layout

**Default aspect ratios:** --ar 3:4, --ar 16:9

### Variations

#### 03.01 — Variation 01

**Weave-ready prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, grain-sprayed pastel gradients with foggy transitions. Avoid: sharp edges, crisp realism, cluttered layout.
```

**Midjourney full prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, grain-sprayed pastel gradients with foggy transitions --ar 3:4 --no sharp edges, crisp realism, cluttered layout
```

#### 03.02 — Variation 02

**Weave-ready prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, sunset-hued gradient blocks as layout dividers. Avoid: sharp edges, crisp realism, cluttered layout.
```

**Midjourney full prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, sunset-hued gradient blocks as layout dividers --ar 4:5 --no sharp edges, crisp realism, cluttered layout
```

#### 03.03 — Variation 03

**Weave-ready prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, dreamy neon mist with soft grain overlay. Avoid: sharp edges, crisp realism, cluttered layout.
```

**Midjourney full prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, dreamy neon mist with soft grain overlay --ar 1:1 --no sharp edges, crisp realism, cluttered layout
```

#### 03.04 — Variation 04

**Weave-ready prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, abstract editorial gradient compositions, minimal type shapes. Avoid: sharp edges, crisp realism, cluttered layout.
```

**Midjourney full prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, abstract editorial gradient compositions, minimal type shapes --ar 16:9 --no sharp edges, crisp realism, cluttered layout
```

#### 03.05 — Variation 05

**Weave-ready prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, hazy warm-to-cool gradient field, tactile grain. Avoid: sharp edges, crisp realism, cluttered layout.
```

**Midjourney full prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, hazy warm-to-cool gradient field, tactile grain --ar 3:4 --no sharp edges, crisp realism, cluttered layout
```

#### 03.06 — Variation 06

**Weave-ready prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, soft-focus gradient atmosphere, glowing color washes. Avoid: sharp edges, crisp realism, cluttered layout.
```

**Midjourney full prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, soft-focus gradient atmosphere, glowing color washes --ar 4:5 --no sharp edges, crisp realism, cluttered layout
```

#### 03.07 — Variation 07

**Weave-ready prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, fog-like abstract blur with subtle speckles. Avoid: sharp edges, crisp realism, cluttered layout.
```

**Midjourney full prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, fog-like abstract blur with subtle speckles --ar 1:1 --no sharp edges, crisp realism, cluttered layout
```

#### 03.08 — Variation 08

**Weave-ready prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, vibrant electric gradient glow with grain. Avoid: sharp edges, crisp realism, cluttered layout.
```

**Midjourney full prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, vibrant electric gradient glow with grain --ar 16:9 --no sharp edges, crisp realism, cluttered layout
```

#### 03.09 — Variation 09

**Weave-ready prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, blend of pastel and neon gradients, diffused edges. Avoid: sharp edges, crisp realism, cluttered layout.
```

**Midjourney full prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, blend of pastel and neon gradients, diffused edges --ar 3:4 --no sharp edges, crisp realism, cluttered layout
```

#### 03.10 — Variation 10

**Weave-ready prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, abstract smudged gradient poster with atmospheric haze. Avoid: sharp edges, crisp realism, cluttered layout.
```

**Midjourney full prompt**

```
grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, abstract smudged gradient poster with atmospheric haze --ar 4:5 --no sharp edges, crisp realism, cluttered layout
```

---

## 04 — Plush Surrealism

*Soft friends from the edges of imagination.*

**Keywords:** Organic, Soft, Abstract, Friendly, Shapeshifting

**Mood:** Comforting, playful, mysterious

### Master prompt

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot
```

**Negative guidance:** realistic anatomy, detailed fur, creepy faces

**Default aspect ratios:** --ar 1:1

### Variations

#### 04.01 — Variation 01

**Weave-ready prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, cute fuzzy blob with big round eyes, neon gradient puffball. Avoid: realistic anatomy, detailed fur, creepy faces.
```

**Midjourney full prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, cute fuzzy blob with big round eyes, neon gradient puffball --ar 1:1 --no realistic anatomy, detailed fur, creepy faces
```

#### 04.02 — Variation 02

**Weave-ready prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, star-shaped fuzzy pastel creature, tiny smile. Avoid: realistic anatomy, detailed fur, creepy faces.
```

**Midjourney full prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, star-shaped fuzzy pastel creature, tiny smile --ar 1:1 --no realistic anatomy, detailed fur, creepy faces
```

#### 04.03 — Variation 03

**Weave-ready prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, melting airbrush gradient blob character, soft and glowing. Avoid: realistic anatomy, detailed fur, creepy faces.
```

**Midjourney full prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, melting airbrush gradient blob character, soft and glowing --ar 1:1 --no realistic anatomy, detailed fur, creepy faces
```

#### 04.04 — Variation 04

**Weave-ready prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, round chibi blob with candy-colored airbrush texture. Avoid: realistic anatomy, detailed fur, creepy faces.
```

**Midjourney full prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, round chibi blob with candy-colored airbrush texture --ar 1:1 --no realistic anatomy, detailed fur, creepy faces
```

#### 04.05 — Variation 05

**Weave-ready prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, amorphous creature floating softly, dreamy fuzzy edges. Avoid: realistic anatomy, detailed fur, creepy faces.
```

**Midjourney full prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, amorphous creature floating softly, dreamy fuzzy edges --ar 1:1 --no realistic anatomy, detailed fur, creepy faces
```

#### 04.06 — Variation 06

**Weave-ready prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, psychedelic plush-like blob with subtle eyes. Avoid: realistic anatomy, detailed fur, creepy faces.
```

**Midjourney full prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, psychedelic plush-like blob with subtle eyes --ar 1:1 --no realistic anatomy, detailed fur, creepy faces
```

#### 04.07 — Variation 07

**Weave-ready prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, neon gradient puff creature, playful and uncanny-cute. Avoid: realistic anatomy, detailed fur, creepy faces.
```

**Midjourney full prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, neon gradient puff creature, playful and uncanny-cute --ar 1:1 --no realistic anatomy, detailed fur, creepy faces
```

#### 04.08 — Variation 08

**Weave-ready prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, creature made of foggy rainbow mist and tiny face. Avoid: realistic anatomy, detailed fur, creepy faces.
```

**Midjourney full prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, creature made of foggy rainbow mist and tiny face --ar 1:1 --no realistic anatomy, detailed fur, creepy faces
```

#### 04.09 — Variation 09

**Weave-ready prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, fuzzy glowing gradient critter with wobbly outline. Avoid: realistic anatomy, detailed fur, creepy faces.
```

**Midjourney full prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, fuzzy glowing gradient critter with wobbly outline --ar 1:1 --no realistic anatomy, detailed fur, creepy faces
```

#### 04.10 — Variation 10

**Weave-ready prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, tiny creature made of soft airbrush spray and minimal features. Avoid: realistic anatomy, detailed fur, creepy faces.
```

**Midjourney full prompt**

```
fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, tiny creature made of soft airbrush spray and minimal features --ar 1:1 --no realistic anatomy, detailed fur, creepy faces
```

---

## 05 — Psychedelic Optics

*Reality bending visuals.*

**Keywords:** Psychedelic, Vibrant, Energetic, Distorted, Y2K

**Mood:** Intense, euphoric, rebellious

### Master prompt

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic
```

**Negative guidance:** clean vector shapes, polished gloss

**Default aspect ratios:** --ar 2:3, --ar 4:5

### Variations

#### 05.01 — Variation 01

**Weave-ready prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, acid green and hot pink spray-paint haze, grainy glow. Avoid: clean vector shapes, polished gloss.
```

**Midjourney full prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, acid green and hot pink spray-paint haze, grainy glow --ar 4:5 --no clean vector shapes, polished gloss
```

#### 05.02 — Variation 02

**Weave-ready prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, electric blue neon blur with raw noise texture. Avoid: clean vector shapes, polished gloss.
```

**Midjourney full prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, electric blue neon blur with raw noise texture --ar 3:4 --no clean vector shapes, polished gloss
```

#### 05.03 — Variation 03

**Weave-ready prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, chaotic neon cloud explosion, harsh gradients. Avoid: clean vector shapes, polished gloss.
```

**Midjourney full prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, chaotic neon cloud explosion, harsh gradients --ar 2:3 --no clean vector shapes, polished gloss
```

#### 05.04 — Variation 04

**Weave-ready prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, gritty high-energy poster blur, toxic color palette. Avoid: clean vector shapes, polished gloss.
```

**Midjourney full prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, gritty high-energy poster blur, toxic color palette --ar 4:5 --no clean vector shapes, polished gloss
```

#### 05.05 — Variation 05

**Weave-ready prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, grain-sprayed neon mist, raw abstract intensity. Avoid: clean vector shapes, polished gloss.
```

**Midjourney full prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, grain-sprayed neon mist, raw abstract intensity --ar 3:4 --no clean vector shapes, polished gloss
```

#### 05.06 — Variation 06

**Weave-ready prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, acid-wash fog with speckled airbrush edges. Avoid: clean vector shapes, polished gloss.
```

**Midjourney full prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, acid-wash fog with speckled airbrush edges --ar 4:5 --no clean vector shapes, polished gloss
```

#### 05.07 — Variation 07

**Weave-ready prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, neon aerosol blur with ambient haze. Avoid: clean vector shapes, polished gloss.
```

**Midjourney full prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, neon aerosol blur with ambient haze --ar 2:3 --no clean vector shapes, polished gloss
```

#### 05.08 — Variation 08

**Weave-ready prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, grainy vapor blur with punk neon colors. Avoid: clean vector shapes, polished gloss.
```

**Midjourney full prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, grainy vapor blur with punk neon colors --ar 4:5 --no clean vector shapes, polished gloss
```

#### 05.09 — Variation 09

**Weave-ready prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, saturated toxic glow cloud, abstract poster style. Avoid: clean vector shapes, polished gloss.
```

**Midjourney full prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, saturated toxic glow cloud, abstract poster style --ar 3:4 --no clean vector shapes, polished gloss
```

#### 05.10 — Variation 10

**Weave-ready prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, trippy airbrush neon spray in chaotic tones. Avoid: clean vector shapes, polished gloss.
```

**Midjourney full prompt**

```
acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, trippy airbrush neon spray in chaotic tones --ar 4:5 --no clean vector shapes, polished gloss
```

---

## 06 — Ethereal Botanics

*Nature through frosted glass.*

**Keywords:** Botanical, Romantic, Soft-focus, Dreamy, Organic

**Mood:** Serene, romantic, escapist

### Master prompt

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura
```

**Negative guidance:** sharp realism, botanical clarity

**Default aspect ratios:** --ar 4:5

### Variations

#### 06.01 — Variation 01

**Weave-ready prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, ghostlike pastel flower dissolving into mist. Avoid: sharp realism, botanical clarity.
```

**Midjourney full prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, ghostlike pastel flower dissolving into mist --ar 4:5 --no sharp realism, botanical clarity
```

#### 06.02 — Variation 02

**Weave-ready prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, dreamy rose bloom fading into soft gradient haze. Avoid: sharp realism, botanical clarity.
```

**Midjourney full prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, dreamy rose bloom fading into soft gradient haze --ar 3:4 --no sharp realism, botanical clarity
```

#### 06.03 — Variation 03

**Weave-ready prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, floating orchid aura with grainy edges. Avoid: sharp realism, botanical clarity.
```

**Midjourney full prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, floating orchid aura with grainy edges --ar 4:5 --no sharp realism, botanical clarity
```

#### 06.04 — Variation 04

**Weave-ready prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, neon floral glow cloud, diffused petals. Avoid: sharp realism, botanical clarity.
```

**Midjourney full prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, neon floral glow cloud, diffused petals --ar 1:1 --no sharp realism, botanical clarity
```

#### 06.05 — Variation 05

**Weave-ready prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, soft watercolor floral haze with ethereal glow. Avoid: sharp realism, botanical clarity.
```

**Midjourney full prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, soft watercolor floral haze with ethereal glow --ar 4:5 --no sharp realism, botanical clarity
```

#### 06.06 — Variation 06

**Weave-ready prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, elegant floral silhouette dissolving into gradients. Avoid: sharp realism, botanical clarity.
```

**Midjourney full prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, elegant floral silhouette dissolving into gradients --ar 3:4 --no sharp realism, botanical clarity
```

#### 06.07 — Variation 07

**Weave-ready prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, dream-mist bouquet in pastel fog. Avoid: sharp realism, botanical clarity.
```

**Midjourney full prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, dream-mist bouquet in pastel fog --ar 4:5 --no sharp realism, botanical clarity
```

#### 06.08 — Variation 08

**Weave-ready prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, petal shapes melting into atmospheric color. Avoid: sharp realism, botanical clarity.
```

**Midjourney full prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, petal shapes melting into atmospheric color --ar 1:1 --no sharp realism, botanical clarity
```

#### 06.09 — Variation 09

**Weave-ready prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, abstract glowing flower cloud, subtle grain. Avoid: sharp realism, botanical clarity.
```

**Midjourney full prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, abstract glowing flower cloud, subtle grain --ar 4:5 --no sharp realism, botanical clarity
```

#### 06.10 — Variation 10

**Weave-ready prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, dissolved bloom with luminous airy softness. Avoid: sharp realism, botanical clarity.
```

**Midjourney full prompt**

```
ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, dissolved bloom with luminous airy softness --ar 3:4 --no sharp realism, botanical clarity
```

---

## 07 — Fragmented Type

*Words as raw material.*

**Keywords:** Layered, Dynamic, Expressive, Chaotic, Bold

**Mood:** Energetic, experimental, bold

### Master prompt

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout
```

**Negative guidance:** perfect kerning, clean minimalism

**Default aspect ratios:** --ar 3:4, --ar 4:5

### Variations

#### 07.01 — Variation 01

**Weave-ready prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, oversized chaotic letter collage, warped type, neon hits. Avoid: perfect kerning, clean minimalism.
```

**Midjourney full prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, oversized chaotic letter collage, warped type, neon hits --ar 3:4 --no perfect kerning, clean minimalism
```

#### 07.02 — Variation 02

**Weave-ready prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, cut-and-paste typography with grain texture. Avoid: perfect kerning, clean minimalism.
```

**Midjourney full prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, cut-and-paste typography with grain texture --ar 4:5 --no perfect kerning, clean minimalism
```

#### 07.03 — Variation 03

**Weave-ready prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, distorted stacked letters with rough halftone noise. Avoid: perfect kerning, clean minimalism.
```

**Midjourney full prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, distorted stacked letters with rough halftone noise --ar 1:1 --no perfect kerning, clean minimalism
```

#### 07.04 — Variation 04

**Weave-ready prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, mixed serif + grotesque chaotic arrangement. Avoid: perfect kerning, clean minimalism.
```

**Midjourney full prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, mixed serif + grotesque chaotic arrangement --ar 3:4 --no perfect kerning, clean minimalism
```

#### 07.05 — Variation 05

**Weave-ready prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, heavy typographic texture with photocopy scrapes. Avoid: perfect kerning, clean minimalism.
```

**Midjourney full prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, heavy typographic texture with photocopy scrapes --ar 4:5 --no perfect kerning, clean minimalism
```

#### 07.06 — Variation 06

**Weave-ready prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, neon layered text in zine-like chaos. Avoid: perfect kerning, clean minimalism.
```

**Midjourney full prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, neon layered text in zine-like chaos --ar 3:4 --no perfect kerning, clean minimalism
```

#### 07.07 — Variation 07

**Weave-ready prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, text-based poster made entirely of distorted glyphs. Avoid: perfect kerning, clean minimalism.
```

**Midjourney full prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, text-based poster made entirely of distorted glyphs --ar 1:1 --no perfect kerning, clean minimalism
```

#### 07.08 — Variation 08

**Weave-ready prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, black and white type mashup with neon splashes. Avoid: perfect kerning, clean minimalism.
```

**Midjourney full prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, black and white type mashup with neon splashes --ar 4:5 --no perfect kerning, clean minimalism
```

#### 07.09 — Variation 09

**Weave-ready prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, explosive letter forms overlapping unpredictably. Avoid: perfect kerning, clean minimalism.
```

**Midjourney full prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, explosive letter forms overlapping unpredictably --ar 3:4 --no perfect kerning, clean minimalism
```

#### 07.10 — Variation 10

**Weave-ready prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, hybrid cutout typography and grainy shapes. Avoid: perfect kerning, clean minimalism.
```

**Midjourney full prompt**

```
chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, hybrid cutout typography and grainy shapes --ar 4:5 --no perfect kerning, clean minimalism
```

---

## 08 — Xerox Punk

*Digital decay and rebellion.*

**Keywords:** Raw, Distressed, Rebellious, 90s, Authentic

**Mood:** Defiant, nostalgic, authentic

### Master prompt

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic
```

**Negative guidance:** clean edges, polished type, corporate design

**Default aspect ratios:** --ar 4:5

### Variations

#### 08.01 — Variation 01

**Weave-ready prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, DIY punk flyer, torn paper and photocopy grain. Avoid: clean edges, polished type, corporate design.
```

**Midjourney full prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, DIY punk flyer, torn paper and photocopy grain --ar 4:5 --no clean edges, polished type, corporate design
```

#### 08.02 — Variation 02

**Weave-ready prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, grunge zine collage with rough scribbles and tape. Avoid: clean edges, polished type, corporate design.
```

**Midjourney full prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, grunge zine collage with rough scribbles and tape --ar 3:4 --no clean edges, polished type, corporate design
```

#### 08.03 — Variation 03

**Weave-ready prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, distressed halftone xerox layout, neon accent. Avoid: clean edges, polished type, corporate design.
```

**Midjourney full prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, distressed halftone xerox layout, neon accent --ar 1:1 --no clean edges, polished type, corporate design
```

#### 08.04 — Variation 04

**Weave-ready prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, gritty type cutouts layered over photocopy noise. Avoid: clean edges, polished type, corporate design.
```

**Midjourney full prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, gritty type cutouts layered over photocopy noise --ar 4:5 --no clean edges, polished type, corporate design
```

#### 08.05 — Variation 05

**Weave-ready prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, spray-painted punk marks on ripped textures. Avoid: clean edges, polished type, corporate design.
```

**Midjourney full prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, spray-painted punk marks on ripped textures --ar 3:4 --no clean edges, polished type, corporate design
```

#### 08.06 — Variation 06

**Weave-ready prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, underground poster aesthetic with chaotic paper scraps. Avoid: clean edges, polished type, corporate design.
```

**Midjourney full prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, underground poster aesthetic with chaotic paper scraps --ar 4:5 --no clean edges, polished type, corporate design
```

#### 08.07 — Variation 07

**Weave-ready prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, ransom-note typography and ink smears. Avoid: clean edges, polished type, corporate design.
```

**Midjourney full prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, ransom-note typography and ink smears --ar 1:1 --no clean edges, polished type, corporate design
```

#### 08.08 — Variation 08

**Weave-ready prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, 90s skate zine vibes, raw contrast. Avoid: clean edges, polished type, corporate design.
```

**Midjourney full prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, 90s skate zine vibes, raw contrast --ar 4:5 --no clean edges, polished type, corporate design
```

#### 08.09 — Variation 09

**Weave-ready prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, rough collage energy with broken graphics. Avoid: clean edges, polished type, corporate design.
```

**Midjourney full prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, rough collage energy with broken graphics --ar 3:4 --no clean edges, polished type, corporate design
```

#### 08.10 — Variation 10

**Weave-ready prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, torn magazine fragments fused with graffiti. Avoid: clean edges, polished type, corporate design.
```

**Midjourney full prompt**

```
grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, torn magazine fragments fused with graffiti --ar 4:5 --no clean edges, polished type, corporate design
```

---

## 09 — Broadcast Signals

*Function as aesthetic.*

**Keywords:** Technical, Precise, Functional, Data-driven, Minimal

**Mood:** Precise, intelligent, efficient

### Master prompt

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism
```

**Negative guidance:** muted colors, minimal layout

**Default aspect ratios:** --ar 16:9

### Variations

#### 09.01 — Variation 01

**Weave-ready prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, 90s broadcast chaos with neon scribbles. Avoid: muted colors, minimal layout.
```

**Midjourney full prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, 90s broadcast chaos with neon scribbles --ar 16:9 --no muted colors, minimal layout
```

#### 09.02 — Variation 02

**Weave-ready prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, cartoon doodles + fake 3D shapes exploding with color. Avoid: muted colors, minimal layout.
```

**Midjourney full prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, cartoon doodles + fake 3D shapes exploding with color --ar 3:2 --no muted colors, minimal layout
```

#### 09.03 — Variation 03

**Weave-ready prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, weird retro UI overlays with motion-style distortion. Avoid: muted colors, minimal layout.
```

**Midjourney full prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, weird retro UI overlays with motion-style distortion --ar 16:9 --no muted colors, minimal layout
```

#### 09.04 — Variation 04

**Weave-ready prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, hyper-neon surreal channel-surf aesthetic. Avoid: muted colors, minimal layout.
```

**Midjourney full prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, hyper-neon surreal channel-surf aesthetic --ar 16:9 --no muted colors, minimal layout
```

#### 09.05 — Variation 05

**Weave-ready prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, glitchy shapes and cartoon icons colliding. Avoid: muted colors, minimal layout.
```

**Midjourney full prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, glitchy shapes and cartoon icons colliding --ar 3:2 --no muted colors, minimal layout
```

#### 09.06 — Variation 06

**Weave-ready prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, electric pop-art with exaggerated movement. Avoid: muted colors, minimal layout.
```

**Midjourney full prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, electric pop-art with exaggerated movement --ar 16:9 --no muted colors, minimal layout
```

#### 09.07 — Variation 07

**Weave-ready prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, early-CG chrome blobs and flat cartoons together. Avoid: muted colors, minimal layout.
```

**Midjourney full prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, early-CG chrome blobs and flat cartoons together --ar 16:9 --no muted colors, minimal layout
```

#### 09.08 — Variation 08

**Weave-ready prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, psychedelic 90s tv-bumper vibes. Avoid: muted colors, minimal layout.
```

**Midjourney full prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, psychedelic 90s tv-bumper vibes --ar 3:2 --no muted colors, minimal layout
```

#### 09.09 — Variation 09

**Weave-ready prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, chaotic colorful doodles layered over motion blur. Avoid: muted colors, minimal layout.
```

**Midjourney full prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, chaotic colorful doodles layered over motion blur --ar 16:9 --no muted colors, minimal layout
```

#### 09.10 — Variation 10

**Weave-ready prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, retro futuristic broadcast energy storm. Avoid: muted colors, minimal layout.
```

**Midjourney full prompt**

```
broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, retro futuristic broadcast energy storm --ar 16:9 --no muted colors, minimal layout
```

---

## 10 — Dithering ASCII

*When characters become texture.*

**Keywords:** ASCII, Monochrome, Dithered, Retro, Computational

**Mood:** Gritty, nostalgic, raw

### Master prompt

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition
```

**Negative guidance:** color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering

**Default aspect ratios:** --ar 3:4, --ar 1:1

### Variations

#### 10.01 — Variation 01

**Weave-ready prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, terminal ASCII portrait with dense glyph clusters. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.
```

**Midjourney full prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, terminal ASCII portrait with dense glyph clusters --ar 3:4 --no color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering
```

#### 10.02 — Variation 02

**Weave-ready prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, dot-matrix halftone landscape, character-based shading. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.
```

**Midjourney full prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, dot-matrix halftone landscape, character-based shading --ar 4:5 --no color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering
```

#### 10.03 — Variation 03

**Weave-ready prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, monochrome dither poster with blocky bitmap forms. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.
```

**Midjourney full prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, monochrome dither poster with blocky bitmap forms --ar 1:1 --no color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering
```

#### 10.04 — Variation 04

**Weave-ready prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, retro CRT ASCII still life, layered noise texture. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.
```

**Midjourney full prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, retro CRT ASCII still life, layered noise texture --ar 3:4 --no color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering
```

#### 10.05 — Variation 05

**Weave-ready prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, lo-fi computational portrait, screenprint tonal breakup. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.
```

**Midjourney full prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, lo-fi computational portrait, screenprint tonal breakup --ar 4:5 --no color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering
```

#### 10.06 — Variation 06

**Weave-ready prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, type-as-texture abstract composition, structured glyph noise. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.
```

**Midjourney full prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, type-as-texture abstract composition, structured glyph noise --ar 1:1 --no color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering
```

#### 10.07 — Variation 07

**Weave-ready prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, early computer graphics scene, gritty bitmap detail. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.
```

**Midjourney full prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, early computer graphics scene, gritty bitmap detail --ar 3:4 --no color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering
```

#### 10.08 — Variation 08

**Weave-ready prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, ASCII symbol mosaic with halftone depth gradients. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.
```

**Midjourney full prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, ASCII symbol mosaic with halftone depth gradients --ar 4:5 --no color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering
```

#### 10.09 — Variation 09

**Weave-ready prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, terminal cyber poster, high-contrast dither gradients. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.
```

**Midjourney full prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, terminal cyber poster, high-contrast dither gradients --ar 1:1 --no color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering
```

#### 10.10 — Variation 10

**Weave-ready prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, dot-matrix character shading study, raw digital texture. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.
```

**Midjourney full prompt**

```
ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, dot-matrix character shading study, raw digital texture --ar 3:4 --no color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering
```

---

## All Weave-ready prompts (flat list)

1. naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, crayon notebook doodles, messy childlike shapes, vibrant primaries, uneven coloring outside the lines. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.

2. naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, marker scribbles with emotional looseness, sketchbook aesthetic, naïve proportions. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.

3. naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, kids' scribble animals, expressive wiggly outlines, crayon texture noise. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.

4. naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, simple storytelling scene drawn like a child, paper grain, bright messy strokes. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.

5. naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, naïve faces with uneven eyes and giant smiles, doodle whimsy. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.

6. naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, chaotic notebook scratchings with playful icons, hand-scrawled look. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.

7. naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, simple symbolic shapes drawn in crayon, raw innocence, thick strokes. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.

8. naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, childlike scenery with uneven trees and wobbly sun, messy coloring. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.

9. naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, marker-drawn patterns, repetitive childish motifs, fun irregular rhythm. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.

10. naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm, analog crayon blobs and characters, emotional naïve energy. Avoid: realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures.

11. flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, museum catalog of nostalgic trinkets, clean flat-lay grid, labeled objects. Avoid: messy background, dramatic lighting, depth perspective.

12. flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, index sheet of childhood artifacts, isolated on cream background. Avoid: messy background, dramatic lighting, depth perspective.

13. flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, flat-lay layout of tools and toys, evenly spaced, neat grid. Avoid: messy background, dramatic lighting, depth perspective.

14. flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, object archive aesthetic, numbered labels, monospaced type. Avoid: messy background, dramatic lighting, depth perspective.

15. flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, floating trinket collection, symmetrical arrangement. Avoid: messy background, dramatic lighting, depth perspective.

16. flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, vintage memory-box contents catalogued neatly. Avoid: messy background, dramatic lighting, depth perspective.

17. flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, colorful small items displayed like specimens. Avoid: messy background, dramatic lighting, depth perspective.

18. flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, paper-cutout silhouettes labeled by number. Avoid: messy background, dramatic lighting, depth perspective.

19. flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, flat index of objects with even spacing and crisp isolation. Avoid: messy background, dramatic lighting, depth perspective.

20. flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel, clean archival poster of random artifacts, organized grid. Avoid: messy background, dramatic lighting, depth perspective.

21. grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, grain-sprayed pastel gradients with foggy transitions. Avoid: sharp edges, crisp realism, cluttered layout.

22. grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, sunset-hued gradient blocks as layout dividers. Avoid: sharp edges, crisp realism, cluttered layout.

23. grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, dreamy neon mist with soft grain overlay. Avoid: sharp edges, crisp realism, cluttered layout.

24. grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, abstract editorial gradient compositions, minimal type shapes. Avoid: sharp edges, crisp realism, cluttered layout.

25. grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, hazy warm-to-cool gradient field, tactile grain. Avoid: sharp edges, crisp realism, cluttered layout.

26. grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, soft-focus gradient atmosphere, glowing color washes. Avoid: sharp edges, crisp realism, cluttered layout.

27. grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, fog-like abstract blur with subtle speckles. Avoid: sharp edges, crisp realism, cluttered layout.

28. grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, vibrant electric gradient glow with grain. Avoid: sharp edges, crisp realism, cluttered layout.

29. grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, blend of pastel and neon gradients, diffused edges. Avoid: sharp edges, crisp realism, cluttered layout.

30. grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture, abstract smudged gradient poster with atmospheric haze. Avoid: sharp edges, crisp realism, cluttered layout.

31. fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, cute fuzzy blob with big round eyes, neon gradient puffball. Avoid: realistic anatomy, detailed fur, creepy faces.

32. fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, star-shaped fuzzy pastel creature, tiny smile. Avoid: realistic anatomy, detailed fur, creepy faces.

33. fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, melting airbrush gradient blob character, soft and glowing. Avoid: realistic anatomy, detailed fur, creepy faces.

34. fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, round chibi blob with candy-colored airbrush texture. Avoid: realistic anatomy, detailed fur, creepy faces.

35. fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, amorphous creature floating softly, dreamy fuzzy edges. Avoid: realistic anatomy, detailed fur, creepy faces.

36. fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, psychedelic plush-like blob with subtle eyes. Avoid: realistic anatomy, detailed fur, creepy faces.

37. fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, neon gradient puff creature, playful and uncanny-cute. Avoid: realistic anatomy, detailed fur, creepy faces.

38. fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, creature made of foggy rainbow mist and tiny face. Avoid: realistic anatomy, detailed fur, creepy faces.

39. fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, fuzzy glowing gradient critter with wobbly outline. Avoid: realistic anatomy, detailed fur, creepy faces.

40. fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot, tiny creature made of soft airbrush spray and minimal features. Avoid: realistic anatomy, detailed fur, creepy faces.

41. acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, acid green and hot pink spray-paint haze, grainy glow. Avoid: clean vector shapes, polished gloss.

42. acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, electric blue neon blur with raw noise texture. Avoid: clean vector shapes, polished gloss.

43. acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, chaotic neon cloud explosion, harsh gradients. Avoid: clean vector shapes, polished gloss.

44. acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, gritty high-energy poster blur, toxic color palette. Avoid: clean vector shapes, polished gloss.

45. acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, grain-sprayed neon mist, raw abstract intensity. Avoid: clean vector shapes, polished gloss.

46. acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, acid-wash fog with speckled airbrush edges. Avoid: clean vector shapes, polished gloss.

47. acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, neon aerosol blur with ambient haze. Avoid: clean vector shapes, polished gloss.

48. acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, grainy vapor blur with punk neon colors. Avoid: clean vector shapes, polished gloss.

49. acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, saturated toxic glow cloud, abstract poster style. Avoid: clean vector shapes, polished gloss.

50. acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic, trippy airbrush neon spray in chaotic tones. Avoid: clean vector shapes, polished gloss.

51. ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, ghostlike pastel flower dissolving into mist. Avoid: sharp realism, botanical clarity.

52. ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, dreamy rose bloom fading into soft gradient haze. Avoid: sharp realism, botanical clarity.

53. ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, floating orchid aura with grainy edges. Avoid: sharp realism, botanical clarity.

54. ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, neon floral glow cloud, diffused petals. Avoid: sharp realism, botanical clarity.

55. ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, soft watercolor floral haze with ethereal glow. Avoid: sharp realism, botanical clarity.

56. ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, elegant floral silhouette dissolving into gradients. Avoid: sharp realism, botanical clarity.

57. ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, dream-mist bouquet in pastel fog. Avoid: sharp realism, botanical clarity.

58. ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, petal shapes melting into atmospheric color. Avoid: sharp realism, botanical clarity.

59. ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, abstract glowing flower cloud, subtle grain. Avoid: sharp realism, botanical clarity.

60. ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura, dissolved bloom with luminous airy softness. Avoid: sharp realism, botanical clarity.

61. chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, oversized chaotic letter collage, warped type, neon hits. Avoid: perfect kerning, clean minimalism.

62. chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, cut-and-paste typography with grain texture. Avoid: perfect kerning, clean minimalism.

63. chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, distorted stacked letters with rough halftone noise. Avoid: perfect kerning, clean minimalism.

64. chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, mixed serif + grotesque chaotic arrangement. Avoid: perfect kerning, clean minimalism.

65. chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, heavy typographic texture with photocopy scrapes. Avoid: perfect kerning, clean minimalism.

66. chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, neon layered text in zine-like chaos. Avoid: perfect kerning, clean minimalism.

67. chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, text-based poster made entirely of distorted glyphs. Avoid: perfect kerning, clean minimalism.

68. chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, black and white type mashup with neon splashes. Avoid: perfect kerning, clean minimalism.

69. chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, explosive letter forms overlapping unpredictably. Avoid: perfect kerning, clean minimalism.

70. chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout, hybrid cutout typography and grainy shapes. Avoid: perfect kerning, clean minimalism.

71. grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, DIY punk flyer, torn paper and photocopy grain. Avoid: clean edges, polished type, corporate design.

72. grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, grunge zine collage with rough scribbles and tape. Avoid: clean edges, polished type, corporate design.

73. grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, distressed halftone xerox layout, neon accent. Avoid: clean edges, polished type, corporate design.

74. grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, gritty type cutouts layered over photocopy noise. Avoid: clean edges, polished type, corporate design.

75. grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, spray-painted punk marks on ripped textures. Avoid: clean edges, polished type, corporate design.

76. grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, underground poster aesthetic with chaotic paper scraps. Avoid: clean edges, polished type, corporate design.

77. grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, ransom-note typography and ink smears. Avoid: clean edges, polished type, corporate design.

78. grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, 90s skate zine vibes, raw contrast. Avoid: clean edges, polished type, corporate design.

79. grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, rough collage energy with broken graphics. Avoid: clean edges, polished type, corporate design.

80. grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic, torn magazine fragments fused with graffiti. Avoid: clean edges, polished type, corporate design.

81. broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, 90s broadcast chaos with neon scribbles. Avoid: muted colors, minimal layout.

82. broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, cartoon doodles + fake 3D shapes exploding with color. Avoid: muted colors, minimal layout.

83. broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, weird retro UI overlays with motion-style distortion. Avoid: muted colors, minimal layout.

84. broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, hyper-neon surreal channel-surf aesthetic. Avoid: muted colors, minimal layout.

85. broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, glitchy shapes and cartoon icons colliding. Avoid: muted colors, minimal layout.

86. broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, electric pop-art with exaggerated movement. Avoid: muted colors, minimal layout.

87. broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, early-CG chrome blobs and flat cartoons together. Avoid: muted colors, minimal layout.

88. broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, psychedelic 90s tv-bumper vibes. Avoid: muted colors, minimal layout.

89. broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, chaotic colorful doodles layered over motion blur. Avoid: muted colors, minimal layout.

90. broadcast signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism, retro futuristic broadcast energy storm. Avoid: muted colors, minimal layout.

91. ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, terminal ASCII portrait with dense glyph clusters. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.

92. ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, dot-matrix halftone landscape, character-based shading. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.

93. ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, monochrome dither poster with blocky bitmap forms. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.

94. ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, retro CRT ASCII still life, layered noise texture. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.

95. ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, lo-fi computational portrait, screenprint tonal breakup. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.

96. ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, type-as-texture abstract composition, structured glyph noise. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.

97. ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, early computer graphics scene, gritty bitmap detail. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.

98. ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, ASCII symbol mosaic with halftone depth gradients. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.

99. ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, terminal cyber poster, high-contrast dither gradients. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.

100. ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition, dot-matrix character shading study, raw digital texture. Avoid: color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering.
