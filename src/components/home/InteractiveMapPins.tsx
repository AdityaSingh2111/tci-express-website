"use client";

import React, { useState, useEffect, useRef } from 'react';
import { branchCoordinates } from '@/data/branchCoordinates';

/**
 * InteractiveMapPins
 * Renders the India map pins with robust hover/tap state management and premium tooltips.
 */
export function InteractiveMapPins() {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clear active pin when clicking outside the pins
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveCity(null);
      }
    }

    // Use capturing phase to ensure we close it even if child stops propagation
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none" ref={containerRef}>
      {branchCoordinates.map((branch) => {
        const isActive = activeCity === branch.city;
        
        // Dynamic tooltip positioning based on pin's Y position
        // If pin is in the top 15% of the map, show tooltip below it.
        const showBelow = branch.y < 15;

        return (
          <div
            key={branch.city}
            className={`absolute pointer-events-auto transition-transform duration-200 ${isActive ? 'scale-110 z-30' : 'hover:scale-110 z-10'}`}
            style={{ 
              top: `${branch.y}%`, 
              left: `${branch.x}%`, 
              transform: 'translate(-50%, -100%)' 
            }}
            onMouseEnter={() => setActiveCity(branch.city)}
            onMouseLeave={() => setActiveCity(null)}
          >
            {/* SVG Map Pin */}
            <button
              onClick={() => setActiveCity(isActive ? null : branch.city)}
              onFocus={() => setActiveCity(branch.city)}
              onBlur={() => setActiveCity(null)}
              className={`w-5 h-5 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue rounded-full ${isActive ? 'text-brand-red drop-shadow-[0_0_8px_rgba(229,62,62,0.6)]' : 'text-brand-blue drop-shadow-sm hover:text-brand-red'}`}
              aria-label={`Branch in ${branch.city}`}
              aria-expanded={isActive}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Premium Tooltip - Rendered ONLY if active */}
            {isActive && (
              <div
                className={`absolute left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-[#111827] shadow-sm border border-[#E5E7EB] rounded-[8px] pointer-events-none transition-all duration-200 ease-out z-50
                  ${showBelow ? 'top-[calc(100%+8px)] translate-y-0' : 'bottom-[calc(100%+8px)] translate-y-0'}
                `}
                style={{ 
                  width: 'max-content',
                  whiteSpace: 'nowrap'
                }}
              >
                <p className="text-xs font-bold text-[#111827] tracking-tight m-0 p-0 leading-none">{branch.city}</p>
                {(() => {
                  let branchName = "";
                  if (branch.city === "Delhi" || branch.city === "Delhi NCR") branchName = "Head Office";
                  else if (branch.city === "Mumbai") branchName = "Operational Hub";
                  else if (branch.city === "Bangalore" || branch.city === "Chennai" || branch.city === "Kolkata") branchName = "Regional Office";
                  
                  if (branchName) {
                    return <p className="text-[10px] text-[#4B5563] m-0 p-0 mt-1 leading-none">{branchName}</p>;
                  }
                  return null;
                })()}
                
                {/* Tooltip Arrow */}
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-[6px] border-transparent
                    ${showBelow ? 'bottom-full border-b-white' : 'top-full border-t-white'}
                  `}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
