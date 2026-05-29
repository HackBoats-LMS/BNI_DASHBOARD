import React from 'react';

export default function DashboardHeader({ data, chapterData }: { data: any[], chapterData?: any }) {
  const monthYear = chapterData?.monthYear || "Jan – May 2025";
  const chapterName = chapterData?.chapterName || "Atom Chapter";
  
  const count = data.length || 1;
  const avgScore = Math.round(data.reduce((sum, d) => sum + (d.totalScore || 0), 0) / count);
  const avgAttendance = Math.round(data.reduce((sum, item) => sum + (item.attendancePercentage || 0), 0) / count);
  
  // Try to use chapterData values if they exist, otherwise fallback to reasonable defaults
  const totalMembers = chapterData?.totalMembers || count + 10;
  const activeMembers = count;

  return (
    <div className="relative overflow-hidden mb-8 mt-4 rounded-[24px] bg-gradient-to-r from-[#dff5ee] via-[#e6fbf4] to-[#ceefe4] p-8 sm:p-10 border border-[#b2e5d8]">
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16,185,129,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16,185,129,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, white, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, white, transparent 80%)'
        }}
      ></div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-12">
        {/* Left Side */}
        <div className="flex-1 w-full lg:w-auto max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
            <span className="px-3 py-1.5 bg-white text-[#10b981] text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-sm border border-[#e5e7eb]">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              CHAPTER OVERVIEW
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-medium text-gray-900 tracking-tight mb-4">{chapterName}</h1>
          <p className="text-[15px] text-gray-600 mb-8 max-w-[500px] leading-relaxed font-normal">
            A performance-first view of your chapter's journey — engagement, business, recognition, all in one place.
          </p>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <span className="px-3.5 py-1.5 bg-white text-gray-600 text-[12px] font-medium rounded-full flex items-center gap-2 border border-[#e5e7eb] shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {monthYear}
            </span>
            <span className="px-3.5 py-1.5 bg-[#dcfce7] text-[#166534] text-[12px] font-medium rounded-full flex items-center gap-2 border border-[#bbf7d0] shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              {activeMembers} active
            </span>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="flex w-full lg:w-auto shrink-0 justify-center lg:justify-start mt-4 lg:mt-0">
          <div className="flex items-center justify-center gap-6 sm:gap-8 bg-white/95 backdrop-blur-sm rounded-[20px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-white">
            
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-2">Health Score</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-gray-900 tracking-tight">{avgScore}</span>
                <span className="text-sm font-medium text-gray-400">/100</span>
              </div>
            </div>

            <div className="w-px h-12 bg-gray-200 block"></div>

            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-2">Active Rate</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-gray-900 tracking-tight">{avgAttendance}%</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
