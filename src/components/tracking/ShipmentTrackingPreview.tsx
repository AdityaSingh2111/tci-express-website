import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { CTAButton } from '../shared/CTAButton';

/**
 * ShipmentTrackingPreview
 * Source: 05-homepage-content-blueprint.md §12
 *
 * Layout: High-contrast Dark mode section.
 * Visual preview only: standard HTML form GET request to /track route.
 * No client state (`useState`) needed for native form submission.
 * Includes visual process explanation below the form.
 */
export function ShipmentTrackingPreview() {
  return (
    <SectionContainer className="bg-white border-y border-[#E5E7EB]">
      <SectionHeader
        title="Track Your Shipment Status"
        subtitle="Status-based visibility into your cargo's journey. Enter your LR Number or Tracking ID below."
        alignment="center"
        theme="light"
      />

      <div className="mt-10 max-w-2xl mx-auto">
        {/* Native HTML Form handles routing without client state overhead */}
        <form action="/track" method="get" className="flex flex-col sm:flex-row gap-3">
          <label htmlFor="trackingId" className="sr-only">
            Consignment Number
          </label>
          <input
            id="trackingId"
            name="id"
            type="text"
            placeholder="Enter LR Number or Consignment Note"
            required
            className={
              'flex-1 min-h-[44px] px-4 rounded-[4px] ' +
              'border border-[#E5E7EB] bg-white ' +
              'text-[#000000] text-base ' +
              'focus:outline-none focus:ring-2 focus:ring-brand-blue ' +
              'placeholder:text-[#4B5563]'
            }
          />
          <button 
            type="submit" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-brand-red hover:bg-[#B91C1C] rounded-[4px] shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            Track Shipment
          </button>
        </form>
        
        {/* Tracking Process Explanation */}
        <div className="mt-10 pt-8 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-red" aria-hidden="true" />
            <h3 className="text-background-dark text-sm font-bold text-center tracking-wide uppercase">
              How Status Tracking Works
            </h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center" role="list">
            <li className="text-[#4B5563] text-xs leading-relaxed">
              <span className="block text-sm font-semibold text-background-dark mb-1.5">1. Dispatch</span>
              Cargo loaded and secure LR generated.
            </li>
            <li className="text-[#4B5563] text-xs leading-relaxed">
              <span className="block text-sm font-semibold text-background-dark mb-1.5">2. In Transit</span>
              Live GPS updates directly from our fleet.
            </li>
            <li className="text-[#4B5563] text-xs leading-relaxed">
              <span className="block text-sm font-semibold text-background-dark mb-1.5">3. Delivery</span>
              Instant confirmation upon safe arrival.
            </li>
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
