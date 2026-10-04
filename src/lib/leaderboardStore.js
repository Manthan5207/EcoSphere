import { isFirebaseConfigured } from './firebase';
import { useLeaderboardStore } from '../store/useLeaderboardStore';

/**
 * Storage Adapter for EcoSphere Leaderboard.
 * Prototype default: local state backed by Zustand & localStorage.
 * Production ready: Structured to easily connect Firestore listeners without breaking offline usage.
 */

export const leaderboardStorageAdapter = {
  /**
   * Retrieves player list
   * @returns {Promise<Array>}
   */
  async getPlayers() {
    return useLeaderboardStore.getState().players;
  },

  /**
   * Logs a new point event
   * @param {Object} event
   * @returns {Promise<{ success: boolean }>}
   */
  async saveEvent(event) {
    const res = useLeaderboardStore.getState().addPoints(
      event.type,
      event.actionId,
      event.points,
      event.category,
      event.label
    );
    return res;
  },

  /**
   * Finalizes the week and archives records
   * @param {string} weekId
   * @returns {Promise<Object>}
   */
  async finalizeWeek(weekId) {
    useLeaderboardStore.getState().finalizeCurrentWeek();
    return { success: true };
  }
};
