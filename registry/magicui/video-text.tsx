"use client";

import React, { useRef, useEffect } from "react";

interface VideoTextProps {
  src: string;
  children: React.ReactNode;
  className?: string;
}

export const VideoText = ({ 
  src, 
  children, 
  className = "",
  ...props 
}: VideoTextProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultPlaybackRate = 0.5;
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} {...props}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.9] tracking-tight text-white">
          {children}
        </h1>
      </div>
    </div>
  );
};