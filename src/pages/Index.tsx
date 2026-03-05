import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  PenSquare, ArrowRight, Ticket, MapPin, Clock, Shield, Users,
  Settings2, GraduationCap, BarChart3, ClipboardList, FileText, Navigation
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CityMap } from '@/components/map/CityMap';
import { HappeningsFeed } from '@/components/happenings/HappeningsFeed';
import { ActiveSurveys } from '@/components/surveys/ActiveSurveys';
import { ProjectDetailDrawer } from '@/components/happenings/ProjectDetailDrawer';
import { Happening } from '@/types/happenings';

import { findWardByCoords } from '@/lib/happeningsApi';
import { WARDS } from '@/types/story';
import { UserPreferencesModal, loadUserPreferences, UserPreferences } from '@/components/preferences/UserPreferencesModal';
import { Button } from '@/components/ui/button';
import { getOverviewStats, getAverageSolutionTime } from '@/lib/serviceAnalyticsData';
import { CITY } from '@/config/city';
import { loadDefaultWardPref } from '@/services/wardPreferences';
import bengaluruSkyline from '@/assets/bengaluru-skyline.png';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationDescription, setLocationDescription] = useState('');
  const [selectedWard, setSelectedWard] = useState<{ code: string; name: string } | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(loadUserPreferences);
  const [defaultWardPref, setDefaultWardPref] = useState(loadDefaultWardPref);
  const [mapSelectedHappening, setMapSelectedHappening] = useState<Happening | null>(null);
  const [mapDrawerOpen, setMapDrawerOpen] = useState(false);

  const handleLocationSelect = useCallback((location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
    const ward = findWardByCoords(location.lat, location.lng);
    setSelectedWard(ward);
  }, []);

  const handleLocationDescriptionChange = useCallback((description: string) => {
    setLocationDescription(description);
  }, []);

  const handleMapHappeningClick = useCallback((happening: Happening) => {
    setMapSelectedHappening(happening);
    setMapDrawerOpen(true);
  }, []);

  const stats = getOverviewStats('30days', 'all');
  const avgTime = getAverageSolutionTime();

  return (
    <AppLayout>
      {/* ── Layer 2: Civic Skyline Banner (emotional layer) ── */}
      <section className="civic-skyline-banner -mx-4 md:-mx-6 lg:-mx-8 mb-0">
        <div className="skyline-text pt-6 pb-2">
          <p className="civic-tagline">Namma Karnataka &nbsp;·&nbsp; Namma Bengaluru</p>
        </div>
        <img
          src={bengaluruSkyline}
          alt="Bengaluru city skyline illustration showing Vidhana Soudha, Lalbagh, and other landmarks"
          className="skyline-img"
        />
      </section>

      {/* ── Layer 3: Citizen Action Strip ── */}
      <section className="citizen-action-strip -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 border-b border-border mb-8">
        <div className="max-w-[1100px]">
          <h2 className="action-title">Welcome to {CITY.cityName}</h2>
          <p className="action-description">
            Report city issues, track requests, and help improve your neighbourhood.
          </p>
        </div>
      </section>

      {/* ── Quick Stats (compact row) ── */}
      <section className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: MapPin, label: 'Total Complaints', value: stats.totalComplaints.toLocaleString(), color: 'text-primary' },
            { icon: Clock, label: 'Avg Resolution', value: avgTime.avg, unit: 'wks', color: 'text-secondary' },
            { icon: Shield, label: 'On-Time Resolution', value: `${stats.slaAchievementPercent}%`, color: 'text-success' },
            { icon: Users, label: 'Completion Rate', value: `${stats.completionRatePercent}%`, color: 'text-accent-foreground' },
          ].map((stat, i) => (
            <div key={i} className="gov-card p-4 flex items-center gap-3">
              <stat.icon className={`w-6 h-6 flex-shrink-0 ${stat.color}`} />
              <div className="min-w-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-foreground">{stat.value}</span>
                  {'unit' in stat && stat.unit && (
                    <span className="text-sm text-muted-foreground">{stat.unit}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-center">
          <Link to="/data" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            <BarChart3 className="w-4 h-4" />
            View detailed analytics
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Task Tiles (Quick Actions) ── */}
      <section className="mb-8">
        <div className="gov-section-header">
          <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { icon: PenSquare, label: 'Share Your Voice', desc: 'Potholes, garbage, leaks', href: '/report' },
            { icon: Ticket, label: 'My Activity', desc: 'Track reports & discussions', href: '/my-tickets' },
            { icon: GraduationCap, label: 'Training & Help', desc: 'Learn how to use portal', href: '/training' },
            { icon: ClipboardList, label: 'Active Surveys', desc: 'Participate in surveys', href: '/surveys' },
            { icon: FileText, label: 'Policy Feedback', desc: 'Share views on policies', href: '/policy' },
          ].map((tile) => (
            <Link
              key={tile.href}
              to={tile.href}
              className="gov-task-tile"
            >
              <tile.icon className="w-7 h-7 text-primary mb-2" />
              <span className="font-semibold text-sm text-foreground">{tile.label}</span>
              <span className="text-xs text-muted-foreground mt-0.5 leading-tight">{tile.desc}</span>
            </Link>
          ))}
        </div>
      </section>


      {/* ── Preferences Banner (compact) — always shows selected wards ── */}
      <section className="mb-8">
        <div className="gov-card p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-semibold text-foreground">
                {userPreferences.subscribedWards.length > 0 ? 'My Wards' : 'No wards selected'}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreferencesOpen(true)}
              className="gap-1.5 text-xs"
            >
              <Settings2 className="w-3.5 h-3.5" />
              Preferences
            </Button>
          </div>
          {userPreferences.subscribedWards.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {userPreferences.subscribedWards.map(code => {
                const ward = WARDS.find(w => w.code === code);
                return ward ? (
                  <span key={code} className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />
                    {ward.name}
                  </span>
                ) : null;
              })}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              Tap Preferences to select your wards and see personalized updates
            </p>
          )}
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="mb-8" aria-labelledby="map-section-title">
        <div className="gov-section-header">
          <h2 id="map-section-title" className="text-lg font-bold text-foreground">
            Select Your Location
          </h2>
        </div>

        {/* Selected ward pill */}
        {defaultWardPref.defaultWardName && (
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
              <Navigation className="w-3 h-3" />
              Selected ward: {defaultWardPref.defaultWardName}
            </span>
            <button
              onClick={() => setPreferencesOpen(true)}
              className="text-xs text-primary hover:underline"
            >
              Change
            </button>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-4">
          Mark a spot on the map to see nearby updates or report an issue in your area.
        </p>
        <CityMap
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
          onLocationDescriptionChange={handleLocationDescriptionChange}
          showHappenings={true}
          defaultWardId={defaultWardPref.defaultWardId}
          onHappeningClick={handleMapHappeningClick}
        />
      </section>

      {/* ── What's Happening Feed ── */}
      <section className="mb-8" aria-labelledby="happenings-section-title">
        <HappeningsFeed
          wardCode={selectedWard?.code}
          lat={selectedLocation?.lat ?? 12.9716}
          lng={selectedLocation?.lng ?? 77.5946}
          radiusKm={5}
        />
      </section>

      {/* ── Active Surveys ── */}
      <ActiveSurveys />

      {/* ── Bottom CTA ── */}
      <section className="gov-hero p-6 md:p-8 rounded-lg mt-8" aria-labelledby="cta-title">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 id="cta-title" className="text-xl font-bold mb-1">
              See Something? Say Something.
            </h2>
            <p className="text-sm text-white/80 max-w-lg">
              Potholes, garbage, broken streetlights, water leaks — report any issue and
              help your city respond faster.
            </p>
          </div>
          <Link to="/report" className="gov-btn-secondary whitespace-nowrap">
            Report Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {selectedLocation && selectedWard && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs text-white/70 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              Selected: <strong className="text-secondary">{selectedWard.name} {CITY.adminUnitLabel}</strong>
            </p>
          </div>
        )}
      </section>

      {/* Preferences Modal */}
      <UserPreferencesModal
        open={preferencesOpen}
        onOpenChange={setPreferencesOpen}
        onSave={(prefs) => {
          setUserPreferences(prefs);
          setDefaultWardPref(loadDefaultWardPref());
        }}
      />

      {/* Map Project Detail Drawer */}
      <ProjectDetailDrawer
        happening={mapSelectedHappening}
        open={mapDrawerOpen}
        onOpenChange={setMapDrawerOpen}
      />
    </AppLayout>
  );
};

export default Index;