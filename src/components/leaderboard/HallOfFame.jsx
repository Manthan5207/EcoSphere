import React from 'react';
import { Card } from '../common/Card';
import { Crown, Sparkles, MapPin, Trophy, Calendar } from 'lucide-react';

export default function HallOfFame({ records = [] }) {
  return (
    <Card className="p-6 space-y-4" hover={false}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
            <Crown className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-black text-slate-900 dark:text-white">
              Hall of Fame Champions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Honoring past weekly season winners across India
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
          Last 8 Seasons
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
        {records.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-[#0D1B1E] dark:to-[#091417] border border-slate-200/80 dark:border-emerald-500/20 shadow-sm space-y-2 relative overflow-hidden"
          >
            {/* Top Season Date Tag */}
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                {item.weekId}
              </span>
              <span>{item.weekLabel?.split('–')[0]}</span>
            </div>

            {/* Winner Identity */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 font-heading font-black text-xs flex items-center justify-center shrink-0 border border-amber-400/40">
                {item.initials || 'EC'}
              </div>
              <div className="min-w-0">
                <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white truncate">
                  {item.winnerName}
                </h4>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{item.city}</span>
                </span>
              </div>
            </div>

            {/* Winning Points */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Winning Score:</span>
              <span className="font-heading font-black text-amber-500 font-mono">
                {item.points} pts
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
