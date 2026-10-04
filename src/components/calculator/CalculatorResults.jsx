import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import AnimatedCounter from '../common/AnimatedCounter';
import { BENCHMARKS } from '../../data/factors';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { 
  CheckCircle2, 
  Share2, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  TrendingDown, 
  AlertCircle,
  Car,
  Zap,
  Utensils,
  ShoppingBag
} from 'lucide-react';
import ShareModal from '../common/ShareModal';

const COLORS = ['#F43F5E', '#F59E0B', '#10B981', '#38BDF8'];

export default function CalculatorResults({ footprint, onRecalculate }) {
  const [shareOpen, setShareOpen] = useState(false);

  const totalTonnes = +(footprint.total / 1000).toFixed(2);
  const userKg = footprint.total;

  // Donut chart dataset
  const donutData = [
    { name: 'Transport', value: Math.round(footprint.transport), color: '#F43F5E' },
    { name: 'Home Energy', value: Math.round(footprint.energy), color: '#F59E0B' },
    { name: 'Food & Diet', value: Math.round(footprint.food), color: '#10B981' },
    { name: 'Goods & Waste', value: Math.round(footprint.shopping + footprint.waste), color: '#38BDF8' }
  ].filter(d => d.value > 0);

  // Benchmark comparison bar chart dataset
  const benchmarkData = [
    { name: 'You', tonnes: totalTonnes, fill: '#10B981' },
    { name: 'India Avg', tonnes: BENCHMARKS.indiaAvg, fill: '#0ea5e9' },
    { name: '2030 Target', tonnes: BENCHMARKS.sustainableTarget2030, fill: '#8b5cf6' },
    { name: 'World Avg', tonnes: BENCHMARKS.worldAvg, fill: '#f43f5e' }
  ];

  // Top 3 emission drivers
  const drivers = [
    { name: 'Daily Vehicular Commute', value: footprint.transport, category: 'Transport', icon: Car },
    { name: 'Grid Electricity Consumption', value: footprint.energy, category: 'Energy', icon: Zap },
    { name: 'Dietary Protein Footprint', value: footprint.food, category: 'Food', icon: Utensils },
    { name: 'Consumer Goods & Packaging', value: footprint.shopping + footprint.waste, category: 'Goods', icon: ShoppingBag }
  ].sort((a, b) => b.value - a.value).slice(0, 3);

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const pct = Math.round((data.value / userKg) * 100);
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-xl border border-emerald-500/30 text-xs shadow-xl">
          <p className="font-bold">{data.name}</p>
          <p className="text-emerald-400 font-mono">{data.value} kg CO₂e ({pct}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* 1. Hero Result Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-forest-dark text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              Audit Complete & Saved
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black">
              Your Annual Carbon Footprint
            </h2>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              {totalTonnes <= BENCHMARKS.indiaAvg 
                ? 'Impressive! Your lifestyle emissions are below the Indian national average.'
                : totalTonnes <= BENCHMARKS.sustainableTarget2030
                ? 'Great balance! You are already within the IPCC 2030 global climate target.'
                : 'You have high-impact reduction opportunities in transport and home electricity.'}
            </p>
          </div>

          <div className="text-left md:text-right bg-black/20 p-5 rounded-2xl border border-white/15 backdrop-blur-md">
            <span className="text-xs uppercase font-semibold tracking-wider text-emerald-200 block">
              Annual Emissions
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-5xl font-heading font-black tracking-tight text-white">
                <AnimatedCounter value={totalTonnes} decimals={2} />
              </span>
              <span className="text-xl font-bold text-emerald-300">tonnes</span>
            </div>
            <span className="text-xs text-emerald-200/80 mt-1 block">
              {Math.round(userKg).toLocaleString()} kg CO₂e / year
            </span>
          </div>
        </div>
      </div>

      {/* 2. Visual Breakdown & Benchmark Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Donut Chart */}
        <Card className="p-6" hover={false}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-heading font-bold text-slate-800 dark:text-white">
                Emission Distribution
              </h3>
              <p className="text-xs text-slate-400">Proportional breakdown by lifestyle sector</p>
            </div>
            <Sparkles className="w-5 h-5 text-emerald-500" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {donutData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600 dark:text-slate-300 truncate">{item.name}</span>
                <span className="font-bold font-mono text-slate-900 dark:text-white ml-auto">
                  {Math.round((item.value / userKg) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Global Benchmark Comparisons Bar Chart */}
        <Card className="p-6" hover={false}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-heading font-bold text-slate-800 dark:text-white">
                Global & National Benchmarks
              </h3>
              <p className="text-xs text-slate-400">Comparing your tonnes CO₂e with world standards</p>
            </div>
            <TrendingDown className="w-5 h-5 text-sky-500" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100, 116, 139, 0.15)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 'auto']} />
                <RechartsTooltip
                  formatter={(value) => [`${value} tonnes/yr`, 'Carbon Footprint']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #10B981', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="tonnes" radius={[8, 8, 0, 0]}>
                  {benchmarkData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            Target 2030 represents the IPCC per-capita carbon budget needed to limit global warming to 1.5°C.
          </div>
        </Card>
      </div>

      {/* 3. Top 3 Emission Contributors */}
      <div>
        <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          Top 3 Emission Drivers in Your Lifestyle
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {drivers.map((driver, idx) => {
            const Icon = driver.icon;
            const pct = Math.round((driver.value / userKg) * 100);

            return (
              <Card key={driver.name} className="p-5 relative" hover={true}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Rank #{idx + 1}
                  </span>
                </div>

                <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">
                  {driver.name}
                </h4>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl font-heading font-extrabold text-emerald-600 dark:text-emerald-400">
                    {Math.round(driver.value)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">kg CO₂e ({pct}%)</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 4. Action Buttons (CTA to Action Plan + Share Card + Recalculate) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl glass-card border border-emerald-500/20">
        <button
          onClick={onRecalculate}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Change Answers / Recalculate
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShareOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-heading font-bold text-sm border border-emerald-500/20 shadow-sm transition-all"
          >
            <Share2 className="w-4 h-4" />
            Share Result Card
          </button>

          <Link
            to="/actions"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-sm shadow-glow-emerald transition-all active:scale-95"
          >
            <span>View Tailored Action Plan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}
