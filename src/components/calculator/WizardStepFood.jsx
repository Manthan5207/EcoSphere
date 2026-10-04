import React from 'react';
import { Salad, Egg, Utensils, Drumstick, Beef, ShoppingBag, Trash2, Recycle, Leaf, Check } from 'lucide-react';

const diets = [
  { id: 'vegan', name: '100% Plant-Based (Vegan)', factor: 1.5, icon: Leaf, desc: 'Zero dairy, meat, or animal derivatives (~1.5 kg CO₂/day)' },
  { id: 'vegetarian', name: 'Indian Vegetarian (Lacto)', factor: 1.7, icon: Salad, desc: 'Lentils, seasonal vegetables, paneer, and milk (~1.7 kg CO₂/day)' },
  { id: 'eggetarian', name: 'Eggetarian', factor: 2.0, icon: Egg, desc: 'Vegetarian plus eggs (~2.0 kg CO₂/day)' },
  { id: 'occasionalMeat', name: 'Flexitarian / Meat 1–2x wk', factor: 2.5, icon: Drumstick, desc: 'Chicken/fish 1 to 2 times a week (~2.5 kg CO₂/day)' },
  { id: 'dailyMeat', name: 'Daily Meat Consumer', factor: 3.3, icon: Beef, desc: 'Poultry, mutton or seafood in most meals (~3.3 kg CO₂/day)' },
];

const shoppingLevels = [
  { id: 'low', name: 'Low / Minimalist', value: 300, desc: 'Repair first, second-hand items, essentials only (~300 kg/yr)' },
  { id: 'medium', name: 'Average Consumer', value: 700, desc: 'Occasional new clothes, standard electronics upgrades (~700 kg/yr)' },
  { id: 'high', name: 'High / Fast Trend', value: 1500, desc: 'Frequent e-commerce parcels, seasonal fast fashion, tech gadgets (~1500 kg/yr)' },
];

const wastePractices = [
  { id: 'noRecycling', name: 'No Waste Segregation', value: 300, desc: 'All waste goes directly to municipality landfill (+300 kg CO₂e)' },
  { id: 'recycles', name: 'Dry & Plastic Recycler', value: 0, desc: 'Separates dry paper, metals & PET plastic for scrap kabadiwala (+0 kg)' },
  { id: 'composts', name: 'Active Home Composter', value: -100, desc: 'Composts all wet organic food peels, zero methane to landfill (-100 kg credit)' },
];

export function WizardStepFood({ answers, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
          Step 3: Nutrition & Dietary Habits
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Livestock agriculture accounts for high land use and agricultural emissions. Traditional Indian plant-based diets are globally among the most climate-friendly.
        </p>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Dietary Profile
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {diets.map((d) => {
            const Icon = d.icon;
            const isSelected = answers.dietType === d.id;

            return (
              <button
                key={d.id}
                type="button"
                onClick={() => onChange('dietType', d.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex items-start justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/15 dark:bg-emerald-950/40 shadow-glow-emerald/30 scale-[1.01]'
                    : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">
                      {d.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{d.desc}</p>
                  </div>
                </div>

                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 dark:border-slate-700'}`}>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function WizardStepWaste({ answers, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
          Step 4: Consumption Goods & Waste Lifecycle
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Embodied emissions from manufacturing and landfill methane generation form the tail end of your personal lifecycle.
        </p>
      </div>

      {/* Shopping Habits */}
      <div className="space-y-3">
        <label className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Material Goods & Shopping Habits
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {shoppingLevels.map((lvl) => {
            const isSelected = answers.shoppingLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => onChange('shoppingLevel', lvl.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/15 dark:bg-emerald-950/40 shadow-glow-emerald/30 scale-[1.01]'
                    : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:border-emerald-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <ShoppingBag className={`w-5 h-5 ${isSelected ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300'}`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">
                    {lvl.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{lvl.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Waste Practice */}
      <div className="space-y-3">
        <label className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Household Waste Management
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {wastePractices.map((wp) => {
            const isSelected = answers.wastePractice === wp.id;
            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => onChange('wastePractice', wp.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/15 dark:bg-emerald-950/40 shadow-glow-emerald/30 scale-[1.01]'
                    : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:border-emerald-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Recycle className={`w-5 h-5 ${isSelected ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300'}`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">
                    {wp.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{wp.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
