import React from 'react';
import { Card, Tooltip } from '../common/Card';
import { Info, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function PollutantGrid({ pollutants = {} }) {
  const items = Object.entries(pollutants);

  if (!items.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5">
      {items.map(([key, data]) => {
        const ratio = data.value / (data.maxSafe || 1);
        let statusColor = 'text-emerald-500';
        let barColor = 'bg-emerald-500';
        let statusLabel = 'Safe';

        if (ratio > 2.5) {
          statusColor = 'text-rose-500';
          barColor = 'bg-rose-500';
          statusLabel = 'Hazardous';
        } else if (ratio > 1.2) {
          statusColor = 'text-amber-500';
          barColor = 'bg-amber-500';
          statusLabel = 'Elevated';
        }

        const barPct = Math.min(100, Math.round((data.value / (data.maxSafe * 3)) * 100));

        return (
          <Card key={key} className="p-4 relative group" hover={true}>
            <div className="flex items-start justify-between gap-1 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {data.name.split('(')[0]}
                </span>
                <Tooltip text={data.risk || data.name} position="top">
                  <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </Tooltip>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>
                {statusLabel}
              </span>
            </div>

            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                {data.value}
              </span>
              <span className="text-[11px] font-medium text-slate-400">{data.unit}</span>
            </div>

            {/* WHO Guideline Progress bar */}
            <div className="mt-2.5">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>WHO Safe: {data.maxSafe} {data.unit}</span>
                <span className="font-mono">{Math.round(ratio * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${barColor}`} 
                  style={{ width: `${barPct}%` }}
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
