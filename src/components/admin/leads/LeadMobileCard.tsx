import { Lead } from "@/types/lead";
import { Phone, MapPin, Calendar, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";

interface LeadMobileCardProps {
  lead: Lead;
  onView: (lead: Lead) => void;
}

export function LeadMobileCard({ lead, onView }: LeadMobileCardProps) {
  const isWhatsApp = lead.whatsapp_number && lead.whatsapp_number.length > 5;
  const hasPhone = lead.phone_number && lead.phone_number.length > 5;

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`tel:${lead.phone_number}`, '_self');
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Hi ${lead.customer_name}, this is regarding your enquiry at TCI Express.`);
    window.open(`https://wa.me/91${lead.whatsapp_number.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-[#DBEAFE] text-[#1E40AF]'; 
      case 'Contacted': return 'bg-[#FEF9C3] text-[#854D0E]'; 
      case 'Quoted': return 'bg-[#E0E7FF] text-[#3730A3]'; 
      case 'Converted': return 'bg-[#DCFCE7] text-[#166534]'; 
      case 'Rejected': return 'bg-[#FEE2E2] text-[#991B1B]'; 
      default: return 'bg-[#F1F5F9] text-[#475569]'; 
    }
  };

  const dateObj = new Date(lead.created_at);
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div 
      onClick={() => onView(lead)}
      className="bg-white border border-[#E2E8F0] rounded-[12px] p-2.5 shadow-sm active:bg-[#F8FAFC] transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-1 gap-2">
        <h3 className="text-[13px] font-bold text-[#0F172A] leading-tight line-clamp-1 flex-grow">{lead.customer_name}</h3>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm whitespace-nowrap shrink-0 ${getStatusColor(lead.status)}`}>
          {lead.status}
        </span>
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#64748B]">
          <span className="text-[#334155] bg-[#F1F5F9] px-1.5 py-0.5 rounded">{lead.service_type}</span>
          <span className="w-1 h-1 rounded-full bg-[#CBD5E1]"></span>
          <span className="flex items-center gap-0.5"><Calendar size={10} className="shrink-0" /> {formattedDate}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-[#475569] font-medium mb-2.5">
        <MapPin size={10} className="text-[#94A3B8] shrink-0" />
        <span className="truncate max-w-[120px]">{lead.pickup_city}</span>
        <ArrowRight size={10} className="text-[#94A3B8] shrink-0" />
        <span className="truncate max-w-[120px]">{lead.drop_city}</span>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={handleCall}
          disabled={!hasPhone}
          className="flex-1 flex items-center justify-center gap-1.5 h-[36px] rounded-lg border border-[#E2E8F0] text-[#0F172A] font-semibold text-[12px] hover:bg-[#F8FAFC] transition-colors disabled:opacity-50"
        >
          <Phone size={12} className={hasPhone ? "text-[#001E60]" : "text-[#94A3B8]"} /> Call
        </button>
        <button 
          onClick={handleWhatsApp}
          disabled={!isWhatsApp}
          className="flex-1 flex items-center justify-center gap-1.5 h-[36px] rounded-lg border border-[#25D366]/20 bg-[#25D366]/5 text-[#128C7E] font-semibold text-[12px] hover:bg-[#25D366]/10 transition-colors disabled:opacity-50 disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400"
        >
          <WhatsAppIcon size={12} className={isWhatsApp ? "text-[#25D366]" : ""} /> WhatsApp
        </button>
      </div>
    </div>
  );
}
