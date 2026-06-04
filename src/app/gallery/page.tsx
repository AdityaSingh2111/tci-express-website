import React from "react";
import type { Metadata } from "next";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTAButton } from "@/components/shared/CTAButton";

export const metadata: Metadata = {
  title: `Gallery | ${companyInfo.brandName}`,
  description: `View our fleet, premium packing materials, and professional teams in action delivering logistics excellence across India.`,
  alternates: {
    canonical: `${seoConfig.siteUrl}/gallery`,
  },
  openGraph: {
    title: `Gallery | ${companyInfo.brandName}`,
    description: `View our fleet, premium packing materials, and professional teams in action delivering logistics excellence across India.`,
    url: `${seoConfig.siteUrl}/gallery`,
    siteName: companyInfo.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: `Gallery | ${companyInfo.brandName}`,
    description: `View our fleet, premium packing materials, and professional teams in action delivering logistics excellence across India.`,
  }
};

export default function GalleryPage() {
  // Static visual placeholder data for gallery items
  const galleryItems = [
    { id: 1, title: "Premium Packing", category: "Packing" },
    { id: 2, title: "Enclosed Car Carrier", category: "Vehicles" },
    { id: 3, title: "Commercial Relocation", category: "Commercial" },
    { id: 4, title: "Secure Warehousing", category: "Warehousing" },
    { id: 5, title: "Household Shifting", category: "Household" },
    { id: 6, title: "GPS Enabled Fleet", category: "Fleet" },
  ];

  return (
    <main>
      {/* 1. Hero Section */}
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-12">
        <SectionHeader
          title="Our Work in Action"
          subtitle="A visual showcase of our premium packing, modern fleet, and dedicated logistics teams."
          as="h1"
        />
      </SectionContainer>

      <SectionContainer>
        {/* 3. Category Filtering UI (Visual Only) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {["All", "Household", "Commercial", "Vehicles", "Packing", "Fleet"].map((filter, index) => (
            <button
              key={filter}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                index === 0
                  ? "bg-[#0052CC] text-white"
                  : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
              }`}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 2. Responsive Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-[#E5E7EB] rounded-xl overflow-hidden shadow-sm"
            >
              {/* Visual image placeholder area */}
              <div className="absolute inset-0 flex items-center justify-center text-[#9CA3AF]">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>

              {/* Gradient Scrim & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[200ms] ease-out">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-1 block">
                    {item.category}
                  </span>
                  <h3 className="text-white text-xl font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* 4. Final CTA */}
      <SectionContainer className="text-center bg-[#F9FAFB] border-t border-[#E5E7EB]">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-6 tracking-tight">
          Ready to make your move?
        </h2>
        <p className="text-lg text-[#4B5563] mb-8 max-w-2xl mx-auto">
          Trust our verified professionals for your next relocation.
        </p>
        <CTAButton href="/quote">
          Get Your Free Quote
        </CTAButton>
      </SectionContainer>
    </main>
  );
}
