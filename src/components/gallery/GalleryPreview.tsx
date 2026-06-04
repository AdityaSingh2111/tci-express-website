import React from 'react';
import Image from 'next/image';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { SecondaryButton } from '../shared/SecondaryButton';
import { companyInfo } from '@/data/company';

/**
 * GalleryPreview
 * Source: 05-homepage-content-blueprint.md §15
 * 
 * Layout:
 * - Desktop: Pinterest-inspired layout (masonry/grid)
 * - Mobile: 2-column layout
 * Server Component. No client-side lightbox state.
 */
const galleryImages = [
  { id: 1, src: '/images/gallery/packing-1.svg', alt: 'Professional packing of delicate items', twClass: 'col-span-2 row-span-2' },
  { id: 2, src: '/images/gallery/truck-loading.svg', alt: 'Safe loading into enclosed carriers', twClass: 'col-span-1 row-span-1' },
  { id: 3, src: '/images/gallery/warehouse-1.svg', alt: 'Secure climate-controlled warehousing', twClass: 'col-span-1 row-span-1' },
  { id: 4, src: '/images/gallery/office-move.svg', alt: 'IT equipment relocation', twClass: 'col-span-1 row-span-1' },
  { id: 5, src: '/images/gallery/car-transport.svg', alt: 'Enclosed vehicle transportation', twClass: 'col-span-1 row-span-1' },
];

export function GalleryPreview() {
  return (
    <SectionContainer className="bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div className="max-w-2xl">
          <SectionHeader 
            title={`${companyInfo.brandName} in Action`}
            subtitle="Browse through our gallery to see how we handle your valuable possessions with utmost care and professionalism."
            alignment="left"
            theme="light"
          />
        </div>
        <div className="shrink-0 mb-4 md:mb-0">
          <SecondaryButton href="/gallery">
            View Full Gallery
          </SecondaryButton>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[160px] lg:auto-rows-[220px]">
        {galleryImages.map((img) => (
          <div 
            key={img.id} 
            className={`relative rounded-[8px] overflow-hidden bg-[#F9FAFB] border border-[#E5E7EB] group ${img.twClass}`}
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
