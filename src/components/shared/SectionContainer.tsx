import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  /** Additional CSS classes applied to the outer element */
  className?: string;
  /** HTML id attribute for anchor linking */
  id?: string;
  /** Render as a plain <div> instead of <section> */
  as?: 'section' | 'div';
}

/**
 * SectionContainer
 * Consistent vertical rhythm and max-width container (1216px).
 * Refined spacing: tighter on desktop to avoid over-airy sections.
 * Mobile 40px / Tablet 56px / Desktop 80px
 */
export function SectionContainer({
  children,
  className = '',
  id,
  as: Tag = 'section',
}: SectionContainerProps) {
  return (
    <Tag
      id={id}
      className={`w-full py-10 md:py-12 lg:py-16 ${className}`}
    >
      <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </Tag>
  );
}
