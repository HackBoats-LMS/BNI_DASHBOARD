"use client";

import React, { useState, useRef } from 'react';
import MemberModal from './MemberModal';
import * as htmlToImage from 'html-to-image';

export default function Table({ initialData = [], chapterData }: { initialData: any[], chapterData?: any }) {
  const chapterName = chapterData?.chapterName || "Infinity Chapter";
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  let data = [...initialData];

  // Search
  if (search) {
    data = data.filter(d => d.fullName?.toLowerCase().includes(search.toLowerCase()));
  }

  // Sort
  if (sortBy === 'score') {
    data.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
  } else {
    data.sort((a, b) => (a.fullName || '').localeCompare(b.fullName || ''));
  }

  // Helpers
  const getInitials = (name: string) => {
    if (!name) return 'BN';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getBandColor = (band: string) => {
    switch (band?.toUpperCase()) {
      case 'GREEN': return 'bg-[#10b981]';
      case 'AMBER': return 'bg-[#f59e0b]';
      case 'RED': return 'bg-[#ef4444]';
      default: return 'bg-[#9ca3af]';
    }
  };

  const getBandTextColor = (band: string) => {
    switch (band?.toUpperCase()) {
      case 'GREEN': return 'text-[#10b981]';
      case 'AMBER': return 'text-[#f59e0b]';
      case 'RED': return 'text-[#ef4444]';
      default: return 'text-[#9ca3af]';
    }
  };

  const getBandBgLight = (band: string) => {
    switch (band?.toUpperCase()) {
      case 'GREEN': return 'bg-[#10b981]/10';
      case 'AMBER': return 'bg-[#f59e0b]/10';
      case 'RED': return 'bg-[#ef4444]/10';
      default: return 'bg-[#9ca3af]/10';
    }
  };

  const getDotColor = (points: number, maxPoints: number) => {
    if (points === undefined) return 'bg-[#9ca3af]';
    const ratio = points / maxPoints;
    if (ratio >= 0.7) return 'bg-[#10b981]';
    if (ratio >= 0.4) return 'bg-[#f59e0b]';
    return 'bg-[#ef4444]';
  };

  const getMetricTextColor = (points: number, maxPoints: number) => {
    if (points === undefined) return 'text-[#9ca3af]';
    const ratio = points / maxPoints;
    if (ratio >= 0.7) return 'text-[#10b981]';
    if (ratio >= 0.4) return 'text-[#f59e0b]';
    return 'text-[#ef4444]';
  };

  const handleDownload = async () => {
    if (!tableRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await htmlToImage.toPng(tableRef.current, {
        backgroundColor: '#ffffff',
        pixelRatio: 2
      });

      const link = document.createElement('a');
      link.download = `bni-chapter-scorecard-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to download image.');
    } finally {
      setDownloading(false);
    }
  };


  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 font-sans pb-12">
      <div ref={tableRef} className="bg-white rounded-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="p-4 sm:p-6 border-b border-gray-100">

          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">{chapterName} Scoreboard</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              {data.length} members &middot; Tap a row to expand &middot; Traffic light per metric
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:max-w-md flex items-center">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or role..."
                className="w-full pl-10 pr-10 py-2 bg-gray-50/80 border border-gray-200 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:bg-white transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-2 sm:gap-4">
              <div className="flex bg-gray-100/80 rounded-full p-1">
                <button
                  onClick={() => setSortBy('score')}
                  className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full shadow-sm transition-colors ${sortBy === 'score' ? 'bg-[#cc0000] text-white' : 'text-gray-600 hover:bg-gray-200/50'}`}
                >
                  By Score
                </button>
                <button
                  onClick={() => setSortBy('name')}
                  className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full shadow-sm transition-colors ${sortBy === 'name' ? 'bg-[#cc0000] text-white' : 'text-gray-600 hover:bg-gray-200/50'}`}
                >
                  By Name
                </button>
              </div>
              <span className="text-xs sm:text-sm text-gray-400 hidden lg:inline-block">{data.length} of {initialData.length} members</span>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="hidden sm:flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {downloading ? (
                  <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></span>
                ) : (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                )}
                {downloading ? 'Downloading...' : 'Download'}
              </button>
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-full md:min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6 font-medium">Member</th>
                <th className="py-4 px-4 font-medium text-center">Score</th>
                <th className="py-4 px-4 font-medium text-center hidden md:table-cell">Attendance</th>
                <th className="py-4 px-4 font-medium text-center hidden md:table-cell">Sponsor</th>
                <th className="py-4 px-4 font-medium text-center hidden md:table-cell">1-To-1s</th>
                <th className="py-4 px-4 font-medium text-center hidden md:table-cell">Referrals Given</th>
                <th className="py-4 px-4 font-medium text-center hidden md:table-cell">Visitors</th>
                <th className="py-4 px-4 font-medium text-center hidden md:table-cell">TYFCB</th>
                <th className="py-4 px-4 font-medium text-center hidden md:table-cell">CEU</th>
                <th className="py-4 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/80">
              {data.map((item: any, index: number) => (
                <tr key={index} onClick={() => setSelectedMember(item)} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-300 text-xs font-medium w-4 text-right">{index + 1}</span>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs tracking-wide ${getBandBgLight(item.band)} ${getBandTextColor(item.band)}`}>
                        {getInitials(item.fullName)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.fullName}</p>
                        <p className="text-[11px] text-gray-400">Chapter Member</p>
                      </div>
                    </div>
                  </td>

                  {/* Score column */}
                  <td className="py-3 px-4 text-center align-middle">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getBandColor(item.band)}`}
                          style={{ width: `${item.totalScore || 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-gray-400 uppercase flex items-center gap-1">
                        {item.totalScore || 0}/100
                        {(item.totalScore || 0) >= 70 && (
                          <svg className="w-3 h-3 text-[#10b981]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                    </div>
                  </td>

                  {/* Metrics */}
                  <td className="py-3 px-4 text-center hidden md:table-cell">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className={`text-[13px] font-bold ${getMetricTextColor(item.attendancePoints, 10)}`}>
                        {item.attendancePoints}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(item.attendancePoints, 10)}`}></div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center hidden md:table-cell">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className={`text-[13px] font-bold ${getMetricTextColor(item.sponsorPoints, 5)}`}>
                        {item.sponsorPoints}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(item.sponsorPoints, 5)}`}></div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center hidden md:table-cell">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className={`text-[13px] font-bold ${getMetricTextColor(item.onetoonePoints, 20)}`}>
                        {item.onetoonePoints || 0}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(item.onetoonePoints, 20)}`}></div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center hidden md:table-cell">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className={`text-[13px] font-bold ${getMetricTextColor(item.referalPoints, 25)}`}>
                        {item.referalPoints || 0}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(item.referalPoints, 25)}`}></div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center hidden md:table-cell">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className={`text-[13px] font-bold ${getMetricTextColor(item.visitorsPoints, 25)}`}>
                        {item.visitorsPoints || 0}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(item.visitorsPoints, 25)}`}></div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center hidden md:table-cell">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className={`text-[13px] font-bold ${getMetricTextColor(item.TYFCBPoints, 5)}`}>
                        {item.TYFCBPoints || 0}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(item.TYFCBPoints, 5)}`}></div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center hidden md:table-cell">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className={`text-[13px] font-bold ${getMetricTextColor(item.CEUPoints, 10)}`}>
                        {item.CEUPoints || 0}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(item.CEUPoints, 10)}`}></div>
                    </div>
                  </td>

                  <td className="py-3 px-6 text-right">
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-12 h-12 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500 font-medium">No members found</p>
                      <p className="text-sm text-gray-400 mt-1">Upload an Excel report to see the scoreboard.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </div>
  );
}