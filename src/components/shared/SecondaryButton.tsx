import React from 'react';
import Link from 'next/link';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

/**
 * SecondaryButton
 * Design system §10: White background, 1px solid Border Gray (#E5E7EB),
 * Black text, 4px radius. Hover: Surface Gray (#F9FAFB) background.
 * Min-height 44px for mobile touch targets (§29).
 */
export function SecondaryButton({
  children,
  href,
  className = '',
  ...props
}: SecondaryButtonProps) {
  const base =
    'inline-flex items-center justify-center h-[44px] px-6 ' +
    'text-[15px] font-bold rounded-[12px] text-[#000000] shadow-sm ' +
    'bg-white border border-[#D1D5DB] ' +
    'transition-all duration-200 ease-out hover:-translate-y-[2px] whitespace-nowrap ' +
    'hover:bg-[#F9FAFB] hover:border-[#9CA3AF] hover:text-brand-blue ' +
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
