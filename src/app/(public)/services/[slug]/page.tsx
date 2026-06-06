import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicesData } from "@/data/services";
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { seoConfig } from '@/config/seo';

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | ${companyConfig.brandName}`,
    description: service.shortDescription,
    alternates: {
      canonical: `${seoConfig.siteUrl}/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | ${companyConfig.brandName}`,
      description: service.shortDescription,
      url: `${seoConfig.siteUrl}/services/${service.slug}`,
      siteName: companyConfig.brandName,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ${companyConfig.brandName}`,
      description: service.shortDescription,
    }
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) notFound();

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
        "name": "Services",
        "item": `${seoConfig.siteUrl}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `${seoConfig.siteUrl}/services/${service.slug}`
      }
    ]
  };

  const benefits = [
    {
      icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
      title: "Expert Handling",
      desc: "Trained professionals managing your requirements from start to finish.",
    },
    {
      icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "On-Time Execution",
      desc: "Strict adherence to agreed timelines and pre-planned schedules.",
    },
    {
      icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
      title: "Insured & Secure",
      desc: "Comprehensive transit insurance options for complete peace of mind.",
    },
  ];

  const steps = [
    {
      n: "01",
      title: "Survey & Planning",
      desc: "We assess your specific requirements and draft a custom logistics plan.",
    },
    {
      n: "02",
      title: "Packing & Pickup",
      desc: "Our trained crew arrives with premium materials and handles all packing.",
    },
    {
      n: "03",
      title: "Safe Transit",
      desc: "Your goods are transported in our modern, well-maintained fleet.",
    },
    {
      n: "04",
      title: "Delivery & Review",
      desc: "Final handover at the destination with a quality assurance check.",
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="relative w-full bg-brand-navy overflow-hidden pt-14 pb-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none" style={{ background: "radial-gradient(circle, #0052CC 0%, transparent 70%)" }} aria-hidden="true" />
        <div className="relative w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/services" className="text-white/40 text-sm hover:text-white/70 transition-colors">Services</Link>
            <span className="text-white/25 text-sm">/</span>
            <span className="text-white/60 text-sm">{service.title}</span>
          </div>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-bold text-white leading-[1.1] tracking-[-0.025em] mb-3 max-w-2xl">
            {service.title}
          </h1>
          <p className="text-base text-white/60 max-w-xl leading-relaxed mb-6">
            {service.shortDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-red rounded-lg hover:bg-[#CC2A2A] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              Get a Free Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white/70 rounded-lg border border-white/15 hover:border-white/30 hover:text-white transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Speak to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="w-full py-10 md:py-14 bg-white">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-blue mb-3">Overview</p>
            <h2 className="text-xl sm:text-2xl font-bold text-background-dark mb-4 tracking-[-0.02em]">
              Why Choose Our {service.title} Service?
            </h2>
            <p className="text-base text-[#6B7280] leading-relaxed">
              Our {service.title.toLowerCase()} service is designed to give you complete peace of mind. We handle every aspect with precision, using industry-best practices, trained professionals, and premium-grade materials to ensure your specific requirements are met with excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-10 md:py-14 bg-[#F8FAFC]">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-blue mb-3">Key benefits</p>
          <h2 className="text-xl sm:text-2xl font-bold text-background-dark mb-8 tracking-[-0.02em]">What You Get</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white p-5 rounded-xl border border-[#E5E7EB]">
                <div className="w-9 h-9 rounded-lg bg-[#EEF4FF] flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-background-dark mb-1.5">{b.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w-full py-10 md:py-14 bg-white">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-blue mb-3">How it works</p>
          <h2 className="text-xl sm:text-2xl font-bold text-background-dark mb-8 tracking-[-0.02em]">Our Process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.n} className="relative flex flex-col p-5 rounded-xl border border-[#E5E7EB]">
                <span className="font-mono text-2xl font-bold text-brand-blue/20 mb-3">{s.n}</span>
                <h3 className="text-sm font-semibold text-background-dark mb-1.5">{s.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-10 md:py-14 bg-[#F8FAFC]">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-blue mb-3">Common questions</p>
          <h2 className="text-xl sm:text-2xl font-bold text-background-dark mb-6 tracking-[-0.02em]">Frequently Asked</h2>
          <div className="max-w-2xl space-y-3">
            {[
              { q: "How long does the process take?", a: "Timelines vary based on specific requirements. We provide a detailed schedule during the initial survey and consultation." },
              { q: "Is the service insured?", a: "Yes. Comprehensive transit insurance options are available to protect your goods against all unforeseen circumstances." },
              { q: "Do you serve Pan-India?", a: `Yes. ${companyConfig.brandName} operates across all major cities and regions in India.` },
            ].map((item) => (
              <div key={item.q} className="bg-white p-5 rounded-xl border border-[#E5E7EB]">
                <h3 className="text-sm font-semibold text-background-dark mb-2">{item.q}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-14 bg-background-dark">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#60A5FA] mb-3">Get started</p>
          <h2 className="text-2xl sm:text-[1.875rem] font-bold text-white mb-4 tracking-[-0.025em]">
            Ready to Book {service.title}?
          </h2>
          <p className="text-sm text-white/50 mb-7 max-w-md mx-auto leading-relaxed">
            Contact us today to receive a customized quote for your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-brand-red rounded-lg hover:bg-[#CC2A2A] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              Request a Free Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white/70 rounded-lg border border-white/15 hover:border-white/30 hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
