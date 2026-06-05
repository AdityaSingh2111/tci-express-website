import React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { PromotionalPopup }      from "@/components/layout/PromotionalPopup";
import { Navbar }                from "@/components/layout/Navbar";
import { Footer }                from "@/components/layout/Footer";
import { MobileBottomNav }       from "@/components/layout/MobileBottomNav";
import { FloatingWhatsAppButton} from "@/components/layout/FloatingWhatsAppButton";
import { ScrollToTopButton }     from "@/components/layout/ScrollToTopButton";

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
// Note: openGraph.images and twitter.images are intentionally omitted here.
// Next.js auto-generates them from src/app/opengraph-image.png (file-based metadata).
// See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
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
    // images: auto-provided by src/app/opengraph-image.png
  },
  twitter: {
    card:        'summary_large_image',
    site:        seoConfig.twitterHandle,
    title:       seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    // images: auto-provided by src/app/opengraph-image.png
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
    >
      <body className="antialiased font-sans bg-white text-[#000000] relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: companyConfig.brandName,
              legalName: companyConfig.legalName,
              url: seoConfig.siteUrl,
              // schema.org logo points to the primary application logo (not OG image)
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
        {/* ── Top chrome ── */}

        <Navbar />

        {/* ── Page content ── */}
        {/*
          pb-16 on mobile compensates for the fixed MobileBottomNav (56px height).
          pb-0 on md+ where MobileBottomNav is hidden.
        */}
        <div className="pb-16 md:pb-0">
          {children}
          
          {/* ── Bottom chrome ── */}
          <Footer />
        </div>

        {/* ── Fixed overlays ── */}
        <MobileBottomNav />
        <FloatingWhatsAppButton />
        <ScrollToTopButton />
        <PromotionalPopup />
        <AnalyticsProviders />

      </body>
    </html>
  );
}
