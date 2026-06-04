import React from "react";
import type { Metadata } from "next";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";
import { TrackClient } from "./TrackClient";

export const metadata: Metadata = {
  title: `Track Your Shipment | ${companyInfo.brandName}`,
  description: `Track your household shifting, vehicle transport, or commercial logistics shipment status with ${companyInfo.brandName}.`,
  openGraph: {
    title: `Track Your Shipment | ${companyInfo.brandName}`,
    description: `Track your household shifting, vehicle transport, or commercial logistics shipment status with ${companyInfo.brandName}.`,
    url: `${seoConfig.siteUrl}/track`,
  },
};

export default function TrackPage() {
  return <TrackClient />;
}
