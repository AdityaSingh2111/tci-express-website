import React from 'react';
import Link from 'next/link';
import { companyInfo } from '@/data/company';

/**
 * HeroSection — Mobile-first premium hero.
 *
 * Mobile:  Compact, content-only. No image. Full-width CTAs.
 *          Heading: 2rem (compact, not oversized).
 *          Trust badges: 2-column wrap.
 *          No excessive padding.
 *
 * Desktop: 2-column split with floating stat chips.
 *          Heading: 3.25rem. Content left, visual right.
 *
 * IMPORTANT: Hero mentions "shipment tracking" not "GPS live tracking".
 */
export function HeroSection() {
  return (
    <section
      className="relative w-full bg-[#00102A] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background orbs — desktop only */}
      <div
        className="hidden lg:block absolute top-0 right-0 w-[520px] h-[520px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0052CC 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="hidden lg:block absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0052CC 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 lg:pt-14 lg:pb-12 xl:pt-16 xl:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 lg:gap-8 items-center">

          {/* ── Content column ────────────────────────────────────────────── */}
          <div className="flex flex-col items-start">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#22C55E] uppercase tracking-[0.12em]">
                Pan-India Door-to-Door Logistics
              </span>
            </div>

            {/* H1 — smaller on mobile, larger on desktop */}
            <h1
              id="hero-heading"
              className="text-[2rem] lg:text-[2.75rem] xl:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-[-0.03em] mb-4"
            >
              Premium Logistics{' '}
              <span className="text-[#4B9EFF]">&amp; Relocation</span>
              <span className="block mt-1 sm:mt-0">Across India</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[15px] text-white/70 leading-relaxed mb-6 lg:mb-6 max-w-[480px]">
              Stress-free household shifting, vehicle transport, and commercial
              relocation — backed by shipment tracking, trained professionals,
              and transparent pricing.
            </p>

            {/* Trust bullets — 2-column on mobile, wrap on larger */}
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-6 lg:mb-8"
              aria-label="Key features"
            >
              {[
                'Damage-prevention packing',
                'Shipment tracking',
                'Fully insured moves',
                '24/7 support',
              ].map((pt) => (
                <li key={pt} className="flex items-center gap-1.5 text-xs sm:text-sm text-white/55">
                  <svg className="w-3.5 h-3.5 text-[#22C55E] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* CTAs — hidden on mobile, visible on desktop */}
            <div className="hidden sm:flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/quote"
                className={[
                  'flex items-center justify-center gap-2',
                  'w-full sm:w-auto',
                  'px-6 py-3.5 sm:py-3',
                  'text-[15px] font-bold text-white bg-[#0052CC] rounded-xl',
                  'hover:bg-[#0047B3] transition-all duration-200',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]',
                  'shadow-lg hover:shadow-xl hover:-translate-y-0.5',
                  'touch-manipulation',
                ].join(' ')}
              >
                Get a Free Quote
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/track"
                className={[
                  'flex items-center justify-center gap-2',
                  'w-auto',
                  'px-6 py-3',
                  'text-[15px] font-bold text-white/90 rounded-xl',
                  'border border-white/20 hover:border-white/40 hover:text-white hover:bg-white/5',
                  'transition-all duration-200',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                  'touch-manipulation',
                ].join(' ')}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Track Shipment
              </Link>
            </div>

            {/* Trust footer line */}
            <p className="mt-5 text-[11px] text-white/60 font-medium">
              Trusted for Pan-India relocations · GST Registered Business
            </p>
          </div>

          {/* ── Visual column — desktop only ─────────────────────────────── */}
          <div className="relative hidden lg:flex flex-col items-end overflow-hidden">
            {/* Placeholder card (replace with real image) */}
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/8 flex items-center justify-center">
              <div className="text-center p-6">
                <svg className="w-12 h-12 mx-auto text-white/60 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-white/60 text-xs">Hero image placeholder</p>
                <p className="text-white/60 text-[10px] mt-1">Replace with premium logistics photography</p>
              </div>
            </div>

            {/* Floating stat — bottom left */}
            <div className="absolute left-0 bottom-10 bg-white rounded-xl px-4 py-3 shadow-xl border border-[#E5E7EB]">
              <p className="font-mono text-xl font-extrabold text-[#0052CC] leading-none">24/7</p>
              <p className="text-[11px] text-[#6B7280] font-medium mt-0.5">Support Available</p>
            </div>

            {/* Floating stat — top right */}
            <div className="absolute right-0 top-6 bg-white rounded-xl px-4 py-3 shadow-xl border border-[#E5E7EB]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" aria-hidden="true" />
                <p className="text-[11px] font-semibold text-[#374151]">Status Tracking</p>
              </div>
              <p className="text-[10px] text-[#9CA3AF] mt-0.5">All shipments updated</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
