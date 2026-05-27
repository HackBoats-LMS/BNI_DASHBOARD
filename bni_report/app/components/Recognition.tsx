export default function Recognition({ monthlyData, chapterData }: { monthlyData: any[], chapterData: any }) {
  if (!monthlyData || monthlyData.length === 0) return null;

  // Calculate most referrals
  const sortedByReferrals = [...monthlyData].sort((a, b) => (b.referralsGiven || 0) - (a.referralsGiven || 0));
  const mostReferralsMember = sortedByReferrals[0];
  const mostReferrals = mostReferralsMember ? mostReferralsMember.fullName : "N/A";
  const mostReferralsValue = mostReferralsMember ? mostReferralsMember.referralsGiven || 0 : "-";

  // Calculate best attendance
  const sortedByAttendance = [...monthlyData].sort((a, b) => (b.attendancePercentage || 0) - (a.attendancePercentage || 0));
  const bestAttendanceMember = sortedByAttendance[0];
  const bestAttendance = bestAttendanceMember ? bestAttendanceMember.fullName : "N/A";
  const bestAttendanceValue = bestAttendanceMember ? Math.round(bestAttendanceMember.attendancePercentage || 0) + "%" : "-";

  // Calculate most 1-to-1s
  const sortedBy1to1s = [...monthlyData].sort((a, b) => (b.onetoone || 0) - (a.onetoone || 0));
  const most1to1sMember = sortedBy1to1s[0];
  const most1to1s = most1to1sMember ? most1to1sMember.fullName : "N/A";
  const most1to1sValue = most1to1sMember ? most1to1sMember.onetoone || 0 : "-";

  const monthYear = chapterData?.monthYear || "Current Period";

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recognition</h2>
          <p className="text-sm text-gray-500 font-medium mt-0.5">Top performers this period &middot; {monthYear}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[14px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[#b90000] shrink-0 border border-red-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Most Referrals Given</p>
            <p className="text-[17px] font-extrabold text-gray-900 leading-tight">{mostReferrals}</p>
            <p className="text-sm text-gray-500 font-medium">{mostReferralsValue}</p>
          </div>
        </div>

        <div className="bg-white rounded-[14px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-[#f59e0b] shrink-0 border border-orange-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Best Attendance</p>
            <p className="text-[17px] font-extrabold text-gray-900 leading-tight">{bestAttendance}</p>
            <p className="text-sm text-gray-500 font-medium">{bestAttendanceValue}</p>
          </div>
        </div>

        <div className="bg-white rounded-[14px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[#b90000] shrink-0 border border-red-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Most 1-to-1 Meetings</p>
            <p className="text-[17px] font-extrabold text-gray-900 leading-tight">{most1to1s}</p>
            <p className="text-sm text-gray-500 font-medium">{most1to1sValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
