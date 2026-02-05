import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList, Tooltip } from 'recharts';

export default function BarChartComponent({ metrics }) {
  if (!metrics) return null;

  // 1. Prepare Data for Profit Margin (Left Chart)
  const rawProfit = metrics.profit_margin_percent || 0;
  const profitValue = rawProfit > 1 ? rawProfit : rawProfit * 100;
  
  const profitData = [{
    name: 'Profit Margin',
    value: Math.round(profitValue),
    displayValue: `${Math.round(profitValue)}%`,
    color: '#4ade80' // Green
  }];

  // 2. Prepare Data for Net Cash Flow (Right Chart)
  const cashValue = metrics.net_cash_flow || 0;
  const cashData = [{
    name: 'Net Cash Flow',
    value: cashValue,
    displayValue: (cashValue / 1000).toFixed(0) + 'k',
    color: '#facc15' // Yellow
  }];

  // Shared Tooltip Style
  const tooltipStyle = {
    backgroundColor: '#1f2937', 
    borderColor: '#374151', 
    color: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
        <span className="text-xs text-gray-400 uppercase tracking-wider">Financial Metrics</span>
      </div>
      
      {/* SOLUTION: Two separate charts side-by-side. 
         This allows Percentage (0-100) and Cash (0-1M+) to scale independently 
         so both bars are always clearly visible.
      */}
      <div className="flex-1 flex gap-4 min-h-0">
        
        {/* LEFT: Profit Margin Chart */}
        <div className="flex-1 relative">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profitData} margin={{ top: 25, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 500}} dy={10} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={tooltipStyle} />
                <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={60}>
                    <Cell fill={profitData[0].color} />
                    <LabelList dataKey="displayValue" position="top" fill="#ffffff" fontSize={16} fontWeight="bold" offset={10} />
                </Bar>
            </BarChart>
            </ResponsiveContainer>
        </div>

        {/* RIGHT: Cash Flow Chart */}
        <div className="flex-1 relative border-l border-gray-800 pl-4">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashData} margin={{ top: 25, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 500}} dy={10} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={tooltipStyle} />
                <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={60}>
                    <Cell fill={cashData[0].color} />
                    <LabelList dataKey="displayValue" position="top" fill="#ffffff" fontSize={16} fontWeight="bold" offset={10} />
                </Bar>
            </BarChart>
            </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}