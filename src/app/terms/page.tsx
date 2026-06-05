import React from "react";
import type { Metadata } from "next";
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { seoConfig } from '@/config/seo';
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: `Terms of Service | ${companyConfig.brandName}`,
  description: `Terms of Service for ${companyConfig.brandName}.`,
  openGraph: {
    title: `Terms of Service | ${companyConfig.brandName}`,
    url: `${seoConfig.siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <main>
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-16">
        <SectionHeader
          title="Terms of Service"
          subtitle="Legal placeholder page."
          as="h1"
        />
      </SectionContainer>
      <SectionContainer>
        <div className="max-w-3xl mx-auto prose prose-blue">
          <p>This is a placeholder for the Terms of Service.</p>
        </div>
      </SectionContainer>
    </main>
  );
}
