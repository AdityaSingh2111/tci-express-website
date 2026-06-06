"use client";

import React, { useState } from 'react';
import { CTAButton } from '@/components/shared/CTAButton';
import { ContactPayload } from '@/types/lead';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactPayload & { isWhatsAppSame: boolean }>({
    customer_name: "",
    email: "",
    phone_number: "",
    whatsapp_number: "",
    preferred_contact_method: "WhatsApp",
    subject: "",
    message: "",
    enquiry_type: "",
    isWhatsAppSame: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.customer_name.trim()) newErrors.customer_name = 'Please enter your full name.';

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone_number.trim()) newErrors.phone_number = 'Please enter your 10-digit mobile number.';
    else if (!/^[6-9]\d{9}$/.test(formData.phone_number.replace(/[\s-]/g, ''))) newErrors.phone_number = 'Please enter a valid 10-digit mobile number.';

    if (!formData.isWhatsAppSame) {
      if (!formData.whatsapp_number?.trim()) newErrors.whatsapp_number = 'Please enter your WhatsApp number.';
      else if (!/^[6-9]\d{9}$/.test(formData.whatsapp_number.replace(/[\s-]/g, ''))) newErrors.whatsapp_number = 'Please enter a valid 10-digit WhatsApp number.';
    }

    if (!formData.message?.trim()) newErrors.message = 'Please enter a message to continue.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      setTimeout(() => {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }, 0);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Setup payload correctly before submission
    const payload: ContactPayload = {
      ...formData,
      whatsapp_number: formData.isWhatsAppSame ? formData.phone_number : formData.whatsapp_number,
    };
    console.log("Submitting contact payload:", payload);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const updateForm = <K extends keyof (ContactPayload & { isWhatsAppSame: boolean }) & string>(
    field: K,
    value: (ContactPayload & { isWhatsAppSame: boolean })[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-6 md:p-8 border border-[#E5E7EB] rounded-2xl shadow-sm max-w-[480px] w-full mx-auto lg:mx-0 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-[#DCFCE7] flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-background-dark mb-2">Message Sent!</h3>
        <p className="text-[#6B7280] mb-6">Thank you for reaching out. Our team will get back to you within 1 business hour.</p>
        <button onClick={() => {
          setIsSuccess(false);
          setFormData({ ...formData, message: "", subject: "" });
        }} className="text-brand-blue font-semibold hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = (hasError: boolean) =>
    `w-full h-[44px] md:h-[48px] px-4 rounded-[12px] bg-[#F9FAFB] border ${hasError ? 'border-brand-red focus:ring-brand-red/20 focus:border-brand-red bg-[#FEF2F2]' : 'border-[#D1D5DB] focus:ring-brand-blue/20 focus:border-brand-blue'} focus:bg-white focus:outline-none focus:ring-2 transition-colors text-[15px] placeholder:text-[#9CA3AF]`;

  const textareaClass = (hasError: boolean) =>
    `w-full p-4 rounded-[12px] bg-[#F9FAFB] border ${hasError ? 'border-brand-red focus:ring-brand-red/20 focus:border-brand-red bg-[#FEF2F2]' : 'border-[#D1D5DB] focus:ring-brand-blue/20 focus:border-brand-blue'} focus:bg-white focus:outline-none focus:ring-2 transition-colors text-[15px] resize-y placeholder:text-[#9CA3AF]`;

  return (
    <div className="bg-white p-6 md:p-8 border border-[#E5E7EB] rounded-2xl shadow-sm max-w-[480px] w-full mx-auto lg:mx-0">
      <h2 className="text-[20px] font-bold text-[#000000] mb-5">
        Send us a Message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <input type="text" name="_gotcha" tabIndex={-1} aria-hidden="true" className="hidden" autoComplete="off" />

        <div>
          <label htmlFor="customer_name" className="block text-sm font-medium text-[#000000] mb-1">Full Name <span className="text-brand-red">*</span></label>
          <input type="text" id="customer_name" value={formData.customer_name} onChange={(e) => updateForm("customer_name", e.target.value)} placeholder="Enter your full name" maxLength={100} autoComplete="name" className={inputClass(!!errors.customer_name)} aria-invalid={!!errors.customer_name} aria-describedby={errors.customer_name ? 'customer_name-error' : undefined} />
          {errors.customer_name && <p id="customer_name-error" role="alert" className="text-xs text-brand-red mt-1 font-medium">{errors.customer_name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#000000] mb-1">Email Address <span className="text-brand-red">*</span></label>
          <input type="email" id="email" value={formData.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="john@example.com" maxLength={254} autoComplete="email" className={inputClass(!!errors.email)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
          {errors.email && <p id="email-error" role="alert" className="text-xs text-brand-red mt-1 font-medium">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-[#000000] mb-1">Phone Number <span className="text-brand-red">*</span></label>
          <input type="tel" id="phone_number" value={formData.phone_number} onChange={(e) => updateForm("phone_number", e.target.value)} placeholder="Enter your 10-digit mobile number" maxLength={20} autoComplete="tel" className={inputClass(!!errors.phone_number)} aria-invalid={!!errors.phone_number} aria-describedby={errors.phone_number ? 'phone_number-error' : undefined} />
          {errors.phone_number && <p id="phone_number-error" role="alert" className="text-xs text-brand-red mt-1 font-medium">{errors.phone_number}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="contactIsWhatsAppSame" checked={formData.isWhatsAppSame} onChange={(e) => updateForm("isWhatsAppSame", e.target.checked)} className="w-4 h-4 text-brand-blue border-[#D1D5DB] rounded focus:ring-brand-blue" />
          <label htmlFor="contactIsWhatsAppSame" className="text-sm font-medium text-[#4B5563]">This is also my WhatsApp number</label>
        </div>

        {!formData.isWhatsAppSame && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label htmlFor="whatsapp_number" className="block text-sm font-medium text-[#000000] mb-1">WhatsApp Number <span className="text-brand-red">*</span></label>
            <input type="tel" id="whatsapp_number" value={formData.whatsapp_number || ""} onChange={(e) => updateForm("whatsapp_number", e.target.value)} className={inputClass(!!errors.whatsapp_number)} placeholder="Enter your WhatsApp number" aria-invalid={!!errors.whatsapp_number} aria-describedby={errors.whatsapp_number ? "whatsapp_number-error" : undefined} />
            {errors.whatsapp_number && <p id="whatsapp_number-error" className="text-xs text-brand-red mt-1 font-medium">{errors.whatsapp_number}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#000000] mb-1">Preferred Contact Method</label>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {(["WhatsApp", "Phone Call", "Either"] as const).map((method) => (
              <button key={method} type="button" onClick={() => updateForm("preferred_contact_method", method)} className={`flex-1 py-2 px-3 min-w-[100px] text-[13px] sm:text-[14px] font-medium rounded-lg border transition-colors ${formData.preferred_contact_method === method ? 'bg-[#EFF6FF] border-[#3B82F6] text-[#1D4ED8]' : 'bg-white border-[#D1D5DB] text-[#4B5563] hover:bg-[#F9FAFB]'}`}>
                {method}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="enquiry_type" className="block text-sm font-medium text-[#000000] mb-1">Enquiry Type <span className="text-[#6B7280] font-normal">(Optional)</span></label>
          <select id="enquiry_type" value={formData.enquiry_type || ""} onChange={(e) => updateForm("enquiry_type", e.target.value)} className={`${inputClass(false)} bg-white appearance-none cursor-pointer`}>
            <option value="">Select enquiry type...</option>
            <option value="General Enquiry">General Enquiry</option>
            <option value="Service Enquiry">Service Enquiry</option>
            <option value="Complaint">Complaint</option>
            <option value="Feedback">Feedback</option>
            <option value="Partnership">Partnership</option>
            <option value="Career">Career</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[#000000] mb-1">Subject <span className="text-[#6B7280] font-normal">(Optional)</span></label>
          <input type="text" id="subject" value={formData.subject || ""} onChange={(e) => updateForm("subject", e.target.value)} placeholder="What is this regarding?" maxLength={200} className={inputClass(false)} />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#000000] mb-1">Message <span className="text-brand-red">*</span></label>
          <textarea id="message" value={formData.message} onChange={(e) => updateForm("message", e.target.value)} rows={4} placeholder="How can we help?" maxLength={2000} className={textareaClass(!!errors.message)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
          {errors.message && <p id="message-error" role="alert" className="text-xs text-brand-red mt-1 font-medium">{errors.message}</p>}
        </div>

        <CTAButton type="submit" disabled={isSubmitting} className="w-full mt-4">
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : 'Send Message'}
        </CTAButton>
      </form>
    </div>
  );
}
