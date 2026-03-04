import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  PenSquare, ArrowRight, Ticket, MapPin, Clock, Shield, Users,
  Settings2, GraduationCap, BarChart3, ClipboardList, FileText, Building
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CityMap } from '@/components/map/CityMap';
import { HappeningsFeed } from '@/components/happenings/HappeningsFeed';
import { ActiveSurveys } from '@/components/surveys/ActiveSurveys';
import { findWardByCoords } from '@/lib/happeningsApi';
import { UserPreferencesModal, loadUserPreferences, UserPreferences } from '@/components/preferences/UserPreferencesModal';
import { Button } from '@/components/ui/button';
import { getOverviewStats, getAverageSolutionTime } from '@/lib/serviceAnalyticsData';
import { CITY } from '@/config/city';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationDescription, setLocationDescription] = useState('');
  const [selectedWard, setSelectedWard] = useState<{ code: string; name: string } | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(loadUserPreferences);

  const handleLocationSelect = useCallback((location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
    const ward = findWardByCoords(location.lat, location.lng);
    setSelectedWard(ward);
  }, []);

  const handleLocationDescriptionChange = useCallback((description: string) => {
    setLocationDescription(description);
  }, []);

  const stats = getOverviewStats('30days', 'all');
  const avgTime = getAverageSolutionTime();

  return (
    <AppLayout>
      {/* ── Civic Header Band (replaces hero image) ── */}
      <section className="gov-hero p-6 md:p-8 rounded-lg mb-8" aria-labelledby="hero-title">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-5xl">
          <div className="flex items-center gap-4">
            <img
              src={CITY.emblemAsset}
              alt={CITY.emblemAlt}
              className="w-14 h-14 md:w-16 md:h-16 object-contain brightness-200"
            />
            <div>
              <h1 id="hero-title" className="text-xl md:text-2xl font-bold leading-tight">
                {CITY.authorityName}
              </h1>
              <p className="text-sm text-white/80 mt-0.5">
                {selectedWard
                  ? `${selectedWard.name} ${CITY.adminUnitLabel} • ${CITY.cityName}`
                  : CITY.portalCitizenTitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/report" className="gov-btn-secondary">
              <PenSquare className="w-5 h-5" />
              Report Issue
            </Link>
            <Link to="/my-tickets" className="gov-btn-outline border-white text-white hover:bg-white hover:text-primary">
              <Ticket className="w-5 h-5" />
              Track My Reports
            </Link>
          </div>
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

      {/* ── Primary Action Card ── */}
      <section className="mb-8">
        <div className="gov-card p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-l-4 border-l-primary">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <PenSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Report an Issue</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Tell the city about potholes, garbage, water leaks and other civic issues.
              </p>
            </div>
          </div>
          <Link to="/report" className="gov-btn-primary whitespace-nowrap">
            <PenSquare className="w-4 h-4" />
            Report Issue
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
            { icon: PenSquare, label: 'Report Issue', desc: 'Potholes, garbage, leaks', href: '/report' },
            { icon: Ticket, label: 'My Reports', desc: 'Track complaint progress', href: '/my-tickets' },
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

      {/* ── Preferences Banner (compact) ── */}
      <section className="mb-8">
        <div className="gov-card p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-sm text-foreground">
              {userPreferences.subscribedWards.length > 0 || userPreferences.preferredTopics.length > 0
                ? `Following ${userPreferences.subscribedWards.length} area(s), ${userPreferences.preferredTopics.length} topic(s)`
                : 'Customize your feed — select wards and topics'}
            </p>
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
      </section>

      {/* ── Map Section ── */}
      <section className="mb-8" aria-labelledby="map-section-title">
        <div className="gov-section-header">
          <h2 id="map-section-title" className="text-lg font-bold text-foreground">
            Select Your Location
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Mark a spot on the map to see nearby updates or report an issue in your area.
        </p>
        <CityMap
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
          onLocationDescriptionChange={handleLocationDescriptionChange}
          showHappenings={true}
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
        onSave={setUserPreferences}
      />
    </AppLayout>
  );
};

export default Index;
