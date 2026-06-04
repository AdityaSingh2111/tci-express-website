/**
 * faq.ts
 * Frequently Asked Questions.
 * Source: 05-homepage-content-blueprint.md §FAQ Suggestions
 */
import type { FaqItem } from "../types/data.types";

export const faqData: FaqItem[] = [
  {
    category: "Pricing",
    question: "How do you calculate the cost of household shifting?",
    answer:
      "Cost is calculated based on the volume and weight of goods, the distance between origin and destination, the type of packing materials required, and any additional services such as storage or unpacking assistance. We provide a detailed written estimate after a pre-move survey.",
  },
  {
    category: "Vehicle Transport",
    question: "Is my car safe during transportation, and is it insured?",
    answer:
      "Yes. We use specially designed enclosed car carriers to prevent any scratches or exposure damage. Transit insurance is available and strongly recommended — our team will walk you through the coverage options before your booking is confirmed.",
  },
  {
    category: "Booking",
    question: "How far in advance should I book my relocation?",
    answer:
      "We recommend booking at least 7–14 days in advance to ensure preferred dates and allow adequate time for a pre-move survey. For peak seasons (October–March) and month-end dates, 3–4 weeks advance booking is advisable.",
  },
  {
    category: "Packing",
    question: "Do you provide packing materials, or do I need to supply them?",
    answer:
      "We supply all necessary packing materials — including multi-layered bubble wrap, double-walled corrugated boxes, foam padding, and custom wooden crating for fragile or high-value items. Material costs are itemised transparently in your estimate.",
  },
  {
    category: "Claims",
    question: "What happens if my items are damaged during transit?",
    answer:
      "While our damage prevention processes minimise risk, we maintain a dedicated claims team for transit incidents. Supported by transit insurance, valid claims are processed promptly. All goods handled under our service are documented with an inventory list before loading.",
  },
  {
    category: "Tracking",
    question: "Can I track my shipment status?",
    answer:
      "Yes. Our logistics network provides status-based tracking. Once your shipment is dispatched, you will receive a tracking link and an LR (Lorry Receipt) number, which you can use on our tracking page for regular status updates.",
  },
  {
    category: "Warehousing",
    question: "Do you offer secure warehousing for temporary storage?",
    answer:
      "Yes. We operate secure, climate-controlled warehousing facilities suitable for both short-term (a few days) and long-term storage requirements. Access is controlled, and items are stored on pallets or racking systems to prevent floor damage.",
  },
];
