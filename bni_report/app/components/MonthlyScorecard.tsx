import React from 'react';

export default function MonthlyScorecard({ data, chapterData, title }: { data: any[], chapterData?: any, title?: string }) {
  const count = data.length || 1;
  const avgAttendance = data.reduce((sum, item) => sum + (item.attendancePercentage || 0), 0) / count;
  const avg1to1s = data.reduce((sum, item) => sum + (item.onetoone || 0), 0) / count;
  const avgReferrals = data.reduce((sum, item) => sum + (item.referals || 0), 0) / count;
  const avgVisitors = data.reduce((sum, item) => sum + (item.visitors || 0), 0) / count;
  const avgTYFCB = data.reduce((sum, item) => sum + (item.TYFCB || 0), 0) / count;
  const avgCEU = data.reduce((sum, item) => sum + (item.CEU || 0), 0) / count;
  const avgSponsors = data.reduce((sum, item) => sum + (item.sponsorPoints ? item.sponsorPoints / 5 : 0), 0) / count;

  const avgAttendancePts = data.reduce((sum, item) => sum + (item.attendancePoints || 0), 0) / count;
  const avg1to1sPts = data.reduce((sum, item) => sum + (item.onetoonePoints || 0), 0) / count;
  const avgReferralsPts = data.reduce((sum, item) => sum + (item.referalPoints || 0), 0) / count;
  const avgVisitorsPts = data.reduce((sum, item) => sum + (item.visitorsPoints || 0), 0) / count;
  const avgTYFCBPts = data.reduce((sum, item) => sum + (item.TYFCBPoints || 0), 0) / count;
  const avgCEUPts = data.reduce((sum, item) => sum + (item.CEUPoints || 0), 0) / count;
  const avgSponsorsPts = data.reduce((sum, item) => sum + (item.sponsorPoints || 0), 0) / count;

  const metrics = [
    {
      name: "ATTENDANCE", value: Math.round(avgAttendance) + "%", points: avgAttendancePts.toFixed(1), target: "95%", progress: avgAttendance,
      color: "bg-[#10b981]", dot: "bg-[#10b981]", textStyle: "text-[#10b981]", bgStyle: "bg-[#10b981]/10",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: "1-TO-1S", value: avg1to1s.toFixed(1), points: avg1to1sPts.toFixed(1), target: 4, progress: Math.min((avg1to1s / 4) * 100, 100),
      color: "bg-[#10b981]", dot: "bg-[#10b981]", textStyle: "text-[#10b981]", bgStyle: "bg-[#10b981]/10",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      name: "REFERRALS", value: avgReferrals.toFixed(1), points: avgReferralsPts.toFixed(1), target: 4, progress: Math.min((avgReferrals / 4) * 100, 100),
      color: "bg-[#10b981]", dot: "bg-[#10b981]", textStyle: "text-[#10b981]", bgStyle: "bg-[#10b981]/10",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="7.5" cy="7" r="4" />
          <line x1="14" y1="11" x2="22" y2="11" />
          <polyline points="19 8 22 11 19 14" />
        </svg>
      )
    },
    {
      name: "VISITORS", value: avgVisitors.toFixed(1), points: avgVisitorsPts.toFixed(1), target: 1, progress: Math.min((avgVisitors / 1) * 100, 100),
      color: "bg-[#f59e0b]", dot: "bg-[#f59e0b]", textStyle: "text-[#f59e0b]", bgStyle: "bg-[#f59e0b]/10",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      name: "TYFCB", value: (avgTYFCB / 1000).toFixed(1) + 'k', points: avgTYFCBPts.toFixed(1), target: "50k", progress: Math.min((avgTYFCB / 50000) * 100, 100),
      color: "bg-[#10b981]", dot: "bg-[#10b981]", textStyle: "text-[#10b981]", bgStyle: "bg-[#10b981]/10",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      name: "CEU", value: avgCEU.toFixed(1), points: avgCEUPts.toFixed(1), target: 4, progress: Math.min((avgCEU / 4) * 100, 100),
      color: "bg-[#10b981]", dot: "bg-[#10b981]", textStyle: "text-[#10b981]", bgStyle: "bg-[#10b981]/10",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      name: "SPONSORS", value: avgSponsors.toFixed(1), points: avgSponsorsPts.toFixed(1), target: 0.2, progress: Math.min((avgSponsors / 0.2) * 100, 100),
      color: "bg-[#10b981]", dot: "bg-[#10b981]", textStyle: "text-[#10b981]", bgStyle: "bg-[#10b981]/10",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  const displayTitle = title || `Chapter Scorecard (${chapterData?.monthYear})`;

  return (
    <div className="mb-8">
      <h2 className="text-[15px] font-bold text-gray-900 mb-1">{displayTitle}</h2>
      <p className="text-xs text-gray-400 mb-4">Average per member performance &middot; monthly targets shown</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-3 sm:p-4 rounded-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col relative">
            <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full ${m.dot}`}></div>
            <div className="mb-4">
              <div className={`w-8 h-8 rounded-full ${m.bgStyle} flex items-center justify-center ${m.textStyle}`}>
                {m.icon}
              </div>
            </div>
            <div className="mt-auto">
              <div className="flex flex-col items-end mb-4">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-extrabold text-gray-900 leading-none">{m.points}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">avg pts</span>
                </div>
                <div className="text-[12px] font-bold text-gray-400">
                  {m.value} <span className="font-medium text-[10px] lowercase text-gray-300">avg</span>
                </div>
              </div>

              <div className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 uppercase">{m.name}</div>
              <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1.5 w-full">
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
