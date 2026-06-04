import React from "react";
import type { Metadata } from "next";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";

export const metadata: Metadata = {
  title: `Get a Free Quote | ${companyInfo.brandName}`,
  description: `Request a free, no-obligation quote for your household shifting, commercial relocation, or vehicle transportation needs.`,
  openGraph: {
    title: `Get a Free Quote | ${companyInfo.brandName}`,
    description: `Request a free, no-obligation quote for your household shifting, commercial relocation, or vehicle transportation needs.`,
    url: `${seoConfig.siteUrl}/quote`,
  },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
