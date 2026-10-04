import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Shield, Award, Sparkles, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-emerald-500/10 bg-white/40 dark:bg-[#070e0b]/80 backdrop-blur-md pt-12 pb-20 md:pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-glow-emerald">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-xl text-slate-900 dark:text-white">
                EcoSphere
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Understand live atmospheric metrics, simulate radical climate scenarios, quantify your personal footprint, and commit to verifiable high-impact climate pledges.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Open-Meteo & CAMS Live Data
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-500">
                Default: Delhi, India (INR)
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/dashboard" className="hover:text-emerald-500 transition-colors">Live Dashboard & AQI</Link></li>
              <li><Link to="/calculator" className="hover:text-emerald-500 transition-colors">Carbon Calculator</Link></li>
              <li><Link to="/whatif" className="hover:text-emerald-500 transition-colors">SCENARIO Simulator</Link></li>
              <li><Link to="/actions" className="hover:text-emerald-500 transition-colors">Action Plan & Badges</Link></li>
              <li><Link to="/learn" className="hover:text-emerald-500 transition-colors">Learn & Climate FAQs</Link></li>
            </ul>
          </div>

          {/* Model & Research Attribution */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Scientific Basis
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 leading-normal">
              <li>Emission factors calibrated to Indian Central Electricity Authority & GHG Protocol.</li>
              <li>Scenarios modeled on urban heat island & aerosol physics research.</li>
              <li>Tree absorption standard: ~21 kg CO2e / mature tree / year.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <span>Built with precision for climate action • EcoSphere 2026</span>
          </div>
          <div>
            <span>100% Free • No API Key required • Client-side privacy guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
