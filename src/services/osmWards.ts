/**
 * OSM Ward Boundaries Service
 * Fetches Bengaluru ward boundaries from Overpass API, converts to GeoJSON,
 * and caches in localStorage with a 7-day TTL.
 */

import type { FeatureCollection, Feature, Geometry } from 'geojson';

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const CACHE_KEY = 'osmWardsCache.v1';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface WardProperties {
  ward_id: string;
  ward_name: string;
  source: 'OSM';
}

export type WardFeatureCollection = FeatureCollection<Geometry, WardProperties>;

interface CacheEntry {
  fetchedAt: string;
  data: WardFeatureCollection;
}

// ── Overpass queries: try admin_level 10, then 9 ──

function buildOverpassQuery(adminLevel: number): string {
  return `
[out:json][timeout:60];
area["name"~"Bengaluru|Bangalore"]["boundary"="administrative"]->.city;
(
  relation["boundary"="administrative"]["admin_level"="${adminLevel}"](area.city);
);
out body;
>;
out skel qt;
`.trim();
}

// ── Convert Overpass JSON → GeoJSON ──

function overpassToGeoJSON(data: any): WardFeatureCollection {
  const features: Feature<Geometry, WardProperties>[] = [];

  const nodes = new Map<number, [number, number]>();
  for (const el of data.elements) {
    if (el.type === 'node' && el.lat != null && el.lon != null) {
      nodes.set(el.id, [el.lon, el.lat]); // GeoJSON is [lng, lat]
    }
  }

  const ways = new Map<number, [number, number][]>();
  for (const el of data.elements) {
    if (el.type === 'way' && el.nodes) {
      const coords: [number, number][] = [];
      for (const nid of el.nodes) {
        const c = nodes.get(nid);
        if (c) coords.push(c);
      }
      ways.set(el.id, coords);
    }
  }

  for (const el of data.elements) {
    if (el.type !== 'relation') continue;
    const name = el.tags?.['name:en'] || el.tags?.name || `Ward ${el.id}`;
    
    // Collect outer ring coordinates from members
    const outerRings: [number, number][][] = [];
    if (el.members) {
      for (const m of el.members) {
        if (m.type === 'way' && (m.role === 'outer' || m.role === '')) {
          const wc = ways.get(m.ref);
          if (wc && wc.length > 0) outerRings.push(wc);
        }
      }
    }

    if (outerRings.length === 0) continue;

    // Merge connected way segments into closed rings
    const mergedRings = mergeWaySegments(outerRings);

    let geometry: Geometry;
    if (mergedRings.length === 1) {
      geometry = { type: 'Polygon', coordinates: [mergedRings[0]] };
    } else if (mergedRings.length > 1) {
      geometry = { type: 'MultiPolygon', coordinates: mergedRings.map(r => [r]) };
    } else {
      continue;
    }

    features.push({
      type: 'Feature',
      properties: {
        ward_id: String(el.id),
        ward_name: name,
        source: 'OSM',
      },
      geometry,
    });
  }

  return { type: 'FeatureCollection', features };
}

/** Merge connected way segments into closed coordinate rings */
function mergeWaySegments(segments: [number, number][][]): [number, number][][] {
  if (segments.length === 0) return [];
  
  const remaining = [...segments];
  const rings: [number, number][][] = [];
  
  while (remaining.length > 0) {
    let current = [...remaining.shift()!];
    let changed = true;
    
    while (changed) {
      changed = false;
      for (let i = remaining.length - 1; i >= 0; i--) {
        const seg = remaining[i];
        const cLast = current[current.length - 1];
        const sFirst = seg[0];
        const sLast = seg[seg.length - 1];
        
        if (coordsEqual(cLast, sFirst)) {
          current = current.concat(seg.slice(1));
          remaining.splice(i, 1);
          changed = true;
        } else if (coordsEqual(cLast, sLast)) {
          current = current.concat([...seg].reverse().slice(1));
          remaining.splice(i, 1);
          changed = true;
        }
      }
    }
    
    // Close ring if not already closed
    if (current.length > 0 && !coordsEqual(current[0], current[current.length - 1])) {
      current.push(current[0]);
    }
    
    if (current.length >= 4) {
      rings.push(current);
    }
  }
  
  return rings;
}

function coordsEqual(a: [number, number], b: [number, number]): boolean {
  return Math.abs(a[0] - b[0]) < 1e-7 && Math.abs(a[1] - b[1]) < 1e-7;
}

// ── Cache helpers ──

function loadCache(): WardFeatureCollection | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    const age = Date.now() - new Date(entry.fetchedAt).getTime();
    if (age > CACHE_TTL_MS) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function saveCache(data: WardFeatureCollection): void {
  try {
    const entry: CacheEntry = { fetchedAt: new Date().toISOString(), data };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch (e) {
    console.warn('Failed to cache ward data:', e);
  }
}

// ── Public API ──

export async function fetchOSMWards(): Promise<WardFeatureCollection> {
  // Try cache first
  const cached = loadCache();
  
  // Try admin_level 10 first, then 9
  for (const level of [10, 9]) {
    try {
      const query = buildOverpassQuery(level);
      const res = await fetch(OVERPASS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
      });

      if (!res.ok) {
        console.warn(`Overpass returned ${res.status} for admin_level=${level}`);
        continue;
      }

      const json = await res.json();
      const geojson = overpassToGeoJSON(json);

      if (geojson.features.length > 0) {
        saveCache(geojson);
        return geojson;
      }
    } catch (e) {
      console.warn(`Overpass fetch failed for admin_level=${level}:`, e);
    }
  }

  // Fallback to cached data even if expired
  if (cached) {
    console.info('Using cached ward data (fetch failed)');
    return cached;
  }

  // Return empty collection
  return { type: 'FeatureCollection', features: [] };
}

/** Get sorted ward list from a FeatureCollection */
export function getWardList(fc: WardFeatureCollection): { id: string; name: string }[] {
  return fc.features
    .map(f => ({ id: f.properties.ward_id, name: f.properties.ward_name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
