import React from "react";
import type { Metadata } from "next";
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { seoConfig } from '@/config/seo';
import { servicesData } from "@/data/services";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { CTAButton } from "@/components/shared/CTAButton";

export const metadata: Metadata = {
  title: `Our Services | ${companyConfig.brandName}`,
  description: `Explore ${companyConfig.brandName}'s premium logistics and relocation services, including household shifting, corporate relocation, and vehicle transportation.`,
  openGraph: {
    title: `Our Services | ${companyConfig.brandName}`,
    description: `Explore ${companyConfig.brandName}'s premium logistics and relocation services, including household shifting, corporate relocation, and vehicle transportation.`,
    url: `${seoConfig.siteUrl}/services`,
  },
};

export default function ServicesPage() {
  return (
    <main>
      {/* 1. Hero Section */}
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-16">
        <SectionHeader
          title="Premium Relocation Services"
          subtitle="End-to-end logistics solutions tailored to your unique requirements, ensuring a safe and timely delivery."
          as="h1"
        />
      </SectionContainer>

      {/* 2. Services Grid */}
      <SectionContainer>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {servicesData.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </SectionContainer>

      {/* 3. Service Process Summary */}
      <SectionContainer className="bg-[#F9FAFB]">
        <SectionHeader
          title="How It Works"
          subtitle="A streamlined process designed for maximum transparency and minimum stress."
        />
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center mt-12">
          {[
            { step: "01", title: "Survey & Quote", desc: "We assess your requirements and provide a transparent estimate." },
            { step: "02", title: "Premium Packing", desc: "Items are packed using multi-layered protective materials." },
            { step: "03", title: "Secure Transit", desc: "GPS-enabled fleet ensures safe and trackable transportation." },
            { step: "04", title: "Unpacking & Setup", desc: "We deliver and assist with unpacking at your destination." },
          ].map((item, idx) => (
            <div key={idx} className="relative p-6 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-brand-blue/20 mb-4">{item.step}</div>
              <h3 className="text-xl font-semibold text-[#000000] mb-2">{item.title}</h3>
              <p className="text-sm text-[#4B5563]">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* 4. Why Choose Us */}
      <SectionContainer>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-[#000000]">Why Choose {companyConfig.brandName}?</h2>
          <p className="text-lg text-[#4B5563] leading-relaxed">
            Every service we offer is backed by our commitment to zero-damage handling, strict timeline adherence, and complete transparency. With a massive pan-India network, we possess the capability to execute complex relocations smoothly.
          </p>
        </div>
      </SectionContainer>

      {/* 5. Final CTA */}
      <SectionContainer className="text-center bg-brand-blue text-white rounded-none md:rounded-3xl max-w-[1216px] mx-auto md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
          Ready to experience hassle-free relocation?
        </h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Let our experts handle the heavy lifting while you focus on settling into your new place.
        </p>
        {/* We use a custom button design for dark background if CTAButton expects light bg, but CTAButton works well usually or we can use PrimaryButton but styling might differ */}
        <div className="bg-white text-brand-blue inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md shadow-sm hover:bg-gray-50 transition-colors">
          <a href="/quote">Request a Free Quote</a>
        </div>
      </SectionContainer>
    </main>
  );
}
