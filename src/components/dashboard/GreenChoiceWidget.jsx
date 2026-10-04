import React from 'react';
import { Card } from '../common/Card';
import { GREEN_CHOICES } from '../../data/points';
import { useLeaderboardStore } from '../../store/useLeaderboardStore';
import { useToast } from '../common/Toast';
import { Leaf, Check, Sparkles } from 'lucide-react';

export default function GreenChoiceWidget() {
  const { addPoints, events } = useLeaderboardStore();
  const { addToast } = useToast();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayEvents = (events || []).filter(e => e.timestamp?.startsWith(todayStr) && e.type === 'greenChoice');
  const loggedChoiceIds = todayEvents.map(e => e.actionId);

  const handleLogChoice = (choice) => {
    if (loggedChoiceIds.includes(choice.id)) {
      addToast({ message: 'You already logged this green choice today!', type: 'info' });
      return;
    }

    if (loggedChoiceIds.length >= 3) {
      addToast({ message: 'Daily limit reached (max 3 green choices / day)!', type: 'warning' });
      return;
    }

    const res = addPoints('greenChoice', choice.id, choice.points, choice.category, choice.label);
    if (res.success) {
      addToast({ message: `+${choice.points} Eco Points! Logged "${choice.label}" 🌿`, type: 'success' });
    } else {
      addToast({ message: res.reason || 'Could not add points.', type: 'warning' });
    }
  };

  return (
    <Card className="p-5 border-emerald-500/20" hover={false}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Leaf className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              Log Today's Green Choice
            </h3>
            <p className="text-[11px] text-slate-400">
              Earn +15 Eco Points each (Logged: {loggedChoiceIds.length}/3 today)
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
          +15 pts / choice
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {GREEN_CHOICES.map((choice) => {
          const isDone = loggedChoiceIds.includes(choice.id);

          return (
            <button
              key={choice.id}
              onClick={() => handleLogChoice(choice)}
              disabled={isDone || loggedChoiceIds.length >= 3}
              type="button"
              className={`p-3 rounded-2xl text-left border transition-all flex items-center justify-between gap-2 ${
                isDone
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-800 dark:text-emerald-200 cursor-default'
                  : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-50/50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base">{choice.icon}</span>
                <span className="text-xs font-semibold truncate">{choice.label}</span>
              </div>

              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                isDone ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-300 dark:border-slate-700'
              }`}>
                {isDone && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
