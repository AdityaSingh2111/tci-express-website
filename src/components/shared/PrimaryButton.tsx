import React from 'react';
import Link from 'next/link';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

/**
 * PrimaryButton — "Standard Primary"
 * Design system §10: True Black background (#000000), White text, 4px radius.
 * Padding: 12px × 24px. Font weight: Medium.
 * Min-height 44px for mobile touch targets (§29).
 *
 * Use for secondary actions (e.g., "View Services", "Learn More").
 * For primary conversion actions use CTAButton (red).
 */
export function PrimaryButton({
  children,
  href,
  className = '',
  ...props
}: PrimaryButtonProps) {
  const base =
    'inline-flex items-center justify-center h-[44px] md:h-[48px] px-6 md:px-8 ' +
    'text-[15px] font-bold rounded-[12px] text-white bg-[#000000] shadow-sm ' +
    'border border-transparent ' +
    'transition-all duration-200 ease-out hover:-translate-y-[2px] whitespace-nowrap ' +
    'hover:bg-[#1F2937] ' +
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
