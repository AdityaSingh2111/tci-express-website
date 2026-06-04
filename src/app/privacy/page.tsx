import React from "react";
import type { Metadata } from "next";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: `Privacy Policy | ${companyInfo.brandName}`,
  description: `Privacy Policy for ${companyInfo.brandName}.`,
  openGraph: {
    title: `Privacy Policy | ${companyInfo.brandName}`,
    url: `${seoConfig.siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <main>
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-16">
        <SectionHeader
          title="Privacy Policy"
          subtitle="Legal placeholder page."
          as="h1"
        />
      </SectionContainer>
      <SectionContainer>
        <div className="max-w-3xl mx-auto prose prose-blue">
          <p>This is a placeholder for the Privacy Policy.</p>
        </div>
      </SectionContainer>
    </main>
  );
}
