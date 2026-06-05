'use client';

import React, { useId, useState } from 'react';
import type { FaqItem } from '@/types/data.types';

interface FAQItemProps {
  faq: FaqItem;
}

/**
 * FAQItem — Accessible Accordion
 * Design system §23:
 *   - 1px solid Border Gray (#E5E7EB) separators
 *   - Question text is True Black (#000000)
 *   - Expand icon: crisp "+" rotates 45° to "×" when open
 *
 * Accessibility (§30, UI Spec §6):
 *   - <button> trigger with aria-expanded
 *   - aria-controls linking trigger to panel
 *   - Focus ring in Primary Blue
 *
 * Animation §27: smooth height transition, 200ms ease-out.
 */
export function FAQItem({ faq }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const triggerId = `faq-trigger-${id}`;
  const panelId   = `faq-panel-${id}`;

  return (
    <div className="border-b border-[#E5E7EB] last:border-b-0">
      <button
        id={triggerId}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={
          'flex w-full items-start justify-between gap-4 py-4 px-0 text-left ' +
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ' +
          'rounded-sm'
        }
      >
        <span className="text-sm md:text-base font-medium text-[#000000] leading-snug">
          {faq.question}
        </span>
        {/* "+" icon that rotates 45° → "×" when open, ref §23 */}
        <span
          className={
            'shrink-0 w-5 h-5 flex items-center justify-center ' +
            'text-brand-blue text-xl font-light leading-none select-none ' +
            'transition-transform duration-[200ms] ease-out ' +
            (isOpen ? 'rotate-45' : 'rotate-0')
          }
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={
          'overflow-hidden transition-all duration-[200ms] ease-out ' +
          (isOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0')
        }
      >
        <p className="text-sm text-[#4B5563] leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}
