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

import { seoConfig } from "@/data/seo";
import { companyInfo } from "@/data/company";

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
  metadataBase: new URL(
    seoConfig.siteUrl.startsWith("http")
      ? seoConfig.siteUrl
      : "https://example.com"
  ),
  title: {
    default:  seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    siteName:    companyInfo.brandName,
    title:       seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images:      [{ url: seoConfig.ogImage }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images:      [seoConfig.ogImage],
  },
  robots: {
    index:             true,
    follow:            true,
    googleBot: {
      index:  true,
      follow: true,
    },
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
              name: companyInfo.brandName,
              legalName: companyInfo.legalName,
              url: seoConfig.siteUrl,
              logo: `${seoConfig.siteUrl}${seoConfig.ogImage}`,
              sameAs: [
                "https://www.facebook.com/tciexpress",
                "https://twitter.com/tciexpress",
                "https://www.linkedin.com/company/tci-express-ltd",
                "https://www.instagram.com/tciexpress"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: companyInfo.phone,
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

      </body>
    </html>
  );
}
