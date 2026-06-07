import { Lead } from "@/types/lead";
import { Phone, ArrowRight, Eye, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";

interface LeadTableProps {
  leads: Lead[];
  onView: (lead: Lead) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (key: string) => void;
}

export function LeadTable({ leads, onView, sortBy, sortOrder, onSort }: LeadTableProps) {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]'; 
      case 'Contacted': return 'bg-[#FEF9C3] text-[#854D0E] border-[#FEF08A]'; 
      case 'Quoted': return 'bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]'; // Indigo
      case 'Converted': return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'; 
      case 'Rejected': return 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'; 
      default: return 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]'; 
    }
  };

  const formatDate = (timestamp: string) => {
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const handleCall = (e: React.MouseEvent, phone: string) => {
    e.stopPropagation();
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (e: React.MouseEvent, whatsapp: string, name: string) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Hi ${name}, this is regarding your enquiry at TCI Express.`);
    window.open(`https://wa.me/91${whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortBy !== columnKey) return <ArrowUpDown size={12} className="text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity ml-1" />;
    return sortOrder === 'asc' ? <ArrowUp size={12} className="text-[#001E60] ml-1" /> : <ArrowDown size={12} className="text-[#001E60] ml-1" />;
  };

  return (
    <div className="hidden md:block w-full overflow-hidden bg-white border border-[#E2E8F0] rounded-2xl shadow-sm relative">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse table-auto min-w-[1000px]">
          <colgroup>
            <col className="w-[110px]" />
            <col className="w-auto" />
            <col className="w-auto" />
            <col className="" />
            <col className="w-[100px]" />
            <col className="w-[140px]" />
          </colgroup>
          <thead className="sticky top-0 z-20 bg-[#F8FAFC] shadow-[0_1px_0_0_#E2E8F0]">
            <tr>
              <th className="px-4 py-3 text-[12px] font-bold text-[#475569] uppercase tracking-wider cursor-pointer group select-none" onClick={() => onSort('created_at')}>
                <div className="flex items-center">Date <SortIcon columnKey="created_at" /></div>
              </th>
              <th className="px-4 py-3 text-[12px] font-bold text-[#475569] uppercase tracking-wider cursor-pointer group select-none" onClick={() => onSort('customer_name')}>
                <div className="flex items-center">Customer <SortIcon columnKey="customer_name" /></div>
              </th>
              <th className="px-4 py-3 text-[12px] font-bold text-[#475569] uppercase tracking-wider cursor-pointer group select-none" onClick={() => onSort('service_type')}>
                <div className="flex items-center">Service <SortIcon columnKey="service_type" /></div>
              </th>
              <th className="px-4 py-3 text-[12px] font-bold text-[#475569] uppercase tracking-wider cursor-pointer group select-none" onClick={() => onSort('pickup_city')}>
                <div className="flex items-center">Route <SortIcon columnKey="pickup_city" /></div>
              </th>
              <th className="px-4 py-3 text-[12px] font-bold text-[#475569] uppercase tracking-wider cursor-pointer group select-none" onClick={() => onSort('status')}>
                <div className="flex items-center">Status <SortIcon columnKey="status" /></div>
              </th>
              <th className="px-4 py-3 text-[12px] font-bold text-[#475569] uppercase tracking-wider text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {leads.map((lead) => {
              const isWhatsApp = lead.whatsapp_number && lead.whatsapp_number.length > 5;
              const hasPhone = lead.phone_number && lead.phone_number.length > 5;
              
              return (
                <tr 
                  key={lead.id} 
                  onClick={() => onView(lead)}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                >
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-[13px] font-semibold text-[#475569]">{formatDate(lead.created_at)}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap pr-8">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-bold text-[#0F172A] leading-tight">{lead.customer_name}</span>
                      <div className="flex flex-col mt-0.5 gap-1">
                        <span className="text-[11px] font-medium text-[#64748B] flex items-center gap-1.5">
                          📞 {lead.phone_number}
                        </span>
                        {lead.whatsapp_number && lead.whatsapp_number !== lead.phone_number && (
                          <span className="text-[11px] font-medium text-[#64748B] flex items-center gap-1.5">
                            <span className="text-[#25D366] shrink-0"><WhatsAppIcon size={12} /></span> {lead.whatsapp_number}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap pr-8">
                    <span className="inline-flex items-center text-[12px] font-bold text-[#334155] bg-[#F1F5F9] px-2 py-1 rounded-md">
                      {lead.service_type}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#475569]">
                      <span className="truncate" title={lead.pickup_city}>{lead.pickup_city}</span>
                      <ArrowRight size={12} className="text-[#94A3B8] shrink-0" />
                      <span className="truncate" title={lead.drop_city}>{lead.drop_city}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap pr-6 w-[140px]">
                    <div className="flex items-center justify-end gap-1.5 transition-opacity">
                      <button 
                        onClick={(e) => hasPhone && handleCall(e, lead.phone_number)}
                        disabled={!hasPhone}
                        className="p-1.5 rounded bg-white border border-[#E2E8F0] text-[#001E60] hover:bg-[#F8FAFC] hover:border-[#001E60]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Call Customer"
                      >
                        <Phone size={14} />
                      </button>
                      <button 
                        onClick={(e) => isWhatsApp && handleWhatsApp(e, lead.whatsapp_number, lead.customer_name)}
                        disabled={!isWhatsApp}
                        className="p-1.5 rounded bg-white border border-[#E2E8F0] text-[#25D366] hover:bg-[#F0FDF4] hover:border-[#25D366]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        title="WhatsApp Customer"
                      >
                        <WhatsAppIcon size={14} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onView(lead); }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-all"
                        title="View Details"
                      >
                        <Eye size={14} /> <span className="text-[11px] font-bold">View</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
