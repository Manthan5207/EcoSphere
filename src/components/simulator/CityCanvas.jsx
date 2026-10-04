import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CityCanvas({ 
  activeScenarios = [], 
  intensity = 1.0, 
  timeMultiplier = 1.0 
}) {
  const hasNoTrees = activeScenarios.includes('noTrees');
  const hasNoVehicles = activeScenarios.includes('noVehicles');
  const hasNoFactories = activeScenarios.includes('noFactories');
  const isAllElectric = activeScenarios.includes('allElectric');
  const hasTenXTrees = activeScenarios.includes('tenXTrees');
  const hasDrought = activeScenarios.includes('noRain');

  // Compute environmental visuals
  const smogOpacity = Math.max(
    0.05,
    (hasNoTrees ? 0.45 : 0.2) + 
    (hasDrought ? 0.35 : 0) - 
    (hasNoVehicles ? 0.15 : 0) - 
    (hasNoFactories ? 0.2 : 0) - 
    (hasTenXTrees ? 0.15 : 0)
  ) * intensity;

  const skyGradient = hasDrought || (hasNoTrees && !hasNoVehicles)
    ? 'url(#droughtSky)'
    : hasTenXTrees || (hasNoVehicles && hasNoFactories)
    ? 'url(#cleanSky)'
    : 'url(#defaultSky)';

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[460px] rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/20 bg-slate-950 select-none">
      <svg 
        viewBox="0 0 1000 480" 
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Default Urban Sky */}
          <linearGradient id="defaultSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#f0fdf4" />
          </linearGradient>

          {/* Clean Emerald Sky */}
          <linearGradient id="cleanSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#dcfce7" />
          </linearGradient>

          {/* Drought / Smog Sky */}
          <linearGradient id="droughtSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="40%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>

          {/* Building Gradient */}
          <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="buildingGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
          </linearGradient>

          {/* Grass Lush Gradient */}
          <linearGradient id="lushGrass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Drought Parched Soil */}
          <linearGradient id="parchedSoil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>

        {/* 1. Dynamic Animated Sky Background */}
        <motion.rect
          x="0"
          y="0"
          width="1000"
          height="480"
          fill={skyGradient}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* 2. Sun or Heatwave Sun */}
        <motion.g
          animate={{ 
            y: hasDrought ? [0, -5, 0] : [0, 2, 0],
            scale: hasDrought ? 1.25 : 1
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle
            cx="820"
            cy="110"
            r={hasDrought ? "54" : "44"}
            fill={hasDrought ? "#f97316" : "#fbbf24"}
            className="filter drop-shadow-[0_0_35px_rgba(251,191,36,0.8)]"
          />
          {hasDrought && (
            <circle
              cx="820"
              cy="110"
              r="70"
              fill="none"
              stroke="#ea580c"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-spin"
              style={{ transformOrigin: '820px 110px', animationDuration: '20s' }}
            />
          )}
        </motion.g>

        {/* 3. Drifting Clouds (Fade out in extreme drought) */}
        {!hasDrought && (
          <g opacity="0.85">
            <motion.path
              d="M 120 90 Q 140 70 170 80 Q 200 65 230 85 Q 260 90 250 110 L 120 110 Z"
              fill="#ffffff"
              animate={{ x: [0, 60, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M 520 70 Q 540 50 570 60 Q 600 45 630 65 Q 660 70 650 90 L 520 90 Z"
              fill="#ffffff"
              opacity="0.7"
              animate={{ x: [0, -50, 0] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        )}

        {/* 4. Distant City Skyline & Mountains */}
        <path
          d="M 0 320 L 60 260 L 140 320 L 220 280 L 310 320 L 420 270 L 550 320 L 700 250 L 850 320 L 1000 270 L 1000 380 L 0 380 Z"
          fill="#64748b"
          opacity="0.3"
        />

        {/* 5. Industrial Factory Zone & Chimneys (Left) */}
        <g id="factories" opacity={hasNoFactories ? 0.35 : 1}>
          {/* Factory Buildings */}
          <rect x="50" y="240" width="110" height="120" fill="#334155" rx="3" />
          <polygon points="50,240 75,220 105,240 135,220 160,240" fill="#1e293b" />
          {/* Chimneys */}
          <rect x="70" y="160" width="16" height="80" fill="#475569" />
          <rect x="120" y="140" width="18" height="100" fill="#475569" />

          {/* Factory Smoke Plumes (Animated unless noFactories) */}
          <AnimatePresence>
            {!hasNoFactories && (
              <g>
                <motion.circle
                  cx="78"
                  cy="150"
                  r="12"
                  fill="#94a3b8"
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: [0.7, 0], y: [-10, -70], x: [0, 40], scale: [1, 3] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.circle
                  cx="129"
                  cy="130"
                  r="16"
                  fill="#64748b"
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: [0.8, 0], y: [-10, -90], x: [0, 55], scale: [1, 3.5] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                />
              </g>
            )}
          </AnimatePresence>
        </g>

        {/* 6. Modern Urban Buildings & Skyscrapers */}
        <g id="city-skyline">
          {/* Tower 1 */}
          <rect x="200" y="180" width="80" height="180" fill="url(#buildingGrad)" rx="4" />
          <rect x="210" y="195" width="60" height="150" fill="url(#buildingGlass)" rx="2" />
          
          {/* Tower 2 (Center High Rise) */}
          <rect x="300" y="120" width="105" height="240" fill="#0f172a" rx="6" />
          {/* Solar Panels on Roof if electric or clean */}
          {(isAllElectric || hasTenXTrees) && (
            <rect x="310" y="112" width="85" height="8" fill="#38bdf8" rx="2" className="animate-pulse" />
          )}
          {/* Window Grid */}
          <g fill="#fef08a" opacity="0.75">
            <rect x="315" y="140" width="12" height="16" rx="1" />
            <rect x="345" y="140" width="12" height="16" rx="1" />
            <rect x="375" y="140" width="12" height="16" rx="1" />
            <rect x="315" y="175" width="12" height="16" rx="1" />
            <rect x="345" y="175" width="12" height="16" rx="1" />
            <rect x="375" y="175" width="12" height="16" rx="1" />
            <rect x="315" y="210" width="12" height="16" rx="1" />
            <rect x="345" y="210" width="12" height="16" rx="1" />
            <rect x="375" y="210" width="12" height="16" rx="1" />
          </g>

          {/* Tower 3 */}
          <rect x="430" y="160" width="90" height="200" fill="url(#buildingGrad)" rx="4" />
          <polygon points="430,160 475,120 520,160" fill="#0369a1" />

          {/* Tower 4 */}
          <rect x="540" y="200" width="75" height="160" fill="#1e293b" rx="4" />
          <rect x="550" y="215" width="55" height="130" fill="url(#buildingGlass)" rx="2" />
        </g>

        {/* 7. Urban Forest / 10x Trees Layer */}
        {hasTenXTrees && (
          <g id="tenXForest" className="transition-all duration-700">
            {/* Rooftop Gardens */}
            <rect x="200" y="172" width="80" height="8" fill="#22C55E" rx="3" />
            <rect x="430" y="152" width="90" height="8" fill="#22C55E" rx="3" />
            {/* Canopy Clusters */}
            <circle cx="285" cy="270" r="35" fill="#16a34a" />
            <circle cx="530" cy="280" r="38" fill="#22c55e" />
            <circle cx="635" cy="290" r="34" fill="#15803d" />
            <circle cx="890" cy="285" r="42" fill="#16a34a" />
          </g>
        )}

        {/* 8. Ground & Green Verges */}
        <rect
          x="0"
          y="350"
          width="1000"
          height="130"
          fill={hasDrought ? 'url(#parchedSoil)' : 'url(#lushGrass)'}
          className="transition-colors duration-700"
        />

        {/* 9. Asphalt Roadway */}
        <polygon points="0,400 1000,400 1000,480 0,480" fill="#334155" />
        {/* Road Markings */}
        <line x1="50" y1="440" x2="150" y2="440" stroke="#fef08a" strokeWidth="4" strokeDasharray="30 20" />
        <line x1="250" y1="440" x2="400" y2="440" stroke="#fef08a" strokeWidth="4" strokeDasharray="30 20" />
        <line x1="500" y1="440" x2="650" y2="440" stroke="#fef08a" strokeWidth="4" strokeDasharray="30 20" />
        <line x1="750" y1="440" x2="950" y2="440" stroke="#fef08a" strokeWidth="4" strokeDasharray="30 20" />

        {/* 10. Normal Urban Trees (Unless noTrees is active) */}
        <g id="urbanTrees">
          {!hasNoTrees ? (
            <g className="transition-all duration-700">
              {/* Tree 1 */}
              <rect x="175" y="320" width="10" height="40" fill="#78350f" rx="2" />
              <circle cx="180" cy="310" r="28" fill="#16a34a" />
              <circle cx="180" cy="300" r="20" fill="#22c55e" />

              {/* Tree 2 */}
              <rect x="635" y="325" width="12" height="40" fill="#78350f" rx="2" />
              <circle cx="641" cy="315" r="30" fill="#15803d" />
              <circle cx="641" cy="305" r="22" fill="#22c55e" />

              {/* Tree 3 */}
              <rect x="850" y="320" width="14" height="45" fill="#78350f" rx="2" />
              <circle cx="857" cy="305" r="34" fill="#16a34a" />
              <circle cx="857" cy="295" r="24" fill="#4ade80" />
            </g>
          ) : (
            /* Barren Deforested Stumps */
            <g className="transition-all duration-700">
              <rect x="178" y="345" width="8" height="15" fill="#573a1e" rx="1" />
              <line x1="174" y1="345" x2="190" y2="345" stroke="#573a1e" strokeWidth="3" />

              <rect x="638" y="345" width="8" height="15" fill="#573a1e" rx="1" />
              <line x1="634" y1="345" x2="650" y2="345" stroke="#573a1e" strokeWidth="3" />

              <rect x="854" y="342" width="10" height="18" fill="#573a1e" rx="1" />
              <line x1="849" y1="342" x2="869" y2="342" stroke="#573a1e" strokeWidth="3" />
            </g>
          )}
        </g>

        {/* 11. Vehicles Layer (Combustion vs Electric vs No Vehicles) */}
        <AnimatePresence>
          {!hasNoVehicles && (
            <g id="vehicles">
              {/* Car 1 (Right to Left Motion) */}
              <motion.g
                initial={{ x: 1050 }}
                animate={{ x: -200 }}
                transition={{ duration: isAllElectric ? 7 : 9, repeat: Infinity, ease: 'linear' }}
              >
                {/* Car Body */}
                <rect 
                  x="0" 
                  y="415" 
                  width="70" 
                  height="22" 
                  fill={isAllElectric ? "#10B981" : "#ef4444"} 
                  rx="6" 
                />
                <polygon 
                  points="15,415 25,404 52,404 60,415" 
                  fill={isAllElectric ? "#6ee7b7" : "#cbd5e1"} 
                />
                {/* Wheels */}
                <circle cx="18" cy="437" r="7" fill="#0f172a" />
                <circle cx="54" cy="437" r="7" fill="#0f172a" />
                {/* Glow for EV */}
                {isAllElectric && (
                  <circle cx="68" cy="424" r="3" fill="#38bdf8" className="animate-ping" />
                )}
                {/* Exhaust Smoke for Combustion */}
                {!isAllElectric && (
                  <motion.circle
                    cx="72"
                    cy="432"
                    r="4"
                    fill="#94a3b8"
                    animate={{ opacity: [0.8, 0], scale: [1, 2.5], x: [0, 15] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </motion.g>

              {/* Car 2 (Left to Right Bus/Car) */}
              <motion.g
                initial={{ x: -150 }}
                animate={{ x: 1100 }}
                transition={{ duration: 11, repeat: Infinity, ease: 'linear', delay: 2 }}
              >
                {/* Bus Body */}
                <rect 
                  x="0" 
                  y="442" 
                  width="110" 
                  height="28" 
                  fill={isAllElectric ? "#0284c7" : "#f59e0b"} 
                  rx="5" 
                />
                {/* Bus Windows */}
                <rect x="10" y="446" width="16" height="12" fill="#e2e8f0" rx="2" />
                <rect x="32" y="446" width="16" height="12" fill="#e2e8f0" rx="2" />
                <rect x="54" y="446" width="16" height="12" fill="#e2e8f0" rx="2" />
                <rect x="76" y="446" width="16" height="12" fill="#e2e8f0" rx="2" />
                {/* Wheels */}
                <circle cx="25" cy="470" r="8" fill="#0f172a" />
                <circle cx="88" cy="470" r="8" fill="#0f172a" />
              </motion.g>
            </g>
          )}
        </AnimatePresence>

        {/* 12. Biodiversity Birds (Visible if biodiversity > baseline or 10x trees) */}
        {(hasTenXTrees || (hasNoVehicles && !hasNoTrees)) && (
          <g id="birds">
            <motion.path
              d="M 0 0 Q 6 -6 12 0 Q 18 -6 24 0"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                x: [250, 450, 650],
                y: [120, 90, 130],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M 0 0 Q 5 -5 10 0 Q 15 -5 20 0"
              fill="none"
              stroke="#0f172a"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{
                x: [280, 480, 680],
                y: [140, 110, 150],
              }}
              transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
          </g>
        )}

        {/* 13. Dynamic Smog & Atmospheric Mist Overlay */}
        <rect
          x="0"
          y="0"
          width="1000"
          height="480"
          fill={hasDrought ? '#7c2d12' : '#64748b'}
          opacity={smogOpacity}
          className="pointer-events-none transition-opacity duration-1000"
        />

        {/* 14. Heat Shimmer Visual Effect in Deforestation / Drought */}
        {(hasNoTrees || hasDrought) && (
          <foreignObject x="0" y="0" width="1000" height="480" className="pointer-events-none">
            <div className="w-full h-full animate-shimmer-heat bg-gradient-to-t from-orange-500/15 via-amber-500/10 to-transparent"></div>
          </foreignObject>
        )}
      </svg>

      {/* Floating State Badges in Canvas Corner */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-lg">
          Live Physics Engine
        </span>
        {activeScenarios.length > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 shadow-glow-emerald">
            {activeScenarios.length} Active {activeScenarios.length === 1 ? 'Scenario' : 'Scenarios'}
          </span>
        )}
      </div>
    </div>
  );
}
