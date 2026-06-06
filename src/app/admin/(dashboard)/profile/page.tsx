'use client';
import { User, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email ?? null);
      }
    }
    getProfile();
  }, []);

  return (
    <div className="space-y-5 md:space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex flex-col gap-1">
        <h2 className="text-[20px] md:text-[24px] font-black text-[#0F172A] tracking-tight">Profile</h2>
        <p className="text-[13px] md:text-[14px] font-medium text-[#64748B]">Profile management and account settings will be available in a future release.</p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl flex-1 flex flex-col items-center justify-center shadow-sm p-6 sm:p-8 text-center min-h-[300px]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F1F5F9] text-[#0F172A] rounded-full flex items-center justify-center mb-5 sm:mb-6 border border-[#E2E8F0]">
          <User size={32} className="sm:w-9 sm:h-9" />
        </div>
        
        <h2 className="text-[20px] sm:text-[24px] font-bold text-[#0F172A] tracking-tight mb-2">Administrator</h2>
        
        {email && (
          <div className="flex items-center gap-2 text-[#64748B] text-[14px] sm:text-[15px] mb-8 bg-[#F8FAFC] px-4 py-2 rounded-lg border border-[#E2E8F0]">
            <Mail size={16} />
            <a href={`mailto:${email}`} className="hover:text-[#0F172A] transition-colors">{email}</a>
          </div>
        )}

        <h3 className="text-[16px] sm:text-[18px] font-bold text-[#0F172A] mb-2">Coming Soon</h3>
        <p className="text-[#64748B] text-[13px] sm:text-[14px] max-w-md mx-auto">
          This section will soon house administrative preferences, security settings, role management, and activity logs.
        </p>
        
        <div className="mt-8 px-4 py-2 bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg text-[#64748B] text-[12px] sm:text-[13px] font-medium">
          Status: Scheduled for Future Release
        </div>
      </div>
    </div>
  );
}
