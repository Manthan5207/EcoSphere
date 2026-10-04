import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wind, 
  Calculator, 
  Building2, 
  Footprints, 
  Activity, 
  Flame, 
  Leaf, 
  Gauge, 
  ArrowRight,
  MapPin,
  Sparkles
} from 'lucide-react';
import GlobeIllustration from '../components/common/GlobeIllustration';
import AnimatedCounter from '../components/common/AnimatedCounter';
import { useStore } from '../store/useStore';
import { fetchLiveEnvironmentalData } from '../api/openMeteo';
import WinnerBanner from '../components/leaderboard/WinnerBanner';

export default function Home() {
  const { location, footprint, ecoScore } = useStore();
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchLiveEnvironmentalData(location.lat, location.lon, location.name).then(data => {
      if (isMounted) setCityData(data);
    });
    return () => { isMounted = false; };
  }, [location]);

  const aqi = cityData?.airQuality?.aqi ?? 52;
  const aqiCategory = cityData?.airQuality?.category ?? 'Moderate';
  const aqiColor = cityData?.airQuality?.color ?? '#F59E0B';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-16">
      {/* Dismissible Leaderboard Weekly Winner Banner */}
      <WinnerBanner />

      {/* 1. Main Hero Glass Canvas Card */}
      <section className="relative rounded-3xl p-6 sm:p-10 lg:p-12 glass-hero-canvas border border-white/60 dark:border-emerald-500/20 shadow-floating-hero overflow-hidden">
        {/* Background Atmosphere Mesh Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Hero Top Grid: Headline + Live AQI Chip (Left) & Glass Globe (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live AQI Chip */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/90 dark:bg-amber-500/80 text-slate-900 font-semibold text-xs sm:text-sm shadow-sm backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse"></span>
              <span>{location.name}, {location.country || 'India'}: {aqi} {aqiCategory}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              See your planet.<br />
              <span className="text-slate-900 dark:text-white">Shape its future.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-700 dark:text-slate-200 max-w-xl font-normal leading-relaxed"
            >
              Real-time atmospheric monitoring, interactive urban climate simulators, and household carbon footprint intelligence to drive measurable environmental action.
            </motion.p>
          </div>

          {/* Right Column: 3D Vector Globe */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <GlobeIllustration />
          </div>
        </div>

        {/* 3 Frosted Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {/* Card 1: Check Air Now */}
          <Link
            to="/dashboard"
            className="group relative p-6 rounded-2xl glass bg-white/70 dark:bg-slate-900/60 hover:bg-white/90 dark:hover:bg-slate-900/80 border border-white/80 dark:border-emerald-500/30 shadow-glass dark:shadow-glass-dark hover:shadow-glass-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-glow-emerald group-hover:scale-105 transition-transform">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Check Air Now
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Check air air now. Place your environments cards with real-time AQI and health safety guidance.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>View Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Calculate Footprint */}
          <Link
            to="/calculator"
            className="group relative p-6 rounded-2xl glass bg-white/70 dark:bg-slate-900/60 hover:bg-white/90 dark:hover:bg-slate-900/80 border border-white/80 dark:border-emerald-500/30 shadow-glass dark:shadow-glass-dark hover:shadow-glass-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-glow-emerald group-hover:scale-105 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Calculate Footprint
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Calculate the footprint and discover custom emissions reductions across energy and travel.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Start Audit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Simulate a Scenario */}
          <Link
            to="/whatif"
            className="group relative p-6 rounded-2xl glass bg-white/70 dark:bg-slate-900/60 hover:bg-white/90 dark:hover:bg-slate-900/80 border border-white/80 dark:border-emerald-500/30 shadow-glass dark:shadow-glass-dark hover:shadow-glass-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center mb-4 shadow-glow-sky group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                Simulate a Scenario
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Simulate a scenario for your factory, energy, and city with dynamic physics projections.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Launch Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Bottom Quick Metrics Ticker Strip */}
        <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Metric 1 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-white/60 dark:border-emerald-500/10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Wind className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block font-mono">
                  101.132
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">
                  Environment
                </span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-white/60 dark:border-emerald-500/10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Footprints className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block font-mono">
                  44 Mm
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">
                  The AQI
                </span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-white/60 dark:border-emerald-500/10">
              <div className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block font-mono">
                  788 k
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">
                  Energy Stats
                </span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-white/60 dark:border-emerald-500/10">
              <div className="w-7 h-7 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block font-mono">
                  43 nph
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">
                  Environmental
                </span>
              </div>
            </div>

            {/* Metric 5 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-white/60 dark:border-emerald-500/10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block font-mono">
                  19.0%
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">
                  Eco Metrics
                </span>
              </div>
            </div>

            {/* Metric 6 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-white/60 dark:border-emerald-500/10">
              <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Gauge className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block font-mono">
                  6.9%
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">
                  Employment
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Action Cards Showcase Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
              Action Cards
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Quick pathways to understand, simulate, and reduce climate impact
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/dashboard"
            className="p-6 rounded-2xl glass-card border border-emerald-500/20 hover:border-emerald-500/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              Check Air Now
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Atmospheric gauge card & WHO limit tracker
            </p>
          </Link>

          <Link
            to="/calculator"
            className="p-6 rounded-2xl glass-card border border-sky-500/20 hover:border-sky-500/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              Calculate Footprint
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Interactive wizard calibrated to daily life
            </p>
          </Link>

          <Link
            to="/whatif"
            className="p-6 rounded-2xl glass-card border border-amber-500/20 hover:border-amber-500/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              Simulate a Scenario
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Physics simulation of urban climate policies
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
