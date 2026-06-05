'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';
import { mediaConfig } from '@/config/media';
import { brandingConfig } from '@/config/branding';
import Image from 'next/image';
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<DropdownKey>(null);
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
      window.scrollTo({ left: 0, top: prevScrollY.current, behavior: 'instant' });
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
        <div className="w-full max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between transition-[height] duration-300 h-16 ${scrolled ? 'md:h-16' : 'md:h-20'}`}>

            {/* Desktop Logo */}
            <Link
              href="/"
              className="hidden md:flex items-center gap-2 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue justify-self-start"
              aria-label={`${companyConfig.brandName} — Home`}
            >
              <Image
                src={mediaConfig.logoPrimary}
                alt={companyConfig.brandName}
                width={brandingConfig.logoSizes.navbarDesktop.width}
                height={brandingConfig.logoSizes.navbarDesktop.height}
                className={`object-contain transition-all duration-300 w-auto ${scrolled ? 'h-14' : 'h-20'}`}
                priority
              />
            </Link>

            {/* Mobile Logo */}
            <Link
              href="/"
              className="flex md:hidden items-center gap-2 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              aria-label={`${companyConfig.brandName} — Home`}
            >
              <Image
                src={mediaConfig.logoPrimary}
                alt={companyConfig.brandName}
                width={brandingConfig.logoSizes.navbarMobile.width}
                height={brandingConfig.logoSizes.navbarMobile.height}
                className={`object-contain transition-all duration-300 w-auto ${scrolled ? 'h-10' : 'h-14'}`}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-0.5 justify-self-center">
              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdown('services')}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 px-2 py-1.5 text-[15px] font-medium rounded-md text-[#374151] hover:text-brand-blue hover:bg-[#F5F7FF] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
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
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#374151] hover:bg-[#F5F7FF] hover:text-brand-blue transition-colors duration-150"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/30 shrink-0" />
                          {s.title}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#F3F4F6]">
                      <Link
                        href="/services"
                        onClick={() => setDropdown(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
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
                  className="inline-flex items-center gap-1 px-2 py-1.5 text-[15px] font-medium rounded-md text-[#374151] hover:text-brand-blue hover:bg-[#F5F7FF] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
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
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#374151] hover:bg-[#F5F7FF] hover:text-brand-blue transition-colors duration-150"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/30 shrink-0" />
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
                  className="px-2 py-1.5 text-[15px] font-medium rounded-md text-[#374151] hover:text-brand-blue hover:bg-[#F5F7FF] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2 justify-self-end">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center h-[44px] w-[140px] whitespace-nowrap text-[15px] font-semibold rounded-[12px] text-white bg-brand-blue hover:bg-[#0047B3] shadow-[0_4px_14px_0_rgba(0,82,204,0.39)] hover:shadow-[0_6px_20px_rgba(0,82,204,0.23)] hover:-translate-y-[1px] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
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
                menuOpen ? 'bg-[#F3F4F6] text-background-dark' : 'hover:bg-[#F3F4F6]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue',
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
          'fixed inset-0 z-[55] bg-black/25 backdrop-blur-[6px] md:hidden',
          'transition-opacity duration-[250ms] ease-out',
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
          'bg-white/95 backdrop-blur-xl flex flex-col md:hidden',
          'shadow-[-8px_0_40px_rgba(0,0,0,0.08)]',
          'transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]',
          menuOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-[20px] opacity-0 invisible pointer-events-none',
        ].join(' ')}
      >
        {/* Panel header with logo + close button */}
        <div className="flex items-center justify-between px-4 h-14 shrink-0 border-b border-[#E5E7EB]/50">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue rounded-sm"
          >
            <Image
              src={mediaConfig.logoPrimary}
              alt={companyConfig.brandName}
              width={brandingConfig.logoSizes.mobileMenu.width}
              height={brandingConfig.logoSizes.mobileMenu.height}
              style={{
                width: brandingConfig.logoSizes.mobileMenu.width,
                height: brandingConfig.logoSizes.mobileMenu.height
              }}
              className="object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="w-10 h-10 -mr-1 flex items-center justify-center rounded-lg text-[#6B7280] hover:text-background-dark hover:bg-[#F3F4F6] transition-colors touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto overscroll-contain pb-safe">
          <nav className="px-2 py-2 flex flex-col gap-[2px]">
            {/* Main Navigation Label */}
            <div className="px-2 pt-3 pb-1.5">
              <p className="text-[10px] font-bold tracking-[0.1em] text-brand-blue uppercase">Main Navigation</p>
            </div>

            {/* Services accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full px-2 py-2 rounded-lg text-[14px] font-semibold text-[#111827] hover:bg-[#F3F4F6] transition-colors focus:outline-none touch-manipulation"
                aria-expanded={mobileServicesOpen}
              >
                <span className="flex items-center gap-2.5 text-[#111827]">
                  <svg className="w-[16px] h-[16px] text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  Services
                </span>
                <span className={`flex items-center justify-center w-5 h-5 rounded-full transition-colors ${mobileServicesOpen ? 'bg-[#E5E7EB]/60' : ''}`}>
                  <svg className={`w-3.5 h-3.5 text-[#6B7280] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileServicesOpen ? 'max-h-[400px] opacity-100 mt-0.5' : 'max-h-0 opacity-0'}`}>
                <div className="ml-4 pl-3 border-l-[1.5px] border-[#E5E7EB]/60 flex flex-col gap-0.5 mb-1">
                  {servicesData.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={closeMenu}
                      className="flex items-center px-2 py-1.5 rounded-md text-[13px] font-medium text-[#4B5563] hover:bg-[#F5F7FF] hover:text-brand-blue transition-colors"
                    >
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
                className="flex items-center justify-between w-full px-2 py-2 rounded-lg text-[14px] font-semibold text-[#111827] hover:bg-[#F3F4F6] transition-colors focus:outline-none touch-manipulation"
                aria-expanded={mobileIndustriesOpen}
              >
                <span className="flex items-center gap-2.5 text-[#111827]">
                  <svg className="w-[16px] h-[16px] text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                  Industries
                </span>
                <span className={`flex items-center justify-center w-5 h-5 rounded-full transition-colors ${mobileIndustriesOpen ? 'bg-[#E5E7EB]/60' : ''}`}>
                  <svg className={`w-3.5 h-3.5 text-[#6B7280] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${mobileIndustriesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileIndustriesOpen ? 'max-h-[400px] opacity-100 mt-0.5' : 'max-h-0 opacity-0'}`}>
                <div className="ml-4 pl-3 border-l-[1.5px] border-[#E5E7EB]/60 flex flex-col gap-0.5 mb-1">
                  {industriesData.map((i) => (
                    <Link
                      key={i.slug}
                      href={`/industries/${i.slug}`}
                      onClick={closeMenu}
                      className="flex items-center px-2 py-1.5 rounded-md text-[13px] font-medium text-[#4B5563] hover:bg-[#F5F7FF] hover:text-brand-blue transition-colors"
                    >
                      {i.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-1 border-t border-[#E5E7EB]/50 mx-2" />

            {/* Flat links grouped logically */}
            {[
              { label: 'Locations', href: '/locations', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm4.5 0c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /> },
              { label: 'Gallery', href: '/gallery', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /> },
            ].map(({ label, href, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-[14px] font-semibold text-[#111827] hover:bg-[#F5F7FF] hover:text-brand-blue transition-colors touch-manipulation group"
              >
                <svg className="w-[16px] h-[16px] text-[#6B7280] group-hover:text-brand-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  {icon}
                </svg>
                {label}
              </Link>
            ))}

            <div className="my-2 border-t border-[#E5E7EB]/50 mx-2" />

            {/* Company Label */}
            <div className="px-2 pt-1 pb-1.5">
              <p className="text-[10px] font-bold tracking-[0.1em] text-brand-blue uppercase">Company</p>
            </div>

            {[
              { label: 'About', href: '/about', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /> },
              { label: 'FAQ', href: '/faq', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /> },
              { label: 'Contact', href: '/contact', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /> },
            ].map(({ label, href, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-[14px] font-semibold text-[#111827] hover:bg-[#F5F7FF] hover:text-brand-blue transition-colors touch-manipulation group"
              >
                <svg className="w-[16px] h-[16px] text-[#6B7280] group-hover:text-brand-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  {icon}
                </svg>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 2-Column Fixed CTA Footer */}
        <div className="p-3 border-t border-[#E5E7EB]/50 shrink-0 bg-white/60 backdrop-blur-lg">
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/track"
              onClick={closeMenu}
              className="flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-lg bg-white border border-[#E5E7EB] hover:border-brand-blue/30 hover:bg-[#F9FAFB] hover:text-brand-blue text-[13px] font-semibold text-[#374151] shadow-sm transition-all touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D1D5DB]"
            >
              Track
            </Link>
            <Link
              href="/quote"
              onClick={closeMenu}
              className="flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-lg bg-brand-blue hover:bg-[#0047B3] text-white text-[13px] font-bold shadow-[0_4px_12px_rgba(0,82,204,0.2)] hover:shadow-[0_6px_16px_rgba(0,82,204,0.3)] transition-all touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
