/**
 * industries.ts
 * Verticals served by the logistics platform.
 * Source: 05-homepage-content-blueprint.md §Industry Card Copy
 */
import type { IndustryItem } from "../types/data.types";

export const industriesData: IndustryItem[] = [
  {
    slug: "households",
    title: "Households",
    description:
      "Premium end-to-end packing, loading, and safe delivery for seamless residential shifting.",
  },
  {
    slug: "corporate-offices",
    title: "Corporate Offices",
    description:
      "Minimal-downtime office relocation handling sensitive IT infrastructure and confidential files.",
  },
  {
    slug: "automobile-owners",
    title: "Automobile Owners",
    description:
      "Safe car and bike transportation in custom-designed enclosed carriers.",
  },
  {
    slug: "retail-businesses",
    title: "Retail Businesses",
    description:
      "Agile stock, warehouse replenishment, and retail distribution logistics.",
  },
  {
    slug: "warehousing-clients",
    title: "Warehousing Clients",
    description:
      "Secure, clean, and climate-controlled storage for short or long term needs.",
  },
  {
    slug: "commercial-relocation",
    title: "Commercial Relocation",
    description:
      "Bulk goods, machinery, and facility shifts designed to reduce business interruption.",
  },
];
