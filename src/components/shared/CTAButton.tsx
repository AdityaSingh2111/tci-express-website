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
    'inline-flex items-center justify-center min-h-[46px] px-7 py-2.5 ' +
    'text-[15px] font-bold rounded-xl text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 ' +
    'bg-[#0052CC] border border-transparent ' +
    'transition-opacity duration-[150ms] ease-out ' +
    'hover:opacity-90 ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E53E3E] ' +
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
