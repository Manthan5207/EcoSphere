import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Crown, Sparkles, Award, ArrowRight, X } from 'lucide-react';

export default function WeekEndedModal({ isOpen, onClose, winner, userRank = 4, userPoints = 120 }) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.4 },
          colors: ['#F59E0B', '#10B981', '#38BDF8', '#EC4899']
        });
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isUserWinner = userRank === 1;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card p-6 sm:p-8 rounded-3xl max-w-md w-full border-2 border-amber-400/50 shadow-2xl text-center space-y-6 relative overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Winner Icon & Crown */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center shadow-glow-amber mb-2">
              <Crown className="w-8 h-8 fill-slate-950" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Season Concluded
            </span>
            <h2 className="text-2xl font-heading font-black text-slate-900 dark:text-white mt-0.5">
              Weekly Winner Crowned!
            </h2>
          </div>

          {/* Champion Spotlight */}
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 text-left space-y-1">
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase block">
              1st Place • Planet Hero Champion
            </span>
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-lg text-slate-900 dark:text-white">
                {winner?.name || winner?.winnerName || 'Rohit Kulkarni'}
              </span>
              <span className="font-heading font-black text-base text-amber-500">
                {winner?.points || winner?.weeklyPoints || 470} pts
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">
              {winner?.city || 'Mumbai'} • Awarded the exclusive <strong>Planet Hero</strong> badge
            </span>
          </div>

          {/* User's Final Season Standing */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-left">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Your Season Result</span>
            <div className="flex items-center justify-between mt-1">
              <div>
                <span className="font-heading font-black text-xl text-emerald-600 dark:text-emerald-400">
                  Rank #{userRank}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  {userPoints} Eco Points earned
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  {userRank <= 3 ? '🏆 Top 3 Podium Badge' : userRank <= 10 ? '⭐ Top 10 Finisher' : '🌱 Active Participant'}
                </span>
                <span className="text-[10px] text-slate-400">Recorded to Hall of Fame</span>
              </div>
            </div>
          </div>

          {/* Start New Week CTA */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-heading font-bold text-sm shadow-glow-emerald flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Start New Weekly Season</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
