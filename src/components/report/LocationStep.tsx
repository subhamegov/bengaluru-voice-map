import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Mic, MicOff, Navigation, ChevronDown, HardHat, Check, Building2, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BENGALURU_ZONES, getWardsBySubCounty, getZonesByWard, reverseGeocodeToWard, Ward, Zone } from '@/lib/bengaluruAdminData';
import { Badge } from '@/components/ui/badge';
import { ComplaintIntent, LinkedProject } from './ComplaintIntentStep';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const locationMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export interface LocationData {
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  admin: {
    subCounty: string;
    ward: string;
    wardCode: string;
    zone: string;
  };
  description: string;
}

interface LocationStepProps {
  location: LocationData;
  onLocationChange: (location: LocationData) => void;
  intent?: ComplaintIntent | null;
  linkedProject?: LinkedProject | null;
  onLinkedProjectChange?: (project: LinkedProject | null) => void;
}

// Mock projects for demonstration
const MOCK_PROJECTS: LinkedProject[] = [
  {
    id: 'PRJ-001',
    title: 'Stormwater Drain Desilting – HSR Layout',
    category: 'Drains & SWD',
    status: 'Ongoing',
    agency: 'BBMP SWD Division'
  },
  {
    id: 'PRJ-002',
    title: 'Road Resurfacing – 80 Feet Road, Koramangala',
    category: 'Roads & Infrastructure',
    status: 'Ongoing',
    agency: 'BBMP Roads Division'
  },
  {
    id: 'PRJ-003',
    title: 'Cauvery Pipeline Extension – JP Nagar',
    category: 'Water Supply',
    status: 'Planned',
    agency: 'BWSSB'
  },
  {
    id: 'PRJ-004',
    title: 'LED Streetlight Replacement – Malleshwaram',
    category: 'Streetlights',
    status: 'Completed',
    agency: 'BBMP Electrical Division'
  }
];

// Map click handler component
function MapClickHandler({ 
  onLocationSelect 
}: { 
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

// Use my location button
function UseMyLocationButton({ 
  onLocationFound 
}: { 
  onLocationFound: (lat: number, lng: number) => void;
}) {
  const map = useMap();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!navigator.geolocation) return;
    
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 15);
        onLocationFound(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="absolute top-3 right-3 z-[1000] bg-background border border-border rounded-lg p-2.5 shadow-md hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Use my current location"
    >
      <Navigation className={cn("w-5 h-5", loading && "animate-pulse")} />
    </button>
  );
}

export function LocationStep({ location, onLocationChange, intent, linkedProject, onLinkedProjectChange }: LocationStepProps) {
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  
  // Available wards based on selected sub-county
  const [availableWards, setAvailableWards] = useState<Ward[]>([]);
  const [availableZones, setAvailableZones] = useState<Zone[]>([]);

  // Update available wards when sub-county changes
  useEffect(() => {
    if (location.admin.subCounty) {
      const wards = getWardsBySubCounty(location.admin.subCounty);
      setAvailableWards(wards);
      // Reset ward and zone if sub-county changed and current ward not in new list
      if (!wards.find(w => w.code === location.admin.wardCode)) {
        onLocationChange({
          ...location,
          admin: { ...location.admin, ward: '', wardCode: '', zone: '' }
        });
      }
    } else {
      setAvailableWards([]);
    }
  }, [location.admin.subCounty]);

  // Update available zones when ward changes
  useEffect(() => {
    if (location.admin.subCounty && location.admin.wardCode) {
      const zones = getZonesByWard(location.admin.subCounty, location.admin.wardCode);
      setAvailableZones(zones);
    } else {
      setAvailableZones([]);
    }
  }, [location.admin.wardCode]);

  const handleMapClick = (lat: number, lng: number) => {
    // Reverse geocode to find the ward
    const wardInfo = reverseGeocodeToWard(lat, lng);
    
    if (wardInfo) {
      // Auto-populate the admin fields
      onLocationChange({
        ...location,
        coordinates: { lat, lng },
        admin: {
          subCounty: wardInfo.subCounty,
          ward: wardInfo.wardName,
          wardCode: wardInfo.wardCode,
          zone: wardInfo.zone
        }
      });
    } else {
      // Just set coordinates if no ward found
      onLocationChange({
        ...location,
        coordinates: { lat, lng }
      });
    }
  };

  const handleSubCountyChange = (subCounty: string) => {
    // Clear map coordinates when user manually changes dropdown
    onLocationChange({
      ...location,
      coordinates: null,
      admin: { 
        subCounty, 
        ward: '', 
        wardCode: '',
        zone: '' 
      }
    });
  };

  const handleWardChange = (wardCode: string) => {
    const ward = availableWards.find(w => w.code === wardCode);
    // Clear map coordinates when user manually changes dropdown
    onLocationChange({
      ...location,
      coordinates: null,
      admin: { 
        ...location.admin, 
        ward: ward?.name || '', 
        wardCode,
        zone: '' 
      }
    });
  };

  const handleZoneChange = (zone: string) => {
    onLocationChange({
      ...location,
      admin: { ...location.admin, zone }
    });
  };

  const handleDescriptionChange = (description: string) => {
    onLocationChange({
      ...location,
      description
    });
  };

  // Voice recording logic
  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setVoiceError('Voice input is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsVoiceRecording(true);
      setVoiceError(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setVoiceTranscript(transcript);
    };

    recognition.onend = () => {
      setIsVoiceRecording(false);
      // Save transcript to location description
      if (voiceTranscript) {
        onLocationChange({
          ...location,
          description: voiceTranscript
        });
      }
    };

    recognition.onerror = (event: any) => {
      setIsVoiceRecording(false);
      if (event.error === 'not-allowed') {
        setVoiceError('Microphone access was denied. Please allow microphone access.');
      } else {
        setVoiceError('Voice input failed. Please try again or type your location.');
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Nairobi center coordinates
  const BENGALURU_CENTER: [number, number] = [12.9716, 77.5946];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          Where is the issue?
        </h2>
        <p className="text-muted-foreground text-sm">
          Choose one of three ways to tell us the location: tap the map, use your voice, or select from the dropdowns below.
        </p>
      </div>

      {/* Section A: Vanilla Map */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Option 1: Tap on the map
        </h3>
        <p className="text-sm text-muted-foreground">
          Tap on the map to drop a pin, or use your current location.
        </p>
        
        <div 
          className="relative rounded-xl overflow-hidden border border-border"
          role="application"
          aria-label="Map of Bengaluru. Use this to select where the issue is."
        >
          <MapContainer
            center={location.coordinates ? [location.coordinates.lat, location.coordinates.lng] : BENGALURU_CENTER}
            zoom={12}
            style={{ height: '280px', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onLocationSelect={handleMapClick} />
            <UseMyLocationButton onLocationFound={handleMapClick} />
            
            {location.coordinates && (
              <Marker 
                position={[location.coordinates.lat, location.coordinates.lng]}
                icon={locationMarkerIcon}
                draggable={true}
                eventHandlers={{
                  dragend: (e) => {
                    const marker = e.target;
                    const position = marker.getLatLng();
                    handleMapClick(position.lat, position.lng);
                  }
                }}
              />
            )}
          </MapContainer>
        </div>

        {location.coordinates && (
          <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg">
            <MapPin className="w-4 h-4" />
            <span>
              Location selected: {location.coordinates.lat.toFixed(5)}, {location.coordinates.lng.toFixed(5)}
            </span>
          </div>
        )}
      </div>

      {/* Section B: Voice Input */}
      <div className="space-y-3 border-t border-border pt-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Mic className="w-4 h-4 text-primary" />
          Option 2: Describe with your voice
        </h3>
        <p className="text-sm text-muted-foreground">
          Speak a description of the location, for example: "Near Lalbagh main gate" or "Opposite Forum Mall, Koramangala."
        </p>

        <button
          type="button"
          onClick={isVoiceRecording ? stopVoiceRecording : startVoiceRecording}
          className={cn(
            "w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl font-medium transition-all border-2",
            isVoiceRecording 
              ? "border-destructive bg-destructive/10 text-destructive animate-pulse" 
              : "border-border bg-card text-foreground hover:border-primary/50"
          )}
          aria-label={isVoiceRecording ? "Stop recording" : "Record your voice description of the location"}
        >
          {isVoiceRecording ? (
            <>
              <MicOff className="w-5 h-5" />
              <span>Stop recording...</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span>Describe the area with your voice</span>
            </>
          )}
        </button>

        {voiceError && (
          <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
            {voiceError}
          </p>
        )}

        {(voiceTranscript || location.description) && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Voice transcription:
            </label>
            <textarea
              value={location.description || voiceTranscript}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Your voice description will appear here..."
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
            />
          </div>
        )}
      </div>

      {/* Section C: Screen-Reader Friendly Dropdowns */}
      <div className="space-y-4 border-t border-border pt-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <ChevronDown className="w-4 h-4 text-primary" />
          Option 3: Select from list
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose your sub-county, ward, and optionally the local area.
        </p>

        {/* Sub-county dropdown */}
        <div>
          <label htmlFor="subcounty-select" className="block text-sm font-medium text-foreground mb-1.5">
            Sub-county <span className="text-destructive">*</span>
          </label>
          <select
            id="subcounty-select"
            value={location.admin.subCounty}
            onChange={(e) => handleSubCountyChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            aria-describedby="subcounty-help"
          >
            <option value="">Select sub-county...</option>
            {BENGALURU_ZONES.map((sc) => (
              <option key={sc.name} value={sc.name}>
                {sc.name}
              </option>
            ))}
          </select>
          <p id="subcounty-help" className="text-xs text-muted-foreground mt-1">
            The sub-county where the issue is located
          </p>
        </div>

        {/* Ward dropdown */}
        <div>
          <label htmlFor="ward-select" className="block text-sm font-medium text-foreground mb-1.5">
            Ward <span className="text-destructive">*</span>
          </label>
          <select
            id="ward-select"
            value={location.admin.wardCode}
            onChange={(e) => handleWardChange(e.target.value)}
            disabled={!location.admin.subCounty}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
            aria-describedby="ward-help"
          >
            <option value="">Select ward...</option>
            {availableWards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>
          <p id="ward-help" className="text-xs text-muted-foreground mt-1">
            {location.admin.subCounty 
              ? `Wards in ${location.admin.subCounty}` 
              : 'First select a sub-county'}
          </p>
        </div>

        {/* Zone dropdown (optional) */}
        <div>
          <label htmlFor="zone-select" className="block text-sm font-medium text-foreground mb-1.5">
            Zone / Local area <span className="text-muted-foreground text-xs">(optional)</span>
          </label>
          <select
            id="zone-select"
            value={location.admin.zone}
            onChange={(e) => handleZoneChange(e.target.value)}
            disabled={!location.admin.wardCode}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
            aria-describedby="zone-help"
          >
            <option value="">Select zone (optional)...</option>
            {availableZones.map((zone) => (
              <option key={zone.name} value={zone.name}>
                {zone.name}
              </option>
            ))}
          </select>
          <p id="zone-help" className="text-xs text-muted-foreground mt-1">
            {location.admin.wardCode 
              ? `Local areas in ${location.admin.ward}` 
              : 'First select a ward'}
          </p>
        </div>

        {/* Free-text landmark field */}
        <div>
          <label htmlFor="landmark-input" className="block text-sm font-medium text-foreground mb-1.5">
            Nearby landmark <span className="text-muted-foreground text-xs">(optional)</span>
          </label>
          <input
            id="landmark-input"
            type="text"
            value={location.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="e.g., Near Lalbagh West Gate, opposite SBI branch"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            aria-describedby="landmark-help"
          />
          <p id="landmark-help" className="text-xs text-muted-foreground mt-1">
            Add a landmark or street name to help us find the exact spot
          </p>
        </div>
      </div>

      {/* Location summary */}
      {(location.coordinates || (location.admin.subCounty && location.admin.wardCode) || location.description) && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
          <h4 className="font-medium text-foreground text-sm">Location Summary</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            {location.coordinates && (
              <p className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Map pin: {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}</p>
            )}
            {location.admin.subCounty && location.admin.wardCode && (
              <p className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {location.admin.ward}, {location.admin.subCounty}{location.admin.zone ? ` (${location.admin.zone})` : ''}</p>
            )}
            {location.description && (
              <p className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {location.description}</p>
            )}
          </div>
        </div>
      )}

      {/* Project Selection (only when intent is 'project' and location is selected) */}
      {intent === 'project' && 
       onLinkedProjectChange && 
       (location.coordinates || (location.admin.subCounty && location.admin.wardCode)) && (
        <ProjectSelection 
          linkedProject={linkedProject || null}
          onLinkedProjectChange={onLinkedProjectChange}
          wardName={location.admin.ward}
        />
      )}
    </div>
  );
}

// Project Selection Component
function ProjectSelection({ 
  linkedProject, 
  onLinkedProjectChange,
  wardName 
}: { 
  linkedProject: LinkedProject | null;
  onLinkedProjectChange: (project: LinkedProject | null) => void;
  wardName: string;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-muted text-muted-foreground';
      case 'Ongoing': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="border-t border-border pt-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <HardHat className="w-5 h-5 text-primary" />
          Link to a project near {wardName || 'your location'}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select a project to share your feedback about, or skip this step.
        </p>
      </div>

      {MOCK_PROJECTS.length > 0 ? (
        <div className="space-y-3">
          <div className="grid gap-3 max-h-[280px] overflow-y-auto pr-1">
            {MOCK_PROJECTS.map((project) => (
              <button
                key={project.id}
                onClick={() => onLinkedProjectChange(
                  linkedProject?.id === project.id ? null : project
                )}
                className={cn(
                  'w-full text-left p-4 rounded-lg border-2 transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-primary',
                  linkedProject?.id === project.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/40'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium text-foreground">
                        {project.title}
                      </h4>
                      <Badge className={cn('text-xs', getStatusColor(project.status))}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>{project.category}</span>
                      <span>•</span>
                      <span>{project.agency}</span>
                    </div>
                  </div>
                  {linkedProject?.id === project.id && (
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Skip option */}
          <button
            onClick={() => onLinkedProjectChange(null)}
            className={cn(
              "w-full text-center text-sm py-3 rounded-lg border-2 transition-all",
              !linkedProject 
                ? "border-primary bg-primary/5 text-foreground font-medium"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            )}
          >
            {linkedProject ? "Continue without selecting a project" : "No project selected (general feedback)"}
          </button>
        </div>
      ) : (
        <div className="text-center py-8 bg-muted/30 rounded-xl">
          <HardHat className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            No active projects found near your selected area.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            You can still share general project feedback.
          </p>
        </div>
      )}
    </div>
  );
}
