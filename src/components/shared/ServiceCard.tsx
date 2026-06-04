import React from 'react';
import Link from 'next/link';
import type { ServiceItem } from '@/types/data.types';

interface ServiceCardProps {
  service: ServiceItem;
}

/* Icon map — service slug → simple SVG path */
const iconPaths: Record<string, string> = {
  'car-transportation':   'M8 17a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zM3 7h18l-1.5 7H4.5L3 7zM1 4h4l1 3',
  'bike-transportation':  'M12 18a4 4 0 100-8 4 4 0 000 8zm0 0H5a4 4 0 01-4-4V7l3-3h6l2 4h5a2 2 0 012 2v3',
  'household-shifting':   'M3 10.5L12 3l9 7.5V21H15v-6H9v6H3V10.5z',
  'office-relocation':    'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM8 21V7m8 14V7',
  'warehousing':          'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 22V12h6v10',
  'loading-unloading':    'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
  'packers-movers':       'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'commercial-relocation':'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
};

/**
 * ServiceCard — Premium redesign.
 * Minimal, crisp card with icon, title, description, and arrow CTA.
 * No image dependency. Clean border + subtle hover state.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const iconPath = iconPaths[service.slug] || 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4';

  return (
    <Link
      href={`/services/${service.slug}`}
      className={
        'group relative flex flex-col bg-white rounded-xl border border-[#E5E7EB] p-5 ' +
        'transition-all duration-200 ease-out ' +
        'hover:border-[#0052CC]/25 hover:shadow-[0_4px_20px_rgba(0,82,204,0.08)] ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]'
      }
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-[#EEF4FF] flex items-center justify-center mb-4 transition-colors duration-200 group-hover:bg-[#DBEAFE]">
        <svg
          className="w-5 h-5 text-[#0052CC]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
      </div>

      {/* Content */}
      <h3 className="text-[0.9375rem] font-semibold text-[#0D1117] mb-1.5 group-hover:text-[#0052CC] transition-colors duration-200">
        {service.title}
      </h3>
      <p className="text-sm text-[#6B7280] leading-relaxed flex-1">
        {service.shortDescription}
      </p>

      {/* Arrow CTA */}
      <div className="mt-4 flex items-center text-xs font-semibold text-[#0052CC] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Learn more
        <svg className="ml-1 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </div>

      {/* Full-card click overlay */}
      <span className="absolute inset-0 rounded-xl" aria-hidden="true" />
    </Link>
  );
}
