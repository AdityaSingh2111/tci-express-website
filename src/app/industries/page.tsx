import React from "react";
import type { Metadata } from "next";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";
import { industriesData } from "@/data/industries";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { CTAButton } from "@/components/shared/CTAButton";

export const metadata: Metadata = {
  title: `Industries We Serve | ${companyInfo.brandName}`,
  description: `Discover how ${companyInfo.brandName} provides specialised logistics and relocation solutions for households, corporate offices, and commercial sectors.`,
  openGraph: {
    title: `Industries We Serve | ${companyInfo.brandName}`,
    description: `Discover how ${companyInfo.brandName} provides specialised logistics and relocation solutions for households, corporate offices, and commercial sectors.`,
    url: `${seoConfig.siteUrl}/industries`,
  },
};

export default function IndustriesPage() {
  return (
    <main>
      {/* 1. Hero Section */}
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-16">
        <SectionHeader
          title="Industries We Serve"
          subtitle="Tailored logistics and relocation solutions spanning across diverse commercial sectors and residential needs."
          as="h1"
        />
      </SectionContainer>

      {/* 2. Industries Grid */}
      <SectionContainer>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {industriesData.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>
      </SectionContainer>

      {/* 3. Industry Benefits Section */}
      <SectionContainer className="bg-[#F9FAFB]">
        <SectionHeader
          title="The Benefit of Specialisation"
          subtitle="Why our industry-specific approach delivers better results."
        />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-12">
          <div className="bg-white p-8 border border-[#E5E7EB] rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-[#000000] mb-3">Custom Handling Protocols</h3>
            <p className="text-[#4B5563] leading-relaxed">
              Every industry has unique assets. Whether it&apos;s a delicate household antique, highly sensitive IT server equipment, or commercial machinery, our teams apply specialised packing and handling protocols specific to your goods.
            </p>
          </div>
          <div className="bg-white p-8 border border-[#E5E7EB] rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-[#000000] mb-3">Minimal Business Disruption</h3>
            <p className="text-[#4B5563] leading-relaxed">
              For our corporate and retail clients, we understand that time is money. We engineer our moving schedules—often operating after hours or on weekends—to ensure absolute minimal downtime for your business operations.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* 4. Final CTA */}
      <SectionContainer className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-6 tracking-tight">
          Discuss your industry needs
        </h2>
        <p className="text-lg text-[#4B5563] mb-8 max-w-2xl mx-auto">
          Speak with our logistics consultants to craft a tailored relocation or transport strategy for your specific sector.
        </p>
        <CTAButton href="/contact">
          Contact a Consultant
        </CTAButton>
      </SectionContainer>
    </main>
  );
}
