import React from 'react';
import Link from 'next/link';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

/**
 * CTAButton — "Primary CTA"
 * Design system §10: Primary Red (#E53E3E) background, White text, no border, 4px radius.
 * Padding: 12px × 24px. Font weight: Medium.
 * Min-height 44px for mobile touch targets (§29).
 *
 * Use EXCLUSIVELY for primary conversion actions:
 * "Get a Quote", "Request Callback", "Book Now", "Call Now".
 * This is the highest-urgency button in the design system.
 */
export function CTAButton({
  children,
  href,
  className = '',
  ...props
}: CTAButtonProps) {
  const base =
    'inline-flex items-center justify-center h-[44px] md:h-[48px] px-6 md:px-8 ' +
    'text-[15px] font-bold rounded-[12px] text-white shadow-[0_4px_14px_0_rgba(0,82,204,0.39)] hover:shadow-[0_6px_20px_rgba(0,82,204,0.23)] hover:-translate-y-[2px] ' +
    'bg-brand-blue border border-transparent ' +
    'transition-all duration-200 ease-out whitespace-nowrap ' +
    'hover:bg-[#0047B3] ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';

  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
