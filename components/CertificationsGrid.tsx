import React from 'react';
import Link from 'next/link';
import { certifications } from '@/lib/certificationsData';

export const CertificationsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {certifications.map((cert) => (
        <div key={cert.id} className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/50 hover:border-blue-500 transition-all">
          <h3 className="text-xl font-bold text-white">{cert.title}</h3>
          <p className="text-zinc-400 mb-4">{cert.issuer} • {cert.date}</p>
          <Link 
            href={`/certifications/${cert.id}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View Certificate
          </Link>
        </div>
      ))}
    </div>
  );
};