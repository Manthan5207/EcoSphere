import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ACTIONS } from '../data/actions';
import { PledgeCard, PledgeSummary } from '../components/actions/PledgeCard';
import { EcoScoreCard, OffsetCalculator } from '../components/actions/EcoScoreCard';
import ShareModal from '../components/common/ShareModal';
import { 
  CheckSquare, 
  Share2, 
  Sparkles, 
  Calculator, 
  Filter, 
  ArrowRight,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

export default function ActionPlan() {
  const { footprint, pledges, togglePledge, location } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Rank actions: Prioritize categories where user emits the most
  const sortedCategories = [
    { cat: 'transport', val: footprint.transport || 1020 },
    { cat: 'energy', val: footprint.energy || 850 },
    { cat: 'food', val: footprint.food || 620 },
    { cat: 'waste', val: (footprint.shopping || 300) + (footprint.waste || 0) }
  ].sort((a, b) => b.val - a.val);

  const topCategory = sortedCategories[0]?.cat || 'transport';

  // Sort actions: top category actions first, then by kgSavedPerYear descending
  const rankedActions = [...ACTIONS].sort((a, b) => {
    if (a.category === topCategory && b.category !== topCategory) return -1;
    if (b.category === topCategory && a.category !== topCategory) return 1;
    return b.kgSavedPerYear - a.kgSavedPerYear;
  });

  const filteredActions = selectedCategory === 'all'
    ? rankedActions
    : rankedActions.filter(a => a.category === selectedCategory);

  // Compute total pledged kg
  const totalPledgedKg = ACTIONS
    .filter(a => pledges.includes(a.id))
    .reduce((sum, a) => sum + a.kgSavedPerYear, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      {/* Title & Share Action Button */}
      <div className="pb-2 border-b border-emerald-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
              Personalized Climate Action Plan
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              Ranked by ROI
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Targeting your top emission sector (<strong>{topCategory.toUpperCase()}</strong>) with verified high-leverage lifestyle interventions
          </p>
        </div>

        <button
          onClick={() => setShareModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs sm:text-sm shadow-glow-emerald transition-all active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          <span>Export Eco Share Card</span>
        </button>
      </div>

      {/* 1. Verified Pledge Summary Banner */}
      <PledgeSummary totalKgSaved={totalPledgedKg} />

      {/* 2. Eco Score & Gamified Badges Strip */}
      <EcoScoreCard />

      {/* 3. Filter Category Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
            Pledge Commitments ({pledges.length}/{ACTIONS.length} Active)
          </h3>
          <p className="text-xs text-slate-400">Tick pledges to unlock badges and expand your savings</p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar w-full sm:w-auto">
          {['all', 'transport', 'energy', 'food', 'waste'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Actions' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActions.map((action) => (
          <PledgeCard
            key={action.id}
            action={action}
            isPledged={pledges.includes(action.id)}
            onToggle={togglePledge}
          />
        ))}
      </div>

      {/* 5. Tree Offset Calculator */}
      <OffsetCalculator footprintTotal={footprint.total || 2600} />

      <ShareModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} />
    </div>
  );
}
