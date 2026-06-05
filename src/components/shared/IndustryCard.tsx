import React from 'react';
import Link from 'next/link';
import type { IndustryItem } from '@/types/data.types';

interface IndustryCardProps {
  industry: IndustryItem;
}

/**
 * IndustryCard — Premium redesign.
 * No broken image dependency. Clean card with gradient accent border,
 * title, description, and arrow. SaaS-grade appearance.
 */
export function IndustryCard({ industry }: IndustryCardProps) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className={
        'group relative flex flex-col bg-white rounded-[12px] border border-[#E5E7EB] p-5 md:p-6 ' +
        'transition-all duration-200 ease-out hover:-translate-y-[2px] ' +
        'hover:border-[#D1D5DB] hover:shadow-md ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue'
      }
    >
      {/* Top-left accent dot */}
      <div className="w-8 h-8 rounded-lg bg-[#EEF4FF] flex items-center justify-center mb-3 transition-colors duration-200 group-hover:bg-[#DBEAFE]">
        <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-background-dark mb-1.5 group-hover:text-brand-blue transition-colors duration-200">
          {industry.title}
        </h3>
        <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3">
          {industry.description}
        </p>
      </div>

      {/* Arrow */}
      <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Explore
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </div>

      <span className="absolute inset-0 rounded-xl" aria-hidden="true" />
    </Link>
  );
}
