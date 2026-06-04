# Shared Component Library

This document contains the production-ready code for the 11 shared components as defined by the Homepage UI Specification and Component Generation Plan. All components use strict TypeScript typing, Tailwind CSS for styling, and adhere to accessibility best practices.

---

### 1. SectionHeader

**FILE PATH**
`src/components/shared/SectionHeader.tsx`

**FULL CODE**
```tsx
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  theme?: 'light' | 'dark';
}

export function SectionHeader({
  title,
  subtitle,
  alignment = 'center',
  theme = 'light',
}: SectionHeaderProps) {
  const alignmentClass = alignment === 'center' ? 'text-center mx-auto' : 'text-left';
  const titleColorClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subtitleColorClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`mb-12 max-w-3xl ${alignmentClass}`}>
      <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${titleColorClass}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl ${subtitleColorClass}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

**DEPENDENCIES**
- `react`

**USAGE EXAMPLE**
```tsx
<SectionHeader 
  title="Why Customers Choose Us" 
  subtitle="Industry-leading logistics tailored to your specific needs."
  alignment="center"
  theme="light"
/>
```

---

### 2. PrimaryButton

**FILE PATH**
`src/components/shared/PrimaryButton.tsx`

**FULL CODE**
```tsx
import React from 'react';
import Link from 'next/link';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function PrimaryButton({ children, href, className = '', ...props }: PrimaryButtonProps) {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm";
  
  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
```

**DEPENDENCIES**
- `react`
- `next/link`

**USAGE EXAMPLE**
```tsx
<PrimaryButton href="/quote">
  Get a Free Quote
</PrimaryButton>
```

---

### 3. SecondaryButton

**FILE PATH**
`src/components/shared/SecondaryButton.tsx`

**FULL CODE**
```tsx
import React from 'react';
import Link from 'next/link';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function SecondaryButton({ children, href, className = '', ...props }: SecondaryButtonProps) {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  
  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
```

**DEPENDENCIES**
- `react`
- `next/link`

**USAGE EXAMPLE**
```tsx
<SecondaryButton onClick={() => openModal()}>
  View Services
</SecondaryButton>
```

---

### 4. CTAButton

**FILE PATH**
`src/components/shared/CTAButton.tsx`

**FULL CODE**
```tsx
import React from 'react';
import Link from 'next/link';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function CTAButton({ children, href, className = '', ...props }: CTAButtonProps) {
  // Uses Primary Red to stand out as the primary conversion point
  const baseClasses = "inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-white bg-primary-red hover:bg-primary-red/90 transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-red shadow-md";
  
  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
```

**DEPENDENCIES**
- `react`
- `next/link`

**USAGE EXAMPLE**
```tsx
<CTAButton href="/contact">
  Call Now
</CTAButton>
```

---

### 5. ServiceCard

**FILE PATH**
`src/components/shared/ServiceCard.tsx`

**FULL CODE**
```tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ServiceItem } from '@/types/data.types';

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link 
      href={`/services/${service.slug}`} 
      className="group block relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <Image 
          src={`/images/services/${service.slug}.webp`} 
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 line-clamp-2">
          {service.shortDescription}
        </p>
        <div className="mt-4 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          Learn more 
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
```

**DEPENDENCIES**
- `react`
- `next/image`
- `next/link`
- `@/types/data.types`

**USAGE EXAMPLE**
```tsx
<ServiceCard service={{ slug: 'car-transportation', title: 'Car Transportation', shortDescription: 'Safe relocation of your vehicle.' }} />
```

---

### 6. IndustryCard

**FILE PATH**
`src/components/shared/IndustryCard.tsx`

**FULL CODE**
```tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IndustryItem } from '@/types/data.types';

interface IndustryCardProps {
  industry: IndustryItem;
}

export function IndustryCard({ industry }: IndustryCardProps) {
  return (
    <Link 
      href={`/industries/${industry.slug}`} 
      className="group relative block h-64 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Image
        src={`/images/industries/${industry.slug}.webp`}
        alt={industry.title}
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-bold text-white mb-1">{industry.title}</h3>
        <span className="inline-block w-8 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );
}
```

**DEPENDENCIES**
- `react`
- `next/image`
- `next/link`
- `@/types/data.types`

**USAGE EXAMPLE**
```tsx
<IndustryCard industry={{ slug: 'commercial-relocation', title: 'Commercial Relocation' }} />
```

---

### 7. TestimonialCard

**FILE PATH**
`src/components/shared/TestimonialCard.tsx`

**FULL CODE**
```tsx
import React from 'react';
// Extending the type locally to support properties expected by the UI.
// Real data types will need to be synced with types/data.types.ts
interface TestimonialExtended {
  clientName: string;
  quote?: string;
  rating?: number;
}

interface TestimonialCardProps {
  testimonial: TestimonialExtended;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const rating = testimonial.rating || 5;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex gap-1 mb-6 text-yellow-400" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : 'text-gray-200 fill-current'}`} viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-gray-700 text-lg flex-grow mb-8 italic">
        "{testimonial.quote || 'Premium service from start to finish. Highly recommended.'}"
      </blockquote>
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl shrink-0" aria-hidden="true">
          {testimonial.clientName.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-gray-900">{testimonial.clientName}</div>
          <div className="text-sm text-gray-500">Verified Customer</div>
        </div>
      </div>
    </div>
  );
}
```

**DEPENDENCIES**
- `react`

**USAGE EXAMPLE**
```tsx
<TestimonialCard testimonial={{ clientName: 'Rajesh Kumar', quote: 'Excellent packing!', rating: 5 }} />
```

---

### 8. StatisticCard

**FILE PATH**
`src/components/shared/StatisticCard.tsx`

**FULL CODE**
```tsx
'use client';

import React, { useEffect, useState } from 'react';
import { StatItem } from '@/types/data.types';

interface StatisticCardProps {
  stat: StatItem;
}

export function StatisticCard({ stat }: StatisticCardProps) {
  // Animation disabled for Phase 1. Component renders static values.
  const displayValue = stat.value;

  return (
    <div className="text-center p-6">
      <div className="text-4xl md:text-5xl font-extrabold text-blue-600 tracking-tight mb-2">
        {displayValue}
      </div>
      <div className="text-lg font-medium text-gray-600">
        {stat.label}
      </div>
    </div>
  );
}
```

**DEPENDENCIES**
- `react`
- `@/types/data.types`

**USAGE EXAMPLE**
```tsx
<StatisticCard stat={{ label: 'Happy Customers', value: '15,000+' }} />
```

---

### 9. FAQItem

**FILE PATH**
`src/components/shared/FAQItem.tsx`

**FULL CODE**
```tsx
'use client';

import React, { useState } from 'react';

// Locally extending type to support question/answer UI mapping
interface FAQExtended {
  category?: string;
  question: string;
  answer: string;
}

interface FAQItemProps {
  faq: FAQExtended;
}

export function FAQItem({ faq }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-md px-2"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900">{faq.question}</span>
        <span className="ml-6 flex h-7 items-center" aria-hidden="true">
          <svg
            className={`h-6 w-6 text-blue-600 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-base text-gray-600 px-2">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}
```

**DEPENDENCIES**
- `react`

**USAGE EXAMPLE**
```tsx
<FAQItem faq={{ question: 'How do you handle fragile items?', answer: 'We use premium bubble wrap.' }} />
```

---

### 10. BlogCard

**FILE PATH**
`src/components/shared/BlogCard.tsx`

**FULL CODE**
```tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/data.types';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 relative">
      <div className="relative h-56 w-full bg-gray-100">
        <Image
          src={`/images/blog/${post.slug}.webp`}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
          <span className="w-1 h-1 rounded-full bg-gray-300" aria-hidden="true" />
          <span>Industry News</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>
        <div className="text-blue-600 font-medium inline-flex items-center" aria-hidden="true">
          Read Article
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </article>
  );
}
```

**DEPENDENCIES**
- `react`
- `next/image`
- `next/link`
- `@/types/data.types`

**USAGE EXAMPLE**
```tsx
<BlogCard post={{ slug: 'tips-for-relocation', title: 'Top 10 Tips for Relocation' }} />
```

---

### 11. PartnerLogoCard

**FILE PATH**
`src/components/shared/PartnerLogoCard.tsx`

**FULL CODE**
```tsx
import React from 'react';
import Image from 'next/image';
import { Partner } from '@/types/data.types';

interface PartnerLogoCardProps {
  partner: Partner;
}

export function PartnerLogoCard({ partner }: PartnerLogoCardProps) {
  return (
    <div className="flex items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all duration-300 group">
      <div className="relative w-32 h-16 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300">
        <Image
          src={partner.logoUrl}
          alt={`Logo of ${partner.name}`}
          fill
          className="object-contain"
          sizes="128px"
        />
      </div>
    </div>
  );
}
```

**DEPENDENCIES**
- `react`
- `next/image`
- `@/types/data.types`

**USAGE EXAMPLE**
```tsx
<PartnerLogoCard partner={{ name: 'Amazon', logoUrl: '/logos/amazon.svg' }} />
```

---

### 12. SectionContainer

**FILE PATH**
`src/components/shared/SectionContainer.tsx`

**FULL CODE**
```tsx
import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionContainer({ children, className = '', id }: SectionContainerProps) {
  return (
    <section id={id} className={`w-full py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
```

**DEPENDENCIES**
- `react`

**USAGE EXAMPLE**
```tsx
<SectionContainer id="services" className="bg-gray-50">
  <SectionHeader title="Our Services" />
  {/* Grid content goes here */}
</SectionContainer>
```

---

### 13. Data Types 

**FILE PATH**
`src/types/data.types.ts`

**FULL CODE**
```typescript
export interface CompanyInfo {
  brandName: string;
  legalName: string;
  tagline: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
}

export interface IndustryItem {
  slug: string;
  title: string;
}

export interface TestimonialItem {
  clientName: string;
  quote?: string;
  rating?: number;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
}

export interface Partner {
  name: string;
  logoUrl: string;
}

export interface CityConfig {
  code: string;
  name: string;
}

export interface GlobalSeoConfig {
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
}

export interface NavigationConfig {
  headerLinks: { label: string; href: string }[];
  footerLinks: { title: string; items: { label: string; href: string }[] }[];
}

export interface BranchItem {
  slug: string;
  name: string;
}

export interface LocationSEOItem {
  slug: string;
  city: string;
}

export interface JobOpening {
  slug: string;
  title: string;
}
```
