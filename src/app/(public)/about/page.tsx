import React from "react";
import type { Metadata } from "next";
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { seoConfig } from '@/config/seo';
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTAButton } from "@/components/shared/CTAButton";

export const metadata: Metadata = {
  title: `About Us | ${companyConfig.brandName}`,
  description: `Learn about ${companyConfig.brandName}, our mission, vision, and why we are India's most trusted premium logistics and relocation service.`,
  alternates: {
    canonical: `${seoConfig.siteUrl}/about`,
  },
  openGraph: {
    title: `About Us | ${companyConfig.brandName}`,
    description: `Learn about ${companyConfig.brandName}, our mission, vision, and why we are India's most trusted premium logistics and relocation service.`,
    url: `${seoConfig.siteUrl}/about`,
    siteName: companyConfig.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${companyConfig.brandName}`,
    description: `Learn about ${companyConfig.brandName}, our mission, vision, and why we are India's most trusted premium logistics and relocation service.`,
  }
};

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: seoConfig.siteUrl
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About Us",
                item: `${seoConfig.siteUrl}/about`
              }
            ]
          })
        }}
      />
      {/* 1. Hero Section */}
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-16">
        <SectionHeader
          title={`About ${companyConfig.brandName}`}
          subtitle="Building trust through safe, secure, and on-time logistics solutions across India."
          as="h1"
        />
      </SectionContainer>

      {/* 2. Company Overview */}
      <SectionContainer>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed mb-6">
            At <strong>{companyConfig.brandName}</strong>, we believe that moving should be an exciting journey, not a stressful task. Operating as {companyConfig.legalName}, we have established ourselves as a premier logistics partner offering end-to-end relocation services.
          </p>
          <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
            Our commitment to quality, combined with our extensive pan-India network, allows us to deliver {companyConfig.tagline.toLowerCase()}.
          </p>
        </div>
      </SectionContainer>

      {/* 3 & 4. Mission and Vision */}
      <SectionContainer className="bg-brand-blue text-white">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Mission */}
          <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-blue-100 leading-relaxed text-lg">
              To provide seamless, damage-free, and timely logistics and relocation services by leveraging technology, trained professionals, and a customer-first approach.
            </p>
          </div>
          {/* Vision */}
          <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-blue-100 leading-relaxed text-lg">
              To become the most trusted and preferred logistics partner in India, setting industry benchmarks for safety, reliability, and service excellence.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* 5. Why Choose Us Summary */}
      <SectionContainer>
        <SectionHeader
          title="Why Choose Us"
          subtitle="The differentiators that make us the premium choice."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
          {[
            { title: "Trained Professionals", desc: "Expert packers and handlers." },
            { title: "Premium Packing", desc: "Multi-layered damage prevention." },
            { title: "Status Tracking", desc: "Status-based updates on your shipment." },
            { title: "Transit Insurance", desc: "Comprehensive risk coverage." },
            { title: "On-Time Delivery", desc: "Strict adherence to schedules." },
            { title: "24/7 Support", desc: `Always available: ${companyConfig.supportHours}.` },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 bg-white border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-xl font-semibold text-[#000000] mb-2">{feature.title}</h4>
              <p className="text-[#4B5563]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* 6. Pan India Coverage Summary */}
      <SectionContainer className="bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#000000] mb-6">Pan India Coverage</h2>
          <p className="text-lg text-[#4B5563] leading-relaxed">
            From metropolitan cities to remote locations, our robust network spans the entire nation. We ensure that distance is never a barrier to a safe and secure move. Wherever you are moving, {companyConfig.brandName} is already there.
          </p>
        </div>
      </SectionContainer>

      {/* 7. Final CTA */}
      <SectionContainer className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-6 tracking-tight">
          Ready for a stress-free move?
        </h2>
        <p className="text-lg text-[#4B5563] mb-8 max-w-2xl mx-auto">
          Contact our relocation experts today for a personalized survey and a free quote.
        </p>
        <CTAButton href="/quote">
          Get a Free Quote
        </CTAButton>
      </SectionContainer>
    </main>
  );
}
