'use client';
import Link from 'next/link';

export default function AdminError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-[#E2E8F0] text-center max-w-[400px]">
        <div className="w-16 h-16 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#FCA5A5]">
          <span className="text-[#DC2626] text-2xl font-bold">!</span>
        </div>
        <h3 className="text-[20px] font-bold text-[#0F172A] mb-2">Something went wrong!</h3>
        <p className="text-[#64748B] text-[14px] mb-8">An unexpected error occurred in the admin panel.</p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => reset()}
            className="w-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Try again
          </button>
          <Link 
            href="/admin/dashboard"
            className="w-full bg-[#E3000F] hover:bg-[#C8000D] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}