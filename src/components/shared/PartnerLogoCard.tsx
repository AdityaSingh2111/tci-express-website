import React from 'react';
import Image from 'next/image';
import type { Partner } from '@/types/data.types';

interface PartnerLogoCardProps {
  partner: Partner;
}

/**
 * PartnerLogoCard
 * Design system §11 Card: white bg, 1px border-gray, no shadow default.
 * Hover: border darkens + shadow-card, logo transitions from grayscale+50% opacity to full color.
 * Animation §27: 150ms ease-out.
 *
 * Accessibility: image alt text clearly identifies the partner.
 */
export function PartnerLogoCard({ partner }: PartnerLogoCardProps) {
  return (
    <div
      className={
        'group flex flex-col items-center justify-center ' +
        'bg-white border border-[#E5E7EB] rounded-[12px] ' +
        'p-5 md:p-6 h-[120px] lg:h-[140px] ' +
        'transition-all duration-200 ease-out hover:-translate-y-[2px] ' +
        'hover:border-[#D1D5DB] hover:shadow-md'
      }
    >
      <div
        className={
          'relative w-28 h-12 ' +
          'opacity-50 grayscale ' +
          'group-hover:opacity-100 group-hover:grayscale-0 ' +
          'transition-[opacity,filter] duration-[150ms] ease-out'
        }
      >
        <Image
          src={partner.logoUrl}
          alt={`${partner.name} logo`}
          fill
          className="object-contain"
          sizes="112px"
          loading="lazy"
        />
      </div>
    </div>
  );
}
