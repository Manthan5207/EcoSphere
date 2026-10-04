import React from 'react';
import { Card } from '../common/Card';
import { Car, Bike, Train, Bus, Plane, Check } from 'lucide-react';

const commuteModes = [
  { id: 'petrolCar', name: 'Petrol Car', icon: Car, factor: 0.17, desc: 'Solo driving in standard petrol sedan/SUV' },
  { id: 'dieselCar', name: 'Diesel Car', icon: Car, factor: 0.17, desc: 'Diesel powered hatchback/SUV' },
  { id: 'cngCar', name: 'CNG Car', icon: Car, factor: 0.12, desc: 'Factory or retrofit CNG vehicle' },
  { id: 'electricCar', name: 'Electric Car', icon: Car, factor: 0.08, desc: 'EV charged via domestic grid' },
  { id: 'twoWheeler', name: 'Two-Wheeler', icon: Bike, factor: 0.04, desc: 'Petrol scooter or motorcycle' },
  { id: 'metroTrain', name: 'Metro / Local Train', icon: Train, factor: 0.03, desc: 'Mass electric rapid transit' },
  { id: 'bus', name: 'City Bus', icon: Bus, factor: 0.03, desc: 'Public electric or CNG city bus' },
];

export function WizardStepTransport({ answers, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
          Step 1: Daily Mobility & Long Distance Travel
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Transport accounts for up to 35% of an Indian urban household's direct carbon footprint.
        </p>
      </div>

      {/* Commute Mode Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Primary Commute Mode
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {commuteModes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = answers.commuteType === mode.id;

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onChange('commuteType', mode.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/15 dark:bg-emerald-950/40 shadow-glow-emerald/30 scale-[1.01]'
                    : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-slate-900 dark:text-white">
                      {mode.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{mode.desc}</p>
                  </div>
                </div>

                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 dark:border-slate-700'}`}>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sliders for Daily Distance & Weekly Frequency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 rounded-2xl glass-card border border-emerald-500/20">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300 uppercase">
              Daily Commute (Round Trip)
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              {answers.commuteKmDaily} km / day
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="2"
            value={answers.commuteKmDaily}
            onChange={(e) => onChange('commuteKmDaily', parseInt(e.target.value))}
            className="w-full accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>0 km</span>
            <span>20 km</span>
            <span>40 km</span>
            <span>80+ km</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300 uppercase">
              Days Commuting Per Week
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              {answers.commuteDaysWeek} days / week
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="7"
            step="1"
            value={answers.commuteDaysWeek}
            onChange={(e) => onChange('commuteDaysWeek', parseInt(e.target.value))}
            className="w-full accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Remote (0)</span>
            <span>Hybrid (3)</span>
            <span>Full Week (5-7)</span>
          </div>
        </div>
      </div>

      {/* Flight Travel */}
      <div className="p-5 rounded-2xl glass-card border border-emerald-500/20">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300 uppercase">
              Domestic Flights Taken Per Year (e.g. Delhi-Mumbai ~1,150 km)
            </span>
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400">
            {answers.flightsPerYear} flights / yr
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={answers.flightsPerYear}
          onChange={(e) => onChange('flightsPerYear', parseInt(e.target.value))}
          className="w-full accent-sky-500"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>0 (Train/Road only)</span>
          <span>4 flights</span>
          <span>10 flights</span>
          <span>20+ frequent flyer</span>
        </div>
      </div>
    </div>
  );
}

export function WizardStepEnergy({ answers, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
          Step 2: Home Electricity & Cooking Energy
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          India's thermal grid averages 0.71 kg CO₂e per kWh. AC and geysers are the largest power loads.
        </p>
      </div>

      {/* Monthly Electricity kWh */}
      <div className="p-5 rounded-2xl glass-card border border-emerald-500/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300 uppercase">
            Monthly Household Electricity Consumption
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">~₹{(answers.electricityKWhMonth * 7.5).toLocaleString()} /mo</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
              {answers.electricityKWhMonth} kWh / month
            </span>
          </div>
        </div>
        <input
          type="range"
          min="30"
          max="800"
          step="10"
          value={answers.electricityKWhMonth}
          onChange={(e) => onChange('electricityKWhMonth', parseInt(e.target.value))}
          className="w-full accent-amber-500"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>50 kWh (Minimal)</span>
          <span>180 kWh (Avg 2BHK)</span>
          <span>400 kWh (AC heavy)</span>
          <span>800+ kWh (Luxury)</span>
        </div>
      </div>

      {/* Cooking Energy (LPG Cylinder vs PNG) */}
      <div className="p-5 rounded-2xl glass-card border border-emerald-500/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300 uppercase">
            LPG Cylinders Used Per Year (14.2 kg standard)
          </span>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            {answers.lpgCylindersYear} cylinders / yr
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="16"
          step="1"
          value={answers.lpgCylindersYear}
          onChange={(e) => onChange('lpgCylindersYear', parseInt(e.target.value))}
          className="w-full accent-emerald-500"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>0 (Induction/Solar)</span>
          <span>6 cylinders</span>
          <span>10 cylinders (Family avg)</span>
          <span>16 cylinders</span>
        </div>
      </div>
    </div>
  );
}
