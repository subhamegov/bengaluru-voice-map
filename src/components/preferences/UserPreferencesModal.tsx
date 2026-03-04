import React, { useState, useEffect } from 'react';
import { X, MapPin, Bell, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WARDS, ISSUE_CATEGORIES, IssueCategory } from '@/types/story';
import { toast } from 'sonner';

export interface UserPreferences {
  subscribedWards: string[];
  preferredTopics: IssueCategory[];
}

interface UserPreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (preferences: UserPreferences) => void;
}

const STORAGE_KEY = 'nairobi_citizen_preferences';

// Topic definitions with friendly labels
const TOPICS = [
  { code: 'roads' as IssueCategory, label: 'Roads & Potholes', icon: '🛣️', description: 'Road repairs, potholes, traffic' },
  { code: 'water' as IssueCategory, label: 'Water & Sewage', icon: '💧', description: 'Water supply, leaks, sewage' },
  { code: 'waste' as IssueCategory, label: 'Waste & Garbage', icon: '🗑️', description: 'Collection, dumping sites' },
  { code: 'streetlights' as IssueCategory, label: 'Streetlights', icon: '💡', description: 'Lighting repairs, outages' },
  { code: 'noise' as IssueCategory, label: 'Noise & Environment', icon: '🔊', description: 'Noise, air quality' },
  { code: 'other' as IssueCategory, label: 'General Updates', icon: '📋', description: 'Events, notices, services' },
];

export const loadUserPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load preferences:', e);
  }
  return { subscribedWards: [], preferredTopics: [] };
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

  // Load saved preferences on mount
  useEffect(() => {
    if (open) {
      const saved = loadUserPreferences();
      setSelectedWards(saved.subscribedWards);
      setSelectedTopics(saved.preferredTopics);
    }
  }, [open]);

  const handleWardToggle = (wardCode: string) => {
    setSelectedWards(prev =>
      prev.includes(wardCode)
        ? prev.filter(w => w !== wardCode)
        : [...prev, wardCode]
    );
  };

  const handleTopicToggle = (topic: IssueCategory) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSelectAllWards = () => {
    if (selectedWards.length === WARDS.length) {
      setSelectedWards([]);
    } else {
      setSelectedWards(WARDS.map(w => w.code));
    }
  };

  const handleSelectAllTopics = () => {
    if (selectedTopics.length === TOPICS.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(TOPICS.map(t => t.code));
    }
  };

  const handleSave = () => {
    const preferences: UserPreferences = {
      subscribedWards: selectedWards,
      preferredTopics: selectedTopics,
    };
    saveUserPreferences(preferences);
    onSave?.(preferences);
    toast.success('Preferences saved successfully', {
      description: `Following ${selectedWards.length} ward(s) and ${selectedTopics.length} topic(s)`,
    });
    onOpenChange(false);
  };

  // Group wards by subcounty
  const wardsBySubcounty = WARDS.reduce((acc, ward) => {
    if (!acc[ward.subcounty]) {
      acc[ward.subcounty] = [];
    }
    acc[ward.subcounty].push(ward);
    return acc;
  }, {} as Record<string, typeof WARDS>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] p-0 gap-0 bg-background">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Bell className="w-5 h-5 text-primary" />
            My Preferences
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Select the areas and topics you want to follow
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="p-6 space-y-8">
            {/* Ward Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">My Areas</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {selectedWards.length} selected
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSelectAllWards}
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  {selectedWards.length === WARDS.length ? 'Clear all' : 'Select all'}
                </Button>
              </div>

              <div className="space-y-4">
                {Object.entries(wardsBySubcounty).map(([subcounty, wards]) => (
                  <div key={subcounty}>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
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
                          <span className="text-sm font-medium text-foreground">
                            {ward.name}
                          </span>
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
                  <h3 className="font-semibold text-foreground">Topics of Interest</h3>
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                    {selectedTopics.length} selected
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSelectAllTopics}
                  className="text-xs text-muted-foreground hover:text-secondary"
                >
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
                    <span className="text-2xl" aria-hidden="true">{topic.icon}</span>
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
        </ScrollArea>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-border bg-muted/30">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleSave}
            >
              Save Preferences
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Your preferences are saved locally on this device
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
