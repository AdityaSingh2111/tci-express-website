'use client';

import React, { useState } from 'react';
import { PrimaryButton } from '@/components/shared/PrimaryButton';

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
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) newErrors.phone = 'Valid phone is required';
    
    if (!formData.service) newErrors.service = 'Service is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
        <h3 className="text-xl font-bold text-[#0D1117] mb-2">Message Sent!</h3>
        <p className="text-[#6B7280] mb-6">Thank you for reaching out. Our team will get back to you within 1 business hour.</p>
        <button onClick={() => setIsSuccess(false)} className="text-[#0052CC] font-semibold hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = (hasError: boolean) => 
    `w-full h-11 px-4 rounded-md border ${hasError ? 'border-[#E53E3E] focus:ring-[#E53E3E]/20 focus:border-[#E53E3E]' : 'border-[#E5E7EB] focus:ring-[#0052CC]/20 focus:border-[#0052CC]'} focus:outline-none focus:ring-2 transition-colors`;

  return (
    <div className="bg-white p-6 md:p-8 border border-[#E5E7EB] rounded-2xl shadow-sm max-w-[480px] w-full mx-auto lg:mx-0">
      <h2 className="text-[20px] font-bold text-[#000000] mb-5">
        Send us a Message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#000000] mb-1">Full Name <span className="text-[#E53E3E]">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={inputClass(!!errors.name)}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-xs text-[#E53E3E] mt-1 font-medium">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#000000] mb-1">Email Address <span className="text-[#E53E3E]">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={inputClass(!!errors.email)}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs text-[#E53E3E] mt-1 font-medium">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#000000] mb-1">Phone Number <span className="text-[#E53E3E]">*</span></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={inputClass(!!errors.phone)}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="text-xs text-[#E53E3E] mt-1 font-medium">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-[#000000] mb-1">Service Required <span className="text-[#E53E3E]">*</span></label>
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
          {errors.service && <p className="text-xs text-[#E53E3E] mt-1 font-medium">{errors.service}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#000000] mb-1">Message <span className="text-[#E53E3E]">*</span></label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="How can we help you?"
            className={`w-full p-4 rounded-md border ${errors.message ? 'border-[#E53E3E] focus:ring-[#E53E3E]/20 focus:border-[#E53E3E]' : 'border-[#E5E7EB] focus:ring-[#0052CC]/20 focus:border-[#0052CC]'} focus:outline-none focus:ring-2 transition-colors resize-none`}
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className="text-xs text-[#E53E3E] mt-1 font-medium">{errors.message}</p>}
        </div>
        <PrimaryButton type="submit" disabled={isSubmitting} className="w-full h-11 text-[15px] mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </PrimaryButton>
      </form>
    </div>
  );
}
