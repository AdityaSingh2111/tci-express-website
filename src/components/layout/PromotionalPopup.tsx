'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function PromotionalPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Check if the popup was already dismissed in this session
    const isDismissed = sessionStorage.getItem('promo-dismissed');
    if (!isDismissed) {
      // Appear after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo-dismissed', 'true');
  };

  if (!hasMounted) return null;

  return (
    <div
      className={[
        // Base positioning & z-index
        'fixed z-[55]',
        
        // Mobile bottom sheet styles (sits above 56px MobileBottomNav)
        'bottom-[56px] left-0 right-0 w-full',
        'bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/85',
        'rounded-t-3xl border-t border-x border-[#E5E7EB]/80 shadow-[0_-8px_40px_rgba(0,0,0,0.12)]',
        
        // Desktop popup styles
        'md:bottom-8 md:right-8 md:left-auto md:w-[360px]',
        'md:bg-white md:backdrop-blur-none',
        'md:rounded-2xl md:border md:border-[#E5E7EB] md:shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
        
        // Animation
        'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
        isVisible ? 'translate-y-0 opacity-100 visible' : 'translate-y-full md:translate-y-8 opacity-0 invisible pointer-events-none'
      ].join(' ')}
      role="dialog"
      aria-labelledby="promo-title"
    >
      {/* Mobile drag handle indicator */}
      <div className="md:hidden flex justify-center pt-3 pb-1" aria-hidden="true">
        <div className="w-12 h-1.5 bg-[#E5E7EB] rounded-full" />
      </div>

      {/* Desktop Close Button */}
      <button
        onClick={dismiss}
        className="hidden md:flex absolute top-4 right-4 text-[#6B7280] hover:text-[#111827] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-full p-1.5 transition-colors"
        aria-label="Dismiss promotional offer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="p-5 md:p-6 pt-2 md:pt-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEF2F2] text-[#DC2626] text-[11px] font-bold tracking-wide uppercase mb-3">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          Limited Time Offer
        </div>
        
        <h3 id="promo-title" className="text-xl md:text-lg font-bold text-[#0D1117] leading-snug mb-2 tracking-[-0.01em]">
          Get up to 10% OFF on Car Transportation
        </h3>
        
        <p className="text-[15px] md:text-sm text-[#4B5563] mb-6 md:mb-5 leading-relaxed">
          Valid for a limited period. Safe, reliable, and secure vehicle moving services.
        </p>

        <div className="flex flex-col md:flex-row gap-3">
          <Link
            href="/quote"
            onClick={dismiss}
            className="flex items-center justify-center w-full px-5 py-3.5 md:py-2.5 bg-[#0052CC] text-white text-[15px] md:text-sm font-bold md:font-semibold rounded-xl md:rounded-lg shadow-md hover:bg-[#0047B3] hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] active:scale-[0.98] md:active:scale-100"
          >
            Get Free Quote
          </Link>
          {/* Mobile Secondary Dismiss CTA */}
          <button
            onClick={dismiss}
            className="md:hidden flex items-center justify-center w-full px-5 py-3.5 bg-[#F3F4F6] text-[#4B5563] text-[15px] font-bold rounded-xl active:bg-[#E5E7EB] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7280] active:scale-[0.98]"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
