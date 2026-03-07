import { Proposal, CivicReactions, DeliberationStatement, ProposalComment } from '@/types/proposal';

// Bengaluru ward centroids (approximate)
const WARD_LOCATIONS: Record<string, { lat: number; lng: number; name: string }> = {
  JAYANAGAR: { lat: 12.9250, lng: 77.5938, name: 'Jayanagar' },
  KORAMANGALA: { lat: 12.9352, lng: 77.6245, name: 'Koramangala' },
  INDIRANAGAR: { lat: 12.9784, lng: 77.6408, name: 'Indiranagar' },
  WHITEFIELD: { lat: 12.9698, lng: 77.7500, name: 'Whitefield' },
  MARATHAHALLI: { lat: 12.9591, lng: 77.7009, name: 'Marathahalli' },
  HSR_LAYOUT: { lat: 12.9116, lng: 77.6474, name: 'HSR Layout' },
  HEBBAL: { lat: 13.0358, lng: 77.5970, name: 'Hebbal' },
  MALLESHWARAM: { lat: 13.0035, lng: 77.5710, name: 'Malleshwaram' },
  BASAVANAGUDI: { lat: 12.9422, lng: 77.5737, name: 'Basavanagudi' },
};

let proposals: Proposal[] = [
  {
    id: 'prop-1', title: 'New Primary School in Jayanagar 4th Block',
    description: 'Proposal to establish a government primary school to reduce overcrowding in existing schools. The new school will serve approximately 500 students from the surrounding localities.',
    category: 'education', status: 'proposed', wardCode: 'JAYANAGAR', wardName: 'Jayanagar', wardNumber: 43,
    city: 'Bengaluru',
    creatorName: 'Ramesh K.', creatorId: 'user-1', supportCount: 142, commentCount: 23,
    supportedByUser: false, createdByUser: true,
    lat: 12.9260, lng: 77.5920, createdAt: '2026-02-15',
    department: 'BBMP Education Department',
    estimatedBudget: '₹3.2 Cr',
    targetTimeline: 'Q3 2026 – Q1 2027',
    representatives: [
      { name: 'Smt. Lakshmi Devi', role: 'Ward Councillor' },
      { name: 'Mr. Rajan P.', role: 'Education Officer', department: 'BBMP' },
    ],
    reactions: { support: 142, concern: 28, neutral: 15 },
    statements: [
      { id: 'st-1', text: 'The school should include a playground for physical education.', authorName: 'Meena R.', createdAt: '2026-02-18', agree: 98, disagree: 12, pass: 20 },
      { id: 'st-2', text: 'Traffic management near the school entrance needs to be addressed first.', authorName: 'Suresh P.', createdAt: '2026-02-20', agree: 110, disagree: 8, pass: 15 },
    ],
    comments: [
      { id: 'c-1', text: 'The BBMP Education Department is reviewing site options. We expect to finalize the location by April 2026.', authorName: 'Mr. Rajan P.', authorRole: 'officer', createdAt: '2026-02-22', isPinned: true, helpfulCount: 45 },
      { id: 'c-2', text: 'This is much needed. Our children travel 4 km to the nearest school.', authorName: 'Kavitha S.', authorRole: 'citizen', createdAt: '2026-02-19', helpfulCount: 32 },
    ],
  },
  {
    id: 'prop-2', title: 'Pedestrian Overpass near Forum Mall',
    description: 'A pedestrian overpass to improve safety for shoppers and residents crossing the busy Hosur Road. Will include ramps for wheelchair accessibility and covered walkway.',
    category: 'infrastructure', status: 'under_review', wardCode: 'KORAMANGALA', wardName: 'Koramangala', wardNumber: 151,
    city: 'Bengaluru',
    creatorName: 'Priya S.', creatorId: 'user-2', supportCount: 89, commentCount: 12,
    supportedByUser: true, createdByUser: false,
    lat: 12.9340, lng: 77.6260, createdAt: '2026-01-20',
    department: 'BBMP Infrastructure Division',
    estimatedBudget: '₹1.8 Cr',
    targetTimeline: 'Q2 2026 – Q4 2026',
    representatives: [
      { name: 'Mr. Arvind Kumar', role: 'Ward Councillor' },
      { name: 'Mrs. Deepa M.', role: 'Chief Engineer', department: 'BBMP' },
    ],
    reactions: { support: 89, concern: 34, neutral: 22 },
    statements: [
      { id: 'st-3', text: 'The overpass should connect directly to the metro station.', authorName: 'Vikram T.', createdAt: '2026-01-25', agree: 67, disagree: 5, pass: 12 },
    ],
    comments: [
      { id: 'c-3', text: 'Design review is in progress. Public consultation will be scheduled next month.', authorName: 'Mrs. Deepa M.', authorRole: 'officer', createdAt: '2026-02-10', isPinned: true, helpfulCount: 28 },
    ],
  },
  {
    id: 'prop-3', title: 'Community Health Centre Upgrade',
    description: 'Upgrade the existing Primary Health Centre with diagnostic services, expanded maternal care facilities, and weekend OPD access. Includes addition of a diagnostic lab for TB and diabetes testing.',
    category: 'health', status: 'approved', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', wardNumber: 74,
    city: 'Bengaluru',
    creatorName: 'Dr. Meena R.', creatorId: 'user-3', supportCount: 210, commentCount: 45,
    supportedByUser: true, createdByUser: false,
    lat: 12.9790, lng: 77.6390, createdAt: '2025-12-10',
    department: 'BBMP Health Department',
    estimatedBudget: '₹5.4 Cr',
    targetTimeline: 'Q1 2026 – Q3 2026',
    representatives: [
      { name: 'Mr. Nagaraj B.', role: 'Ward Councillor' },
      { name: 'Dr. Sunitha K.', role: 'District Health Officer', department: 'BBMP' },
    ],
    reactions: { support: 210, concern: 45, neutral: 30 },
    statements: [
      { id: 'st-4', text: 'This PHC should include a diagnostic lab for TB testing.', authorName: 'Dr. Anand M.', createdAt: '2025-12-15', agree: 180, disagree: 10, pass: 25 },
      { id: 'st-5', text: 'Weekend OPD timing should be 8 AM to 2 PM for working professionals.', authorName: 'Priya V.', createdAt: '2025-12-20', agree: 155, disagree: 22, pass: 18 },
      { id: 'st-6', text: 'The upgraded centre should prioritize maternal and child health services.', authorName: 'Smt. Geetha L.', createdAt: '2026-01-05', agree: 140, disagree: 15, pass: 30 },
    ],
    comments: [
      { id: 'c-4', text: 'The Health Department has approved this project. Construction begins March 2026. We will ensure minimal disruption to ongoing services.', authorName: 'Dr. Sunitha K.', authorRole: 'officer', createdAt: '2026-01-15', isPinned: true, helpfulCount: 67 },
      { id: 'c-5', text: 'I strongly support this. We need better healthcare access in our ward.', authorName: 'Ramesh N.', authorRole: 'citizen', createdAt: '2026-01-10', helpfulCount: 24 },
      { id: 'c-6', text: 'As ward councillor, I am committed to ensuring this project is completed on time.', authorName: 'Mr. Nagaraj B.', authorRole: 'councillor', createdAt: '2026-01-20', isPinned: true, helpfulCount: 55 },
    ],
  },
  {
    id: 'prop-4', title: 'Road Resurfacing on Whitefield Main Road',
    description: 'Complete resurfacing of the deteriorated main road stretch from Kadugodi to ITPL. Includes storm water drain repair and lane marking.',
    category: 'roads', status: 'budgeted', wardCode: 'WHITEFIELD', wardName: 'Whitefield', wardNumber: 85,
    city: 'Bengaluru',
    creatorName: 'Suresh M.', creatorId: 'user-1', supportCount: 312, commentCount: 67,
    supportedByUser: false, createdByUser: true,
    lat: 12.9710, lng: 77.7480, createdAt: '2026-02-28',
    department: 'BBMP Road Infrastructure',
    estimatedBudget: '₹8.1 Cr',
    targetTimeline: 'Q2 2026 – Q4 2026',
    representatives: [
      { name: 'Mr. Prasad R.', role: 'Ward Councillor' },
      { name: 'Mr. Venkatesh H.', role: 'Executive Engineer', department: 'BBMP' },
    ],
    reactions: { support: 312, concern: 78, neutral: 35 },
    statements: [
      { id: 'st-7', text: 'The road work should include proper pedestrian footpaths.', authorName: 'Anita D.', createdAt: '2026-03-01', agree: 245, disagree: 15, pass: 30 },
    ],
    comments: [
      { id: 'c-7', text: 'Budget has been allocated. Tender process will begin in April.', authorName: 'Mr. Venkatesh H.', authorRole: 'officer', createdAt: '2026-03-05', isPinned: true, helpfulCount: 89 },
    ],
  },
  {
    id: 'prop-5', title: 'Smart Classroom Initiative',
    description: 'Install digital boards and internet connectivity in 5 government schools. Teachers will receive training on digital pedagogy.',
    category: 'education', status: 'proposed', wardCode: 'MARATHAHALLI', wardName: 'Marathahalli', wardNumber: 82,
    city: 'Bengaluru',
    creatorName: 'Anita D.', creatorId: 'user-4', supportCount: 56, commentCount: 8,
    supportedByUser: false, createdByUser: false,
    lat: 12.9580, lng: 77.7020, createdAt: '2026-03-01',
    department: 'BBMP Education Department',
    estimatedBudget: '₹95 Lakhs',
    targetTimeline: 'Q3 2026 – Q1 2027',
    representatives: [
      { name: 'Smt. Padma R.', role: 'Ward Councillor' },
    ],
    reactions: { support: 56, concern: 12, neutral: 8 },
    statements: [],
    comments: [],
  },
  {
    id: 'prop-6', title: 'Cycle Track along Outer Ring Road',
    description: 'Dedicated protected cycle lanes from Hebbal to Silk Board. Includes parking docks and integration with metro stations.',
    category: 'infrastructure', status: 'under_review', wardCode: 'HEBBAL', wardName: 'Hebbal', wardNumber: 24,
    city: 'Bengaluru',
    creatorName: 'Vikram J.', creatorId: 'user-5', supportCount: 178, commentCount: 34,
    supportedByUser: false, createdByUser: false,
    lat: 13.0370, lng: 77.5950, createdAt: '2026-02-05',
    department: 'BBMP Urban Mobility Cell',
    estimatedBudget: '₹12 Cr',
    targetTimeline: 'Q4 2026 – Q2 2027',
    representatives: [
      { name: 'Mr. Girish K.', role: 'Ward Councillor' },
      { name: 'Ms. Revathi S.', role: 'Urban Planner', department: 'BBMP' },
    ],
    reactions: { support: 178, concern: 55, neutral: 20 },
    statements: [
      { id: 'st-8', text: 'Cycle tracks must be physically separated from motor vehicle lanes.', authorName: 'Rohit M.', createdAt: '2026-02-10', agree: 150, disagree: 8, pass: 12 },
    ],
    comments: [],
  },
  {
    id: 'prop-7', title: 'Mobile Health Van for Basavanagudi',
    description: 'A mobile health van providing basic check-ups, vaccinations, and health awareness camps on weekends in underserved pockets.',
    category: 'health', status: 'draft', wardCode: 'BASAVANAGUDI', wardName: 'Basavanagudi', wardNumber: 46,
    city: 'Bengaluru',
    creatorName: 'Ramesh K.', creatorId: 'user-1', supportCount: 12, commentCount: 2,
    supportedByUser: false, createdByUser: true,
    lat: 12.9430, lng: 77.5750, createdAt: '2026-03-03',
    department: 'BBMP Health Department',
    estimatedBudget: '₹45 Lakhs',
    targetTimeline: 'Q3 2026',
    representatives: [],
    reactions: { support: 12, concern: 3, neutral: 5 },
    statements: [],
    comments: [],
  },
  {
    id: 'prop-8', title: 'Pothole-free Malleshwaram Streets',
    description: 'Fill all potholes and improve drainage on Sampige Road and surrounding streets. Priority given to school zones and hospital access roads.',
    category: 'roads', status: 'approved', wardCode: 'MALLESHWARAM', wardName: 'Malleshwaram', wardNumber: 32,
    city: 'Bengaluru',
    creatorName: 'Kavitha N.', creatorId: 'user-6', supportCount: 245, commentCount: 51,
    supportedByUser: true, createdByUser: false,
    lat: 13.0040, lng: 77.5700, createdAt: '2026-01-15',
    department: 'BBMP Road Infrastructure',
    estimatedBudget: '₹2.8 Cr',
    targetTimeline: 'Q1 2026 – Q2 2026',
    representatives: [
      { name: 'Mr. Manjunath V.', role: 'Ward Councillor' },
      { name: 'Mr. Ramachandra S.', role: 'Junior Engineer', department: 'BBMP' },
    ],
    reactions: { support: 245, concern: 60, neutral: 18 },
    statements: [
      { id: 'st-9', text: 'Drainage must be fixed before road resurfacing to prevent recurrence.', authorName: 'Anil K.', createdAt: '2026-01-20', agree: 200, disagree: 10, pass: 20 },
      { id: 'st-10', text: 'Speed breakers near the school zone should be redesigned.', authorName: 'Sunita M.', createdAt: '2026-01-22', agree: 165, disagree: 30, pass: 25 },
    ],
    comments: [
      { id: 'c-8', text: 'Work has started on Sampige Road. Expected completion by end of March.', authorName: 'Mr. Ramachandra S.', authorRole: 'officer', createdAt: '2026-02-01', isPinned: true, helpfulCount: 72 },
    ],
  },
];

export function getProposals(filters?: {
  wardCodes?: string[];
  category?: string;
  status?: string;
  createdByUser?: boolean;
  supportedByUser?: boolean;
}): Proposal[] {
  let result = [...proposals];
  if (filters?.wardCodes?.length) {
    result = result.filter(p => filters.wardCodes!.includes(p.wardCode));
  }
  if (filters?.category && filters.category !== 'all') {
    result = result.filter(p => p.category === filters.category);
  }
  if (filters?.status && filters.status !== 'all') {
    result = result.filter(p => p.status === filters.status);
  }
  if (filters?.createdByUser) {
    result = result.filter(p => p.createdByUser);
  }
  if (filters?.supportedByUser) {
    result = result.filter(p => p.supportedByUser);
  }
  return result;
}

export function supportProposal(id: string): Proposal | undefined {
  const p = proposals.find(x => x.id === id);
  if (p && !p.supportedByUser) {
    p.supportedByUser = true;
    p.supportCount += 1;
    p.reactions.support += 1;
    p.reactions.userReaction = 'support';
  }
  return p;
}

export function reactToProposal(id: string, reaction: 'support' | 'concern' | 'neutral'): Proposal | undefined {
  const p = proposals.find(x => x.id === id);
  if (!p) return undefined;
  // Remove previous reaction
  if (p.reactions.userReaction) {
    p.reactions[p.reactions.userReaction] -= 1;
  }
  p.reactions[reaction] += 1;
  p.reactions.userReaction = reaction;
  if (reaction === 'support') {
    p.supportedByUser = true;
  }
  return p;
}

export function addStatement(proposalId: string, text: string): DeliberationStatement | undefined {
  const p = proposals.find(x => x.id === proposalId);
  if (!p) return undefined;
  const stmt: DeliberationStatement = {
    id: `st-${Date.now()}`,
    text,
    authorName: 'You',
    createdAt: new Date().toISOString().split('T')[0],
    agree: 0,
    disagree: 0,
    pass: 0,
  };
  p.statements = [stmt, ...p.statements];
  return stmt;
}

export function voteOnStatement(proposalId: string, statementId: string, vote: 'agree' | 'disagree' | 'pass') {
  const p = proposals.find(x => x.id === proposalId);
  if (!p) return;
  const s = p.statements.find(x => x.id === statementId);
  if (!s) return;
  if (s.userVote) {
    s[s.userVote] -= 1;
  }
  s[vote] += 1;
  s.userVote = vote;
}

export function addProposalComment(proposalId: string, text: string): ProposalComment | undefined {
  const p = proposals.find(x => x.id === proposalId);
  if (!p) return undefined;
  const comment: ProposalComment = {
    id: `c-${Date.now()}`,
    text,
    authorName: 'You',
    authorRole: 'citizen',
    createdAt: new Date().toISOString().split('T')[0],
    helpfulCount: 0,
  };
  p.comments = [...p.comments, comment];
  p.commentCount += 1;
  return comment;
}

export function createProposal(data: {
  title: string;
  description: string;
  category: string;
  wardCode: string;
  wardName: string;
  lat?: number;
  lng?: number;
}): Proposal {
  const loc = WARD_LOCATIONS[data.wardCode] ?? { lat: 12.9716, lng: 77.5946 };
  const newP: Proposal = {
    id: `prop-${Date.now()}`,
    title: data.title,
    description: data.description,
    category: data.category as any,
    status: 'draft',
    wardCode: data.wardCode,
    wardName: data.wardName,
    city: 'Bengaluru',
    creatorName: 'You',
    creatorId: 'user-1',
    supportCount: 0,
    commentCount: 0,
    supportedByUser: false,
    createdByUser: true,
    lat: data.lat ?? loc.lat + (Math.random() - 0.5) * 0.005,
    lng: data.lng ?? loc.lng + (Math.random() - 0.5) * 0.005,
    createdAt: new Date().toISOString().split('T')[0],
    reactions: { support: 0, concern: 0, neutral: 0 },
    statements: [],
    comments: [],
  };
  proposals = [newP, ...proposals];
  return newP;
}
