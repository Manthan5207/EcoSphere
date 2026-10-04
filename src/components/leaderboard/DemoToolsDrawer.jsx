import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Play, Plus, RefreshCw, X, FastForward, Sparkles } from 'lucide-react';
import { useLeaderboardStore } from '../../store/useLeaderboardStore';
import { useToast } from '../common/Toast';

export default function DemoToolsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { simulateDemoActivity, addDemoPointsToUser, finalizeCurrentWeek, resetLeaderboard } = useLeaderboardStore();
  const { addToast } = useToast();

  const handleSimulate = () => {
    simulateDemoActivity();
    addToast({ message: 'Simulated active gameplay points across 5 competitors!', type: 'info' });
  };

  const handleAddPoints = () => {
    addDemoPointsToUser(50);
    addToast({ message: '+50 Eco Points added to your row!', type: 'success' });
  };

  const handleEndWeek = () => {
    finalizeCurrentWeek();
    addToast({ message: 'Season finalized! Winner crowned and archived to Hall of Fame.', type: 'success' });
  };

  const handleReset = () => {
    resetLeaderboard();
    addToast({ message: 'Leaderboard reset to initial seed benchmark.', type: 'info' });
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-3 p-4 rounded-3xl glass-card border border-amber-500/40 shadow-2xl w-64 space-y-2.5 bg-white/95 dark:bg-[#0D1B1E]/95"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="font-heading font-black text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Judge Demo Sandbox
              </span>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleSimulate}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/15 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors text-left"
            >
              <Play className="w-3.5 h-3.5 text-emerald-500" />
              <span>Simulate Competitors</span>
            </button>

            <button
              onClick={handleAddPoints}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-500/15 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors text-left"
            >
              <Plus className="w-3.5 h-3.5 text-sky-500" />
              <span>+50 Pts to My Rank</span>
            </button>

            <button
              onClick={handleEndWeek}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/15 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors text-left"
            >
              <FastForward className="w-3.5 h-3.5 text-amber-500" />
              <span>End Week Now</span>
            </button>

            <button
              onClick={handleReset}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 transition-colors text-left"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Leaderboard</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-950 text-amber-400 font-heading font-bold text-xs shadow-2xl border border-amber-400/40 hover:scale-105 active:scale-95 transition-all"
        title="Open judges demo tools"
      >
        <Settings className="w-4 h-4 animate-spin-slow" />
        <span>Demo Controls</span>
      </button>
    </div>
  );
}
