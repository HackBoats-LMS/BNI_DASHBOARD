export default function Recognition({ data, chapterData, title = "Recognition", subtitle }: { data: any[], chapterData: any, title?: string, subtitle?: string }) {
  if (!data || data.length === 0) return null;

  // Calculate highest visitors
  const sortedByVisitors = [...data].sort((a, b) => (b.visitors || 0) - (a.visitors || 0));
  const highestVisitorsMember = sortedByVisitors[0];
  const highestVisitors = highestVisitorsMember ? highestVisitorsMember.fullName : "N/A";
  const highestVisitorsValue = highestVisitorsMember ? highestVisitorsMember.visitors || 0 : "-";

  // Calculate highest referrals (handle both referals and referralsGiven properties)
  const sortedByReferrals = [...data].sort((a, b) => (b.referals || b.referralsGiven || 0) - (a.referals || a.referralsGiven || 0));
  const highestReferralsMember = sortedByReferrals[0];
  const highestReferrals = highestReferralsMember ? highestReferralsMember.fullName : "N/A";
  const highestReferralsValue = highestReferralsMember ? (highestReferralsMember.referals || highestReferralsMember.referralsGiven || 0) : "-";

  // Calculate highest tyfcb
  const sortedByTYFCB = [...data].sort((a, b) => (b.TYFCB || 0) - (a.TYFCB || 0));
  const highestTYFCBMember = sortedByTYFCB[0];
  const highestTYFCB = highestTYFCBMember ? highestTYFCBMember.fullName : "N/A";
  
  const formatCurrency = (val: number) => {
    if (val >= 10000000) return (val / 10000000).toFixed(2) + 'Cr';
    if (val >= 100000) return (val / 100000).toFixed(2) + 'L';
    if (val >= 1000) return (val / 1000).toFixed(1) + 'k';
    return val.toFixed(0);
  };
  
  const highestTYFCBValue = highestTYFCBMember ? formatCurrency(highestTYFCBMember.TYFCB || 0) : "-";

  const periodSubtitle = subtitle || chapterData?.monthYear || "Current Period";

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
          <p className="text-sm text-gray-500 font-medium mt-0.5">Top performers &middot; {periodSubtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[14px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#3b82f6] shrink-0 border border-blue-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Highest Visitors</p>
            <p className="text-[17px] font-extrabold text-gray-900 leading-tight">{highestVisitors}</p>
            <p className="text-sm text-gray-500 font-medium">{highestVisitorsValue}</p>
          </div>
        </div>

        <div className="bg-white rounded-[14px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#10b981] shrink-0 border border-green-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="7.5" cy="7" r="4" /><line x1="14" y1="11" x2="22" y2="11" /><polyline points="19 8 22 11 19 14" /></svg>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Highest Referrals</p>
            <p className="text-[17px] font-extrabold text-gray-900 leading-tight">{highestReferrals}</p>
            <p className="text-sm text-gray-500 font-medium">{highestReferralsValue}</p>
          </div>
        </div>

        <div className="bg-white rounded-[14px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-[#8b5cf6] shrink-0 border border-purple-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Highest TYFCB</p>
            <p className="text-[17px] font-extrabold text-gray-900 leading-tight">{highestTYFCB}</p>
            <p className="text-sm text-gray-500 font-medium">{highestTYFCBValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
