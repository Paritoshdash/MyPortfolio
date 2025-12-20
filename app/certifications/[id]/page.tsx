"use client";

import { certifications } from '@/lib/certificationsData';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';

export default function CertificateViewer() {
  const params = useParams();
  const cert = certifications.find((c) => c.id === params.id);

  if (!cert) {
    return notFound();
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Navigation Bar */}
      <div className="p-4 flex justify-between items-center border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md z-50">
        <div>
          <h1 className="text-lg font-bold text-primary">{cert.title}</h1>
          <p className="text-xs text-zinc-400">{cert.issuer}</p>
        </div>
        <div className="flex gap-4">
          <a 
            href={cert.pdfUrl} 
            download 
            className="hidden md:block px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-all"
          >
            Download
          </a>
          <Link 
            href="/main" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-all"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
      
      {/* PDF Viewer */}
      <div className="flex-grow w-full h-full bg-zinc-900 relative">
        <iframe
          src={`${cert.pdfUrl}#toolbar=1`}
          className="w-full h-full border-none"
          title={cert.title}
        />
        
        {/* Mobile Fallback Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden">
          <p className="text-[10px] bg-black/60 px-3 py-1 rounded-full text-zinc-400">
            Pinch to zoom • Tap top right to download
          </p>
        </div>
      </div>
    </div>
  );
}