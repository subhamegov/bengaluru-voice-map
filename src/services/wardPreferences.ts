/**
 * Persistent ward preferences (supports multiple saved localities).
 * localStorage key: "userPreferences.v1"
 */

const PREF_KEY = 'userPreferences.v1';

export interface WardPref {
  defaultWardId: string | null;
  defaultWardName: string | null;
  selectedWardIds: string[];
  selectedWardNames: string[];
}

/** Migrate old format { defaultWardId, defaultWardName } → new multi-ward format */
function migrate(raw: any): WardPref {
  return {
    defaultWardId: raw.defaultWardId ?? null,
    defaultWardName: raw.defaultWardName ?? null,
    selectedWardIds: Array.isArray(raw.selectedWardIds) ? raw.selectedWardIds : (raw.defaultWardId ? [raw.defaultWardId] : []),
    selectedWardNames: Array.isArray(raw.selectedWardNames) ? raw.selectedWardNames : (raw.defaultWardName ? [raw.defaultWardName] : []),
  };
}

export function loadWardPref(): WardPref {
  try {
    const raw = localStorage.getItem(PREF_KEY);
    if (raw) return migrate(JSON.parse(raw));
  } catch {}
  return { defaultWardId: null, defaultWardName: null, selectedWardIds: [], selectedWardNames: [] };
}

export function saveWardPref(pref: WardPref): void {
  try {
    localStorage.setItem(PREF_KEY, JSON.stringify(pref));
  } catch (e) {
    console.warn('Failed to save ward pref:', e);
  }
}

// Keep backward-compatible aliases
export type DefaultWardPref = WardPref;
export const loadDefaultWardPref = loadWardPref;
export const saveDefaultWardPref = saveWardPref;
