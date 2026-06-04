/**
 * navigation.ts
 * Header and footer navigation links.
 * Source: 02-implementation-plan.md §2 (folder tree routes)
 */
import type { NavigationConfig } from "../types/data.types";

export const navigationConfig: NavigationConfig = {
  headerLinks: [
    { label: "Services",  href: "/services" },
    { label: "Industries",href: "/industries" },
    { label: "Locations", href: "/locations" },
    { label: "About",     href: "/about" },
    { label: "Blog",      href: "/blog" },
  ],

  footerLinks: [
    {
      title: "Company",
      items: [
        { label: "About Us",   href: "/about" },
        { label: "Careers",    href: "/careers" },
        { label: "Gallery",    href: "/gallery" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Services",
      items: [
        { label: "Household Shifting",   href: "/services/household-shifting" },
        { label: "Car Transportation",   href: "/services/car-transportation" },
        { label: "Bike Transportation",  href: "/services/bike-transportation" },
        { label: "Office Relocation",    href: "/services/office-relocation" },
        { label: "Warehousing",          href: "/services/warehousing" },
        { label: "Loading & Unloading",  href: "/services/loading-unloading" },
        { label: "Packers & Movers",     href: "/services/packers-movers" },
        { label: "Commercial Relocation",href: "/services/commercial-relocation" },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "FAQ",             href: "/faq" },
        { label: "Blog",            href: "/blog" },
        { label: "Track Shipment",  href: "/track" },
        { label: "Get a Quote",     href: "/quote" },
        { label: "Branch Locator",  href: "/locations" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy Policy",    href: "/privacy" },
        { label: "Terms of Service",  href: "/terms" },
        { label: "Contact Us",        href: "/contact" },
      ],
    },
  ],
};
