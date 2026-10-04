import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center w-14 h-7 p-0.5 rounded-full transition-colors duration-300 focus:outline-none ${
        isDark ? 'bg-slate-800 border border-emerald-500/30' : 'bg-slate-200 border border-slate-300'
      } ${className}`}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow-md transform transition-transform duration-300 ease-in-out ${
          isDark ? 'translate-x-7 text-amber-400' : 'translate-x-0 text-slate-700'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        )}
      </span>
    </button>
  );
}
