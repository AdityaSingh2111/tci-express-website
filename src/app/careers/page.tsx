import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";
import { careersData } from "@/data/careers";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: `Careers | ${companyInfo.brandName}`,
  description: `Join ${companyInfo.brandName} and build a career in the logistics and relocation industry. View our open positions.`,
  openGraph: {
    title: `Careers | ${companyInfo.brandName}`,
    url: `${seoConfig.siteUrl}/careers`,
  },
};

export default function CareersPage() {
  // Group jobs by department
  const groupedJobs = careersData.reduce((acc, job) => {
    if (!acc[job.department]) acc[job.department] = [];
    acc[job.department].push(job);
    return acc;
  }, {} as Record<string, typeof careersData>);

  const departments = Object.keys(groupedJobs);

  return (
    <main>
      <SectionContainer className="bg-[#00102A] pt-32 pb-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Build the Future of Logistics
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Join a fast-growing, pan-India logistics network. We are looking for passionate individuals who want to solve complex supply chain challenges.
          </p>
        </div>
      </SectionContainer>
      
      <SectionContainer className="bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Open Positions"
            subtitle="Explore our current opportunities and find where you fit in."
            alignment="center"
          />
          
          <div className="mt-12 space-y-12">
            {departments.map(dept => (
              <div key={dept}>
                <h2 className="text-2xl font-bold text-[#0D1117] mb-6 pb-2 border-b border-[#E5E7EB]">
                  {dept}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {groupedJobs[dept].map(job => (
                    <Link 
                      key={job.slug} 
                      href={`/careers/${job.slug}`}
                      className="group block bg-white border border-[#E5E7EB] rounded-xl p-6 hover:shadow-md hover:border-[#0052CC] transition-all"
                    >
                      <h3 className="text-xl font-bold text-[#0D1117] mb-2 group-hover:text-[#0052CC] transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {job.type}
                        </span>
                      </div>
                      <div className="mt-6 flex items-center text-sm font-bold text-[#0052CC]">
                        View Details
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
