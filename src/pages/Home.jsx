import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wind, 
  Calculator, 
  Building2, 
  Footprints, 
  Activity, 
  Leaf, 
  Gauge, 
  ArrowRight,
  MapPin,
  Sparkles,
  TrendingDown,
  AlertTriangle,
  Compass,
  CheckCircle2,
  TreePine,
  ShieldCheck,
  Zap,
  Layers,
  BarChart3,
  Presentation
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

  const aqi = cityData?.airQuality?.aqi ?? 142;
  const aqiCategory = cityData?.airQuality?.category ?? 'Unhealthy';
  const aqiColor = cityData?.airQuality?.color ?? '#EF4444';
  const temp = cityData?.weather?.temperature ?? 29;
  const humidity = cityData?.weather?.humidity ?? 64;
  const userTonnes = footprint?.total ? +(footprint.total / 1000).toFixed(2) : 1.84;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
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
            {/* Live Tag Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Smart Innovation Platform
              </span>
              <Link
                to="/pitch"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-xs font-bold transition-all"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>Pitch Deck Presentation</span>
              </Link>
            </div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                EcoSphere
              </h1>
              <p className="text-xl sm:text-2xl font-heading font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                Understand. Simulate. Act.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              A unified environmental intelligence platform connecting live air quality, microclimate telemetry, personal carbon footprint auditing, and predictive digital twin simulations.
            </motion.p>

            {/* Live Telemetry Status Pills matching PPT Slide 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block">AQI Index</span>
                <span className="text-lg font-heading font-black text-slate-900 dark:text-white">{aqi}</span>
                <span className="text-[10px] text-slate-500 block truncate">{location.name}</span>
              </div>

              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 block">Ambient Temp</span>
                <span className="text-lg font-heading font-black text-slate-900 dark:text-white">{temp}°C</span>
                <span className="text-[10px] text-slate-500 block">Humidity {humidity}%</span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Eco Score</span>
                <span className="text-lg font-heading font-black text-slate-900 dark:text-white">{ecoScore} / 100</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-medium">Top 22% Tier</span>
              </div>

              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block">CO₂ Footprint</span>
                <span className="text-lg font-heading font-black text-slate-900 dark:text-white">{userTonnes} T/yr</span>
                <span className="text-[10px] text-slate-500 block">IPCC Calibrated</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Vector Globe */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <GlobeIllustration />
          </div>
        </div>

        {/* 3 Core Action Cards matching PPT Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {/* Card 1: UNDERSTAND (Dashboard) */}
          <Link
            to="/dashboard"
            className="group relative p-6 rounded-2xl glass bg-white/70 dark:bg-slate-900/60 hover:bg-white/90 dark:hover:bg-slate-900/80 border border-white/80 dark:border-emerald-500/30 shadow-glass dark:shadow-glass-dark hover:shadow-glass-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-glow-emerald group-hover:scale-105 transition-transform">
                  <Wind className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  STEP 01
                </span>
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                01. UNDERSTAND
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Hyperlocal atmospheric telemetry with 6-pollutant spectrum (PM2.5, PM10, NO2, SO2, CO, O3) and 7-day predictive weather forecasts.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Open Live Cockpit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: SIMULATE (What-If) */}
          <Link
            to="/whatif"
            className="group relative p-6 rounded-2xl glass bg-white/70 dark:bg-slate-900/60 hover:bg-white/90 dark:hover:bg-slate-900/80 border border-white/80 dark:border-emerald-500/30 shadow-glass dark:shadow-glass-dark hover:shadow-glass-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-glow-sky group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  STEP 02
                </span>
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                02. SIMULATE
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Interactive digital twin modeling systemic urban & policy interventions with +10 and +50 year parametric environmental trajectories.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Launch What-If Digital Twin</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: ACT (Calculator & Action Plan) */}
          <Link
            to="/calculator"
            className="group relative p-6 rounded-2xl glass bg-white/70 dark:bg-slate-900/60 hover:bg-white/90 dark:hover:bg-slate-900/80 border border-white/80 dark:border-emerald-500/30 shadow-glass dark:shadow-glass-dark hover:shadow-glass-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-glow-amber group-hover:scale-105 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  STEP 03
                </span>
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                03. ACT
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Pragmatic behavior modification with quantified carbon audits, tree-equivalent savings, rupee cost dividends, and verified impact badges.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Audit Footprint & Pledges</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 2. Problem Definition & Conversion Funnel Section matching PPT Slide 2 */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-emerald-500/20 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/60 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Problem Definition & Awareness-Action Gap
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white mt-1">
              Environmental Data Is Fragmented
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              People can access environmental data — but rarely see how their choices connect to the surrounding ecosystem.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 4 Pain Points */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-2.5">
                <Wind className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">AQI Apps</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Passive numbers (PM2.5, PM10) without contextual behavior recommendations.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold mb-2.5">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">Weather Apps</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Isolated temperature & forecasts siloed from pollution and heat vulnerability.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-2.5">
                <Footprints className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">Carbon Tools</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Generic annual calculators detached from real-time city conditions and daily habits.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold mb-2.5">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">Green Advice</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Vague, non-quantified lifestyle tips lacking individual attribution and accountability.
              </p>
            </div>
          </div>

          {/* Right Column: Environmental Conversion Funnel */}
          <div className="lg:col-span-6 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold text-emerald-400 uppercase tracking-wider">
                Environmental Conversion Funnel
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                CRITICAL DROP-OFF
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Funnel Step 1 */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">01. INFORMATION (Access to AQI & News)</span>
                  <span className="font-mono font-bold text-white">100%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-sky-400 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Funnel Step 2 */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">02. AWARENESS (General Concern)</span>
                  <span className="font-mono font-bold text-sky-300">78%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-teal-400 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Drop-off Callout */}
              <div className="py-1 px-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-[11px] text-rose-300 font-semibold flex items-center justify-between">
                <span>📉 Steepest Drop (-52%): Disconnection from tangible options</span>
              </div>

              {/* Funnel Step 3 */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">03. UNDERSTANDING (Local Impact)</span>
                  <span className="font-mono font-bold text-amber-300">26%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '26%' }}></div>
                </div>
              </div>

              {/* Funnel Step 4 */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">04. ACTION (Measurable Shift)</span>
                  <span className="font-mono font-bold text-rose-400">9%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '9%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <strong className="text-white block mb-0.5">The Result: Cognitive Overload & Inaction</strong>
              Users see high smog or high carbon stats, but cannot pinpoint which personal decision moves the needle. EcoSphere bridges this gap.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Platform Architecture: 3-Layer Continuous Feedback Loop matching PPT Slide 3 */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Data → Simulation → Action
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white mt-1">
              One Platform. Three Steps.
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              EcoSphere links real-time environmental context to predictive consequences and personal accountability.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold font-mono">
            Sense Local Air → Simulate Trajectory → Optimize Decarbonization
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 Architecture Box */}
          <div className="p-6 rounded-2xl glass-card border border-emerald-500/30 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl font-heading font-black text-emerald-600 dark:text-emerald-400">01</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
                  <Wind className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">UNDERSTAND</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Real-time hyperlocal intelligence across multi-source atmospheric sensors.
              </p>
              <ul className="space-y-2 mt-4 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Live station & model-based AQI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>6 major criteria pollutants</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Ambient weather & humidity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>7-Day predictive forecast</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              Telemetry Layer: Zero latency
            </div>
          </div>

          {/* Step 2 Architecture Box */}
          <div className="p-6 rounded-2xl glass-card border border-sky-500/30 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl font-heading font-black text-sky-600 dark:text-sky-400">02</span>
                <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-500 flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">SIMULATE</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Interactive digital twin modeling systemic urban and policy interventions.
              </p>
              <ul className="space-y-2 mt-4 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>What-if scenario testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>Canopy & deforestation impacts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>+10 / +50 year horizon view</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>Simplified parametric model</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
              Predictive Layer: Decision preview
            </div>
          </div>

          {/* Step 3 Architecture Box */}
          <div className="p-6 rounded-2xl glass-card border border-amber-500/30 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl font-heading font-black text-amber-600 dark:text-amber-400">03</span>
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
                  <Leaf className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">ACT</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Pragmatic behavior modification with quantified carbon and cost incentives.
              </p>
              <ul className="space-y-2 mt-4 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Dynamic personal carbon tally</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Ranked high-leverage swaps</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Eco Score tracking (0–100)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Pledges & verified impact badges</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              Behavior Layer: Quantified habits
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

