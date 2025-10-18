"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
}

interface TypingAnimationProps {
  children: string;
  className?: string;
  delay?: number;
}

interface AnimatedSpanProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Terminal: React.FC<TerminalProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-card text-card-foreground font-mono text-sm p-6 rounded-lg shadow-2xl border border-border ${className}`}>
      <div className="flex space-x-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};

export const TypingAnimation: React.FC<TypingAnimationProps> = ({ 
  children, 
  className = "",
  delay = 0 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const textRef = useRef(children);
  
  useEffect(() => {
    textRef.current = children;
  }, [children]);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        startTyping();
      }, delay);
      return () => clearTimeout(timer);
    } else {
      startTyping();
    }
  }, [delay]);

  const startTyping = () => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= textRef.current.length) {
        setDisplayText(textRef.current.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 30);
  };

  return (
    <motion.div 
      className={`flex items-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          className="ml-1 w-2 h-5 bg-primary"
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      )}
    </motion.div>
  );
};

export const AnimatedSpan: React.FC<AnimatedSpanProps> = ({ 
  children, 
  className = "",
  delay = 0 
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};