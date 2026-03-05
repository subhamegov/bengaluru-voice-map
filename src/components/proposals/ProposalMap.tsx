import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMapTiles } from '@/hooks/use-map-tiles';
import { Proposal, getCategoryColor, getCategoryLabel } from '@/types/proposal';
import 'leaflet/dist/leaflet.css';

interface Props {
  proposals: Proposal[];
  onView: (p: Proposal) => void;
  onSupport: (id: string) => void;
}

function createProposalIcon(color: string, isDefault: boolean) {
  const size = isDefault ? 32 : 24;
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

export function ProposalMap({ proposals, onView, onSupport }: Props) {
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
        map.set(key, createProposalIcon(getCategoryColor(p.category), false));
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
            icon={icons.get(p.category) ?? createProposalIcon('#6B7280', false)}
          >
            <Popup maxWidth={280}>
              <div className="space-y-2 p-1">
                <h4 className="font-semibold text-sm">{p.title}</h4>
                <div className="flex flex-wrap gap-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: getCategoryColor(p.category), color: 'white' }}>
                    {getCategoryLabel(p.category)}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-0.5">👍 {p.supportCount}</span>
                  <span className="flex items-center gap-0.5">💬 {p.commentCount}</span>
                  <span>{p.status}</span>
                </div>
                <div className="flex gap-1 pt-1">
                  <button
                    className="text-xs px-2 py-1 rounded bg-primary text-white hover:opacity-90"
                    style={{ background: 'hsl(231 48% 40%)', color: 'white' }}
                    onClick={() => onView(p)}
                  >
                    View Details
                  </button>
                  <button
                    className="text-xs px-2 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
                    onClick={() => onSupport(p.id)}
                    disabled={p.supportedByUser}
                  >
                    {p.supportedByUser ? 'Supported' : 'Support'}
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
