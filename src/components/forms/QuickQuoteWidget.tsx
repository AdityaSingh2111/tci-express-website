'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { servicesData } from '@/data/services';

import { CTAButton } from '@/components/shared/CTAButton';
import { SectionContainer } from '@/components/shared/SectionContainer';

/**
 * QuickQuoteWidget — Premium redesign.
 * SaaS-grade form with clean field styling, proper label hierarchy,
 * and enterprise logistics feel.
 */
export function QuickQuoteWidget() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    origin: '',
    destination: '',
    serviceType: servicesData[0]?.slug ?? '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.origin.trim()) newErrors.origin = 'Please enter a pickup city.';
    if (!formData.destination.trim()) newErrors.destination = 'Please enter a destination city.';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      setTimeout(() => {
        const element = document.getElementById(`qq-${firstErrorField}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }, 0);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to full quote page so user can complete the detailed quote
      router.push('/quote');
    }, 600);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Success state is no longer needed since we redirect to /quote

  const inputClass = (hasError: boolean) =>
    'w-full h-[44px] md:h-[48px] px-4 text-[15px] text-background-dark ' +
    'bg-white border rounded-[12px] ' +
    (hasError ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/20' : 'border-slate-200 focus:border-brand-blue focus:ring-brand-blue/20') +
    ' placeholder:text-slate-400 ' +
    'focus:outline-none focus:ring-2 ' +
    'transition-all duration-200 shadow-sm';

  const labelClass = 'block text-[13px] font-bold text-[#374151] mb-2 tracking-wide';

  return (
    <SectionContainer className="bg-white py-16 lg:py-24 border-b border-[#E5E7EB] overflow-hidden">
      <div className="relative grid grid-cols-1 lg:grid-cols-[45%_55%] xl:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Decorative blobs — contained via parent overflow-hidden on SectionContainer */}
        <div className="absolute -top-32 -right-32 w-[360px] h-[360px] rounded-full opacity-[0.08] pointer-events-none" style={{ background: 'radial-gradient(circle, #0052CC 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full opacity-[0.06] pointer-events-none" style={{ background: 'radial-gradient(circle, #22C55E 0%, transparent 70%)' }} aria-hidden="true" />
        
        {/* Left: Marketing Content */}
        <div className="flex flex-col items-start pr-0 lg:pr-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-bold text-brand-red uppercase tracking-[0.12em]">
              Fast & Transparent
            </span>
          </div>
          <h2 className="text-[2rem] sm:text-[2.25rem] lg:text-[2.75rem] font-extrabold text-background-dark mb-6 leading-[1.1] tracking-tight">
            Get Your Free <span className="text-brand-blue">Estimate</span> Today
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#4B5563] leading-relaxed mb-8 max-w-[480px]">
            Whether you&apos;re moving a household, a corporate office, or a vehicle across India, our logistics experts provide accurate pricing with zero hidden fees.
          </p>
          <ul className="space-y-4 mb-0 w-full">
             {[
               'No hidden charges or last-minute fees',
               'Instant response within 1 business hour',
               'Dedicated move manager for your shipment'
             ].map((pt) => (
                <li key={pt} className="flex items-center gap-3 text-[14px] text-[#374151] font-medium">
                  <svg className="w-4 h-4 text-brand-blue shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{pt}</span>
                </li>
             ))}
          </ul>
        </div>
        
        {/* Right: Quote Form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
            {/* Header */}
            <div className="px-5 md:px-6 pt-6 pb-5 border-b border-[#F3F4F6] bg-[#F9FAFB]">
              <h3 className="text-lg font-bold text-background-dark">Request a Quick Quote</h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Fill out the details below. We respond within 1 business hour.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-5 md:px-6 pt-5 pb-6 space-y-4" noValidate>
        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="qq-name" className={labelClass}>
              Full Name <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              id="qq-name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass(!!errors.name)}
              placeholder="John Doe"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "qq-name-error" : undefined}
            />
            {errors.name && <p id="qq-name-error" className="text-xs text-brand-red mt-1 font-medium">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="qq-phone" className={labelClass}>
              Phone <span className="text-brand-red">*</span>
            </label>
            <input
              type="tel"
              id="qq-phone"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass(!!errors.phone)}
              placeholder="+91 98765 43210"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "qq-phone-error" : undefined}
            />
            {errors.phone && <p id="qq-phone-error" className="text-xs text-brand-red mt-1 font-medium">{errors.phone}</p>}
          </div>
        </div>

        {/* Row 2: Origin + Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="qq-origin" className={labelClass}>
              Moving From <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              id="qq-origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className={inputClass(!!errors.origin)}
              placeholder="e.g. Delhi"
              aria-invalid={!!errors.origin}
              aria-describedby={errors.origin ? "qq-origin-error" : undefined}
            />
            {errors.origin && <p id="qq-origin-error" className="text-xs text-brand-red mt-1 font-medium">{errors.origin}</p>}
          </div>
          <div>
            <label htmlFor="qq-destination" className={labelClass}>
              Moving To <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              id="qq-destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className={inputClass(!!errors.destination)}
              placeholder="e.g. Mumbai"
              aria-invalid={!!errors.destination}
              aria-describedby={errors.destination ? "qq-destination-error" : undefined}
            />
            {errors.destination && <p id="qq-destination-error" className="text-xs text-brand-red mt-1 font-medium">{errors.destination}</p>}
          </div>
        </div>

        {/* Service type */}
        <div>
          <label htmlFor="qq-service" className={labelClass}>
            Service Type
          </label>
          <div className="relative">
            <select
              id="qq-service"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className={`${inputClass(false)} appearance-none pr-9 cursor-pointer`}
            >
              {servicesData.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <CTAButton
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[240px]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Get Instant Quote'
            )}
          </CTAButton>
        </div>

        {/* Fine print + link to full form */}
        <div className="flex items-center justify-center">
          <p className="text-[11px] text-[#9CA3AF] text-center leading-relaxed">
            Your details will be pre-filled on the next page. No spam.
          </p>
        </div>
      </form>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
