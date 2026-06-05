'use client';

import React from 'react';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmit?: (e: React.FormEvent) => void;
  containerClassName?: string;
}

/**
 * SearchBar — Unified project-wide search component.
 * Height: 48px desktop / 44px mobile.
 * Radius: 12px.
 * Max Width: 520px (desktop), 100% (mobile).
 */
export function SearchBar({
  onSubmit,
  containerClassName = '',
  className = '',
  placeholder = 'Search...',
  ...props
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative flex items-center bg-white border border-[#D1D5DB] rounded-[12px] overflow-hidden focus-within:ring-2 focus-within:ring-brand-blue/20 focus-within:border-brand-blue transition-all h-[44px] md:h-[48px] w-full max-w-full md:max-w-[520px] shadow-sm ${containerClassName}`}
    >
      <div className="pl-4 pr-3 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full h-full outline-none text-[15px] text-background-dark bg-transparent pr-4 placeholder:text-[#9CA3AF] ${className}`}
        {...props}
      />
    </form>
  );
}
