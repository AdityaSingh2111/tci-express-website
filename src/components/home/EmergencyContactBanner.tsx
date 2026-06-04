import React from 'react';
import { companyInfo } from '@/data/company';

/**
 * EmergencyContactBanner — Refined urgency banner.
 * Slimmer, less aggressive. Keeps urgency without overwhelming the hero.
 */
export function EmergencyContactBanner() {
  return (
    <div
      className="w-full bg-[#FFF7F7] border-b border-[#FECACA]"
      role="region"
      aria-label="Emergency contact"
    >
      <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex shrink-0" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-[#E53E3E]/20 animate-ping" />
              <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#FEE2E2]">
                <svg className="w-3 h-3 text-[#E53E3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </span>
            </span>
            <p className="text-sm font-medium text-[#7F1D1D]">
              Need urgent help?{' '}
              <span className="text-[#374151] font-normal">
                Our team is available {companyInfo.supportAvailability}.
              </span>
            </p>
          </div>
          <a
            href={`tel:${companyInfo.phone}`}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-[#E53E3E] border border-[#FECACA] rounded-md bg-white hover:bg-[#FEF2F2] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53E3E]"
          >
            Call Now: {companyInfo.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
