/**
 * testimonials.ts
 * Customer testimonials following the three template archetypes.
 * Source: 05-homepage-content-blueprint.md §Testimonial Templates
 */
import type { TestimonialItem } from "../types/data.types";

export const testimonialsData: TestimonialItem[] = [
  {
    clientName: "Rajesh K.",
    clientCity: "Delhi",
    quote: "Moving from Delhi to Mumbai was incredibly stressful until we used this service. The team was professional, the packing was highly secure, and every item arrived safely. Truly stress-free — highly recommended.",
    rating: 5,
    category: "Household Shifting"
  },
  {
    clientName: "Meena S.",
    clientTitle: "Operations Manager",
    clientCompany: "TechSolutions India",
    clientCity: "Bengaluru",
    quote: "We entrusted our entire office relocation to this team. They handled our IT infrastructure and sensitive documents with absolute precision. We were operational at the new location within two days.",
    rating: 5,
    category: "Office Relocation"
  },
  {
    clientName: "Arjun M.",
    clientCity: "Hyderabad",
    quote: "I was nervous about shipping my car across states, but the enclosed carrier and live status tracking gave me complete peace of mind. It arrived in perfect showroom condition.",
    rating: 5,
    category: "Car Transportation"
  },
  {
    clientName: "Sneha P.",
    clientCity: "Pune",
    quote: "Relocating my boutique's inventory required extreme care. The commercial relocation team worked overnight to ensure no disruption to my business. Phenomenal service.",
    rating: 5,
    category: "Commercial Relocation"
  },
  {
    clientName: "Vikram R.",
    clientCity: "Chennai",
    quote: "My superbikes were transported from Chennai to Delhi flawlessly. They used specialized crates and tied them down perfectly. Not a single scratch.",
    rating: 5,
    category: "Bike Transportation"
  },
  {
    clientName: "Anjali D.",
    clientCity: "Noida",
    quote: "The packing team arrived right on time and methodically packed my entire 3BHK household. They even helped me unpack and arrange furniture at the destination.",
    rating: 5,
    category: "Household Shifting"
  }
];
