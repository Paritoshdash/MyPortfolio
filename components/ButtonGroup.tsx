"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      {children}
    </div>
  );
};