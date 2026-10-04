import React from 'react';
import { motion } from 'framer-motion';

export default function GlobeIllustration({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer Atmospheric Glow Halo */}
      <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-gradient-to-tr from-emerald-400/30 via-teal-400/20 to-sky-400/35 blur-3xl pointer-events-none animate-pulse-slow"></div>

      {/* Floating Foliage / Leaves Orbiting */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full overflow-visible drop-shadow-2xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Earth Sphere Gradient */}
            <radialGradient id="earthSphere" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="25%" stopColor="#BAE6FD" />
              <stop offset="60%" stopColor="#38BDF8" />
              <stop offset="85%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </radialGradient>

            {/* Atmosphere Rim Highlight */}
            <radialGradient id="atmosphereGlow" cx="50%" cy="50%" r="50%">
              <stop offset="80%" stopColor="transparent" />
              <stop offset="95%" stopColor="rgba(56, 189, 248, 0.6)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.9)" />
            </radialGradient>

            {/* Specular Highlight */}
            <linearGradient id="specularGlow" x1="0%" y1="0%" x2="70%" y2="70%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
              <stop offset="40%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>

            {/* Continents Pattern Gradient */}
            <linearGradient id="continentFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Outer Orbit Leaves & Vines */}
          <g className="text-emerald-500 dark:text-emerald-400">
            {/* Left Branch */}
            <motion.path
              d="M 60 220 C 50 180, 80 140, 110 110 C 130 90, 150 70, 180 60"
              stroke="#34D399"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            {/* Leaf 1 */}
            <path
              d="M 65 200 C 45 190, 45 170, 65 160 C 85 170, 85 190, 65 200 Z"
              fill="url(#continentFill)"
              opacity="0.85"
            />
            {/* Leaf 2 */}
            <path
              d="M 90 145 C 75 130, 80 110, 100 115 C 110 130, 105 145, 90 145 Z"
              fill="url(#continentFill)"
              opacity="0.9"
            />
            {/* Leaf 3 */}
            <path
              d="M 140 85 C 130 65, 150 55, 165 70 C 160 85, 145 95, 140 85 Z"
              fill="url(#continentFill)"
              opacity="0.95"
            />

            {/* Right Branch */}
            <motion.path
              d="M 330 180 C 350 140, 330 90, 290 70"
              stroke="#34D399"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 325 150 C 345 140, 345 120, 325 110 C 305 120, 305 140, 325 150 Z"
              fill="url(#continentFill)"
              opacity="0.85"
            />
            <path
              d="M 300 95 C 315 80, 310 60, 290 65 C 280 80, 285 95, 300 95 Z"
              fill="url(#continentFill)"
              opacity="0.9"
            />
          </g>

          {/* 2. Main Glass Earth Globe Base */}
          <circle cx="200" cy="200" r="120" fill="url(#earthSphere)" filter="url(#softGlow)" />

          {/* 3. Continents Vector Overlay */}
          <g clipPath="url(#globeClip)">
            <clipPath id="globeClip">
              <circle cx="200" cy="200" r="120" />
            </clipPath>

            {/* Landmass 1: Eurasia / Africa */}
            <path
              d="M 140 130 Q 170 110 200 120 Q 230 130 250 160 Q 240 200 210 210 Q 180 220 170 260 Q 150 250 140 220 Q 120 180 140 130 Z"
              fill="url(#continentFill)"
              opacity="0.92"
            />

            {/* Landmass 2: Americas */}
            <path
              d="M 230 100 Q 260 90 280 120 Q 290 150 270 180 Q 250 190 240 160 Q 230 130 230 100 Z"
              fill="url(#continentFill)"
              opacity="0.88"
            />

            {/* Landmass 3: Southern / Asia */}
            <path
              d="M 160 230 Q 190 220 220 250 Q 230 280 200 290 Q 170 280 160 230 Z"
              fill="url(#continentFill)"
              opacity="0.85"
            />

            {/* Cloud swirls */}
            <path
              d="M 100 170 C 130 160, 170 175, 200 165 C 240 155, 270 180, 310 170"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 120 230 C 160 220, 200 240, 250 225 C 270 220, 290 235, 310 230"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* 4. Atmospheric Rim & Specular Glass Reflection */}
          <circle cx="200" cy="200" r="120" fill="url(#atmosphereGlow)" />
          <ellipse cx="160" cy="140" rx="70" ry="45" fill="url(#specularGlow)" transform="rotate(-25 160 140)" />

          {/* 5. Sparkle Star Elements */}
          <g fill="#38BDF8">
            <circle cx="90" cy="70" r="2.5" className="animate-ping" opacity="0.75" />
            <circle cx="320" cy="280" r="3" className="animate-ping" opacity="0.6" />
            <circle cx="70" cy="270" r="2" opacity="0.8" />
            <circle cx="330" cy="60" r="2.5" opacity="0.9" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
