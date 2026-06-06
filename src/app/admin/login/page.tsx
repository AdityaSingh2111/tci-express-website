"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#F8FAFC] px-4 sm:px-6 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[45%] bg-[#001E60] transform -skew-y-3 origin-top-left translate-y-[-10%] z-0"></div>
      
      {/* Back to Home Button */}
      <Link 
        href="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 text-white/90 hover:text-white font-medium transition-all hover:-translate-x-1 text-[13px] sm:text-[14px] p-2 -ml-2"
      >
        <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" /> <span className="hidden sm:inline">Back to Website</span><span className="sm:hidden">Back</span>
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-[420px] relative z-10 border border-[#E2E8F0] mt-4 sm:mt-0">
        <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
          <div className="mb-4 sm:mb-5 relative w-40 h-10 sm:w-48 sm:h-12">
            <Image 
              src="/logos/logo-primary.svg" 
              alt="TCI Express" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-[22px] sm:text-[28px] font-bold text-[#0F172A] tracking-tight leading-tight">Admin Console</h2>
          <p className="text-[#64748B] text-[13px] sm:text-[14px] mt-1 sm:mt-2">Sign in to manage operations</p>
        </div>

        {error && (
          <div className="bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] p-3 sm:p-4 rounded-xl mb-5 text-[13px] font-medium flex items-start sm:items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={18} className="shrink-0 mt-0.5 sm:mt-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-[12px] sm:text-[13px] font-bold text-[#334155] uppercase tracking-wide ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 border border-[#CBD5E1] rounded-xl focus:ring-4 focus:ring-[#001E60]/10 focus:border-[#001E60] outline-none transition-all bg-[#F8FAFC] focus:bg-white text-[#0F172A] text-[14px] sm:text-[15px] text-left"
                placeholder="admin@tciexpress.com"
                required 
              />
            </div>
          </div>
          
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-[12px] sm:text-[13px] font-bold text-[#334155] uppercase tracking-wide ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 border border-[#CBD5E1] rounded-xl focus:ring-4 focus:ring-[#001E60]/10 focus:border-[#001E60] outline-none transition-all bg-[#F8FAFC] focus:bg-white text-[#0F172A] text-[14px] sm:text-[15px] text-left"
                placeholder="••••••••"
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#E3000F] hover:bg-[#C8000D] text-white font-bold py-3.5 sm:py-4 rounded-xl shadow-lg shadow-[#E3000F]/20 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2 text-[15px] sm:text-[16px]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="mt-6 sm:mt-8 text-center pt-5 border-t border-[#F1F5F9]">
          <p className="text-[12px] text-[#94A3B8] font-medium flex items-center justify-center gap-2">
            <Lock size={12} /> Secure Authentication System
          </p>
        </div>
      </div>
    </div>
  );
}
