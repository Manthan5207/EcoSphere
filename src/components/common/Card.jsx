import React from 'react';

export function Card({ children, className = '', hover = true, glass = true, ...props }) {
  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${
        glass ? 'glass-card' : 'bg-white dark:bg-[#12201A] border border-emerald-500/10'
      } ${
        hover ? 'hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-glow-emerald/10 hover:border-emerald-500/30' : ''
      } p-5 sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'default', className = '', ...props }) {
  const variants = {
    default: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    primary: 'bg-emerald-600 text-white shadow-sm',
    accent: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    subtle: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export function Tooltip({ text, children, position = 'top' }) {
  const [visible, setVisible] = React.useState(false);

  const posClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div 
          role="tooltip"
          className={`absolute z-50 pointer-events-none w-max max-w-xs px-3 py-1.5 text-xs font-medium text-white bg-slate-900/95 dark:bg-slate-950/95 border border-emerald-500/30 rounded-xl shadow-xl backdrop-blur-md transition-all duration-200 animate-in fade-in zoom-in-95 ${posClasses[position]}`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
