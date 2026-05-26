import React from 'react';

export default function DashboardHeader({ data }: { data: any[] }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 mt-4">
      <div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Infinity Chapter</h1>
          <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-full border border-[#10b981]/20 flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
            On Track
          </span>
          <span className="text-xs text-gray-400 font-medium hidden sm:block">6 / 7 metrics on track</span>
        </div>
        <p className="text-sm text-gray-400">Jan – May 2025 &middot; 23 meetings &middot; {data.length} active members</p>
      </div>
    </div>
  );
}
