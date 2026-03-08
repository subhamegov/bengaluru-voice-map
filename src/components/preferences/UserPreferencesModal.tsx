import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, MapPin, Bell, Check, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { WARDS, ISSUE_CATEGORIES, IssueCategory } from '@/types/story';
import { ISSUE_CATEGORY_ICONS } from '@/lib/iconMaps';
import { toast } from 'sonner';
import { fetchOSMWards, getWardList, type WardFeatureCollection } from '@/services/osmWards';
import { loadWardPref, saveWardPref, type WardPref } from '@/services/wardPreferences';

export interface UserPreferences {
  subscribedWards: string[];
  preferredTopics: IssueCategory[];
}

interface UserPreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (preferences: UserPreferences) => void;
}

const STORAGE_KEY = 'bengaluru_citizen_preferences';

const TOPICS = ISSUE_CATEGORIES.map(cat => ({
  code: cat.code,
  label: cat.label,
  description: cat.description,
}));

export const loadUserPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to load preferences:', e);
  }
  return { subscribedWards: [], preferredTopics: ISSUE_CATEGORIES.map(c => c.code) };
};

export const saveUserPreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (e) {
    console.error('Failed to save preferences:', e);
  }
};

export const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  const [selectedWards, setSelectedWards] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<IssueCategory[]>([]);
  const [osmWards, setOsmWards] = useState<{ id: string; name: string }[]>([]);
  const [osmLoading, setOsmLoading] = useState(false);
  // Multi-ward selection
  const [selectedOsmWardIds, setSelectedOsmWardIds] = useState<string[]>([]);
  const [defaultWardId, setDefaultWardId] = useState<string | null>(null);
  const [defaultWardSearch, setDefaultWardSearch] = useState('');

  useEffect(() => {
    if (open) {
      const saved = loadUserPreferences();
      setSelectedWards(saved.subscribedWards);
      setSelectedTopics(saved.preferredTopics);
      const wp = loadWardPref();
      setDefaultWardId(wp.defaultWardId);
      setSelectedOsmWardIds(wp.selectedWardIds);
      setOsmLoading(true);
      fetchOSMWards().then(fc => {
        setOsmWards(getWardList(fc));
        setOsmLoading(false);
      });
    }
  }, [open]);

  const filteredOsmWards = osmWards.filter(w =>
    w.name.toLowerCase().includes(defaultWardSearch.toLowerCase())
  );

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  const handleOsmWardToggle = (wardId: string) => {
    setSelectedOsmWardIds(prev => {
      if (prev.includes(wardId)) {
        const next = prev.filter(id => id !== wardId);
        // If removing the default ward, clear default
        if (defaultWardId === wardId) setDefaultWardId(next[0] ?? null);
        return next;
      }
      return [...prev, wardId];
    });
  };

  const handleSetDefault = (wardId: string) => {
    setDefaultWardId(wardId);
    // Ensure it's also selected
    if (!selectedOsmWardIds.includes(wardId)) {
      setSelectedOsmWardIds(prev => [...prev, wardId]);
    }
  };

  const handleWardToggle = (wardCode: string) => {
    setSelectedWards(prev =>
      prev.includes(wardCode) ? prev.filter(w => w !== wardCode) : [...prev, wardCode]
    );
  };

  const handleTopicToggle = (topic: IssueCategory) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleSelectAllWards = () => {
    setSelectedWards(prev => prev.length === WARDS.length ? [] : WARDS.map(w => w.code));
  };

  const handleSelectAllTopics = () => {
    setSelectedTopics(prev => prev.length === TOPICS.length ? [] : TOPICS.map(t => t.code));
  };

  const handleSave = () => {
    const preferences: UserPreferences = {
      subscribedWards: selectedWards,
      preferredTopics: selectedTopics,
    };
    saveUserPreferences(preferences);
    // Save ward pref with multiple localities
    const wardPref: WardPref = {
      defaultWardId,
      defaultWardName: osmWards.find(w => w.id === defaultWardId)?.name ?? null,
      selectedWardIds: selectedOsmWardIds,
      selectedWardNames: selectedOsmWardIds.map(id => osmWards.find(w => w.id === id)?.name ?? id),
    };
    saveWardPref(wardPref);
    onSave?.(preferences);
    toast.success('Preferences saved successfully', {
      description: `Following ${selectedOsmWardIds.length} locality/ies and ${selectedTopics.length} topic(s)`,
    });
    onOpenChange(false);
  };

  const wardsBySubcounty = WARDS.reduce((acc, ward) => {
    if (!acc[ward.subcounty]) acc[ward.subcounty] = [];
    acc[ward.subcounty].push(ward);
    return acc;
  }, {} as Record<string, typeof WARDS>);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0" style={{ zIndex: 99999 }}>
      {/* Scrim */}
      <div
        className="fixed inset-0 bg-black/60"
        style={{ zIndex: 99999 }}
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className="fixed inset-x-0 bottom-0 mx-auto flex flex-col rounded-t-2xl shadow-xl !bg-white dark:!bg-neutral-950"
        style={{ zIndex: 100000, maxWidth: 720, maxHeight: '85vh' }}
        role="dialog"
        aria-modal="true"
        aria-label="My Preferences"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-neutral-300" />
        </div>

        {/* Sticky Header */}
        <div className="flex items-start justify-between px-6 pt-2 pb-4 border-b border-border shrink-0">
          <div>
            <h2 className="flex items-center gap-2 text-foreground" style={{ fontSize: 24, fontWeight: 600, lineHeight: '32px' }}>
              <Bell className="w-5 h-5 text-primary" />
              My Preferences
            </h2>
            <p className="mt-1" style={{ fontSize: 16, fontWeight: 400, color: '#6B7280' }}>
              Select the wards and topics you want to follow
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-muted transition-colors"
            style={{ zIndex: 9992 }}
            aria-label="Close"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 space-y-8">
          {/* Saved Localities (OSM multi-select) */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="w-5 h-5 text-primary" />
              <h3 className="text-foreground" style={{ fontSize: 20, fontWeight: 600, lineHeight: '28px' }}>My Localities</h3>
              {selectedOsmWardIds.length > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {selectedOsmWardIds.length} saved
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Select wards to pin on the map. Mark one as your default ward to auto-focus.
            </p>

            {osmLoading ? (
              <div className="p-4 text-sm text-muted-foreground">Loading ward boundaries…</div>
            ) : osmWards.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground bg-muted rounded-lg">
                Ward boundaries are unavailable right now.
              </div>
            ) : (
              <div>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={defaultWardSearch}
                    onChange={e => setDefaultWardSearch(e.target.value)}
                    placeholder="Search wards…"
                    className="pl-9 pr-9 h-9 text-sm"
                  />
                  {defaultWardSearch && (
                    <button
                      type="button"
                      onClick={() => setDefaultWardSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="max-h-[220px] overflow-y-auto border border-border rounded-lg">
                  {filteredOsmWards.map(w => {
                    const isSelected = selectedOsmWardIds.includes(w.id);
                    const isDefault = defaultWardId === w.id;
                    return (
                      <div
                        key={w.id}
                        className={`flex items-center gap-3 px-3 py-2 text-sm border-b border-border last:border-b-0 transition-colors ${
                          isSelected ? 'bg-primary/5' : 'hover:bg-muted'
                        }`}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleOsmWardToggle(w.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className="flex-1 text-foreground">{w.name}</span>
                        {isSelected && (
                          <button
                            type="button"
                            onClick={() => handleSetDefault(w.id)}
                            className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                              isDefault
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                            }`}
                          >
                            {isDefault ? '★ Default' : 'Set default'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Ward Selection (existing sub-county wards) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-foreground" style={{ fontSize: 20, fontWeight: 600, lineHeight: '28px' }}>My Wards</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {selectedWards.length} selected
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSelectAllWards} className="text-xs text-muted-foreground hover:text-primary">
                {selectedWards.length === WARDS.length ? 'Clear all' : 'Select all'}
              </Button>
            </div>

            <div className="space-y-4">
              {Object.entries(wardsBySubcounty).map(([subcounty, wards]) => (
                <div key={subcounty}>
                  <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', color: '#6B7280', textTransform: 'uppercase' as const }} className="mb-2">
                    {subcounty}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {wards.map(ward => (
                      <label
                        key={ward.code}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedWards.includes(ward.code)
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <Checkbox
                          checked={selectedWards.includes(ward.code)}
                          onCheckedChange={() => handleWardToggle(ward.code)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px' }} className="text-foreground">{ward.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-secondary" />
                <h3 className="text-foreground" style={{ fontSize: 20, fontWeight: 600, lineHeight: '28px' }}>Topics of Interest</h3>
                <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                  {selectedTopics.length} selected
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSelectAllTopics} className="text-xs text-muted-foreground hover:text-secondary">
                {selectedTopics.length === TOPICS.length ? 'Clear all' : 'Select all'}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {TOPICS.map(topic => (
                <label
                  key={topic.code}
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTopics.includes(topic.code)
                      ? 'border-secondary bg-secondary/5'
                      : 'border-border hover:border-secondary/50 hover:bg-muted/50'
                  }`}
                >
                  <Checkbox
                    checked={selectedTopics.includes(topic.code)}
                    onCheckedChange={() => handleTopicToggle(topic.code)}
                    className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  />
                  {(() => { const Icon = ISSUE_CATEGORY_ICONS[topic.code]; return <Icon className="w-6 h-6 text-primary" aria-hidden="true" />; })()}
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{topic.label}</p>
                    <p className="text-xs text-muted-foreground">{topic.description}</p>
                  </div>
                  {selectedTopics.includes(topic.code) && (
                    <Check className="w-5 h-5 text-secondary" />
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/30 shrink-0">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSave}>
              Save &amp; Mark
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Your preferences are saved locally on this device
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};
