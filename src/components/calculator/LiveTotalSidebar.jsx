import React from 'react';
import { Card } from '../common/Card';
import AnimatedCounter from '../common/AnimatedCounter';
import { Car, Zap, Utensils, Trash2, ArrowUpRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function LiveTotalSidebar({ breakdown = {}, total = 0, currentStep = 1 }) {
  const tonnes = (total / 1000).toFixed(2);

  const data = [
    { name: 'Transport', value: Math.max(1, Math.round(breakdown.transport || 0)), color: '#F43F5E' },
    { name: 'Energy', value: Math.max(1, Math.round(breakdown.energy || 0)), color: '#F59E0B' },
    { name: 'Food', value: Math.max(1, Math.round(breakdown.food || 0)), color: '#10B981' },
    { name: 'Goods & Waste', value: Math.max(1, Math.round((breakdown.shopping || 0) + (breakdown.waste || 0))), color: '#38BDF8' },
  ];

  const categories = [
    { key: 'transport', label: 'Mobility & Flights', value: breakdown.transport || 0, icon: Car, color: 'bg-rose-500' },
    { key: 'energy', label: 'Home Energy & Gas', value: breakdown.energy || 0, icon: Zap, color: 'bg-amber-500' },
    { key: 'food', label: 'Diet & Food', value: breakdown.food || 0, icon: Utensils, color: 'bg-emerald-500' },
    { key: 'waste', label: 'Goods & Waste', value: (breakdown.shopping || 0) + (breakdown.waste || 0), icon: Trash2, color: 'bg-sky-500' },
  ];

  return (
    <Card className="sticky top-20 p-6 glass-card border border-emerald-500/20" hover={false}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">
          Live Carbon Audit
        </span>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
          Step {currentStep} of 4
        </span>
      </div>

      {/* Running Total Display with Mini Donut */}
      <div className="text-center my-3 py-4 px-3 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
          Estimated Annual Footprint
        </span>
        <div className="flex items-baseline justify-center gap-1.5 mt-1">
          <span className="text-4xl sm:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            <AnimatedCounter value={parseFloat(tonnes)} decimals={2} />
          </span>
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            t CO₂e / yr
          </span>
        </div>

        {/* Donut chart */}
        <div className="h-32 w-full my-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={32}
                outerRadius={50}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(val) => [`${val} kg CO₂e`, 'Emissions']}
                contentStyle={{ borderRadius: '8px', fontSize: '12px', background: '#0F172A', color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <span className="text-[11px] text-slate-400 block -mt-1">
          ({Math.round(total).toLocaleString()} kg CO₂e / year)
        </span>
      </div>

      {/* Live Breakdown Progress Bars */}
      <div className="space-y-3 my-4">
        <span className="text-xs font-heading font-semibold text-slate-700 dark:text-slate-300">
          Emission Split by Sector
        </span>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const sharePct = total > 0 ? Math.round((cat.value / total) * 100) : 0;

          return (
            <div key={cat.key} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">{cat.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-500">{Math.round(cat.value)} kg</span>
                  <span className="font-bold text-slate-900 dark:text-white w-8 text-right">{sharePct}%</span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${cat.color}`}
                  style={{ width: `${sharePct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
        <ArrowUpRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <span>India average is ~2.0 tonnes. Global 2030 target is ~2.3 tonnes.</span>
      </div>
    </Card>
  );
}
