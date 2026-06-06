import StatCard from "@/components/admin/dashboard/StatCard";
import { Users, FileText, Truck, Activity } from "lucide-react";

export default async function DashboardPage() {
  const kolkataTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: false, hour: 'numeric' });
  const hour = parseInt(kolkataTime, 10);
  
  let greeting = "Welcome Back";
  if (hour >= 5 && hour < 12) greeting = "Good Morning";
  else if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  else if (hour >= 17 && hour < 21) greeting = "Good Evening";

  return (
    <div className="space-y-5 md:space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-[20px] md:text-[24px] font-black text-[#0F172A] tracking-tight">{greeting}, Admin</h2>
        <p className="text-[13px] md:text-[14px] font-medium text-[#64748B]">Here is your operations overview for today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <StatCard title="Today's Leads" value="0" icon={Users} color="blue" />
        <StatCard title="Total Leads" value="0" icon={FileText} color="purple" />
        <StatCard title="Booked Shipments" value="0" icon={Truck} color="red" />
        <StatCard title="Active Shipments" value="0" icon={Activity} color="green" />
      </div>

      {/* Placeholder for future charts/tables */}
      <div className="mt-6 md:mt-8 bg-white border border-[#E2E8F0] rounded-2xl h-[300px] md:h-[400px] flex items-center justify-center shadow-sm">
        <p className="text-[#94A3B8] font-medium text-[13px] md:text-[14px]">Recent Activity Feed (Coming in Phase 3)</p>
      </div>
    </div>
  );
}
