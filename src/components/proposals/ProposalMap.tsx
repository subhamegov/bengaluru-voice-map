import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useMapTiles } from '@/hooks/use-map-tiles';
import { Proposal, getCategoryColor, getCategoryLabel } from '@/types/proposal';
import 'leaflet/dist/leaflet.css';

interface Props {
  proposals: Proposal[];
  onView: (p: Proposal) => void;
  onSupport: (id: string) => void;
}

function createProposalIcon(color: string, size = 24) {
  return new L.DivIcon({
    className: 'proposal-marker',
    html: `<div style="
      width:${size}px; height:${size}px; background:${color};
      border:3px solid white; border-radius:50%;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

const STATUS_LABEL: Record<string, string> = {
  draft: 'Draft', open: 'Open', under_review: 'Under Review', approved: 'Approved', rejected: 'Rejected',
};

// Use refs for callbacks so Marker children don't re-render on parent state change
function StablePopup({ proposal, onView, onSupport }: { proposal: Proposal; onView: (p: Proposal) => void; onSupport: (id: string) => void }) {
  const onViewRef = useRef(onView);
  const onSupportRef = useRef(onSupport);
  onViewRef.current = onView;
  onSupportRef.current = onSupport;

  return (
    <Popup maxWidth={280} autoPan={false}>
      <div className="space-y-2 p-1">
        <h4 className="font-semibold text-sm leading-tight">{proposal.title}</h4>
        <div className="flex flex-wrap gap-1">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ background: getCategoryColor(proposal.category), color: 'white' }}
          >
            {getCategoryLabel(proposal.category)}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            {STATUS_LABEL[proposal.status] ?? proposal.status}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>👍 {proposal.supportCount}</span>
          <span>💬 {proposal.commentCount}</span>
        </div>
        <div className="flex gap-1 pt-1">
          <button
            className="text-xs px-3 py-1.5 rounded font-medium text-primary-foreground"
            style={{ background: 'hsl(231 48% 40%)' }}
            onClick={(e) => { e.stopPropagation(); onViewRef.current(proposal); }}
          >
            View Details
          </button>
          <button
            className="text-xs px-3 py-1.5 rounded border border-border text-foreground hover:bg-muted disabled:opacity-50"
            onClick={(e) => { e.stopPropagation(); onSupportRef.current(proposal.id); }}
            disabled={proposal.supportedByUser}
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

  const center: [number, number] = useMemo(() => {
    if (proposals.length === 0) return [12.9716, 77.5946];
    const avgLat = proposals.reduce((s, p) => s + p.lat, 0) / proposals.length;
    const avgLng = proposals.reduce((s, p) => s + p.lng, 0) / proposals.length;
    return [avgLat, avgLng];
  }, [proposals]);

  const icons = useMemo(() => {
    const map = new Map<string, L.DivIcon>();
    proposals.forEach(p => {
      const key = p.category;
      if (!map.has(key)) {
        map.set(key, createProposalIcon(getCategoryColor(p.category)));
      }
    });
    return map;
  }, [proposals]);

  return (
    <div className="map-container" style={{ height: '500px' }}>
      <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <TileLayer url={tiles.url} attribution={tiles.attribution} subdomains={tiles.subdomains} maxZoom={tiles.maxZoom} />
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
