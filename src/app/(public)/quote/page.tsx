import React, { Suspense } from "react";
import type { Metadata } from "next";
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { seoConfig } from '@/config/seo';
import { QuoteClient } from "./QuoteClient";

export const metadata: Metadata = {
  title: `Request a Free Quote | ${companyConfig.brandName}`,
  description: `Get a customized estimate for your logistics and relocation needs with ${companyConfig.brandName}. Fast, transparent, and accurate pricing.`,
  openGraph: {
    title: `Request a Free Quote | ${companyConfig.brandName}`,
    description: `Get a customized estimate for your logistics and relocation needs with ${companyConfig.brandName}. Fast, transparent, and accurate pricing.`,
    url: `${seoConfig.siteUrl}/quote`,
  },
};

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">Loading...</div>}>
      <QuoteClient />
    </Suspense>
  );
}
