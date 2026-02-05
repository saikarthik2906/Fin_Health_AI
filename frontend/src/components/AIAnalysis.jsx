import React from 'react';
import { ListFilter } from 'lucide-react';

export default function AIAnalysis({ score, risk, summary }) {
  const parseSummary = (text) => {
    if (!text) return [];
    return text.split('\n').filter(line => line.trim().length > 0);
  };

  const analysisLines = parseSummary(summary);
  const cleanRisk = risk ? risk.toString().trim().toUpperCase() : 'UNKNOWN';

  return (
    <div className="bg-[#161b2a] border border-gray-800 rounded-xl h-full flex flex-col overflow-hidden relative">
      {/* HEADER: Added z-10 and background to cover scrolling text */}
      <div className="p-6 pb-2 bg-[#161b2a] border-b border-gray-800 z-10 sticky top-0 shrink-0">
        <h3 className="text-xl font-bold">AI Analysis</h3>
      </div>
      
      {/* SCROLLABLE CONTENT */}
      <div className="p-6 pt-4 overflow-y-auto custom-scrollbar flex-1">
        <div className="space-y-6">
          <section>
            <h4 className="text-gray-400 font-medium mb-2 flex items-center gap-2">
              <ListFilter size={18} className="text-blue-400" /> Executive Summary:
            </h4>
            <div className="bg-[#1c2333] p-3 rounded-lg border border-gray-700/50">
               <ul className="ml-2 space-y-1">
                  <li className="text-sm">Financial Score: <span className="text-green-400 font-mono font-bold">{score} / 100</span></li>
                  <li className="text-sm">Risk Level: <span className={`font-mono font-bold ${cleanRisk === 'LOW' ? 'text-green-400' : cleanRisk === 'MEDIUM' ? 'text-yellow-400' : 'text-red-400'}`}>{cleanRisk}</span></li>
              </ul>
            </div>
          </section>

          <section>
            <h4 className="text-gray-400 font-medium mb-3">Key Observations & Recommendations:</h4>
            <ul className="space-y-3">
              {analysisLines.length > 0 ? (
                analysisLines.map((line, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2 break-words whitespace-normal leading-relaxed">
                    <span className="text-blue-500 mt-1.5 shrink-0 text-xs">●</span>
                    <span>{line.replace(/^[-*•]\s+/, '')}</span>
                  </li>
                ))
              ) : (
                 <li className="text-sm text-gray-500 italic">No analysis generated.</li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}