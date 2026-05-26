"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploading, setUploading] = useState(false);
  const [savingTop, setSavingTop] = useState(false);
  
  // Top Performers State
  const [topPerformers, setTopPerformers] = useState({
    monthYear: "May 2025",
    mostReferrals: "",
    mostReferralsValue: "",
    bestAttendance: "",
    bestAttendanceValue: "",
    most1to1s: "",
    most1to1sValue: ""
  });

  useEffect(() => {
    // Basic auth check
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) {
      router.push("/pages/secure/auth/admin/login");
      return;
    }

    // Load cached excel data if any
    const savedData = localStorage.getItem("cached_excel_data");
    if (savedData) {
      setData(JSON.parse(savedData));
    }

    // Fetch existing top performers
    fetch("/api/top-performers")
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setTopPerformers(res.data);
        }
      })
      .catch(console.error);
      
    // Fetch batches
    loadBatches();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function loadBatches() {
    try {
      const res = await fetch("/api/data/batches");
      const json = await res.json();
      if (json.success) setBatches(json.batches);
    } catch (error) {
      console.error("Error loading batches", error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/data/convert", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setData(result.data);
        localStorage.setItem("cached_excel_data", JSON.stringify(result.data));
        alert("Data successfully uploaded and database updated!");
        loadBatches();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear the local table preview?")) {
      localStorage.removeItem("cached_excel_data");
      setData([]);
    }
  };

  const handleTopPerformersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopPerformers({
      ...topPerformers,
      [e.target.name]: e.target.value
    });
  };

  const saveTopPerformers = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingTop(true);
    try {
      const res = await fetch("/api/top-performers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(topPerformers)
      });
      const result = await res.json();
      if (result.success) {
        alert("Top performers saved successfully!");
      } else {
        alert("Failed to save top performers.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving top performers.");
    } finally {
      setSavingTop(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/pages/secure/auth/admin/login");
  };

  const deleteBatch = async (batchId: string) => {
    if (confirm("Are you sure you want to delete this specific data batch?")) {
      try {
        const res = await fetch(`/api/data/batches?batchId=${batchId || 'legacy'}`, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) {
          loadBatches();
        } else {
          alert("Failed to delete batch");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredData = data.filter((item) => 
    item.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 font-medium">Manage chapter data and recognition</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600 font-bold text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Top Performers Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-[#f59e0b]">🏆</span> Set Top Performers
              </h2>
              <form onSubmit={saveTopPerformers} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Period / Month</label>
                  <input type="text" name="monthYear" value={topPerformers.monthYear || ""} onChange={handleTopPerformersChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#10b981] outline-none" placeholder="e.g. May 2025" required />
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 text-[#b90000]">Most Referrals</label>
                  <input type="text" name="mostReferrals" value={topPerformers.mostReferrals || ""} onChange={handleTopPerformersChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 mb-2 outline-none" placeholder="Member Name" />
                  <input type="text" name="mostReferralsValue" value={topPerformers.mostReferralsValue || ""} onChange={handleTopPerformersChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none" placeholder="e.g. 27 referrals" />
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 text-[#f59e0b]">Best Attendance</label>
                  <input type="text" name="bestAttendance" value={topPerformers.bestAttendance || ""} onChange={handleTopPerformersChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 mb-2 outline-none" placeholder="Member Name" />
                  <input type="text" name="bestAttendanceValue" value={topPerformers.bestAttendanceValue || ""} onChange={handleTopPerformersChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none" placeholder="e.g. 23/23" />
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 text-[#b90000]">Most 1-to-1s</label>
                  <input type="text" name="most1to1s" value={topPerformers.most1to1s || ""} onChange={handleTopPerformersChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 mb-2 outline-none" placeholder="Member Name" />
                  <input type="text" name="most1to1sValue" value={topPerformers.most1to1sValue || ""} onChange={handleTopPerformersChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none" placeholder="e.g. 22 meetings" />
                </div>

                <button type="submit" disabled={savingTop} className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-2.5 rounded-lg mt-4 transition-colors disabled:opacity-50">
                  {savingTop ? "Saving..." : "Save Recognition Data"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Excel Upload & Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-[#10b981]">📊</span> Upload BNI Report (Excel)
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                <input 
                  type="file" 
                  accept=".xlsx,.xls" 
                  onChange={handleUpload} 
                  disabled={uploading}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#10b981]/10 file:text-[#10b981] hover:file:bg-[#10b981]/20 transition-all cursor-pointer"
                />
                {uploading && <span className="text-sm font-bold text-[#10b981] animate-pulse">Processing...</span>}
              </div>
              <p className="text-xs text-gray-400 font-medium mt-3">This will parse the Excel file, calculate scores, and update the database immediately.</p>
              
              <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3">
                <button 
                  onClick={async () => {
                    if (confirm("Are you sure you want to delete all historical old data? This will keep only the most recently uploaded batch.")) {
                      const res = await fetch("/api/data/purge?type=old", { method: "DELETE" });
                      const json = await res.json();
                      alert(json.msg);
                      loadBatches();
                    }
                  }}
                  className="px-4 py-2 bg-orange-50 text-orange-600 hover:bg-orange-100 font-bold text-sm rounded-lg transition-colors border border-orange-100"
                >
                  Delete Old Data
                </button>
                <button 
                  onClick={async () => {
                    if (confirm("WARNING: Are you sure you want to completely clear the entire database?")) {
                      const res = await fetch("/api/data/purge?type=all", { method: "DELETE" });
                      const json = await res.json();
                      if (json.success) {
                         setData([]);
                         localStorage.removeItem("cached_excel_data");
                         loadBatches();
                      }
                      alert(json.msg);
                    }
                  }}
                  className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold text-sm rounded-lg transition-colors border border-red-100"
                >
                  Delete All Data
                </button>
              </div>
            </div>

            {/* Historical Batches */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🕰️</span> Manage Historical Batches
              </h2>
              {batches.length === 0 ? (
                <p className="text-sm text-gray-500">No batches found in the database.</p>
              ) : (
                <div className="space-y-3">
                  {batches.map((batch, idx) => (
                    <div key={batch._id || 'legacy'} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <p className="font-bold text-gray-900 text-sm flex items-center gap-2">
                          Batch ID: {batch._id ? new Date(batch._id).toLocaleString() : 'Legacy Data'}
                          {idx === 0 && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full uppercase tracking-wider">Latest</span>}
                        </p>
                        <p className="text-xs text-gray-500 font-medium mt-1">{batch.count} member records</p>
                      </div>
                      <button 
                        onClick={() => deleteBatch(batch._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Delete this batch"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Table Preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="font-bold text-gray-900">Data Preview</h3>
                {data.length > 0 && (
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search members..." 
                        className="w-full pl-9 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#10b981] outline-none transition-all"
                      />
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                    <button onClick={handleClear} className="text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap">
                      Clear
                    </button>
                  </div>
                )}
              </div>
              
              {data.length === 0 ? (
                <div className="p-12 text-center text-gray-400 font-medium text-sm">
                  Upload an Excel file to see the parsed data preview.
                </div>
              ) : (
                <div className="overflow-x-auto max-h-[500px]">
                  <table className="w-full text-left border-collapse whitespace-nowrap text-xs">
                    <thead className="bg-gray-50 sticky top-0 shadow-sm">
                      <tr className="text-gray-500 uppercase tracking-wider font-bold">
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Att. Pts</th>
                        <th className="p-3">Ref. Pts</th>
                        <th className="p-3">Vis. Pts</th>
                        <th className="p-3">TYFCB Pts</th>
                        <th className="p-3">121 Pts</th>
                        <th className="p-3">CEU Pts</th>
                        <th className="p-3">Total Score</th>
                        <th className="p-3">Band</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="p-3 font-bold text-gray-900">{item.fullName}</td>
                          <td className="p-3 text-gray-900">{item.attendancePoints}</td>
                          <td className="p-3 text-gray-900">{item.referalPoints}</td>
                          <td className="p-3 text-gray-900">{item.visitorsPoints}</td>
                          <td className="p-3 text-gray-900">{item.TYFCBPoints}</td>
                          <td className="p-3 text-gray-900">{item.onetoonePoints}</td>
                          <td className="p-3 text-gray-900">{item.CEUPoints}</td>
                          <td className="p-3 font-bold text-gray-900">{item.totalScore}</td>
                          <td className="p-3 font-bold">
                            <span className={`px-2 py-0.5 rounded ${item.band === 'GREEN' ? 'bg-[#10b981]/10 text-[#10b981]' : item.band === 'AMBER' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : item.band === 'RED' ? 'bg-[#ef4444]/10 text-[#ef4444]' : 'bg-gray-100 text-gray-500'}`}>{item.band}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}