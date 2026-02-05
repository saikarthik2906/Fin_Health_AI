import React, { useState } from 'react';

export default function FileUpload({ onUpload, loading, compact }) {
  const [file, setFile] = useState(null);

  return (
    <div className={`flex items-center gap-3 w-full ${compact ? '' : 'p-4 bg-[#161b2a] border border-gray-800 rounded-xl'}`}>
      <div className={`flex items-center gap-2 bg-[#0f111a] border border-gray-700 rounded-lg px-3 py-1.5 w-full ${compact ? 'h-10' : ''}`}>
        <label className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium cursor-pointer transition whitespace-nowrap">
          Choose file
          <input 
            type="file" 
            className="hidden" 
            accept=".xlsx,.pdf" 
            onChange={(e) => setFile(e.target.files[0])} 
          />
        </label>
        <span className="text-gray-400 text-xs truncate max-w-[200px]">
          {file ? file.name : "No file selected"}
        </span>
      </div>
      
      <button 
        onClick={() => file && onUpload(file)}
        disabled={loading || !file}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition disabled:opacity-50 whitespace-nowrap h-10"
      >
        {loading ? "..." : "Analyze"}
      </button>
    </div>
  );
}