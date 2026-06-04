"use client";

import React, { useState } from "react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { LocationAutocomplete } from "@/components/forms/LocationAutocomplete";

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

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const nextStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
      if (!formData.phone.trim()) newErrors.phone = 'Please enter a valid 10-digit mobile number.';
      else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) newErrors.phone = 'Please enter a valid 10-digit mobile number.';
      if (!formData.email.trim()) newErrors.email = 'Please enter a valid email address.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
    }
    if (step === 2) {
      if (!formData.pickupCity.trim()) newErrors.pickupCity = 'Pickup City is required';
      if (!formData.deliveryCity.trim()) newErrors.deliveryCity = 'Delivery City is required';
      if (!formData.preferredDate) newErrors.preferredDate = 'Move Date is required';
    }
    if (step === 3) {
      if (!formData.serviceType) newErrors.serviceType = 'Service Type is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to top of the form so the user sees the validation errors on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Clear errors and go to next step
    setErrors({});
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("This is a CRM-ready form architecture. Backend submission is currently bypassed.\n\nForm Data:\n" + JSON.stringify(formData, null, 2));
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <main className="pb-24 md:pb-12">
      <SectionContainer className="bg-[#F9FAFB] pt-24 pb-12 border-b border-[#E5E7EB]">
        <SectionHeader
          title="Get a Free Estimate"
          subtitle="Use our quick multi-step wizard to receive a customized quote from our relocation experts."
          as="h1"
        />
      </SectionContainer>

      <SectionContainer>
        <div className="max-w-2xl mx-auto px-2 sm:px-0">
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
          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-[#E5E7EB]">
            <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto" noValidate>
              
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-[#000000] mb-6 tracking-[-0.02em]">Personal Details</h2>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Full Name <span className="text-[#E53E3E]">*</span></label>
                      <input type="text" id="fullName" value={formData.fullName} onChange={(e) => updateForm("fullName", e.target.value)} className={`w-full h-14 px-4 rounded-xl border ${errors.fullName ? 'border-[#E53E3E] focus:ring-[#E53E3E]/20 focus:border-[#E53E3E] bg-[#FEF2F2]' : 'border-[#D1D5DB] focus:ring-[#0052CC]/20 focus:border-[#0052CC] bg-white'} focus:outline-none focus:ring-2 transition-colors text-[16px]`} placeholder="John Doe" aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} />
                      {errors.fullName && <p id="fullName-error" className="text-[13px] text-[#E53E3E] mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.fullName}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Phone Number <span className="text-[#E53E3E]">*</span></label>
                      <input type="tel" id="phone" value={formData.phone} onChange={(e) => updateForm("phone", e.target.value)} className={`w-full h-14 px-4 rounded-xl border ${errors.phone ? 'border-[#E53E3E] focus:ring-[#E53E3E]/20 focus:border-[#E53E3E] bg-[#FEF2F2]' : 'border-[#D1D5DB] focus:ring-[#0052CC]/20 focus:border-[#0052CC] bg-white'} focus:outline-none focus:ring-2 transition-colors text-[16px]`} placeholder="+91 98765 43210" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
                      {errors.phone && <p id="phone-error" className="text-[13px] text-[#E53E3E] mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Email Address <span className="text-[#E53E3E]">*</span></label>
                      <input type="email" id="email" value={formData.email} onChange={(e) => updateForm("email", e.target.value)} className={`w-full h-14 px-4 rounded-xl border ${errors.email ? 'border-[#E53E3E] focus:ring-[#E53E3E]/20 focus:border-[#E53E3E] bg-[#FEF2F2]' : 'border-[#D1D5DB] focus:ring-[#0052CC]/20 focus:border-[#0052CC] bg-white'} focus:outline-none focus:ring-2 transition-colors text-[16px]`} placeholder="john@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                      {errors.email && <p id="email-error" className="text-[13px] text-[#E53E3E] mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.email}</p>}
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
                      <label htmlFor="pickupCity" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Pickup Location <span className="text-[#E53E3E]">*</span></label>
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
                      <label htmlFor="deliveryCity" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Delivery Location <span className="text-[#E53E3E]">*</span></label>
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
                      <label htmlFor="preferredDate" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Preferred Move Date <span className="text-[#E53E3E]">*</span></label>
                      <input type="date" min={getMinDate()} id="preferredDate" value={formData.preferredDate} onChange={(e) => updateForm("preferredDate", e.target.value)} className={`w-full h-14 px-4 rounded-xl border ${errors.preferredDate ? 'border-[#E53E3E] focus:ring-[#E53E3E]/20 focus:border-[#E53E3E] bg-[#FEF2F2]' : 'border-[#D1D5DB] focus:ring-[#0052CC]/20 focus:border-[#0052CC] bg-white'} focus:outline-none focus:ring-2 transition-colors text-[16px]`} aria-invalid={!!errors.preferredDate} aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined} />
                      {errors.preferredDate && <p id="preferredDate-error" className="text-[13px] text-[#E53E3E] mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.preferredDate}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Service Details */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-[#000000] mb-6 tracking-[-0.02em]">Service Details</h2>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="serviceType" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Service Type <span className="text-[#E53E3E]">*</span></label>
                      <select id="serviceType" value={formData.serviceType} onChange={(e) => updateForm("serviceType", e.target.value)} className={`w-full h-14 px-4 rounded-xl border ${errors.serviceType ? 'border-[#E53E3E] focus:ring-[#E53E3E]/20 focus:border-[#E53E3E] bg-[#FEF2F2]' : 'border-[#D1D5DB] focus:ring-[#0052CC]/20 focus:border-[#0052CC] bg-white'} focus:outline-none focus:ring-2 transition-colors appearance-none text-[16px]`} aria-invalid={!!errors.serviceType} aria-describedby={errors.serviceType ? "serviceType-error" : undefined}>
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.serviceType && <p id="serviceType-error" className="text-[13px] text-[#E53E3E] mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errors.serviceType}</p>}
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-sm font-semibold text-[#374151] mb-2 tracking-wide">Additional Notes <span className="text-[#6B7280] font-normal">(Optional)</span></label>
                      <textarea id="notes" rows={4} value={formData.notes} onChange={(e) => updateForm("notes", e.target.value)} className="w-full p-4 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] transition-colors resize-y text-[16px] bg-white" placeholder="Inventory details, special requirements, or questions..."></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-[#000000] mb-6 tracking-[-0.02em]">Review & Submit</h2>
                  <div className="bg-[#F9FAFB] p-6 rounded-xl border border-[#E5E7EB] space-y-4 text-sm text-[#4B5563]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-[#E5E7EB] pb-4">
                      <span className="font-semibold text-[#374151]">Name:</span>
                      <span className="sm:col-span-2 text-[#0D1117] font-medium">{formData.fullName}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-[#E5E7EB] pb-4">
                      <span className="font-semibold text-[#374151]">Contact:</span>
                      <span className="sm:col-span-2 text-[#0D1117] font-medium break-all">{formData.phone} • {formData.email}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-[#E5E7EB] pb-4">
                      <span className="font-semibold text-[#374151]">Route:</span>
                      <span className="sm:col-span-2 text-[#0D1117] font-medium">{formData.pickupCity} → {formData.deliveryCity}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-[#E5E7EB] pb-4">
                      <span className="font-semibold text-[#374151]">Date:</span>
                      <span className="sm:col-span-2 text-[#0D1117] font-medium">{formData.preferredDate}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 pb-1">
                      <span className="font-semibold text-[#374151]">Service:</span>
                      <span className="sm:col-span-2 text-[#0D1117] font-medium">{formData.serviceType}</span>
                    </div>
                    {formData.notes && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-[#E5E7EB]">
                        <span className="font-semibold text-[#374151]">Notes:</span>
                        <span className="sm:col-span-2 text-[#0D1117] font-medium">{formData.notes}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-[#0052CC] hover:underline">Edit Details</button>
                  </div>
                  <p className="text-xs text-center text-[#6B7280] mt-4">
                    By submitting, you agree to our terms of service and consent to being contacted regarding this quote.
                  </p>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t border-[#E5E7EB]">
                {step > 1 ? (
                  <button type="button" onClick={prevStep} className="px-5 py-3 md:px-6 md:py-3.5 text-[15px] font-semibold text-[#4B5563] hover:text-[#0D1117] hover:bg-[#F3F4F6] rounded-xl transition-colors border border-transparent touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]">
                    ← Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {step < 4 ? (
                  <button type="button" onClick={(e) => { e.preventDefault(); nextStep(); }} className="px-6 py-3 md:px-8 md:py-3.5 text-[15px] font-semibold bg-[#0052CC] text-white rounded-xl hover:bg-[#0043A8] transition-colors shadow-sm touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] active:scale-95 active:bg-[#00388C]">
                    Next Step →
                  </button>
                ) : (
                  <PrimaryButton type="submit" className="px-8 py-3 md:py-3.5 text-[15px] bg-[#16A34A] hover:bg-[#15803D] rounded-xl shadow-sm active:scale-95 active:bg-[#14532d]">
                    Submit Request
                  </PrimaryButton>
                )}
              </div>

            </form>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
