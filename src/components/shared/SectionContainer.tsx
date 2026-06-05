import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  /** Additional CSS classes applied to the outer element */
  className?: string;
  /** HTML id attribute for anchor linking */
  id?: string;
  /** Container width standard */
  width?: 'narrow' | 'default' | 'wide';
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
  width = 'default',
  as: Tag = 'section',
}: SectionContainerProps) {
  
  const widthClasses = {
    narrow: 'max-w-[768px]',
    default: 'max-w-[1280px]',
    wide: 'max-w-[1440px]'
  };

  return (
    <Tag
      id={id}
      className={`w-full py-14 lg:py-20 ${className}`}
    >
      <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${widthClasses[width]}`}>
        {children}
      </div>
    </Tag>
  );
}
