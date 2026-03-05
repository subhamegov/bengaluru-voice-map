import React, { useState, useMemo, useCallback, useRef } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Map, LayoutList, Plus } from 'lucide-react';
import { ProposalMap } from '@/components/proposals/ProposalMap';
import { ProposalTable } from '@/components/proposals/ProposalTable';
import { ProposalDetailModal } from '@/components/proposals/ProposalDetailModal';
import { CreateProposalModal } from '@/components/proposals/CreateProposalModal';
import { getProposals, supportProposal, createProposal } from '@/lib/proposalData';
import { loadWardPref } from '@/services/wardPreferences';
import { Proposal, PROPOSAL_CATEGORIES } from '@/types/proposal';

type FilterTab = 'ward' | 'created' | 'supported';

export default function MyProposals() {
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map');
  const [filterTab, setFilterTab] = useState<FilterTab>('ward');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const pref = loadWardPref();
  const wardCodes = pref.selectedWardIds.length > 0 ? pref.selectedWardIds : undefined;

  const proposals = useMemo(() => {
    const filters: any = {};
    if (filterTab === 'ward' && wardCodes) filters.wardCodes = wardCodes;
    if (filterTab === 'created') filters.createdByUser = true;
    if (filterTab === 'supported') filters.supportedByUser = true;
    return getProposals(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTab, refreshKey]);

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
    // Don't refresh the map proposals list — only refresh on tab/filter change
  };
  const stableHandleSupport = useCallback((id: string) => handleSupportRef.current(id), []);

  const handleCreate = useCallback((data: any) => {
    createProposal(data);
    setRefreshKey(k => k + 1);
  }, []);

  // For table support, we do want a refresh
  const handleTableSupport = useCallback((id: string) => {
    supportProposal(id);
    setRefreshKey(k => k + 1);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Proposals</h1>
            <p className="text-sm text-muted-foreground mt-1">View, create, and track civic proposals for your localities.</p>
          </div>
          <Button onClick={() => setCreateOpen(true)} className="gap-2 self-start">
            <Plus className="w-4 h-4" /> Create Proposal
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Tabs value={filterTab} onValueChange={v => setFilterTab(v as FilterTab)}>
            <TabsList>
              <TabsTrigger value="ward">Ward Proposals</TabsTrigger>
              <TabsTrigger value="created">Created by Me</TabsTrigger>
              <TabsTrigger value="supported">Supported by Me</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-1 bg-muted rounded-md p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'map' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Map className="w-4 h-4" /> Map View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutList className="w-4 h-4" /> Grid View
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {PROPOSAL_CATEGORIES.map(c => (
            <span key={c.id} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: c.color }} />
              {c.label}
            </span>
          ))}
          <span className="text-xs text-muted-foreground ml-2">
            {proposals.length} proposal{proposals.length !== 1 ? 's' : ''}
          </span>
        </div>

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
    </AppLayout>
  );
}
