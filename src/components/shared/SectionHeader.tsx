import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** @default 'center' */
  alignment?: 'left' | 'center';
  /** 'light' = black title / gray subtitle; 'dark' = white title / blue-gray subtitle */
  theme?: 'light' | 'dark';
  /** Renders title as an h1 — only use in hero sections */
  as?: 'h1' | 'h2';
  /** Optional eyebrow label above the heading */
  eyebrow?: string;
}

/**
 * SectionHeader — consistent section heading system.
 * Premium: eyebrow label support, tighter spacing, refined typography.
 */
export function SectionHeader({
  title,
  subtitle,
  alignment = 'center',
  theme = 'light',
  as: Heading = 'h2',
  eyebrow,
}: SectionHeaderProps) {
  const alignClass    = alignment === 'center' ? 'text-center mx-auto' : 'text-left';
  const titleColor    = theme === 'dark' ? 'text-white' : 'text-background-dark';
  const subtitleColor = theme === 'dark' ? 'text-white/60' : 'text-[#6B7280]';
  const eyebrowColor  = theme === 'dark' ? 'text-[#60A5FA]' : 'text-brand-blue';

  const getHeadingStyles = () => {
    if (Heading === 'h1') return "text-[2.25rem] lg:text-[3rem] font-extrabold tracking-tight";
    if (Heading === 'h2') return "text-[1.75rem] lg:text-[2.25rem] font-bold tracking-tight";
    return "text-[1.25rem] lg:text-[1.5rem] font-bold tracking-tight";
  };

  return (
    <div className={`mb-10 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className={`text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 ${eyebrowColor}`}>
          {eyebrow}
        </p>
      )}
      <Heading
        className={`${getHeadingStyles()} leading-[1.2] mb-3 ${titleColor}`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className={`text-base leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
