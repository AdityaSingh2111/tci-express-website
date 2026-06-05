import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';

/**
 * SeoContentBlock
 * Source: 05-homepage-content-blueprint.md §17
 * 
 * Purpose: Long-form SEO block targeting high-value keywords without stuffing.
 * Server component.
 */
export function SeoContentBlock() {
  return (
    <SectionContainer className="bg-[#F9FAFB]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#000000] mb-6 text-center md:text-left leading-tight">
          Reliable Packers and Movers &amp; Comprehensive Logistics Solutions
        </h2>
        <div className="prose prose-sm md:prose-base prose-gray max-w-none text-[#4B5563] text-justify space-y-4">
          <p>
            When it comes to seamless relocations, choosing the right partner is critical. 
            <strong> {companyConfig.brandName}</strong> stands out as India&apos;s premier choice for dependable 
            <strong className="text-[#000000] font-semibold"> packers and movers</strong>. We specialize in 
            <strong className="text-[#000000] font-semibold"> household shifting</strong>, ensuring your personal belongings are 
            packed with industrial-grade materials and transported safely. For businesses, our expert 
            <strong className="text-[#000000] font-semibold"> office relocation</strong> services guarantee zero downtime 
            and secure movement of sensitive IT infrastructure.
          </p>
          <p>
            Our expertise extends beyond standard moving services. We offer highly secure 
            <strong className="text-[#000000] font-semibold"> car transportation</strong> and specialized 
            <strong className="text-[#000000] font-semibold"> bike transportation</strong> using enclosed 
            carriers designed specifically for vehicle transit. With a massive operational footprint in the 
            <strong className="text-[#000000] font-semibold"> NCR</strong> region and a robust 
            <strong className="text-[#000000] font-semibold"> Pan India</strong> network, our fleet reaches every corner of the country. 
            Whether you are moving across the street or across the nation, our GPS-enabled fleet and dedicated move managers ensure total peace of mind.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
