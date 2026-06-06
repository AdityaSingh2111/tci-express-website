import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: 'blue' | 'green' | 'red' | 'purple';
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  color = 'blue' 
}: StatCardProps) {
  
  const colorStyles = {
    blue: 'bg-[#EFF6FF] text-[#3B82F6] border-[#DBEAFE]',
    green: 'bg-[#F0FDF4] text-[#22C55E] border-[#DCFCE7]',
    red: 'bg-[#FEF2F2] text-[#EF4444] border-[#FEE2E2]',
    purple: 'bg-[#FAF5FF] text-[#A855F7] border-[#F3E8FF]',
  };

  return (
    <div className="bg-white p-3 md:p-5 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
      <div className="flex items-start md:items-center justify-between mb-3 md:mb-4 gap-2 flex-col-reverse md:flex-row">
        <span className="text-[12px] md:text-[14px] font-semibold text-[#64748B] tracking-tight line-clamp-2 md:line-clamp-1 leading-snug md:leading-normal">{title}</span>
        <div className={`p-2 md:p-2.5 rounded-xl border transition-colors ${colorStyles[color]} group-hover:bg-white`}>
          <Icon size={18} className="md:w-5 md:h-5" />
        </div>
      </div>
      
      <div>
        <h3 className="text-[22px] md:text-[28px] font-black text-[#0F172A] tracking-tight">{value}</h3>
        {trend && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`text-[11px] md:text-[12px] font-bold ${trendUp ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </span>
            <span className="hidden md:inline text-[12px] font-medium text-[#94A3B8]">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
