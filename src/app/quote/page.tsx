import React from "react";
import type { Metadata } from "next";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";
import { QuoteClient } from "./QuoteClient";

export const metadata: Metadata = {
  title: `Request a Free Quote | ${companyInfo.brandName}`,
  description: `Get a customized estimate for your logistics and relocation needs with ${companyInfo.brandName}. Fast, transparent, and accurate pricing.`,
  openGraph: {
    title: `Request a Free Quote | ${companyInfo.brandName}`,
    description: `Get a customized estimate for your logistics and relocation needs with ${companyInfo.brandName}. Fast, transparent, and accurate pricing.`,
    url: `${seoConfig.siteUrl}/quote`,
  },
};

export default function QuotePage() {
  return <QuoteClient />;
}
