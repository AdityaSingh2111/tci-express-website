import { Inbox, SearchX } from "lucide-react";

interface EmptyStateProps {
  type: "no-leads" | "no-results";
  message?: string;
  submessage?: string;
  onClearFilters?: () => void;
}

export function EmptyState({ type, message, submessage, onClearFilters }: EmptyStateProps) {
  const isSearch = type === "no-results";
  
  return (
    <div className="bg-white md:bg-[#F8FAFC]/50 border border-[#E2E8F0] md:border-dashed md:border-2 rounded-[16px] md:rounded-2xl py-10 px-5 md:p-16 flex flex-col items-center justify-center text-center animate-in fade-in duration-500 md:min-h-[450px]">
      <div className="w-14 h-14 bg-[#F1F5F9] rounded-xl flex items-center justify-center mb-5 border border-[#E2E8F0] shadow-sm">
        {isSearch ? (
          <SearchX className="text-[#64748B]" size={26} />
        ) : (
          <Inbox className="text-[#64748B]" size={26} />
        )}
      </div>
      
      <h3 className="text-[16px] md:text-[20px] font-bold text-[#0F172A] mb-1.5 tracking-tight">
        {message || (isSearch ? "No Leads Found" : "No Leads Yet")}
      </h3>
      
      <p className="text-[13px] md:text-[14px] text-[#64748B] max-w-xs mb-5 leading-snug">
        {submessage || (isSearch 
          ? "No leads match the selected status, service, or search criteria." 
          : "When customers submit quotes, they will appear here.")}
      </p>
      
      {isSearch && onClearFilters && (
        <button 
          onClick={onClearFilters}
          className="px-4 py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-lg text-[13px] font-bold text-[#0F172A] transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
