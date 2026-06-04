import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { FAQItem } from '../shared/FAQItem';
import { SecondaryButton } from '../shared/SecondaryButton';
import { faqData } from '@/data/faq';

/**
 * FaqPreview
 * Source: 05-homepage-content-blueprint.md §18
 * 
 * Layout:
 * - Desktop: 2-column (Left content/CTA, Right FAQ accordion)
 * - Mobile: 1-column stack
 * 
 * Uses FAQItem (Client component under the hood for toggle, but this container is Server Component).
 */
export function FaqPreview() {
  const displayFaqs = faqData.slice(0, 4);

  return (
    <SectionContainer className="bg-[#F9FAFB] border-t border-[#E5E7EB]">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Col: Header and CTA */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <SectionHeader 
            title="Frequently Asked Questions" 
            subtitle="Everything you need to know about our moving, packing, and logistics services."
            alignment="left"
            theme="light"
          />
          <div className="mt-8">
            <SecondaryButton href="/faq">
              View All FAQs
            </SecondaryButton>
          </div>
        </div>

        {/* Right Col: FAQ Items */}
        <div className="lg:col-span-7">
          <div className="border border-[#E5E7EB] rounded-[8px] overflow-hidden bg-white shadow-sm divide-y divide-[#E5E7EB]">
            {displayFaqs.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
