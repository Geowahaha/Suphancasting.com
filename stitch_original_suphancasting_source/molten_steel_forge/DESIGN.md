# Design System Document

## 1. Overview & Creative North Star
**The Creative North Star: "The Precision Forge"**

This design system moves away from the "dusty factory" trope and into the realm of high-tech industrial luxury. We are not just showing a foundry; we are showcasing the intersection of extreme heat and digital precision. The aesthetic is "Editorial Industrial"—think high-end architecture magazines meeting heavy machinery. 

To break the "template" look, we employ **Intentional Asymmetry**. Large-scale typography (Bebas Neue) should overlap high-definition photography of molten metal, creating a sense of physical depth. We eschew traditional boxed layouts in favor of **Tonal Layering**, where the UI feels like a series of machined steel plates and glowing glass panels stacked in a dark, atmospheric space.

---

## 2. Colors & Materiality

The palette is rooted in the "Heat and Steel" dichotomy. We use high-contrast primary pops against deep, monochromatic neutrals to simulate the glow of a furnace in a dark workshop.

### Palette Strategy
*   **Primary (The Glow):** Use `primary` (#ffb5a0) and `primary_container` (#ff5625) for high-impact actions. These evoke the vibrant orange-red of molten metal.
*   **Secondary (The Alloy):** `secondary_container` (#2e4e4e) represents the tempered steel-blue of the factory floor. Use this for structural balance.
*   **Neutral (The Void):** `surface` (#131313) and `surface_container_lowest` (#0e0e0e) provide the "Deep Charcoal" base that allows our "molten" colors to vibrate.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Boundaries are created through background shifts. A `surface_container_low` section should sit against a `surface` background to define its edge. Lines are for blueprints, not modern interfaces.

### The "Glass & Gradient" Rule
To achieve a "High-Tech Industrial" feel, floating elements (like navigation bars or overlay cards) must use **Glassmorphism**. 
*   **Surface:** `surface_variant` at 60% opacity.
*   **Effect:** `backdrop-filter: blur(20px)`.
*   **Signature Texture:** Apply a linear gradient from `primary` to `primary_container` (at a 135-degree angle) for primary CTAs to simulate the iridescent sheen of cooling metal.

---

## 3. Typography: Editorial Power

We utilize a high-contrast scale to ensure an authoritative, professional voice.

*   **Display & Headlines (Bebas Neue / SpaceGrotesk):** These are your "Machine Marks." Use `display-lg` (3.5rem) for hero sections. Headlines should be set in All Caps with a slight tracking increase (+2% to +5%) to feel like stamped serial numbers.
*   **Body & Titles (Noto Sans / WorkSans):** These are your "Technical Specs." `body-lg` (1rem) provides the legibility required for industrial documentation.
*   **Hierarchy Note:** Always pair a massive `display-lg` headline with a much smaller, wide-tracked `label-md` uppercase sub-header to create a "Technical Manual" aesthetic.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows feel "web-standard." We use **Tonal Layering** to define the physical hierarchy of the factory floor.

*   **The Layering Principle:** 
    *   **Base:** `surface_dim` (#131313).
    *   **Mid-Ground (Service Cards):** `surface_container_low`.
    *   **Fore-Ground (Active Elements):** `surface_container_highest`.
*   **Ambient Shadows:** If a card must float (e.g., a modal), use an ultra-diffused shadow: `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5)`. The shadow color should never be pure black; it should be a deep tint of our `secondary` blue-grey.
*   **The Ghost Border Fallback:** If accessibility requires a stroke, use `outline_variant` (#5d4038) at **15% opacity**. It should be felt, not seen.

---

## 5. Component Guidelines

### Buttons (The Control Panel)
*   **Primary:** Solid `primary_container` (#ff5625) with `on_primary_container` text. Use `md` (0.375rem) roundedness for a "machined" feel.
*   **Secondary:** Glassmorphic background (semi-transparent `secondary_container`) with a `primary` ghost border (20% opacity).
*   **Interaction:** On hover, the button should "glow"—increase the `primary` drop-shadow spread significantly.

### Service Cards & Product Grids
*   **Layout:** Forbid the use of divider lines. Separate items using `spacing-8` (2.75rem) and subtle background shifts between `surface_container_low` and `surface_container_high`.
*   **Visuals:** Each card should feature a high-quality "Macro" photograph of metal textures. Apply a subtle gradient overlay from bottom to top (Black to Transparent) to ensure text legibility.

### The Interactive Contact Form
*   **Input Fields:** Use `surface_container_highest` as the fill. No bottom border. Instead, use a 2px `primary` vertical accent line on the *left* side of the input that activates only on focus. This mimics industrial safety markings.

### Additional Industrial Components
*   **Technical Spec Tags:** Use `secondary_fixed_dim` with `label-sm` text. These should look like metal asset tags found on heavy equipment.
*   **Process Steppers:** Use thick, 4px lines in `secondary_container` with `primary` circles to represent the "Flow of Metal" through the factory.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme white space. Reference the `spacing-20` (7rem) scale for section gaps to give the industrial photography room to "breathe."
*   **Do** overlap elements. Let a `display-lg` heading bleed over the edge of a high-tech product image.
*   **Do** use "Inky" blacks. Ensure your background is deep and matte (`surface_container_lowest`).

### Don't:
*   **Don't** use 100% opaque borders. They make the site look like a spreadsheet, not a premium factory.
*   **Don't** use standard icons. Use "Technical Drawing" style icons—thin, single-stroke, and precise.
*   **Don't** use bright, saturated blues or greens. Stick to the "Heat" (Orange/Red) and "Steel" (Blue-Grey) palette to maintain the signature visual identity.