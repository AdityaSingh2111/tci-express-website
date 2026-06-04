import React from "react";
import type { Metadata } from "next";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";
import { faqData } from "@/data/faq";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FAQItem } from "@/components/shared/FAQItem";
import { CTAButton } from "@/components/shared/CTAButton";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${companyInfo.brandName}`,
  description: `Find answers to common questions about relocation, tracking, pricing, and our logistics services at ${companyInfo.brandName}.`,
  alternates: {
    canonical: `${seoConfig.siteUrl}/faq`,
  },
  openGraph: {
    title: `Frequently Asked Questions | ${companyInfo.brandName}`,
    description: `Find answers to common questions about relocation, tracking, pricing, and our logistics services at ${companyInfo.brandName}.`,
    url: `${seoConfig.siteUrl}/faq`,
    siteName: companyInfo.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: `Frequently Asked Questions | ${companyInfo.brandName}`,
    description: `Find answers to common questions about relocation, tracking, pricing, and our logistics services at ${companyInfo.brandName}.`,
  }
};

export default function FAQPage() {
  // Group FAQs by Category
  const faqsByCategory = faqData.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqData>);

  const categories = Object.keys(faqsByCategory);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      {/* 1. FAQ Hero */}
      <SectionContainer className="bg-[#F9FAFB] pt-16 pb-10">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our services, pricing, and relocation process."
          as="h1"
        />
      </SectionContainer>

      {/* 2 & 3. Category Grouping and Full FAQ List */}
      <SectionContainer>
        <div className="max-w-3xl mx-auto space-y-10">
          {categories.map((category) => (
            <div key={category} className="scroll-mt-20" id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
              <h2 className="text-xl font-bold text-[#000000] mb-4 border-b border-[#E5E7EB] pb-3">
                {category}
              </h2>
              <div className="flex flex-col">
                {faqsByCategory[category].map((faq, index) => (
                  <FAQItem key={index} faq={faq} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* 4. Final CTA */}
      <SectionContainer className="text-center bg-[#F9FAFB] border-t border-[#E5E7EB]">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-6 tracking-tight">
          Still have questions?
        </h2>
        <p className="text-lg text-[#4B5563] mb-8 max-w-2xl mx-auto">
          Our dedicated support team is available 24/7 to provide detailed answers to any other queries you might have.
        </p>
        <CTAButton href="/contact">
          Contact Support
        </CTAButton>
      </SectionContainer>
    </main>
  );
}
