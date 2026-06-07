"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Lead, LeadStatus } from '@/types/lead';
import { getLeads } from '@/actions/leads';
import { LeadTable } from './LeadTable';
import { LeadMobileCard } from './LeadMobileCard';
import { LeadDetailDrawer } from './LeadDetailDrawer';
import { EmptyState } from './EmptyState';
import { Search, Filter, ListOrdered, Loader2, ChevronLeft, ChevronRight, ChevronDown, RotateCcw } from 'lucide-react';

export function LeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination State
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [service, setService] = useState('All');
  const [status, setStatus] = useState('All');
  const [dateRange, setDateRange] = useState('All');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Mobile UI
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [tempService, setTempService] = useState('All');
  const [tempLimit, setTempLimit] = useState(10);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  // Drawer State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Data
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data, count, error } = await getLeads({
      page,
      limit,
      search: debouncedSearch,
      service,
      status,
      dateRange,
      customStartDate,
      customEndDate,
      sortBy,
      sortOrder
    });
    
    if (!error && data) {
      setLeads(data);
      setTotalCount(count);
    }
    setLoading(false);
  }, [page, limit, debouncedSearch, service, status, sortBy, sortOrder]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Auto-scroll active status chip into view
  const statusScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (statusScrollRef.current) {
      const activeChip = statusScrollRef.current.querySelector<HTMLButtonElement>('button[data-active="true"]');
      if (activeChip) {
        const container = statusScrollRef.current;
        const scrollLeft = activeChip.offsetLeft - (container.clientWidth / 2) + (activeChip.clientWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [status]);

  const totalPages = Math.ceil(totalCount / limit) || 1;

  const handleStatusUpdated = (leadId: string, newStatus: LeadStatus) => {
    // Optimistic update
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    // Refresh to ensure exact backend sync
    fetchLeads();
  };

  const handleClearFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setService('All');
    setStatus('All');
    setDateRange('All');
    setCustomStartDate('');
    setCustomEndDate('');
    setSortBy('created_at');
    setSortOrder('desc');
    setPage(1);
  };

  return (
    <div className="flex flex-col pb-20 md:pb-0 animate-in fade-in duration-500">
      
      {/* --- LIST VIEW --- */}
      <div className={`flex-col ${selectedLead ? 'hidden md:hidden' : 'flex'}`}>
        {/* --- DESKTOP HEADER & TOOLBAR --- */}
      <div className="hidden md:flex flex-col bg-white border-b border-[#E2E8F0] px-5 py-2.5 shadow-sm mb-5 sticky top-0 z-40 gap-2.5">
        
        {/* Row 1: Status Chips & Results Counter */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5 whitespace-nowrap overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-[#64748B] mr-1 uppercase tracking-wider">Status:</span>
            {(['All', 'New', 'Contacted', 'Quoted', 'Converted', 'Rejected']).map((stat) => (
              <button
                key={stat}
                onClick={() => { setStatus(stat); setPage(1); }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                  status === stat 
                    ? 'bg-[#001E60] text-white border-[#001E60]' 
                    : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                }`}
              >
                {stat}
              </button>
            ))}
          </div>

          <div className="flex items-center">
            <div className="text-[11px] font-medium text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded border border-[#E2E8F0]">
              Showing <span className="text-[#0F172A] font-bold">{leads.length}</span> of <span className="text-[#0F172A] font-bold">{totalCount}</span> leads
            </div>
          </div>
        </div>

        <div className="h-px bg-[#E2E8F0]/60 w-full"></div>

        {/* Bottom Row: Controls & Search */}
        <div className="flex items-center gap-3 w-full">
          {/* Service Filter */}
          <div className="relative shrink-0">
            <select 
              className="h-[34px] pl-3 pr-8 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-[13px] font-semibold text-[#0F172A] outline-none hover:border-[#94A3B8] focus:ring-1 focus:ring-[#001E60] focus:border-[#001E60] focus:bg-white appearance-none cursor-pointer transition-all w-[180px]"
              value={service}
              onChange={(e) => { setService(e.target.value); setPage(1); }}
            >
              <option value="All">All Services</option>
              <option value="Car Transportation">Car Transportation</option>
              <option value="Bike Transportation">Bike Transportation</option>
              <option value="Household Shifting">Household Shifting</option>
              <option value="Office Relocation">Office Relocation</option>
              <option value="Warehousing">Warehousing</option>
              <option value="Loading & Unloading">Loading & Unloading</option>
              <option value="Packers & Movers">Packers & Movers</option>
              <option value="Commercial Relocation">Commercial Relocation</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" size={14} />
          </div>

          {/* Date Range Filter */}
          <div className="relative shrink-0 flex items-center gap-2">
            <div className="relative">
              <select 
                className="h-[34px] pl-3 pr-8 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-[13px] font-semibold text-[#0F172A] outline-none hover:border-[#94A3B8] focus:ring-1 focus:ring-[#001E60] focus:border-[#001E60] focus:bg-white appearance-none cursor-pointer transition-all w-[140px]"
                value={dateRange}
                onChange={(e) => { setDateRange(e.target.value); setPage(1); }}
              >
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Month">This Month</option>
                <option value="Custom Range" className="hidden lg:block">Custom Range</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" size={14} />
            </div>
            
            {dateRange === 'Custom Range' && (
              <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                <input 
                  type="date" 
                  value={customStartDate}
                  onChange={(e) => { setCustomStartDate(e.target.value); setPage(1); }}
                  className="h-[34px] px-2 bg-white border border-[#CBD5E1] rounded-md text-[13px] font-medium outline-none hover:border-[#94A3B8] focus:border-[#001E60]"
                />
                <span className="text-[#94A3B8]">-</span>
                <input 
                  type="date" 
                  value={customEndDate}
                  onChange={(e) => { setCustomEndDate(e.target.value); setPage(1); }}
                  className="h-[34px] px-2 bg-white border border-[#CBD5E1] rounded-md text-[13px] font-medium outline-none hover:border-[#94A3B8] focus:border-[#001E60]"
                />
              </div>
            )}
          </div>

          {/* Rows Per Page */}
          <div className="relative shrink-0 group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-[#64748B] pointer-events-none z-10 transition-colors group-hover:text-[#475569]">Rows:</span>
            <select 
              className="h-[34px] pl-[48px] pr-8 bg-[#F8FAFC] border border-[#CBD5E1] rounded-md text-[13px] font-semibold text-[#0F172A] outline-none hover:border-[#94A3B8] focus:ring-1 focus:ring-[#001E60] focus:border-[#001E60] focus:bg-white appearance-none cursor-pointer transition-all w-[105px]"
              value={limit}
              onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none z-10" size={14} />
          </div>

          {/* Search */}
          <div className="relative w-[280px] lg:w-[320px] shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full h-[36px] pl-10 pr-3 bg-white border border-[#CBD5E1] rounded-md text-[13px] font-medium text-[#0F172A] outline-none hover:border-[#94A3B8] focus:ring-1 focus:ring-[#001E60] focus:border-[#001E60] transition-all placeholder:text-[#94A3B8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Clear Filters (if active) */}
          {(service !== 'All' || status !== 'All' || dateRange !== 'All' || debouncedSearch) && (
            <button 
              onClick={handleClearFilters} 
              className="shrink-0 ml-1 px-3 h-[34px] bg-[#F1F5F9] rounded-md text-[12px] font-bold text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#001E60] transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* --- MOBILE HEADER (STICKY) --- */}
      <div className="md:hidden sticky top-0 z-[40] bg-white border-b border-[#E2E8F0] shadow-sm mb-4">
        {/* Search & Filter Row */}
        <div className="flex items-center gap-2 w-full px-3 pt-3 pb-2">
          {/* Search Bar */}
          <div className="relative flex-grow min-w-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full h-[44px] pl-[42px] pr-3 bg-[#F1F5F9] border border-transparent rounded-[10px] text-[14px] font-medium text-[#0F172A] outline-none focus:bg-white focus:border-[#001E60] transition-all placeholder:text-[#94A3B8]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          {/* Filter Button */}
          <button 
            onClick={() => {
              setTempService(service);
              setTempLimit(limit);
              setShowMobileFilters(true);
            }}
            className="w-[44px] h-[44px] rounded-[10px] bg-[#F1F5F9] border border-transparent text-[#64748B] flex items-center justify-center shrink-0 hover:bg-[#E2E8F0] active:bg-[#CBD5E1] transition-colors"
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Quick Status Chips */}
        <div ref={statusScrollRef} className="flex items-center gap-1.5 px-3 pb-2 overflow-x-auto no-scrollbar scroll-smooth">
          {(['All', 'New', 'Contacted', 'Quoted', 'Converted', 'Rejected']).map((stat) => (
            <button
              key={stat}
              data-active={status === stat}
              onClick={() => { setStatus(stat); setPage(1); }}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[12px] font-bold border transition-colors ${
                status === stat 
                  ? 'bg-[#001E60] text-white border-[#001E60]' 
                  : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              {stat}
            </button>
          ))}
        </div>

        {/* Mobile Filters Bottom Sheet */}
        {showMobileFilters && (
          <>
            <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-[90]" onClick={() => setShowMobileFilters(false)}></div>
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] z-[100] p-4 pb-6 animate-in slide-in-from-bottom shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col">
              <div className="w-10 h-1.5 bg-[#E2E8F0] rounded-full mx-auto mb-4 shrink-0"></div>
              <h3 className="text-[16px] font-bold text-[#0F172A] mb-4 shrink-0">Filters & Display</h3>
              
              <div className="space-y-4 pr-1 pb-2">
                <div>
                  <label className="block text-[12px] font-bold text-[#64748B] mb-2 uppercase tracking-wider">Service</label>
                  <div className="relative">
                    <button 
                      onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                      className="w-full h-[44px] px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[14px] font-bold text-[#0F172A] flex items-center justify-between transition-colors focus:border-[#001E60] focus:bg-white"
                    >
                      {tempService === 'All' ? 'All Services' : tempService}
                      <ChevronDown size={16} className={`text-[#64748B] transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isServiceDropdownOpen && (
                      <div className="absolute bottom-[calc(100%+8px)] left-0 right-0 bg-white border border-[#E2E8F0] rounded-xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] z-[110] max-h-[260px] overflow-y-auto">
                        {['All', 'Car Transportation', 'Bike Transportation', 'Household Shifting', 'Office Relocation', 'Warehousing', 'Loading & Unloading', 'Packers & Movers', 'Commercial Relocation'].map((svc) => (
                          <button
                            key={svc}
                            onClick={() => { setTempService(svc); setIsServiceDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-3 text-[14px] font-bold border-b border-[#F1F5F9] last:border-0 ${tempService === svc ? 'bg-[#F1F5F9] text-[#001E60]' : 'text-[#475569] hover:bg-[#F8FAFC]'}`}
                          >
                            {svc === 'All' ? 'All Services' : svc}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#64748B] mb-2 uppercase tracking-wider">Rows Per Page</label>
                  <div className="flex gap-2">
                    {[5, 10, 20, 40].map(val => (
                      <button
                        key={val}
                        onClick={() => setTempLimit(val)}
                        className={`flex-1 h-[40px] rounded-lg font-bold text-[13px] border transition-colors ${tempLimit === val ? 'bg-[#001E60] text-white border-[#001E60]' : 'bg-white text-[#475569] border-[#E2E8F0]'}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4 shrink-0">
                <button 
                  className="flex-1 h-[44px] bg-[#F1F5F9] text-[#475569] rounded-xl font-bold text-[14px] hover:bg-[#E2E8F0] transition-colors"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 h-[44px] bg-[#001E60] text-white rounded-xl font-bold text-[14px] shadow-sm hover:bg-[#001E60]/90 transition-colors"
                  onClick={() => {
                    setService(tempService);
                    setLimit(tempLimit);
                    setPage(1);
                    setShowMobileFilters(false);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="relative min-h-[400px] px-3 md:px-5">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 rounded-2xl">
            <Loader2 className="animate-spin text-[#E3000F]" size={32} />
          </div>
        ) : leads.length === 0 ? (
          <EmptyState 
            type={debouncedSearch || service !== 'All' || status !== 'All' ? 'no-results' : 'no-leads'} 
            onClearFilters={handleClearFilters}
          />
        ) : (
          <>
            {/* Desktop View */}
            <LeadTable 
              leads={leads} 
              onView={setSelectedLead}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={(key) => {
                if (sortBy === key) {
                  setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortBy(key);
                  setSortOrder('asc');
                }
                setPage(1);
              }}
            />
            
            {/* Mobile View */}
            <div className="md:hidden flex flex-col gap-2.5">
              {leads.map(lead => (
                <LeadMobileCard key={lead.id} lead={lead} onView={setSelectedLead} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-3 md:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 md:p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
                <div className="hidden md:block text-[13px] font-medium text-[#64748B]">
                  Showing <span className="font-bold text-[#0F172A]">{(page - 1) * limit + 1}</span> to <span className="font-bold text-[#0F172A]">{Math.min(page * limit, totalCount)}</span> of <span className="font-bold text-[#0F172A]">{totalCount}</span> entries
                </div>
                
                <div className="flex items-center justify-between w-full md:w-auto gap-2">
                  <div className="hidden md:flex items-center gap-2 mr-4 border-r border-[#E2E8F0] pr-4">
                    <span className="text-[12px] font-bold text-[#64748B] uppercase">Rows</span>
                    <select 
                      value={limit} 
                      onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                      className="bg-transparent text-[13px] font-bold text-[#0F172A] outline-none cursor-pointer"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={40}>40</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-1">
                    <button 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] disabled:opacity-50 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <div className="px-3 text-[13px] font-bold text-[#0F172A]">
                      {page} / {totalPages}
                    </div>
                    <button 
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] disabled:opacity-50 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      </div> {/* Close LIST VIEW */}

      {/* Drawer */}
      <LeadDetailDrawer 
        lead={selectedLead} 
        isOpen={!!selectedLead} 
        onClose={() => setSelectedLead(null)} 
        onStatusUpdated={handleStatusUpdated}
      />

    </div>
  );
}
