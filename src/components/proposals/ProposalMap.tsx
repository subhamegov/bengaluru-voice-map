import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { useMapTiles } from '@/hooks/use-map-tiles';
import { Proposal, getCategoryColor, getCategoryLabel } from '@/types/proposal';
import { Locate } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface Props {
  proposals: Proposal[];
  onView: (p: Proposal) => void;
  onSupport: (id: string) => void;
}

function createProposalIcon(color: string, size = 22) {
  return new L.DivIcon({
    className: 'proposal-marker',
    html: `<div style="
      width:${size}px; height:${size}px; background:${color};
      border:3px solid white; border-radius:50%;
      box-shadow:0 2px 6px rgba(0,0,0,0.25);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 2)],
  });
}

const STATUS_LABEL: Record<string, string> = {
  draft: 'Draft', open: 'Open', under_review: 'Under Review', approved: 'Approved', rejected: 'Rejected',
};

/* ── Locate Me button (GPS) — matches CityMap behaviour ── */
function LocateMeButton({ onLocated }: { onLocated: (loc: { lat: number; lng: number }) => void }) {
  const map = useMap();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const el = buttonRef.current;
    if (el) {
      L.DomEvent.disableClickPropagation(el);
      L.DomEvent.disableScrollPropagation(el);
    }
  }, []);

  const handleLocate = useCallback((e: React.MouseEvent) => {
    L.DomEvent.stop(e.nativeEvent as any);
    setIsLocating(true);
    if (!('geolocation' in navigator)) {
      console.warn('Geolocation not available');
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        map.setView([loc.lat, loc.lng], 15, { animate: true });
        onLocated(loc);
        setIsLocating(false);
      },
      (error) => {
        console.error('Geolocation error:', error.message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  }, [map, onLocated]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleLocate}
      disabled={isLocating}
      className="absolute top-20 right-3 z-[9995] bg-card text-foreground p-3 rounded-lg shadow-lg hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary border border-border disabled:opacity-50 pointer-events-auto"
      style={{ opacity: 1 }}
      aria-label="Locate me"
      title="Go to my GPS location"
    >
      <Locate className={`w-5 h-5 ${isLocating ? 'animate-pulse' : ''}`} aria-hidden="true" />
    </button>
  );
}

/* ── Stable popup that won't re-render on parent state changes ── */
function StablePopup({
  proposal,
  onView,
  onSupport,
}: {
  proposal: Proposal;
  onView: (p: Proposal) => void;
  onSupport: (id: string) => void;
}) {
  const onViewRef = useRef(onView);
  const onSupportRef = useRef(onSupport);
  onViewRef.current = onView;
  onSupportRef.current = onSupport;

  return (
    <Popup maxWidth={260} minWidth={200} autoPan closeOnClick={false}>
      <div style={{ minWidth: 180 }}>
        <p style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3, margin: '0 0 6px 0' }}>
          {proposal.title}
        </p>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
          <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: 12,
            fontSize: 11, fontWeight: 500, color: 'white',
            background: getCategoryColor(proposal.category),
          }}>
            {getCategoryLabel(proposal.category)}
          </span>
          <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: 12,
            fontSize: 11, fontWeight: 500, color: '#555',
            background: '#f0f0f0',
          }}>
            {STATUS_LABEL[proposal.status] ?? proposal.status}
          </span>
        </div>
        <p style={{ fontSize: 12, color: '#666', margin: '0 0 8px 0' }}>
          👍 {proposal.supportCount} &nbsp; 💬 {proposal.commentCount}
        </p>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            style={{
              fontSize: 12, padding: '5px 12px', borderRadius: 4, fontWeight: 600,
              background: 'hsl(231 48% 40%)', color: 'white', border: 'none', cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              // Close the popup first by finding the map
              const popupEl = (e.target as HTMLElement).closest('.leaflet-popup');
              if (popupEl) {
                const closeBtn = popupEl.querySelector('.leaflet-popup-close-button') as HTMLElement;
                closeBtn?.click();
              }
              // Delay opening dialog to let popup close cleanly
              setTimeout(() => onViewRef.current(proposal), 50);
            }}
          >
            View Details
          </button>
          <button
            style={{
              fontSize: 12, padding: '5px 12px', borderRadius: 4, fontWeight: 500,
              background: 'white', color: '#333', border: '1px solid #ddd', cursor: 'pointer',
              opacity: proposal.supportedByUser ? 0.5 : 1,
            }}
            disabled={proposal.supportedByUser}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onSupportRef.current(proposal.id);
            }}
          >
            {proposal.supportedByUser ? 'Supported' : 'Support'}
          </button>
        </div>
      </div>
    </Popup>
  );
}

export const ProposalMap = React.memo(function ProposalMap({ proposals, onView, onSupport }: Props) {
  const tiles = useMapTiles();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const center: [number, number] = useMemo(() => {
    if (proposals.length === 0) return [12.9716, 77.5946];
    const avgLat = proposals.reduce((s, p) => s + p.lat, 0) / proposals.length;
    const avgLng = proposals.reduce((s, p) => s + p.lng, 0) / proposals.length;
    return [avgLat, avgLng];
  }, [proposals]);

  const icons = useMemo(() => {
    const m = new window.Map<string, L.DivIcon>();
    proposals.forEach(p => {
      if (!m.has(p.category)) {
        m.set(p.category, createProposalIcon(getCategoryColor(p.category)));
      }
    });
    return m;
  }, [proposals]);

  const handleLocated = useCallback((loc: { lat: number; lng: number }) => {
    setUserLocation(loc);
  }, []);

  return (
    <div className="rounded-lg border-2 border-border shadow-md overflow-hidden" style={{ height: 500 }}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom
        className="rounded-lg"
      >
        <TileLayer url={tiles.url} attribution={tiles.attribution} subdomains={tiles.subdomains} maxZoom={tiles.maxZoom} />
        <LocateMeButton onLocated={handleLocated} />
        {userLocation && (
          <CircleMarker
            center={[userLocation.lat, userLocation.lng]}
            radius={10}
            pathOptions={{ color: 'hsl(231 48% 48%)', fillColor: 'hsl(231 48% 48%)', fillOpacity: 0.9, weight: 3 }}
            className="you-are-here-marker"
          >
            <Popup>
              <span style={{ fontWeight: 600, fontSize: 13 }}>📍 You are here</span>
            </Popup>
          </CircleMarker>
        )}
        {proposals.map(p => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={icons.get(p.category) ?? createProposalIcon('#6B7280')}
          >
            <StablePopup proposal={p} onView={onView} onSupport={onSupport} />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
});
