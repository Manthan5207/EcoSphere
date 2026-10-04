import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { EMISSION_FACTORS } from '../data/factors';
import { WizardStepTransport, WizardStepEnergy } from '../components/calculator/WizardStepTransport';
import { WizardStepFood, WizardStepWaste } from '../components/calculator/WizardStepFood';
import LiveTotalSidebar from '../components/calculator/LiveTotalSidebar';
import CalculatorResults from '../components/calculator/CalculatorResults';
import { Card } from '../components/common/Card';
import { 
  Calculator as CalcIcon, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Car, 
  Zap, 
  Utensils, 
  Trash2,
  Sparkles
} from 'lucide-react';
import { useToast } from '../components/common/Toast';
import { useAuthStore } from '../store/useAuthStore';
import { useLeaderboardStore } from '../store/useLeaderboardStore';

export default function Calculator() {
  const { footprint, setFootprint } = useStore();
  const { profile } = useAuthStore();
  const { addPoints } = useLeaderboardStore();
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const { addToast } = useToast();

  const commuteMap = {
    'metro-train': 'metroTrain',
    'two-wheeler': 'twoWheeler',
    'car': 'petrolCar',
    'bus': 'bus',
    'auto-rickshaw': 'autoRickshaw',
    'walk-cycle': 'twoWheeler'
  };

  const dietMap = {
    'vegan': 'vegan',
    'vegetarian': 'vegetarian',
    'eggetarian': 'eggetarian',
    'occasional meat': 'occasionalMeat',
    'meat daily': 'dailyMeat'
  };

  const [answers, setAnswers] = useState(() => {
    if (footprint?.answers) return footprint.answers;
    return {
      commuteType: (profile?.mainCommute && commuteMap[profile.mainCommute]) || 'petrolCar',
      commuteKmDaily: profile?.averageDailyCommuteKm || 16,
      commuteDaysWeek: 5,
      flightsPerYear: 2,
      electricityKWhMonth: profile?.monthlyElectricityKwh || 180,
      lpgCylindersYear: 8,
      dietType: (profile?.dietType && dietMap[profile.dietType]) || 'occasionalMeat',
      shoppingLevel: 'medium',
      wastePractice: 'recycles'
    };
  });

  const handleAnswerChange = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  // Compute live breakdown
  const computeBreakdown = () => {
    // 1. Transport: Commute + Flights
    const commuteFactor = EMISSION_FACTORS.transport[answers.commuteType] || 0.17;
    const annualCommuteKm = answers.commuteKmDaily * answers.commuteDaysWeek * 52;
    const commuteEmissions = annualCommuteKm * commuteFactor;
    const flightEmissions = answers.flightsPerYear * 1150 * EMISSION_FACTORS.transport.flightDomestic; // ~1150 km per flight
    const transportTotal = commuteEmissions + flightEmissions;

    // 2. Home Energy: Electricity + LPG
    const annualElectricityKWh = answers.electricityKWhMonth * 12;
    const electricityEmissions = annualElectricityKWh * EMISSION_FACTORS.energy.electricityPerKWh;
    const lpgEmissions = answers.lpgCylindersYear * EMISSION_FACTORS.energy.lpgCylinder;
    const energyTotal = electricityEmissions + lpgEmissions;

    // 3. Food: Diet per day * 365
    const dietDailyFactor = EMISSION_FACTORS.diet[answers.dietType] || 2.0;
    const foodTotal = dietDailyFactor * 365;

    // 4. Shopping & Waste
    const shoppingTotal = EMISSION_FACTORS.shopping[answers.shoppingLevel] || 700;
    const wasteTotal = EMISSION_FACTORS.waste[answers.wastePractice] ?? 0;

    const grandTotal = transportTotal + energyTotal + foodTotal + shoppingTotal + wasteTotal;

    return {
      transport: transportTotal,
      energy: energyTotal,
      food: foodTotal,
      shopping: shoppingTotal,
      waste: wasteTotal,
      total: grandTotal
    };
  };

  const currentBreakdown = computeBreakdown();

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Finish and save to store
      setFootprint({
        ...currentBreakdown,
        answers
      });
      setShowResults(true);
      const res = addPoints('calculator', 'calc-audit-weekly', 25, 'overall', 'Carbon Footprint Audit');
      if (res?.success) {
        addToast({ message: `+${res.pointsEarned} Eco Points earned for completing carbon audit! 🌿`, type: 'success' });
      } else {
        addToast({ message: 'Carbon Footprint calculation completed and saved!', type: 'success' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRecalculate = () => {
    setShowResults(false);
    setStep(1);
  };

  const stepIcons = [Car, Zap, Utensils, Trash2];
  const stepTitles = ['Mobility', 'Energy', 'Food', 'Waste'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      {/* Title Bar */}
      <div className="pb-2 border-b border-emerald-500/10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
              Household Carbon Footprint Audit
            </h1>
            {profile && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Pre-filled from your profile
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            IPCC & CEA calibrated methodology • Measured in kg and metric tonnes CO₂e / year
          </p>
        </div>

        {showResults && (
          <button
            onClick={handleRecalculate}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
          >
            Edit Inputs
          </button>
        )}
      </div>

      {showResults ? (
        <CalculatorResults 
          footprint={currentBreakdown} 
          onRecalculate={handleRecalculate} 
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Wizard Form Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step Progress Bar */}
            <div className="p-4 rounded-2xl glass-card border border-emerald-500/20">
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((s) => {
                  const Icon = stepIcons[s - 1];
                  const isDone = s < step;
                  const isCurrent = s === step;

                  return (
                    <div
                      key={s}
                      onClick={() => setStep(s)}
                      className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-emerald-500 text-white shadow-glow-emerald font-bold'
                          : isDone
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                        {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <span className="text-xs hidden sm:inline truncate">{stepTitles[s - 1]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Content with Motion Animations */}
            <Card className="p-6 sm:p-8" hover={false}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 1 && (
                    <WizardStepTransport answers={answers} onChange={handleAnswerChange} />
                  )}
                  {step === 2 && (
                    <WizardStepEnergy answers={answers} onChange={handleAnswerChange} />
                  )}
                  {step === 3 && (
                    <WizardStepFood answers={answers} onChange={handleAnswerChange} />
                  )}
                  {step === 4 && (
                    <WizardStepWaste answers={answers} onChange={handleAnswerChange} />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={step === 1}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-heading font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-sm shadow-glow-emerald transition-all active:scale-95"
                >
                  <span>{step === 4 ? 'Calculate & View Results' : 'Next Step'}</span>
                  {step === 4 ? <Sparkles className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </Card>
          </div>

          {/* Sticky Live Total Sidebar Column */}
          <div className="lg:col-span-4">
            <LiveTotalSidebar 
              breakdown={currentBreakdown} 
              total={currentBreakdown.total} 
              currentStep={step} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
