import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import ScoreCard from './components/ScoreCard';
import AIAnalysis from './components/AIAnalysis';
import BarChartComponent from './components/BarChart';
import DownloadButton from './components/DownloadButton';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    setCurrentFile(file);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setData(response.data);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Backend error. Ensure port 8000 is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0f111a] text-white overflow-hidden flex flex-col font-sans">
      {/* Top Navigation Bar: Title + Upload in one row */}
      <header className="h-16 border-b border-gray-800 bg-[#161b2a] flex items-center justify-between px-8 shadow-md shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
          <h1 className="text-lg font-bold tracking-wide">SME Financial Health AI</h1>
        </div>
        
        {/* File Upload moves here to save space */}
        <div className="w-1/2 max-w-xl">
            <FileUpload onUpload={handleUpload} loading={loading} compact={true} />
        </div>
      </header>

      {/* Main Content - Flex Grow to fill remaining height */}
      <main className="flex-1 p-6 overflow-hidden">
        {data ? (
          <div className="h-full grid grid-cols-12 grid-rows-6 gap-6 max-w-[1600px] mx-auto">
            
            {/* 1. Score Card - Spans full width, but short height (Row 1-2) */}
            <div className="col-span-12 row-span-2">
               <ScoreCard 
                 name={data.business_name} 
                 score={data.financial_score} 
                 risk={data.risk_level} 
               />
            </div>
            
            {/* 2. AI Analysis - Left Side (Row 3-6) */}
            <div className="col-span-7 row-span-4 h-full">
              <AIAnalysis 
                score={data.financial_score} 
                risk={data.risk_level} 
                summary={data.ai_analysis} 
              />
            </div>

            {/* 3. Charts & Actions - Right Side (Row 3-6) */}
            <div className="col-span-5 row-span-4 flex flex-col gap-4 h-full">
               {/* Chart Container */}
               <div className="bg-[#161b2a] border border-gray-800 rounded-xl p-5 flex-1 relative flex flex-col justify-center">
                  <BarChartComponent metrics={data.metrics} />
               </div>
               
               {/* Download Button Container */}
               <div className="bg-[#161b2a] border border-gray-800 rounded-xl p-4 flex justify-center items-center shrink-0">
                  <DownloadButton file={currentFile} fileName={data.business_name} />
               </div>
            </div>

          </div>
        ) : (
          /* Empty State */
          <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
            <p>Upload a financial document to generate dashboard</p>
          </div>
        )}
      </main>
      
      {/* Footer - Tiny strip */}
      <footer className="h-8 border-t border-gray-800 flex items-center justify-center text-xs text-gray-600 shrink-0">
        © SME Financial Health AI
      </footer>
    </div>
  );
}

export default App;