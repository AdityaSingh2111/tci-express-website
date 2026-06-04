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
        'group flex items-center justify-center p-5 ' +
        'bg-white rounded-[8px] border border-[#E5E7EB] ' +
        'transition-[border-color,box-shadow] duration-[150ms] ease-out ' +
        'hover:border-[#D1D5DB] hover:[box-shadow:0_1px_3px_rgba(0,0,0,0.05)]'
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
