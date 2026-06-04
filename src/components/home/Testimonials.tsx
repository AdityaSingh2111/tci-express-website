'use client';

import React, { useState } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { TestimonialCard } from '../shared/TestimonialCard';
import { testimonialsData } from '@/data/testimonials';

const CATEGORIES = [
  "All",
  "Household Shifting",
  "Office Relocation",
  "Commercial Relocation",
  "Car Transportation",
  "Bike Transportation"
];

export function Testimonials() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTestimonials = activeCategory === "All" 
    ? testimonialsData 
    : testimonialsData.filter(t => t.category === activeCategory);

  return (
    <SectionContainer className="bg-[#F9FAFB]">
      <SectionHeader 
        title="What Our Customers Say" 
        subtitle="Real stories from families and businesses who trusted us with their relocation."
        alignment="center"
        theme="light"
      />
      
      {/* Category Filters */}
      <div className="mt-8 mb-10 flex flex-wrap justify-center gap-2 px-4">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={[
              "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] touch-manipulation",
              activeCategory === category
                ? "bg-[#0052CC] text-white shadow-md"
                : "bg-white text-[#4B5563] border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F3F4F6]"
            ].join(" ")}
          >
            {category}
          </button>
        ))}
      </div>
      
      {filteredTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, idx) => (
            <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-[#6B7280]">
          No testimonials found for this category yet.
        </div>
      )}
    </SectionContainer>
  );
}
