import React from 'react';
import { Card } from '../common/Card';
import { Trophy, ArrowUpRight, Flame, Target, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserProgressCard({ userRank = 4, userScore = 120, nextRankScore = 150, top3Score = 410 }) {
  const pointsToNext = Math.max(0, nextRankScore - userScore);
  const pointsToTop3 = Math.max(0, top3Score - userScore);
  const progressToTop3 = Math.min(100, Math.round((userScore / (top3Score || 1)) * 100));

  return (
    <Card className="p-5 space-y-4 border-emerald-500/30" hover={false}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              Your Season Standing
            </h3>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Weekly Eco League</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-heading font-black text-emerald-600 dark:text-emerald-400">
            #{userRank}
          </span>
          <span className="text-[10px] text-slate-400 block font-medium">Global Rank</span>
        </div>
      </div>

      {/* Points & Next Rank Target */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Weekly Points</span>
          <span className="text-lg font-heading font-black text-slate-900 dark:text-white">
            {userScore} <span className="text-xs font-normal text-slate-400">pts</span>
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">To Next Rank</span>
          <span className="text-lg font-heading font-black text-amber-500">
            +{pointsToNext} <span className="text-xs font-normal text-slate-400">pts</span>
          </span>
        </div>
      </div>

      {/* Progress towards Top 3 Podium */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-amber-500" />
            <span>Path to Podium (#3: {top3Score} pts)</span>
          </span>
          <span className="font-bold text-slate-900 dark:text-white">{progressToTop3}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-700"
            style={{ width: `${progressToTop3}%` }}
          />
        </div>
        <span className="text-[10px] text-slate-400 block text-right">
          {pointsToTop3 > 0 ? `${pointsToTop3} pts needed for Top 3 badge` : '🎉 You are in the Top 3!'}
        </span>
      </div>

      {/* Quick Action Link */}
      <div className="pt-2">
        <Link
          to="/actions"
          className="w-full py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-between transition-colors"
        >
          <span>Pledge a green action for +20 pts</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </Card>
  );
}
