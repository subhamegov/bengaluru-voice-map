import React, { useState, useMemo, useCallback, useRef } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { UX4GPageHeader } from '@/components/layout/UX4GPageHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Map, LayoutList, Plus, ScrollText, MapPin, Search, ChevronDown, X, Navigation } from 'lucide-react';
import { ProposalMap } from '@/components/proposals/ProposalMap';
import { ProposalTable } from '@/components/proposals/ProposalTable';
import { ProposalDetailModal } from '@/components/proposals/ProposalDetailModal';
import { CreateProposalModal } from '@/components/proposals/CreateProposalModal';
import { getProposals, supportProposal, createProposal } from '@/lib/proposalData';
import { loadWardPref, saveWardPref, WardPref } from '@/services/wardPreferences';
import { Proposal, PROPOSAL_CATEGORIES } from '@/types/proposal';
import { BENGALURU_ZONES, getWardByCode } from '@/lib/bengaluruAdminData';

type FilterTab = 'ward' | 'created' | 'supported';

/* ── Ward Selector Modal ── */
function WardSelectorModal({
  open,
  onOpenChange,
  currentPref,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPref: WardPref;
  onSave: (pref: WardPref) => void;
}) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<{ code: string; name: string }[]>(() =>
    currentPref.selectedWardIds.map((id, i) => ({
      code: id,
      name: currentPref.selectedWardNames[i] || id,
    }))
  );

  const allWards = useMemo(() => {
    const wards: { code: string; name: string; zone: string }[] = [];
    BENGALURU_ZONES.forEach(zone => {
      zone.wards.forEach(w => {
        wards.push({ code: w.code, name: w.name, zone: zone.name });
      });
    });
    return wards;
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return allWards;
    const q = search.toLowerCase();
    return allWards.filter(w =>
      w.name.toLowerCase().includes(q) ||
      w.code.toLowerCase().includes(q) ||
      w.zone.toLowerCase().includes(q)
    );
  }, [search, allWards]);

  const toggle = (ward: { code: string; name: string }) => {
    setSelected(prev => {
      const exists = prev.find(w => w.code === ward.code);
      if (exists) return prev.filter(w => w.code !== ward.code);
      return [...prev, ward];
    });
  };

  const handleSave = () => {
    const pref: WardPref = {
      defaultWardId: selected[0]?.code ?? null,
      defaultWardName: selected[0]?.name ?? null,
      selectedWardIds: selected.map(w => w.code),
      selectedWardNames: selected.map(w => w.name),
    };
    onSave(pref);
    onOpenChange(false);
  };

  const handleSelectAll = () => {
    setSelected([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 max-h-[80vh] overflow-hidden !bg-background" style={{ zIndex: 10000, backgroundColor: 'hsl(var(--background))' }}>
        <DialogHeader className="p-4 pb-3 border-b border-border">
          <DialogTitle className="text-base">Select Ward(s)</DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-3 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search ward name or number…"
              className="pl-9"
            />
          </div>

          {/* Selected chips */}
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {selected.map(w => (
                <Badge key={w.code} variant="secondary" className="gap-1 text-xs pr-1">
                  {w.name}
                  <button onClick={() => toggle(w)} className="ml-0.5 hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Quick options */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5"
              onClick={() => {
                if (navigator.geolocation) {
                  // For now just clear to show all
                  handleSelectAll();
                }
              }}
            >
              <Navigation className="w-3.5 h-3.5" /> My Ward
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5"
              onClick={handleSelectAll}
            >
              All Wards
            </Button>
          </div>
        </div>

        {/* Ward list */}
        <ScrollArea className="max-h-[40vh] border-t border-border">
          <div className="p-2 space-y-0.5">
            {filtered.map(w => {
              const isSelected = selected.some(s => s.code === w.code);
              return (
                <button
                  key={w.code}
                  onClick={() => toggle(w)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'bg-primary/10 text-foreground'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <div>
                    <span className="font-medium">{w.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{w.zone}</span>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-xs">✓</span>
                    </span>
                  )}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No wards found</p>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 pt-3 border-t border-border flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            Apply {selected.length > 0 ? `(${selected.length})` : '(All)'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Main Page ── */
export default function MyProposals() {
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map');
  const [filterTab, setFilterTab] = useState<FilterTab>('ward');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [wardSelectorOpen, setWardSelectorOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [pref, setPref] = useState<WardPref>(() => loadWardPref());
  const wardCodes = pref.selectedWardIds.length > 0 ? pref.selectedWardIds : undefined;

  const proposals = useMemo(() => {
    const filters: any = {};
    if (filterTab === 'ward' && wardCodes) filters.wardCodes = wardCodes;
    if (filterTab === 'created') filters.createdByUser = true;
    if (filterTab === 'supported') filters.supportedByUser = true;
    return getProposals(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTab, refreshKey, pref]);

  const handleWardPrefSave = useCallback((newPref: WardPref) => {
    saveWardPref(newPref);
    setPref(newPref);
    setRefreshKey(k => k + 1);
  }, []);

  // Ward context display text
  const wardContextText = useMemo(() => {
    if (pref.selectedWardNames.length === 0) return 'All Bengaluru Wards';
    if (pref.selectedWardNames.length === 1) {
      const code = pref.selectedWardIds[0];
      const info = getWardByCode(code);
      const num = code.replace(/\D/g, '');
      return `Ward ${num || code} – ${pref.selectedWardNames[0]}`;
    }
    if (pref.selectedWardNames.length <= 3) {
      return pref.selectedWardNames.map((name, i) => {
        const num = pref.selectedWardIds[i]?.replace(/\D/g, '');
        return `Ward ${num || pref.selectedWardIds[i]}`;
      }).join(', ');
    }
    return `${pref.selectedWardNames.length} Wards Selected`;
  }, [pref]);

  // Stable ref so map popup callbacks never cause ProposalMap re-render
  const handleViewRef = useRef<(p: Proposal) => void>(() => {});
  handleViewRef.current = (p: Proposal) => {
    setSelectedProposal(p);
    setDetailOpen(true);
  };
  const stableHandleView = useCallback((p: Proposal) => handleViewRef.current(p), []);

  const handleSupportRef = useRef<(id: string) => void>(() => {});
  handleSupportRef.current = (id: string) => {
    supportProposal(id);
  };
  const stableHandleSupport = useCallback((id: string) => handleSupportRef.current(id), []);

  const handleCreate = useCallback((data: any) => {
    createProposal(data);
    setRefreshKey(k => k + 1);
  }, []);

  const handleTableSupport = useCallback((id: string) => {
    supportProposal(id);
    setRefreshKey(k => k + 1);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-5">
        {/* Page header */}
        <UX4GPageHeader
          icon={ScrollText}
          title="My Proposals"
          description="View, create, and track civic proposals for your localities."
          action={
            <Button onClick={() => setCreateOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" /> Create Proposal
            </Button>
          }
        />

        {/* ── 1. Ward Context Bar ── */}
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-muted/30">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Viewing proposals for</p>
              <p className="text-sm font-semibold text-foreground truncate">{wardContextText}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5 flex-shrink-0"
            onClick={() => setWardSelectorOpen(true)}
          >
            Change Ward
            <ChevronDown className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* ── 2. Tabs ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Tabs value={filterTab} onValueChange={v => setFilterTab(v as FilterTab)}>
            <TabsList>
              <TabsTrigger value="ward">Ward Proposals (My Area)</TabsTrigger>
              <TabsTrigger value="created">Created by Me</TabsTrigger>
              <TabsTrigger value="supported">Supported by Me</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* ── 3. View toggle with label ── */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">View as</span>
            <div className="flex items-center gap-1 bg-muted rounded-md p-1">
              <button
                onClick={() => setViewMode('map')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  viewMode === 'map' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Map className="w-4 h-4" /> Map
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutList className="w-4 h-4" /> Grid
              </button>
            </div>
          </div>
        </div>

        {/* ── 4. Category Legend ── */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Proposal Categories</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {PROPOSAL_CATEGORIES.map(c => (
              <span key={c.id} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ background: c.color }} />
                {c.label}
              </span>
            ))}
            <span className="text-xs font-medium text-muted-foreground ml-auto">
              {proposals.length} proposal{proposals.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'map' ? (
          <ProposalMap proposals={proposals} onView={stableHandleView} onSupport={stableHandleSupport} />
        ) : (
          <ProposalTable proposals={proposals} onView={stableHandleView} onSupport={handleTableSupport} />
        )}
      </div>

      <ProposalDetailModal
        proposal={selectedProposal}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onSupport={handleTableSupport}
      />
      <CreateProposalModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={handleCreate}
      />
      <WardSelectorModal
        open={wardSelectorOpen}
        onOpenChange={setWardSelectorOpen}
        currentPref={pref}
        onSave={handleWardPrefSave}
      />
    </AppLayout>
  );
}
