import { Proposal } from '@/types/proposal';

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
    description: 'Proposal to establish a government primary school to reduce overcrowding in existing schools.',
    category: 'education', status: 'open', wardCode: 'JAYANAGAR', wardName: 'Jayanagar',
    creatorName: 'Ramesh K.', creatorId: 'user-1', supportCount: 142, commentCount: 23,
    supportedByUser: false, createdByUser: true,
    lat: 12.9260, lng: 77.5920, createdAt: '2026-02-15',
  },
  {
    id: 'prop-2', title: 'Pedestrian Overpass near Forum Mall',
    description: 'A pedestrian overpass to improve safety for shoppers and residents crossing the busy Hosur Road.',
    category: 'infrastructure', status: 'under_review', wardCode: 'KORAMANGALA', wardName: 'Koramangala',
    creatorName: 'Priya S.', creatorId: 'user-2', supportCount: 89, commentCount: 12,
    supportedByUser: true, createdByUser: false,
    lat: 12.9340, lng: 77.6260, createdAt: '2026-01-20',
  },
  {
    id: 'prop-3', title: 'Community Health Centre Upgrade',
    description: 'Upgrade the existing PHC with additional diagnostic facilities and weekend OPD.',
    category: 'health', status: 'approved', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar',
    creatorName: 'Dr. Meena R.', creatorId: 'user-3', supportCount: 210, commentCount: 45,
    supportedByUser: true, createdByUser: false,
    lat: 12.9790, lng: 77.6390, createdAt: '2025-12-10',
  },
  {
    id: 'prop-4', title: 'Road Resurfacing on Whitefield Main Road',
    description: 'Complete resurfacing of the deteriorated main road stretch from Kadugodi to ITPL.',
    category: 'roads', status: 'open', wardCode: 'WHITEFIELD', wardName: 'Whitefield',
    creatorName: 'Suresh M.', creatorId: 'user-1', supportCount: 312, commentCount: 67,
    supportedByUser: false, createdByUser: true,
    lat: 12.9710, lng: 77.7480, createdAt: '2026-02-28',
  },
  {
    id: 'prop-5', title: 'Smart Classroom Initiative',
    description: 'Install digital boards and internet connectivity in 5 government schools.',
    category: 'education', status: 'open', wardCode: 'MARATHAHALLI', wardName: 'Marathahalli',
    creatorName: 'Anita D.', creatorId: 'user-4', supportCount: 56, commentCount: 8,
    supportedByUser: false, createdByUser: false,
    lat: 12.9580, lng: 77.7020, createdAt: '2026-03-01',
  },
  {
    id: 'prop-6', title: 'Cycle Track along Outer Ring Road',
    description: 'Dedicated protected cycle lanes from Hebbal to Silk Board.',
    category: 'infrastructure', status: 'open', wardCode: 'HEBBAL', wardName: 'Hebbal',
    creatorName: 'Vikram J.', creatorId: 'user-5', supportCount: 178, commentCount: 34,
    supportedByUser: false, createdByUser: false,
    lat: 13.0370, lng: 77.5950, createdAt: '2026-02-05',
  },
  {
    id: 'prop-7', title: 'Mobile Health Van for Basavanagudi',
    description: 'A mobile health van providing basic check-ups and vaccinations on weekends.',
    category: 'health', status: 'draft', wardCode: 'BASAVANAGUDI', wardName: 'Basavanagudi',
    creatorName: 'Ramesh K.', creatorId: 'user-1', supportCount: 12, commentCount: 2,
    supportedByUser: false, createdByUser: true,
    lat: 12.9430, lng: 77.5750, createdAt: '2026-03-03',
  },
  {
    id: 'prop-8', title: 'Pothole-free Malleshwaram Streets',
    description: 'Fill all potholes and improve drainage on Sampige Road and surrounding streets.',
    category: 'roads', status: 'open', wardCode: 'MALLESHWARAM', wardName: 'Malleshwaram',
    creatorName: 'Kavitha N.', creatorId: 'user-6', supportCount: 245, commentCount: 51,
    supportedByUser: true, createdByUser: false,
    lat: 13.0040, lng: 77.5700, createdAt: '2026-01-15',
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
  }
  return p;
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
    creatorName: 'You',
    creatorId: 'user-1',
    supportCount: 0,
    commentCount: 0,
    supportedByUser: false,
    createdByUser: true,
    lat: data.lat ?? loc.lat + (Math.random() - 0.5) * 0.005,
    lng: data.lng ?? loc.lng + (Math.random() - 0.5) * 0.005,
    createdAt: new Date().toISOString().split('T')[0],
  };
  proposals = [newP, ...proposals];
  return newP;
}
