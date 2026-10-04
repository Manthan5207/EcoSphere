import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { SCENARIOS } from '../../data/scenarios';
import { BookOpen, Sparkles, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

export default function WhyExplainer({ activeScenarios = [] }) {
  const activeObjs = SCENARIOS.filter(s => activeScenarios.includes(s.id));

  return (
    <div className="space-y-4">
      <Card className="p-6 border-emerald-500/20" hover={false}>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
            Scientific Analysis: Why This Happens
          </h3>
        </div>

        {activeObjs.length > 0 ? (
          <div className="space-y-4">
            {activeObjs.map((sc) => (
              <div key={sc.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sc.color }}></span>
                  <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">
                    {sc.name}: {sc.tagline}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {sc.whyText}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
            <Info className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select one or more scenario chips above to unlock deep atmospheric physics & ecological breakdown.
            </p>
          </div>
        )}

        {/* Action Plan Bridge CTA */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-heading font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              Turn Simulation Into Reality
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Choose personalized lifestyle and community actions to cut emissions in your city.
            </p>
          </div>

          <Link
            to="/actions"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-sm shadow-glow-emerald transition-all active:scale-95 whitespace-nowrap"
          >
            <span>What Can I Do? (Action Plan)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Card>

      {/* Model Disclaimer line (Required in Section 4) */}
      <p className="text-center text-[11px] text-slate-400 italic">
        * Illustrative model based on simplified research averages (IPCC, CPCB, and urban climatology models).
      </p>
    </div>
  );
}
