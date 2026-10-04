import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';
import { X, Download, Share2, Sparkles, Leaf, Award, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useToast } from './Toast';

export default function ShareModal({ isOpen, onClose }) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const { footprint, ecoScore, location, pledges, badges } = useStore();
  const { addToast } = useToast();

  if (!isOpen) return null;

  const tonnes = ((footprint?.total || 2600) / 1000).toFixed(1);
  const totalPledgedKg = pledges.length * 240; // approx
  const treesEquivalent = Math.round(totalPledgedKg / 21);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `ecosphere-footprint-${location.name.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
      addToast({ message: 'Result card saved to your device!', type: 'success' });
    } catch (err) {
      console.error('Image export failed:', err);
      addToast({ message: 'Could not export card. Please try again.', type: 'error' });
    } finally {
      setDownloading(false);
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My EcoSphere Climate Footprint',
          text: `My annual carbon footprint in ${location.name} is ${tonnes} tonnes/yr with an Eco Score of ${ecoScore}/100 on EcoSphere!`,
          url: window.location.origin
        });
        addToast({ message: 'Shared successfully!', type: 'success' });
      } catch (e) {
        // user cancelled or share failed
      }
    } else {
      handleDownloadImage();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          className="relative max-w-md w-full bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl font-heading font-bold text-white mb-1">
            Share Your Climate Impact
          </h3>
          <p className="text-xs text-slate-400 mb-5">
            Download or share this verified eco credential with friends & colleagues.
          </p>

          {/* Exportable Card Node */}
          <div
            ref={cardRef}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#064E3B] via-[#0B1410] to-[#042f2e] border-2 border-emerald-400/30 shadow-2xl relative overflow-hidden"
          >
            {/* Background Glows */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-sky-500/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-emerald-400">EcoSphere</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">{location.name}, India</p>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Eco Score: {ecoScore}/100
              </div>
            </div>

            <div className="my-5 text-center relative z-10">
              <span className="text-[11px] uppercase tracking-widest text-emerald-300/80 font-semibold block mb-1">
                Annual Carbon Footprint
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-heading font-black text-white tracking-tight">
                  {tonnes}
                </span>
                <span className="text-sm font-medium text-emerald-300">tonnes CO₂e / yr</span>
              </div>
              <p className="text-xs text-emerald-200/70 mt-1">
                {tonnes <= 2.0 ? '🌟 Lower than Indian National Average (2.0t)' : '⚡ Active Climate Plan in Progress'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-500/20 relative z-10">
              <div className="bg-slate-950/40 p-2.5 rounded-xl border border-emerald-500/10">
                <span className="text-[10px] text-slate-400 uppercase block">Pledges Active</span>
                <span className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  {pledges.length} Pledges
                </span>
              </div>
              <div className="bg-slate-950/40 p-2.5 rounded-xl border border-emerald-500/10">
                <span className="text-[10px] text-slate-400 uppercase block">Trees Offset</span>
                <span className="text-sm font-bold text-teal-300 flex items-center gap-1 mt-0.5">
                  🌳 ~{treesEquivalent} Trees / yr
                </span>
              </div>
            </div>

            <div className="mt-4 pt-2 text-center text-[9px] text-slate-400">
              ecosphere.app • Understand • Simulate • Act
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleDownloadImage}
              disabled={downloading}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-bold text-sm shadow-glow-emerald transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {downloading ? 'Generating...' : 'Download Image'}
            </button>
            <button
              onClick={handleWebShare}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-heading font-semibold text-sm border border-slate-700 transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
