'use client';

import React, { useState, useEffect } from 'react';

/**
 * ScrollToTopButton
 * 
 * Floating button to scroll back to top.
 * Appears after 500px of scrolling.
 * Positioned intelligently to avoid collisions with MobileBottomNav and FloatingWhatsAppButton.
 */
export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed z-50 flex items-center justify-center
        text-white bg-[#1E3A8A]
        rounded-full shadow-md
        transition-all duration-200 ease-out
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]
        
        /* Mobile: 44x44, bottom 80px (above 56px bottom nav + 24px gap), right 16px */
        w-[44px] h-[44px] bottom-[80px] right-4
        
        /* Desktop (md+): 44x44, bottom 104px (above WhatsApp), right 31px (offset from WhatsApp) */
        md:w-[44px] md:h-[44px] md:bottom-[104px] md:right-[31px]

        ${isVisible ? 'opacity-100 visible translate-y-0 hover:-translate-y-[2px] hover:shadow-lg hover:bg-[#1E40AF]' : 'opacity-0 invisible translate-y-[10px]'}
      `}
    >
      <svg
        className="w-5 h-5 md:w-[22px] md:h-[22px]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
}
