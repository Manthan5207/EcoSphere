import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  Home as HomeIcon, 
  Car, 
  Utensils, 
  Zap, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Leaf
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useToast } from '../components/common/Toast';
import CitySearch from '../components/dashboard/CitySearch';

export default function Onboarding() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useAuthStore();
  const { addToast } = useToast();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || 'Alex Sharma',
    homeCity: profile?.homeCity || { name: 'Delhi', lat: 28.6139, lon: 77.2090, admin1: 'Delhi', country: 'India' },
    country: profile?.country || 'India',
    householdSize: profile?.householdSize || 4,
    homeType: profile?.homeType || 'apartment',
    mainCommute: profile?.mainCommute || 'metro-train',
    averageDailyCommuteKm: profile?.averageDailyCommuteKm || 16,
    dietType: profile?.dietType || 'vegetarian',
    monthlyElectricityKwh: profile?.monthlyElectricityKwh || 180,
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFinish = () => {
    updateProfile({
      ...formData,
      hasCompletedOnboarding: true,
    });
    addToast({ message: 'Profile setup complete! Welcome to EcoSphere.', type: 'success' });
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-16">
      <div className="glass-card p-6 sm:p-10 rounded-3xl border border-emerald-500/20 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome Setup (Step {step} of 2)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
            {step === 1 ? 'Personalize Your Ecological Baseline' : 'Household & Mobility Profile'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {step === 1 
              ? 'Tell us where you live so we can fetch real-time satellite air quality data.'
              : 'These inputs calibrate your live carbon calculator and lifestyle action plan.'}
          </p>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => handleChange('displayName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Home City & Region
                </label>
                <div className="space-y-2">
                  <CitySearch onSelectCity={(city) => handleChange('homeCity', city)} />
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Selected: <strong>{formData.homeCity.name}</strong> ({formData.homeCity.admin1 ? `${formData.homeCity.admin1}, ` : ''}{formData.homeCity.country})</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Household Size (People)
                  </label>
                  <select
                    value={formData.householdSize}
                    onChange={(e) => handleChange('householdSize', parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Person (Solo)' : 'People'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Home Type
                  </label>
                  <select
                    value={formData.homeType}
                    onChange={(e) => handleChange('homeType', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="apartment">Apartment / Flat</option>
                    <option value="independent house">Independent House / Villa</option>
                    <option value="hostel">Hostel / Dormitory</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-sm shadow-glow-emerald transition-all active:scale-95"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Primary Daily Commute Mode
                </label>
                <select
                  value={formData.mainCommute}
                  onChange={(e) => handleChange('mainCommute', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
                >
                  <option value="metro-train">Metro Train / Subway (Low Carbon)</option>
                  <option value="bus">Public Bus Transit</option>
                  <option value="two-wheeler">Two-Wheeler (Motorcycle / Scooter)</option>
                  <option value="car">Personal Petrol / Diesel Car</option>
                  <option value="auto-rickshaw">Auto-Rickshaw / Cab</option>
                  <option value="walk-cycle">Walk / Bicycle (Zero Emission)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Dietary Habit
                  </label>
                  <select
                    value={formData.dietType}
                    onChange={(e) => handleChange('dietType', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="vegan">Vegan (100% Plant-Based)</option>
                    <option value="vegetarian">Vegetarian (Dairy & Plants)</option>
                    <option value="eggetarian">Eggetarian</option>
                    <option value="occasional meat">Occasional Meat (1-2x / week)</option>
                    <option value="meat daily">Daily Meat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Monthly Electricity (kWh)
                  </label>
                  <input
                    type="number"
                    min="20"
                    max="1500"
                    value={formData.monthlyElectricityKwh}
                    onChange={(e) => handleChange('monthlyElectricityKwh', parseInt(e.target.value) || 100)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-sm shadow-glow-emerald transition-all active:scale-95"
                >
                  <span>Take me to my dashboard</span>
                  <Leaf className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
