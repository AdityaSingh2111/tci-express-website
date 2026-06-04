/**
 * data.types.ts
 * Canonical TypeScript interfaces for all data layer configs.
 * Source: 01-project-scaffold.md §2, 02-implementation-plan.md §3
 *
 * RULES:
 *  - All string values are configurable placeholders.
 *  - No hardcoded brand names, URLs, or phone numbers inside types.
 *  - Interfaces must be kept in sync with src/data/*.ts exports.
 */

// ── Company ─────────────────────────────────────────────────────────────────
export interface CompanyInfo {
  brandName: string;
  legalName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  website: string;
  /** Hours string e.g. "24/7" — shown in AnnouncementBar / EmergencyBanner */
  supportHours: string;
  /** Availability text e.g. "24 hours a day, 7 days a week" */
  supportAvailability: string;
}

// ── SEO ─────────────────────────────────────────────────────────────────────
export interface GlobalSeoConfig {
  siteUrl: string;
  defaultTitle: string;
  /** %s is replaced by the page title */
  titleTemplate: string;
  defaultDescription: string;
  /** Open Graph image URL */
  ogImage: string;
}

// ── Navigation ───────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  items: NavLink[];
}

export interface NavigationConfig {
  headerLinks: NavLink[];
  footerLinks: FooterLinkGroup[];
}

// ── Services ─────────────────────────────────────────────────────────────────
export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  /** Optional icon name (Lucide icon key) */
  icon?: string;
}

// ── Industries ───────────────────────────────────────────────────────────────
export interface IndustryItem {
  slug: string;
  title: string;
  description: string;
}

// ── Testimonials ─────────────────────────────────────────────────────────────
export interface TestimonialItem {
  clientName: string;
  clientTitle?: string;
  clientCompany?: string;
  clientCity?: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  category?: string;
}

// ── Statistics ───────────────────────────────────────────────────────────────
export interface StatItem {
  /** Display value e.g. "15,000+" */
  value: string;
  label: string;
  /** Optional raw numeric value for animated counters */
  numericValue?: number;
}

// ── FAQ ──────────────────────────────────────────────────────────────────────
export interface FaqItem {
  question: string;
  answer: string;
  /** Logical grouping for filtered FAQ pages */
  category: string;
}

// ── Blog ─────────────────────────────────────────────────────────────────────
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO 8601 date string
  category: string;
  /** Relative path to image in public/images/blog/ */
  imageSrc?: string;
}

// ── Partners ─────────────────────────────────────────────────────────────────
export interface Partner {
  name: string;
  /** Relative path to SVG in public/logos/ */
  logoUrl: string;
}

// ── Cities ───────────────────────────────────────────────────────────────────
export interface CityConfig {
  /** IATA-style 3-letter code */
  code: string;
  name: string;
}

// ── Locations (SEO) ───────────────────────────────────────────────────────────
export interface LocationSEOItem {
  slug: string;
  city: string;
  state?: string;
}

// ── Branches ─────────────────────────────────────────────────────────────────
export interface BranchItem {
  slug: string;
  name: string;
  city: string;
  address?: string;
  phone?: string;
}

// ── Careers ──────────────────────────────────────────────────────────────────
export interface JobPosition {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  responsibilities: string[];
  requirements: string[];
}

// ── Theme (runtime reference — design tokens live in globals.css) ────────────
export interface ThemeColors {
  primaryBlue: string;
  primaryRed: string;
  black: string;
  white: string;
  textGray: string;
  borderGray: string;
  surfaceGray: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
}
