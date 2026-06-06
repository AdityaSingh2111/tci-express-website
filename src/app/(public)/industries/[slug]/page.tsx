import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { industriesData } from "@/data/industries";
import { servicesData } from "@/data/services";
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { seoConfig } from '@/config/seo';

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return industriesData.map((industry) => ({ slug: industry.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);

  if (!industry) return { title: "Industry Not Found" };

  return {
    title: `${industry.title} Logistics Solutions | ${companyConfig.brandName}`,
    description: industry.description,
    alternates: {
      canonical: `${seoConfig.siteUrl}/industries/${industry.slug}`,
    },
    openGraph: {
      title: `${industry.title} Logistics | ${companyConfig.brandName}`,
      description: industry.description,
      url: `${seoConfig.siteUrl}/industries/${industry.slug}`,
      siteName: companyConfig.brandName,
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} Logistics Solutions | ${companyConfig.brandName}`,
      description: industry.description,
    }
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);

  if (!industry) notFound();

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
        "name": "Industries",
        "item": `${seoConfig.siteUrl}/industries`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": industry.title,
        "item": `${seoConfig.siteUrl}/industries/${industry.slug}`
      }
    ]
  };

  const solutions = [
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Specialized Operations",
      desc: "Processes and equipment optimized for your industry's specific requirements.",
    },
    {
      icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
      title: "Dedicated Account Team",
      desc: "A single point of contact for streamlined communication and priority support.",
    },
    {
      icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253",
      title: "Pan-India Coverage",
      desc: "Reliable logistics across all major cities and remote locations throughout India.",
    },
    {
      icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
      title: "Scalable Capacity",
      desc: "Operations that scale up or down to match your seasonal and peak demand.",
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
            <Link href="/industries" className="text-white/40 text-sm hover:text-white/70 transition-colors">Industries</Link>
            <span className="text-white/25 text-sm">/</span>
            <span className="text-white/60 text-sm">{industry.title}</span>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#60A5FA] mb-3">
            Industry Solutions
          </p>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-bold text-white leading-[1.1] tracking-[-0.025em] mb-3 max-w-2xl">
            Logistics for {industry.title}
          </h1>
          <p className="text-base text-white/60 max-w-xl leading-relaxed mb-6">
            {industry.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-red rounded-lg hover:bg-[#CC2A2A] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              Request a Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white/70 rounded-lg border border-white/15 hover:border-white/30 hover:text-white transition-all"
            >
              Speak to a Specialist
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="w-full py-10 md:py-14 bg-white">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-blue mb-3">Industry overview</p>
            <h2 className="text-xl sm:text-2xl font-bold text-background-dark mb-4 tracking-[-0.02em]">
              Understanding {industry.title} Logistics Challenges
            </h2>
            <p className="text-base text-[#6B7280] leading-relaxed">
              We understand the unique logistics challenges faced by {industry.title.toLowerCase()}. Our tailored solutions ensure that your supply chain remains robust, efficient, and cost-effective — allowing you to focus on your core objectives while we handle the complexity of movement and storage.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="w-full py-10 md:py-14 bg-[#F8FAFC]">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-blue mb-3">What we provide</p>
          <h2 className="text-xl sm:text-2xl font-bold text-background-dark mb-8 tracking-[-0.02em]">Custom Solutions for {industry.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {solutions.map((s) => (
              <div key={s.title} className="bg-white p-5 rounded-xl border border-[#E5E7EB]">
                <div className="w-9 h-9 rounded-lg bg-[#EEF4FF] flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-background-dark mb-1.5">{s.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="w-full py-10 md:py-14 bg-white">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-blue mb-3">Related services</p>
          <h2 className="text-xl sm:text-2xl font-bold text-background-dark mb-6 tracking-[-0.02em]">Recommended Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicesData.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-start gap-3 p-4 rounded-xl border border-[#E5E7EB] hover:border-brand-blue/25 hover:shadow-[0_4px_20px_rgba(0,82,204,0.08)] transition-all duration-200"
              >
                <span className="w-7 h-7 rounded-lg bg-[#EEF4FF] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-background-dark group-hover:text-brand-blue transition-colors">{s.title}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-2">{s.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-14 bg-background-dark">
        <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#60A5FA] mb-3">Partner with us</p>
          <h2 className="text-2xl sm:text-[1.875rem] font-bold text-white mb-4 tracking-[-0.025em]">
            Need an Industry-Specific Solution?
          </h2>
          <p className="text-sm text-white/50 mb-7 max-w-md mx-auto leading-relaxed">
            Speak with our specialists to design a logistics framework that fits your unique business needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-brand-red rounded-lg hover:bg-[#CC2A2A] transition-colors"
            >
              Request a Consultation
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
