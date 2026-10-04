import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShieldCheck, CheckCircle2, Trophy, HelpCircle } from 'lucide-react';
import { POINT_RULES_INFO } from '../../data/points';

export default function PointsRulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="glass-card p-6 sm:p-8 rounded-3xl max-w-xl w-full border border-emerald-500/30 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-black text-slate-900 dark:text-white">
                  How Eco Points Work
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fair, simple, and repeatable weekly sustainability rules
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Points Table */}
          <div className="space-y-2.5">
            {POINT_RULES_INFO.map((rule, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{rule.action}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{rule.freq}</p>
                </div>
                <span className="font-heading font-black text-sm px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
                  {rule.points}
                </span>
              </div>
            ))}
          </div>

          {/* Anti-cheat and Fair Play Notice */}
          <div className="p-4 rounded-2xl bg-sky-500/10 dark:bg-sky-950/30 border border-sky-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <div className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Fair Play & Weekly Season Reset</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-500 dark:text-slate-400">
              Each season runs from Monday 00:00 to Sunday 23:59. Duplicate action entries on the same calendar day are prevented, and weekly scoring is capped at 600 points.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs shadow-glow-emerald transition-all"
            >
              Got it, let's play!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
