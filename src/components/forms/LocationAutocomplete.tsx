'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(
    () => typeof window !== 'undefined' && !!window.google?.maps?.places
  );

  // ── Initialize Google Places Autocomplete ─────────────────────────────────
  useEffect(() => {
    if (!isScriptLoaded || !inputRef.current || !window.google?.maps?.places) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "in" },
      fields: ["formatted_address", "name"],
    });
    autocompleteRef.current = autocomplete;

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

  // ── Keyboard navigation ───────────────────────────────────────────────────
  // The Google Places dropdown uses its own internal keyboard nav (Arrow keys,
  // ENTER to select). We only need to handle ESC to close the dropdown and
  // prevent form submission when the dropdown is open.
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      // Close the Google Places dropdown by blurring and re-focusing
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.trigger(autocompleteRef.current, 'place_changed');
      }
      if (inputRef.current) {
        inputRef.current.blur();
        // Re-focus after a tick so the user doesn't lose context
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
    // Prevent ENTER from submitting the parent form when the Google dropdown is visible
    if (e.key === 'Enter') {
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer && pacContainer.children.length > 0) {
        e.preventDefault();
      }
    }
  }, []);

  return (
    <>
      {/*
        Load Maps API lazily. The `lazyOnload` strategy defers until the
        browser is idle — zero render-blocking impact.
      */}
      <Script 
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&libraries=places`} 
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)}
      />
      
      <div className="relative">
        {/* Icon */}
        <div
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#9CA3AF] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className={`w-full max-w-full min-w-0 block h-[44px] md:h-[48px] pl-10 pr-4 rounded-[12px] bg-[#F9FAFB] border ${
            hasError
              ? 'border-brand-red focus:ring-brand-red/20 focus:border-brand-red bg-[#FEF2F2]'
              : 'border-[#D1D5DB] focus:ring-brand-blue/20 focus:border-brand-blue'
          } focus:bg-white focus:outline-none focus:ring-2 transition-colors text-[15px] placeholder:text-[#9CA3AF]`}
          aria-invalid={!!hasError}
          aria-describedby={hasError && errorMessage ? `${id}-error` : undefined}
          aria-autocomplete="list"
          role="combobox"
          aria-expanded="false"
        />
      </div>

      {/* Inline error message */}
      {hasError && errorMessage && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-[13px] text-brand-red mt-2 font-medium flex items-center gap-1.5"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {errorMessage}
        </p>
      )}
    </>
  );
}
