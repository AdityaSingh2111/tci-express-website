import React from 'react';
import { HeroSection }           from '@/components/home/HeroSection';
import { EmergencyContactBanner} from '@/components/home/EmergencyContactBanner';
import { QuickQuoteWidget }      from '@/components/forms/QuickQuoteWidget';
import { ServicesOverview }      from '@/components/home/ServicesOverview';
import { WhyChooseUs }           from '@/components/home/WhyChooseUs';
import { ProcessSection }        from '@/components/home/ProcessSection';
import { StatisticsSection }     from '@/components/home/StatisticsSection';
import { CoverageAcrossIndia }   from '@/components/home/CoverageAcrossIndia';
import { IndustriesServed }      from '@/components/home/IndustriesServed';
import { GalleryPreview }        from '@/components/gallery/GalleryPreview';
import { PartnerLogos }          from '@/components/home/PartnerLogos';
import { Testimonials }          from '@/components/home/Testimonials';
import { ShipmentTrackingPreview}from '@/components/tracking/ShipmentTrackingPreview';
import { FaqPreview }            from '@/components/home/FaqPreview';
import { BlogPreview }           from '@/components/home/BlogPreview';
import { SeoContentBlock }       from '@/components/seo/SeoContentBlock';
import { ServiceCitiesSeoBlock } from '@/components/seo/ServiceCitiesSeoBlock';
import { FinalCta }              from '@/components/home/FinalCta';

/**
 * Homepage — src/app/page.tsx
 * Assembly order per 07-component-generation-plan.md §9 and
 * 05-homepage-content-blueprint.md section order.
 */
import type { Metadata } from "next";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";

export const metadata: Metadata = {
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  alternates: {
    canonical: seoConfig.siteUrl,
  },
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    siteName: companyInfo.brandName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
  },
};
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MovingCompany",
            name: companyInfo.brandName,
            image: `${seoConfig.siteUrl}${seoConfig.ogImage}`,
            "@id": seoConfig.siteUrl,
            url: seoConfig.siteUrl,
            telephone: companyInfo.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: "TCI House, 69 Institutional Area, Sector 32",
              addressLocality: "Gurugram",
              addressRegion: "Haryana",
              postalCode: "122001",
              addressCountry: "IN"
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 28.4595,
              longitude: 77.0266
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              opens: "00:00",
              closes: "23:59"
            },
            priceRange: "$$"
          })
        }}
      />
      {/* 1. Hero — blueprint §2 → §5 */}
      <HeroSection />
      <EmergencyContactBanner />

      {/* 2. Quick Quote — blueprint §3 (Phase 6 handles full widget) */}
      <QuickQuoteWidget />

      {/* 3. Core Offerings & Value Proposition — blueprint §6, §7 */}
      <ServicesOverview />
      <WhyChooseUs />

      {/* 4. Operations & Scale — blueprint §9, §8, §10 */}
      <StatisticsSection />
      <ProcessSection />
      <CoverageAcrossIndia />
      <ServiceCitiesSeoBlock />
      <ShipmentTrackingPreview />

      {/* 5. Trust & Social Proof — blueprint §15, §14, §16, §12, §13 */}
      <IndustriesServed />
      <PartnerLogos />
      <GalleryPreview />
      <Testimonials />

      {/* 6. Content & SEO */}
      <SeoContentBlock />
      <FaqPreview />
      <BlogPreview />

      {/* 7. Final Conversion — blueprint §20 */}
      <FinalCta />

    </main>
  );
}
