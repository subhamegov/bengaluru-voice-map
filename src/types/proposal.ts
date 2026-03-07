export type ProposalCategory = 'education' | 'infrastructure' | 'health' | 'roads' | 'water' | 'sanitation';

export type ProposalStatus = 'draft' | 'proposed' | 'under_review' | 'approved' | 'budgeted' | 'completed' | 'rejected';

export interface CivicReactions {
  support: number;
  concern: number;
  neutral: number;
  userReaction?: 'support' | 'concern' | 'neutral';
}

export interface DeliberationStatement {
  id: string;
  text: string;
  authorName: string;
  createdAt: string;
  agree: number;
  disagree: number;
  pass: number;
  userVote?: 'agree' | 'disagree' | 'pass';
}

export interface ProposalComment {
  id: string;
  text: string;
  authorName: string;
  authorRole?: 'citizen' | 'councillor' | 'officer';
  createdAt: string;
  isPinned?: boolean;
  helpfulCount: number;
}

export interface Representative {
  name: string;
  role: string;
  department?: string;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  category: ProposalCategory;
  status: ProposalStatus;
  wardCode: string;
  wardName: string;
  wardNumber?: number;
  city: string;
  creatorName: string;
  creatorId: string;
  supportCount: number;
  commentCount: number;
  supportedByUser: boolean;
  createdByUser: boolean;
  lat: number;
  lng: number;
  createdAt: string;
  // Extended fields
  department?: string;
  estimatedBudget?: string;
  targetTimeline?: string;
  representatives?: Representative[];
  reactions: CivicReactions;
  statements: DeliberationStatement[];
  comments: ProposalComment[];
}

export const PROPOSAL_CATEGORIES: { id: ProposalCategory; label: string; color: string }[] = [
  { id: 'education', label: 'School / Education', color: 'hsl(142 64% 38%)' },
  { id: 'infrastructure', label: 'Infrastructure', color: 'hsl(210 79% 46%)' },
  { id: 'health', label: 'Health', color: 'hsl(0 72% 51%)' },
  { id: 'roads', label: 'Roads', color: 'hsl(38 92% 50%)' },
  { id: 'water', label: 'Water Supply', color: 'hsl(200 80% 50%)' },
  { id: 'sanitation', label: 'Sanitation', color: 'hsl(280 60% 50%)' },
];

export function getCategoryColor(cat: ProposalCategory): string {
  return PROPOSAL_CATEGORIES.find(c => c.id === cat)?.color ?? '#6B7280';
}

export function getCategoryLabel(cat: ProposalCategory): string {
  return PROPOSAL_CATEGORIES.find(c => c.id === cat)?.label ?? cat;
}
