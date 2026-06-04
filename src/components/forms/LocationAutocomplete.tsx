'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface LocationAutocompleteProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
}

export function LocationAutocomplete({ 
  id, 
  value, 
  onChange, 
  placeholder = "Search location...",
  hasError,
  errorMessage 
}: LocationAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google?.maps?.places) {
      setIsScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !inputRef.current || !window.google?.maps?.places) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "in" },
      fields: ["formatted_address", "name"],
    });

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address);
      } else if (place.name) {
        onChange(place.name);
      }
    });

    return () => {
      if (window.google) {
        window.google.maps.event.removeListener(listener);
      }
    };
  }, [isScriptLoaded, onChange]);

  return (
    <>
      {/* We only load the script if there's an API key in env. 
          For demo purposes, this will load the API but show a "Development purposes only" watermark if key is missing/invalid.
      */}
      <Script 
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&libraries=places`} 
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)}
      />
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full h-14 px-4 rounded-xl border ${hasError ? 'border-[#E53E3E] focus:ring-[#E53E3E]/20 focus:border-[#E53E3E] bg-[#FEF2F2]' : 'border-[#D1D5DB] focus:ring-[#0052CC]/20 focus:border-[#0052CC] bg-white'} focus:outline-none focus:ring-2 transition-colors text-[16px]`}
          aria-invalid={!!hasError}
          aria-describedby={hasError && errorMessage ? `${id}-error` : undefined}
        />
        {/* Location Icon Overlay */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#9CA3AF]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      {hasError && errorMessage && (
        <p id={`${id}-error`} className="text-[13px] text-[#E53E3E] mt-2 font-medium flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{errorMessage}</p>
      )}
    </>
  );
}
