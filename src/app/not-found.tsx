import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { companyConfig } from '@/config/company';

export const metadata: Metadata = {
  title: `Page Not Found | ${companyConfig.brandName}`,
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">

        {/* Error code */}
        <p className="font-mono text-[5rem] font-extrabold text-brand-blue/10 leading-none select-none">
          404
        </p>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mt-2 mb-3 tracking-tight">
          Page Not Found
        </h1>

        {/* Supporting text */}
        <p className="text-[#6B7280] text-base leading-relaxed mb-8">
          Sorry, we couldn&apos;t find the page you were looking for. It may
          have been moved, renamed, or never existed.
        </p>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-bold text-white bg-brand-blue rounded-xl hover:bg-[#0047B3] transition-colors shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-semibold text-[#374151] rounded-xl border border-[#D1D5DB] bg-white hover:bg-[#F9FAFB] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            Contact Support
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-[#E5E7EB]">
          <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { label: 'Services', href: '/services' },
              { label: 'Get a Quote', href: '/quote' },
              { label: 'Track Shipment', href: '/track' },
              { label: 'Locations', href: '/locations' },
              { label: 'FAQ', href: '/faq' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-blue hover:underline underline-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
