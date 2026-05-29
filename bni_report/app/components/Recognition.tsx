import React from 'react';

export default function Recognition({ data, monthlyData, chapterData }: { data: any[], monthlyData: any[], chapterData: any }) {
  if (!data || data.length === 0) return null;

  const getHighest = (dataset: any[], key1: string, key2?: string) => {
    if (!dataset || dataset.length === 0) return { name: "N/A", value: "-" };
    const sorted = [...dataset].sort((a, b) => {
      const valA = (a[key1] || (key2 ? a[key2] : 0) || 0);
      const valB = (b[key1] || (key2 ? b[key2] : 0) || 0);
      return valB - valA;
    });
    const top = sorted[0];
    if (!top) return { name: "N/A", value: "-" };
    const val = top[key1] || (key2 ? top[key2] : 0) || 0;
    return { name: top.fullName, value: val };
  };

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return (val / 10000000).toFixed(2) + 'Cr';
    if (val >= 100000) return (val / 100000).toFixed(2) + 'L';
    if (val >= 1000) return (val / 1000).toFixed(2) + 'k';
    return val.toFixed(0);
  };

  const overallVis = getHighest(data, 'visitors');
  const monthlyVis = getHighest(monthlyData, 'visitors');

  const overallRef = getHighest(data, 'referals', 'referralsGiven');
  const monthlyRef = getHighest(monthlyData, 'referals', 'referralsGiven');

  const overallTYFCB = getHighest(data, 'TYFCB');
  const monthlyTYFCB = getHighest(monthlyData, 'TYFCB');

  const Card = ({ title, overallName, overallVal, monthlyName, monthlyVal, icon, colorClass, borderClass, bgClass, textClass }: any) => (
    <div className={`bg-white rounded-[14px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-5 hover:shadow-sm transition-shadow`}>
      <div className={`w-12 h-12 rounded-full ${bgClass} flex items-center justify-center ${textClass} shrink-0 border ${borderClass}`}>
        {icon}
      </div>
      <div className="flex-1 w-full min-w-0">
        <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">{title}</p>
        <div className="flex gap-4 items-start">
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Overall</p>
            <p className="text-[14px] font-extrabold text-gray-900 break-words leading-tight" title={overallName}>{overallName}</p>
            <p className="text-xs text-gray-500 font-bold mt-0.5">{overallVal}</p>
          </div>
          <div className="w-px h-auto self-stretch bg-gray-100 shrink-0 mx-1"></div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Monthly</p>
            <p className="text-[14px] font-extrabold text-gray-900 break-words leading-tight" title={monthlyName}>{monthlyName}</p>
            <p className="text-xs text-gray-500 font-bold mt-0.5">{monthlyVal}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col h-full bg-white rounded-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
      <div className="bg-emerald-600 p-4 sm:p-5 text-white flex flex-wrap justify-between items-center gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
          </div>
          <div>
            <h2 className="text-[15px] font-bold tracking-wide">RECOGNITION BOARDS</h2>
            <p className="text-xs font-medium text-white/70 mt-0.5">Top performers overall vs monthly</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col gap-4 bg-[#f8fafc]/50">
        <Card 
          title="Highest Visitors" 
          overallName={overallVis.name} overallVal={overallVis.value} 
          monthlyName={monthlyVis.name} monthlyVal={monthlyVis.value}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>}
          bgClass="bg-blue-50" textClass="text-[#3b82f6]" borderClass="border-blue-100"
        />

        <Card 
          title="Highest Referrals" 
          overallName={overallRef.name} overallVal={overallRef.value} 
          monthlyName={monthlyRef.name} monthlyVal={monthlyRef.value}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="7.5" cy="7" r="4" /><line x1="14" y1="11" x2="22" y2="11" /><polyline points="19 8 22 11 19 14" /></svg>}
          bgClass="bg-green-50" textClass="text-[#10b981]" borderClass="border-green-100"
        />

        <Card 
          title="Highest TYFCB" 
          overallName={overallTYFCB.name} overallVal={formatCurrency(overallTYFCB.value as number)} 
          monthlyName={monthlyTYFCB.name} monthlyVal={formatCurrency(monthlyTYFCB.value as number)}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
          bgClass="bg-purple-50" textClass="text-[#8b5cf6]" borderClass="border-purple-100"
        />
      </div>
    </div>
  );
}
