import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { fetchLiveEnvironmentalData } from '../api/openMeteo';
import CitySearch from '../components/dashboard/CitySearch';
import Gauge from '../components/common/Gauge';
import PollutantGrid from '../components/dashboard/PollutantGrid';
import WeatherCard from '../components/dashboard/WeatherCard';
import HourlyChart from '../components/dashboard/HourlyChart';
import ForecastRow from '../components/dashboard/ForecastRow';
import CombinedInsightBanner from '../components/dashboard/CombinedInsightBanner';
import { Card } from '../components/common/Card';
import { SkeletonLoader } from '../components/common/ProgressRing';
import { 
  RotateCw, 
  MapPin, 
  Heart, 
  Sparkles,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { useToast } from '../components/common/Toast';
import { useAuthStore } from '../store/useAuthStore';
import { AlertTriangle } from 'lucide-react';
import WinnerBanner from '../components/leaderboard/WinnerBanner';
import GreenChoiceWidget from '../components/dashboard/GreenChoiceWidget';

export default function Dashboard() {
  const { location, setLocation } = useStore();
  const { profile } = useAuthStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { addToast } = useToast();

  const loadData = useCallback(async (showToast = false) => {
    try {
      setRefreshing(true);
      const res = await fetchLiveEnvironmentalData(location.lat, location.lon, location.name);
      setData(res);
      if (showToast) {
        addToast({ message: `Atmospheric data updated for ${location.name}`, type: 'success' });
      }
    } catch (err) {
      console.error('Failed to load env data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [location, addToast]);

  useEffect(() => {
    loadData(false);
    const interval = setInterval(() => loadData(false), 10 * 60 * 1000);
    const onFocus = () => loadData(false);
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [loadData]);

  const handleCitySelect = (newLoc) => {
    setLocation(newLoc);
  };

  const aq = data?.airQuality;
  const wx = data?.weather;
  const aqiThreshold = profile?.aqiAlertThreshold || 150;
  const isAqiAlertTriggered = aq?.aqi && aq.aqi >= aqiThreshold;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 pb-16">
      {/* Dismissible Leaderboard Weekly Winner Banner */}
      <WinnerBanner />

      {/* 1. Header & City Search Bar */}
      <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border border-white/60 dark:border-emerald-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white">
              Live Dashboard
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{location.name} {location.country ? `(${location.country})` : ''}</span>
              <span className="text-slate-400">• Updated {data?.updatedAt || '10:41 AM'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 md:w-80">
            <CitySearch onSelectCity={handleCitySelect} />
          </div>
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-500/20 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500 shadow-sm transition-all disabled:opacity-50"
            title="Refresh sensor data"
          >
            <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-emerald-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* User Custom Profile AQI Alert Banner */}
      {isAqiAlertTriggered && (
        <div className="p-4 rounded-2xl bg-rose-500/15 dark:bg-rose-950/40 border border-rose-500/30 text-rose-800 dark:text-rose-200 flex items-start gap-3 shadow-md animate-in fade-in duration-300">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs">
            <span className="font-bold font-heading text-sm block text-rose-900 dark:text-rose-100">
              Personalized AQI Threshold Alert (Threshold: {aqiThreshold} AQI)
            </span>
            <p className="leading-relaxed">
              Air quality in <strong>{location.name}</strong> is currently at <strong>AQI {aq?.aqi} ({aq?.category})</strong>, exceeding your configured notification limit of {aqiThreshold}. Wear an N95 mask and limit outdoor cardio.
            </p>
          </div>
        </div>
      )}

      {/* Slide 5 Unified Cockpit Status Bar: AQI | Microclimate | Personal Eco Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Air Quality Index */}
        <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-400 uppercase tracking-wider">Air Quality Index</span>
            <span 
              className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase"
              style={{ backgroundColor: `${aq?.color || '#EF4444'}20`, color: aq?.color || '#EF4444' }}
            >
              {aq?.category || 'Unhealthy'}
            </span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-heading font-black text-slate-900 dark:text-white">
              {aq?.aqi || 142}
            </span>
            <span className="text-xs text-slate-400 font-medium">PM2.5 Primary Driver</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {aq?.healthAdvice || 'Sensitive groups should limit intense outdoor activity.'}
          </p>
        </div>

        {/* Card 2: Microclimate Telemetry */}
        <div className="p-4 rounded-2xl glass-card border border-sky-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-400 uppercase tracking-wider">Microclimate Telemetry</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-500/15 text-sky-600 dark:text-sky-400">
              {location.name}
            </span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-heading font-black text-slate-900 dark:text-white">
              {wx?.temperature || 29}°C
            </span>
            <span className="text-xs text-slate-400 font-medium">{wx?.conditionText || 'Partly Cloudy'}</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>💧 Humidity: {wx?.humidity || 64}%</span>
            <span>💨 Wind: {wx?.windSpeed || 14} km/h</span>
          </div>
        </div>

        {/* Card 3: Personal Eco Score */}
        <div className="p-4 rounded-2xl glass-card border border-amber-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-400 uppercase tracking-wider">Personal Eco Score</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Top 22%
            </span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-heading font-black text-emerald-600 dark:text-emerald-400">
              78<span className="text-xl text-slate-400 font-normal"> / 100</span>
            </span>
            <span className="text-xs text-emerald-500 font-semibold">+6 pts this month</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Annual Footprint: 1,840 kg CO₂/yr (Audit Saved)
          </p>
        </div>
      </div>

      {/* Top High-Leverage Action Banner matching Slide 5 */}
      <div className="p-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-sky-500/15 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-[10px] uppercase tracking-wider">
            TOP ACTION
          </span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">
            Switch 2 commute days/week to electric metro: <strong>Potential saving of 320 kg CO₂/year</strong>
          </span>
        </div>
        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20 whitespace-nowrap">
          +8 Eco Score Points
        </span>
      </div>

      {/* Daily Green Choice Quick-Log Widget */}
      <GreenChoiceWidget />

      {/* 2. Main Row: AQI Gauge (Left) + 6-Card Pollutant Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Semicircle AQI Gauge Card */}
        <Card className="lg:col-span-5 p-6 flex flex-col items-center justify-between text-center" hover={false}>
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">
              Real-Time Air Quality
            </span>
            <span 
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase"
              style={{ backgroundColor: `${aq?.color || '#F59E0B'}20`, color: aq?.color || '#F59E0B' }}
            >
              {aq?.category || 'Moderate'}
            </span>
          </div>

          <div className="my-3 flex justify-center">
            <Gauge
              value={aq?.aqi || 52}
              max={400}
              category={aq?.category || 'Moderate'}
              color={aq?.color || '#F59E0B'}
              size={270}
            />
          </div>

          <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800/80 text-left">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {aq?.healthAdvice || 'Air quality is acceptable; however, for some pollutants there may be moderate health concerns.'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">N95 Mask Advice</span>
                <span className={`text-xs font-bold ${aq?.maskRecommended ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {aq?.maskRecommended ? 'Recommended' : 'Not required'}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Outdoor Exercise</span>
                <span className={`text-xs font-bold ${aq?.outdoorExercise === 'Avoid' ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {aq?.outdoorExercise || 'Enjoy outdoors'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* 6-Card Pollutant Spectrum */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
              Pollutant Spectrum
            </h3>
            <span className="text-xs text-slate-400">WHO Guideline Limits</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[1,2,3,4,5,6].map(i => <SkeletonLoader key={i} className="h-28" />)}
            </div>
          ) : (
            <PollutantGrid pollutants={aq?.pollutants} />
          )}
        </div>
      </div>

      {/* 3. Secondary Row: Weather Card (Left) + 24-Hour Trend Chart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-4">
          <WeatherCard weather={wx} />
        </div>
        <div className="lg:col-span-8">
          <HourlyChart hourly={data?.hourly} />
        </div>
      </div>

      {/* 4. 7-Day Atmospheric Weather Forecast */}
      <ForecastRow daily={data?.daily} />

      {/* 5. Personalized Insight Card (Bottom) */}
      {aq && (
        <CombinedInsightBanner aqiData={aq} cityName={location.name} />
      )}
    </div>
  );
}
