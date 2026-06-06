'use client';
import { Menu, Search, Bell, ChevronDown, LogOut, X, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const supabase = createClient();

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowProfile(false);
        setShowMobileSearch(false);
        setShowNotifications(false);
        setShowLogoutModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Basic title extraction for desktop only
  const pathParts = pathname.split('/').filter(Boolean);
  const currentPath = pathParts[1] || 'Dashboard';
  const pageTitleDesktop = currentPath.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfile(false);
  };

  return (
    <>
      <header className="h-[64px] sm:h-[72px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-3 sm:px-6 shrink-0 sticky top-0 z-30 shadow-sm transition-all">
        {/* Mobile Search Overlay */}
        {showMobileSearch && (
          <div className="absolute inset-0 z-40 bg-white flex items-center px-4 sm:hidden">
            <div className="flex-1 flex items-center bg-[#F1F5F9] border border-[#CBD5E1] focus-within:border-[#001E60] rounded-full px-4 py-2 transition-all">
              <Search size={18} className="text-[#94A3B8] shrink-0" />
              <input 
                type="text" 
                autoFocus
                placeholder="Search anything..." 
                className="bg-transparent border-none outline-none text-[14px] w-full ml-3 text-[#334155] placeholder:text-[#94A3B8]"
              />
            </div>
            <button 
              onClick={() => setShowMobileSearch(false)}
              className="ml-3 p-2 text-[#64748B] hover:text-[#0F172A] rounded-full hover:bg-[#F1F5F9] transition-colors"
            >
              <X size={22} />
            </button>
          </div>
        )}

        {/* Left side: Menu & Title */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={onMenuClick} className="md:hidden text-[#64748B] hover:text-[#0F172A] p-2 -ml-1 rounded-lg transition-colors">
            <Menu size={24} />
          </button>
          {/* Mobile static title */}
          <h1 className="text-[18px] font-bold text-[#0F172A] tracking-tight md:hidden">TCI Admin</h1>
          {/* Desktop dynamic title */}
          <h1 className="hidden md:block text-[20px] font-bold text-[#0F172A] tracking-tight">{pageTitleDesktop}</h1>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          {/* Global Search - Desktop */}
          <div className="hidden sm:flex items-center bg-[#F1F5F9] border border-transparent focus-within:border-[#CBD5E1] focus-within:bg-white focus-within:shadow-sm rounded-full px-4 py-2 transition-all w-[240px] lg:w-[320px]">
            <Search size={18} className="text-[#94A3B8] shrink-0" />
            <input 
              type="text" 
              placeholder="Search customer, tracking ID..." 
              className="bg-transparent border-none outline-none text-[14px] w-full ml-2.5 text-[#334155] placeholder:text-[#94A3B8]"
            />
          </div>

          {/* Search Mobile Toggle */}
          <button 
            onClick={() => setShowMobileSearch(true)}
            className="sm:hidden text-[#64748B] hover:text-[#0F172A] p-1.5 rounded-full hover:bg-[#F1F5F9] transition-colors"
          >
            <Search size={20} />
          </button>

          {/* Desktop Notifications */}
          <div className="hidden md:flex items-center justify-center relative" ref={notifRef}>
            <button 
              onClick={toggleNotifications}
              className={`text-[#64748B] hover:text-[#0F172A] p-2 rounded-full transition-colors relative ${showNotifications ? 'bg-[#F1F5F9] text-[#0F172A]' : 'hover:bg-[#F1F5F9]'}`}
            >
              <Bell size={22} />
            </button>
            
            {showNotifications && (
              <div className="absolute top-full right-0 mt-3 w-[320px] bg-white border border-[#E2E8F0] rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <span className="font-semibold text-[#0F172A] text-[14px]">Notifications</span>
                </div>
                <div className="py-12 px-4 text-center">
                  <div className="w-12 h-12 bg-[#F1F5F9] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bell size={20} className="text-[#94A3B8]" />
                  </div>
                  <p className="text-[14px] font-semibold text-[#0F172A]">No new notifications</p>
                  <p className="text-[13px] text-[#64748B] mt-1">You're all caught up.</p>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-[#E2E8F0] hidden sm:block shrink-0"></div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2.5 p-0.5 sm:p-1 sm:pr-2 rounded-full hover:bg-[#F1F5F9] transition-colors border border-transparent hover:border-[#E2E8F0]"
            >
              <div className="w-[32px] h-[32px] rounded-full bg-[#001E60] text-white flex items-center justify-center font-bold text-[13px]">
                A
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[13px] font-semibold text-[#0F172A] leading-tight">Administrator</span>
                <span className="text-[11px] text-[#64748B] leading-tight">TCI Express</span>
              </div>
              <ChevronDown size={14} className="text-[#94A3B8] hidden md:block" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-[240px] bg-white border border-[#E2E8F0] rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                <div className="px-4 py-3 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                  <p className="text-[13px] font-semibold text-[#0F172A]">Administrator</p>
                  <p className="text-[11px] text-[#64748B]">TCI Express</p>
                </div>
                <div className="p-1.5">
                  {/* Mobile-only notifications in dropdown */}
                  <button 
                    onClick={toggleNotifications}
                    className="md:hidden w-full flex items-center justify-between px-3 py-2.5 text-[14px] font-medium text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Bell size={18} className="text-[#64748B]" /> Notifications
                    </div>
                    <span className="text-[10px] bg-[#F1F5F9] px-2 py-0.5 rounded-full text-[#64748B] border border-[#E2E8F0]">0</span>
                  </button>
                  <div className="md:hidden h-px bg-[#F1F5F9] my-1 mx-2"></div>
                  
                  {/* Profile Link */}
                  <Link 
                    href="/admin/profile"
                    onClick={() => setShowProfile(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[14px] font-medium text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                  >
                    <User size={18} className="text-[#64748B]" />
                    Profile
                  </Link>

                  <div className="h-px bg-[#F1F5F9] my-1 mx-2"></div>
                  <button 
                    onClick={() => {
                      setShowProfile(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[14px] font-medium text-[#DC2626] hover:bg-[#FEF2F2] hover:text-[#B91C1C] rounded-lg transition-colors"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Notification Modal Overlay (when triggered from profile menu) */}
      {showNotifications && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[320px] rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95">
            <div className="flex items-center justify-between px-4 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <span className="font-bold text-[#0F172A] text-[16px]">Notifications</span>
              <button onClick={() => setShowNotifications(false)} className="text-[#64748B] hover:text-[#0F172A] bg-white rounded-full p-1 border border-[#E2E8F0]">
                <X size={18} />
              </button>
            </div>
            <div className="py-12 px-4 text-center">
              <div className="w-14 h-14 bg-[#F1F5F9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={24} className="text-[#94A3B8]" />
              </div>
              <p className="text-[16px] font-bold text-[#0F172A]">No new notifications</p>
              <p className="text-[14px] text-[#64748B] mt-1">You're all caught up.</p>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[360px] rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#FEE2E2]">
                <LogOut size={24} className="text-[#DC2626]" />
              </div>
              <h3 className="text-[18px] font-bold text-[#0F172A] mb-2">Sign Out</h3>
              <p className="text-[14px] text-[#64748B]">Are you sure you want to sign out?</p>
            </div>
            <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex gap-3">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-white border border-[#CBD5E1] text-[#334155] font-semibold rounded-xl hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors text-[14px]"
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button 
                onClick={handleLogoutConfirm}
                className="flex-1 px-4 py-2.5 bg-[#E3000F] text-white font-semibold rounded-xl hover:bg-[#C8000D] transition-colors text-[14px] flex items-center justify-center"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  'Sign Out'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
