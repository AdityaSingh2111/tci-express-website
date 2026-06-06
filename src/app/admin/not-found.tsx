import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-[#E2E8F0] text-center max-w-[400px]">
        <h2 className="text-[64px] font-black text-[#001E60] leading-none mb-4">404</h2>
        <h3 className="text-[20px] font-bold text-[#0F172A] mb-2">Page Not Found</h3>
        <p className="text-[#64748B] text-[14px] mb-8">The admin page you are looking for does not exist or has been moved.</p>
        <Link 
          href="/admin/dashboard"
          className="inline-flex items-center justify-center bg-[#E3000F] hover:bg-[#C8000D] text-white font-semibold py-3 px-6 rounded-xl transition-colors w-full"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}