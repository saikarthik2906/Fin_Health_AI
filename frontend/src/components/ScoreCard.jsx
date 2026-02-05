import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function ScoreCard({ name, score, risk }) {
  // 1. Clean the string: remove spaces and make uppercase
  const cleanRisk = risk ? risk.toString().trim().toUpperCase() : 'UNKNOWN';

  const getRiskColor = (r) => {
    // 2. Exact checks
    if (r === 'LOW') return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (r === 'MEDIUM') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  return (
    <div className="bg-gradient-to-r from-[#1c2333] to-[#161b2a] border border-gray-800 rounded-xl p-6 h-full flex items-center justify-between relative overflow-hidden shadow-lg">
      <div className="z-10">
        <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border w-fit ${getRiskColor(cleanRisk)}`}>
           {cleanRisk === 'LOW' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
           <span className="text-sm font-bold tracking-wide">{cleanRisk} RISK</span>
        </div>
      </div>

      <div className="flex items-center gap-6 z-10 mr-8">
        <div className="text-right">
            <p className="text-gray-400 text-sm uppercase tracking-wider">Financial Health Score</p>
            <p className="text-5xl font-mono font-bold text-white">{score}<span className="text-gray-600 text-2xl">/100</span></p>
        </div>
        <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#374151" strokeWidth="8" fill="transparent" />
                <circle cx="48" cy="48" r="40" stroke={score > 70 ? "#4ade80" : "#facc15"} strokeWidth="8" fill="transparent" 
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * score) / 100}
                  strokeLinecap="round"
                />
            </svg>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-full bg-blue-500/5 blur-3xl pointer-events-none"></div>
    </div>
  );
}