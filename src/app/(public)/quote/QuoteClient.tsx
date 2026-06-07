"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { LocationAutocomplete } from "@/components/forms/LocationAutocomplete";
import { CTAButton } from "@/components/shared/CTAButton";
import { SecondaryButton } from "@/components/shared/SecondaryButton";
import { TextCTA } from "@/components/shared/TextCTA";
import { EmptyState } from "@/components/shared/EmptyState";
import { QuoteLeadPayload } from "@/types/lead";

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
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuoteLeadPayload & { isWhatsAppSame: boolean; preferredDate: string; }>(() => {
    const qsName = searchParams ? searchParams.get('customer_name') : null;
    const qsPhone = searchParams ? searchParams.get('phone_number') : null;
    const qsPickup = searchParams ? searchParams.get('pickup_address') : null;
    const qsDrop = searchParams ? searchParams.get('drop_address') : null;
    const qsService = searchParams ? searchParams.get('service_type') : null;

    return {
      customer_name: qsName || "",
      phone_number: qsPhone || "",
      whatsapp_number: "",
      preferred_contact_method: "WhatsApp",
      email: "",
      service_type: qsService || "",
      vehicle_model: "",
      pickup_place_id: "",
      pickup_city: "",
      pickup_state: "",
      drop_place_id: "",
      drop_city: "",
      drop_state: "",
      distance_km: "",
      isWhatsAppSame: true,
      pickup_address: qsPickup || "",
      drop_address: qsDrop || "",
      preferredDate: "",
      notes: ""
    };
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const updateForm = <K extends keyof (QuoteLeadPayload & { isWhatsAppSame: boolean; preferredDate: string; }) & string>(
    field: K,
    value: (QuoteLeadPayload & { isWhatsAppSame: boolean; preferredDate: string; })[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.customer_name.trim()) newErrors.customer_name = 'Please enter your full name.';
      if (!formData.phone_number.trim()) newErrors.phone_number = 'Please enter your 10-digit mobile number.';
      else if (!/^[6-9]\d{9}$/.test(formData.phone_number.replace(/[\s-]/g, ''))) newErrors.phone_number = 'Please enter a valid 10-digit mobile number.';

      if (!formData.isWhatsAppSame) {
        if (!formData.whatsapp_number.trim()) newErrors.whatsapp_number = 'Please enter a valid 10-digit WhatsApp number.';
        else if (!/^[6-9]\d{9}$/.test(formData.whatsapp_number.replace(/[\s-]/g, ''))) newErrors.whatsapp_number = 'Please enter a valid 10-digit WhatsApp number.';
      }

      if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }
    if (step === 2) {
      // Fallback allowed: no longer require place_id strictly, just the string value
      if (!formData.pickup_address.trim()) newErrors.pickup_address = 'Please enter pickup city or location.';
      if (!formData.drop_address.trim()) newErrors.drop_address = 'Please enter destination city or location.';
      if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred move date.';
    }
    if (step === 3) {
      if (!formData.service_type) newErrors.service_type = 'Please select a service type.';

      if ((formData.service_type === "Car Transportation" || formData.service_type === "Bike Transportation") && !formData.vehicle_model?.trim()) {
        newErrors.vehicle_model = 'Please enter your vehicle make and model.';
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      const payload: QuoteLeadPayload = {
        ...formData,
        whatsapp_number: formData.isWhatsAppSame ? formData.phone_number : formData.whatsapp_number,
      };
      console.log("Submitting payload:", payload);

      try {
        const response = await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit quote request');
        }

        if (data.lead?.id) {
          setLeadId(data.lead.id);
        }
        setIsSuccess(true);
        // Removed focusWizardCard() to prevent scrolling down
      } catch (err) {
        console.error("Submission failed:", err);
        alert(err instanceof Error ? err.message : "Failed to submit quote request. Please try again later.");
      }
    }
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
            {/* Success Modal Overlay */}
            {isSuccess && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[20px] shadow-2xl max-w-[480px] w-full text-center relative animate-in zoom-in-95 duration-300">
                  <div className="mx-auto w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center mb-6 ring-8 ring-[#DCFCE7]/30">
                    <svg className="w-8 h-8 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-black text-[#0F172A] mb-3 tracking-tight">Quote Request Submitted!</h3>
                  <p className="text-[15px] text-[#4B5563] leading-relaxed mb-6">
                    Thank you for choosing us. Our logistics team will review your requirements and contact you shortly.
                  </p>
                  
                  {leadId && (
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 mb-8 inline-block w-full">
                      <span className="block text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Reference ID</span>
                      <span className="block text-lg font-mono font-bold text-[#0F172A]">{leadId.substring(0, 8).toUpperCase()}</span>
                    </div>
                  )}
                  
                  <CTAButton onClick={() => { window.location.href = '/'; }} className="w-full justify-center">
                    Back to Homepage
                  </CTAButton>
                </div>
              </div>
            )}

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
                            <label htmlFor="customer_name" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Full Name <span className="text-brand-red">*</span></label>
                            <input type="text" id="customer_name" value={formData.customer_name} onChange={(e) => updateForm("customer_name", e.target.value)} className={inputClass(!!errors.customer_name)} placeholder="Enter your full name" aria-invalid={!!errors.customer_name} aria-describedby={errors.customer_name ? "customer_name-error" : undefined} />
                            {errors.customer_name && <p id="customer_name-error" className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.customer_name}</p>}
                          </div>
                          <div>
                            <label htmlFor="phone_number" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Phone Number <span className="text-brand-red">*</span></label>
                            <input type="tel" id="phone_number" value={formData.phone_number} onChange={(e) => updateForm("phone_number", e.target.value)} className={inputClass(!!errors.phone_number)} placeholder="Enter your 10-digit mobile number" aria-invalid={!!errors.phone_number} aria-describedby={errors.phone_number ? "phone_number-error" : undefined} />
                            {errors.phone_number && <p id="phone_number-error" className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.phone_number}</p>}
                          </div>

                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="isWhatsAppSame" checked={formData.isWhatsAppSame} onChange={(e) => updateForm("isWhatsAppSame", e.target.checked)} className="w-4 h-4 text-brand-blue border-[#D1D5DB] rounded focus:ring-brand-blue" />
                            <label htmlFor="isWhatsAppSame" className="text-sm font-medium text-[#4B5563]">This is also my WhatsApp number</label>
                          </div>

                          {!formData.isWhatsAppSame && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                              <label htmlFor="whatsapp_number" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">WhatsApp Number <span className="text-brand-red">*</span></label>
                              <input type="tel" id="whatsapp_number" value={formData.whatsapp_number} onChange={(e) => updateForm("whatsapp_number", e.target.value)} className={inputClass(!!errors.whatsapp_number)} placeholder="Enter your 10-digit WhatsApp number" aria-invalid={!!errors.whatsapp_number} aria-describedby={errors.whatsapp_number ? "whatsapp_number-error" : undefined} />
                              {errors.whatsapp_number && <p id="whatsapp_number-error" className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.whatsapp_number}</p>}
                            </div>
                          )}

                          <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Email Address <span className="text-[#9CA3AF] font-normal">(Optional)</span></label>
                            <input type="email" id="email" value={formData.email} onChange={(e) => updateForm("email", e.target.value)} className={inputClass(!!errors.email)} placeholder="john@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                            {errors.email && <p id="email-error" className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.email}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Preferred Contact Method</label>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                              {(["WhatsApp", "Phone Call", "Either"] as const).map((method) => (
                                <button
                                  key={method}
                                  type="button"
                                  onClick={() => updateForm("preferred_contact_method", method)}
                                  className={`flex-1 py-2 px-3 min-w-[100px] text-[13px] sm:text-[14px] font-medium rounded-lg border transition-colors ${formData.preferred_contact_method === method ? 'bg-[#EFF6FF] border-[#3B82F6] text-[#1D4ED8]' : 'bg-white border-[#D1D5DB] text-[#4B5563] hover:bg-[#F9FAFB]'}`}
                                >
                                  {method}
                                </button>
                              ))}
                            </div>
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
                            <label htmlFor="pickup_address" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Pickup Location <span className="text-brand-red">*</span></label>
                            <div className="relative">
                              <LocationAutocomplete
                                id="pickup_address"
                                value={formData.pickup_address}
                                onChange={(data) => {
                                  updateForm("pickup_address", data.address);
                                  updateForm("pickup_place_id", data.place_id);
                                  updateForm("pickup_city", data.city);
                                  updateForm("pickup_state", data.state);
                                }}
                                placeholder="Enter pickup city or location"
                                hasError={!!errors.pickup_address}
                                errorMessage={errors.pickup_address}
                              />
                              {/* Fallback suggestion hint */}
                              {!errors.pickup_address && (
                                <p className="text-[11px] text-[#6B7280] mt-1.5 ml-1">Please select from suggestions for better accuracy.</p>
                              )}
                            </div>
                          </div>
                          <div>
                            <label htmlFor="drop_address" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Delivery Location <span className="text-brand-red">*</span></label>
                            <div className="relative">
                              <LocationAutocomplete
                                id="drop_address"
                                value={formData.drop_address}
                                onChange={(data) => {
                                  updateForm("drop_address", data.address);
                                  updateForm("drop_place_id", data.place_id);
                                  updateForm("drop_city", data.city);
                                  updateForm("drop_state", data.state);
                                }}
                                placeholder="Enter destination city or location"
                                hasError={!!errors.drop_address}
                                errorMessage={errors.drop_address}
                              />
                              {!errors.drop_address && (
                                <p className="text-[11px] text-[#6B7280] mt-1.5 ml-1">Please select from suggestions for better accuracy.</p>
                              )}
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
                            <label htmlFor="service_type" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Service Type <span className="text-brand-red">*</span></label>
                            <select id="service_type" value={formData.service_type} onChange={(e) => updateForm("service_type", e.target.value)} className={`${inputClass(!!errors.service_type)} appearance-none pr-9`} aria-invalid={!!errors.service_type} aria-describedby={errors.service_type ? "service_type-error" : undefined}>
                              <option value="">Select a service...</option>
                              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <svg className="absolute right-3 top-[38px] w-4 h-4 text-[#9CA3AF] pointer-events-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                            {errors.service_type && <p id="service_type-error" className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.service_type}</p>}
                          </div>

                          {(formData.service_type === "Car Transportation" || formData.service_type === "Bike Transportation") && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                              <label htmlFor="vehicle_model" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Vehicle Make & Model <span className="text-brand-red">*</span></label>
                              <input type="text" id="vehicle_model" value={formData.vehicle_model || ""} onChange={(e) => updateForm("vehicle_model", e.target.value)} className={inputClass(!!errors.vehicle_model)} placeholder="Example: Hyundai Creta" aria-invalid={!!errors.vehicle_model} aria-describedby={errors.vehicle_model ? "vehicle_model-error" : undefined} />
                              {errors.vehicle_model && <p id="vehicle_model-error" className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.vehicle_model}</p>}
                            </div>
                          )}

                          <div>
                            <label htmlFor="notes" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Additional Notes <span className="text-[#6B7280] font-normal">(Optional)</span></label>
                            <textarea id="notes" rows={4} value={formData.notes || ""} onChange={(e) => updateForm("notes", e.target.value)} className={textareaClass(false)} placeholder="Inventory details, special requirements, or questions..."></textarea>
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
                            <span className="sm:col-span-2 text-background-dark font-medium break-words">{formData.customer_name}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-[#E5E7EB] pb-4">
                            <span className="font-semibold text-[#374151]">Contact:</span>
                            <span className="sm:col-span-2 text-background-dark font-medium break-words">{formData.phone_number}{formData.email ? ` • ${formData.email}` : ''}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-[#E5E7EB] pb-4">
                            <span className="font-semibold text-[#374151]">Route:</span>
                            <span className="sm:col-span-2 text-background-dark font-medium break-words">{formData.pickup_city || formData.pickup_address} → {formData.drop_city || formData.drop_address}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-[#E5E7EB] pb-4">
                            <span className="font-semibold text-[#374151]">Date:</span>
                            <span className="sm:col-span-2 text-background-dark font-medium">{formData.preferredDate}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 pb-1">
                            <span className="font-semibold text-[#374151]">Service:</span>
                            <span className="sm:col-span-2 text-background-dark font-medium break-words">{formData.service_type}</span>
                          </div>
                          {formData.vehicle_model && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-[#E5E7EB]">
                              <span className="font-semibold text-[#374151]">Vehicle:</span>
                              <span className="sm:col-span-2 text-background-dark font-medium break-words">{formData.vehicle_model}</span>
                            </div>
                          )}
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
          </div>

        </div>
      </SectionContainer>
    </main>
  );
}
