import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  Lightbulb, 
  ShieldAlert, 
  ExternalLink,
  Car,
  Zap,
  Utensils,
  Recycle,
  Trees
} from 'lucide-react';

const FAQs = [
  {
    q: 'Why is PM2.5 considered the most dangerous air pollutant in Indian cities?',
    a: 'PM2.5 particles have an aerodynamic diameter less than 2.5 microns (1/30th the thickness of a human hair). Unlike coarse dust, they bypass nasal mucosal filters, penetrating directly into the alveolar sacs of lungs and crossing into the bloodstream, triggering vascular inflammation and respiratory diseases.'
  },
  {
    q: 'How does raising my AC temperature from 18°C to 24°C make a difference?',
    a: 'Compressor thermodynamics require disproportionately higher electrical work for every degree below 24°C in tropical climates. Bureau of Energy Efficiency (BEE) data confirms that each 1°C increase saves 6% of power consumption, directly avoiding thermal coal power generation on the Indian grid.'
  },
  {
    q: 'What is the difference between direct and embodied carbon emissions?',
    a: 'Direct emissions (Scope 1) happen on-site, such as burning petrol in your car tank or cooking with LPG gas. Embodied emissions (Scope 3) represent the total greenhouse gas lifecycle required to extract raw materials, manufacture, pack, and transport products like clothes, electronics, and food to your doorstep.'
  },
  {
    q: 'How does planting trees lower urban temperatures?',
    a: 'Trees cool urban asphalt through two primary mechanisms: canopy shading (preventing concrete from absorbing solar heat flux) and evapotranspiration (trees release water vapor through leaf stomata, which consumes ambient heat energy to evaporate, creating natural microclimate cooling of 1.5°C–3°C).'
  }
];

const MYTHS = [
  {
    myth: 'Electric vehicles in India produce the same emissions as petrol cars due to coal electricity.',
    fact: 'FALSE. Even with India\'s current grid intensity (~0.71 kg CO₂e/kWh), an EV achieves ~0.08 kg CO₂/km compared to ~0.17 kg CO₂/km for petrol cars. EVs also produce zero ground-level toxic PM2.5 in residential city lanes.',
    category: 'Mobility'
  },
  {
    myth: 'Air purifiers completely protect you from outdoor pollution.',
    fact: 'PARTIALLY TRUE. HEPA purifiers filter indoor particulate matter, but cannot remove gases like CO or NO₂ without specialized carbon filters. Preventing emissions at the source remains essential.',
    category: 'Air Quality'
  },
  {
    myth: 'Recycling plastic eliminates its environmental footprint.',
    fact: 'FALSE. Most plastic can only be downcycled once or twice into lower-grade polymers before becoming microplastic. Refusing single-use plastics and extending product lifecycles is 10x more effective.',
    category: 'Waste'
  }
];

export default function Learn() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10">
      {/* Title */}
      <div className="pb-2 border-b border-emerald-500/10">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-500" />
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
            Ecological Knowledge & Climate Science
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Demystifying atmospheric metrics, urban heat island physics, and evidence-based personal habits.
        </p>
      </div>

      {/* 1. Myth vs Fact Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
            Climate Myths vs Scientific Facts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MYTHS.map((item, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between border-emerald-500/20" hover={true}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
                <h4 className="text-sm font-heading font-bold text-rose-600 dark:text-rose-400 mt-2.5">
                  ❌ Myth: "{item.myth}"
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold block mb-1">✅ Scientific Reality:</strong>
                  {item.fact}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 2. Interactive FAQ Accordion */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
            Frequently Asked Environmental Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQs.map((faq, idx) => {
            const isOpen = openFaq === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-emerald-500/20 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-sm sm:text-base font-heading font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Scientific Environmental Glossary */}
      <Card className="p-6" hover={false}>
        <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-500" />
          Core Metric Reference Index
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">US AQI</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Standardized index (0–500) translating composite multi-pollutant concentrations into uniform public health warnings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase">CO₂e (Equivalent)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Metric converting other greenhouse gases (methane, nitrous oxide) into the equivalent warming effect of CO₂.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">Urban Heat Island (UHI)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Metropolitan areas being significantly warmer (2°C–5°C) than surrounding rural areas due to concrete heat retention.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">IPCC 1.5°C Budget</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Target per-capita ceiling of ~2.3 tonnes CO₂e/yr required to prevent irreversible climate tipping points.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
