import { useState } from 'react';
import { Lead, LeadStatus } from '@/types/lead';
import { X, Phone, Mail, MapPin, Truck, Calendar, Clock, Edit2, AlertCircle, Copy, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/shared/WhatsAppIcon';
import { updateLeadStatus } from '@/actions/leads';

interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdated: (leadId: string, newStatus: LeadStatus) => void;
}

export function LeadDetailDrawer({ lead, isOpen, onClose, onStatusUpdated }: LeadDetailDrawerProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen || !lead) return null;

  const isWhatsApp = lead.whatsapp_number && lead.whatsapp_number.length > 5;
  const hasPhone = lead.phone_number && lead.phone_number.length > 5;

  const handleCall = () => {
    window.open(`tel:${lead.phone_number}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi ${lead.customer_name}, this is regarding your enquiry at TCI Express.`);
    window.open(`https://wa.me/91${lead.whatsapp_number?.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (newStatus === lead.status) return;
    
    setIsUpdating(true);
    setError(null);
    
    const { success, error: updateError } = await updateLeadStatus(lead.id, newStatus);
    
    if (success) {
      onStatusUpdated(lead.id, newStatus);
    } else {
      setError(updateError || "Failed to update status");
    }
    
    setIsUpdating(false);
  };

  const copyId = () => {
    navigator.clipboard.writeText(lead.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-[#DBEAFE] text-[#1E40AF] ring-[#BFDBFE] border-[#BFDBFE]'; 
      case 'Contacted': return 'bg-[#FEF9C3] text-[#854D0E] ring-[#FEF08A] border-[#FEF08A]'; 
      case 'Quoted': return 'bg-[#E0E7FF] text-[#3730A3] ring-[#C7D2FE] border-[#C7D2FE]'; 
      case 'Converted': return 'bg-[#DCFCE7] text-[#166534] ring-[#BBF7D0] border-[#BBF7D0]'; 
      case 'Rejected': return 'bg-[#FEE2E2] text-[#991B1B] ring-[#FECACA] border-[#FECACA]'; 
      default: return 'bg-[#F1F5F9] text-[#475569] ring-[#E2E8F0] border-[#E2E8F0]'; 
    }
  };

  const dateObj = new Date(lead.created_at);
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
  const formattedTime = dateObj.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="flex flex-col bg-[#F8FAFC] animate-in fade-in duration-200 w-full relative">
      
      {/* Header Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-5 py-3 bg-white border-b border-[#E2E8F0] shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-h-[60px] relative">
        <div className="flex flex-col gap-2 md:gap-2.5 pr-8 md:pr-0">
          <div className="flex flex-col leading-tight">
            <h2 className="text-[16px] md:text-[20px] font-black text-[#0F172A] tracking-tight">{lead.customer_name}</h2>
            <span className="text-[12px] md:text-[13px] font-bold text-[#64748B] mt-0.5">{lead.service_type}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className={`text-[10px] md:text-[11px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(lead.status)}`}>
              {lead.status}
            </span>
            <div className="flex items-center text-[11px] md:text-[12px] font-medium text-[#64748B]">
              <Calendar size={13} className="mr-1.5" />
              {formattedDate} &bull; {formattedTime}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 md:mt-0 w-full md:w-auto">
          <button 
            onClick={handleCall}
            disabled={!hasPhone}
            className="flex items-center gap-1.5 h-[32px] px-3 bg-white border border-[#E2E8F0] rounded-md text-[#0F172A] font-bold text-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:bg-[#F8FAFC] transition-all disabled:opacity-50"
          >
            <Phone size={14} className={hasPhone ? "text-[#001E60]" : "text-[#94A3B8]"} /> <span className="hidden md:inline">Call</span>
          </button>
          <button 
            onClick={handleWhatsApp}
            disabled={!isWhatsApp}
            className="flex items-center gap-1.5 h-[32px] px-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-md text-[#166534] font-bold text-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:bg-[#25D366]/20 transition-all disabled:opacity-50"
          >
            <WhatsAppIcon size={14} className={isWhatsApp ? "text-[#25D366]" : "text-[#94A3B8]"} /> <span className="hidden md:inline">WhatsApp</span>
          </button>
        </div>

        <button onClick={onClose} className="absolute top-3 right-4 md:static md:ml-3 p-1.5 rounded-full hover:bg-[#F1F5F9] text-[#64748B] transition-colors" title="Close Details">
          <X size={20} className="text-[#0F172A]" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-3 md:p-4">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-3 md:gap-4">

          {error && (
            <div className="bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] p-2 rounded-md text-[12px] font-semibold flex items-center gap-2">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          {/* Row 1: Contact | Route */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Contact Information */}
            <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Mail size={13} /> Contact Information
              </h3>
              <div className="flex flex-col gap-1.5 text-[12px]">
                <div className="flex justify-between items-center">
                  <span className="text-[#64748B] font-medium">Phone</span>
                  <span className="text-[#0F172A] font-bold">{lead.phone_number}</span>
                </div>
                <div className="flex justify-between items-center border-t border-[#F1F5F9] pt-1.5">
                  <span className="text-[#64748B] font-medium">WhatsApp</span>
                  <span className="text-[#0F172A] font-bold flex items-center gap-1">
                    {lead.whatsapp_number ? (
                      <><span className="text-[#25D366] shrink-0"><WhatsAppIcon size={12} /></span> {lead.whatsapp_number}</>
                    ) : (
                      <span className="text-[#94A3B8]">-</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-[#F1F5F9] pt-1.5">
                  <span className="text-[#64748B] font-medium">Email</span>
                  <span className="text-[#0F172A] font-bold truncate max-w-[200px]">{lead.email || '-'}</span>
                </div>
                <div className="flex justify-between items-center border-t border-[#F1F5F9] pt-1.5">
                  <span className="text-[#64748B] font-medium">Preferred</span>
                  <span className="text-[#0F172A] font-bold">{lead.preferred_contact_method}</span>
                </div>
              </div>
            </div>

            {/* Route Details */}
            <div className="bg-white p-3 md:p-4 rounded-lg border border-[#E2E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin size={13} /> Route Details
              </h3>
              <div className="flex items-center gap-3 bg-[#F8FAFC] p-2 rounded border border-[#F1F5F9]">
                <div className="flex flex-col items-center mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0" />
                  <div className="w-px h-5 bg-[#E2E8F0] my-0.5" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E3000F] shrink-0" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-center text-[12px]">
                    <span className="text-[#64748B] font-medium">Pickup</span>
                    <span className="font-bold text-[#0F172A] truncate max-w-[200px] text-right">{lead.pickup_city}, {lead.pickup_state}</span>
                  </div>
                  <div className="flex justify-between items-center text-[12px] border-t border-[#E2E8F0] pt-1">
                    <span className="text-[#64748B] font-medium">Drop</span>
                    <span className="font-bold text-[#0F172A] truncate max-w-[200px] text-right">{lead.drop_city}, {lead.drop_state}</span>
                  </div>
                  {lead.distance_km && (
                    <div className="flex justify-between items-center text-[12px] border-t border-[#E2E8F0] pt-1">
                      <span className="text-[#64748B] font-medium">Distance</span>
                      <span className="font-bold text-[#0F172A] text-right">{lead.distance_km} km</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: Customer Message */}
          <div className="bg-white p-3 md:p-4 rounded-lg border border-[#E2E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full">
            <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Mail size={13} /> Customer Message
            </h3>
            {lead.message ? (
              <div className="bg-[#FFFBEB] p-2.5 rounded border border-[#FEF3C7] text-[12px] text-[#92400E] font-medium leading-relaxed whitespace-pre-wrap">
                {lead.message}
              </div>
            ) : (
              <div className="text-[12px] text-[#94A3B8] font-medium italic bg-[#F8FAFC] p-2 rounded border border-[#F1F5F9]">
                No specific message provided by the customer.
              </div>
            )}
          </div>

          {/* Row 3: Pipeline Status */}
          <div className="bg-white p-2.5 md:p-3 rounded-lg border border-[#E2E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
            <h3 className="text-[10px] md:text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <Edit2 size={12} /> Pipeline
            </h3>
            <div className="flex flex-wrap items-center gap-1.5">
              {(['New', 'Contacted', 'Quoted', 'Converted', 'Rejected'] as LeadStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={isUpdating || lead.status === status}
                  className={`py-1 px-2.5 rounded text-[10px] md:text-[11px] font-bold border transition-all ${
                    lead.status === status 
                      ? `${getStatusColor(status).split(' ').slice(0, 2).join(' ')} border-transparent ring-1 ring-offset-1 ${getStatusColor(status).split(' ')[2]}`
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]'
                  } disabled:opacity-70`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Row 4: System Metadata */}
          <div className="bg-white p-3 md:p-4 rounded-lg border border-[#E2E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full lg:w-1/2">
            <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock size={13} /> System Metadata
            </h3>
            <div className="flex flex-col gap-1 text-[12px]">
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#64748B] font-medium">Source</span>
                <span className="text-[#0F172A] font-bold">{lead.lead_source}</span>
              </div>
              <div className="flex justify-between items-center border-t border-[#F1F5F9] pt-1.5 mt-0.5">
                <span className="text-[#64748B] font-medium">Lead ID</span>
                <div className="flex items-center gap-1.5">
                  <code className="font-mono font-bold text-[#0F172A] text-[11px] bg-[#F8FAFC] px-1.5 py-0.5 rounded">{lead.id}</code>
                  <button 
                    onClick={copyId} 
                    className="p-0.5 hover:bg-[#F1F5F9] rounded text-[#64748B] transition-colors"
                    title="Copy ID"
                  >
                    {copiedId ? <CheckCircle2 size={13} className="text-[#10B981]" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
