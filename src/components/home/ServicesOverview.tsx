import React from 'react';
import Link from 'next/link';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { ServiceCard } from '../shared/ServiceCard';
import { servicesData } from '@/data/services';

/**
 * ServicesOverview
 * Source: 05-homepage-content-blueprint.md §6, 06-homepage-ui-specification.md §7
 *
 * Design system:
 *   - Surface Gray (#F9FAFB) background
 *   - Desktop: 4-column grid
 *   - Mobile: 1-column stacked
 *   - Tablet (md): 2-column grid
 *   - Section H2 title + subtitle from content blueprint §6
 *   - "View All Services" CTA link below grid — right-aligned on desktop
 *   - Uses SectionContainer for consistent padding
 *
 * Server Component — no interactivity.
 */
export function ServicesOverview() {
  return (
    <SectionContainer id="services" className="bg-[#F9FAFB]">

      {/* ── Section header ── */}
      <SectionHeader
        eyebrow="What we offer"
        title="Comprehensive Logistics & Shifting Solutions"
        subtitle="Tailored services for your home, office, and commercial freight needs — handled with uncompromising care."
        alignment="center"
        theme="light"
      />

      {/* ── Services grid ── */}
      {/*
        Mobile:  1 col
        Tablet:  2 col
        Desktop: 4 col
        ref: 06-homepage-ui-specification.md §7
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {servicesData.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      {/* ── Footer row: trust line + CTA ── */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Trust line — ref content blueprint §6 */}
        <p className="text-sm text-[#4B5563] text-center sm:text-left">
          <span className="font-medium text-[#000000]">Specialized Fleets</span>
          {' · '}
          <span className="font-medium text-[#000000]">Trained Professionals</span>
          {' · '}
          <span className="font-medium text-[#000000]">Damage Prevention Processes</span>
        </p>

        {/* View All Services link */}
        <Link
          href="/services"
          className={
            'inline-flex items-center gap-1.5 shrink-0 ' +
            'text-sm font-medium text-brand-blue ' +
            'transition-opacity duration-[150ms] hover:opacity-80 ' +
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue rounded-sm'
          }
        >
          Explore All Services
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </Link>
      </div>

    </SectionContainer>
  );
}
