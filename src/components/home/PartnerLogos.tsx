import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { PartnerLogoCard } from '../shared/PartnerLogoCard';
import { partnersData } from '@/data/partners';

/**
 * PartnerLogos
 * Source: 05-homepage-content-blueprint.md §14
 * 
 * Layout:
 * - Desktop: Responsive grid
 * - Mobile: Horizontal scroll container (No marquee, no auto-scroll per spec)
 * Server Component. Uses PartnerLogoCard.
 */
export function PartnerLogos() {
  return (
    <SectionContainer className="bg-white border-y border-[#E5E7EB] py-12 lg:py-16" id="partners">
      <div className="text-center mb-10">
        <h2 className="text-sm font-bold text-[#4B5563] uppercase tracking-widest">
          Trusted by India&apos;s Leading Enterprises
        </h2>
      </div>
      
      {/* Marquee Container — overflow-hidden is mandatory to contain translateX animation */}
      <div className="relative flex overflow-x-hidden group">
        {/* Pointer Events None to keep it purely visual or allow clicking via PartnerLogoCard if intended. */}
        <div className="flex shrink-0 animate-marquee-mobile lg:animate-marquee-desktop group-hover:[animation-play-state:paused]">
          {/* Render partners array twice for infinite smooth loop */}
          {[...partnersData, ...partnersData].map((partner, index) => (
            <div key={`${partner.name}-${index}`} className="shrink-0 px-4 md:px-6 w-[200px] lg:w-[240px]">
              <PartnerLogoCard partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
