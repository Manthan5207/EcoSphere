/**
 * Utilities for weekly season management (Monday 00:00 to Sunday 23:59)
 */

/**
 * Gets the ISO week ID for a given date (e.g., "2026-W41")
 * @param {Date} [date]
 * @returns {string}
 */
export function getWeekId(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

/**
 * Gets the start and end Date objects for a given week ID or current week
 * @param {string} [weekId]
 * @returns {{ start: Date, end: Date, formatted: string }}
 */
export function getWeekRange(weekId) {
  const now = new Date();
  const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday...
  const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  
  const monday = new Date(now);
  monday.setDate(now.getDate() + distanceToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const startMonth = monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endMonth = sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return {
    start: monday,
    end: sunday,
    formatted: `${startMonth} – ${endMonth}`
  };
}

/**
 * Computes remaining time until the end of the current week (Sunday 23:59:59)
 * @returns {{ days: number, hours: number, minutes: number, seconds: number, formatted: string, isExpired: boolean }}
 */
export function getTimeLeftInWeek() {
  const { end } = getWeekRange();
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, formatted: 'Season Ended', isExpired: true };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    formatted: `${days}d ${hours}h ${minutes}m`,
    isExpired: false
  };
}

/**
 * Checks if a given weekId is older than the current week
 * @param {string} lastSeenWeekId
 * @returns {boolean}
 */
export function isNewWeek(lastSeenWeekId) {
  if (!lastSeenWeekId) return true;
  return lastSeenWeekId !== getWeekId();
}
