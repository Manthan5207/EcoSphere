import React from 'react';
import { motion } from 'framer-motion';

export function ProgressRing({ 
  value = 0, 
  max = 100, 
  size = 140, 
  strokeWidth = 12,
  color = '#10B981',
  trackColor = 'currentColor',
  children
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(0, value), max);
  const strokeDashoffset = circumference - (clamped / max) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={trackColor}
          className="text-slate-200 dark:text-slate-800"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children || (
          <span className="text-3xl font-heading font-extrabold text-slate-800 dark:text-white">
            {Math.round(value)}
          </span>
        )}
      </div>
    </div>
  );
}

export function SkeletonLoader({ className = '', variant = 'rect' }) {
  if (variant === 'circle') {
    return <div className={`rounded-full bg-slate-200 dark:bg-slate-800/80 animate-pulse ${className}`} />;
  }
  return <div className={`rounded-xl bg-slate-200 dark:bg-slate-800/80 animate-pulse ${className}`} />;
}
