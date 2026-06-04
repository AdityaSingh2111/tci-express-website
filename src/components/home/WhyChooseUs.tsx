import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import Link from 'next/link';

/**
 * WhyChooseUs — Premium redesign.
 * Dark background with blue accent cards. Enterprise feel.
 */
export function WhyChooseUs() {
  const features = [
    {
      title: 'Zero-Damage Handling',
      description: 'Industrial-grade packaging materials, custom crating, and trained professionals ensure your belongings arrive intact.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      ),
    },
    {
      title: 'Shipment Status Tracking',
      description: 'Monitor your shipment\'s exact location with our status-based tracking system from pickup to delivery.',
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </>
      ),
    },
    {
      title: 'Comprehensive Insurance',
      description: 'All-inclusive transit insurance protects your assets against every unforeseen circumstance during relocation.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      ),
    },
    {
      title: 'Dedicated Move Manager',
      description: 'A single point of contact coordinates your entire relocation, ensuring seamless communication throughout.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      ),
    },
    {
      title: 'Pan-India Network',
      description: 'Operational presence across all major cities and remote regions, providing truly national coverage.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      ),
    },
    {
      title: '24/7 Customer Support',
      description: 'Round-the-clock assistance via phone, WhatsApp, and email ensures you\'re never left without support.',
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </>
      ),
    },
  ];

  return (
    <SectionContainer className="bg-[#00102A]">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* Left: Content */}
        <div className="lg:sticky lg:top-24">
          <SectionHeader
            eyebrow="Why choose us"
            title="The Premium Logistics Difference"
            subtitle="We don't just move goods — we deliver peace of mind through proven processes, modern technology, and genuine care."
            alignment="left"
            theme="dark"
          />
          <Link
            href="/quote"
            className={
              'inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold ' +
              'text-white bg-[#E53E3E] rounded-lg ' +
              'hover:bg-[#CC2A2A] transition-colors duration-150 ' +
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53E3E]'
            }
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Right: Feature grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 p-5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0052CC]/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#60A5FA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  {feature.icon}
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SectionContainer>
  );
}
