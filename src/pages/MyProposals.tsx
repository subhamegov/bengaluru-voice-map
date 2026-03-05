import React, { useState, useMemo, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Map, LayoutList, Plus } from 'lucide-react';
import { ProposalMap } from '@/components/proposals/ProposalMap';
import { ProposalTable } from '@/components/proposals/ProposalTable';
import { ProposalDetailModal } from '@/components/proposals/ProposalDetailModal';
import { CreateProposalModal } from '@/components/proposals/CreateProposalModal';
import { getProposals, supportProposal, createProposal } from '@/lib/proposalData';
import { loadWardPref } from '@/services/wardPreferences';
import { Proposal, PROPOSAL_CATEGORIES, getCategoryColor } from '@/types/proposal';

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

  const handleView = useCallback((p: Proposal) => {
    setSelectedProposal(p);
    setDetailOpen(true);
  }, []);

  const handleSupport = useCallback((id: string) => {
    supportProposal(id);
    setRefreshKey(k => k + 1);
  }, []);

  const handleCreate = useCallback((data: any) => {
    createProposal(data);
    setRefreshKey(k => k + 1);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Proposals</h1>
            <p className="text-sm text-muted-foreground mt-1">View, create, and track civic proposals for your localities.</p>
          </div>
          <Button onClick={() => setCreateOpen(true)} className="gap-2 self-start">
            <Plus className="w-4 h-4" /> Create Proposal
          </Button>
        </div>

        {/* Filter tabs + view toggle */}
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

        {/* Category legend */}
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

        {/* Content */}
        {viewMode === 'map' ? (
          <ProposalMap proposals={proposals} onView={handleView} onSupport={handleSupport} />
        ) : (
          <ProposalTable proposals={proposals} onView={handleView} onSupport={handleSupport} />
        )}
      </div>

      <ProposalDetailModal
        proposal={selectedProposal}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onSupport={handleSupport}
      />
      <CreateProposalModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={handleCreate}
      />
    </AppLayout>
  );
}
