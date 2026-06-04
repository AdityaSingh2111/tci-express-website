/**
 * services.ts
 * Core logistics service offerings.
 * Source: 05-homepage-content-blueprint.md §Service Card Copy
 *         02-implementation-plan.md §3
 */
import type { ServiceItem } from "../types/data.types";

export const servicesData: ServiceItem[] = [
  {
    slug: "car-transportation",
    title: "Car Transportation",
    shortDescription:
      "Secure, enclosed carriers for zero-scratch vehicle delivery across India.",
    icon: "truck",
  },
  {
    slug: "bike-transportation",
    title: "Bike Transportation",
    shortDescription:
      "Specialised two-wheeler packaging and safe transit to your new destination.",
    icon: "bike",
  },
  {
    slug: "household-shifting",
    title: "Household Shifting",
    shortDescription:
      "End-to-end packing, loading, moving, and unpacking for a stress-free home relocation.",
    icon: "home",
  },
  {
    slug: "office-relocation",
    title: "Office Relocation",
    shortDescription:
      "Minimal-downtime commercial moving with expert IT and furniture handling.",
    icon: "briefcase",
  },
  {
    slug: "warehousing",
    title: "Warehousing",
    shortDescription:
      "24/7 secure, climate-controlled storage facilities for short and long-term needs.",
    icon: "warehouse",
  },
  {
    slug: "loading-unloading",
    title: "Loading & Unloading",
    shortDescription:
      "Professional heavy-lifting crews ensuring the utmost safety for your goods.",
    icon: "box",
  },
  {
    slug: "packers-movers",
    title: "Packers & Movers",
    shortDescription:
      "Premium packing materials and expert techniques for maximum transit protection.",
    icon: "package",
  },
  {
    slug: "commercial-relocation",
    title: "Commercial Relocation",
    shortDescription:
      "Scalable logistics solutions for retail, manufacturing, and corporate facilities.",
    icon: "building",
  },
];
