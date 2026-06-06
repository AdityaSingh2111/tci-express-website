import React from "react";
import type { Metadata } from "next";
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { seoConfig } from '@/config/seo';
import { TrackClient } from "./TrackClient";

export const metadata: Metadata = {
  title: `Track Your Shipment | ${companyConfig.brandName}`,
  description: `Track your household shifting, vehicle transport, or commercial logistics shipment status with ${companyConfig.brandName}.`,
  openGraph: {
    title: `Track Your Shipment | ${companyConfig.brandName}`,
    description: `Track your household shifting, vehicle transport, or commercial logistics shipment status with ${companyConfig.brandName}.`,
    url: `${seoConfig.siteUrl}/track`,
  },
};

export default function TrackPage() {
  return <TrackClient />;
}
