"use client";

import React from 'react';

export const ResponsiveTest: React.FC = () => {
  return (
    <div className="debug-mobile">
      <div className="text-foreground/70">
        <div className="md:hidden">XS (mobile)</div>
        <div className="hidden md:block lg:hidden">MD (tablet)</div>
        <div className="hidden lg:block xl:hidden">LG (laptop)</div>
        <div className="hidden xl:block">XL (desktop)</div>
      </div>
    </div>
  );
};