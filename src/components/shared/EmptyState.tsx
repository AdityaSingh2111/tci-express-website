import React from 'react';
import { CTAButton } from './CTAButton';
import { SecondaryButton } from './SecondaryButton';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
}

/**
 * EmptyState
 * Standardized empty state component for lists, search results, and tables.
 */
export function EmptyState({
  title,
  description,
  icon,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-[#E5E7EB] border-dashed rounded-[16px] bg-[#F9FAFB] max-w-2xl mx-auto w-full">
      {icon ? (
        <div className="w-16 h-16 bg-[#EEF4FF] text-brand-blue rounded-full flex items-center justify-center mb-5 shrink-0">
          {icon}
        </div>
      ) : (
        <div className="w-16 h-16 bg-[#EEF4FF] text-brand-blue rounded-full flex items-center justify-center mb-5 shrink-0">
          <svg className="w-8 h-8 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      )}
      
      <h3 className="text-[1.25rem] font-bold text-background-dark mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-[15px] text-[#6B7280] max-w-md mx-auto mb-8 leading-relaxed">
        {description}
      </p>

      {(actionText || secondaryActionText) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          {secondaryActionText && onSecondaryAction && (
            <SecondaryButton onClick={onSecondaryAction} className="w-full sm:w-auto px-6">
              {secondaryActionText}
            </SecondaryButton>
          )}
          {actionText && onAction && (
            <CTAButton onClick={onAction} className="w-full sm:w-auto px-6">
              {actionText}
            </CTAButton>
          )}
        </div>
      )}
    </div>
  );
}
