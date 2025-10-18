"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/Button';
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button';

interface MobileMenuProps {
  items: { name: string; href: string }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="p-2"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg z-50">
          <div className="flex flex-col py-4">
            {items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-6 py-3 text-base font-medium text-card-foreground hover:text-primary hover:bg-card/50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-6 py-3">
              <InteractiveHoverButton
                href="/Paritosh Dash copy.pdf"
                className="w-full justify-center text-sm"
              >
                View Resume
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};