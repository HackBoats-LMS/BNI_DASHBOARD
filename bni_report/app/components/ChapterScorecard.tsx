import React from 'react';

export default function ChapterScorecard({ data }: { data: any[] }) {
  const count = data.length || 1;
  const totalAttendance = data.reduce((sum, item) => sum + (item.attendancePercentage || 0), 0) / count;
  const total1to1s = data.reduce((sum, item) => sum + (item.onetoone || 0), 0);
  const totalReferrals = data.reduce((sum, item) => sum + (item.referals || 0), 0);
  const totalVisitors = data.reduce((sum, item) => sum + (item.visitors || 0), 0);
  const totalTYFCB = data.reduce((sum, item) => sum + (item.TYFCB || 0), 0);
  const totalCEU = data.reduce((sum, item) => sum + (item.CEU || 0), 0);

  const metrics = [
    { name: "ATTENDANCE", value: Math.round(totalAttendance) + "%", target: "95%", progress: totalAttendance, color: "bg-[#10b981]", dot: "bg-[#10b981]" },
    { name: "1-TO-1S", value: Math.round(total1to1s), target: 120, progress: Math.min((total1to1s/120)*100, 100), color: "bg-[#10b981]", dot: "bg-[#10b981]" },
    { name: "REFERRALS GIVEN", value: Math.round(totalReferrals), target: 100, progress: Math.min((totalReferrals/100)*100, 100), color: "bg-[#10b981]", dot: "bg-[#10b981]" },
    { name: "REF. RECEIVED", value: 66, target: 40, progress: 100, color: "bg-[#10b981]", dot: "bg-[#10b981]" },
    { name: "VISITORS", value: Math.round(totalVisitors), target: 20, progress: Math.min((totalVisitors/20)*100, 100), color: "bg-[#f59e0b]", dot: "bg-[#f59e0b]" },
    { name: "TYFCB", value: Math.round(totalTYFCB / 1000) + 'k', target: "30k", progress: 100, color: "bg-[#10b981]", dot: "bg-[#10b981]" },
    { name: "CEU", value: Math.round(totalCEU), target: 20, progress: Math.min((totalCEU/20)*100, 100), color: "bg-[#10b981]", dot: "bg-[#10b981]" }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[15px] font-bold text-gray-900 mb-1">Chapter Scorecard</h2>
      <p className="text-xs text-gray-400 mb-4">Aggregate health across all members &middot; targets shown</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-3 sm:p-4 rounded-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col relative">
            <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full ${m.dot}`}></div>
            <div className="mb-4">
              <div className="w-6 h-6 rounded bg-gray-50 flex items-center justify-center text-gray-400 mb-2">
                {/* Generic icon since we don't have exact SVGs */}
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
              </div>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider">{m.name}</span>
            </div>
            <div className="mt-auto">
              <div className="text-xl font-bold text-gray-900 mb-2">{m.value}</div>
              <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1.5">
                <span>Target: {m.target}</span>
                <span className={`font-bold ${m.color.replace('bg-', 'text-')}`}>{Math.round(m.progress)}%</span>
              </div>
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.progress}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
