import React from 'react';
import type { TestimonialItem } from '@/types/data.types';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

/**
 * TestimonialCard
 * Design system §11 Card: white bg, 1px border-gray, no shadow by default.
 * Hover: border darkens + shadow level-1 (no scale).
 * Uses TestimonialItem from data.types — no local interface override.
 *
 * Accessibility: star rating has aria-label, blockquote is semantic.
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const {
    clientName,
    clientTitle,
    clientCompany,
    clientCity,
    quote,
    rating,
  } = testimonial;

  const initials = clientName
    .split(' ')
    .slice(0, 2)
    .map((n) => n.charAt(0))
    .join('');

  const attribution = [clientTitle, clientCompany].filter(Boolean).join(', ');
  const location = !clientTitle && !clientCompany && clientCity ? clientCity : undefined;

  return (
    <article
      className={
        'bg-white border border-[#E5E7EB] rounded-[12px] p-5 md:p-6 flex flex-col h-full ' +
        'transition-all duration-200 ease-out hover:-translate-y-[2px] ' +
        'hover:border-[#D1D5DB] hover:shadow-md'
      }
    >
      {/* Star rating */}
      <div
        role="img"
        aria-label={`${rating} out of 5 stars`}
        className="flex gap-0.5 mb-5"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-[#F59E0B]' : 'text-[#E5E7EB]'} fill-current`}
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-[#4B5563] text-sm leading-relaxed flex-grow mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <footer className="flex items-center gap-3 mt-auto pt-4 border-t border-[#E5E7EB]">
        {/* Avatar initials */}
        <div
          className="w-9 h-9 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <span className="text-brand-blue text-xs font-bold">{initials}</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-[#000000] leading-tight">
            {clientName}
          </div>
          {attribution && (
            <div className="text-xs text-[#4B5563] leading-tight mt-0.5">
              {attribution}
            </div>
          )}
          {location && (
            <div className="text-xs text-[#4B5563] leading-tight mt-0.5">
              {location}
            </div>
          )}
        </div>
      </footer>
    </article>
  );
}
