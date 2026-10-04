import { POINT_VALUES } from '../data/points';
import { getWeekId, getWeekRange } from './week';

/**
 * Checks if a user is eligible to earn points for a given action type and actionId
 * @param {Array} events
 * @param {string} actionId
 * @param {string} type
 * @param {number} pointsToAdd
 * @param {string} weekId
 * @returns {{ allowed: boolean, reason?: string, currentWeeklyTotal: number }}
 */
export function canEarnPoints(events = [], actionId, type, pointsToAdd = 0, weekId = getWeekId()) {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const currentWeekEvents = events.filter(e => e.weekId === weekId);
  const currentWeeklyTotal = currentWeekEvents.reduce((sum, e) => sum + (e.points || 0), 0);

  // 1. Weekly User Cap Check (600 pts)
  if (currentWeeklyTotal + pointsToAdd > POINT_VALUES.weeklyUserPointsCap) {
    const remaining = Math.max(0, POINT_VALUES.weeklyUserPointsCap - currentWeeklyTotal);
    if (remaining <= 0) {
      return { allowed: false, reason: 'You have reached the 600 Eco Points weekly season cap!', currentWeeklyTotal };
    }
  }

  // 2. Calculator once per week check
  if (type === 'calculator') {
    const alreadyDoneThisWeek = currentWeekEvents.some(e => e.type === 'calculator');
    if (alreadyDoneThisWeek) {
      return { allowed: false, reason: 'Carbon Calculator points already earned for this week!', currentWeeklyTotal };
    }
  }

  // 3. Daily Duplicate Check for identical actionId
  const todayEvents = events.filter(e => e.timestamp?.startsWith(todayStr));
  if (actionId) {
    const duplicateToday = todayEvents.some(e => e.actionId === actionId);
    if (duplicateToday) {
      return { allowed: false, reason: 'This action was already logged today!', currentWeeklyTotal };
    }
  }

  // 4. Daily Limits
  if (type === 'greenChoice') {
    const choicesToday = todayEvents.filter(e => e.type === 'greenChoice').length;
    if (choicesToday >= POINT_VALUES.maxDailyGreenChoices) {
      return { allowed: false, reason: 'Daily green choice limit reached (3 max/day)!', currentWeeklyTotal };
    }
  }

  if (type === 'simulation') {
    const simsToday = todayEvents.filter(e => e.type === 'simulation').length;
    if (simsToday >= POINT_VALUES.maxDailySimulations) {
      return { allowed: false, reason: 'Daily simulation points limit reached (3 max/day)!', currentWeeklyTotal };
    }
  }

  return { allowed: true, currentWeeklyTotal };
}

/**
 * Computes sorted & filtered ranking with tie-breakers and rank numbers
 * @param {Array} players
 * @param {string} scope - 'global' | 'city' | 'friends'
 * @param {string} category - 'overall' | 'transport' | 'energy' | 'food' | 'waste'
 * @param {string} timeframe - 'this-week' | 'all-time' | 'last-week'
 * @param {string} userCity
 * @param {string} userUid
 * @returns {Array}
 */
export function computeRanking(
  players = [], 
  scope = 'global', 
  category = 'overall', 
  timeframe = 'this-week',
  userCity = 'Delhi',
  userUid = null
) {
  let list = [...players];

  // 1. Filter by Scope
  if (scope === 'city' && userCity) {
    list = list.filter(p => (p.city || '').toLowerCase() === userCity.toLowerCase());
  } else if (scope === 'friends') {
    // Show user + top peers
    list = list.filter((p, i) => p.uid === userUid || i < 6);
  }

  // 2. Score Extractor
  const getScore = (player) => {
    if (timeframe === 'all-time') {
      return player.totalPoints || 0;
    }
    if (category === 'overall') {
      return player.weeklyPoints || 0;
    }
    return player.categoryBreakdown?.[category] || 0;
  };

  // 3. Sort with Tie-Breakers:
  // Primary: Score descending
  // Secondary: Streak descending
  // Tertiary: Earlier activity time
  list.sort((a, b) => {
    const scoreA = getScore(a);
    const scoreB = getScore(b);
    if (scoreB !== scoreA) return scoreB - scoreA;

    const streakA = a.streak || 0;
    const streakB = b.streak || 0;
    if (streakB !== streakA) return streakB - streakA;

    const timeA = new Date(a.lastActiveDate || 0).getTime();
    const timeB = new Date(b.lastActiveDate || 0).getTime();
    return timeA - timeB;
  });

  // 4. Assign rank index
  return list.map((player, index) => ({
    ...player,
    rank: index + 1,
    displayScore: getScore(player)
  }));
}

/**
 * Finalizes current week, picks winner with tie-breakers, archives to Hall of Fame, and resets weekly points
 * @param {Array} players
 * @param {string} currentWeekId
 * @param {Array} hallOfFame
 * @returns {{ winner: Object, updatedPlayers: Array, updatedHallOfFame: Array, nextWeekId: string }}
 */
export function finalizeWeekHelper(players = [], currentWeekId = getWeekId(), hallOfFame = []) {
  const ranked = computeRanking(players, 'global', 'overall', 'this-week');
  const winner = ranked[0] || { name: 'Eco Champion', points: 0, city: 'Delhi' };
  const weekInfo = getWeekRange(currentWeekId);

  const hallOfFameEntry = {
    weekId: currentWeekId,
    weekLabel: weekInfo.formatted,
    winnerName: winner.name,
    city: winner.city || 'Delhi',
    points: winner.weeklyPoints || winner.displayScore || 0,
    initials: winner.initials || 'EC'
  };

  const updatedHallOfFame = [hallOfFameEntry, ...hallOfFame.slice(0, 7)];

  // Update players: add weeklyPoints to total, increment weeksWon for winner, assign badges, reset weeklyPoints
  const updatedPlayers = players.map(p => {
    const isWinner = p.uid === winner.uid;
    const currentRank = ranked.findIndex(r => r.uid === p.uid) + 1;
    const currentBadges = [...(p.badges || [])];

    if (isWinner && !currentBadges.includes('planet-hero')) {
      currentBadges.push('planet-hero');
    }
    if (currentRank > 0 && currentRank <= 3 && !currentBadges.includes('top-3')) {
      currentBadges.push('top-3');
    }
    if (currentRank > 0 && currentRank <= 10 && !currentBadges.includes('top-10')) {
      currentBadges.push('top-10');
    }
    if ((p.streak || 0) >= 7 && !currentBadges.includes('streak-7')) {
      currentBadges.push('streak-7');
    }

    return {
      ...p,
      weeksWon: isWinner ? (p.weeksWon || 0) + 1 : (p.weeksWon || 0),
      badges: currentBadges,
      weeklyPoints: 0,
      categoryBreakdown: { transport: 0, energy: 0, food: 0, waste: 0 },
      rankChange: 'same'
    };
  });

  return {
    winner,
    updatedPlayers,
    updatedHallOfFame,
    nextWeekId: getWeekId()
  };
}
