import React from "react";
import type { Metadata } from "next";
import { companyInfo } from "@/data/company";
import { seoConfig } from "@/data/seo";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { SecondaryButton } from "@/components/shared/SecondaryButton";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: `Contact Us | ${companyInfo.brandName}`,
  description: `Get in touch with ${companyInfo.brandName} for premium logistics, household shifting, and corporate relocation services across India.`,
  alternates: {
    canonical: `${seoConfig.siteUrl}/contact`,
  },
  openGraph: {
    title: `Contact Us | ${companyInfo.brandName}`,
    description: `Get in touch with ${companyInfo.brandName} for premium logistics, household shifting, and corporate relocation services across India.`,
    url: `${seoConfig.siteUrl}/contact`,
    siteName: companyInfo.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${companyInfo.brandName}`,
    description: `Get in touch with ${companyInfo.brandName} for premium logistics, household shifting, and corporate relocation services across India.`,
  }
};

export default function ContactPage() {
  const whatsappNumber = companyInfo.whatsapp.replace(/\D/g, "");
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi, I would like to inquire about relocation services."
  )}`;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: companyInfo.brandName,
            image: seoConfig.ogImage,
            telephone: companyInfo.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: companyInfo.address,
              addressCountry: "IN"
            }
          })
        }}
      />
      {/* 1. Contact Hero */}
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-16 border-b border-[#E5E7EB]">
        <SectionHeader
          title="Contact Us"
          subtitle="We are here to help. Reach out to our relocation experts 24/7."
          as="h1"
        />
      </SectionContainer>

      {/* 2 & 3. Contact Info and Form */}
      <SectionContainer>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Left: Contact Information Cards */}
          <div>
            <h2 className="text-2xl font-bold text-[#000000] mb-8">
              Get in Touch
            </h2>
            <div className="flex flex-col gap-6">
              {/* Phone Card */}
              <div className="flex items-start gap-4 p-5 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
                <div className="w-10 h-10 flex-shrink-0 bg-[#F9FAFB] rounded-full flex items-center justify-center text-[#0052CC]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#000000]">Phone</h3>
                  <p className="text-[14px] text-[#4B5563] mb-1.5">{companyInfo.phone}</p>
                  {/* 5. Call CTA */}
                  <a href={`tel:${companyInfo.phone}`} className="text-[13px] font-bold text-[#0052CC] hover:underline">
                    Call Now &rarr;
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="flex items-start gap-4 p-5 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
                <div className="w-10 h-10 flex-shrink-0 bg-[#F9FAFB] rounded-full flex items-center justify-center text-[#16A34A]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#000000]">WhatsApp</h3>
                  <p className="text-[14px] text-[#4B5563] mb-1.5">{companyInfo.whatsapp}</p>
                  {/* 4. WhatsApp CTA */}
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold text-[#16A34A] hover:underline">
                    Chat on WhatsApp &rarr;
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-4 p-5 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
                <div className="w-10 h-10 flex-shrink-0 bg-[#F9FAFB] rounded-full flex items-center justify-center text-[#0052CC]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#000000]">Email</h3>
                  <p className="text-[14px] text-[#4B5563] mb-1.5">{companyInfo.email}</p>
                  <a href={`mailto:${companyInfo.email}`} className="text-[13px] font-bold text-[#0052CC] hover:underline">
                    Send an Email &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form UI */}
          <ContactForm />
        </div>
      </SectionContainer>

      {/* 6. Map Placeholder Section */}
      <SectionContainer className="bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Our Headquarters"
            subtitle={companyInfo.address}
          />
          <div className="w-full h-[400px] bg-[#E5E7EB] rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
            {/* Map visual placeholder */}
            <div className="text-center">
              <svg className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <p className="text-[#6B7280] font-medium">Interactive Map Integration Ready</p>
              <p className="text-sm text-[#9CA3AF] mt-1">(Google Maps / Mapbox embed goes here)</p>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 7. Final CTA */}
      <SectionContainer className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-6 tracking-tight">
          Want a precise estimate?
        </h2>
        <p className="text-lg text-[#4B5563] mb-8 max-w-2xl mx-auto">
          Skip the form and start building your custom quote right away. Our pre-move survey is 100% free.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <SecondaryButton href="/">
            Return to Home
          </SecondaryButton>
          <PrimaryButton href="/quote">
            Get a Free Quote
          </PrimaryButton>
        </div>
      </SectionContainer>
    </main>
  );
}
