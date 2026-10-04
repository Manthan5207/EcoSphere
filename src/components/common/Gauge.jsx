import React from 'react';
import { motion } from 'framer-motion';

export default function Gauge({ 
  value = 0, 
  max = 400, 
  label = 'Air Quality Index',
  category = 'Moderate',
  color = '#EAB308',
  size = 280,
  showTicks = true 
}) {
  // Semicircle gauge: angle from -180 deg to 0 deg
  const clampedVal = Math.min(Math.max(0, value), max);
  const percentage = clampedVal / max;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = Math.PI * radius; // half circle circumference

  // Stroke Dashoffset for semicircle
  const strokeDashoffset = circumference * (1 - percentage);

  // Rotation angle for needle (-90deg to +90deg)
  const needleAngle = -90 + percentage * 180;

  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: size }}>
      <svg 
        width={size} 
        height={size / 2 + 30} 
        viewBox={`0 0 ${size} ${size / 2 + 30}`}
        className="overflow-visible"
      >
        <defs>
          {/* Multi-stop AQI Gradient */}
          <linearGradient id="aqiArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22C55E" />    {/* Good */}
            <stop offset="25%" stopColor="#EAB308" />   {/* Moderate */}
            <stop offset="45%" stopColor="#F97316" />   {/* Sensitive */}
            <stop offset="65%" stopColor="#EF4444" />   {/* Unhealthy */}
            <stop offset="85%" stopColor="#A855F7" />   {/* Very Unhealthy */}
            <stop offset="100%" stopColor="#7F1D1D" />  {/* Hazardous */}
          </linearGradient>

          <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track Arc */}
        <path
          d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
          fill="none"
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-800"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Animated Progress Gradient Arc */}
        <motion.path
          d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
          fill="none"
          stroke="url(#aqiArcGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          filter="url(#gaugeGlow)"
        />

        {/* Center Needle & Pivot */}
        <g transform={`translate(${center}, ${center})`}>
          {/* Animated Needle */}
          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2={-(radius - 12)}
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ rotate: -90 }}
            animate={{ rotate: needleAngle }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{ originX: '0px', originY: '0px' }}
          />
          {/* Center Knob */}
          <circle cx="0" cy="0" r="9" className="fill-slate-900 dark:fill-white" />
          <circle cx="0" cy="0" r="4" fill={color} />
        </g>

        {/* Scale Min/Max labels */}
        {showTicks && (
          <>
            <text x="12" y={center + 20} className="text-[11px] font-bold fill-slate-400">0</text>
            <text x={size / 2 - 10} y="22" className="text-[11px] font-bold fill-slate-400">200</text>
            <text x={size - 30} y={center + 20} className="text-[11px] font-bold fill-slate-400">{max}+</text>
          </>
        )}
      </svg>

      {/* Numerical AQI Value & Status Text Inside Gauge Curve */}
      <div className="-mt-8 text-center flex flex-col items-center">
        <motion.span 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl font-heading font-black tracking-tight"
          style={{ color }}
        >
          {Math.round(value)}
        </motion.span>
        <span 
          className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm"
          style={{ backgroundColor: color }}
        >
          {category}
        </span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
          {label} (US EPA)
        </span>
      </div>
    </div>
  );
}
