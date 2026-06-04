# Premium Logistics Platform: Design System Specification

## Overview
This design system defines the visual language and user experience guidelines for the premium logistics platform. Drawing inspiration from modern enterprise software (Linear, Stripe, Vercel), the aesthetic is stark, highly professional, data-driven, and devoid of unnecessary decorative elements (no glassmorphism, no flashy gradients). It is designed to instill absolute trust while delivering a lightning-fast, app-like experience.

---

## 1. Color Palette
The color system is constrained to maximize contrast, readability, and brand authority.

*   **Primary Blue (Trust & Brand):** `#0052CC` — A crisp, corporate blue. Used for primary branding, active states, and links.
*   **Primary Red (Action & Urgency):** `#E53E3E` — A sharp red. Used exclusively for primary Call-to-Action buttons (e.g., "Get a Quote") and critical alerts.
*   **True Black (Structure & Contrast):** `#000000` — Used for primary headings and high-contrast section backgrounds.
*   **True White (Space & Clarity):** `#FFFFFF` — The primary background color.
*   **Neutrals:**
    *   **Text Gray:** `#4B5563` — For secondary body text.
    *   **Border Gray:** `#E5E7EB` — For subtle dividers and card borders.
    *   **Surface Gray:** `#F9FAFB` — For alternate section backgrounds.

## 2. Typography System
Typography is the core of this design system. It must be highly legible and structured.

*   **Base Size:** 16px (1rem).
*   **Scale:** Modular scale (1.250).
    *   `H1`: 3rem (48px) - Hero headlines.
    *   `H2`: 2.25rem (36px) - Section headlines.
    *   `H3`: 1.5rem (24px) - Card titles.
    *   `H4`: 1.25rem (20px) - Small titles.
    *   `Body`: 1rem (16px).
    *   `Small`: 0.875rem (14px) - Labels and metadata.
*   **Line Height:** `1.5` for body text, `1.1` to `1.2` for headings.
*   **Letter Spacing:** Tighter tracking on headings (`-0.02em`), normal tracking on body text.

## 3. Font Pairing
*   **Primary (UI & Headings):** *Inter*, *Geist*, or *Roboto*. A single sans-serif family approach ensures a cohesive, Stripe-like modern feel.
*   **Monospace (Data & Tracking):** *JetBrains Mono* or *Geist Mono*. Used specifically for tracking IDs, timestamps, and tabular data to reinforce a precise, engineering-driven aesthetic.

## 4. Layout Grid
*   **Desktop:** 12-column grid. 24px gutters.
*   **Tablet:** 8-column grid. 24px gutters.
*   **Mobile:** 4-column grid. 16px gutters.

## 5. Container Widths
*   **Max Content Width:** `1216px`. Constraining the width prevents the UI from becoming unreadable on ultra-wide monitors (Vercel-style).
*   **Full Width:** Used only for background color bands or full-bleed imagery, while content remains constrained.

## 6. Responsive Breakpoints
*   **Mobile:** `< 768px`
*   **Tablet:** `768px - 1024px`
*   **Desktop:** `1024px - 1440px`
*   **Large Desktop:** `> 1440px`

## 7. Section Spacing System
Follow a strict 8pt grid system.
*   **Macro Spacing (Between Sections):** `96px` (Desktop), `64px` (Tablet), `48px` (Mobile).
*   **Micro Spacing (Between Elements):** `8px`, `16px`, `24px`, `32px`.

## 8. Border Radius System
Avoid overly rounded, "bubbly" shapes. The brand is sharp and enterprise-grade.
*   **Interactive Elements (Buttons, Inputs):** `4px` (Sharp, structured).
*   **Containers (Cards, Modals):** `8px` maximum.

## 9. Shadow System
Avoid muddy, heavy drop shadows. Shadows should simulate realistic, subtle depth.
*   **Level 1 (Cards, slight lift):** `0 1px 3px rgba(0,0,0,0.05)`
*   **Level 2 (Dropdowns, Floating Nav):** `0 4px 6px -1px rgba(0,0,0,0.05)`
*   **Level 3 (Modals):** `0 20px 25px -5px rgba(0,0,0,0.1)`

## 10. Button Design System
*   **Primary CTA:** Primary Red background, White text. No border.
*   **Standard Primary:** True Black background, White text. No border.
*   **Secondary:** White background, 1px solid Border Gray, Black text.
*   **Ghost:** Transparent background, Black text. Subtle Surface Gray background on hover.
*   **Padding:** `12px` top/bottom, `24px` left/right. Font weight: Medium.

## 11. Card Design System
*   **Background:** True White.
*   **Border:** 1px solid Border Gray.
*   **Shadow:** None by default.
*   **Hover State (Desktop):** Border color darkens slightly, or a Level 1 shadow appears. No scaling/lifting animations.

## 12. Form Design System
*   **Inputs:** White background, 1px solid Border Gray, 4px radius.
*   **Labels:** Small (14px), medium font weight, positioned above the input.
*   **Focus State:** 1px solid Primary Blue, accompanied by a subtle 2px Primary Blue focus ring (20% opacity).
*   **Error State:** 1px solid Primary Red, Red error text below input.

## 13. Navbar Design
*   **Aesthetic:** Stark, sticky, solid White background. 1px solid Border Gray bottom border. No glassmorphism.
*   **Layout:** Logo on the far left, links centered, CTAs (Track, Quote) on the far right.
*   **States:** Link text color changes to Primary Blue on hover.

## 14. Footer Design
*   **Aesthetic:** True Black (`#000000`) background with True White text (subdued to 70% opacity for links).
*   **Layout:** 4-column structured grid (Company, Services, Resources, Legal).
*   **Bottom Bar:** Copyright and social icons separated by a 1px `#333333` border.

## 15. Mobile Bottom Navigation
*   **App-like UX:** A fixed bottom navigation bar on mobile devices.
*   **Items:** Home, Track, Quote, Contact.
*   **Visuals:** Solid White background, 1px solid Border Gray top border. Active state highlighted in Primary Blue.

## 16. Hero Section Design
*   **Aesthetic:** Typography-driven, high contrast.
*   **Layout:** Massive H1 typography, tightly leaded.
*   **Functionality:** Embed the "Track Shipment" input directly into the hero section above the fold.
*   **Imagery:** Do not use abstract visualizations. The hero must build trust immediately. Use premium, realistic photography including:
    *   Premium truck imagery
    *   Modern warehouse imagery
    *   Highway transportation imagery
    *   Container logistics imagery

## 17. Services Section Design
*   **Layout:** 3-column or 4-column rigid grid.
*   **Card Design:** Comprehensive. Every service card must include:
    *   High-quality Image
    *   Linear Icon
    *   Service Title (H3)
    *   Description (Two lines)
    *   Clear CTA button/link
    *   *Note: Do not use icon-only service cards.*

## 18. Industries Section Design
*   **Layout:** Bento-box grid or a vertical tabbed interface.
*   **Imagery:** High-quality black-and-white photography of commercial sectors (manufacturing, pharma) that regains subtle color on hover.

## 19. Tracking Page Design
*   **Aesthetic:** Data-heavy, precise, engineering-focused.
*   **UI:** Vertical timeline connecting status nodes.
*   **Nodes:** 
    *   Completed: Solid Blue circle.
    *   Current: Pulsing Blue ring.
    *   Future: Outlined Gray circle.
*   **Typography:** Monospace font for tracking IDs and timestamps.

## 20. Branch Locator Design
*   **Layout:** Two-pane interface (Desktop).
    *   Left pane: Scrollable list of branches (White background).
    *   Right pane: Embedded map.
*   **Map Styling:** Desaturated, grayscale Google Maps JSON styling with Primary Blue markers to maintain the premium brand aesthetic.

## 21. Gallery Design
*   **Layout:** Responsive and dynamic:
    *   **Desktop:** Pinterest-inspired mixed grid for visual interest.
    *   **Tablet:** Balanced masonry layout.
    *   **Mobile:** Clean 2-column grid.
*   **Interaction:** Image hover reveals a solid black overlay (50% opacity) with the caption. Clicking opens a stark black full-screen lightbox.

## 22. Blog Design
*   **Reading Experience:** Single column, max-width `680px`. High contrast typography.
*   **Index Page:** Clean grid of cards. Large typography titles, minimal metadata. No cluttered tags or excerpt text.

## 23. FAQ Design
*   **Layout:** Single column accordion.
*   **Visuals:** 1px solid Border Gray separators. Question text is True Black. The expand icon is a crisp `+` that rotates 45 degrees to an `x` when open.

## 24. CTA Section Design
*   **Style:** High-contrast block. True Black background.
*   **Content:** Large compelling headline. Dual buttons: Primary Red ("Get a Quote") and Ghost/White ("Contact Sales").

## 25. Image Usage Guidelines
*   **Rule:** Zero cheesy stock photography. No forced smiles or staged handshakes.
*   **Prioritize:** Real logistics imagery, real warehouses, real transportation, and real operational photos.
*   **Avoid:** Abstract blobs, generic SaaS illustrations, and decorative AI artwork.
*   **Treatment:** Maintain high contrast, slightly desaturated, cool (blue) tones.

## 26. Icon Usage Guidelines
*   **Style:** Linear, monoline (e.g., Lucide or Feather).
*   **Weight:** `1.5px` or `2px` stroke width. Must be 100% consistent across the entire platform.
*   **Size:** `24px` standard. `16px` for inline elements.

## 27. Animation Guidelines
*   **Philosophy:** Purposeful, not decorative. Zero bouncy or flashy animations.
*   **Timing:** Fast and snappy. `150ms` to `200ms` maximum.
*   **Easing:** `ease-out` (fast start, slow end).
*   **Triggers:** Hover states (color fades), subtle opacity fade-ins on page load, accordion expands.

## 28. Desktop UX Guidelines
*   **Density:** Provide ample whitespace macro-level, but keep data (tracking timelines, tables) dense and scannable at the micro-level.
*   **Keyboard:** Ensure all critical paths (Get Quote, Track, Navigation) are fully keyboard accessible with visible focus states.

## 29. Mobile UX Guidelines
*   **Touch Targets:** Minimum `44x44px` for all clickable elements (buttons, links, form inputs).
*   **Gestures:** Support native swipe gestures (e.g., swiping back, swiping through gallery images).
*   **Forms:** Trigger native mobile keyboards correctly (e.g., `type="tel"` for phone inputs, `type="email"`).

## 30. Accessibility Guidelines
*   **Contrast:** Ensure all text passes WCAG AA standards (minimum 4.5:1 ratio).
*   **Focus Rings:** Never hide `:focus` outlines without providing a custom alternative. Use a sharp Primary Blue ring.
*   **Screen Readers:** Enforce proper use of `aria-label` attributes for icon-only buttons (hamburger menu, close modal buttons, social icons).

## 31. Lead Generation System
*   **Global Rule:** Critical lead-generation actions must be persistently visible.
*   **Strategic Placement:** Every page must explicitly expose the following actions (via sticky headers, floating action buttons, or persistent sidebars):
    *   Call Now
    *   WhatsApp
    *   Get Quote
    *   Track Shipment
    *   Request Callback
*   **Request Callback Guidance:** This specific action should be prominently available in strategic locations such as:
    *   Hero section
    *   Contact page
    *   Quote page
    *   Final CTA section

## 32. Trust System
*   **Guidance:** Proactively build credibility through quantifiable data and social proof.
*   **Key Elements to Include:**
    *   Partner Logos (Clients, integrations, certifications)
    *   Coverage Statistics (Cities, pincodes, global reach)
    *   Shipment Statistics (Parcels delivered, tonnage handled)
    *   Customer Statistics (Happy clients, enterprise partners)
    *   Experience Statistics (Years in operation, team size)
