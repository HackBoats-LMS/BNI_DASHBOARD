import React, { useEffect } from 'react';

export default function MemberModal({ member, onClose }: { member: any, onClose: () => void }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!member) return null;

  const getInitials = (name: string) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'BN';

  const metricsInfo = [
    { key: 'attendance', label: 'Attendance', value: `${member.attendancePoints}`, target: '10', points: member.attendancePoints, max: 10, action: 'Attend more meetings' },
    { key: 'sponsor', label: 'Sponsor', value: member.sponsorPoints, target: '1', points: member.sponsorPoints, max: 20, action: 'Sponsor more members' },
    { key: 'onetoone', label: '1-to-1s', value: member.onetoone !== undefined ? member.onetoone.toFixed(1) : 0, target: '1.0+', points: member.onetoonePoints, max: 20, action: 'Schedule more 1-to-1s' },
    { key: 'referals', label: 'Referrals', value: member.referals !== undefined ? member.referals.toFixed(1) : 0, target: '1.25+', points: member.referalPoints, max: 25, action: 'Pass more referrals' },
    { key: 'visitors', label: 'Visitors', value: member.visitors || 0, target: '1+', points: member.visitorsPoints, max: 25, action: 'Invite more visitors' },
    { key: 'tyfcb', label: 'TYFCB', value: (member.TYFCB || 0) >= 1000 ? ((member.TYFCB || 0)/1000).toFixed(2) + 'k' : Number(member.TYFCB || 0).toFixed(2), target: '10k+', points: member.TYFCBPoints, max: 5, action: 'Log your closed business' },
    { key: 'ceu', label: 'CEU', value: member.CEU !== undefined ? member.CEU.toFixed(1) : 0, target: '1+', points: member.CEUPoints, max: 10, action: 'Complete more CEUs' },
  ];

  const getMetricStatus = (points: number, max: number) => {
    const ratio = (points || 0) / max;
    if (ratio >= 0.7) return 'green';
    if (ratio >= 0.4) return 'amber';
    return 'red';
  };

  const getStatusColor = (status: string, type: 'bg' | 'text' | 'border' | 'light') => {
    if (status === 'green') {
      if (type === 'bg') return 'bg-[#10b981]';
      if (type === 'text') return 'text-[#10b981]';
      if (type === 'border') return 'border-[#10b981]';
      if (type === 'light') return 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20';
    }
    if (status === 'amber') {
      if (type === 'bg') return 'bg-[#f59e0b]';
      if (type === 'text') return 'text-[#f59e0b]';
      if (type === 'border') return 'border-[#f59e0b]';
      if (type === 'light') return 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20';
    }
    if (type === 'bg') return 'bg-[#ef4444]';
    if (type === 'text') return 'text-[#ef4444]';
    if (type === 'border') return 'border-[#ef4444]';
    return 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20';
  };

  const metrics = metricsInfo.map(m => ({
    ...m,
    status: getMetricStatus(m.points, m.max)
  }));

  const greenCount = metrics.filter(m => m.status === 'green').length;
  const amberCount = metrics.filter(m => m.status === 'amber').length;
  const redCount = metrics.filter(m => m.status === 'red').length;

  const band = member.band?.toUpperCase() || 'GREY';
  const headerBgColor = band === 'GREEN' ? 'bg-[#10b981]' : band === 'AMBER' ? 'bg-[#f59e0b]' : band === 'RED' ? 'bg-[#ef4444]' : 'bg-[#9ca3af]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className={`${headerBgColor} p-6 sm:p-8 text-white relative flex justify-between items-center shrink-0`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-lg sm:text-xl font-bold tracking-wider backdrop-blur-md shrink-0">
              {getInitials(member.fullName)}
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">{member.fullName}</h2>
              <p className="text-white/80 text-xs sm:text-sm font-medium mt-0.5">BNI Member</p>
            </div>
          </div>

          <div className="text-right pr-6 sm:pr-12">
            <p className="text-[9px] sm:text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Traffic Score</p>
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-3xl sm:text-4xl font-extrabold leading-none">{member.totalScore || 0}</span>
              <span className="text-xs sm:text-sm font-bold text-white/70">/100</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-[#fafafa]">
          
          {/* Progress Bar & Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="w-full sm:w-1/2">
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                <div className="h-full bg-[#10b981]" style={{ width: `${(greenCount / metrics.length) * 100}%` }}></div>
                <div className="h-full bg-[#f59e0b]" style={{ width: `${(amberCount / metrics.length) * 100}%` }}></div>
                <div className="h-full bg-[#ef4444]" style={{ width: `${(redCount / metrics.length) * 100}%` }}></div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#10b981]"></div> {greenCount} Green</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div> {amberCount} Amber</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#ef4444]"></div> {redCount} Red</div>
              <div className="text-xs text-gray-400">of {metrics.length} metrics</div>
            </div>
          </div>

          {/* Metric Breakdown */}
          <div className="mb-10">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Metric Breakdown</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {metrics.map((m, i) => (
                <div key={i} className={`bg-white rounded-xl p-4 border flex flex-col justify-between ${getStatusColor(m.status, 'border')} shadow-sm hover:shadow-md transition-shadow`}>
                  <div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase border mb-3 ${getStatusColor(m.status, 'light')}`}>
                      <span className={`w-1 h-1 rounded-full mr-1 ${getStatusColor(m.status, 'bg')}`}></span>
                      {m.status}
                    </span>
                    <p className="text-[11px] font-bold text-gray-400 tracking-wide uppercase mb-1">{m.label}</p>
                    <p className="text-2xl font-extrabold text-gray-900">{m.value}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <p className="text-[10px] font-semibold text-gray-400">Target: {m.target}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plan of Action */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Plan of Action</h3>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              
              {/* Header */}
              <div className={`${getStatusColor(metrics.filter(m => m.status === 'green').length >= 4 ? 'green' : 'amber', 'bg')} p-5 sm:p-6 text-white flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm hidden sm:block">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold">
                      {greenCount >= 4 ? `Well done, ${member.fullName.split(' ')[0]}!` : `Time to push, ${member.fullName.split(' ')[0]}!`}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-white/80 font-medium mt-0.5">{greenCount} of {metrics.length} metrics green &middot; {metrics.length - greenCount} to push further</p>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold shrink-0">{member.totalScore || 0}<span className="text-xs sm:text-sm font-bold text-white/70">/100</span></div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                
                {/* Keep Doing This */}
                {greenCount > 0 && (
                  <div className="mb-8">
                    <h5 className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      Keep doing this
                      <svg className="w-3.5 h-3.5 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {metrics.filter(m => m.status === 'green').map((m, i) => (
                        <div key={i} className="px-3 py-1.5 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 text-[11px] sm:text-xs font-bold flex items-center gap-1.5">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          {m.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Push to Perfect */}
                {metrics.filter(m => m.status !== 'green').length > 0 && (
                  <div>
                    <h5 className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      Push to perfect
                      <span className="text-lg sm:text-xl leading-none mb-0.5">🚀</span>
                    </h5>
                    <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100/80">
                      {metrics.filter(m => m.status !== 'green').map((m, i) => (
                        <div key={i} className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                          <div className="flex items-center gap-3 w-full sm:w-1/3">
                            <span className="text-gray-300">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </span>
                            <span className="font-bold text-gray-700 text-sm">{m.label}</span>
                          </div>
                          <div className="flex items-center justify-between w-full sm:w-auto sm:flex-1 gap-4 pl-7 sm:pl-0">
                            <span className="text-xs font-medium text-gray-500 flex-1 sm:text-right">{m.action}</span>
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold shrink-0 ${getStatusColor(m.status, 'light')}`}>
                              +{Math.round(m.max - (m.points || 0))} pts gap
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
              
              {/* Footer Tip */}
              <div className="bg-gray-50/80 border-t border-gray-100 px-5 sm:px-6 py-4 flex items-start gap-3">
                <span className="text-[#f59e0b] text-base sm:text-lg">⚡</span>
                <p className="text-[11px] sm:text-xs text-gray-500 font-medium leading-relaxed">
                  Maintain your current activity — consistency is what keeps you green. Keep networking, passing referrals, and showing up!
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
