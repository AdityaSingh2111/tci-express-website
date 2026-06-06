import React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { seoConfig } from "@/config/seo";
import { companyConfig } from "@/config/company";
import { contactConfig } from "@/config/contact";
import { socialConfig } from "@/config/social";
import { AnalyticsProviders } from "@/components/analytics/AnalyticsProviders";

// ── Fonts ─────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// ── Global Metadata ───────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default:  seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    siteName:    companyConfig.brandName,
    title:       seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
  },
  twitter: {
    card:        'summary_large_image',
    site:        seoConfig.twitterHandle,
    title:       seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans bg-white text-[#000000] relative min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: companyConfig.brandName,
              legalName: companyConfig.legalName,
              url: seoConfig.siteUrl,
              logo: `${seoConfig.siteUrl}/logos/logo-master.svg`,
              sameAs: [
                socialConfig.facebook,
                socialConfig.twitter,
                socialConfig.linkedin,
                socialConfig.instagram
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: contactConfig.phone,
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["en", "hi"]
              }
            })
          }}
        />
        {children}
        <AnalyticsProviders />
      </body>
    </html>
  );
}
