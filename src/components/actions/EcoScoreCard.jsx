import React from 'react';
import { Card } from '../common/Card';
import { ProgressRing } from '../common/ProgressRing';
import { BADGES } from '../../data/actions';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Globe, 
  HeartHandshake, 
  CheckCircle2, 
  Lock, 
  Calendar,
  Crown,
  Trophy,
  Award
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useLeaderboardStore } from '../../store/useLeaderboardStore';
import { useToast } from '../common/Toast';

const badgeIcons = {
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Globe,
  Flame,
  Crown,
  Trophy,
  Award
};

export function EcoScoreCard() {
  const { ecoScore, badges, streak, incrementStreak } = useStore();
  const { addPoints } = useLeaderboardStore();
  const { addToast } = useToast();

  const handleDailyCheckin = () => {
    incrementStreak();
    const res = addPoints('dailyCheckin', `checkin-${new Date().toISOString().split('T')[0]}`, 5, 'overall', 'Daily Check-in');
    if (res.success) {
      addToast({ message: 'Daily streak recorded! +5 Eco Points earned 🌿', type: 'success' });
    } else {
      addToast({ message: 'Daily Sustainable Living streak recorded! +1 to streak', type: 'success' });
    }
  };

  return (
    <Card className="p-6" hover={false}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        {/* Eco Score Circular Gauge */}
        <div className="flex items-center gap-5">
          <ProgressRing value={ecoScore} max={100} size={110} color="#10B981">
            <span className="text-3xl font-heading font-black text-slate-900 dark:text-white">
              {ecoScore}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Eco Score</span>
          </ProgressRing>

          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-heading font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                Lifestyle Sustainability Rating
              </span>
            </div>
            <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
              {ecoScore >= 80 ? '🌿 Planetary Champion' : ecoScore >= 60 ? '🌱 Active Eco Guardian' : '⚡ Eco Explorer'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Score improves as you pledge actions, cut footprint, and build daily habits.
            </p>
          </div>
        </div>

        {/* Streak Counter & Daily Check-in */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-emerald-500/20 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-heading font-black text-slate-900 dark:text-white">
                {streak} Days
              </span>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Eco Streak</span>
            </div>
          </div>

          <button
            onClick={handleDailyCheckin}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-heading font-semibold shadow-glow-emerald transition-all active:scale-95 whitespace-nowrap"
          >
            Daily Check-In
          </button>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="mt-6">
        <h4 className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
          Earned & Available Eco Badges
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {BADGES.map((b) => {
            const Icon = badgeIcons[b.icon] || Sparkles;
            const isUnlocked = badges.includes(b.id);

            return (
              <div
                key={b.id}
                className={`p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                  isUnlocked
                    ? `${b.color} shadow-sm`
                    : 'bg-slate-50/50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800 opacity-50'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${isUnlocked ? 'bg-white/80 dark:bg-slate-900/80 shadow-sm' : 'bg-slate-200 dark:bg-slate-800'}`}>
                  {isUnlocked ? <Icon className="w-4 h-4" /> : <Lock className="w-4 h-4 text-slate-400" />}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-heading font-bold text-slate-900 dark:text-white block truncate">
                    {b.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                    {b.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export function OffsetCalculator({ footprintTotal = 2600 }) {
  const [treesToPlant, setTreesToPlant] = React.useState(Math.round(footprintTotal / 21));
  const offsetKg = treesToPlant * 21;
  const offsetPct = Math.round((offsetKg / (footprintTotal || 1)) * 100);

  return (
    <Card className="p-6" hover={false}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
            🌳 Tree Offset Calculator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A single mature native tree absorbs ~21 kg CO₂e every year throughout its lifetime.
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
          Nature-Based Offsets
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 items-center">
        <div>
          <label className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">
            Trees You Intend to Plant
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="200"
              value={treesToPlant}
              onChange={(e) => setTreesToPlant(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <span className="text-xl font-heading font-black text-emerald-600 dark:text-emerald-400 font-mono w-12 text-right">
              {treesToPlant}
            </span>
          </div>
        </div>

        <div className="text-center md:border-l md:border-r border-slate-200 dark:border-slate-800 py-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Annual Absorption</span>
          <div className="text-2xl font-heading font-black text-slate-900 dark:text-white">
            {offsetKg.toLocaleString()} <span className="text-xs font-normal text-slate-400">kg CO₂/yr</span>
          </div>
        </div>

        <div className="text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Footprint Offset</span>
          <div className="text-2xl font-heading font-black text-emerald-600 dark:text-emerald-400">
            {offsetPct}% <span className="text-xs font-normal text-slate-400">of your total</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
