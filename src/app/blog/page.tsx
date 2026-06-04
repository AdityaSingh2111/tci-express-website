import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";
import { blogData } from "@/data/blog";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: `Logistics Blog & Insights | ${companyInfo.brandName}`,
  description: `Read the latest insights, logistics tips, and moving guides from ${companyInfo.brandName}.`,
  openGraph: {
    title: `Blog | ${companyInfo.brandName}`,
    url: `${seoConfig.siteUrl}/blog`,
  },
};

export default function BlogPage() {
  return (
    <main>
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-16 border-b border-[#E5E7EB]">
        <SectionHeader
          title="Logistics Insights & Guides"
          subtitle="Expert advice, industry updates, and comprehensive guides for a seamless relocation experience."
          as="h1"
        />
      </SectionContainer>
      <SectionContainer>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogData.map((post) => {
              const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <article key={post.slug} className="group flex flex-col bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Decorative Header (simulated image) */}
                  <div className="w-full h-48 bg-[#F3F4F6] relative border-b border-[#E5E7EB] overflow-hidden flex items-center justify-center">
                     <svg className="w-10 h-10 text-[#9CA3AF] group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                     </svg>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[11px] font-bold text-[#0052CC] bg-[#EEF4FF] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                      <time className="text-[13px] font-medium text-[#6B7280]">
                        {formattedDate}
                      </time>
                    </div>
                    
                    <Link href={`/blog/${post.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] rounded-sm">
                      <h2 className="text-xl font-bold text-[#0D1117] mb-3 leading-tight group-hover:text-[#0052CC] transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p className="text-sm text-[#4B5563] mb-6 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-[#F3F4F6]">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-sm font-bold text-[#0052CC] hover:text-[#0047B3] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] rounded-sm"
                      >
                        Read Article 
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
