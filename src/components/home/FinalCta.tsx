import React from 'react';
import { CTAButton } from '../shared/CTAButton';
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';

/**
 * FinalCta — Premium conversion section.
 * Clean, focused. Strong headline, two CTAs, trust indicators.
 */
export function FinalCta() {
  const whatsappUrl = `https://wa.me/${contactConfig.whatsapp.replace(/\D/g, '')}?text=Hi, I would like to get a quote for a relocation.`;

  return (
    <section
      className="w-full bg-brand-navy py-16 lg:py-20"
      aria-label="Final call to action"
    >
      <div className="max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">

          {/* Eyebrow */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#60A5FA] mb-4">
            Get started today
          </p>

          <h2 className="text-[1.875rem] sm:text-[2.25rem] font-bold text-white leading-[1.15] tracking-[-0.025em] mb-4">
            Ready for a Stress-Free Move?
          </h2>

          <p className="text-base text-white/55 mb-8 max-w-xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have trusted{' '}
            <strong className="text-white font-semibold">{companyConfig.brandName}</strong>{' '}
            with their most valuable possessions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
            <CTAButton href="/quote" className="w-full sm:w-auto min-w-[200px]">
              Get Your Free Quote
            </CTAButton>

            <a
              href={`tel:${contactConfig.phone}`}
              className={
                'w-full sm:w-auto min-w-[200px] ' +
                'inline-flex items-center justify-center ' +
                'min-h-[44px] px-6 py-2.5 ' +
                'text-sm font-semibold text-white rounded-[4px] ' +
                'border border-white/20 ' +
                'hover:bg-white/5 hover:border-white/30 transition-all duration-150 ' +
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
              }
            >
              {contactConfig.phone}
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                'w-full sm:w-auto min-w-[200px] ' +
                'inline-flex items-center justify-center gap-2 ' +
                'min-h-[44px] px-6 py-2.5 ' +
                'text-sm font-semibold text-white rounded-[4px] ' +
                'bg-[#25D366]/15 border border-[#25D366]/25 ' +
                'hover:bg-[#25D366]/25 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]'
              }
              aria-label="WhatsApp Us"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {['Free Consultation', 'No Obligation Quote', 'Insured Moves', 'GST Invoice'].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-xs text-white/60">
                <svg className="w-3 h-3 text-[#22C55E] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
