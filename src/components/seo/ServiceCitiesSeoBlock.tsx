import React from 'react';
import Link from 'next/link';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { citiesData } from '@/data/cities';

/**
 * ServiceCitiesSeoBlock
 * Source: 05-homepage-content-blueprint.md §11
 *
 * Purpose: SEO footprint block.
 * Layout: Multi-column grid on desktop, 2-column on mobile.
 * Links map to `/locations/[slug]` for semantic internal linking.
 * Pure server component.
 */
export function ServiceCitiesSeoBlock() {
  return (
    <SectionContainer className="bg-white">
      <SectionHeader
        title="Our Active Service Hubs"
        subtitle="Providing Seamless Logistics Across India's Top Cities"
        alignment="center"
        theme="light"
      />

      <div className="mt-12 max-w-5xl mx-auto">
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-4 text-center md:text-left" role="list">
          {citiesData.map((city) => (
            <li key={city.code}>
              <Link
                href={`/locations/${city.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={
                  'text-sm font-medium text-[#4B5563] ' +
                  'hover:text-[#0052CC] ' +
                  'transition-colors duration-[150ms] ' +
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] rounded-sm py-1 block'
                }
              >
                Packers &amp; Movers in {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  );
}
