"use client";

import React, { useState } from "react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { LocationAutocomplete } from "@/components/forms/LocationAutocomplete";
import { CTAButton } from "@/components/shared/CTAButton";
import { SecondaryButton } from "@/components/shared/SecondaryButton";
import { TextCTA } from "@/components/shared/TextCTA";
import { EmptyState } from "@/components/shared/EmptyState";

const SERVICES = [
  "Car Transportation",
  "Bike Transportation",
  "Household Shifting",
  "Office Relocation",
  "Warehousing",
  "Loading & Unloading",
  "Commercial Relocation",
  "Packers & Movers"
];

export function QuoteClient() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceType: "",
    pickupCity: "",
    deliveryCity: "",
    preferredDate: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
      if (!formData.phone.trim()) newErrors.phone = 'Please enter a valid 10-digit mobile number.';
      else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) newErrors.phone = 'Please enter a valid 10-digit mobile number.';
      if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }
    if (step === 2) {
      if (!formData.pickupCity.trim()) newErrors.pickupCity = 'Please enter a pickup city.';
      if (!formData.deliveryCity.trim()) newErrors.deliveryCity = 'Please enter a destination city.';
      if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred move date.';
    }
    if (step === 3) {
      if (!formData.serviceType) newErrors.serviceType = 'Please select a service type.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorFieldId = Object.keys(newErrors)[0];
      setTimeout(() => {
        const element = document.getElementById(firstErrorFieldId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }, 0);
      return false;
    }
    setErrors({});
    return true;
  };

  const focusWizardCard = () => {
    setTimeout(() => {
      document.getElementById('quote-wizard-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 0);
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(s => s + 1);
      focusWizardCard();
    }
  };

  const prevStep = () => {
    setStep(s => s - 1);
    focusWizardCard();
  };

  const inputClass = (hasError: boolean) => 
    `w-full max-w-full min-w-0 block box-border h-[44px] md:h-[48px] px-4 rounded-[12px] bg-[#F9FAFB] border ${hasError ? 'border-brand-red focus:ring-brand-red/20 focus:border-brand-red bg-[#FEF2F2]' : 'border-[#D1D5DB] focus:ring-brand-blue/20 focus:border-brand-blue'} focus:bg-white focus:outline-none focus:ring-2 transition-colors text-[15px] placeholder:text-[#9CA3AF]`;
    
  const textareaClass = (hasError: boolean) =>
    `w-full max-w-full min-w-0 block p-4 rounded-[12px] bg-[#F9FAFB] border ${hasError ? 'border-brand-red focus:ring-brand-red/20 focus:border-brand-red bg-[#FEF2F2]' : 'border-[#D1D5DB] focus:ring-brand-blue/20 focus:border-brand-blue'} focus:bg-white focus:outline-none focus:ring-2 transition-colors text-[15px] resize-y placeholder:text-[#9CA3AF]`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    focusWizardCard();
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <main className="pb-28 md:pb-12">
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-12 border-b border-[#E5E7EB]">
        <SectionHeader
          title="Get a Free Estimate"
          subtitle="Use our quick multi-step wizard to receive a customized quote from our relocation experts."
          as="h1"
        />
      </SectionContainer>

      <SectionContainer>
        <div className="max-w-2xl mx-auto px-2 sm:px-0">
          <div id="quote-wizard-card" className="scroll-mt-24">
            {isSuccess ? (
              <div className="bg-white p-5 sm:p-6 md:p-10 rounded-2xl shadow-sm border border-[#E5E7EB]">
                <div className="py-8">
                  <EmptyState
                    title="Quote Submitted Successfully"
                    description="Thank you for contacting us. Our logistics team will contact you shortly."
                    icon={
                      <svg className="w-8 h-8 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    }
                  />
                </div>
              </div>
            ) : (
              <>
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#E5E7EB] -z-10 rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#16A34A] -z-10 rounded-full transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors duration-300 bg-white ${step >= s ? "border-[#16A34A] text-[#16A34A]" : "border-[#E5E7EB] text-[#9CA3AF]"}`}>
                      {step > s ? "✓" : s}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs font-semibold text-[#4B5563] mt-2 uppercase tracking-wide">
                  <span>Personal</span>
                  <span>Location</span>
                  <span>Service</span>
                  <span>Review</span>
                </div>
              </div>

              {/* Form Wizard */}
              <div className="bg-white p-5 sm:p-6 md:p-10 rounded-2xl shadow-sm border border-[#E5E7EB]">
                <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto w-full" noValidate>
              
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-[#000000] mb-6 tracking-[-0.02em]">Personal Details</h2>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Full Name <span className="text-brand-red">*</span></label>
                      <input type="text" id="fullName" value={formData.fullName} onChange={(e) => updateForm("fullName", e.target.value)} className={inputClass(!!errors.fullName)} placeholder="John Doe" aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} />
                      {errors.fullName && <p id="fullName-error" className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.fullName}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Phone Number <span className="text-brand-red">*</span></label>
                      <input type="tel" id="phone" value={formData.phone} onChange={(e) => updateForm("phone", e.target.value)} className={inputClass(!!errors.phone)} placeholder="+91 98765 43210" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
                      {errors.phone && <p id="phone-error" className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Email Address <span className="text-[#9CA3AF] font-normal">(Optional)</span></label>
                      <input type="email" id="email" value={formData.email} onChange={(e) => updateForm("email", e.target.value)} className={inputClass(!!errors.email)} placeholder="john@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                      {errors.email && <p id="email-error" className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.email}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Location Details */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-[#000000] mb-6 tracking-[-0.02em]">Move Details</h2>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="pickupCity" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Pickup Location <span className="text-brand-red">*</span></label>
                      <div className="relative">
                        <LocationAutocomplete
                          id="pickupCity"
                          value={formData.pickupCity}
                          onChange={(val) => updateForm("pickupCity", val)}
                          placeholder="Search pickup area, building, or city..."
                          hasError={!!errors.pickupCity}
                          errorMessage={errors.pickupCity}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="deliveryCity" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Delivery Location <span className="text-brand-red">*</span></label>
                      <div className="relative">
                        <LocationAutocomplete
                          id="deliveryCity"
                          value={formData.deliveryCity}
                          onChange={(val) => updateForm("deliveryCity", val)}
                          placeholder="Search destination area, building, or city..."
                          hasError={!!errors.deliveryCity}
                          errorMessage={errors.deliveryCity}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Preferred Move Date <span className="text-brand-red">*</span></label>
                      <div className="relative w-full max-w-full overflow-hidden rounded-[12px]">
                        <input type="date" min={getMinDate()} id="preferredDate" value={formData.preferredDate} onChange={(e) => updateForm("preferredDate", e.target.value)} className={inputClass(!!errors.preferredDate)} aria-invalid={!!errors.preferredDate} aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined} />
                      </div>
                      {errors.preferredDate && <p id="preferredDate-error" className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.preferredDate}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Service Details */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-[#000000] mb-6 tracking-[-0.02em]">Service Details</h2>
                  <div className="space-y-5">
                    <div className="relative">
                      <label htmlFor="serviceType" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Service Type <span className="text-brand-red">*</span></label>
                      <select id="serviceType" value={formData.serviceType} onChange={(e) => updateForm("serviceType", e.target.value)} className={`${inputClass(!!errors.serviceType)} appearance-none pr-9`} aria-invalid={!!errors.serviceType} aria-describedby={errors.serviceType ? "serviceType-error" : undefined}>
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <svg className="absolute right-3 top-[38px] w-4 h-4 text-[#9CA3AF] pointer-events-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                      {errors.serviceType && <p id="serviceType-error" className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.serviceType}</p>}
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Additional Notes <span className="text-[#6B7280] font-normal">(Optional)</span></label>
                      <textarea id="notes" rows={4} value={formData.notes} onChange={(e) => updateForm("notes", e.target.value)} className={textareaClass(false)} placeholder="Inventory details, special requirements, or questions..."></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-[#000000] mb-6 tracking-[-0.02em]">Review & Submit</h2>
                  <div className="bg-[#F9FAFB] p-5 md:p-6 rounded-[12px] border border-[#E5E7EB] space-y-4 text-sm text-[#4B5563]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-[#E5E7EB] pb-4">
                      <span className="font-semibold text-[#374151]">Name:</span>
                      <span className="sm:col-span-2 text-background-dark font-medium break-words">{formData.fullName}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-[#E5E7EB] pb-4">
                      <span className="font-semibold text-[#374151]">Contact:</span>
                      <span className="sm:col-span-2 text-background-dark font-medium break-words">{formData.phone}{formData.email ? ` • ${formData.email}` : ''}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-[#E5E7EB] pb-4">
                      <span className="font-semibold text-[#374151]">Route:</span>
                      <span className="sm:col-span-2 text-background-dark font-medium break-words">{formData.pickupCity} → {formData.deliveryCity}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-[#E5E7EB] pb-4">
                      <span className="font-semibold text-[#374151]">Date:</span>
                      <span className="sm:col-span-2 text-background-dark font-medium">{formData.preferredDate}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 pb-1">
                      <span className="font-semibold text-[#374151]">Service:</span>
                      <span className="sm:col-span-2 text-background-dark font-medium break-words">{formData.serviceType}</span>
                    </div>
                    {formData.notes && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-[#E5E7EB]">
                        <span className="font-semibold text-[#374151]">Notes:</span>
                        <span className="sm:col-span-2 text-background-dark font-medium break-words">{formData.notes}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <TextCTA type="button" onClick={() => setStep(1)}>Edit Details</TextCTA>
                  </div>
                  <p className="text-xs text-center text-[#6B7280] mt-4">
                    By submitting, you agree to our terms of service and consent to being contacted regarding this quote.
                  </p>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="grid grid-cols-[4fr_6fr] gap-3 sm:flex sm:flex-row sm:justify-between items-center pt-6 mt-6 border-t border-[#E5E7EB] w-full max-w-full overflow-hidden">
                <div className="min-w-0 w-full">
                  {step > 1 ? (
                    <SecondaryButton type="button" onClick={prevStep} className="w-full sm:w-auto justify-center !px-2 sm:!px-8 text-[14px] sm:text-[15px]">
                      ← Back
                    </SecondaryButton>
                  ) : (
                    <div className="w-full"></div>
                  )}
                </div>
                
                <div className="min-w-0 w-full">
                  {step < 4 ? (
                    <CTAButton type="button" onClick={(e) => { e.preventDefault(); nextStep(); }} className="w-full sm:w-auto justify-center !px-2 sm:!px-8 text-[14px] sm:text-[15px]">
                      Next Step →
                    </CTAButton>
                  ) : (
                    <CTAButton type="submit" className="w-full sm:w-auto justify-center bg-[#16A34A] hover:bg-[#15803D] active:bg-[#14532d] !border-none !px-2 sm:!px-8 text-[14px] sm:text-[15px]">
                      Submit Request
                    </CTAButton>
                  )}
                </div>
              </div>

                </form>
              </div>
            </>
          )}
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
