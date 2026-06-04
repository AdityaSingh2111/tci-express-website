'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { servicesData } from '@/data/services';

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
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.origin.trim()) newErrors.origin = 'Pickup city is required';
    if (!formData.destination.trim()) newErrors.destination = 'Delivery city is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
    'w-full h-[46px] px-4 text-[15px] text-[#0D1117] ' +
    'bg-[#F9FAFB] border rounded-xl ' +
    (hasError ? 'border-[#E53E3E] focus:border-[#E53E3E] focus:ring-[#E53E3E]/10' : 'border-[#E5E7EB] focus:border-[#0052CC] focus:ring-[#0052CC]/10') +
    ' placeholder:text-[#9CA3AF] ' +
    'focus:bg-white focus:outline-none focus:ring-[3px] ' +
    'transition-all duration-200 shadow-sm';

  const labelClass = 'block text-[13px] font-bold text-[#374151] mb-2 tracking-wide';

  return (
    <SectionContainer className="bg-[#00102A] py-16 lg:py-24 border-y border-[#001633] overflow-hidden">
      <div className="relative grid grid-cols-1 lg:grid-cols-[45%_55%] xl:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Decorative blobs — contained via parent overflow-hidden on SectionContainer */}
        <div className="absolute -top-32 -right-32 w-[360px] h-[360px] rounded-full opacity-[0.08] pointer-events-none" style={{ background: 'radial-gradient(circle, #0052CC 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full opacity-[0.06] pointer-events-none" style={{ background: 'radial-gradient(circle, #22C55E 0%, transparent 70%)' }} aria-hidden="true" />
        
        {/* Left: Marketing Content */}
        <div className="flex flex-col items-start pr-0 lg:pr-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E53E3E]" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#E53E3E] uppercase tracking-[0.12em]">
              Fast & Transparent
            </span>
          </div>
          <h2 className="text-[2rem] sm:text-[2.25rem] lg:text-[2.75rem] font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
            Get Your Free <span className="text-[#4B9EFF]">Estimate</span> Today
          </h2>
          <p className="text-[15px] sm:text-[16px] text-white/70 leading-relaxed mb-8 max-w-[480px]">
            Whether you're moving a household, a corporate office, or a vehicle across India, our logistics experts provide accurate pricing with zero hidden fees.
          </p>
          <ul className="space-y-4 mb-0 w-full">
             {[
               'No hidden charges or last-minute fees',
               'Instant response within 1 business hour',
               'Dedicated move manager for your shipment'
             ].map((pt) => (
                <li key={pt} className="flex items-center gap-3 text-[14px] text-white/85">
                  <svg className="w-4 h-4 text-[#22C55E] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{pt}</span>
                </li>
             ))}
          </ul>
        </div>
        
        {/* Right: Quote Form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl md:rounded-3xl border border-[#D1D5DB] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
            {/* Header */}
            <div className="px-5 md:px-6 pt-6 pb-5 border-b border-[#F3F4F6] bg-[#F9FAFB]">
              <h3 className="text-lg font-bold text-[#0D1117]">Request a Quick Quote</h3>
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
              Full Name <span className="text-[#E53E3E]">*</span>
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
            {errors.name && <p id="qq-name-error" className="text-xs text-[#E53E3E] mt-1 font-medium">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="qq-phone" className={labelClass}>
              Phone <span className="text-[#E53E3E]">*</span>
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
            {errors.phone && <p id="qq-phone-error" className="text-xs text-[#E53E3E] mt-1 font-medium">{errors.phone}</p>}
          </div>
        </div>

        {/* Row 2: Origin + Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="qq-origin" className={labelClass}>
              Moving From <span className="text-[#E53E3E]">*</span>
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
            {errors.origin && <p id="qq-origin-error" className="text-xs text-[#E53E3E] mt-1 font-medium">{errors.origin}</p>}
          </div>
          <div>
            <label htmlFor="qq-destination" className={labelClass}>
              Moving To <span className="text-[#E53E3E]">*</span>
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
            {errors.destination && <p id="qq-destination-error" className="text-xs text-[#E53E3E] mt-1 font-medium">{errors.destination}</p>}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className={[
              'w-full sm:w-auto min-w-[240px] h-[50px] px-8 text-[15px] font-bold text-white rounded-xl shadow-md',
              'bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B99]',
              'transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-0.5',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]',
              'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none',
              'touch-manipulation',
            ].join(' ')}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting…
              </span>
            ) : (
              'Request Quote Now'
            )}
          </button>
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
