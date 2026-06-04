import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { SectionHeader } from '../shared/SectionHeader';

/**
 * ProcessSection — Clean horizontal step process.
 * Premium redesign: numbered steps with connector line, enterprise style.
 */
export function ProcessSection() {
  const steps = [
    {
      title: 'Request a Quote',
      description: 'A virtual or in-person survey to provide you with an accurate, transparent estimate.',
    },
    {
      title: 'Plan & Confirm',
      description: 'Your dedicated move manager designs the optimal timeline and resource plan.',
    },
    {
      title: 'Pickup & Transit',
      description: 'Verified crew arrives with premium materials. GPS-tracked transport to destination.',
    },
    {
      title: 'Delivery & Setup',
      description: 'Safe unloading, unpacking, and setup assistance at your new location.',
    },
  ];

  return (
    <SectionContainer className="bg-[#F8FAFC]">
      <SectionHeader
        eyebrow="Our process"
        title="Relocation in 4 Simple Steps"
        subtitle="A proven methodology that ensures stress-free transitions."
        alignment="center"
        theme="light"
      />

      <div className="mt-10 max-w-5xl mx-auto">
        <div className="relative grid md:grid-cols-4 gap-8 md:gap-4">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-[#E5E7EB] z-0"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <div key={step.title} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-3 text-left md:text-center z-10">
              {/* Step number circle */}
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-[#0052CC] text-sm font-bold text-[#0052CC] font-mono shadow-sm">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Content */}
              <div className="flex-1 md:flex-none">
                <h3 className="text-sm font-semibold text-[#0D1117] mb-1">{step.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
