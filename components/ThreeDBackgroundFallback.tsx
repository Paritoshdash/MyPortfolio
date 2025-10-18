"use client";

import React from 'react';

export const ThreeDBackgroundFallback: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-cyan-50/20 dark:from-blue-900/10 dark:via-purple-900/5 dark:to-cyan-900/10"></div>
      
      {/* Floating shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-tr from-primary/5 to-primary/10 rounded-full blur-3xl animate-float-medium"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-primary/8 to-primary/12 rounded-full blur-3xl animate-float-slow"></div>
      
      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(30deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor),
              linear-gradient(150deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor),
              linear-gradient(30deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor),
              linear-gradient(150deg, currentColor 12%, transparent 12.5%, transparent 87%, currentColor 87.5%, currentColor),
              linear-gradient(60deg, transparent 25%, currentColor 25.5%, currentColor 75%, transparent 75%, transparent)
            `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0'
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.1); }
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};