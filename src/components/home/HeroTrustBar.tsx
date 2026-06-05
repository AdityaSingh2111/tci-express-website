import React from 'react';
import { statsData } from '@/data/stats';

/**
 * HeroTrustBar — compact metric strip below the hero.
 * Redesigned: dark-to-light transition, clean horizontal layout.
 */
export function HeroTrustBar() {
  return (
    <div
      className="w-full bg-white border-b border-[#E5E7EB]"
      aria-label="Key statistics"
    >
      <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#F3F4F6]">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-3 px-4 text-center"
            >
              <dd
                className="font-mono text-xl md:text-2xl font-extrabold text-brand-blue tracking-tight leading-none"
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </dd>
              <dt className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider mt-1">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
