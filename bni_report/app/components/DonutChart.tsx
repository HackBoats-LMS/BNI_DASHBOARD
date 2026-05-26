"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DonutChartProps {
  greens: number;
  ambers: number;
  reds: number;
  avgScore: number;
}

export default function DonutChart({ greens, ambers, reds, avgScore }: DonutChartProps) {
  const data = [
    { name: 'Green', value: greens, color: '#10b981' },
    { name: 'Amber', value: ambers, color: '#f59e0b' },
    { name: 'Red', value: reds, color: '#ef4444' },
  ].filter(d => d.value > 0);

  // If no data, show a grey empty circle
  if (data.length === 0) {
    data.push({ name: 'Empty', value: 1, color: '#f3f4f6' });
  }

  return (
    <div className="relative w-40 h-40 flex-shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={75}
            stroke="none"
            paddingAngle={2}
            dataKey="value"
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any) => [`${value} Members`, 'Count']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px', fontWeight: 'bold' }}
            itemStyle={{ color: '#374151' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1 pointer-events-none">
        <span className="text-[32px] font-extrabold text-gray-900 leading-none tracking-tight">{avgScore}</span>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1">/100 avg</span>
      </div>
    </div>
  );
}
