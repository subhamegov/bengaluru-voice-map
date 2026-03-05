export type ProposalCategory = 'education' | 'infrastructure' | 'health' | 'roads';

export type ProposalStatus = 'draft' | 'open' | 'under_review' | 'approved' | 'rejected';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  category: ProposalCategory;
  status: ProposalStatus;
  wardCode: string;
  wardName: string;
  creatorName: string;
  creatorId: string;
  supportCount: number;
  commentCount: number;
  supportedByUser: boolean;
  createdByUser: boolean;
  lat: number;
  lng: number;
  createdAt: string;
}

export const PROPOSAL_CATEGORIES: { id: ProposalCategory; label: string; color: string }[] = [
  { id: 'education', label: 'School / Education', color: 'hsl(142 64% 38%)' },
  { id: 'infrastructure', label: 'Infrastructure', color: 'hsl(210 79% 46%)' },
  { id: 'health', label: 'Health', color: 'hsl(0 72% 51%)' },
  { id: 'roads', label: 'Roads', color: 'hsl(38 92% 50%)' },
];

export function getCategoryColor(cat: ProposalCategory): string {
  return PROPOSAL_CATEGORIES.find(c => c.id === cat)?.color ?? '#6B7280';
}

export function getCategoryLabel(cat: ProposalCategory): string {
  return PROPOSAL_CATEGORIES.find(c => c.id === cat)?.label ?? cat;
}
