import React from 'react';
import Image from 'next/image';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { PrimaryButton } from '../shared/PrimaryButton';
import { InteractiveMapPins } from './InteractiveMapPins';
import { companyInfo } from '@/data/company';

/**
 * CoverageAcrossIndia
 * Source: 05-homepage-content-blueprint.md §10
 *
 * Desktop: 2-column layout (Left: content, Right: visual).
 * Mobile: Stacked layout.
 * Emphasizes NCR and Pan India coverage.
 * Server component, no state.
 */
export function CoverageAcrossIndia() {
  return (
    <SectionContainer className="bg-[#F9FAFB] border-y border-[#E5E7EB]">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── Left: Content ── */}
        <div>
          <SectionHeader
            title="Connecting Every Corner of India"
            subtitle="Our vast network ensures your shipment reaches anywhere, anytime."
            alignment="left"
            theme="light"
          />
          <p className="text-base text-[#4B5563] leading-relaxed mb-6">
            With hubs in every major metropolis, including a massive operational presence in the <strong className="text-[#000000]">NCR region</strong> and <strong className="text-[#000000]">Pan India</strong>, we provide truly national coverage paired with local expertise.
          </p>
          <PrimaryButton href="/locations">
            Find Your Nearest Branch
          </PrimaryButton>
        </div>

        {/* ── Right: India Coverage Visual ── */}
        <div className="relative w-full bg-white border border-[#E5E7EB] rounded-2xl flex flex-col items-center justify-center p-2 md:p-6 pt-6 [box-shadow:0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Map Container locked to aspect-[4/5] with 440px max width (caps height at 550px) */}
          <div className="relative w-full aspect-[4/5] mx-auto flex-1 scale-[1.15] sm:scale-100 transform-origin-center transition-transform" style={{ maxWidth: 'min(100%, 440px)' }}>
            {/* Base Map Image */}
            <div className="absolute inset-0 opacity-80">
              <Image 
                src="/images/map/india-map.png"
                alt={`Map of India showing ${companyInfo.brandName} branch locations`}
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, 440px"
              />
            </div>

            {/* Interactive Pins Overlay */}
            <InteractiveMapPins />
          </div>
          
          {/* Explanatory Caption Below Map */}
          <div className="mt-4 mb-2 text-center w-full px-4">
            <h3 className="text-sm md:text-base font-bold text-[#0D1117] mb-1">
              45+ Service Locations Across India
            </h3>
            <p className="text-xs text-[#6B7280]">
              Serving Major Cities Nationwide
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
