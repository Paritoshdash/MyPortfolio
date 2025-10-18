"use client";

import { AnimatedThemeToggler } from "./AnimatedThemeToggler";

export const ThemeSwitcher = () => {
  return (
    <AnimatedThemeToggler
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-yellow-400 dark:hover:text-yellow-400 bg-gray-200 dark:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    />
  );
};