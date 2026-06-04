/**
 * company.ts
 * All brand identity and contact data.
 * Source: 02-implementation-plan.md §3, 05-homepage-content-blueprint.md
 *
 * ⚠ CONFIGURE: Replace every placeholder string before production deploy.
 *   No fake certifications, no fake branch counts, no fake customer counts.
 */
import type { CompanyInfo } from "../types/data.types";

export const companyInfo: CompanyInfo = {
  brandName: "TCI Express",
  legalName: "TCI Express Packers and Movers",
  tagline: "All India Door To Door Shifting Made Easy",
  phone: "+91 1800 200 0000",
  whatsapp: "+919876543210",
  email: "info@tciexpress.co.in",
  address: "TCI building , 179-D, Institutional Area, Sector 105, Gurugram, Haryana 122001, India",
  website: "https://www.tciexpress.co.in",
  supportHours: "24/7",
  supportAvailability: "24 hours a day, 7 days a week",
};
