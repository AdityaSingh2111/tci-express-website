'use client';

import React, { useState } from 'react';
import { CTAButton } from '@/components/shared/CTAButton';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name.';
    
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.phone.trim()) newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    
    if (!formData.service) newErrors.service = 'Please select a service type.';
    if (!formData.message.trim()) newErrors.message = 'Please enter a message to continue.';

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
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
        <button onClick={() => setIsSuccess(false)} className="text-brand-blue font-semibold hover:underline">
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
        {/* Honeypot — hidden from real users, catches bots */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden"
          autoComplete="off"
        />
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#000000] mb-1">Full Name <span className="text-brand-red">*</span></label>
           <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            maxLength={100}
            autoComplete="name"
            className={inputClass(!!errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" role="alert" className="text-xs text-brand-red mt-1 font-medium">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#000000] mb-1">Email Address <span className="text-[#6B7280] font-normal">(Optional)</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            maxLength={254}
            autoComplete="email"
            className={inputClass(!!errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" role="alert" className="text-xs text-brand-red mt-1 font-medium">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#000000] mb-1">Phone Number <span className="text-brand-red">*</span></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            maxLength={20}
            autoComplete="tel"
            className={inputClass(!!errors.phone)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <p id="phone-error" role="alert" className="text-xs text-brand-red mt-1 font-medium">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-[#000000] mb-1">Service Required <span className="text-brand-red">*</span></label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`${inputClass(!!errors.service)} bg-white appearance-none cursor-pointer`}
            aria-invalid={!!errors.service}
          >
            <option value="">Select a service...</option>
            <option value="household">Household Relocation</option>
            <option value="corporate">Corporate & Office</option>
            <option value="vehicle">Car & Bike Transport</option>
            <option value="international">International Moving</option>
          </select>
          {errors.service && <p className="text-xs text-brand-red mt-1 font-medium">{errors.service}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#000000] mb-1">Message <span className="text-brand-red">*</span></label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="How can we help?"
            maxLength={2000}
            className={textareaClass(!!errors.message)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && <p id="message-error" role="alert" className="text-xs text-brand-red mt-1 font-medium">{errors.message}</p>}
        </div>
        <CTAButton
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </CTAButton>
      </form>
    </div>
  );
}
