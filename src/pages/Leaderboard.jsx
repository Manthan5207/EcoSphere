import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  Filter, 
  MapPin, 
  Flame, 
  ArrowUpRight,
  ShieldCheck,
  User,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLeaderboardStore } from '../store/useLeaderboardStore';
import { useAuthStore } from '../store/useAuthStore';
import { getWeekRange, getTimeLeftInWeek, getWeekId } from '../utils/week';
import { computeRanking } from '../utils/leaderboard';

// Subcomponents
import Podium from '../components/leaderboard/Podium';
import LeaderboardList from '../components/leaderboard/LeaderboardList';
import UserProgressCard from '../components/leaderboard/UserProgressCard';
import PointsBreakdownChart from '../components/leaderboard/PointsBreakdownChart';
import PointsRulesModal from '../components/leaderboard/PointsRulesModal';
import WeekEndedModal from '../components/leaderboard/WeekEndedModal';
import HallOfFame from '../components/leaderboard/HallOfFame';
import WinnerBanner from '../components/leaderboard/WinnerBanner';
import DemoToolsDrawer from '../components/leaderboard/DemoToolsDrawer';

export default function Leaderboard() {
  const { 
    players, 
    syncCurrentUser, 
    checkWeekRollover, 
    hallOfFame, 
    showWeekEndedModal, 
    closeWeekEndedModal, 
    lastFinalizedWinner 
  } = useLeaderboardStore();
  const { user, profile } = useAuthStore();

  const [timeframe, setTimeframe] = useState('this-week'); // 'this-week' | 'all-time' | 'last-week'
  const [scope, setScope] = useState('global'); // 'global' | 'city' | 'friends'
  const [category, setCategory] = useState('overall'); // 'overall' | 'transport' | 'energy' | 'food' | 'waste'
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeftInWeek());

  const currentWeekInfo = getWeekRange();
  const userCity = profile?.homeCity?.name || 'Delhi';
  const userUid = user?.uid || null;

  // Sync user and check week rollover on mount
  useEffect(() => {
    syncCurrentUser();
    checkWeekRollover();

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeftInWeek());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Compute live ranking based on current filters
  const rankedPlayers = computeRanking(
    players,
    scope,
    category,
    timeframe,
    userCity,
    userUid
  );

  const topThree = rankedPlayers.slice(0, 3);
  const currentUserRow = rankedPlayers.find(p => p.isCurrentUser || p.uid === userUid);
  const userRank = currentUserRow ? currentUserRow.rank : null;
  const userScore = currentUserRow ? (currentUserRow.displayScore || currentUserRow.weeklyPoints || 0) : 0;
  
  // Benchmark targets for progress card
  const nextRankRow = userRank && userRank > 1 ? rankedPlayers[userRank - 2] : null;
  const nextRankScore = nextRankRow ? (nextRankRow.displayScore || nextRankRow.weeklyPoints || 0) : userScore + 30;
  const top3Score = rankedPlayers[2] ? (rankedPlayers[2].displayScore || rankedPlayers[2].weeklyPoints || 0) : 410;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-6 pb-28">
      {/* 1. Winner Banner */}
      <WinnerBanner />

      {/* 2. Header & Live Countdown Card */}
      <div className="glass-card p-5 sm:p-8 rounded-3xl border border-white/60 dark:border-emerald-500/20 relative overflow-hidden shadow-floating-hero">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1.5 uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 fill-amber-400" />
                <span>Weekly Season {getWeekId()}</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ({currentWeekInfo.formatted})
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
              Weekly Sustainability Leaderboard
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span>🏆 Season prize: #1 Champion is awarded the exclusive <strong>Planet Hero</strong> badge!</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            {/* Countdown Badge */}
            <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500 animate-pulse" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Ends In</span>
                <span className="font-heading font-black text-xs sm:text-sm text-slate-900 dark:text-white font-mono">
                  {timeLeft.formatted}
                </span>
              </div>
            </div>

            {/* How points work button */}
            <button
              onClick={() => setRulesModalOpen(true)}
              className="px-4 py-2 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>How Points Work</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Top 3 Champions Podium (shown in 'this-week' or 'last-week') */}
      {timeframe !== 'all-time' && topThree.length >= 3 && (
        <Podium topThree={topThree} />
      )}

      {/* 4. Controls: Timeframe Tabs & Scope/Category Filters */}
      <div className="glass-card p-4 rounded-2xl border border-white/60 dark:border-emerald-500/20 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Timeframe Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl w-full sm:w-auto">
            {[
              { id: 'this-week', label: 'This Week' },
              { id: 'all-time', label: 'All Time' },
              { id: 'last-week', label: 'Last Week' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTimeframe(tab.id)}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-heading font-bold transition-all ${
                  timeframe === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scope Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar w-full sm:w-auto">
            {[
              { id: 'global', label: '🌏 Global' },
              { id: 'city', label: `📍 My City (${userCity})` },
              { id: 'friends', label: '👥 Friends & Peers' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setScope(s.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap border ${
                  scope === s.id
                    ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-white border-transparent'
                    : 'bg-white/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 no-scrollbar">
          <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Category:</span>
          </span>
          {[
            { id: 'overall', label: 'Overall Total' },
            { id: 'transport', label: '🚗 Transport' },
            { id: 'energy', label: '⚡ Energy' },
            { id: 'food', label: '🥗 Food' },
            { id: 'waste', label: '♻️ Waste' },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                category === c.id
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Main Content: Ranked List Column + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Ranked Players List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              {timeframe === 'this-week' ? 'Active Contenders (#4 & Down)' : 'Ranked Participants'}
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              {rankedPlayers.length} competitors active
            </span>
          </div>

          <LeaderboardList
            rankedPlayers={rankedPlayers}
            currentUserId={userUid}
            startIndex={timeframe === 'this-week' && topThree.length >= 3 ? 3 : 0}
          />
        </div>

        {/* Right Column: User Progress & Breakdown Sidebar */}
        <div className="lg:col-span-4 space-y-5">
          {user ? (
            <UserProgressCard
              userRank={userRank || 4}
              userScore={userScore}
              nextRankScore={nextRankScore}
              top3Score={top3Score}
            />
          ) : (
            <div className="p-5 rounded-3xl glass-card border border-emerald-500/30 text-center space-y-3 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Join the Competition
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Log in or try the Demo Account to participate, log daily habits, and climb toward the Planet Hero crown!
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs shadow-glow-emerald transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Log in to Compete</span>
              </Link>
            </div>
          )}

          {/* Point Activity Breakdown */}
          <PointsBreakdownChart
            breakdown={currentUserRow?.categoryBreakdown || { transport: 40, energy: 30, food: 30, waste: 20 }}
          />

          {/* Quick Green Choice Hint */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pro Tip: Daily Green Choices</span>
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Log up to 3 daily choices (public transit, plant-based meal, zero plastic) on the Dashboard for +45 Eco Points/day.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Hall of Fame Champions Gallery */}
      <HallOfFame records={hallOfFame} />

      {/* 7. Sticky Bottom "Your Rank" Bar */}
      {user && currentUserRow && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0D1B1E]/95 backdrop-blur-md border-t border-emerald-500/30 px-4 py-2.5 shadow-2xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-heading font-bold text-xs flex items-center justify-center border border-white">
                #{userRank}
              </div>
              <div>
                <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                  {currentUserRow.name} (Your Rank)
                </span>
                <span className="text-[10px] text-slate-400">
                  {userScore} Eco Points this season • {userCity}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/actions"
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
              >
                Pledge +20 pts
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modals & Demo Controls */}
      <PointsRulesModal
        isOpen={rulesModalOpen}
        onClose={() => setRulesModalOpen(false)}
      />

      <WeekEndedModal
        isOpen={showWeekEndedModal}
        onClose={closeWeekEndedModal}
        winner={lastFinalizedWinner || hallOfFame[0]}
        userRank={userRank || 4}
        userPoints={userScore}
      />

      <DemoToolsDrawer />
    </div>
  );
}
