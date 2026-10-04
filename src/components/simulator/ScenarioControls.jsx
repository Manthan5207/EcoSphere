import React from 'react';
import { SCENARIOS, TIME_HORIZONS } from '../../data/scenarios';
import { 
  TreePine, 
  Car, 
  Factory, 
  Zap, 
  Trees, 
  CloudOff, 
  RotateCcw, 
  Sparkles,
  SlidersHorizontal,
  Clock,
  Check
} from 'lucide-react';

const iconMap = {
  TreePineOff: TreePine,
  CarOff: Car,
  FactoryOff: Factory,
  Zap: Zap,
  Trees: Trees,
  CloudOff: CloudOff
};

export default function ScenarioControls({
  activeScenarios = [],
  onToggleScenario,
  intensity = 1.0,
  onChangeIntensity,
  timeHorizon = 'now',
  onChangeTimeHorizon,
  onReset
}) {
  const handlePreset = (presetIds) => {
    onReset();
    presetIds.forEach(id => onToggleScenario(id));
  };

  return (
    <div className="space-y-6">
      {/* 1. Scenario Toggle Chips */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
            Environmental Interventions
          </h3>
          {activeScenarios.length > 0 && (
            <button
              onClick={onReset}
              className="text-xs text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 font-semibold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Baseline
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SCENARIOS.map((sc) => {
            const Icon = iconMap[sc.icon] || Sparkles;
            const isActive = activeScenarios.includes(sc.id);

            return (
              <button
                key={sc.id}
                onClick={() => onToggleScenario(sc.id)}
                type="button"
                className={`p-4 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-500/15 dark:bg-emerald-950/40 shadow-glow-emerald/30 scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#12201A] hover:border-emerald-500/30 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-all ${
                        isActive ? 'text-white' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
                      }`}
                      style={{ backgroundColor: isActive ? sc.color : undefined }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">
                        {sc.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                        {sc.category}
                      </span>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isActive ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 dark:border-slate-700'
                  }`}>
                    {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 line-clamp-2">
                  {sc.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Intensity Slider & Quick Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl glass-card border border-emerald-500/20">
        {/* Intensity Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="intensity-slider" className="text-xs font-heading font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Intervention Intensity
            </label>
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              {Math.round(intensity * 100)}% Scope
            </span>
          </div>
          <input
            id="intensity-slider"
            type="range"
            min="0.25"
            max="1.0"
            step="0.25"
            value={intensity}
            onChange={(e) => onChangeIntensity(parseFloat(e.target.value))}
            className="w-full my-1 accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1 mt-1">
            <span>25% Localized</span>
            <span>50% Suburb</span>
            <span>75% Metro</span>
            <span>100% Citywide</span>
          </div>
        </div>

        {/* Time Travel Horizon */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Clock className="w-3.5 h-3.5 text-sky-500" />
            <span className="text-xs font-heading font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Time Horizon Projection
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {TIME_HORIZONS.map((th) => (
              <button
                key={th.id}
                onClick={() => onChangeTimeHorizon(th.id)}
                type="button"
                className={`py-2 px-2.5 rounded-xl text-center text-xs font-semibold border transition-all ${
                  timeHorizon === th.id
                    ? 'bg-sky-500 text-white border-sky-500 shadow-glow-sky/40 font-bold'
                    : 'bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-sky-400'
                }`}
              >
                <div>{th.label}</div>
                <div className="text-[10px] opacity-75 font-mono">{th.year}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Preset Scenarios Quick Launch */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        <span className="text-xs font-semibold text-slate-400 shrink-0">Try One-Click Worlds:</span>
        <button
          onClick={() => handlePreset(['noVehicles', 'noFactories', 'tenXTrees'])}
          className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 font-medium whitespace-nowrap transition-colors"
        >
          🌿 Urban Eden (Clean Transit + Forest)
        </button>
        <button
          onClick={() => handlePreset(['noTrees', 'noRain'])}
          className="text-xs px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 font-medium whitespace-nowrap transition-colors"
        >
          🔥 Heat Island Crisis (Deforest + Drought)
        </button>
        <button
          onClick={() => handlePreset(['allElectric', 'noFactories'])}
          className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 font-medium whitespace-nowrap transition-colors"
        >
          ⚡ Full Electrification Grid
        </button>
      </div>
    </div>
  );
}
