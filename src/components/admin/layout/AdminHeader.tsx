'use client';
import { Menu, Search, Bell, ChevronDown, LogOut, X, User, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead } from '@/actions/notifications';
import { Notification } from '@/types/notification';

export default function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [toastNotif, setToastNotif] = useState<Notification | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const supabase = createClient();

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifs = async () => {
      const [notifsRes, countRes] = await Promise.all([
        getNotifications(50),
        getUnreadCount()
      ]);
      if (notifsRes.success && notifsRes.data) setNotifications(notifsRes.data);
      if (countRes.success && countRes.count !== undefined) setUnreadCount(countRes.count);
    };

    fetchNotifs();

    const channel = supabase.channel('notifications_changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications'
      }, (payload) => {
        const newNotif = payload.new as Notification;
        setNotifications(prev => [newNotif, ...prev].slice(0, 50));
        setUnreadCount(prev => prev + 1);

        setToastNotif(newNotif);
        setTimeout(() => setToastNotif(null), 5000);
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'notifications'
      }, (payload) => {
        const updatedNotif = payload.new as Notification;
        setNotifications(prev => prev.map(n => n.id === updatedNotif.id ? updatedNotif : n));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

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

  const handleNotificationClick = async (notif: Notification) => {
    if (!notif.is_read) {
      setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
      await markAsRead(notif.id);
    }

    if (notif.action_url) {
      router.push(notif.action_url);
    }
    setShowNotifications(false);
  };

  const handleMarkAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
    await markAllAsRead();
  };

  const formatTimeAgo = (dateStr: string) => {
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const renderBadge = () => {
    if (unreadCount === 0) return null;
    const displayCount = unreadCount > 99 ? '99+' : unreadCount;
    return (
      <span className="absolute -top-1 -right-1 bg-[#E3000F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-sm leading-none min-w-[18px] text-center z-10 flex items-center justify-center h-[18px]">
        {displayCount}
      </span>
    );
  };

  return (
    <>
      <header className="h-[64px] sm:h-[72px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-3 sm:px-6 shrink-0 sticky top-0 z-50 shadow-sm transition-all">
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
          <h1 className="text-[18px] font-bold text-[#0F172A] tracking-tight md:hidden">TCI Admin</h1>
          <h1 className="hidden md:block text-[20px] font-bold text-[#0F172A] tracking-tight">{pageTitleDesktop}</h1>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="hidden sm:flex items-center bg-[#F1F5F9] border border-transparent focus-within:border-[#CBD5E1] focus-within:bg-white focus-within:shadow-sm rounded-full px-4 py-2 transition-all w-[240px] lg:w-[320px]">
            <Search size={18} className="text-[#94A3B8] shrink-0" />
            <input
              type="text"
              placeholder="Search customer, tracking ID..."
              className="bg-transparent border-none outline-none text-[14px] w-full ml-2.5 text-[#334155] placeholder:text-[#94A3B8]"
            />
          </div>

          <button
            onClick={() => setShowMobileSearch(true)}
            className="sm:hidden text-[#64748B] hover:text-[#0F172A] p-1.5 rounded-full hover:bg-[#F1F5F9] transition-colors"
          >
            <Search size={20} />
          </button>

          {/* Notifications */}
          <div className="flex items-center justify-center relative" ref={notifRef}>
            <button
              onClick={toggleNotifications}
              className={`text-[#64748B] hover:text-[#0F172A] p-1.5 sm:p-2 rounded-full transition-colors ${showNotifications ? 'bg-[#F1F5F9] text-[#0F172A]' : 'hover:bg-[#F1F5F9]'}`}
            >
              <div className="relative flex items-center justify-center">
                <Bell size={20} className="sm:w-[22px] sm:h-[22px]" />
                {renderBadge()}
              </div>
            </button>

            {showNotifications && (
              <div className="absolute top-[calc(100%+8px)] right-[-60px] sm:right-0 w-[360px] bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in slide-in-from-top-2 z-[9999] hidden md:flex flex-col max-h-[400px]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] shrink-0">
                  <span className="font-bold text-[#0F172A] text-[15px]">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-[12px] font-bold text-[#001E60] hover:text-[#001E60]/80 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 size={14} /> Mark all read
                    </button>
                  )}
                </div>

                <div className="overflow-y-auto overflow-x-hidden flex-1 overscroll-contain">
                  {notifications.length === 0 ? (
                    <div className="py-12 px-4 text-center flex flex-col items-center">
                      <div className="w-12 h-12 bg-[#F1F5F9] rounded-full flex items-center justify-center mb-3">
                        <Bell size={20} className="text-[#94A3B8]" />
                      </div>
                      <p className="text-[14px] font-bold text-[#0F172A]">No new notifications</p>
                      <p className="text-[13px] text-[#64748B] mt-0.5">You're all caught up.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {notifications.map((notif) => (
                        <button
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          className={`flex items-start gap-3 p-4 border-b border-[#F1F5F9] last:border-0 text-left transition-colors ${notif.is_read ? 'bg-white hover:bg-[#F8FAFC]' : 'bg-[#F0F5FF] hover:bg-[#E5EDFF]'}`}
                        >
                          <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${notif.is_read ? 'bg-transparent' : 'bg-[#E3000F]'}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className={`text-[13px] truncate ${notif.is_read ? 'font-semibold text-[#334155]' : 'font-black text-[#0F172A]'}`}>
                                {notif.title}
                              </span>
                              <span className="text-[11px] font-medium text-[#64748B] shrink-0">
                                {formatTimeAgo(notif.created_at)}
                              </span>
                            </div>
                            <p className={`text-[12px] leading-snug line-clamp-2 ${notif.is_read ? 'text-[#64748B]' : 'text-[#334155] font-medium'}`}>
                              {notif.message}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
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
              <div className="absolute right-0 mt-3 w-[240px] bg-white border border-[#E2E8F0] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in slide-in-from-top-2 z-[9999]">
                <div className="px-4 py-3 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                  <p className="text-[13px] font-semibold text-[#0F172A]">Administrator</p>
                  <p className="text-[11px] text-[#64748B]">TCI Express</p>
                </div>
                <div className="p-1.5">
                  <Link
                    href="/admin/profile"
                    onClick={() => setShowProfile(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[14px] font-bold text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
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
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[14px] font-bold text-[#DC2626] hover:bg-[#FEF2F2] hover:text-[#B91C1C] rounded-lg transition-colors"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Notification Modal Overlay */}
      {showNotifications && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full h-[85vh] sm:h-auto sm:max-h-[85vh] sm:max-w-[400px] sm:rounded-2xl rounded-t-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in-95 flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC] shrink-0">
              <span className="font-bold text-[#0F172A] text-[16px]">Notifications</span>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-[12px] font-bold text-[#001E60] hover:text-[#001E60]/80 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                <button onClick={() => setShowNotifications(false)} className="text-[#64748B] hover:text-[#0F172A] bg-white rounded-full p-1 border border-[#E2E8F0]">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 overscroll-contain pb-6">
              {notifications.length === 0 ? (
                <div className="py-16 px-4 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#F1F5F9] rounded-full flex items-center justify-center mb-4">
                    <Bell size={28} className="text-[#94A3B8]" />
                  </div>
                  <p className="text-[16px] font-bold text-[#0F172A]">No new notifications</p>
                  <p className="text-[14px] text-[#64748B] mt-1">You're all caught up.</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {notifications.map((notif) => (
                    <button
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`flex items-start gap-3 p-4 border-b border-[#F1F5F9] text-left transition-colors ${notif.is_read ? 'bg-white' : 'bg-[#F0F5FF]'}`}
                    >
                      <div className={`w-2.5 h-2.5 mt-1 rounded-full shrink-0 ${notif.is_read ? 'bg-transparent' : 'bg-[#E3000F]'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className={`text-[14px] truncate ${notif.is_read ? 'font-semibold text-[#334155]' : 'font-black text-[#0F172A]'}`}>
                            {notif.title}
                          </span>
                          <span className="text-[12px] font-medium text-[#64748B] shrink-0">
                            {formatTimeAgo(notif.created_at)}
                          </span>
                        </div>
                        <p className={`text-[13px] leading-relaxed ${notif.is_read ? 'text-[#64748B]' : 'text-[#334155] font-medium'}`}>
                          {notif.message}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-sm animate-in fade-in duration-200">
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

      {/* Toast Notification */}
      {toastNotif && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-2xl z-[9999] animate-in slide-in-from-bottom-4 fade-in duration-300 max-w-[320px] flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center shrink-0 mt-0.5">
            <Bell size={16} className="text-[#38BDF8]" />
          </div>
          <div className="flex-1 min-w-0 pr-2">
            <p className="text-[14px] font-bold truncate">{toastNotif.title}</p>
            <p className="text-[13px] text-[#94A3B8] mt-0.5 line-clamp-2 leading-snug">{toastNotif.message}</p>
          </div>
          <button onClick={() => setToastNotif(null)} className="text-[#64748B] hover:text-white mt-1 shrink-0">
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
