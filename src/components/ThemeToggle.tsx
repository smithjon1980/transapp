import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../utils/ThemeContext';
import { cn } from '../utils/cn';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-lg transition-colors duration-200",
        "hover:bg-tan-100 dark:hover:bg-navy-800",
        "text-navy-600 dark:text-tan-100"
      )}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}