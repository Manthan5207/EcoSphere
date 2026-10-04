import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { fetchLiveEnvironmentalData } from '../api/openMeteo';
import { calculateSimulatedMetrics, TIME_HORIZONS, SCENARIOS } from '../data/scenarios';
import CityCanvas from '../components/simulator/CityCanvas';
import ImpactMetrics from '../components/simulator/ImpactMetrics';
import WhyExplainer from '../components/simulator/WhyExplainer';
import { Sliders, Sparkles, MapPin, RotateCcw, Clock } from 'lucide-react';
import { useLeaderboardStore } from '../store/useLeaderboardStore';
import { useToast } from '../components/common/Toast';

export default function WhatIf() {
  const { location, unlockBadge } = useStore();
  const { addPoints } = useLeaderboardStore();
  const { addToast } = useToast();
  const [activeScenarios, setActiveScenarios] = useState(['noVehicles', 'tenXTrees']);
  const [intensity, setIntensity] = useState(1.0);
  const [timeHorizon, setTimeHorizon] = useState('now');
  const [baselineData, setBaselineData] = useState({ temp: 31, aqi: 178, pm25: 82 });

  useEffect(() => {
    fetchLiveEnvironmentalData(location.lat, location.lon, location.name).then(res => {
      if (res) {
        setBaselineData({
          temp: res.weather?.temperature || 31,
          aqi: res.airQuality?.aqi || 178,
          pm25: res.airQuality?.pollutants?.pm2_5?.value || 82,
        });
      }
    });
  }, [location]);

  const handleToggleScenario = (id) => {
    setActiveScenarios(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(s => s !== id) : [...prev, id];
      if (next.length >= 3) {
        unlockBadge('simulator-pro');
      }
      if (!exists) {
        const res = addPoints('simulation', `sim-${id}`, 5, 'overall', 'Climate Simulation');
        if (res?.success) {
          addToast({ message: `+${res.pointsEarned} Eco Points for running simulation! 🧪`, type: 'success' });
        }
      }
      return next;
    });
  };

  const handleReset = () => {
    setActiveScenarios([]);
    setIntensity(1.0);
    setTimeHorizon('now');
  };

  const timeMultiplier = TIME_HORIZONS.find(th => th.id === timeHorizon)?.multiplier || 1.0;
  const metrics = calculateSimulatedMetrics(baselineData, activeScenarios, intensity, timeMultiplier);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-6 pb-16">
      {/* 1. Header & Scenarios Bar */}
      <div className="glass-card p-5 rounded-2xl border border-white/60 dark:border-emerald-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white uppercase tracking-tight">
                SCENARIO Simulator
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Live Physics Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>Location: {location.name} (Base Temp: {baselineData.temp}°C, AQI: {baselineData.aqi})</span>
            </p>
          </div>

          {activeScenarios.length > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 font-semibold flex items-center gap-1 transition-colors px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        {/* Horizontal Scenario Selection Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {SCENARIOS.map((sc) => {
            const isActive = activeScenarios.includes(sc.id);
            return (
              <button
                key={sc.id}
                onClick={() => handleToggleScenario(sc.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  isActive
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-glow-emerald'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500/40'
                }`}
              >
                {sc.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Hero Visual City Canvas & Real-Time Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Animated SVG City Canvas + Intensity Controls */}
        <div className="lg:col-span-7 space-y-4">
          <CityCanvas
            activeScenarios={activeScenarios}
            intensity={intensity}
            timeMultiplier={timeMultiplier}
          />

          {/* Intensity Slider Card */}
          <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-1/2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>Intensity Scope</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">{Math.round(intensity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="1.0"
                step="0.25"
                value={intensity}
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="w-full sm:w-1/2 flex items-center justify-end gap-1.5">
              {TIME_HORIZONS.map((th) => (
                <button
                  key={th.id}
                  onClick={() => setTimeHorizon(th.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    timeHorizon === th.id
                      ? 'bg-sky-500 text-white shadow-glow-sky'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Projected Metrics */}
        <div className="lg:col-span-5">
          <ImpactMetrics metrics={metrics} />
        </div>
      </div>

      {/* 3. Scientific Rationale & Explanations */}
      <WhyExplainer activeScenarios={activeScenarios} />
    </div>
  );
}
