import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { careersData } from "@/data/careers";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { PrimaryButton } from "@/components/shared/PrimaryButton";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return careersData.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const job = careersData.find((j) => j.slug === resolvedParams.slug);
  
  if (!job) {
    return { title: "Position Not Found" };
  }

  return {
    title: `${job.title} - Careers | ${companyConfig.brandName}`,
    description: `Join ${companyConfig.brandName} as a ${job.title} in ${job.location}.`,
    alternates: {
      canonical: `https://www.tciexpressmovers.com/careers/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${job.title} - Careers | ${companyConfig.brandName}`,
      description: `Join ${companyConfig.brandName} as a ${job.title} in ${job.location}.`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} - Careers | ${companyConfig.brandName}`,
    },
  };
}

export default async function CareerDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const job = careersData.find((j) => j.slug === resolvedParams.slug);

  if (!job) {
    notFound();
  }

  return (
    <main>
      <SectionContainer className="bg-[#F9FAFB] pt-32 pb-16 border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto">
          <Link href="/careers" className="inline-flex items-center text-sm font-semibold text-brand-blue hover:underline mb-6">
            &larr; Back to all open positions
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-bold text-brand-blue bg-[#EEF4FF] px-2.5 py-1 rounded-full uppercase tracking-wider">
              {job.department}
            </span>
            <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-2.5 py-1 rounded-full uppercase tracking-wider">
              {job.type}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-background-dark mb-6 tracking-tight">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#4B5563]">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Exp: {job.experience}
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-background-dark mb-4">Role Overview</h2>
              <p className="text-[#4B5563] leading-relaxed">
                As a {job.title} within the {job.department} team, you will be instrumental in executing our core operations at {companyConfig.brandName}. We are looking for highly motivated individuals who thrive in a fast-paced environment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-background-dark mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((res, i) => (
                  <li key={i} className="flex items-start text-[#4B5563] leading-relaxed">
                    <svg className="w-5 h-5 text-brand-blue mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {res}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-background-dark mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start text-[#4B5563] leading-relaxed">
                    <svg className="w-5 h-5 text-brand-blue mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar / CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-background-dark mb-2">Ready to Join Us?</h3>
              <p className="text-sm text-[#4B5563] mb-6">
                Submit your application and resume. Our recruitment team will get back to you within 48 hours.
              </p>
              <PrimaryButton href={`mailto:${contactConfig.careersEmail}`} className="w-full text-center justify-center">
                Apply Now
              </PrimaryButton>
              <p className="text-xs text-center text-[#9CA3AF] mt-4">
                Or email your resume directly to {contactConfig.careersEmail} with the subject line &quot;{job.title} Application&quot;.
              </p>
            </div>
          </div>
          
        </div>
      </SectionContainer>
    </main>
  );
}
