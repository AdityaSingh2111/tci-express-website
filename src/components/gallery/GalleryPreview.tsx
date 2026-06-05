import React from 'react';
import Image from 'next/image';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { SecondaryButton } from '../shared/SecondaryButton';
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { mediaConfig } from '@/config/media';

/**
 * GalleryPreview
 * Source: 05-homepage-content-blueprint.md §15
 * 
 * Layout:
 * - Desktop: Pinterest-inspired layout (masonry/grid)
 * - Mobile: 2-column layout
 * Server Component. No client-side lightbox state.
 */


export function GalleryPreview() {
  return (
    <SectionContainer className="bg-background-dark">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div className="max-w-2xl">
          <SectionHeader 
            title={`${companyConfig.brandName} in Action`}
            subtitle="Browse through our gallery to see how we handle your valuable possessions with utmost care and professionalism."
            alignment="left"
            theme="dark"
          />
        </div>
        <div className="shrink-0 mb-4 md:mb-0">
          <SecondaryButton href="/gallery">
            View Full Gallery
          </SecondaryButton>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[160px] lg:auto-rows-[220px]">
        {mediaConfig.galleryImages.map((img) => (
          <div 
            key={img.id} 
            className={`relative rounded-[8px] overflow-hidden bg-gray-800 border border-white/10 group ${img.twClass}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[400ms] group-hover:scale-105"
            />
            {/* Subtle gradient overlay to increase premium feel */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[300ms] pointer-events-none" 
              aria-hidden="true" 
            />
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
