'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Load persisted collapse state
  useEffect(() => {
    const stored = localStorage.getItem('tci_admin_sidebar_collapsed');
    if (stored === 'true') setIsCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('tci_admin_sidebar_collapsed', String(newState));
  };

  const isLeadsPage = pathname === '/admin/leads';
  const mainPadding = isLeadsPage ? 'p-0' : 'p-4 md:p-6 lg:p-8';

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <AdminSidebar 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />
      <div className={`flex-1 flex flex-col h-full min-w-0 transition-all duration-300 relative z-0 ${isCollapsed ? 'md:pl-[64px]' : 'md:pl-[260px]'}`}>
        <AdminHeader onMenuClick={() => setIsMobileOpen(true)} />
        <main className={`flex-1 overflow-y-auto ${mainPadding}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
