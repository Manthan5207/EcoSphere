import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, AlertTriangle, ShieldCheck, Zap, Leaf } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function CombinedInsightBanner({ aqiData, cityName = 'Delhi' }) {
  const { footprint, pledges } = useStore();

  const aqi = aqiData?.aqi ?? 178;
  const isAqiHigh = aqi > 100;
  
  const transportKgYear = footprint?.transport || 1020;
  const weeklyTransportKg = Math.round(transportKgYear / 52);
  const potentialSavingsKg = Math.round(weeklyTransportKg * 0.65);

  return (
    <div className={`p-5 sm:p-6 rounded-3xl border shadow-lg relative overflow-hidden transition-all ${
      isAqiHigh 
        ? 'bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-emerald-500/10 border-amber-500/30' 
        : 'bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-sky-500/10 border-emerald-500/30'
    }`}>
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3.5">
          <div className={`p-3 rounded-2xl shrink-0 ${
            isAqiHigh ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'
          }`}>
            {isAqiHigh ? <AlertTriangle className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                EcoSphere Personalised Insight
              </span>
              <span className="text-xs text-slate-400">• Live Synergy</span>
            </div>
            <h4 className="text-base sm:text-lg font-heading font-bold text-slate-900 dark:text-white">
              {isAqiHigh ? (
                <span>AQI in {cityName} is <strong className="text-rose-500">{aqi} ({aqiData?.category || 'Poor'})</strong> today.</span>
              ) : (
                <span>AQI in {cityName} is <strong className="text-emerald-500">{aqi} (Good)</strong> today.</span>
              )}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Your commute adds <strong className="text-slate-900 dark:text-white font-bold">{weeklyTransportKg} kg CO₂e/week</strong>. 
              Switching 3 days to metro/electric transit prevents <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{potentialSavingsKg} kg</strong> of emissions and eases toxic ground-level particulates in your neighbourhood.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
          <Link
            to="/actions"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-semibold text-xs sm:text-sm shadow-glow-emerald transition-all active:scale-95 whitespace-nowrap"
          >
            <span>Activate Clean Commute</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/calculator"
            className="px-3 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-700 dark:text-slate-300 font-medium text-xs border border-emerald-500/20 transition-all whitespace-nowrap"
          >
            Recalculate
          </Link>
        </div>
      </div>
    </div>
  );
}
