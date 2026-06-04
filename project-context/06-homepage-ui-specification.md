# HOMEPAGE UI SPECIFICATION

**Project:** Premium Logistics Platform
**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS
**Design Goals:** Premium, Modern, Fast, SEO-first, Mobile-first, Enterprise-grade, High conversion

---

## 1. HOMEPAGE COMPONENT TREE

```text
app/
  page.tsx (Server Component)
    ├── <AnnouncementBar /> (Client Component)
    ├── <Navbar /> (Client Component)
    ├── <main>
    │     ├── <HeroSection> (Server Component)
    │     │     └── <HeroTrustBar /> (Server Component)
    │     ├── <QuickQuoteWidget /> (Client Component)
    │     ├── <EmergencyContactBanner /> (Server Component)
    │     ├── <ServicesOverview /> (Server Component)
    │     ├── <CoverageAcrossIndia /> (Server Component)
    │     ├── <ServiceCitiesSeoBlock /> (Server Component)
    │     ├── <ShipmentTrackingPreview /> (Client Component)
    │     ├── <WhyChooseUs /> (Server Component)
    │     ├── <StatisticsSection /> (Server Component)
    │     ├── <ProcessSection /> (Server Component)
    │     ├── <IndustriesServed /> (Server Component)
    │     ├── <GalleryPreview /> (Client Component - Lightbox)
    │     ├── <PartnerLogos /> (Client Component - Marquee)
    │     ├── <Testimonials /> (Client Component - Carousel)
    │     ├── <SeoContentBlock /> (Server Component)
    │     ├── <FaqPreview /> (Client Component - Accordion)
    │     ├── <BlogPreview /> (Server Component)
    │     └── <FinalCta /> (Server Component)
    ├── <Footer /> (Server Component)
    ├── <MobileBottomNav /> (Client Component)
    └── <FloatingWhatsAppButton /> (Client Component)
```

**Reusable Component Strategy:**
- Extracted shared components in `src/components/shared/`: `<SectionHeader />`, `<PrimaryButton />`, `<GhostButton />`, `<ServiceCard />`, `<IconWrapper />`.

**Data Architecture Files:**
- Centralized statistics data: `src/data/stats.ts`
- Centralized partner logo data: `src/data/partners.ts`

---

## 2. COMPONENT SPECIFICATIONS

### 1. Announcement Bar
1. **Component Name:** `AnnouncementBar`
2. **Folder Location:** `src/components/layout/AnnouncementBar.tsx`
3. **Purpose:** Display dismissible, high-value guarantees or urgent notices.
4. **Data Source:** `src/data/company.ts` (supportHours, certifications)
5. **Props Structure:** `interface AnnouncementBarProps { message: string; ctaText: string; ctaLink: string; }`
6. **Desktop Behavior:** Full-width thin band at the very top. Centers content.
7. **Mobile Behavior:** Single line, truncates with ellipsis if too long.
8. **Animation Behavior:** Slides up and unmounts when dismissed.
9. **Image Requirements:** None (optional SVG icon).
10. **Accessibility Requirements:** `aria-label="Announcement"`, dismiss button must have `aria-label="Close announcement"`.
11. **SEO Requirements:** None.

### 2. Navbar
1. **Component Name:** `Navbar`
2. **Folder Location:** `src/components/layout/Navbar.tsx`
3. **Purpose:** Global wayfinding and primary actions.
4. **Data Source:** `src/data/navigation.ts`, `src/data/company.ts`
5. **Props Structure:** None (fetches data internally or passed from layout).
6. **Desktop Behavior:** Sticky top, transparent changing to solid white on scroll.
7. **Mobile Behavior:** Sticky top, hamburger menu opens full-screen overlay.
8. **Animation Behavior:** Drop-shadow fade-in on scroll. Mobile menu slide-in from right.
9. Image Requirements: SVG Brand Logo (`public/logos/logo.svg`).
10. **Accessibility Requirements:** `<nav>`, `aria-expanded` for mobile menu, full keyboard navigability for dropdowns.
11. **SEO Requirements:** Semantic `<nav>`, rich anchor text.

### 3. Hero Section
1. **Component Name:** `HeroSection`
2. **Folder Location:** `src/components/home/HeroSection.tsx`
3. **Purpose:** Hook the user, explain value prop, and drive primary actions.
4. **Data Source:** `src/data/company.ts` (trustedFamiliesCount)
5. **Props Structure:** None.
6. Desktop Behavior: Split Layout (Left Content, Right Hero Image).
7. Mobile Behavior: Stacked Layout.
8. **Animation Behavior:** Text stagger fade-in on load.
9. **Image Requirements:** Premium Logistics imagery (`public/images/hero/hero-bg.webp`). LCP critical (use `priority={true}`).
10. **Accessibility Requirements:** High contrast text over images.
11. **SEO Requirements:** Contains page `<h1>`.

### 4. Hero Trust Bar
1. **Component Name:** `HeroTrustBar`
2. **Folder Location:** `src/components/home/HeroTrustBar.tsx`
3. **Purpose:** Immediately validate enterprise claims.
4. **Data Source:** `src/data/stats.ts`
5. **Props Structure:** `interface HeroTrustBarProps { stats: StatItem[] }`
6. **Desktop Behavior:** Horizontal strip below hero, 4 columns.
7. **Mobile Behavior:** 2x2 grid.
8. **Animation Behavior:** Subtle fade-in.
9. **Image Requirements:** SVG Icons for each stat.
10. **Accessibility Requirements:** Screen readers should read stat value followed by label.
11. **SEO Requirements:** Contextual keywords in labels.

### 5. Emergency Contact Banner
1. **Component Name:** `EmergencyContactBanner`
2. **Folder Location:** `src/components/home/EmergencyContactBanner.tsx`
3. **Purpose:** Capture high-urgency relocation inquiries.
4. **Data Source:** `src/data/company.ts` (phoneNumber, supportAvailability)
5. **Props Structure:** None.
6. **Desktop Behavior:** Full-width, high-contrast accent band.
7. **Mobile Behavior:** Padded block, large touch target for phone number.
8. **Animation Behavior:** Pulse effect on the phone icon.
9. **Image Requirements:** None.
10. **Accessibility Requirements:** Phone link must use `tel:` protocol.
11. **SEO Requirements:** Minimal.

### 6. Quick Quote Widget
1. **Component Name:** `QuickQuoteWidget`
2. **Folder Location:** `src/components/forms/QuickQuoteWidget.tsx`
3. **Purpose:** Reduce friction for quotation requests.
4. **Data Source:** `src/data/services.ts` (dropdown options)
5. **Props Structure:** None.
6. **Desktop Behavior:** Floating card overlapping Hero and next section. Horizontal inline form.
7. **Mobile Behavior:** Stacked inputs, spans 100% width.
8. **Animation Behavior:** Slides up into view on load.
9. **Image Requirements:** None.
10. **Accessibility Requirements:** Form labels, `aria-required`, input types (`tel`, `text`).
11. **SEO Requirements:** None.

### 7. Services Overview
1. **Component Name:** `ServicesOverview`
2. **Folder Location:** `src/components/home/ServicesOverview.tsx`
3. **Purpose:** Catalog core offerings.
4. **Data Source:** `src/data/services.ts`
5. **Props Structure:** `interface ServicesOverviewProps { services: Service[] }`
6. **Desktop Behavior:** 4-column grid.
7. **Mobile Behavior:** 1-column stacked grid or horizontal scroll snap.
8. **Animation Behavior:** Cards hover scale-up, shadow increase.
9. **Image Requirements:** High-quality thumbnails (`public/images/services/*.webp`). Aspect ratio 16:9.
10. **Accessibility Requirements:** Entire card clickable via pseudo-element over standard link. `alt` text on images.
11. **SEO Requirements:** `<h2>` for section, `<h3>` for service cards. Internal links.

### 8. Coverage Across India
1. **Component Name:** `CoverageAcrossIndia`
2. **Folder Location:** `src/components/home/CoverageAcrossIndia.tsx`
3. **Purpose:** Showcase nationwide capability.
4. **Data Source:** `src/data/locations.ts`
5. **Props Structure:** None.
6. **Desktop Behavior:** Stylized map visual (left), searchable index (right).
7. **Mobile Behavior:** Search input and top hubs grid. Map hidden to save space.
8. **Animation Behavior:** Map nodes stagger fade-in on scroll.
9. **Image Requirements:** Data-viz style SVG map (`public/images/assets/india-map.svg`).
10. **Accessibility Requirements:** Alt text for map: "Map of India showing our operational hubs".
11. **SEO Requirements:** `<h2>` heading.

### 9. Service Cities SEO Block
1. **Component Name:** `ServiceCitiesSeoBlock`
2. **Folder Location:** `src/components/seo/ServiceCitiesSeoBlock.tsx`
3. **Purpose:** Localized SEO and city discovery.
4. **Data Source:** `src/data/cities.ts`
5. **Props Structure:** `interface ServiceCitiesSeoBlockProps { cities: City[] }`
6. **Desktop Behavior:** Clean 5-column grid of links.
7. **Mobile Behavior:** Dense 2-column list or scrolling chips.
8. **Animation Behavior:** None.
9. **Image Requirements:** None.
10. **Accessibility Requirements:** Clearly styled as interactive links.
11. **SEO Requirements:** High density of exact-match anchor texts linking to `/locations/[city]`.

### 10. Shipment Tracking Preview
1. **Component Name:** `ShipmentTrackingPreview`
2. **Folder Location:** `src/components/tracking/ShipmentTrackingPreview.tsx`
3. **Purpose:** Immediate utility for existing customers.
4. **Data Source:** None (Client-side routing to tracking portal).
5. **Props Structure:** None.
6. **Desktop Behavior:** Centered input box, minimalist design.
7. **Mobile Behavior:** Full-width input box.
8. **Animation Behavior:** Input focus ring transition.
9. **Image Requirements:** Abstract UI background pattern (optional).
10. **Accessibility Requirements:** Label for tracking input, `aria-describedby` for example text.
11. **SEO Requirements:** Minimal.

### 11. Why Choose Us
1. **Component Name:** `WhyChooseUs`
2. **Folder Location:** `src/components/home/WhyChooseUs.tsx`
3. **Purpose:** Differentiate via USPs.
4. **Data Source:** `src/data/company.ts` (usps)
5. **Props Structure:** `interface WhyChooseUsProps { usps: USP[] }`
6. **Desktop Behavior:** 2x2 or 4x1 grid.
7. **Mobile Behavior:** 1-column list.
8. **Animation Behavior:** Icon floating or gentle bounce on hover.
9. **Image Requirements:** SVG Icons for USPs.
10. **Accessibility Requirements:** Icons should be decorative (`aria-hidden="true"`).
11. **SEO Requirements:** Contextual keywords in descriptions.

### 12. Statistics Section
1. **Component Name:** `StatisticsSection`
2. **Folder Location:** `src/components/home/StatisticsSection.tsx`
3. **Purpose:** Massive social proof.
4. **Data Source:** `src/data/stats.ts`
5. Props Structure: `interface StatisticsSectionProps { stats: Stat[]; animate?: boolean; }`
6. Desktop Behavior: Dark background band, 4 large numbers in a row.
7. Mobile Behavior: 2x2 grid.
8. Animation Behavior: Default: Static values. Optional: Count-up animation enabled later (triggered by setting the `animate` prop to true).
9. **Image Requirements:** None.
10. **Accessibility Requirements:** Screen readers should read the final value, not the count-up animation.
11. **SEO Requirements:** None.

### 13. Process Section
1. **Component Name:** `ProcessSection`
2. **Folder Location:** `src/components/home/ProcessSection.tsx`
3. **Purpose:** Demystify the logistics process.
4. **Data Source:** `src/data/services.ts` (processSteps)
5. **Props Structure:** `interface ProcessSectionProps { steps: Step[] }`
6. **Desktop Behavior:** Horizontal timeline.
7. **Mobile Behavior:** Vertical timeline with connecting line.
8. **Animation Behavior:** Connecting line fills up on scroll.
9. **Image Requirements:** Numbered SVG Icons.
10. **Accessibility Requirements:** Use `<ol>` and `<li>` for the process sequence.
11. **SEO Requirements:** Semantic ordered lists.

### 14. Industries Served
1. **Component Name:** `IndustriesServed`
2. **Folder Location:** `src/components/home/IndustriesServed.tsx`
3. **Purpose:** Show specialized B2B expertise.
4. **Data Source:** `src/data/industries.ts`
5. **Props Structure:** `interface IndustriesServedProps { industries: Industry[] }`
6. **Desktop Behavior:** Bento-box grid or Tabbed interface.
7. **Mobile Behavior:** Horizontal swipeable carousel.
8. **Animation Behavior:** Cards are grayscale, turning full color on hover.
9. **Image Requirements:** Real industry photography (`public/images/industries/*.webp`).
10. **Accessibility Requirements:** Alt text describing the industry setting.
11. **SEO Requirements:** Targets B2B keywords in `<h3>`.

### 15. Gallery Preview
1. **Component Name:** `GalleryPreview`
2. **Folder Location:** `src/components/gallery/GalleryPreview.tsx`
3. **Purpose:** Visual proof of operations.
4. **Data Source:** `src/data/company.ts` (galleryImages)
5. **Props Structure:** `interface GalleryPreviewProps { images: GalleryImage[] }`
6. **Desktop Behavior:** Pinterest-inspired mixed grid.
7. **Mobile Behavior:** Clean 2-column grid.
8. **Animation Behavior:** Image slight scale on hover. Click opens a stark black full-screen lightbox.
9. **Image Requirements:** High-quality operational photos (`public/images/gallery/*.webp`).
10. **Accessibility Requirements:** Keyboard support for closing lightbox (`Esc`), focus trap within lightbox.
11. **SEO Requirements:** Descriptive `alt` attributes.

### 16. Partner Logos
1. **Component Name:** `PartnerLogos`
2. **Folder Location:** `src/components/home/PartnerLogos.tsx`
3. **Purpose:** B2B trust signaling.
4. **Data Source:** `src/data/partners.ts`
5. **Props Structure:** `interface PartnerLogosProps { partners: Partner[] }`
6. Desktop Behavior: Static responsive logo grid.
7. Mobile Behavior: Horizontal swipeable logo carousel.
8. Animation Behavior: Grayscale to color transitions on hover (Desktop). Carousel transition on swipe (Mobile).
9. Image Requirements: SVG Logos (`public/logos/*.svg`).
10. Accessibility Requirements: Clean keyboard navigation for carousel, descriptive `alt` tags for logos, proper aria-roledescription="carousel" on Mobile.
11. **SEO Requirements:** None.

### 17. Testimonials
1. **Component Name:** `Testimonials`
2. **Folder Location:** `src/components/home/Testimonials.tsx`
3. **Purpose:** Social proof via customer reviews.
4. **Data Source:** `src/data/testimonials.ts`
5. **Props Structure:** `interface TestimonialsProps { testimonials: Testimonial[] }`
6. **Desktop Behavior:** Minimalist card carousel (3 visible).
7. **Mobile Behavior:** 1-card carousel.
8. **Animation Behavior:** Smooth swipe/scroll snap.
9. **Image Requirements:** Small avatar headshots (`public/images/avatars/*.webp`).
10. **Accessibility Requirements:** Carousel controls must be keyboard accessible.
11. **SEO Requirements:** Render JSON-LD Review schema.

### 18. SEO Content Block
1. **Component Name:** `SeoContentBlock`
2. **Folder Location:** `src/components/seo/SeoContentBlock.tsx`
3. **Purpose:** Long-form SEO content for organic ranking.
4. **Data Source:** `src/data/seo.ts`
5. **Props Structure:** None.
6. **Desktop Behavior:** Clean, prose-styled text block (centered, max-width `prose`).
7. **Mobile Behavior:** Standard text block with comfortable line height.
8. **Animation Behavior:** None.
9. **Image Requirements:** None.
10. **Accessibility Requirements:** Proper heading structure (`<h2>`).
11. **SEO Requirements:** High keyword density (natural phrasing).

### 19. FAQ Preview
1. **Component Name:** `FaqPreview`
2. **Folder Location:** `src/components/home/FaqPreview.tsx`
3. **Purpose:** Pre-emptively answer common objections.
4. **Data Source:** `src/data/faq.ts`
5. **Props Structure:** `interface FaqPreviewProps { faqs: FaqItem[] }`
6. **Desktop Behavior:** Centered single-column accordion (max 800px width).
7. **Mobile Behavior:** Full-width accordion.
8. **Animation Behavior:** Smooth height transition on expand/collapse. Plus/minus icon rotation.
9. **Image Requirements:** None.
10. **Accessibility Requirements:** `aria-expanded`, `aria-controls`, `<button>` for triggers.
11. **SEO Requirements:** Render JSON-LD FAQPage schema.

### 20. Blog Preview
1. **Component Name:** `BlogPreview`
2. **Folder Location:** `src/components/home/BlogPreview.tsx`
3. **Purpose:** Demonstrate industry authority, fresh content for SEO.
4. **Data Source:** `src/data/blog.ts`
5. **Props Structure:** `interface BlogPreviewProps { posts: BlogPost[] }`
6. **Desktop Behavior:** 3-column card grid.
7. **Mobile Behavior:** 1-column stacked or horizontal scroll.
8. **Animation Behavior:** Card lift on hover.
9. **Image Requirements:** Article thumbnails (`public/images/blog/*.webp`).
10. **Accessibility Requirements:** Read more links must have descriptive `aria-label`s.
11. **SEO Requirements:** Deep internal linking to `/blog/[slug]`.

### 21. Final CTA
1. **Component Name:** `FinalCta`
2. **Folder Location:** `src/components/home/FinalCta.tsx`
3. **Purpose:** Ultimate "catch-all" conversion point.
4. **Data Source:** `src/data/company.ts`
5. **Props Structure:** None.
6. **Desktop Behavior:** Large, high-contrast block (Primary Blue).
7. **Mobile Behavior:** Optimized padding, stacked buttons.
8. **Animation Behavior:** Fade up on scroll.
9. **Image Requirements:** Subtle background texture/pattern (`public/images/assets/pattern.svg`).
10. **Accessibility Requirements:** High contrast buttons.
11. **SEO Requirements:** None.

### 22. Footer
1. **Component Name:** `Footer`
2. **Folder Location:** `src/components/layout/Footer.tsx`
3. **Purpose:** Secondary navigation, compliance, contact info.
4. **Data Source:** `src/data/company.ts`, `src/data/navigation.ts`
5. **Props Structure:** None.
6. **Desktop Behavior:** 4-column structured grid. Dark background.
7. **Mobile Behavior:** Stacked 1-column or collapsible accordions for links.
8. **Animation Behavior:** Link text color change on hover.
9. **Image Requirements:** White/monochrome logo.
10. **Accessibility Requirements:** Semantic `<footer>`.
11. **SEO Requirements:** Sitewide internal linking matrix.

### 23. Mobile Bottom Navigation
1. **Component Name:** `MobileBottomNav`
2. **Folder Location:** `src/components/layout/MobileBottomNav.tsx`
3. **Purpose:** Fixed access to high-conversion actions on mobile.
4. **Data Source:** `src/data/company.ts` (phone, whatsapp)
5. **Props Structure:** None.
6. **Desktop Behavior:** Hidden (`hidden md:flex` inverse).
7. **Mobile Behavior:** Fixed to `bottom-0`, `w-full`. 3 distinct touch targets (Call, WhatsApp, Track).
8. **Animation Behavior:** Slides up on initial load.
9. **Image Requirements:** SVG Icons (Phone, WhatsApp, Target).
10. **Accessibility Requirements:** `aria-label` for icon-only buttons.
11. **SEO Requirements:** None.

### 24. Floating WhatsApp Button
1. **Component Name:** `FloatingWhatsAppButton`
2. **Folder Location:** `src/components/layout/FloatingWhatsAppButton.tsx`
3. **Purpose:** Persistent access to WhatsApp on desktop.
4. **Data Source:** `src/data/company.ts` (whatsapp)
5. **Props Structure:** None.
6. **Desktop Behavior:** Fixed to `bottom-4 right-4` or similar. Z-index high.
7. **Mobile Behavior:** Hidden (handled by Mobile Bottom Nav).
8. **Animation Behavior:** Pulse effect or slight hover lift.
9. **Image Requirements:** WhatsApp SVG Icon.
10. **Accessibility Requirements:** "Chat with us on WhatsApp" `aria-label`.
11. **SEO Requirements:** None.

---

## 3. DATA MAPPING TABLE

| Component | Target Data File | Key Properties Required |
| :--- | :--- | :--- |
| `Navbar`, `Footer`, CTAs | `src/data/company.ts` | brandName, phone, whatsapp, email, address, certifications |
| `ServicesOverview`, `ProcessSection` | `src/data/services.ts` | id, title, icon, description, image, processSteps |
| `CoverageAcrossIndia`, `ServiceCitiesSeoBlock`| `src/data/locations.ts` / `cities.ts`| cityName, slug, isHub |
| `Testimonials` | `src/data/testimonials.ts`| id, name, city/company, quote, rating |
| `FaqPreview` | `src/data/faq.ts` | question, answer |
| `BlogPreview` | `src/data/blog.ts` | id, title, slug, date, thumbnail |
| `StatisticsSection`, `HeroTrustBar` | `src/data/stats.ts` | pincodesServed, tonsDelivered, happyCustomersCount, etc. |
| `IndustriesServed` | `src/data/industries.ts`| id, title, description, image |
| `PartnerLogos` | `src/data/partners.ts` | name, logoUrl |

---

## 4. IMAGE STRATEGY

1.  **Folders:** 
    *   `/public/images/hero/`
    *   `/public/images/services/`
    *   `/public/images/industries/`
    *   `/public/images/gallery/`
    *   `/public/logos/`
2.  **Naming Convention:** Kebab-case, SEO-friendly (e.g., `car-transportation-service.webp`).
3.  **Format:** Serve modern formats (`.webp` or `.avif`) via Next.js `<Image>` component.
4.  **Loading:**
    *   **Hero Image:** Use `priority={true}` to prevent LCP degradation. Do not lazy load.
    *   **Below Fold Images:** Rely on default Next.js lazy loading (`loading="lazy"`).
5.  **Dimensions:** Always specify `width` and `height` to prevent Cumulative Layout Shift (CLS), or use `fill` with relative parent wrappers.

---

## 5. ANIMATION STRATEGY

1.  **Entry Animations:** Use `framer-motion` for scroll-triggered reveal animations. Limit to `fade-in` and subtle `slide-up` (e.g., `<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>`).
2.  **Hover Interactions:** Handle strictly via Tailwind CSS classes (e.g., `hover:scale-105 hover:shadow-lg transition-all duration-300`). Do not use JavaScript for hover states.
3.  **Scroll Interactions:** Navbar background transition triggered by scroll position. Marquee loops infinitely via CSS keyframes.
4.  **Performance Check:** Respect `prefers-reduced-motion` using Tailwind's `motion-safe` utility.

---

## 6. ACCESSIBILITY STRATEGY (A11y)

1.  **Keyboard Navigation:** All CTAs, form inputs, accordion triggers, and gallery images must be navigable via `Tab`.
2.  **Focus States:** Use Tailwind's `focus-visible:ring` to show prominent outlines only when keyboard navigating.
3.  **ARIA Attributes:** Provide `aria-expanded` for menus/accordions, `aria-hidden` for decorative icons, and rich `aria-label` attributes for icon-only buttons (like WhatsApp).
4.  **Color Contrast:** Enforce WCAG AA standard (4.5:1 ratio) for all text on colored backgrounds (e.g., white text on Primary Blue).

---

## 7. SEO STRATEGY

1.  **Heading Hierarchy:**
    *   `H1`: One per page (Hero Section).
    *   `H2`: Major section titles (e.g., "Comprehensive Logistics...", "Why Customers Choose Us").
    *   `H3`: Card titles (e.g., "Car Transportation", "Warehousing").
2.  **Internal Linking:** Deep link to `/services/[slug]`, `/locations/[city]`, and `/blog/[slug]` using Next.js `<Link>` component to preserve client-side routing and pass link equity.
3.  **Structured Data (JSON-LD):** Inject `<script type="application/ld+json">` into the `<head>` (via Next.js Metadata API) containing:
    *   `Organization` / `LocalBusiness`
    *   `FAQPage`
    *   `Review`

---

## 8. IMPLEMENTATION NOTES

1.  **RSC Default:** Default to Server Components for performance. Only add `"use client"` directive to the absolute lowest leaf node that requires interactivity (e.g., the specific Accordion trigger, the Tracking Input form, the Testimonial Carousel).
2.  **Dynamic Placeholders:** Build components to consume the `{brandName}`, `{phoneNumber}`, and `{pincodesServed}` variables directly from the data layer, ensuring no hardcoding in the JSX.
3.  **Mobile Touch Targets:** Ensure all buttons, links, and form inputs have a minimum height and width of `44px` to pass mobile usability audits.
