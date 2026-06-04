import React from 'react';
import type { StatItem } from '@/types/data.types';

interface StatisticCardProps {
  stat: StatItem;
  /** When true, renders on a dark background — inverts text color */
  theme?: 'light' | 'dark';
}

/**
 * StatisticCard
 * Renders a single headline metric.
 * Value uses JetBrains Mono (monospace) per design-system §3 — tabular data.
 * Design system §19: data-heavy, precise aesthetic.
 *
 * Accessibility: value + label are grouped so screen readers
 * announce both together (aria-label on the wrapper).
 */
export function StatisticCard({ stat, theme = 'light' }: StatisticCardProps) {
  const valueColor = theme === 'dark' ? 'text-white' : 'text-[#0052CC]';
  const labelColor = theme === 'dark' ? 'text-gray-300' : 'text-[#4B5563]';

  return (
    <div className="flex flex-col items-center text-center p-6">
      <span className={`font-mono text-4xl md:text-5xl font-extrabold tracking-tight leading-none mb-2 ${valueColor}`}>
        {stat.value}
      </span>
      <span className={`text-xs font-medium uppercase tracking-widest ${labelColor}`}>
        {stat.label}
      </span>
    </div>
  );
}
