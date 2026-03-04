import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, CircleMarker, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin, Navigation, Mic, MicOff, AlertCircle, Locate,
  Car, Droplets, Trash2, Zap, Lightbulb, Shield, Construction,
  LayoutGrid, Search, Filter, Layers, ChevronDown
} from 'lucide-react';
import { MapGuide } from './MapGuide';
import { LocationCard } from './LocationCard';
import { Happening } from '@/types/happenings';
import { happeningsApi } from '@/lib/happeningsApi';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const userMarkerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ── Category filter config ──
const MAP_FILTERS = [
  { id: 'all', label: 'All', icon: LayoutGrid, color: '#6B7280' },
  { id: 'roads', label: 'Roads', icon: Car, color: '#E74C3C' },
  { id: 'drains', label: 'Drains', icon: Droplets, color: '#06B6D4' },
  { id: 'waste', label: 'Waste / SWM', icon: Trash2, color: '#8B5CF6' },
  { id: 'streetlights', label: 'Streetlights', icon: Lightbulb, color: '#F59E0B' },
  { id: 'water', label: 'Water (BWSSB)', icon: Droplets, color: '#3B82F6' },
  { id: 'lake', label: 'Lakes', icon: Droplets, color: '#10B981' },
  { id: 'safety', label: 'Safety / CCTV', icon: Shield, color: '#6366F1' },
  { id: 'metro', label: 'Metro Works', icon: Construction, color: '#EC4899' },
] as const;

type MapFilterId = typeof MAP_FILTERS[number]['id'];

// Agency filter
const AGENCIES = [
  { value: 'all', label: 'All Agencies' },
  { value: 'BBMP', label: 'BBMP' },
  { value: 'BWSSB', label: 'BWSSB' },
  { value: 'BESCOM', label: 'BESCOM' },
  { value: 'BMRCL', label: 'BMRCL (Metro)' },
  { value: 'BTP', label: 'Traffic Police' },
  { value: 'BDA', label: 'BDA' },
];

// Status filter
const STATUSES = [
  { value: 'all', label: 'All Statuses' },
  { value: 'PLANNED', label: 'Planned' },
  { value: 'WORKS_ONGOING', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
];

// Categorise happening by keywords
function categoriseHappening(h: Happening): string {
  const t = (h.title + ' ' + h.summary).toLowerCase();
  if (t.includes('road') || t.includes('pothole') || t.includes('resurf') || t.includes('flyover') || t.includes('footpath') || t.includes('junction')) return 'roads';
  if (t.includes('drain') || t.includes('swd') || t.includes('kaluve') || t.includes('stormwater')) return 'drains';
  if (t.includes('waste') || t.includes('swm') || t.includes('garbage') || t.includes('compost') || t.includes('dwcc') || t.includes('clean')) return 'waste';
  if (t.includes('streetlight') || t.includes('led') || t.includes('solar') || t.includes('light')) return 'streetlights';
  if (t.includes('water') || t.includes('bwssb') || t.includes('cauvery') || t.includes('borewell') || t.includes('stp')) return 'water';
  if (t.includes('lake') || t.includes('rejuvenation')) return 'lake';
  if (t.includes('cctv') || t.includes('anpr') || t.includes('safety') || t.includes('police')) return 'safety';
  if (t.includes('metro') || t.includes('bmrcl') || t.includes('namma metro')) return 'metro';
  return 'roads';
}

// Extract agency
function extractAgency(h: Happening): string {
  const s = h.source.toUpperCase();
  if (s.includes('BWSSB')) return 'BWSSB';
  if (s.includes('BESCOM')) return 'BESCOM';
  if (s.includes('BMRCL')) return 'BMRCL';
  if (s.includes('TRAFFIC POLICE') || s.includes('BTP')) return 'BTP';
  if (s.includes('BDA')) return 'BDA';
  return 'BBMP';
}

// Create marker icon by colour
const createCategoryIcon = (color: string) => new L.DivIcon({
  className: 'category-marker',
  html: `<div style="
    width: 28px; height: 28px; background: ${color};
    border: 3px solid white; border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
});

// ── Sub-components ──

function MapInteractionHandler({
  onLocationSelect,
  mapRef,
}: {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  mapRef: React.MutableRefObject<L.Map | null>;
}) {
  const map = useMapEvents({
    click: (e) => onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng }),
  });

  useEffect(() => { mapRef.current = map; }, [map, mapRef]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement?.closest('.leaflet-container')) {
        const center = map.getCenter();
        onLocationSelect({ lat: center.lat, lng: center.lng });
      }
    };
    const container = map.getContainer();
    container.addEventListener('keydown', handleKeyDown);
    container.setAttribute('tabindex', '0');
    container.setAttribute('role', 'application');
    container.setAttribute('aria-label', 'Interactive map of Bengaluru. Click or tap to select a location, or press Enter to mark the center.');
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [map, onLocationSelect]);

  return null;
}

function MapCenterButton({ center }: { center: [number, number] }) {
  const map = useMap();
  return (
    <button
      type="button"
      onClick={() => map.setView(center, 12, { animate: true })}
      className="absolute top-20 right-3 z-[1000] bg-card text-foreground p-2.5 rounded-lg shadow-md hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary border border-border"
      aria-label="Center map on Bengaluru"
    >
      <Navigation className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}

function UseMyLocationButton({ onLocationSelect }: { onLocationSelect: (loc: { lat: number; lng: number }) => void }) {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);

  const handleLocate = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          map.setView([pos.coords.latitude, pos.coords.longitude], 15, { animate: true });
          onLocationSelect({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsLocating(false);
        },
        () => setIsLocating(false),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleLocate}
      disabled={isLocating}
      className="absolute top-32 right-3 z-[1000] bg-card text-foreground p-2.5 rounded-lg shadow-md hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary border border-border disabled:opacity-50"
      aria-label="Use my current location"
    >
      <Locate className={`w-5 h-5 ${isLocating ? 'animate-pulse' : ''}`} aria-hidden="true" />
    </button>
  );
}

// ── Main export ──

interface CityMapProps {
  selectedLocation: { lat: number; lng: number } | null;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  onLocationDescriptionChange?: (description: string) => void;
  showHappenings?: boolean;
  className?: string;
}

export function CityMap({
  selectedLocation,
  onLocationSelect,
  onLocationDescriptionChange,
  showHappenings = true,
  className,
}: CityMapProps) {
  const [isMapReady, setIsMapReady] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [happenings, setHappenings] = useState<Happening[]>([]);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<MapFilterId>('all');
  const [agencyFilter, setAgencyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  // Bengaluru center — Vidhana Soudha / MG Road area
  const bengaluruCenter: [number, number] = [12.9716, 77.5946];

  useEffect(() => {
    const seen = localStorage.getItem('bbmp_map_guide_seen');
    if (seen) setShowGuide(false);
  }, []);

  useEffect(() => {
    if (showHappenings) {
      happeningsApi.getAllHappeningsForMap().then(setHappenings);
    }
  }, [showHappenings]);

  const handleDismissGuide = () => {
    setShowGuide(false);
    localStorage.setItem('bbmp_map_guide_seen', 'true');
  };

  // Filter happenings
  const filteredHappenings = useMemo(() => {
    return happenings.filter(h => {
      if (activeFilter !== 'all' && categoriseHappening(h) !== activeFilter) return false;
      if (agencyFilter !== 'all' && extractAgency(h) !== agencyFilter) return false;
      if (statusFilter !== 'all') {
        const ps = h.projectDetails?.status;
        if (statusFilter === 'WORKS_ONGOING' && ps !== 'WORKS_ONGOING') return false;
        if (statusFilter === 'PLANNED' && ps !== 'PLANNED' && ps !== 'FUNDED' && ps !== 'PROCUREMENT') return false;
        if (statusFilter === 'COMPLETED' && ps !== 'COMPLETED') return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!h.title.toLowerCase().includes(q) && !h.summary.toLowerCase().includes(q) && !(h.wardName || '').toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [happenings, activeFilter, agencyFilter, statusFilter, searchQuery]);

  // Voice command
  const handleVoiceCommand = useCallback(async () => {
    setVoiceError(null);
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setVoiceError('Voice not supported. Please tap the map.');
      return;
    }
    setIsVoiceListening(true);
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (e: any) => {
        const t = e.results[0][0].transcript.toLowerCase();
        if (t.includes('mark') || t.includes('here') || t.includes('this')) {
          if (mapRef.current) {
            const c = mapRef.current.getCenter();
            onLocationSelect({ lat: c.lat, lng: c.lng });
          }
        }
        setIsVoiceListening(false);
      };
      recognition.onerror = () => { setVoiceError('Could not hear you. Try again or tap the map.'); setIsVoiceListening(false); };
      recognition.onend = () => setIsVoiceListening(false);
      recognition.start();
    } catch {
      setVoiceError('Voice not available. Please tap the map.');
      setIsVoiceListening(false);
    }
  }, [onLocationSelect]);

  useEffect(() => {
    const t = setTimeout(() => setIsMapReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={className}>
      <div className="sr-only" id="map-description">
        Interactive map of Bengaluru. Tap to select a location, press Enter to mark the center, or say "Mark here."
        Civic project locations are shown as colored markers.
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Map category filters">
        {MAP_FILTERS.map((f) => {
          const Icon = f.icon;
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card text-foreground border-border hover:bg-muted'
              }`}
              aria-pressed={isActive}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Extended Filters Toggle */}
      <div className="mb-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Filter className="w-3.5 h-3.5" />
          {showFilters ? 'Hide filters' : 'More filters (Agency, Status, Search)'}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
            <Select value={agencyFilter} onValueChange={setAgencyFilter}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Agency" />
              </SelectTrigger>
              <SelectContent>
                {AGENCIES.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search project/area..."
                className="h-8 text-xs pl-7"
              />
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <div
        className="map-container relative h-[350px] md:h-[450px]"
        role="application"
        aria-label="Map of Bengaluru for selecting location"
        aria-describedby="map-description"
      >
        {showGuide && !selectedLocation && <MapGuide onDismiss={handleDismissGuide} />}

        <MapContainer
          center={bengaluruCenter}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          whenReady={() => setIsMapReady(true)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapInteractionHandler onLocationSelect={onLocationSelect} mapRef={mapRef} />
          <MapCenterButton center={bengaluruCenter} />
          <UseMyLocationButton onLocationSelect={onLocationSelect} />

          {/* User selected location */}
          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={userMarkerIcon}>
              <Popup><strong>Your selected location</strong></Popup>
            </Marker>
          )}

          {/* Project markers */}
          {showHappenings && filteredHappenings.map((h) => {
            const cat = categoriseHappening(h);
            const filterConfig = MAP_FILTERS.find(f => f.id === cat) || MAP_FILTERS[0];
            const status = h.projectDetails?.status;
            const statusLabel = status === 'COMPLETED' ? 'Completed' : status === 'WORKS_ONGOING' ? 'In Progress' : status === 'PLANNED' || status === 'FUNDED' ? 'Planned' : h.type;

            return (
              <Marker
                key={h.id}
                position={[h.lat, h.lng]}
                icon={createCategoryIcon(filterConfig.color)}
              >
                <Popup>
                  <div className="max-w-[240px]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: filterConfig.color }} />
                      <span className="text-xs font-medium uppercase text-gray-500">{filterConfig.label}</span>
                    </div>
                    <p className="font-semibold text-sm leading-tight">{h.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{h.summary.slice(0, 100)}...</p>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className={`px-1.5 py-0.5 rounded-full ${
                        statusLabel === 'Completed' ? 'bg-green-100 text-green-700' :
                        statusLabel === 'In Progress' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>{statusLabel}</span>
                      <span className="text-gray-500">{extractAgency(h)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 italic">Source: {h.source.slice(0, 60)}...</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {!isMapReady && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center rounded-xl">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary animate-pulse mx-auto mb-2" />
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}

        {/* Voice button */}
        <button
          type="button"
          onClick={handleVoiceCommand}
          disabled={isVoiceListening}
          className={`absolute bottom-4 left-4 z-[1000] flex items-center gap-2 px-3 py-2 rounded-lg shadow-md border border-border transition-all text-sm ${
            isVoiceListening
              ? 'bg-destructive text-destructive-foreground animate-pulse'
              : 'bg-card text-foreground hover:bg-muted'
          }`}
          aria-label={isVoiceListening ? 'Listening...' : 'Say "Mark here"'}
        >
          {isVoiceListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          <span className="font-medium">{isVoiceListening ? 'Listening...' : 'Say "Mark here"'}</span>
        </button>

        {/* Results count */}
        <div className="absolute top-3 left-3 z-[1000] bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-border text-xs text-muted-foreground">
          {filteredHappenings.length} projects shown
        </div>
      </div>

      {/* Voice error */}
      {voiceError && (
        <div className="mt-3 flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm" role="alert">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          <p className="text-destructive">{voiceError}</p>
        </div>
      )}

      {/* Location card */}
      {selectedLocation && (
        <LocationCard lat={selectedLocation.lat} lng={selectedLocation.lng} onLocationDescriptionChange={onLocationDescriptionChange} className="mt-4" />
      )}

      {!selectedLocation && !showGuide && (
        <p className="mt-3 text-sm text-muted-foreground">
          <strong>Tap on the map</strong>, use your GPS location, press Enter, or say "Mark here" to select your location.
        </p>
      )}

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {(activeFilter !== 'all'
          ? MAP_FILTERS.filter(f => f.id === activeFilter)
          : MAP_FILTERS.filter(f => f.id !== 'all')
        ).map(f => (
          <div key={f.id} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: f.color }} />
            <span>{f.label}</span>
          </div>
        ))}
        {selectedLocation && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>Selected</span>
          </div>
        )}
      </div>
    </div>
  );
}

export { MAP_FILTERS };
export type { MapFilterId, CityMapProps };
