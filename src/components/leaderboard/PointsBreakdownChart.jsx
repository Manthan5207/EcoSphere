import React from 'react';
import { Card } from '../common/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Activity, Car, Zap, Utensils, Trash2 } from 'lucide-react';

export default function PointsBreakdownChart({ breakdown = { transport: 40, energy: 30, food: 30, waste: 20 } }) {
  const data = [
    { name: 'Transport', points: breakdown.transport || 0, color: '#38BDF8' },
    { name: 'Energy', points: breakdown.energy || 0, color: '#F59E0B' },
    { name: 'Food', points: breakdown.food || 0, color: '#10B981' },
    { name: 'Waste', points: breakdown.waste || 0, color: '#EC4899' },
  ];

  const total = data.reduce((sum, d) => sum + d.points, 0);

  return (
    <Card className="p-5 space-y-3" hover={false}>
      <div className="flex items-center justify-between">
        <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Points Activity Breakdown
        </h4>
        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
          {total} pts total
        </span>
      </div>

      <div className="h-36 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              width={65}
            />
            <Tooltip 
              formatter={(val) => [`${val} points`, 'Eco Points']}
              contentStyle={{ borderRadius: '8px', fontSize: '12px', background: '#0F172A', color: '#fff' }}
            />
            <Bar dataKey="points" radius={[0, 6, 6, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5"><Car className="w-3 h-3 text-sky-400" /> Transit: {breakdown.transport || 0}</span>
        <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-amber-400" /> Energy: {breakdown.energy || 0}</span>
        <span className="flex items-center gap-1.5"><Utensils className="w-3 h-3 text-emerald-400" /> Food: {breakdown.food || 0}</span>
        <span className="flex items-center gap-1.5"><Trash2 className="w-3 h-3 text-pink-400" /> Waste: {breakdown.waste || 0}</span>
      </div>
    </Card>
  );
}
