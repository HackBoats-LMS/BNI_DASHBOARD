import React from 'react';

export default function ScoringParameters() {
  const Card = ({ title, max, children }: any) => (
    <div className="bg-white rounded-[14px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xs font-extrabold text-gray-900">{title}</h3>
        {max && <span className="text-[11px] font-extrabold text-red-500">/{max}</span>}
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {children}
      </div>
    </div>
  );

  const Row = ({ label, value, type }: any) => (
    <div className="flex justify-between items-center">
      <span className="text-[11px] font-bold text-gray-500">{label}</span>
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide ${
        type === 'green' ? 'bg-[#10b981]/10 text-[#10b981]' : 
        type === 'amber' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 
        type === 'red' ? 'bg-[#ef4444]/10 text-[#ef4444]' : 
        'bg-gray-100 text-gray-500'
      }`}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-8 mt-4">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Scoring Parameters</h2>
        <p className="text-sm text-gray-500 font-medium mt-0.5">How points are calculated per metric &middot; reference guide</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        <Card title="Attendance" max={10}>
          <Row label="< 88%" value="0" type="gray" />
          <Row label="88-94%" value="5" type="amber" />
          <Row label="≥ 95%" value="10" type="green" />
        </Card>

        <Card title="CEU / Week" max={10}>
          <Row label="0" value="0" type="gray" />
          <Row label="> 0-0.5" value="5" type="amber" />
          <Row label="> 0.5" value="10" type="green" />
        </Card>

        <Card title="1-2-1s / Week" max={20}>
          <Row label="< 0.25" value="0" type="gray" />
          <Row label="0.25-0.49" value="5" type="red" />
          <Row label="0.5-0.74" value="10" type="amber" />
          <Row label="0.75-0.99" value="15" type="amber" />
          <Row label="≥ 1.0" value="20" type="green" />
        </Card>

        <Card title="Referrals / Wk" max={25}>
          <Row label="< 0.25" value="0" type="gray" />
          <Row label="0.25-0.49" value="5" type="red" />
          <Row label="0.5-0.74" value="10" type="amber" />
          <Row label="0.75-0.99" value="15" type="amber" />
          <Row label="1.0-1.24" value="20" type="green" />
          <Row label="≥ 1.25" value="25" type="green" />
        </Card>

        <Card title="TYFCB" max={5}>
          <Row label="0" value="0" type="gray" />
          <Row label="> 0-< 2" value="1" type="red" />
          <Row label="2-< 5" value="2" type="red" />
          <Row label="5-< 15" value="3" type="amber" />
          <Row label="15-< 30" value="4" type="amber" />
          <Row label="≥ 30" value="5" type="green" />
        </Card>

        <Card title="Visitors (6 mo)" max={25}>
          <Row label="0" value="0" type="gray" />
          <Row label="1" value="5" type="red" />
          <Row label="2" value="10" type="amber" />
          <Row label="3" value="15" type="amber" />
          <Row label="4" value="20" type="green" />
          <Row label="5+" value="25" type="green" />
        </Card>

        <Card title="Sponsors (6 mo)" max={5}>
          <Row label="0" value="0" type="gray" />
          <Row label="1+" value="5" type="green" />
        </Card>

        <Card title="Score Band">
          <Row label="70-100" value="GREEN" type="green" />
          <Row label="50-69" value="AMBER" type="amber" />
          <Row label="30-49" value="RED" type="red" />
          <Row label="0-29" value="GREY" type="gray" />
        </Card>
      </div>
    </div>
  );
}
