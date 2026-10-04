import React from 'react';
import { Crown, Sparkles, X, Trophy } from 'lucide-react';
import { useLeaderboardStore } from '../../store/useLeaderboardStore';

export default function WinnerBanner({ className = '' }) {
  const { lastWeekPodium, dismissedWinnerBanner, dismissWinnerBanner } = useLeaderboardStore();

  if (dismissedWinnerBanner || !lastWeekPodium?.winner) return null;

  const winner = lastWeekPodium.winner;

  return (
    <div className={`p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-teal-500/10 border border-amber-500/30 text-slate-800 dark:text-slate-100 flex items-center justify-between gap-3 shadow-sm backdrop-blur-md ${className}`}>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
          <Trophy className="w-4 h-4 fill-slate-950" />
        </div>
        <div className="text-xs sm:text-sm">
          <span className="font-heading font-black text-amber-600 dark:text-amber-400 mr-1.5">
            🏆 Last Season's Champion:
          </span>
          <span>
            <strong>{winner.name || winner.winnerName}</strong> ({winner.city}) with{' '}
            <strong className="text-emerald-600 dark:text-emerald-400">{winner.points || winner.weeklyPoints} pts</strong>!
          </span>
          <span className="hidden sm:inline text-slate-500 dark:text-slate-400 ml-1">
            New season is live — complete actions to climb the ranks.
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={dismissWinnerBanner}
        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        title="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
