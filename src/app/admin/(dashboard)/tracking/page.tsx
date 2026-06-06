'use client';
import { Hammer } from 'lucide-react';

export default function trackingPlaceholder() {
  return (
    <div className="space-y-5 md:space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex flex-col gap-1">
        <h2 className="text-[20px] md:text-[24px] font-black text-[#0F172A] tracking-tight">Tracking Updates</h2>
        <p className="text-[13px] md:text-[14px] font-medium text-[#64748B]">Manage your tracking updates operations here.</p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl flex-1 flex flex-col items-center justify-center shadow-sm p-6 sm:p-8 text-center min-h-[300px]">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#EFF6FF] text-[#3B82F6] rounded-full flex items-center justify-center mb-4 sm:mb-5 border border-[#DBEAFE]">
          <Hammer size={24} className="sm:w-7 sm:h-7" />
        </div>
        <h2 className="text-[18px] sm:text-[20px] font-bold text-[#0F172A] tracking-tight mb-1.5 sm:mb-2">Module Under Construction</h2>
        <p className="text-[#64748B] text-[13px] sm:text-[14px] max-w-sm">This area is reserved for the future implementation of the Tracking Updates module in upcoming development phases.</p>
        <div className="mt-6 sm:mt-8 px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#64748B] text-[12px] sm:text-[13px] font-medium">
          Status: Scheduled for Phase 3
        </div>
      </div>
    </div>
  );
}