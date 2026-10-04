import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACTIONS } from '../data/actions';
import { BENCHMARKS } from '../data/factors';

export const useStore = create(
  persist(
    (set, get) => ({
      // Location state (Default Delhi)
      location: {
        name: 'Delhi',
        admin1: 'Delhi',
        country: 'India',
        lat: 28.6139,
        lon: 77.2090,
      },
      setLocation: (loc) => set({ location: loc }),

      // Carbon Footprint State (Pre-populated sample of 2.6 tonnes so Action Plan & Insights work on first load)
      footprint: {
        transport: 1020, // kg CO2e / yr
        energy: 850,
        food: 620,
        shopping: 300,
        waste: 0,
        total: 2790, // ~2.79 tonnes / yr
        hasCalculated: true,
        answers: {
          commuteType: 'petrolCar',
          commuteKmDaily: 15,
          commuteDaysWeek: 5,
          flightsPerYear: 2,
          electricityKWhMonth: 180,
          lpgCylindersYear: 8,
          dietType: 'occasionalMeat',
          shoppingLevel: 'medium',
          wastePractice: 'recycles'
        }
      },
      setFootprint: (newFootprint) => {
        set({ footprint: { ...newFootprint, hasCalculated: true } });
        get().recalculateEcoScore();
        get().checkBadges();
      },

      // Pledges state (action IDs)
      pledges: ['metro-commute', 'ac-temp-24', 'switch-led', 'plant-5-trees'],
      togglePledge: (actionId) => {
        const current = get().pledges;
        const exists = current.includes(actionId);
        const updated = exists ? current.filter(id => id !== actionId) : [...current, actionId];
        set({ pledges: updated });
        get().recalculateEcoScore();
        get().checkBadges();
      },
      setPledges: (pledges) => {
        set({ pledges });
        get().recalculateEcoScore();
        get().checkBadges();
      },

      // Gamification State
      ecoScore: 78,
      badges: ['first-step', 'pledge-hero'],
      streak: 4,
      lastStreakCheckin: new Date().toISOString().split('T')[0],

      incrementStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const last = get().lastStreakCheckin;
        if (last === today) return; // already checked in today
        
        const streak = get().streak + 1;
        set({ streak, lastStreakCheckin: today });
        get().checkBadges();
      },

      unlockBadge: (badgeId) => {
        const badges = get().badges;
        if (!badges.includes(badgeId)) {
          set({ badges: [...badges, badgeId] });
        }
      },

      checkBadges: () => {
        const state = get();
        const unlocked = [...state.badges];

        // First audit completed
        if (state.footprint.hasCalculated && !unlocked.includes('first-step')) {
          unlocked.push('first-step');
        }

        // Pledged > 500 kg
        const totalPledgedKg = ACTIONS
          .filter(a => state.pledges.includes(a.id))
          .reduce((sum, a) => sum + a.kgSavedPerYear, 0);

        if (totalPledgedKg >= 500 && !unlocked.includes('pledge-hero')) {
          unlocked.push('pledge-hero');
        }

        // Footprint below national average (2.0 tonnes)
        if (state.footprint.total <= 2000 && !unlocked.includes('low-carbon')) {
          unlocked.push('low-carbon');
        }

        // Streak >= 5
        if (state.streak >= 5 && !unlocked.includes('streak-master')) {
          unlocked.push('streak-master');
        }

        set({ badges: unlocked });
      },

      recalculateEcoScore: () => {
        const state = get();
        const footprintTonnes = (state.footprint.total || 2500) / 1000;
        
        // Base score: 100 max, penalised by excess over sustainable target (2.3t)
        // If footprint <= 2.3t, score 70-90. If higher, drops towards 30-50.
        let baseScore = Math.max(20, Math.min(85, Math.round(90 - (footprintTonnes / BENCHMARKS.worldAvg) * 45)));

        // Bonus for pledges (+3 points each, max 20)
        const pledgeBonus = Math.min(20, state.pledges.length * 3);
        
        // Bonus for streak (+1 per day, max 10)
        const streakBonus = Math.min(10, state.streak * 1.5);

        const totalScore = Math.min(100, Math.max(10, Math.round(baseScore + pledgeBonus + streakBonus)));
        set({ ecoScore: totalScore });
      },

      // Theme state ('dark' | 'light')
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'ecosphere-storage-v1',
    }
  )
);
