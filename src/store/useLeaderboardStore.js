import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_SEEDED_PLAYERS, INITIAL_HALL_OF_FAME, LAST_WEEK_PODIUM } from '../data/seedLeaderboard';
import { getWeekId, isNewWeek } from '../utils/week';
import { canEarnPoints, computeRanking, finalizeWeekHelper } from '../utils/leaderboard';
import { useAuthStore } from './useAuthStore';

export const useLeaderboardStore = create(
  persist(
    (set, get) => ({
      players: INITIAL_SEEDED_PLAYERS,
      events: [],
      currentWeekId: getWeekId(),
      hallOfFame: INITIAL_HALL_OF_FAME,
      lastWeekPodium: LAST_WEEK_PODIUM,
      dismissedWinnerBanner: false,
      showWeekEndedModal: false,
      lastFinalizedWinner: null,

      // Initialize or sync user in player list
      syncCurrentUser: () => {
        const authState = useAuthStore.getState();
        const user = authState.user;
        const profile = authState.profile;

        if (!user) return;

        const uid = user.uid;
        const name = profile?.displayName || user.displayName || 'Alex Sharma';
        const city = profile?.homeCity?.name || 'Delhi';
        const initials = profile?.initials || 'AS';

        const currentPlayers = get().players;
        const userIndex = currentPlayers.findIndex(p => p.uid === uid);

        if (userIndex === -1) {
          // Add user to leaderboard list
          const newUserRow = {
            uid,
            name,
            city,
            initials,
            weeklyPoints: 120, // Initial active starting score
            totalPoints: 850,
            streak: profile?.streak || 5,
            rankChange: 'new',
            categoryBreakdown: { transport: 40, energy: 30, food: 30, waste: 20 },
            badges: profile?.badges || ['top-10'],
            weeksWon: 0,
            lastActiveDate: new Date().toISOString(),
            isCurrentUser: true,
          };
          set({ players: [newUserRow, ...currentPlayers] });
        } else {
          // Update details (name, city, initials)
          const updated = [...currentPlayers];
          updated[userIndex] = {
            ...updated[userIndex],
            name,
            city,
            initials,
            isCurrentUser: true
          };
          set({ players: updated });
        }
      },

      // Add points for an action
      addPoints: (type, actionId, points, category = 'overall', label = '') => {
        const authState = useAuthStore.getState();
        const user = authState.user;
        const uid = user?.uid || 'guest-demo-user';
        const currentWeekId = get().currentWeekId;
        const events = get().events;

        // Validation & Duplicate Check
        const check = canEarnPoints(events, actionId, type, points, currentWeekId);
        if (!check.allowed) {
          return { success: false, reason: check.reason, pointsAwarded: 0 };
        }

        const pointEvent = {
          id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          uid,
          type,
          actionId: actionId || `${type}-${Date.now()}`,
          points,
          category,
          label: label || type,
          timestamp: new Date().toISOString(),
          weekId: currentWeekId
        };

        const currentPlayers = [...get().players];
        let userIndex = currentPlayers.findIndex(p => p.uid === uid);

        if (userIndex === -1) {
          // Create entry if missing
          const profile = authState.profile;
          currentPlayers.push({
            uid,
            name: profile?.displayName || 'Alex Sharma',
            city: profile?.homeCity?.name || 'Delhi',
            initials: profile?.initials || 'AS',
            weeklyPoints: points,
            totalPoints: points + 500,
            streak: profile?.streak || 1,
            rankChange: 'up',
            categoryBreakdown: {
              transport: category === 'transport' ? points : 0,
              energy: category === 'energy' ? points : 0,
              food: category === 'food' ? points : 0,
              waste: category === 'waste' ? points : 0,
            },
            badges: [],
            weeksWon: 0,
            lastActiveDate: new Date().toISOString(),
            isCurrentUser: true
          });
        } else {
          const p = currentPlayers[userIndex];
          const oldBreakdown = p.categoryBreakdown || { transport: 0, energy: 0, food: 0, waste: 0 };
          
          currentPlayers[userIndex] = {
            ...p,
            weeklyPoints: (p.weeklyPoints || 0) + points,
            totalPoints: (p.totalPoints || 0) + points,
            lastActiveDate: new Date().toISOString(),
            rankChange: 'up',
            categoryBreakdown: {
              ...oldBreakdown,
              [category]: (oldBreakdown[category] || 0) + points
            }
          };
        }

        set({
          players: currentPlayers,
          events: [pointEvent, ...events]
        });

        return { success: true, pointsAwarded: points, event: pointEvent };
      },

      // Check if new week has started
      checkWeekRollover: () => {
        const currentWeekId = get().currentWeekId;
        if (isNewWeek(currentWeekId)) {
          get().finalizeCurrentWeek();
        }
      },

      // Finalize week manually or automatically
      finalizeCurrentWeek: () => {
        const { players, currentWeekId, hallOfFame } = get();
        const result = finalizeWeekHelper(players, currentWeekId, hallOfFame);

        set({
          players: result.updatedPlayers,
          hallOfFame: result.updatedHallOfFame,
          lastWeekPodium: {
            weekId: currentWeekId,
            weekLabel: result.updatedHallOfFame[0]?.weekLabel || 'Last Season',
            winner: result.winner,
            runnerUp: result.updatedPlayers[1] || result.winner,
            third: result.updatedPlayers[2] || result.winner
          },
          lastFinalizedWinner: result.winner,
          showWeekEndedModal: true,
          currentWeekId: result.nextWeekId,
          dismissedWinnerBanner: false
        });
      },

      // Close Week Ended Modal
      closeWeekEndedModal: () => {
        set({ showWeekEndedModal: false });
      },

      // Dismiss Top Winner Banner
      dismissWinnerBanner: () => {
        set({ dismissedWinnerBanner: true });
      },

      // Demo Tools Action 1: Simulate activity among random competitors
      simulateDemoActivity: () => {
        const currentPlayers = [...get().players];
        const numToUpdate = Math.min(6, currentPlayers.length);
        
        for (let i = 0; i < numToUpdate; i++) {
          const randIdx = Math.floor(Math.random() * currentPlayers.length);
          const pointsBonus = [15, 25, 30, 45][Math.floor(Math.random() * 4)];
          const p = currentPlayers[randIdx];
          
          currentPlayers[randIdx] = {
            ...p,
            weeklyPoints: (p.weeklyPoints || 0) + pointsBonus,
            totalPoints: (p.totalPoints || 0) + pointsBonus,
            lastActiveDate: new Date().toISOString(),
            rankChange: Math.random() > 0.5 ? 'up' : 'down'
          };
        }

        set({ players: currentPlayers });
      },

      // Demo Tools Action 2: Add points to user row for instant rank jump
      addDemoPointsToUser: (pts = 50) => {
        get().addPoints('demo-bonus', `demo-${Date.now()}`, pts, 'transport', 'Judge Demo Boost');
      },

      // Reset leaderboard to clean seed state
      resetLeaderboard: () => {
        set({
          players: INITIAL_SEEDED_PLAYERS,
          events: [],
          currentWeekId: getWeekId(),
          hallOfFame: INITIAL_HALL_OF_FAME,
          lastWeekPodium: LAST_WEEK_PODIUM,
          dismissedWinnerBanner: false,
          showWeekEndedModal: false,
          lastFinalizedWinner: null
        });
        get().syncCurrentUser();
      }
    }),
    {
      name: 'ecosphere_leaderboard_storage',
      partialize: (state) => ({
        players: state.players,
        events: state.events,
        currentWeekId: state.currentWeekId,
        hallOfFame: state.hallOfFame,
        lastWeekPodium: state.lastWeekPodium,
        dismissedWinnerBanner: state.dismissedWinnerBanner
      })
    }
  )
);
