/**
 * Persistent default-ward preference (separate from existing ward subscriptions).
 * localStorage key: "userPreferences.v1"
 */

const PREF_KEY = 'userPreferences.v1';

export interface DefaultWardPref {
  defaultWardId: string | null;
  defaultWardName: string | null;
}

export function loadDefaultWardPref(): DefaultWardPref {
  try {
    const raw = localStorage.getItem(PREF_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { defaultWardId: null, defaultWardName: null };
}

export function saveDefaultWardPref(pref: DefaultWardPref): void {
  try {
    localStorage.setItem(PREF_KEY, JSON.stringify(pref));
  } catch (e) {
    console.warn('Failed to save default ward pref:', e);
  }
}
