import { MediaConfig } from '@/types/config.types';

/**
 * mediaConfig — Single source of truth for all brand media assets.
 *
 * BRAND LOGO GOVERNANCE:
 * ─────────────────────────────────────────────────────────────────
 * To swap a logo across the entire site, replace the file in
 * public/logos/ and update the path below. Zero component changes needed.
 *
 * File locations:
 *   public/logos/logo-primary.svg     ← Navbar / light bg header
 *   public/logos/logo-footer.svg      ← Footer / dark bg
 *   public/logos/logo-dark.svg        ← Explicit dark variant
 *   public/logos/logo-monogram.svg    ← Icon mark / small spaces
 *   public/logos/logo-transparent.png ← PNG alpha / email / PDF
 *   public/logos/logo-master.svg      ← Authoritative master / press kit
 *
 * FAVICON / OG / PWA ICONS:
 * ─────────────────────────────────────────────────────────────────
 * These are governed by Next.js file-based metadata convention.
 * Drop the correct files into src/app/ and Next.js handles the rest:
 *
 *   src/app/icon.png                  ← Browser favicon (32×32)
 *   src/app/apple-icon.png            ← iOS touch icon (180×180)
 *   src/app/opengraph-image.png       ← OG + Twitter social image (1200×630)
 *   public/icons/icon-192x192.png     ← PWA Android icon
 *   public/icons/icon-512x512.png     ← PWA Android icon (maskable)
 */

export const mediaConfig: MediaConfig = {
  // ── Brand Logos ──────────────────────────────────────────────────────────────
  logoPrimary: '/icons/logo-transparent.png', // Navbar
  logoFooter: '/logos/logo-footer.svg',      // Footer
  logoDark: '/logos/logo-dark.svg',        // Dark-bg sections
  logoMonogram: '/logos/logo-monogram.svg',    // Icon / avatars
  logoTransparent: '/icons/logo-transparent.png', // Email / PDF
  logoMaster: '/logos/logo-master.svg',      // Press kit reference

  // logoSizes: {
  //   header: {
  //     width: 320,
  //     height: 64,
  //     className: 'h-10 sm:h-11 md:h-[50px] lg:h-[52px] w-auto object-contain',
  //   },
  //   mobileMenu: {
  //     width: 200,
  //     height: 52,
  //     className: 'h-9 sm:h-10 w-auto object-contain',
  //   },
  //   footer: {
  //     width: 450,
  //     height: 120,
  //     className: 'h-[64px] sm:h-[72px] md:h-[80px] w-auto object-contain opacity-90',
  //   },
  // },

  // ── Hero Images ──────────────────────────────────────────────────────────────
  heroImages: [
    '/images/hero/hero-1.jpg',
    '/images/hero/hero-2.jpg',
  ],

  // ── Gallery Images ────────────────────────────────────────────────────────────
  galleryImages: [
    { id: 1, src: '/images/gallery/packing-1.svg', alt: 'Professional packing of delicate items', twClass: 'col-span-2 row-span-2' },
    { id: 2, src: '/images/gallery/truck-loading.svg', alt: 'Safe loading into enclosed carriers', twClass: 'col-span-1 row-span-1' },
    { id: 3, src: '/images/gallery/warehouse-1.svg', alt: 'Secure climate-controlled warehousing', twClass: 'col-span-1 row-span-1' },
    { id: 4, src: '/images/gallery/office-move.svg', alt: 'IT equipment relocation', twClass: 'col-span-1 row-span-1' },
    { id: 5, src: '/images/gallery/car-transport.svg', alt: 'Enclosed vehicle transportation', twClass: 'col-span-1 row-span-1' },
  ],

  // ── Partner Logos ─────────────────────────────────────────────────────────────
  partnerLogos: [
    { name: 'Amazon', logoUrl: '/logos/amazon.svg' },
    { name: 'Flipkart', logoUrl: '/logos/flipkart.svg' },
    { name: 'Samsung', logoUrl: '/logos/samsung.svg' },
    { name: 'LG', logoUrl: '/logos/lg.svg' },
    { name: 'Tata Motors', logoUrl: '/logos/tata-motors.svg' },
    { name: 'Maruti Suzuki', logoUrl: '/logos/maruti-suzuki.svg' },
  ],

  // ── Maps ──────────────────────────────────────────────────────────────────────
  mapImage: '/images/map/india-map.png',
};
