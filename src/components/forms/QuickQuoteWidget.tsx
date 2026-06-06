"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { servicesData } from '@/data/services';

import { CTAButton } from '@/components/shared/CTAButton';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { LocationAutocomplete } from '@/components/forms/LocationAutocomplete';
import { QuoteLeadPayload } from '@/types/lead';

export function QuickQuoteWidget() {
  const router = useRouter();
  const [formData, setFormData] = useState<QuoteLeadPayload & { isWhatsAppSame: boolean }>({
    customer_name: "",
    phone_number: "",
    whatsapp_number: "",
    preferred_contact_method: "WhatsApp",
    email: "",
    service_type: servicesData[0]?.title ?? '',
    vehicle_model: "",
    pickup_place_id: "",
    pickup_city: "",
    pickup_state: "",
    drop_place_id: "",
    drop_city: "",
    drop_state: "",
    distance_km: "",
    isWhatsAppSame: true,
    pickup_address: "",
    drop_address: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.customer_name.trim()) newErrors.customer_name = 'Please enter your full name.';
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Please enter a valid 10-digit mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone_number.replace(/[\s-]/g, ''))) {
      newErrors.phone_number = 'Please enter a valid 10-digit mobile number.';
    }
    
    if (!formData.pickup_address.trim()) newErrors.pickup_address = 'Please enter a pickup city.';
    if (!formData.drop_address.trim()) newErrors.drop_address = 'Please enter a destination city.';
    
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
    
    // Pass this state to /quote via URL Search Params
    const query = new URLSearchParams();
    if (formData.customer_name) query.set('customer_name', formData.customer_name);
    if (formData.phone_number) query.set('phone_number', formData.phone_number);
    if (formData.pickup_address) query.set('pickup_address', formData.pickup_address);
    if (formData.drop_address) query.set('drop_address', formData.drop_address);
    if (formData.service_type) query.set('service_type', formData.service_type);

    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to full quote page so user can complete the detailed quote
      router.push(`/quote?${query.toString()}`);
    }, 600);
  };

  const updateForm = <K extends keyof (QuoteLeadPayload & { isWhatsAppSame: boolean }) & string>(
    field: K,
    value: (QuoteLeadPayload & { isWhatsAppSame: boolean })[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

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
        {/* Decorative blobs */}
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
                  <label htmlFor="qq-customer_name" className={labelClass}>
                    Full Name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="qq-customer_name"
                    value={formData.customer_name}
                    onChange={(e) => updateForm("customer_name", e.target.value)}
                    className={inputClass(!!errors.customer_name)}
                    placeholder="John Doe"
                    aria-invalid={!!errors.customer_name}
                    aria-describedby={errors.customer_name ? "qq-customer_name-error" : undefined}
                  />
                  {errors.customer_name && <p id="qq-customer_name-error" className="text-xs text-brand-red mt-1 font-medium">{errors.customer_name}</p>}
                </div>
                <div>
                  <label htmlFor="qq-phone_number" className={labelClass}>
                    Phone <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="tel"
                    id="qq-phone_number"
                    value={formData.phone_number}
                    onChange={(e) => updateForm("phone_number", e.target.value)}
                    className={inputClass(!!errors.phone_number)}
                    placeholder="+91 98765 43210"
                    aria-invalid={!!errors.phone_number}
                    aria-describedby={errors.phone_number ? "qq-phone_number-error" : undefined}
                  />
                  {errors.phone_number && <p id="qq-phone_number-error" className="text-xs text-brand-red mt-1 font-medium">{errors.phone_number}</p>}
                </div>
              </div>

              {/* Row 2: Origin + Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="qq-pickup_address" className={labelClass}>
                    Moving From <span className="text-brand-red">*</span>
                  </label>
                  <div className="relative">
                    <LocationAutocomplete
                      id="qq-pickup_address"
                      value={formData.pickup_address}
                      onChange={(data) => {
                        updateForm("pickup_address", data.address);
                        updateForm("pickup_place_id", data.place_id);
                        updateForm("pickup_city", data.city);
                        updateForm("pickup_state", data.state);
                      }}
                      placeholder="e.g. Delhi"
                      hasError={!!errors.pickup_address}
                      errorMessage={errors.pickup_address}
                      align="left"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="qq-drop_address" className={labelClass}>
                    Moving To <span className="text-brand-red">*</span>
                  </label>
                  <div className="relative">
                    <LocationAutocomplete
                      id="qq-drop_address"
                      value={formData.drop_address}
                      onChange={(data) => {
                        updateForm("drop_address", data.address);
                        updateForm("drop_place_id", data.place_id);
                        updateForm("drop_city", data.city);
                        updateForm("drop_state", data.state);
                      }}
                      placeholder="e.g. Mumbai"
                      hasError={!!errors.drop_address}
                      errorMessage={errors.drop_address}
                      align="right"
                    />
                  </div>
                </div>
              </div>

              {/* Service type */}
              <div>
                <label htmlFor="qq-service_type" className={labelClass}>
                  Service Type
                </label>
                <div className="relative">
                  <select
                    id="qq-service_type"
                    value={formData.service_type}
                    onChange={(e) => updateForm("service_type", e.target.value)}
                    className={`${inputClass(false)} appearance-none pr-9 cursor-pointer`}
                  >
                    {servicesData.map((s) => (
                      <option key={s.title} value={s.title}>
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

              {/* Fine print */}
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
