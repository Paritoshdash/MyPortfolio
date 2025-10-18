"use client";

import React from 'react';

const ThemeDemo = () => {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Theme Color Palette</h2>
      
      {/* Primary Color Examples */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Primary Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary text-primary-foreground p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-2">Primary</h4>
            <p>Used for main actions and highlights</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary-foreground"></div>
              <span className="text-sm">Primary Foreground</span>
            </div>
          </div>
          
          <div className="bg-secondary text-secondary-foreground p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-2">Secondary</h4>
            <p>Used for secondary actions</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-secondary-foreground"></div>
              <span className="text-sm">Secondary Foreground</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Accent and Muted Colors */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Additional Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-accent text-accent-foreground p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-2">Accent</h4>
            <p>Used for special highlights</p>
          </div>
          
          <div className="bg-muted text-muted-foreground p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-2">Muted</h4>
            <p>Used for subtle backgrounds</p>
          </div>
          
          <div className="bg-card text-card-foreground border border-border p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-2">Card</h4>
            <p>Used for content containers</p>
          </div>
        </div>
      </div>
      
      {/* Background and Foreground Examples */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Background & Text Colors</h3>
        <div className="space-y-4">
          <div className="bg-background text-foreground p-6 rounded-lg border border-border">
            <h4 className="font-bold text-lg mb-2">Background & Foreground</h4>
            <p>This shows the default background and text colors that automatically switch between light and dark modes.</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-foreground"></div>
              <span className="text-sm">Foreground</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-background border border-border"></div>
              <span className="text-sm">Background</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo;