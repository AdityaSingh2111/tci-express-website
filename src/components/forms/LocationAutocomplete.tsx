/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export interface LocationData {
  address: string;
  place_id: string;
  city: string;
  state: string;
}

interface LocationAutocompleteProps {
  id: string;
  value: string; // The display value
  onChange: (data: LocationData) => void;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  align?: 'left' | 'right';
}

interface PredictionParsedText {
  mainText: string;
  secondaryText: string;
}

// Robust helper to safely extract and split prediction text into Primary/Secondary lines
const getPredictionText = (suggestion: any): PredictionParsedText => {
  const prediction = suggestion?.placePrediction;
  if (!prediction) return { mainText: "", secondaryText: "" };
  
  // Try mainText & secondaryText (new API FormattedText)
  const main = prediction.mainText && typeof prediction.mainText === 'object' && 'text' in prediction.mainText 
    ? prediction.mainText.text 
    : (typeof prediction.mainText === 'string' ? prediction.mainText : "");
    
  const secondary = prediction.secondaryText && typeof prediction.secondaryText === 'object' && 'text' in prediction.secondaryText 
    ? prediction.secondaryText.text 
    : (typeof prediction.secondaryText === 'string' ? prediction.secondaryText : "");

  if (main) {
    return { mainText: main, secondaryText: secondary };
  }

  // Fallbacks if mainText/secondaryText are not populated: parse the full text string
  let fullText = "";
  if (prediction.text && typeof prediction.text === 'object' && 'text' in prediction.text) {
    fullText = prediction.text.text;
  } else if (typeof prediction.text === 'string') {
    fullText = prediction.text;
  } else if (typeof prediction.toString === 'function') {
    const str = prediction.toString();
    if (str !== '[object Object]') fullText = str;
  }

  // Legacy fallbacks
  if (!fullText) {
    if (suggestion.description) {
      fullText = suggestion.description;
    } else if (suggestion.structured_formatting?.main_text) {
      return {
        mainText: suggestion.structured_formatting.main_text,
        secondaryText: suggestion.structured_formatting.secondary_text || ""
      };
    }
  }

  // Split fullText by first comma
  if (fullText) {
    const firstCommaIndex = fullText.indexOf(',');
    if (firstCommaIndex !== -1) {
      return {
        mainText: fullText.substring(0, firstCommaIndex).trim(),
        secondaryText: fullText.substring(firstCommaIndex + 1).trim()
      };
    }
    return { mainText: fullText, secondaryText: "" };
  }
  
  return { mainText: "", secondaryText: "" };
};

export function LocationAutocomplete({ 
  id, 
  value, 
  onChange, 
  placeholder = "Search location...",
  hasError,
  errorMessage,
  align = 'left'
}: LocationAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sessionTokenRef = useRef<any>(null);
  const ignoreNextFetch = useRef(false);

  const [isScriptLoaded, setIsScriptLoaded] = useState(
    () => typeof window !== 'undefined' && !!window.google?.maps
  );
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlight index when suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  // Fetch suggestions when value changes
  useEffect(() => {
    if (ignoreNextFetch.current) {
      ignoreNextFetch.current = false;
      return;
    }

    if (!isScriptLoaded || !window.google?.maps) return;

    if (!value || value.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setHighlightedIndex(-1);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const { AutocompleteSuggestion, AutocompleteSessionToken } = 
          await window.google.maps.importLibrary("places") as any;

        if (!sessionTokenRef.current) {
          sessionTokenRef.current = new AutocompleteSessionToken();
        }

        const request = {
          input: value,
          sessionToken: sessionTokenRef.current,
          includedRegionCodes: ["in"], // Biased to India
        };

        const { suggestions: fetchedSuggestions } = 
          await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

        setSuggestions(fetchedSuggestions || []);
        setHighlightedIndex(-1);
        const isFocused = document.activeElement === inputRef.current;
        if (isFocused && fetchedSuggestions && fetchedSuggestions.length > 0) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } catch (err) {
        console.error("Error fetching autocomplete suggestions:", err);
      }
    };

    // Debounce predictions fetching
    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [value, isScriptLoaded]);

  const handleSelect = async (suggestion: any) => {
    ignoreNextFetch.current = true;
    setIsOpen(false);

    try {
      const { Place, AutocompleteSessionToken } = await window.google.maps.importLibrary("places") as any;

      const placeId = suggestion.placePrediction.placeId;
      const place = new Place({ id: placeId });

      await place.fetchFields({
        fields: ["formattedAddress", "addressComponents"]
      });

      let city = "";
      let state = "";

      place.addressComponents?.forEach((component: any) => {
        if (component.types.includes("locality")) {
          city = component.longText || component.long_name || "";
        } else if (component.types.includes("administrative_area_level_1")) {
          state = component.longText || component.long_name || "";
        }
      });

      // Fallback if locality is missing
      if (!city) {
        place.addressComponents?.forEach((component: any) => {
          if (component.types.includes("administrative_area_level_2") || component.types.includes("sublocality_level_1")) {
            if (!city) city = component.longText || component.long_name || "";
          }
        });
      }

      // Reset session token after a successful place details fetch
      sessionTokenRef.current = new AutocompleteSessionToken();

      const parsed = getPredictionText(suggestion);
      const fallbackAddress = parsed.secondaryText ? `${parsed.mainText}, ${parsed.secondaryText}` : parsed.mainText;

      onChange({
        address: place.formattedAddress || fallbackAddress || "",
        place_id: placeId,
        city,
        state
      });
    } catch (err) {
      console.error("Error fetching place details:", err);
      // Fallback to text suggestion only
      const parsed = getPredictionText(suggestion);
      const fallbackAddress = parsed.secondaryText ? `${parsed.mainText}, ${parsed.secondaryText}` : parsed.mainText;
      onChange({
        address: fallbackAddress,
        place_id: suggestion.placePrediction.placeId,
        city: "",
        state: ""
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1 < suggestions.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      if (inputRef.current) {
        inputRef.current.blur();
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  return (
    <>
      <Script 
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&loading=async`} 
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)}
      />
      
      <div className="relative" ref={containerRef}>
        <div
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#9CA3AF] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          id={id}
          value={value}
          onChange={(e) => {
            onChange({ address: e.target.value, place_id: "", city: "", state: "" });
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
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
          aria-expanded={isOpen}
          aria-controls={isOpen ? `${id}-listbox` : undefined}
        />

        {isOpen && suggestions.length > 0 && (
          <div 
            id={`${id}-listbox`}
            role="listbox"
            className="absolute z-[9999] mt-2 bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] overflow-hidden max-h-[280px] overflow-y-auto divide-y divide-[#F3F4F6] w-full left-0 right-0"
          >
            {suggestions.map((suggestion, idx) => {
              const { mainText, secondaryText } = getPredictionText(suggestion);
              const isHighlighted = idx === highlightedIndex;
              return (
                <button
                  key={suggestion.placePrediction?.placeId || idx}
                  type="button"
                  role="option"
                  aria-selected={isHighlighted}
                  onClick={() => handleSelect(suggestion)}
                  className={`w-full text-left px-4 py-3.5 text-[15px] transition-colors flex items-center gap-3.5 focus:outline-none min-h-[64px] ${
                    isHighlighted ? 'bg-[#F8FAFC] text-brand-blue' : 'text-slate-800 hover:bg-[#F8FAFC] active:bg-[#F1F5F9]'
                  }`}
                >
                  {/* Location Icon on Left */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isHighlighted ? 'bg-[#EFF6FF] text-brand-blue' : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  
                  {/* Two-Line Suggestion Text */}
                  <div className="flex flex-col min-w-0 flex-1 justify-center">
                    <span className="font-extrabold text-[15px] text-[#0F172A] truncate leading-snug">
                      {mainText}
                    </span>
                    {secondaryText && (
                      <span className="text-[13px] text-[#64748B] truncate mt-0.5 font-medium leading-none">
                        {secondaryText}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

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
