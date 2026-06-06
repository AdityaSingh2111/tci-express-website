import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { citiesData } from "@/data/cities";
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { seoConfig } from '@/config/seo';
import { servicesData } from "@/data/services";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { FAQItem } from "@/components/shared/FAQItem";
import { CTAButton } from "@/components/shared/CTAButton";
import { slugify } from "@/utils/slugify";

// 1. Generate Static Params for all cities
export function generateStaticParams() {
  return citiesData.map((city) => ({
    city: slugify(city.name),
  }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const targetCity = city.toLowerCase();
  const cityObj = citiesData.find((c) => slugify(c.name) === targetCity);
  if (!cityObj) return {};

  return {
    title: `Best Packers and Movers in ${cityObj.name} | ${companyConfig.brandName}`,
    description: `Looking for reliable logistics and shifting services in ${cityObj.name}? ${companyConfig.brandName} offers premium, secure, and on-time delivery across ${cityObj.name} and India.`,
    alternates: {
      canonical: `${seoConfig.siteUrl}/locations/${slugify(cityObj.name)}`,
    },
    openGraph: {
      title: `Top Logistics Services in ${cityObj.name} | ${companyConfig.brandName}`,
      description: `Premium shifting and commercial logistics in ${cityObj.name}.`,
      url: `${seoConfig.siteUrl}/locations/${slugify(cityObj.name)}`,
      siteName: companyConfig.brandName,
    },
    twitter: {
      card: "summary_large_image",
      title: `Best Packers and Movers in ${cityObj.name} | ${companyConfig.brandName}`,
      description: `Looking for reliable logistics and shifting services in ${cityObj.name}? ${companyConfig.brandName} offers premium, secure, and on-time delivery across ${cityObj.name} and India.`,
    }
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const targetCity = city.toLowerCase();
  const cityObj = citiesData.find((c) => slugify(c.name) === targetCity);
  
  if (!cityObj) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": seoConfig.siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": `${seoConfig.siteUrl}/locations`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cityObj.name,
        "item": `${seoConfig.siteUrl}/locations/${slugify(cityObj.name)}`
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* City Hero */}
      <SectionContainer className="bg-brand-blue text-white pt-24 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-6">
            Premium Logistics & Relocation Services in <span className="text-blue-200">{cityObj.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
            Whether you are shifting your home, moving an office, or require commercial freight transport in {cityObj.name}, {companyConfig.brandName} delivers unmatched reliability.
          </p>
          <div className="flex justify-center">
            <a href="/quote" className="inline-flex justify-center items-center px-8 py-4 bg-[#16A34A] text-white font-bold rounded-md hover:bg-[#15803d] transition-colors shadow-lg">
              Get a Free Quote for {cityObj.name}
            </a>
          </div>
        </div>
      </SectionContainer>

      {/* Services in City */}
      <SectionContainer className="bg-[#F9FAFB]">
        <SectionHeader
          title={`Our Services in ${cityObj.name}`}
          subtitle={`We provide end-to-end logistics solutions tailored for the unique requirements of ${cityObj.name}.`}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {servicesData.slice(0, 6).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </SectionContainer>

      {/* Coverage Content */}
      <SectionContainer className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#000000] mb-6">Pan-India Connectivity from {cityObj.name}</h2>
          <p className="text-lg text-[#4B5563] leading-relaxed mb-8">
            Our {cityObj.name} operations are fully integrated into our national network. We guarantee safe, timely dispatch and delivery to any destination across the country. With our GPS-enabled fleet and 24/7 support, your shipment is always tracked and secured.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {citiesData.filter(c => c.code !== cityObj.code).slice(0, 5).map(c => (
              <span key={c.code} className="inline-flex items-center px-3 py-1 rounded-full bg-[#F3F4F6] text-sm font-medium text-[#4B5563]">
                To {c.name}
              </span>
            ))}
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#E5E7EB] text-sm font-medium text-[#4B5563]">
              + India Wide
            </span>
          </div>
        </div>
      </SectionContainer>

      {/* FAQ Preview */}
      <SectionContainer className="bg-[#F9FAFB]">
        <SectionHeader
          title={`Frequently Asked Questions about moving in ${cityObj.name}`}
        />
        <div className="max-w-3xl mx-auto mt-10 space-y-4">
          <FAQItem
            faq={{
              category: "General",
              question: `Do you provide door-to-door shifting in ${cityObj.name}?`,
              answer: `Yes, our team handles the entire process from packing your items at your current address in ${cityObj.name} to unloading and unpacking at your final destination.`
            }}
          />
          <FAQItem
            faq={{
              category: "General",
              question: `Is my shipment insured during transit from ${cityObj.name}?`,
              answer: "Absolutely. We provide comprehensive transit insurance to ensure your goods are fully covered against any unforeseen circumstances."
            }}
          />
          <FAQItem
            faq={{
              category: "General",
              question: `How can I track my shipment from ${cityObj.name}?`,
              answer: "You will receive a Consignment/LR number upon booking. You can use our online tracking portal to monitor your shipment status."
            }}
          />
        </div>
      </SectionContainer>

      {/* Quote CTA */}
      <SectionContainer className="text-center border-t border-[#E5E7EB]">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-6 tracking-tight">
          Ready to move with the best in {cityObj.name}?
        </h2>
        <p className="text-lg text-[#4B5563] mb-8 max-w-2xl mx-auto">
          Contact our local experts today for a customized logistics plan and a transparent, no-obligation quote.
        </p>
        <CTAButton href="/quote">
          Request Your Free Estimate
        </CTAButton>
      </SectionContainer>
    </main>
  );
}
