import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Crown, Sparkles, Flame, MapPin } from 'lucide-react';

export default function Podium({ topThree = [] }) {
  const first = topThree[0] || { name: 'Player 1', displayScore: 0, city: 'Delhi', initials: 'P1' };
  const second = topThree[1] || { name: 'Player 2', displayScore: 0, city: 'Mumbai', initials: 'P2' };
  const third = topThree[2] || { name: 'Player 3', displayScore: 0, city: 'Bengaluru', initials: 'P3' };

  useEffect(() => {
    // Fire lightweight confetti burst on load
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.3 },
        colors: ['#10B981', '#38BDF8', '#F59E0B', '#34D399']
      });
    } catch (e) {}
  }, []);

  return (
    <div className="relative pt-6 pb-2 px-2 max-w-2xl mx-auto">
      <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end justify-center">
        {/* 2nd Place (Silver) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col items-center text-center"
        >
          {/* Avatar & Rank badge */}
          <div className="relative mb-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-800 text-white font-heading font-black text-lg flex items-center justify-center border-2 border-slate-300 shadow-md">
              {second.initials || '2'}
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-300 text-slate-800 font-heading font-black text-xs flex items-center justify-center shadow">
              2
            </span>
          </div>

          <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate max-w-[95px] sm:max-w-[130px] block">
            {second.name}
          </span>
          <span className="text-[10px] text-slate-400 flex items-center justify-center gap-0.5 mt-0.5">
            <MapPin className="w-2.5 h-2.5" />
            <span>{second.city}</span>
          </span>

          <div className="font-heading font-black text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-1">
            {second.displayScore || second.weeklyPoints || 0} <span className="text-[10px] font-normal text-slate-400">pts</span>
          </div>

          {/* Podium Pillar */}
          <div className="w-full h-24 sm:h-28 rounded-t-2xl bg-gradient-to-t from-slate-200 to-slate-100 dark:from-slate-800/90 dark:to-slate-700/60 border-t border-l border-r border-slate-300/50 dark:border-slate-600/50 mt-2 flex items-center justify-center shadow-sm">
            <span className="font-heading font-black text-2xl text-slate-400/40">2</span>
          </div>
        </motion.div>

        {/* 1st Place (Gold Champion) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center -mt-6"
        >
          {/* Floating Gold Crown */}
          <motion.div 
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-1 text-amber-500"
          >
            <Crown className="w-7 h-7 sm:w-8 sm:h-8 fill-amber-400 text-amber-500 filter drop-shadow-md" />
          </motion.div>

          {/* Avatar & Rank 1 badge */}
          <div className="relative mb-2">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-slate-950 text-amber-400 font-heading font-black text-2xl flex items-center justify-center border-4 border-amber-400 shadow-glow-amber">
              {first.initials || '1'}
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-heading font-black text-xs flex items-center justify-center shadow-md">
              1
            </span>
          </div>

          <span className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white truncate max-w-[110px] sm:max-w-[150px] block">
            {first.name}
          </span>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center justify-center gap-0.5 mt-0.5">
            <Sparkles className="w-3 h-3" />
            <span>{first.city}</span>
          </span>

          <div className="font-heading font-black text-base sm:text-lg text-emerald-600 dark:text-emerald-400 mt-1">
            {first.displayScore || first.weeklyPoints || 0} <span className="text-xs font-normal text-slate-400">pts</span>
          </div>

          {/* Podium Pillar */}
          <div className="w-full h-32 sm:h-36 rounded-t-2xl bg-gradient-to-t from-amber-400/20 via-amber-300/30 to-amber-200/40 dark:from-amber-950/40 dark:via-amber-900/30 dark:to-amber-800/30 border-t-2 border-l border-r border-amber-400/60 mt-2 flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none"></div>
            <span className="font-heading font-black text-3xl text-amber-500/40">1</span>
          </div>
        </motion.div>

        {/* 3rd Place (Bronze) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center text-center"
        >
          {/* Avatar & Rank badge */}
          <div className="relative mb-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-800 text-white font-heading font-black text-lg flex items-center justify-center border-2 border-amber-700 shadow-md">
              {third.initials || '3'}
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-700 text-white font-heading font-black text-xs flex items-center justify-center shadow">
              3
            </span>
          </div>

          <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate max-w-[95px] sm:max-w-[130px] block">
            {third.name}
          </span>
          <span className="text-[10px] text-slate-400 flex items-center justify-center gap-0.5 mt-0.5">
            <MapPin className="w-2.5 h-2.5" />
            <span>{third.city}</span>
          </span>

          <div className="font-heading font-black text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-1">
            {third.displayScore || third.weeklyPoints || 0} <span className="text-[10px] font-normal text-slate-400">pts</span>
          </div>

          {/* Podium Pillar */}
          <div className="w-full h-18 sm:h-20 rounded-t-2xl bg-gradient-to-t from-amber-900/15 to-amber-800/10 dark:from-amber-950/40 dark:to-amber-900/20 border-t border-l border-r border-amber-700/40 mt-2 flex items-center justify-center shadow-sm">
            <span className="font-heading font-black text-2xl text-amber-800/40">3</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
