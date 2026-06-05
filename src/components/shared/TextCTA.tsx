import React from 'react';
import Link from 'next/link';

interface TextCTAProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

/**
 * TextCTA
 * Standardized tertiary action (e.g., "View Directions", "Read More").
 * 14px semibold, brand blue. Arrow translates right on hover.
 */
export function TextCTA({
  children,
  href,
  className = '',
  ...props
}: TextCTAProps) {
  const base =
    'inline-flex items-center text-[14px] font-semibold text-brand-blue ' +
    'hover:underline group transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue rounded-sm';

  const icon = (
    <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );

  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
      {icon}
    </button>
  );
}
