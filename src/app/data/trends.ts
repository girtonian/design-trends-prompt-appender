import { trendImageById } from "./trendImages";

export interface Trend {
  id: number;
  title: string;
  tagline: string;
  description: string;
  keywords: string[];
  mood: string;
  applications: string[];
  imageUrl: string;
  color: string;
  midjourneyPrompts: {
    masterPrompt: string;
    aspectRatios: string[];
    negativePrompts: string;
    variations: string[];
  };
}

export const trends: Trend[] = [
  {
    id: 1,
    title: "Imperfect Minimalism",
    tagline: "Imperfect on purpose.",
    description: "A celebration of hand-drawn aesthetics, childlike wonder, and deliberately rough edges. This trend embraces imperfection as a form of authenticity, rejecting the polish of digital perfection in favor of human touch and playful experimentation.",
    keywords: ["Hand-drawn", "Playful", "Imperfect", "Authentic", "Whimsical"],
    mood: "Joyful, approachable, human",
    applications: ["Brand identity for playful startups", "Editorial illustration", "Packaging design", "Social media content"],
    imageUrl: trendImageById[1],
    color: "rgb(255, 237, 213)",
    midjourneyPrompts: {
      masterPrompt: "naïve childlike illustration, hand-drawn doodles, shaky marker outlines, uneven crayon strokes, imperfect proportions, playful scribbles, simple shapes, bright expressive colors, analog paper texture, emotionally raw charm",
      aspectRatios: ["--ar 1:1", "--ar 3:4"],
      negativePrompts: "realism, vector clean lines, glossy shading, perfect symmetry, photorealistic textures",
      variations: [
        "crayon notebook doodles, messy childlike shapes, vibrant primaries, uneven coloring outside the lines --ar 1:1 --style raw",
        "marker scribbles with emotional looseness, sketchbook aesthetic, naïve proportions --ar 4:5",
        "kids' scribble animals, expressive wiggly outlines, crayon texture noise --ar 1:1",
        "simple storytelling scene drawn like a child, paper grain, bright messy strokes --ar 3:4",
        "naïve faces with uneven eyes and giant smiles, doodle whimsy --ar 1:1",
        "chaotic notebook scratchings with playful icons, hand-scrawled look --ar 1:1",
        "simple symbolic shapes drawn in crayon, raw innocence, thick strokes --ar 5:4",
        "childlike scenery with uneven trees and wobbly sun, messy coloring --ar 1:1",
        "marker-drawn patterns, repetitive childish motifs, fun irregular rhythm --ar 3:4",
        "analog crayon blobs and characters, emotional naïve energy --ar 1:1"
      ]
    }
  },
  {
    id: 2,
    title: "Object Nostalgia",
    tagline: "Small treasures, big stories.",
    description: "Inspired by curio cabinets and personal collections, this trend focuses on intricate, jewel-like details and the beauty of small objects. It's about creating visual microcosms that reward close inspection and tell layered stories.",
    keywords: ["Intricate", "Collectible", "Detailed", "Precious", "Miniature"],
    mood: "Curious, intimate, treasured",
    applications: ["E-commerce UI", "Product photography", "Museum exhibits", "Luxury brand experiences"],
    imageUrl: trendImageById[2],
    color: "rgb(230, 221, 235)",
    midjourneyPrompts: {
      masterPrompt: "flat-lay catalog of isolated objects, specimen sheet layout, numbered labels, monospaced typography accents, symmetrical grid, nostalgic items, clean shadowless cutouts, archival feel",
      aspectRatios: ["--ar 4:5"],
      negativePrompts: "messy background, dramatic lighting, depth perspective",
      variations: [
        "museum catalog of nostalgic trinkets, clean flat-lay grid, labeled objects --ar 4:5",
        "index sheet of childhood artifacts, isolated on cream background --ar 3:4",
        "flat-lay layout of tools and toys, evenly spaced, neat grid --ar 4:5",
        "object archive aesthetic, numbered labels, monospaced type --ar 1:1",
        "floating trinket collection, symmetrical arrangement --ar 4:5",
        "vintage memory-box contents catalogued neatly --ar 3:4",
        "colorful small items displayed like specimens --ar 4:5",
        "paper-cutout silhouettes labeled by number --ar 1:1",
        "flat index of objects with even spacing and crisp isolation --ar 4:5",
        "clean archival poster of random artifacts, organized grid --ar 3:4"
      ]
    }
  },
  {
    id: 3,
    title: "Atmospheric Gradient",
    tagline: "Texture meets atmosphere.",
    description: "Soft gradients get a tactile upgrade with noise and grain, creating depth and warmth. This trend brings analog texture to digital surfaces, making interfaces feel more material and less sterile.",
    keywords: ["Textured", "Atmospheric", "Soft", "Analog", "Warm"],
    mood: "Dreamy, tactile, nostalgic",
    applications: ["App backgrounds", "Web design", "Digital art", "Branding materials"],
    imageUrl: trendImageById[3],
    color: "rgb(255, 228, 225)",
    midjourneyPrompts: {
      masterPrompt: "grainy gradient blur fields, soft airbrush haze, dreamy color transitions, misty atmosphere, editorial minimalism, floating shapes, subtle noise texture",
      aspectRatios: ["--ar 3:4", "--ar 16:9"],
      negativePrompts: "sharp edges, crisp realism, cluttered layout",
      variations: [
        "grain-sprayed pastel gradients with foggy transitions --ar 3:4",
        "sunset-hued gradient blocks as layout dividers --ar 4:5",
        "dreamy neon mist with soft grain overlay --ar 1:1",
        "abstract editorial gradient compositions, minimal type shapes --ar 16:9",
        "hazy warm-to-cool gradient field, tactile grain --ar 3:4",
        "soft-focus gradient atmosphere, glowing color washes --ar 4:5",
        "fog-like abstract blur with subtle speckles --ar 1:1",
        "vibrant electric gradient glow with grain --ar 16:9",
        "blend of pastel and neon gradients, diffused edges --ar 3:4",
        "abstract smudged gradient poster with atmospheric haze --ar 4:5"
      ]
    }
  },
  {
    id: 4,
    title: "Plush Surrealism",
    tagline: "Soft friends from the edges of imagination.",
    description: "Organic, blob-like characters that exist in the liminal space between recognizable and abstract. These friendly forms bring comfort and curiosity to digital spaces, serving as gentle mascots for brands embracing softness.",
    keywords: ["Organic", "Soft", "Abstract", "Friendly", "Shapeshifting"],
    mood: "Comforting, playful, mysterious",
    applications: ["Brand mascots", "Loading animations", "Illustrations", "NFT projects"],
    imageUrl: trendImageById[4],
    color: "rgb(224, 242, 241)",
    midjourneyPrompts: {
      masterPrompt: "fuzzy gradient blob creature, amorphous shape, airbrushed edges, neon candy gradients, chibi face, big round eyes, adorable surreal mascot",
      aspectRatios: ["--ar 1:1"],
      negativePrompts: "realistic anatomy, detailed fur, creepy faces",
      variations: [
        "cute fuzzy blob with big round eyes, neon gradient puffball --ar 1:1",
        "star-shaped fuzzy pastel creature, tiny smile --ar 1:1",
        "melting airbrush gradient blob character, soft and glowing --ar 1:1",
        "round chibi blob with candy-colored airbrush texture --ar 1:1",
        "amorphous creature floating softly, dreamy fuzzy edges --ar 1:1",
        "psychedelic plush-like blob with subtle eyes --ar 1:1",
        "neon gradient puff creature, playful and uncanny-cute --ar 1:1",
        "creature made of foggy rainbow mist and tiny face --ar 1:1",
        "fuzzy glowing gradient critter with wobbly outline --ar 1:1",
        "tiny creature made of soft airbrush spray and minimal features --ar 1:1"
      ]
    }
  },
  {
    id: 5,
    title: "Psychedelic Optics",
    tagline: "Reality bending visuals.",
    description: "Vibrant, psychedelic color combinations with chromatic aberration and motion blur effects. This trend channels Y2K energy mixed with rave culture, creating eye-catching, high-energy visuals that demand attention.",
    keywords: ["Psychedelic", "Vibrant", "Energetic", "Distorted", "Y2K"],
    mood: "Intense, euphoric, rebellious",
    applications: ["Music visuals", "Festival branding", "Fashion campaigns", "Experimental interfaces"],
    imageUrl: trendImageById[5],
    color: "rgb(255, 220, 255)",
    midjourneyPrompts: {
      masterPrompt: "acid-blur neon gradients, spray-paint plumes, grain-heavy edges, chaotic dreamlike haze, high-saturation glow, energetic poster aesthetic",
      aspectRatios: ["--ar 2:3", "--ar 4:5"],
      negativePrompts: "clean vector shapes, polished gloss",
      variations: [
        "acid green and hot pink spray-paint haze, grainy glow --ar 4:5",
        "electric blue neon blur with raw noise texture --ar 3:4",
        "chaotic neon cloud explosion, harsh gradients --ar 2:3",
        "gritty high-energy poster blur, toxic color palette --ar 4:5",
        "grain-sprayed neon mist, raw abstract intensity --ar 3:4",
        "acid-wash fog with speckled airbrush edges --ar 4:5",
        "neon aerosol blur with ambient haze --ar 2:3",
        "grainy vapor blur with punk neon colors --ar 4:5",
        "saturated toxic glow cloud, abstract poster style --ar 3:4",
        "trippy airbrush neon spray in chaotic tones --ar 4:5"
      ]
    }
  },
  {
    id: 6,
    title: "Ethereal Botanics",
    tagline: "Nature through frosted glass.",
    description: "Botanical imagery softened to the edge of abstraction, creating romantic and atmospheric visuals. This trend taps into cottagecore and escapism while maintaining a contemporary, digital-native aesthetic.",
    keywords: ["Botanical", "Romantic", "Soft-focus", "Dreamy", "Organic"],
    mood: "Serene, romantic, escapist",
    applications: ["Wellness brands", "Beauty products", "Editorial design", "Wedding design"],
    imageUrl: trendImageById[6],
    color: "rgb(243, 232, 255)",
    midjourneyPrompts: {
      masterPrompt: "ethereal soft-focus florals, dreamy pastel gradients, glowing petals, atmospheric haze, dissolving shapes, elegant minimalist floral aura",
      aspectRatios: ["--ar 4:5"],
      negativePrompts: "sharp realism, botanical clarity",
      variations: [
        "ghostlike pastel flower dissolving into mist --ar 4:5",
        "dreamy rose bloom fading into soft gradient haze --ar 3:4",
        "floating orchid aura with grainy edges --ar 4:5",
        "neon floral glow cloud, diffused petals --ar 1:1",
        "soft watercolor floral haze with ethereal glow --ar 4:5",
        "elegant floral silhouette dissolving into gradients --ar 3:4",
        "dream-mist bouquet in pastel fog --ar 4:5",
        "petal shapes melting into atmospheric color --ar 1:1",
        "abstract glowing flower cloud, subtle grain --ar 4:5",
        "dissolved bloom with luminous airy softness --ar 3:4"
      ]
    }
  },
  {
    id: 7,
    title: "Fragmented Type",
    tagline: "Words as raw material.",
    description: "Typography breaks free from the grid, layering, overlapping, and colliding to create dynamic compositions. This trend treats text as a visual element first, meaning second, embracing chaos and energy.",
    keywords: ["Layered", "Dynamic", "Expressive", "Chaotic", "Bold"],
    mood: "Energetic, experimental, bold",
    applications: ["Poster design", "Album artwork", "Editorial layouts", "Brand campaigns"],
    imageUrl: trendImageById[7],
    color: "rgb(255, 243, 224)",
    midjourneyPrompts: {
      masterPrompt: "chaotic typographic collage, oversized letters, mixed fonts, stretched & warped text, photocopy grain, neon accents, zine-inspired layout",
      aspectRatios: ["--ar 3:4", "--ar 4:5"],
      negativePrompts: "perfect kerning, clean minimalism",
      variations: [
        "oversized chaotic letter collage, warped type, neon hits --ar 3:4",
        "cut-and-paste typography with grain texture --ar 4:5",
        "distorted stacked letters with rough halftone noise --ar 1:1",
        "mixed serif + grotesque chaotic arrangement --ar 3:4",
        "heavy typographic texture with photocopy scrapes --ar 4:5",
        "neon layered text in zine-like chaos --ar 3:4",
        "text-based poster made entirely of distorted glyphs --ar 1:1",
        "black and white type mashup with neon splashes --ar 4:5",
        "explosive letter forms overlapping unpredictably --ar 3:4",
        "hybrid cutout typography and grainy shapes --ar 4:5"
      ]
    }
  },
  {
    id: 8,
    title: "Xerox Punk",
    tagline: "Digital decay and rebellion.",
    description: "Raw, distressed aesthetics that channel 90s counterculture into contemporary digital design. This trend embraces imperfection, distortion, and anti-corporate sentiment, offering an antidote to the clean minimalism of the 2010s.",
    keywords: ["Raw", "Distressed", "Rebellious", "90s", "Authentic"],
    mood: "Defiant, nostalgic, authentic",
    applications: ["Music industry", "Streetwear brands", "Alternative media", "Youth culture"],
    imageUrl: trendImageById[8],
    color: "rgb(220, 220, 220)",
    midjourneyPrompts: {
      masterPrompt: "grunge zine collage, xerox textures, torn edges, graffiti scribbles, ransom-note letters, gritty halftone patterns, 90s underground aesthetic",
      aspectRatios: ["--ar 4:5"],
      negativePrompts: "clean edges, polished type, corporate design",
      variations: [
        "DIY punk flyer, torn paper and photocopy grain --ar 4:5",
        "grunge zine collage with rough scribbles and tape --ar 3:4",
        "distressed halftone xerox layout, neon accent --ar 1:1",
        "gritty type cutouts layered over photocopy noise --ar 4:5",
        "spray-painted punk marks on ripped textures --ar 3:4",
        "underground poster aesthetic with chaotic paper scraps --ar 4:5",
        "ransom-note typography and ink smears --ar 1:1",
        "90s skate zine vibes, raw contrast --ar 4:5",
        "rough collage energy with broken graphics --ar 3:4",
        "torn magazine fragments fused with graffiti --ar 4:5"
      ]
    }
  },
  {
    id: 9,
    title: "Broadcast Signals",
    tagline: "Function as aesthetic.",
    description: "Utilitarian visuals inspired by technical diagrams, data visualization, and system interfaces. This trend celebrates clarity and information density, turning functional design into a sophisticated aesthetic language.",
    keywords: ["Technical", "Precise", "Functional", "Data-driven", "Minimal"],
    mood: "Precise, intelligent, efficient",
    applications: ["Tech brands", "Data dashboards", "Annual reports", "Architecture"],
    imageUrl: trendImageById[9],
    color: "rgb(230, 245, 255)",
    midjourneyPrompts: {
      masterPrompt: "MTV-style signal graphics, hyper-saturated neon, cartoon doodles, clunky early 3D blobs, fake UI overlays, chaotic retro motion energy, pop culture surrealism",
      aspectRatios: ["--ar 16:9"],
      negativePrompts: "muted colors, minimal layout",
      variations: [
        "90s broadcast chaos with neon scribbles --ar 16:9",
        "cartoon doodles + fake 3D shapes exploding with color --ar 3:2",
        "weird retro UI overlays with motion-style distortion --ar 16:9",
        "hyper-neon surreal channel-surf aesthetic --ar 16:9",
        "glitchy shapes and cartoon icons colliding --ar 3:2",
        "electric pop-art with exaggerated movement --ar 16:9",
        "early-CG chrome blobs and flat cartoons together --ar 16:9",
        "psychedelic 90s tv-bumper vibes --ar 3:2",
        "chaotic colorful doodles layered over motion blur --ar 16:9",
        "retro futuristic broadcast energy storm --ar 16:9"
      ]
    }
  },
  /*
  {
    id: 10,
    title: "Medieval Futurism",
    tagline: "When castles meet circuits.",
    description: "A fascinating collision of medieval craftsmanship aesthetics with sci-fi futurism. This trend imagines a future that looks backward, blending illuminated manuscript details with holographic interfaces and creating a uniquely timeless feel.",
    keywords: ["Hybrid", "Ornate", "Futuristic", "Historical", "Paradoxical"],
    mood: "Epic, mysterious, timeless",
    applications: ["Fantasy gaming", "Luxury tech", "Speculative fiction", "High-end branding"],
    imageUrl: trendImageById[10],
    color: "rgb(235, 230, 250)",
    midjourneyPrompts: {
      masterPrompt: "future-medieval hybrid, blackletter + futuristic sans-serif, illuminated manuscript meets sci-fi circuitry, relic symbols blended with neon tech textures, glitch parchment, symmetrical ceremonial composition",
      aspectRatios: ["--ar 3:4"],
      negativePrompts: "pure medieval realism, soft fantasy",
      variations: [
        "electric rune symbols mixed with blackletter tech calligraphy --ar 3:4",
        "sci-fi illuminated manuscript with neon circuitry --ar 4:5",
        "cyber-gothic heraldry crest, ritual symmetry --ar 3:4",
        "digital relics with glowing rune patterns --ar 1:1",
        "techno-knight insignia with glitch parchment --ar 4:5",
        "sacred futuristic sigil carved in luminous metal --ar 3:4",
        "mythic beast outline enhanced with circuitry --ar 1:1",
        "digital manuscript border with shimmering glyphs --ar 4:5",
        "hybrid medieval-tech crest glowing with AI filigree --ar 3:4",
        "apocalyptic techno-ceremonial emblem --ar 3:4"
      ]
    }
  },
  */
  {
    id: 10,
    title: "Dithering ASCII",
    tagline: "When characters become texture.",
    description: "A lo-fi digital aesthetic where forms are built from ASCII symbols, glyph clusters, and halftone dither patterns. Combines retro terminal art, dot-matrix imaging, and gritty monochrome poster design into high-contrast compositions with raw computational texture.",
    keywords: ["ASCII", "Monochrome", "Dithered", "Retro", "Computational"],
    mood: "Gritty, nostalgic, raw",
    applications: ["Tech posters", "Editorial illustration", "Album art", "Digital zines"],
    imageUrl: trendImageById[10],
    color: "rgb(220, 220, 220)",
    midjourneyPrompts: {
      masterPrompt: "ASCII dithering art style, monochrome digital image built from dense text characters and halftone pixel shading, retro terminal aesthetics, black-and-white bitmap rendering, visible ASCII symbols and glyph clusters, character-based texture, layered dither patterns for shading and depth, high contrast gritty low-resolution look, screenprint tonal breakup, raw computational texture, early computer graphics feel, retro cyber-visual language, deliberately limited palette, structured noise, crisp composition",
      aspectRatios: ["--ar 3:4", "--ar 1:1"],
      negativePrompts: "color photography, smooth gradients, photorealistic detail, clean vector lines, glossy rendering",
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
        "dot-matrix character shading study, raw digital texture --ar 3:4"
      ]
    }
  }
];