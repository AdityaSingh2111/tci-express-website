# HOMEPAGE COMPONENT GENERATION PLAN

**Project:** Premium Logistics Platform
**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS

This roadmap defines the precise implementation strategy for homepage development to minimize rework, maximize component reuse, and adhere to the finalized specifications.

---

## 1. Build Order

**Phase 1: Design System Translation**
- Implement Tailwind CSS configurations, colors, typography, and spacing tokens.
- Add foundational CSS in `globals.css`.

**Phase 2: Shared Component Library**
- Develop base buttons (`PrimaryButton`, `SecondaryButton`, `CTAButton`).
- Develop `SectionHeader`.
- Develop UI cards (`ServiceCard`, `IndustryCard`, `TestimonialCard`, `StatisticCard`, `FAQItem`, `BlogCard`, `PartnerLogoCard`).

**Phase 3: Core Layout Shell**
- Implement `Navbar` and `Footer`.
- Implement mobile-specific layouts: `MobileBottomNav` and `FloatingWhatsAppButton`.
- Implement `AnnouncementBar`.

**Phase 4: Static & Server Homepage Sections**
- `HeroSection` (Split Layout), `HeroTrustBar`, `EmergencyContactBanner`.
- `SeoContentBlock`, `FinalCta`, `ServiceCitiesSeoBlock`.
- `CoverageAcrossIndia`, `ProcessSection`, `WhyChooseUs`.

**Phase 5: Data-Driven & Interactive Sections**
- `ServicesOverview`, `IndustriesServed`, `PartnerLogos` (Static grid / Swipeable carousel).
- `StatisticsSection` (with optional count-up logic).
- `GalleryPreview` (Lightbox), `Testimonials` (Carousel), `FaqPreview` (Accordion).
- `BlogPreview`.

**Phase 6: Complex Form Widgets**
- `QuickQuoteWidget` (Dropdowns, input validation).
- `ShipmentTrackingPreview`.

**Phase 7: Final Assembly & Polish**
- Integrate all sections sequentially into `app/page.tsx`.
- Refine hover states, scroll animations, responsive breakpoints, and perform a11y/SEO audits.

---

## 2. Shared Component Strategy

Build these components first in `src/components/shared/` to ensure maximum reusability.

* **`SectionHeader`**: Standardized `<h2>` heading and optional paragraph subtitle. Props for alignment (left/center) and theme (light/dark text).
* **`PrimaryButton` / `SecondaryButton` / `CTAButton`**: Encapsulate Next.js `<Link>` or `<button>`. Handle consistent hover states, disabled states, and optional leading/trailing icons.
* **`ServiceCard`**: Displays 16:9 thumbnail, icon, title, short description. Interactive hover scale/shadow.
* **`IndustryCard`**: Handles the grayscale-to-color transition on hover.
* **`TestimonialCard`**: Encapsulates avatar styling, star rating SVG generation, and blockquote styling.
* **`StatisticCard`**: Receives `value`, `label`, `icon`, and an optional `animate` prop to trigger count-up on mount.
* **`FAQItem`**: Single accordion row. Requires `"use client"` for toggle state (`isOpen`).
* **`BlogCard`**: Standardized article preview with image, date, and "Read More" link.
* **`PartnerLogoCard`**: Standardized container for `public/logos/*.svg`, maintaining aspect ratio and centering.

---

## 3. Layout Strategy

* **`AnnouncementBar`**: Absolute/relative top bar. If it requires a "dismiss" feature saved to `localStorage`, mark as `"use client"`.
* **`Navbar`**: `"use client"` required to handle scroll position (transparent to solid background) and mobile hamburger menu toggle state.
* **`Footer`**: Pure Server Component. Fetches from `navigation.ts` and renders grid of links.
* **`MobileBottomNav`**: Fixed `bottom-0`. Visible only on `sm` breakpoints. Handles quick action routing.
* **`FloatingWhatsAppButton`**: Fixed `bottom-4 right-4`. Highest z-index. Connects to `company.ts` WhatsApp number.

---

## 4. Homepage Component Strategy

Components to be placed in `src/components/home/`, `src/components/forms/`, `src/components/tracking/`, and `src/components/seo/`.

* **`HeroSection`**: Pure Server Component. Split Layout (Left: Content, Right: Image). Stacked on mobile.
* **`HeroTrustBar`**: 4-column desktop grid, 2x2 mobile grid of icons and stats.
* **`EmergencyContactBanner`**: Full-width, high-contrast banner bridging Hero and Services.
* **`QuickQuoteWidget`**: `"use client"`. Horizontal on desktop, stacked on mobile. Z-index overlapping sections.
* **`ServicesOverview`**: Server component looping over `services.ts` to render `ServiceCard`s.
* **`WhyChooseUs`**: Grid of features with icons.
* **`StatisticsSection`**: Renders `StatisticCard`s. Can be wrapped in a Client Component if `animate={true}` is utilized for scroll-triggered count-up.
* **`ProcessSection`**: Timelines. Horizontal desktop, vertical mobile.
* **`CoverageAcrossIndia`**: Complex SVG map integration alongside text nodes.
* **`ServiceCitiesSeoBlock`**: Dense, multi-column link grid mapped from `cities.ts`.
* **`ShipmentTrackingPreview`**: `"use client"`. Input field routing to `/track/[id]`.
* **`IndustriesServed`**: Grid mapping to `IndustryCard`s.
* **`PartnerLogos`**: Static responsive logo grid (Desktop) / Horizontal swipeable logo carousel (Mobile).
* **`GalleryPreview`**: `"use client"`. Renders grid. On click, opens full-screen stark black lightbox.
* **`Testimonials`**: `"use client"`. Swiper/carousel wrapper containing `TestimonialCard`s.
* **`SeoContentBlock`**: Server Component mapping rich text.
* **`FaqPreview`**: Maps over `faq.ts` to render `FAQItem`s.
* **`BlogPreview`**: Grid of `BlogCard`s.
* **`FinalCta`**: High contrast section with `PrimaryButton` and `SecondaryButton`.

---

## 5. Dependency Map

| Homepage Component | Dependent Shared Components |
| :--- | :--- |
| `ServicesOverview` | `SectionHeader`, `ServiceCard` |
| `WhyChooseUs` | `SectionHeader` |
| `StatisticsSection`| `StatisticCard` |
| `IndustriesServed` | `SectionHeader`, `IndustryCard` |
| `PartnerLogos` | `SectionHeader`, `PartnerLogoCard` |
| `Testimonials` | `SectionHeader`, `TestimonialCard` |
| `FaqPreview` | `SectionHeader`, `FAQItem` |
| `BlogPreview` | `SectionHeader`, `BlogCard` |
| `FinalCta` | `PrimaryButton`, `SecondaryButton` |
| `QuickQuoteWidget` | `PrimaryButton` |

---

## 6. Data Flow Strategy

1. **Server-Side Sourcing**: All Homepage components default to Server Components. They directly import typed data from `src/data/*.ts`.
2. **Prop Drilling minimization**: Data is fetched at the specific section level (e.g., `ServicesOverview` imports from `services.ts`), not at the `page.tsx` root level, to keep components modular.
3. **Data Mapping**:
   * `company.ts` → `HeroSection`, `EmergencyContactBanner`, `FinalCta`, `AnnouncementBar`, `MobileBottomNav`, `FloatingWhatsAppButton`, `Navbar`, `Footer`
   * `stats.ts` → `HeroTrustBar`, `StatisticsSection`
   * `partners.ts` → `PartnerLogos`
   * `services.ts` → `ServicesOverview`, `ProcessSection`, `QuickQuoteWidget`
   * `locations.ts` / `cities.ts` → `CoverageAcrossIndia`, `ServiceCitiesSeoBlock`
   * `faq.ts`, `testimonials.ts`, `blog.ts`, `industries.ts` → Respective sections.

---

## 7. Accessibility Checklist

* [ ] **Semantic Structure**: Wrap sections in `<section>` tags. Ensure `page.tsx` uses `<main>`.
* [ ] **Heading Hierarchy**: Only one `<h1>` in `HeroSection`. `SectionHeader` strictly utilizes `<h2>`. Internal cards use `<h3>`.
* [ ] **Keyboard Navigation**: Ensure `Tab` focuses on `Navbar` links, `QuickQuoteWidget` inputs, all Buttons, and `FAQItem` toggles.
* [ ] **Focus States**: Use Tailwind `focus-visible:ring` for clear focus outlines.
* [ ] **ARIA Roles**:
  * `aria-expanded` on mobile menu and FAQ accordions.
  * `aria-roledescription="carousel"` on mobile Partner Logos and Testimonials.
  * `aria-label` on icon-only buttons (WhatsApp, Hamburger menu).
  * `aria-hidden="true"` on decorative icons and redundant carousel tracks.
* [ ] **Images**: Mandatory `alt` text mapping for every `next/image`.
* [ ] **Contrast**: Verify 4.5:1 WCAG AA compliance across the `EmergencyContactBanner` and `FinalCta`.

---

## 8. SEO Checklist

* [ ] **LCP Optimization**: Add `priority={true}` to the Hero background image.
* [ ] **Lazy Loading**: Ensure all images below the fold use Next.js default lazy loading.
* [ ] **Internal Linking**: Utilize Next.js `<Link>` for all internal routes (`/services/[slug]`, `/locations/[city]`) to avoid full page reloads and pass link equity.
* [ ] **Anchor Text**: Ensure `ServiceCitiesSeoBlock` uses exact-match city keywords as link text.
* [ ] **Structured Data Injection**: Prepare `<script type="application/ld+json">` blocks for:
  * `LocalBusiness` / `Organization` (In `layout.tsx` or `HeroSection`)
  * `FAQPage` (In `FaqPreview`)
  * `Review` (In `Testimonials`)

---

## 9. Final Homepage Assembly Strategy

In `src/app/page.tsx`, assemble the components sequentially exactly as defined in the Homepage Blueprint:

```text
1. <AnnouncementBar /> (Via Layout or Page Top)
2. <Navbar /> (Via Layout)
3. <main>
     <HeroSection />
       <HeroTrustBar />
     <EmergencyContactBanner />
     <QuickQuoteWidget />
     <ServicesOverview />
     <WhyChooseUs />
     <StatisticsSection />
     <ProcessSection />
     <CoverageAcrossIndia />
     <ServiceCitiesSeoBlock />
     <ShipmentTrackingPreview />
     <IndustriesServed />
     <GalleryPreview />
     <PartnerLogos />
     <Testimonials />
     <SeoContentBlock />
     <FaqPreview />
     <BlogPreview />
     <FinalCta />
   </main>
4. <Footer /> (Via Layout)
```
