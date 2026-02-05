import React, { useState } from 'react';
import axios from 'axios';
import { Download, Loader2 } from 'lucide-react';

export default function DownloadButton({ file, fileName }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!file) return;

    setDownloading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/report', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob', // IMPORTANT: This tells axios to treat the response as binary data
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Set the filename
      link.setAttribute('download', `${fileName || 'Report'}_Financial_Health.pdf`);
      
      // Trigger download and cleanup
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download failed", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={downloading}
      className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {downloading ? (
        <>
          <Loader2 className="animate-spin" size={20} /> Generating PDF...
        </>
      ) : (
        <>
          <Download size={20} /> Download AI Report (PDF)
        </>
      )}
    </button>
  );
}