/**
 * seo.ts
 * Global SEO configuration.
 * Source: 01-project-scaffold.md §2, 05-homepage-content-blueprint.md §17
 *
 * ⚠ CONFIGURE: Replace siteUrl, defaultTitle, and ogImage before production.
 */
import type { GlobalSeoConfig } from "../types/data.types";

export const seoConfig: GlobalSeoConfig = {
  siteUrl: "https://www.tciexpress.co.in",
  defaultTitle: "TCI Express | Premium Logistics & Relocation Across India",
  titleTemplate: "%s | TCI Express",
  defaultDescription: "Experience seamless, stress-free car, bike, household and commercial shifting across India. End-to-end relocation services with tracking and damage prevention processes.",
  ogImage: "/logos/logo-light.svg",
};