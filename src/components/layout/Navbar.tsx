'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { companyInfo } from '@/data/company';
import { servicesData } from '@/data/services';
import { industriesData } from '@/data/industries';

/* 
   Navbar ─ Next.js 16 / Mobile-reliable version
   - Body scroll lock via position:fixed on <html> (touch-safe on iOS Safari)
   - z-index hierarchy: header=40, backdrop=55, panel=60
   - Hamburger always visible on mobile (<md), panel is right slide-over
*/

type DropdownKey = 'services' | 'industries' | null;
const PANEL_ID = 'mobile-nav-panel';

export function Navbar() {
  const [scrolled, setScrolled]  = useState(false);
  const [menuOpen, setMenuOpen]  = useState(false);
  const [dropdown, setDropdown]  = useState<DropdownKey>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevScrollY = useRef(0);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 4); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setMenuOpen(false); setDropdown(null); }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Body scroll lock — iOS-safe via top offset trick
  useEffect(() => {
    if (menuOpen) {
      prevScrollY.current = window.scrollY;
      document.body.style.top = `-${prevScrollY.current}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, prevScrollY.current);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  function openDropdown(key: DropdownKey) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDropdown(key);
  }
  function scheduleClose() {
    closeTimerRef.current = setTimeout(() => setDropdown(null), 140);
  }

  return (
    <>
      {/* ── Header ── */}
      <header
        className={[
          'sticky top-0 z-40 w-full',
          'transition-all duration-200 ease-out',
          scrolled
            ? 'bg-white/96 backdrop-blur-md border-b border-[#E5E7EB] shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
            : 'bg-white border-b border-[#E5E7EB]/60',
        ].join(' ')}
      >
        <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-[height] duration-200 ${scrolled ? 'h-14' : 'h-16'}`}>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
              aria-label={`${companyInfo.brandName} — Home`}
            >
              <span className="w-2 h-2 rounded-full bg-[#0052CC] shrink-0" aria-hidden="true" />
              <span className="font-bold text-[1.0625rem] text-[#0D1117] tracking-[-0.025em] leading-none select-none">
                {companyInfo.brandName}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-0.5">
              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdown('services')}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-[#374151] hover:text-[#0052CC] hover:bg-[#F5F7FF] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
                  onFocus={() => openDropdown('services')}
                  onBlur={scheduleClose}
                >
                  Services
                  <svg className="w-3 h-3 opacity-40" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </Link>
                {dropdown === 'services' && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[480px] bg-white rounded-xl border border-[#E5E7EB] shadow-[0_8px_32px_rgba(0,0,0,0.10)] p-4 z-50"
                    onMouseEnter={() => openDropdown('services')}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="grid grid-cols-2 gap-0.5">
                      {servicesData.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={() => setDropdown(null)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#374151] hover:bg-[#F5F7FF] hover:text-[#0052CC] transition-colors duration-150"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]/30 shrink-0" />
                          {s.title}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#F3F4F6]">
                      <Link
                        href="/services"
                        onClick={() => setDropdown(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0052CC] hover:underline"
                      >
                        View all services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Industries dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdown('industries')}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href="/industries"
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-[#374151] hover:text-[#0052CC] hover:bg-[#F5F7FF] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
                  onFocus={() => openDropdown('industries')}
                  onBlur={scheduleClose}
                >
                  Industries
                  <svg className="w-3 h-3 opacity-40" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </Link>
                {dropdown === 'industries' && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-64 bg-white rounded-xl border border-[#E5E7EB] shadow-[0_8px_32px_rgba(0,0,0,0.10)] p-2 z-50"
                    onMouseEnter={() => openDropdown('industries')}
                    onMouseLeave={scheduleClose}
                  >
                    {industriesData.map((i) => (
                      <Link
                        key={i.slug}
                        href={`/industries/${i.slug}`}
                        onClick={() => setDropdown(null)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#374151] hover:bg-[#F5F7FF] hover:text-[#0052CC] transition-colors duration-150"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]/30 shrink-0" />
                        {i.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Static nav links */}
              {([
                { label: 'Locations', href: '/locations' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'About', href: '/about' },
              ] as const).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium rounded-md text-[#374151] hover:text-[#0052CC] hover:bg-[#F5F7FF] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/track"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md text-[#374151] hover:text-[#0052CC] hover:bg-[#F5F7FF] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Track
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#0052CC] hover:bg-[#0047B3] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls={PANEL_ID}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={[
                'relative z-50',
                'flex md:hidden items-center justify-center',
                'w-11 h-11 -mr-1.5 rounded-lg',
                'text-[#374151] transition-colors duration-150',
                menuOpen ? 'bg-[#F3F4F6] text-[#0D1117]' : 'hover:bg-[#F3F4F6]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]',
                'touch-manipulation',
              ].join(' ')}
            >
              <svg
                className="w-5 h-5 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={[
          'fixed inset-0 z-[55] bg-black/50 md:hidden',
          'transition-opacity duration-250 ease-out',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Mobile slide-over panel — Premium redesign */}
      <div
        id={PANEL_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={[
          'fixed top-0 right-0 bottom-0 z-[60] w-[min(320px,92vw)]',
          'bg-white flex flex-col md:hidden',
          'shadow-[0_20px_60px_rgba(0,0,0,0.18)]',
          'transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          menuOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible pointer-events-none',
        ].join(' ')}
      >
        {/* Panel header with logo + close button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F3F4F6]">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] rounded-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#0052CC] shrink-0" aria-hidden="true" />
            <span className="font-bold text-[15px] text-[#0D1117] tracking-[-0.025em] leading-none select-none">
              {companyInfo.brandName}
            </span>
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B7280] hover:text-[#0D1117] hover:bg-[#F3F4F6] transition-colors touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto overscroll-contain pb-safe">
          <nav className="px-2 py-3 flex flex-col">
            
            {/* Services accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-[15px] font-semibold text-[#0D1117] hover:bg-[#F9FAFB] transition-colors focus:outline-none touch-manipulation"
                aria-expanded={mobileServicesOpen}
              >
                <span className="flex items-center gap-3 text-[#374151]">
                  <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  Services
                </span>
                <svg className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="ml-8 flex flex-col gap-0.5 pb-2">
                  {servicesData.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[14px] text-[#4B5563] hover:bg-[#F5F7FF] hover:text-[#0052CC] transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#0052CC]/40 shrink-0" />
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Industries accordion */}
            <div>
              <button
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-[15px] font-semibold text-[#0D1117] hover:bg-[#F9FAFB] transition-colors focus:outline-none touch-manipulation"
                aria-expanded={mobileIndustriesOpen}
              >
                <span className="flex items-center gap-3 text-[#374151]">
                  <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                  Industries
                </span>
                <svg className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-200 ${mobileIndustriesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileIndustriesOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="ml-8 flex flex-col gap-0.5 pb-2">
                  {industriesData.map((i) => (
                    <Link
                      key={i.slug}
                      href={`/industries/${i.slug}`}
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[14px] text-[#4B5563] hover:bg-[#F5F7FF] hover:text-[#0052CC] transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#0052CC]/40 shrink-0" />
                      {i.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-1.5 border-t border-[#F3F4F6] mx-3" />

            {/* Flat links grouped logically */}
            {[
              { label: 'Locations', href: '/locations', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm4.5 0c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /> },
              { label: 'Gallery', href: '/gallery', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /> },
            ].map(({ label, href, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-semibold text-[#374151] hover:bg-[#F9FAFB] hover:text-[#0052CC] transition-colors"
              >
                <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  {icon}
                </svg>
                {label}
              </Link>
            ))}

            <div className="my-1.5 border-t border-[#F3F4F6] mx-3" />

            {[
              { label: 'About', href: '/about', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /> },
              { label: 'FAQ', href: '/faq', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /> },
              { label: 'Contact', href: '/contact', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /> },
            ].map(({ label, href, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-semibold text-[#374151] hover:bg-[#F9FAFB] hover:text-[#0052CC] transition-colors"
              >
                <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  {icon}
                </svg>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Panel footer CTA */}
        <div className="p-4 border-t border-[#F3F4F6] bg-[#F9FAFB]">
          <div className="flex flex-col gap-2">
            <Link
              href="/quote"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#0052CC] hover:bg-[#0047B3] text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] active:scale-[0.98]"
            >
              Get Free Quote
            </Link>
            <Link
              href="/track"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[14px] font-semibold text-[#374151] transition-all touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D1D5DB] active:scale-[0.98]"
            >
              Track Shipment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
