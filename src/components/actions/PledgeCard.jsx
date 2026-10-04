import React from 'react';
import { Card } from '../common/Card';
import { 
  Train, 
  Users, 
  Zap, 
  Bike, 
  ThermometerSnowflake, 
  Lightbulb, 
  SunMedium, 
  PowerOff, 
  Salad, 
  Apple, 
  ShoppingBag, 
  Recycle, 
  ShieldCheck, 
  Sparkles, 
  TreePine,
  Check,
  TrendingDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLeaderboardStore } from '../../store/useLeaderboardStore';
import { useToast } from '../common/Toast';
import { POINT_VALUES } from '../../data/points';

const iconMap = {
  Train,
  Users,
  Zap,
  Bike,
  ThermometerSnowflake,
  Lightbulb,
  SunMedium,
  PowerOff,
  Salad,
  Apple,
  ShoppingBag,
  Recycle,
  ShieldCheck,
  Sparkles,
  TreePine
};

export function PledgeCard({ action, isPledged, onToggle }) {
  const Icon = iconMap[action.icon] || Sparkles;
  const { addPoints } = useLeaderboardStore();
  const { addToast } = useToast();

  const handleToggle = () => {
    if (!isPledged) {
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.8 },
          colors: ['#10B981', '#38BDF8', '#F59E0B']
        });
      } catch (e) {}

      // Calculate points by difficulty
      const pts = action.difficulty === 'Hard' ? 30 : action.difficulty === 'Medium' ? 20 : 10;
      const res = addPoints('pledge', action.id, pts, action.category || 'overall', action.title);
      if (res.success) {
        addToast({ message: `+${pts} Eco Points! Pledged "${action.title}" 🌿`, type: 'success' });
      }
    }
    onToggle(action.id);
  };

  const difficultyColors = {
    Easy: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    Hard: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
  };

  return (
    <Card 
      className={`p-5 relative transition-all border ${
        isPledged 
          ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/40 shadow-glow-emerald/20' 
          : 'border-slate-200 dark:border-slate-800'
      }`}
      hover={true}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`p-3 rounded-2xl shrink-0 transition-colors ${
            isPledged ? 'bg-emerald-500 text-white shadow-glow-emerald' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}>
            <Icon className="w-5 h-5" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${difficultyColors[action.difficulty]}`}>
                {action.difficulty}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                {action.category}
              </span>
            </div>

            <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">
              {action.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {action.description}
            </p>
          </div>
        </div>

        {/* Big Checkbox Button */}
        <button
          onClick={handleToggle}
          type="button"
          className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-xl border transition-all ${
            isPledged
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-glow-emerald scale-105'
              : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-800'
          }`}
          aria-label={isPledged ? 'Unpledge action' : 'Pledge to do this'}
        >
          {isPledged && <Check className="w-5 h-5 stroke-[3]" />}
        </button>
      </div>

      {/* Footer with Impact & Tip */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
          <TrendingDown className="w-4 h-4" />
          <span>Saves {action.kgSavedPerYear} kg CO₂e / yr</span>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
          💡 {action.tip}
        </span>
      </div>
    </Card>
  );
}

export function PledgeSummary({ totalKgSaved }) {
  const treesEquivalent = Math.round(totalKgSaved / 21);
  const kmAvoided = Math.round(totalKgSaved / 0.17);
  const phoneCharges = Math.round(totalKgSaved * 122);

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#0B1410] to-[#042f2e] text-white shadow-2xl border border-emerald-500/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 block mb-1">
            Verified Climate Pledge Impact
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight">
              {totalKgSaved.toLocaleString()}
            </span>
            <span className="text-lg font-semibold text-emerald-300">kg CO₂e / yr Saved</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            By fulfilling your active pledges, you prevent over {(totalKgSaved / 1000).toFixed(2)} tonnes of direct emissions from entering the atmosphere.
          </p>
        </div>

        {/* Equivalency Tiles */}
        <div className="grid grid-cols-3 gap-2.5 w-full lg:w-auto">
          <div className="bg-slate-900/60 p-3 rounded-2xl border border-emerald-500/20 text-center">
            <span className="text-xl sm:text-2xl block mb-0.5">🌳</span>
            <span className="text-sm sm:text-base font-heading font-bold text-white block">
              {treesEquivalent}
            </span>
            <span className="text-[10px] text-slate-400 block uppercase">Trees Planted</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-2xl border border-emerald-500/20 text-center">
            <span className="text-xl sm:text-2xl block mb-0.5">🚗</span>
            <span className="text-sm sm:text-base font-heading font-bold text-white block">
              {kmAvoided.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 block uppercase">Car km Avoided</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-2xl border border-emerald-500/20 text-center">
            <span className="text-xl sm:text-2xl block mb-0.5">⚡</span>
            <span className="text-sm sm:text-base font-heading font-bold text-white block">
              {phoneCharges.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 block uppercase">Phone Charges</span>
          </div>
        </div>
      </div>
    </div>
  );
}
