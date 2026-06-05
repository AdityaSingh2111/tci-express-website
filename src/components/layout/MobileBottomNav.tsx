'use client';

import React from 'react';
import Link from 'next/link';
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';

/**
 * MobileBottomNav
 * Source: 06-homepage-ui-specification.md §23, 03-design-system.md §15
 *
 * Design system §15:
 *   - Fixed bottom navigation bar on mobile devices only
 *   - Items: Home, Track, Quote, Contact (adapted to: Call, WhatsApp, Quote, Track)
 *   - Solid White background, 1px solid Border Gray (#E5E7EB) top border
 *   - Active state highlighted in Primary Blue (#0052CC)
 *
 * Hidden on md+ screens (handled by FloatingWhatsAppButton on desktop).
 * 'use client' required for companyInfo phone/whatsapp runtime string access.
 * All touch targets ≥ 44px (§29).
 */
export function MobileBottomNav() {
  const whatsappNumber = contactConfig.whatsapp.replace(/\D/g, '');
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi, I need help with a relocation.')}`;

  const baseItem =
    'flex flex-col items-center justify-center flex-1 min-h-[56px] gap-0.5 ' +
    'text-[#4B5563] ' +
    'transition-colors duration-[150ms] ease-out ' +
    'focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-[-2px] ' +
    'active:bg-[#F9FAFB]';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#E5E7EB]"
      aria-label="Mobile quick actions"
      role="navigation"
    >
      {/* Safe area bottom padding for notched devices */}
      <div className="flex items-stretch pb-safe">

        {/* ── Call Now ── */}
        <a
          href={`tel:${contactConfig.phone}`}
          className={`${baseItem} text-[#4B5563]`}
          aria-label="Call us now"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span className="text-[9px] font-semibold uppercase tracking-wider leading-none">Call</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-[#E5E7EB] self-stretch my-2" aria-hidden="true" />

        {/* ── WhatsApp ── */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseItem} text-[#16A34A]`}
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="text-[9px] font-semibold uppercase tracking-wider leading-none">WhatsApp</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-[#E5E7EB] self-stretch my-2" aria-hidden="true" />

        {/* ── Get Quote (CTA — red) ── */}
        <Link
          href="/quote"
          className={`${baseItem} text-brand-blue`}
          aria-label="Get a free quote"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
          <span className="text-[9px] font-semibold uppercase tracking-wider leading-none">Quote</span>
        </Link>

        {/* Divider */}
        <div className="w-px bg-[#E5E7EB] self-stretch my-2" aria-hidden="true" />

        {/* ── Track Shipment ── */}
        <Link
          href="/track"
          className={`${baseItem} text-[#4B5563]`}
          aria-label="Track your shipment"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="text-[9px] font-semibold uppercase tracking-wider leading-none">Track</span>
        </Link>

      </div>
    </nav>
  );
}
