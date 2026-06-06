'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, PackageSearch, Truck, Navigation, FolderOpen, Settings, X, PanelLeft } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  { name: 'Quotations', href: '/admin/quotations', icon: FileText },
  { name: 'Collection Advice', href: '/admin/collection-advice', icon: PackageSearch },
  { name: 'Shipment Management', href: '/admin/shipments', icon: Truck },
  { name: 'Tracking Updates', href: '/admin/tracking', icon: Navigation },
  { name: 'Documents', href: '/admin/documents', icon: FolderOpen },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function AdminSidebar({ isOpen, onClose, isCollapsed = false, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-[100dvh] bg-white border-r border-[#E2E8F0] shadow-sm z-50 transform transition-all duration-300 ease-in-out md:translate-x-0 overflow-x-hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'w-[280px] md:w-[64px]' : 'w-[280px] md:w-[260px]'} flex flex-col`}>
        
        {/* Top Header Row */}
        <div className={`flex items-center shrink-0 border-b border-[#E2E8F0] ${isCollapsed ? 'md:h-[72px] md:justify-center md:px-0 h-[64px] px-4 justify-between' : 'h-[64px] md:h-[72px] px-4 md:px-6 justify-between'}`}>
          
          {/* Collapse Toggle (Desktop) */}
          <button 
            onClick={onToggleCollapse}
            className={`hidden md:flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-all w-9 h-9 ${isCollapsed ? '' : 'mr-4 shrink-0'}`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <PanelLeft size={20} />
          </button>

          {/* Logo */}
          <Link 
            href="/admin/dashboard" 
            className={`flex items-center relative transition-all w-[130px] h-[34px] md:h-[38px] ${isCollapsed ? 'md:hidden' : 'md:w-[140px]'}`}
          >
            <Image 
              src="/logos/logo-transparent.png" 
              alt="TCI Express" 
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </Link>

          {/* Mobile Close Button */}
          <button onClick={onClose} className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors ml-auto shrink-0">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 p-3 md:p-4 space-y-0.5 overflow-y-auto overflow-x-hidden scrollbar-none">
          {!isCollapsed && <p className="px-3 text-[10px] md:text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2 mt-1 hidden md:block whitespace-nowrap">Main Menu</p>}
          <p className="px-3 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2 mt-1 md:hidden whitespace-nowrap">Main Menu</p>
          
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 768) onClose();
                }}
                className={`flex items-center rounded-xl transition-all font-medium ${
                  isCollapsed 
                    ? 'md:justify-center px-3 py-2.5 md:py-3 md:px-0 gap-2.5 md:gap-0' 
                    : 'gap-2.5 px-3 py-2.5'
                } ${
                  isActive 
                    ? 'bg-[#001E60]/5 text-[#001E60] font-semibold' 
                    : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon size={18} className={isActive ? 'text-[#E3000F] shrink-0' : 'text-[#94A3B8] shrink-0'} />
                <span className={`text-[14px] whitespace-nowrap ${isCollapsed ? 'md:hidden' : ''}`}>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </aside>
    </>
  )
}
