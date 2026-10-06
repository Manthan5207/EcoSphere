import React from 'react';
import { Card } from '../common/Card';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { TrendingUp, AlertTriangle, ShieldCheck, Sparkles, Activity, TreePine } from 'lucide-react';

export default function ScenarioTrajectoryChart({ baselineData, metrics, activeScenarios, timeHorizon, setTimeHorizon }) {
  // Generate trajectory points for Current, +10 Years, +50 Years
  const baseAqi = baselineData?.aqi || 142;
  const baseTemp = baselineData?.temp || 29;

  // Compute values for Now, +10Y, +50Y
  const hasDeforestation = activeScenarios.includes('noTrees');
  const hasVehiclesCut = activeScenarios.includes('noVehicles') || activeScenarios.includes('allElectric');
  const has10xTrees = activeScenarios.includes('tenXTrees');
  const hasDrought = activeScenarios.includes('noRain');
  const hasFactoryCut = activeScenarios.includes('noFactories');

  // Multiplier effects
  let smogSlope = 0;
  let resilienceSlope = 0;

  if (hasDeforestation) { smogSlope += 1.6; resilienceSlope -= 1.8; }
  if (hasDrought) { smogSlope += 1.2; resilienceSlope -= 1.4; }
  if (hasVehiclesCut) { smogSlope -= 1.3; resilienceSlope += 0.9; }
  if (has10xTrees) { smogSlope -= 1.5; resilienceSlope += 1.9; }
  if (hasFactoryCut) { smogSlope -= 1.1; resilienceSlope += 0.8; }

  // Fallback default demonstration if empty
  if (activeScenarios.length === 0) {
    smogSlope = 0.4;
    resilienceSlope = -0.3;
  }

  const trajectoryData = [
    {
      horizon: 'Current',
      label: '2026 (Status Quo)',
      tempSmog: 50,
      greenResilience: 70,
      aqiVal: baseAqi,
      tempVal: `${baseTemp}°C`
    },
    {
      horizon: '+10 Years',
      label: '2036 (+10Y)',
      tempSmog: Math.max(10, Math.min(100, Math.round(50 + smogSlope * 18))),
      greenResilience: Math.max(5, Math.min(100, Math.round(70 + resilienceSlope * 16))),
      aqiVal: Math.max(20, Math.round(baseAqi * (1 + (smogSlope * 0.25)))),
      tempVal: `${(baseTemp + smogSlope * 0.8).toFixed(1)}°C`
    },
    {
      horizon: '+50 Years',
      label: '2076 (+50Y)',
      tempSmog: Math.max(5, Math.min(100, Math.round(50 + smogSlope * 36))),
      greenResilience: Math.max(2, Math.min(100, Math.round(70 + resilienceSlope * 34))),
      aqiVal: Math.max(15, Math.round(baseAqi * (1 + (smogSlope * 0.55)))),
      tempVal: `${(baseTemp + smogSlope * 1.8).toFixed(1)}°C`
    }
  ];

  // Dynamic Insight text based on active scenarios
  let insightText = "Balanced city trajectory. Policy interventions or canopy shifts create compounding microclimate feedback loops over multi-decade horizons.";
  if (hasDeforestation) {
    insightText = "Urban canopy loss triggers compounding feedback loops — surface heat absorption surges by 26%, doubling stagnation of PM2.5 particulates over 50 years.";
  } else if (has10xTrees && hasVehiclesCut) {
    insightText = "Combining megacity Miyawaki afforestation with zero-emission transit creates an atmospheric cooling dividend, dropping regional PM2.5 loads by over 45%.";
  } else if (hasVehiclesCut) {
    insightText = "Decarbonizing transit directly lowers ground-level NOx and particulate smog, preventing chronic pediatric asthma surges in dense urban corridors.";
  } else if (hasDrought) {
    insightText = "Extended rainless heatwaves accelerate topsoil desiccation into airborne particulate plumes, elevating ambient surface heat islands by up to +3.8°C.";
  }

  const simulated50YAqi = trajectoryData[2].aqiVal;
  const simulated50YTempDelta = (parseFloat(trajectoryData[2].tempVal) - baseTemp).toFixed(1);
  const isSevere = smogSlope > 0;

  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-bold text-sky-500 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Digital Twin Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white mt-0.5">
            Parametric Scenario Trajectory
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Multi-decade interactive environmental projection across +10 and +50 year horizons
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['now', '10yr', '50yr'].map((th) => (
            <button
              key={th}
              onClick={() => setTimeHorizon(th)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                timeHorizon === th
                  ? 'bg-sky-500 text-white shadow-glow-sky'
                  : 'bg-white/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
              }`}
            >
              {th === 'now' ? 'Current' : th === '10yr' ? '+10 Years' : '+50 Years'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Baseline & Simulated Scenario Cards (Left) + Multi-Horizon Recharts Curve (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Baseline vs +50 Years Cards */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Baseline Card */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Current City Baseline
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Status Quo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-[10px] text-slate-400 block font-medium">Tree Cover</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">32% Canopy</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-[10px] text-slate-400 block font-medium">Particulate Smog</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">AQI {baseAqi}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-[10px] text-slate-400 block font-medium">Microclimate</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{baseTemp}°C Ambient</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-[10px] text-slate-400 block font-medium">Health Risk</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Baseline Index</span>
              </div>
            </div>
          </div>

          {/* Simulated Scenario Card (+50 Years) */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            isSevere 
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-100'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-100'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold uppercase tracking-wider">
                Simulated Scenario (+50 Years)
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                isSevere
                  ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/30'
              }`}>
                {isSevere ? 'Severe Climate Risk' : 'High Ecological Gain'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/40 dark:bg-slate-900/50">
                <span className="text-[10px] opacity-75 block font-medium">Tree Cover</span>
                <span className="font-bold">
                  {has10xTrees ? '48% (+16%)' : hasDeforestation ? '11% (-21%)' : '30% (-2%)'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/40 dark:bg-slate-900/50">
                <span className="text-[10px] opacity-75 block font-medium">Particulate Smog</span>
                <span className="font-bold">AQI {simulated50YAqi}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/40 dark:bg-slate-900/50">
                <span className="text-[10px] opacity-75 block font-medium">Heat Island</span>
                <span className="font-bold">{simulated50YTempDelta >= 0 ? `+${simulated50YTempDelta}` : simulated50YTempDelta}°C</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/40 dark:bg-slate-900/50">
                <span className="text-[10px] opacity-75 block font-medium">Respiratory Burden</span>
                <span className="font-bold">{isSevere ? '+42% Impact' : '-28% Hospitalizations'}</span>
              </div>
            </div>
          </div>

          {/* Key Scenario Insight Callout matching Slide 4 */}
          <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/25 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-sky-600 dark:text-sky-400 block mb-0.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Key Scenario Insight:
            </span>
            {insightText}
          </div>
        </div>

        {/* Right Column: Recharts Trajectory Line Graph matching Slide 4 */}
        <Card className="lg:col-span-7 p-6 flex flex-col justify-between" hover={false}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white">
                Trajectory Projection: Temp & Smog vs Green Resilience
              </h3>
              <p className="text-[11px] text-slate-400">Parametric multi-horizon simulation index</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-rose-500">
                <span className="w-3 h-0.5 bg-rose-500 rounded-full"></span>
                Temp & Smog Index
              </span>
              <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="w-3 h-0.5 bg-emerald-500 rounded-full"></span>
                Green Resilience
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajectoryData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100, 116, 139, 0.15)" />
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl border border-sky-500/30 text-xs shadow-xl space-y-1">
                          <p className="font-bold text-sky-400">{label}</p>
                          <p className="text-rose-400">Temp & Smog Index: {payload[0]?.value}/100 (AQI ~{payload[0]?.payload?.aqiVal})</p>
                          <p className="text-emerald-400">Green Resilience: {payload[1]?.value}/100 (Temp ~{payload[1]?.payload?.tempVal})</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tempSmog"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="greenResilience"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>* Illustrative simulation — simplified parametric model, not a long-term scientific forecast.</span>
            <span className="font-mono text-emerald-500 font-bold">Physics Engine v2.4</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
