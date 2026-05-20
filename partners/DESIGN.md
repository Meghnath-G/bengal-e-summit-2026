# Design System Document: Bengal E-Summit 2026

## 1. Overview & Creative North Star: The Digital Relic
This design system is built upon the "Creative North Star" of **The Digital Relic**. It moves away from the ephemeral nature of modern web design and toward something that feels carved, ancient, and high-prestige. Inspired by the cinematic world of *Kalki 2898 AD*, this system balances the ruggedness of weathered stone with the elegance of a high-end film poster.

We reject the "template" look of flat grids and neon glow. Instead, we utilize intentional asymmetry, heavy cinematic contrast, and layered "depth through tone." Every element should feel like a piece of history preserved in a future-modern frame—tactile, weathered, and undeniably premium.

---

## 2. Colors
Our palette is a study in shadow and metal. We use deep, near-black voids as a canvas for bronze highlights and blood-red accents.

### The Palette (Material Design Tokens)
*   **Background / Surface:** `#10131c` — A deep, ink-black with a slight blue-cold undertone.
*   **Primary (The Bronze):** `#f2c36b` (Text) / `#d4a853` (Container) — Represents the light of a dying sun or carved gold.
*   **On-Surface Variant (Parchment):** `#d2c5b2` — Used for high-readability body text.
*   **Secondary (Blood Red):** `#8b1a1a` — Used sparingly for critical CTAs and high-importance alerts.
*   **Surface Tiers:** Use `surface_container_lowest` (#0b0e17) to `surface_container_highest` (#32343e) to create structural hierarchy.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Separation must be achieved through background shifts. For example, a featured speaker card should sit as a `surface_container_high` block against a `surface_dim` background. If a container needs more presence, use a subtle **Signature Texture** (a noise/film grain overlay) rather than a stroke.

### Glass & Gradient Rule
Floating elements (modals, dropdowns) must use **Glassmorphism**. Use semi-transparent surface colors with a `backdrop-blur` of at least 12px. This creates a "frosted obsidian" effect that integrates the UI into the cinematic background.

---

## 3. Typography
Typography is our primary tool for storytelling. It must feel editorial and authoritative.

*   **Display & Headlines (Cinzel):** Use for all major headers. Cinzel brings a Roman/Sanskrit "carved-in-stone" feel. 
    *   *Scale Example:* `display-lg` (3.5rem) should be tracked out (letter-spacing: 0.1em) to mimic film titling.
*   **Title & Body (Cormorant Garamond):** Used for narratives and long-form text. 
    *   *Editorial Note:* Lean into the *Italic* weights for sub-headers to create a vintage, handwritten manuscript feel. 
*   **Label & Small Text (Noto Serif):** Used for functional UI (buttons, labels). It provides the necessary clarity that ancient serifs sometimes lack at small sizes.

---

## 4. Elevation & Depth: Tonal Layering
In this system, depth is not "light"; depth is "material thickness."

*   **The Layering Principle:** We do not use traditional drop shadows. Instead, we stack the `surface_container` tiers. A `surface_container_lowest` section provides a recessed "pit" feel, while `surface_container_highest` feels like a raised stone plinth.
*   **Ambient Shadows:** If a floating element requires a shadow, it must be an **Ambient Shadow**. Use a large blur (32px-64px) with very low opacity (6%) using the `on_secondary_fixed_variant` color (#8a1a1a) as the shadow tint. This mimics the warm, diffused glow of embers or firelight.
*   **The Ghost Border:** If a boundary is required for accessibility, use a `ghost-border`—a 1px stroke of `outline_variant` at 15% opacity. It should be barely felt, never seen.

---

## 5. Components

### Buttons
*   **Primary:** Background `#d4a853` (Bronze), Text `#412d00`. **Shape:** Strict `0px` radius (Sharp corners). No roundedness.
*   **Secondary:** Ghost style. Transparent background, `ghost-border`, text in `#e8d5b0`.
*   **Interaction:** On hover, use a subtle inner-glow rather than a color change to simulate light hitting a metallic surface.

### Cards & Lists
*   **Rule:** Forbid divider lines. Use `spacing-8` (2.75rem) of vertical white space to separate list items.
*   **Texture:** Apply a subtle `film-grain` SVG filter to card backgrounds to give them a weathered, tactile feel.

### Input Fields
*   **Styling:** Underline-only (2px). Use `primary_container` (#d4a853) for the active state.
*   **Placeholder:** Text in `body-sm` Cormorant Garamond *Italic* to feel like a drafted letter.

### Signature Component: The "Relic Chip"
*   Used for tags or categories. Background `#1d1f29` with a deep blood-red left-border (3px) using `on_secondary_fixed_variant`.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts. Place images off-center and let typography bleed into the margins.
*   **Do** use high-contrast imagery with heavy grain and "crushed blacks."
*   **Do** use "Cinematic Letterboxing"—adding black bars or wide margins to focus the user’s eye.

### Don't:
*   **Don't** use rounded corners (`0px` radius is mandatory for all elements). Rounded corners break the "stone-hewn" aesthetic.
*   **Don't** use pure white (#FFFFFF). Always use `primary_fixed` or `on_tertiary_fixed` for a weathered parchment look.
*   **Don't** use standard "web-blue" for links. Use the `secondary_fixed_dim` (Deep Red) or stay within the Bronze palette.
*   **Don't** use icons that are too "techy." Use minimalist, thick-stroke icons that feel like symbols or hieroglyphs.

---

## 7. Spacing
We use a generous spacing scale to allow the high-prestige typography to breathe. 
*   **Hero Sections:** Use `spacing-24` (8.5rem) for top/bottom padding.
*   **Component Gaps:** Use `spacing-4` (1.4rem) as the base unit. 
*   **Intentional Friction:** Unlike "fast" apps, this system encourages a slower, more deliberate scroll. Use large vertical gaps to force users to appreciate each "frame" of the content.