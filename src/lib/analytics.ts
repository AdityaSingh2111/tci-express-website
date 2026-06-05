/**
 * analytics.ts
 * Central analytics utility for tracking events.
 *
 * Supports: Google Analytics 4 (GA4), Google Tag Manager (GTM),
 *           Microsoft Clarity.
 *
 * All IDs must be set via environment variables:
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID  — GA4 Measurement ID (e.g. G-XXXXXXXXXX)
 *   NEXT_PUBLIC_GTM_ID             — GTM Container ID  (e.g. GTM-XXXXXXX)
 *   NEXT_PUBLIC_CLARITY_ID         — Clarity Project ID
 *
 * No IDs are hardcoded. If a variable is absent, the corresponding
 * provider is silently skipped.
 */

// ── Type helpers ───────────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: (...args: unknown[]) => void;
  }
}

// ── Environment guards ─────────────────────────────────────────────────────
export const GA_ID  = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? '';
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? '';

// ── Event tracking ─────────────────────────────────────────────────────────

/**
 * Track a custom event in GA4.
 * No-ops gracefully if GA is not loaded.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('event', eventName, params);
}

/**
 * Track a page view explicitly (useful for SPA navigation).
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('config', GA_ID, { page_path: url });
}

// ── Pre-defined event helpers ──────────────────────────────────────────────

export const analytics = {
  /** User clicked "Get Quote" CTA */
  quoteStarted: () => trackEvent('quote_started'),

  /** User completed the full quote wizard */
  quoteSubmitted: (service?: string) =>
    trackEvent('quote_submitted', { service_type: service ?? 'unknown' }),

  /** User submitted a tracking query */
  shipmentTracked: () => trackEvent('shipment_tracked'),

  /** User submitted the contact form */
  contactSubmitted: () => trackEvent('contact_submitted'),

  /** User clicked WhatsApp CTA */
  whatsappClicked: () => trackEvent('whatsapp_clicked'),

  /** User clicked the phone call CTA */
  callClicked: () => trackEvent('call_clicked'),
};
