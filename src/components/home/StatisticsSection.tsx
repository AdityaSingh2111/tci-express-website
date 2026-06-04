import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';
import { StatisticCard } from '../shared/StatisticCard';
import { statsData } from '@/data/stats';

/**
 * StatisticsSection — Refined stats grid.
 * Reduced padding and header size to avoid over-emphasis on the metrics.
 */
export function StatisticsSection() {
  return (
    <SectionContainer className="bg-white border-y border-[#E5E7EB]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-[#E5E7EB]">
        {statsData.map((stat) => (
          <StatisticCard key={stat.label} stat={stat} />
        ))}
      </div>
    </SectionContainer>
  );
}
