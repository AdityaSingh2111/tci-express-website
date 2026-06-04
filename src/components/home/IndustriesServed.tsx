import React from 'react';
import Link from 'next/link';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { IndustryCard } from '../shared/IndustryCard';
import { industriesData } from '@/data/industries';

/**
 * IndustriesServed
 * Source: 05-homepage-content-blueprint.md §13
 * 
 * Layout:
 * - Desktop: 3-column grid
 * - Mobile: Single-column stack
 * Server Component. Uses IndustryCard.
 */
export function IndustriesServed() {
  return (
    <SectionContainer className="bg-[#F8FAFC]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div className="max-w-xl">
          <SectionHeader 
            eyebrow="Who we serve"
            title="Industries We Serve" 
            subtitle="Specialized logistics for households, businesses, and enterprises."
            alignment="left"
            theme="light"
          />
        </div>
        <div className="shrink-0">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0052CC] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] rounded-sm"
          >
            View all industries
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {industriesData.map((industry) => (
          <IndustryCard key={industry.slug} industry={industry} />
        ))}
      </div>
    </SectionContainer>
  );
}
