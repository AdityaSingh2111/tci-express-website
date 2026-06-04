import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";
import { branchesData } from "@/data/branches";
import { InteractiveMapPins } from "@/components/home/InteractiveMapPins";
import { citiesData } from "@/data/cities";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTAButton } from "@/components/shared/CTAButton";
import { BranchList } from "@/components/locations/BranchList";

export const metadata: Metadata = {
  title: `Branch Locator & Map | ${companyInfo.brandName}`,
  description: `Find the nearest ${companyInfo.brandName} branch office. Search our pan-India network of logistics and relocation hubs.`,
  alternates: {
    canonical: `${seoConfig.siteUrl}/locations`,
  },
  openGraph: {
    title: `Branch Locator & Map | ${companyInfo.brandName}`,
    description: `Find the nearest ${companyInfo.brandName} branch office. Search our pan-India network of logistics and relocation hubs.`,
    url: `${seoConfig.siteUrl}/locations`,
    siteName: companyInfo.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: `Branch Locator & Map | ${companyInfo.brandName}`,
    description: `Find the nearest ${companyInfo.brandName} branch office. Search our pan-India network of logistics and relocation hubs.`,
  }
};

export default function LocationsPage() {
  return (
    <main>
      {/* 1. Header & Search Section */}
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-16">
        <SectionHeader
          title="Find A Branch"
          subtitle="Locate your nearest operational hub from our extensive pan-India network."
          as="h1"
        />

        {/* Enhanced Search UI */}
        <div className="max-w-[700px] w-full px-4 md:px-0 mx-auto mt-10">
          <form className="relative flex items-center bg-white border border-[#D1D5DB] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden focus-within:ring-2 focus-within:ring-[#0052CC]/20 focus-within:border-[#0052CC] transition-all h-12 md:h-14">
            <label htmlFor="locationSearch" className="sr-only">Search by city, state, or branch</label>
            <div className="pl-4 pr-3 md:pl-6 md:pr-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              type="text"
              id="locationSearch"
              placeholder="Search by city, state, or branch"
              className="w-full h-full outline-none text-[15px] md:text-base text-[#0D1117] bg-transparent pr-4 md:pr-6 placeholder-[#9CA3AF]"
            />
          </form>
          <p className="text-center text-sm text-[#6B7280] mt-4">
            Showing all operational branches by default.
          </p>
        </div>
      </SectionContainer>

      {/* 2. Branch Results (Client Component with Load More) */}
      <SectionContainer className="py-16">
        <BranchList branches={branchesData} />
      </SectionContainer>

      {/* 3. Network Coverage Map */}
      <SectionContainer className="bg-[#F9FAFB] py-16 border-y border-[#E5E7EB]">
        <SectionHeader
          title="Network Coverage Across India"
          subtitle="Serving Major Cities Nationwide"
        />
        
        <div className="max-w-[950px] mx-auto mt-12 px-2 md:px-6">
          <div className="w-full bg-white rounded-2xl md:rounded-3xl border border-[#D1D5DB] flex flex-col items-center justify-center p-2 sm:p-4 md:p-8 relative shadow-[0_10px_40px_rgba(0,0,0,0.06)] min-h-[400px] md:min-h-[550px] overflow-hidden">
            
            {/* Map Container locked to exact India map aspect ratio (400x500) to ensure % pins never misalign */}
            <div className="relative w-full aspect-[4/5] mx-auto flex-1 scale-[1.15] sm:scale-100 transform-origin-center transition-transform" style={{ maxWidth: 'min(100%, 460px)' }}>
              {/* Base Map Image */}
              <div className="absolute inset-0 opacity-80">
                <Image 
                  src="/images/map/india-map.png"
                  alt={`Map of India showing ${companyInfo.brandName} branch locations`}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 460px"
                />
              </div>

              {/* Interactive Pins Overlay */}
              <InteractiveMapPins />
            </div>
            
          </div>
          
          {/* Subtext STRICTLY below map container */}
          <div className="mt-8 text-center">
            <p className="text-xl md:text-2xl font-bold text-[#0D1117] mb-2">45+ Service Locations</p>
            <p className="text-base text-[#6B7280]">Serving Major Cities Nationwide</p>
          </div>
        </div>
      </SectionContainer>

      {/* 4. City Coverage Grid */}
      <SectionContainer className="py-16">
        <SectionHeader
          title="Pan-India Coverage"
          subtitle="While our branches are located strategically, our fleet covers all these major hubs and their surrounding regions."
        />
        <div className="max-w-[1200px] mx-auto mt-12 px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-4">
            {citiesData.map((city) => (
              <div key={city.code} className="flex items-center p-2 rounded hover:bg-[#F9FAFB] transition-colors">
                {/* Brand blue location pin instead of green dot */}
                <svg className="w-5 h-5 text-[#0052CC] mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[#0D1117] font-medium">{city.name}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* 5. Contact CTA */}
      <SectionContainer className="text-center border-t border-[#E5E7EB] py-16 bg-[#F9FAFB]">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-6 tracking-tight">
          Need immediate help?
        </h2>
        <p className="text-lg text-[#4B5563] mb-8 max-w-2xl mx-auto">
          Our centralized support team can dispatch services or answer questions regardless of your nearest branch.
        </p>
        <CTAButton href="/contact">
          Contact Support Desk
        </CTAButton>
      </SectionContainer>
    </main>
  );
}
