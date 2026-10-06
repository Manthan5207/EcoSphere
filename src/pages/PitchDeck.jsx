import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Play, 
  Pause, 
  Home, 
  Compass, 
  Sliders, 
  Calculator, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Wind, 
  Building2, 
  Leaf, 
  Layers, 
  Zap, 
  TrendingUp, 
  Cpu, 
  Rocket, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const totalSlides = 10;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isFullscreen]);

  // Autoplay
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        nextSlide();
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Trajectory mock dataset for Slide 4
  const trajectoryData = [
    { horizon: 'Current', label: 'Current', tempSmog: 20, greenResilience: 78, aqi: 85, temp: '29°C' },
    { horizon: '+10 Years', label: '+10 Years', tempSmog: 55, greenResilience: 48, aqi: 124, temp: '31.2°C' },
    { horizon: '+50 Years', label: '+50 Years', tempSmog: 90, greenResilience: 18, aqi: 168, temp: '32.8°C' }
  ];

  return (
    <div className={`min-h-screen bg-[#050C0E] text-slate-100 flex flex-col justify-between overflow-hidden font-sans select-none relative ${isFullscreen ? 'p-6 sm:p-12' : 'p-4 sm:p-8'}`}>
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Top Slide Control Header */}
      <header className="flex items-center justify-between z-20 pb-4 border-b border-emerald-500/10">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-emerald-500/20 text-xs font-semibold transition-all"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span>Back to App</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-heading font-extrabold tracking-wider text-slate-300 uppercase">
              EcoSphere Pitch Deck
            </span>
          </div>
        </div>

        {/* Slide Counter & Pill Navigator */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-7 bg-emerald-400 shadow-glow-emerald'
                  : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Jump to Slide ${idx + 1}`}
            />
          ))}
          <span className="ml-2 font-mono text-xs text-slate-400 font-bold">
            {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

        {/* Action Buttons: Play/Pause + Fullscreen */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isPlaying
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-glow-emerald'
                : 'bg-slate-900/80 text-slate-300 border-emerald-500/20 hover:text-white'
            }`}
            title="Auto-advance slides"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-emerald-500/20 transition-all"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main Slide Presentation Stage */}
      <main className="flex-1 flex items-center justify-center my-auto py-4 z-10 w-full max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {/* SLIDE 1: Title & Hero Cockpit */}
          {currentSlide === 0 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col justify-between space-y-8"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  SMART INNOVATION PITCH
                </span>

                <h1 className="text-5xl sm:text-7xl font-heading font-black tracking-tight text-white leading-none">
                  EcoSphere
                </h1>
                <p className="text-2xl sm:text-3xl font-heading font-bold text-emerald-400">
                  Understand. Simulate. Act.
                </p>
                <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
                  A unified environmental intelligence platform connecting live air quality, microclimate, personal carbon footprint, and predictive scenario simulations.
                </p>
              </div>

              {/* 4 Live Badges matching PPT Slide 1 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-md flex items-center gap-3.5 shadow-xl">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">AQI INDEX</span>
                    <span className="text-2xl font-heading font-black text-white">142</span>
                    <span className="text-[10px] text-amber-400 font-semibold block">(Live Demo)</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-sky-500/30 backdrop-blur-md flex items-center gap-3.5 shadow-xl">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">AMBIENT TEMP</span>
                    <span className="text-2xl font-heading font-black text-white">29°C</span>
                    <span className="text-[10px] text-sky-400 font-semibold block">(Telemetry)</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md flex items-center gap-3.5 shadow-xl">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">ECO SCORE</span>
                    <span className="text-2xl font-heading font-black text-emerald-400">78<span className="text-sm text-slate-400 font-normal">/100</span></span>
                    <span className="text-[10px] text-emerald-400 font-semibold block">(Top 22%)</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-md flex items-center gap-3.5 shadow-xl">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">CO₂ FOOTPRINT</span>
                    <span className="text-2xl font-heading font-black text-white">1.84</span>
                    <span className="text-[10px] text-purple-400 font-semibold block">T/yr (Calibrated)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 2: Problem Definition */}
          {currentSlide === 1 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    PROBLEM DEFINITION
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mt-1">
                    Environmental Data Is Fragmented
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-1">
                    People can access environmental data — but rarely see how their choices connect to the surrounding ecosystem.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
                  The Awareness-Action Gap
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* 4 Pain Points */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                      <Wind className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-sm">AQI Apps</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Passive numbers (PM2.5, PM10) without contextual behavior recommendations.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                      <Compass className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-sm">Weather Apps</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Isolated temperature & forecasts siloed from pollution and heat vulnerability.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-sm">Carbon Tools</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Generic annual calculators detached from real-time city conditions and daily habits.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-sm">Green Advice</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Vague, non-quantified lifestyle tips lacking individual attribution and accountability.
                    </p>
                  </div>
                </div>

                {/* Funnel */}
                <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-slate-400">ENVIRONMENTAL CONVERSION FUNNEL</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      CRITICAL DROP-OFF
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">01. INFORMATION (Access to AQI & News)</span>
                        <span className="font-mono font-bold text-white">100%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">02. AWARENESS (General concern)</span>
                        <span className="font-mono font-bold text-sky-300">78%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800">
                        <div className="h-full bg-teal-400 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>

                    <div className="py-1 px-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 font-semibold">
                      📉 Steepest Drop (-52%): Disconnection from tangible options
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">03. UNDERSTANDING (Local impact)</span>
                        <span className="font-mono font-bold text-amber-300">26%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '26%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">04. ACTION (Measurable shift)</span>
                        <span className="font-mono font-bold text-rose-400">9%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: '9%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                    <strong className="text-white block mb-0.5">The Result: Cognitive Overload & Inaction</strong>
                    Users see high smog or high carbon stats, but cannot pinpoint which personal decision moves the needle.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 3: Platform Architecture */}
          {currentSlide === 2 && (
            <motion.div
              key="slide-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    PLATFORM ARCHITECTURE
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mt-1">
                    One Platform. Three Steps.
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-1">
                    EcoSphere links real-time environmental context to predictive consequences and personal accountability.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                  Data → Simulation → Action
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 01 Understand */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/30 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-heading font-black text-emerald-400">01</span>
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        <Wind className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white">UNDERSTAND</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Real-time hyperlocal intelligence across multi-source atmospheric sensors.
                    </p>
                    <ul className="space-y-2 mt-5 text-xs text-slate-300">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Live station & model-based AQI</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 6 major criteria pollutants</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Ambient weather & humidity</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 7-Day predictive forecast</li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-slate-800 text-xs font-semibold text-emerald-400">
                    Telemetry Layer: Zero latency
                  </div>
                </div>

                {/* 02 Simulate */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-sky-500/30 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-heading font-black text-sky-400">02</span>
                      <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white">SIMULATE</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Interactive digital twin modeling systemic urban and policy interventions.
                    </p>
                    <ul className="space-y-2 mt-5 text-xs text-slate-300">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" /> What-if scenario testing</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" /> Canopy & deforestation impacts</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" /> +10 / +50 year horizon view</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" /> Simplified parametric model</li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-slate-800 text-xs font-semibold text-sky-400">
                    Predictive Layer: Decision preview
                  </div>
                </div>

                {/* 03 Act */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/30 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-heading font-black text-amber-400">03</span>
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        <Leaf className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white">ACT</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Pragmatic behavior modification with quantified carbon and cost incentives.
                    </p>
                    <ul className="space-y-2 mt-5 text-xs text-slate-300">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Dynamic personal carbon tally</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Ranked high-leverage swaps</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Eco Score tracking (0–100)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Pledges & verified impact</li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-slate-800 text-xs font-semibold text-amber-400">
                    Behavior Layer: Quantified habits
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center text-xs text-emerald-300 font-semibold">
                🔄 Continuous Feedback Loop: Sense Local Air → Simulate Community Trajectory → Optimize Personal Decarbonization
              </div>
            </motion.div>
          )}

          {/* SLIDE 4: Digital Twin Engine */}
          {currentSlide === 3 && (
            <motion.div
              key="slide-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    DIGITAL TWIN ENGINE
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mt-1">
                    The What-If Simulator
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-1">
                    See the consequences before you act — interactive environmental scenario projection.
                  </p>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
                  Scenario: 30% Tree Cover Reduction
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Baseline vs Simulated */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold uppercase text-slate-400">Current City Baseline</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">Status Quo</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-xl bg-slate-950/60">🌲 Tree Cover: 32%</div>
                      <div className="p-2 rounded-xl bg-slate-950/60">🌡️ Microclimate: 29°C</div>
                      <div className="p-2 rounded-xl bg-slate-950/60">💨 Particulate: AQI 85</div>
                      <div className="p-2 rounded-xl bg-slate-950/60">🏥 Health Risk: Baseline</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold uppercase">Simulated Scenario (+50 Years)</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400">Severe Impact</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-xl bg-slate-950/60">⚠️ Tree Cover: 11% (-21%)</div>
                      <div className="p-2 rounded-xl bg-slate-950/60">🔥 Heat Island: +3.8°C</div>
                      <div className="p-2 rounded-xl bg-slate-950/60">🌫️ Particulate: AQI 168</div>
                      <div className="p-2 rounded-xl bg-slate-950/60">🫁 Respiratory: +42%</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs text-slate-300">
                    <span className="font-bold text-sky-400 block mb-0.5">Key Scenario Insight:</span>
                    Urban tree loss triggers compounding feedback loops — surface heat absorption surges by 26%, doubling stagnation of PM2.5 particulates.
                  </div>
                </div>

                {/* Right Recharts Trajectory */}
                <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-heading font-bold uppercase text-slate-300">PARAMETRIC SCENARIO TRAJECTORY</span>
                    <div className="flex items-center gap-3 text-xs font-semibold">
                      <span className="text-rose-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Temp & Smog</span>
                      <span className="text-emerald-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Green Resilience</span>
                    </div>
                  </div>

                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trajectoryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100, 116, 139, 0.2)" />
                        <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
                        <Line type="monotone" dataKey="tempSmog" stroke="#ef4444" strokeWidth={3} dot={{ r: 6 }} />
                        <Line type="monotone" dataKey="greenResilience" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <span className="text-[10px] text-slate-500 text-right block mt-2">
                    * Illustrative simulation — simplified parametric model, not a scientific forecast.
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 5: Unified Environmental Dashboard */}
          {currentSlide === 4 && (
            <motion.div
              key="slide-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    FEATURE SUITE
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mt-1">
                    Unified Environmental Dashboard
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-1">
                    Everything in one environmental cockpit — live sensors, carbon diagnostics, and predictive insights.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  LIVE UI DEMO BUILD
                </span>
              </div>

              {/* 3 Cockpit Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-rose-500/30">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-400 uppercase">AIR QUALITY INDEX</span>
                    <span className="text-rose-400 uppercase">UNHEALTHY</span>
                  </div>
                  <div className="text-4xl font-heading font-black text-white my-1">
                    142 <span className="text-xs text-slate-400 font-normal">PM2.5 Primary Driver</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Sensitive groups should limit intense outdoor activity.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-sky-500/30">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-400 uppercase">MICROCLIMATE TELEMETRY</span>
                    <span className="text-sky-400 uppercase">NEW DELHI</span>
                  </div>
                  <div className="text-4xl font-heading font-black text-white my-1">
                    29°C <span className="text-xs text-slate-400 font-normal">Partly Cloudy</span>
                  </div>
                  <p className="text-[11px] text-slate-400">💧 Humidity: 64% • 💨 Wind: 14 km/h NW</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-400 uppercase">PERSONAL ECO SCORE</span>
                    <span className="text-emerald-400 uppercase">TOP 22%</span>
                  </div>
                  <div className="text-4xl font-heading font-black text-emerald-400 my-1">
                    78 <span className="text-lg text-slate-400 font-normal">/ 100</span> <span className="text-xs text-emerald-400 font-normal">+6 pts this month</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Annual Footprint: 1,840 kg CO₂/yr (Demo)</p>
                </div>
              </div>

              {/* Forecast + 6-Pollutant Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">7-DAY ENVIRONMENTAL FORECAST</span>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs pt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <div key={day} className="p-1.5 rounded-lg bg-slate-950/60">
                        <span className="text-[10px] text-slate-400 block">{day}</span>
                        <span className="font-bold text-white block mt-0.5">{28 + (i % 3)}°</span>
                        <span className="text-[9px] text-amber-400 font-mono block">AQI {130 + i * 4}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>6-CATEGORY POLLUTANT MATRIX</span>
                    <span>CONCENTRATION</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="flex justify-between p-1.5 rounded-lg bg-slate-950/60">
                      <span className="text-slate-300">PM2.5 (Fine)</span>
                      <span className="font-bold text-rose-400">84%</span>
                    </div>
                    <div className="flex justify-between p-1.5 rounded-lg bg-slate-950/60">
                      <span className="text-slate-300">PM10 (Dust)</span>
                      <span className="font-bold text-amber-400">62%</span>
                    </div>
                    <div className="flex justify-between p-1.5 rounded-lg bg-slate-950/60">
                      <span className="text-slate-300">NO₂ (Exhaust)</span>
                      <span className="font-bold text-amber-400">52%</span>
                    </div>
                    <div className="flex justify-between p-1.5 rounded-lg bg-slate-950/60">
                      <span className="text-slate-300">SO₂ (Industrial)</span>
                      <span className="font-bold text-emerald-400">24%</span>
                    </div>
                    <div className="flex justify-between p-1.5 rounded-lg bg-slate-950/60">
                      <span className="text-slate-300">CO (Monoxide)</span>
                      <span className="font-bold text-emerald-400">31%</span>
                    </div>
                    <div className="flex justify-between p-1.5 rounded-lg bg-slate-950/60">
                      <span className="text-slate-300">O₃ (Ozone)</span>
                      <span className="font-bold text-amber-400">41%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 px-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex justify-between items-center text-xs">
                <span className="text-slate-200">
                  <strong className="text-emerald-400 uppercase mr-2">Top Action:</strong>
                  Switch 2 commute days/week to electric metro: <strong>Potential saving of 320 kg CO₂/year</strong>
                </span>
                <span className="font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-xl">
                  +8 Eco Score Points
                </span>
              </div>
            </motion.div>
          )}

          {/* SLIDE 6: Behavioral Engine */}
          {currentSlide === 5 && (
            <motion.div
              key="slide-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    BEHAVIORAL ENGINE
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mt-1">
                    From Numbers to Decisions
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-1">
                    Translating abstract carbon metrics into ranked, achievable lifestyle adjustments.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  Quantified ROI
                </span>
              </div>

              {/* 4-Step Pipeline */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">1. LIFESTYLE INPUTS</span>
                  <span className="font-bold text-white mt-0.5 block">Transport, Energy, Diet</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">2. FOOTPRINT SCORE</span>
                  <span className="font-bold text-emerald-400 mt-0.5 block">1,840 kg CO₂/yr</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">3. BENCHMARKS</span>
                  <span className="font-bold text-sky-400 mt-0.5 block">India 1.9T | Global 4.7T</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/30 bg-emerald-500/10">
                  <span className="text-[10px] text-emerald-400 block">4. TARGETED ACTIONS</span>
                  <span className="font-bold text-white mt-0.5 block">Ranked Interventions</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Ranked Savings */}
                <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">POTENTIAL ANNUAL CO₂ SAVINGS (RANKED)</span>
                    <span className="text-xs font-mono text-slate-500">KG CO₂/YEAR</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-200">Commute Mode Shift (Metro / Bus 3 days/week)</span>
                        <span className="font-bold text-emerald-400 font-mono">420 kg</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-800">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-200">Home Energy Optimization (BLDC fans, LED + AC @ 24°C)</span>
                        <span className="font-bold text-sky-400 font-mono">280 kg</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-800">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-200">Plant-Rich Diet Swaps (4 low-footprint meals/week)</span>
                        <span className="font-bold text-amber-400 font-mono">190 kg</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-800">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-200">Consumption & Longevity (Reduced fast fashion / e-waste)</span>
                        <span className="font-bold text-purple-400 font-mono">110 kg</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-800">
                        <div className="h-full bg-purple-400 rounded-full" style={{ width: '26%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Cards */}
                <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-100 flex items-start gap-3.5">
                    <span className="text-3xl">🌲</span>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block">TREE-EQUIVALENT TRANSLATION</span>
                      <div className="text-xl font-heading font-black text-white">≈ 20 Mature Trees</div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        A 420 kg CO₂ reduction from commute mode-shifting equals the annual carbon sequestered by ~20 growing urban trees.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Annual Cost Dividend</span>
                      <span className="text-lg font-heading font-black text-emerald-400 mt-1 block">₹14,200 Saved / Year</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Community Badge</span>
                      <span className="text-sm font-heading font-bold text-sky-400 mt-1 block">🏅 Delhi Transit Star</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 7: Engineering Stack */}
          {currentSlide === 6 && (
            <motion.div
              key="slide-7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    ENGINEERING STACK
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mt-1">
                    Lightweight & Scalable Tech
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-1">
                    Built for rapid response, zero API key dependencies, and seamless mobile execution.
                  </p>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold">
                  Hackathon-Ready Architecture
                </span>
              </div>

              {/* 4 Architectural Tiers */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs font-heading font-bold text-emerald-400 uppercase tracking-wider w-40 shrink-0">
                    01. CLIENT TIER
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">📱 Mobile Browser</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">💻 Desktop Web App</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">⚡ PWA Capability</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs font-heading font-bold text-sky-400 uppercase tracking-wider w-40 shrink-0">
                    02. REACT CORE
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">React 18 + Vite</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">Tailwind CSS</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">Framer Motion</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">Recharts SVG Engine</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">Zustand Store</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs font-heading font-bold text-amber-400 uppercase tracking-wider w-40 shrink-0">
                    03. APP ENGINES
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">Carbon Calculator</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">Scenario Engine (+10/+50Y)</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">Eco Score Normalizer</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">Recommendation Filter</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs font-heading font-bold text-purple-400 uppercase tracking-wider w-40 shrink-0">
                    04. DATA LAYER
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">Open-Meteo APIs (Weather)</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">Model-Based AQI Feeds</span>
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200">Offline Sample Dataset Fallback</span>
                  </div>
                </div>
              </div>

              {/* 4 Feature Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs pt-2">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="font-bold text-emerald-400 block">⚡ Sub-Second Speed</span>
                  <span className="text-[10px] text-slate-400">Vite optimized SPA bundle</span>
                </div>
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20">
                  <span className="font-bold text-sky-400 block">📱 Mobile-First Design</span>
                  <span className="text-[10px] text-slate-400">Tailwind fluid viewport</span>
                </div>
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <span className="font-bold text-amber-400 block">📦 Offline Fallback</span>
                  <span className="text-[10px] text-slate-400">Preloaded demo caches</span>
                </div>
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <span className="font-bold text-purple-400 block">🔑 Zero API Key Cost</span>
                  <span className="text-[10px] text-slate-400">Open-Meteo open tier</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 8: Growth & Roadmap */}
          {currentSlide === 7 && (
            <motion.div
              key="slide-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5" />
                    GROWTH & ROADMAP
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mt-1">
                    Making Awareness Actionable
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-1">
                    Bridging individual actions with city-scale climate resilience.
                  </p>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  Hackathon to Deployment
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* 4 Strategic Pillars */}
                <div className="lg:col-span-6 space-y-3">
                  <span className="text-xs font-heading font-bold uppercase text-slate-400 block">
                    CORE IMPACT PILLARS (4 STRATEGIC VECTORS)
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <span className="text-sm font-heading font-bold text-emerald-400 block">👤 Personalized</span>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Translates macro gigatons into direct personal kilograms and household savings.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <span className="text-sm font-heading font-bold text-sky-400 block">📊 Visual</span>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Replaces complex sensor tables with intuitive scenarios and progress telemetry.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <span className="text-sm font-heading font-bold text-amber-400 block">📍 India-Focused</span>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Tailored for Delhi-NCR microclimates, INR currency savings, and transit routes.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <span className="text-sm font-heading font-bold text-purple-400 block">🎓 Expandable</span>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Ready for campus hackathons, colleges, schools, and civic green leagues.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3-Phase Roadmap */}
                <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase font-bold text-slate-400">EVOLUTIONARY ROADMAP</span>
                    <span className="text-xs font-mono text-emerald-400">EXECUTION PHASES</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex justify-between items-center">
                      <div>
                        <strong className="text-emerald-400 block">PHASE 1 — NOW (MVP)</strong>
                        <span className="text-slate-300">Unified telemetry dashboard, personal carbon engine, 3-scenario simulator.</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white shrink-0 ml-2">COMPLETED</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex justify-between items-center">
                      <div>
                        <strong className="text-sky-400 block">PHASE 2 — NEXT (Q3)</strong>
                        <span className="text-slate-300">Station-level sensor APIs, user auth, college cohort leaderboards & badges.</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white shrink-0 ml-2">IN PROGRESS</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700 flex justify-between items-center">
                      <div>
                        <strong className="text-purple-400 block">PHASE 3 — FUTURE HORIZON</strong>
                        <span className="text-slate-400">Smart meter feeds, transit smart-card sync, regional languages & NGO credits.</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 shrink-0 ml-2">PLANNED</span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-slate-300 flex items-center justify-between border-t border-slate-800">
                    <span className="text-emerald-400 font-bold">🎯 Target: 50,000 active student users across North Indian campuses.</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center text-xs text-slate-200">
                <strong className="text-emerald-400 mr-2">OUR VISION:</strong>
                "Build a personal environmental intelligence layer for everyday planetary decisions."
              </div>
            </motion.div>
          )}

          {/* SLIDE 9: Questions & Discussion */}
          {currentSlide === 8 && (
            <motion.div
              key="slide-9"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="w-full text-center space-y-8 py-10"
            >
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  COLLEGE INNOVATION PROJECT PITCH
                </span>

                <h1 className="text-5xl sm:text-7xl font-heading font-black text-white">
                  EcoSphere
                </h1>
                <p className="text-2xl sm:text-3xl font-heading font-bold text-emerald-400">
                  Understand. Simulate. Act.
                </p>
              </div>

              <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md space-y-4">
                <h3 className="text-2xl font-heading font-bold text-white flex items-center justify-center gap-2">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                  Questions & Discussion
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Thank you for your time. We welcome feedback on our simulation engine, telemetry integration, and campus deployment roadmap.
                </p>

                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs shadow-glow-emerald transition-all"
                  >
                    📡 Live Telemetry Cockpit
                  </Link>
                  <Link
                    to="/whatif"
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-heading font-bold text-xs shadow-glow-sky transition-all"
                  >
                    🏙️ What-If Digital Twin
                  </Link>
                  <Link
                    to="/calculator"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-heading font-bold text-xs shadow-glow-amber transition-all"
                  >
                    🌱 Personal Decarbonization
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 10: Image & Research Sources */}
          {currentSlide === 9 && (
            <motion.div
              key="slide-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  APPENDIX & REFERENCES
                </span>
                <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mt-1">
                  Image & Data Sources
                </h2>
              </div>

              <div className="space-y-4 max-w-4xl">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase">Futuristic Smart City Digital Twin Visuals</span>
                  <p className="text-xs text-slate-300 font-mono break-all">
                    https://www.ierek.com/news/wp-content/uploads/2025/06/Black-and-Green-Modern-Futuristic-Digital-Transformation-with-AI-Technology.png
                  </p>
                  <span className="text-[11px] text-slate-400 block">Source: www.ierek.com</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-sky-400 uppercase">Atmospheric Telemetry & Vector Assets</span>
                  <p className="text-xs text-slate-300 font-mono break-all">
                    https://elements-resized.envatousercontent.com/elements-video-cover-images/files/7f6bf28c-37b3-4559-ab34-f8c2f41de0c4/inline_image_preview.jpg?w=500&cf_fit=cover&q=85&format=auto&s=b539e2a1f1d689fa3e7c274cc085e6da4cb3f6cd35ef10e6fce5d4cf5baf0fab
                  </p>
                  <span className="text-[11px] text-slate-400 block">Source: elements.envato.com</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase">Scientific Carbon & Meteorological Calibration</span>
                  <p className="text-xs text-slate-300">
                    Open-Meteo Air Quality & Weather API, IPCC AR6 Working Group III Mitigation Benchmarks, and Central Electricity Authority (CEA) India Baseline CO₂ Emission Database.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Toolbar */}
      <footer className="flex items-center justify-between z-20 pt-4 border-t border-emerald-500/10">
        <button
          onClick={prevSlide}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-emerald-500/20 text-xs font-bold transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Slide</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span>Use <kbd className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">←</kbd> <kbd className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">→</kbd> or Spacebar to navigate</span>
        </div>

        <button
          onClick={nextSlide}
          className="flex items-center gap-1.5 px-5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400 font-heading font-bold text-xs shadow-glow-emerald transition-all active:scale-95"
        >
          <span>{currentSlide === totalSlides - 1 ? 'Restart Pitch' : 'Next Slide'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
