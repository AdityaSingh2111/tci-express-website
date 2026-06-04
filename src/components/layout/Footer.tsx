import React from 'react';
import Link from 'next/link';
import { companyInfo } from '@/data/company';
import { navigationConfig } from '@/data/navigation';

/**
 * Footer
 * Source: 06-homepage-ui-specification.md §22, 03-design-system.md §14
 *
 * Design system §14:
 *   - True Black (#000000) background
 *   - True White text at 70% opacity for links
 *   - 4-column structured grid (Company, Services, Resources, Legal)
 *   - Bottom bar: copyright + social separated by 1px #333333 border
 *
 * Pure Server Component — no interactivity needed.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#000000] text-white">
      {/* Main grid */}
      <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ── Brand column (spans 1 on lg for balance) ── */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className={
                'inline-block font-bold text-xl text-white tracking-[-0.02em] mb-3 ' +
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm'
              }
            >
              {companyInfo.brandName}
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              {companyInfo.tagline}
            </p>
            <address className="not-italic text-sm text-white/60 leading-relaxed space-y-1">
              <p>{companyInfo.address}</p>
              <p>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="hover:text-white transition-colors duration-[150ms] focus-visible:outline-white"
                >
                  {companyInfo.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="hover:text-white transition-colors duration-[150ms] focus-visible:outline-white"
                >
                  {companyInfo.email}
                </a>
              </p>
            </address>
          </div>

          {/* ── Link column groups ── */}
          {navigationConfig.footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {group.items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={
                        'text-sm text-white/60 ' +
                        'hover:text-white ' +
                        'transition-colors duration-[150ms] ease-out ' +
                        'focus-visible:outline-2 focus-visible:outline-white rounded-sm'
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#333333]">
        <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/60 text-center sm:text-left">
              &copy; {year} {companyInfo.legalName}. All rights reserved.
              {' '}GST Registered Business.
            </p>

            {/* Social icons — hidden on mobile (MobileBottomNav covers them) */}
            <div className="hidden sm:flex items-center gap-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
                className={
                  'text-white/60 hover:text-white ' +
                  'transition-colors duration-[150ms] ' +
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm'
                }
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>

              {/* Phone */}
              <a
                href={`tel:${companyInfo.phone}`}
                aria-label="Call us"
                className={
                  'text-white/60 hover:text-white ' +
                  'transition-colors duration-[150ms] ' +
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm'
                }
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
