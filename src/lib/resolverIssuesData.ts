// Shared issue data and types for the Resolver app — Bengaluru / BBMP context

export interface ResolverIssue {
  id: string;
  category: string;
  citizenTitle: string;
  description: string;
  subCounty: string;
  ward: string;
  zone: string;
  department: string;
  status: 'Open' | 'Assigned' | 'In Progress' | 'Awaiting Response' | 'Reopened' | 'Closed';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  createdOn: string;
  createdAt: Date;
  citizenName: string;
  citizenPhone?: string;
  assignedTo: string | null;
  assignedDepartment: string;
  slaDeadline: string;
  slaHoursRemaining: number;
  hasVoiceNote: boolean;
  hasImages: boolean;
  isReopened: boolean;
  reopenCount: number;
}

export function getIssueAge(createdAt: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 24) return `${diffHours}h`;
  return `${Math.floor(diffHours / 24)}d`;
}

export function getSlaCountdown(hoursRemaining: number): { text: string; isOverdue: boolean; isUrgent: boolean } {
  if (hoursRemaining <= 0) return { text: `${Math.abs(hoursRemaining)}h overdue`, isOverdue: true, isUrgent: true };
  if (hoursRemaining < 24) return { text: `${hoursRemaining}h left`, isOverdue: false, isUrgent: hoursRemaining < 8 };
  const d = Math.floor(hoursRemaining / 24);
  const h = hoursRemaining % 24;
  return { text: `${d}d ${h}h left`, isOverdue: false, isUrgent: false };
}

export const CURRENT_RESOLVER = {
  id: 'resolver_001',
  name: 'Ramesh Kumar',
  department: 'Environment',
  team: 'Solid Waste Management Unit',
};

export const ALL_COUNTY_ISSUES: ResolverIssue[] = [
  { id: 'BBMP-2026-0501', category: 'Garbage Collection', citizenTitle: 'Garbage not collected for 3 days', description: 'The garbage auto has not come for 3 days. Waste is piling up on the street.', subCounty: 'South Zone', ward: 'Jayanagar', zone: 'Jayanagar 4th Block', department: 'Environment', status: 'Assigned', priority: 'High', createdOn: '2026-03-01', createdAt: new Date('2026-03-01T08:30:00'), citizenName: 'Lakshmi Devi', citizenPhone: '+91 98XXX XXXXX', assignedTo: 'resolver_001', assignedDepartment: 'Environment', slaDeadline: '2026-03-02T08:30:00', slaHoursRemaining: 18, hasVoiceNote: true, hasImages: true, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0498', category: 'Illegal Dumping', citizenTitle: 'Construction debris dumped on roadside', description: 'Someone has dumped construction debris near the park entrance.', subCounty: 'East Zone', ward: 'Indiranagar', zone: '100 Feet Road', department: 'Environment', status: 'In Progress', priority: 'Medium', createdOn: '2026-02-28', createdAt: new Date('2026-02-28T14:20:00'), citizenName: 'Suresh Reddy', assignedTo: 'resolver_001', assignedDepartment: 'Environment', slaDeadline: '2026-03-02T14:20:00', slaHoursRemaining: 42, hasVoiceNote: false, hasImages: true, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0495', category: 'Street Cleaning', citizenTitle: 'Market area very dirty', description: 'The market area has not been cleaned. Food scraps and vegetable waste everywhere.', subCounty: 'North Zone', ward: 'Malleshwaram', zone: 'Sampige Road', department: 'Environment', status: 'Awaiting Response', priority: 'Medium', createdOn: '2026-02-27', createdAt: new Date('2026-02-27T09:15:00'), citizenName: 'Savitri Amma', assignedTo: 'resolver_001', assignedDepartment: 'Environment', slaDeadline: '2026-02-28T09:15:00', slaHoursRemaining: -6, hasVoiceNote: false, hasImages: false, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0490', category: 'Garbage Collection', citizenTitle: 'Community bins overflowing', description: 'The community waste bins are overflowing near the bus stop.', subCounty: 'South Zone', ward: 'Basavanagudi', zone: 'Gandhi Bazaar', department: 'Environment', status: 'Reopened', priority: 'High', createdOn: '2026-02-26', createdAt: new Date('2026-02-26T11:00:00'), citizenName: 'Nagaraj Rao', assignedTo: 'resolver_001', assignedDepartment: 'Environment', slaDeadline: '2026-02-28T11:00:00', slaHoursRemaining: 4, hasVoiceNote: true, hasImages: true, isReopened: true, reopenCount: 2 },
  { id: 'BBMP-2026-0485', category: 'Noise Pollution', citizenTitle: 'Loud music from pub at night', description: 'A pub near our residential area plays loud music until 2 AM.', subCounty: 'Bommanahalli Zone', ward: 'Koramangala', zone: 'Koramangala 4th Block', department: 'Environment', status: 'Closed', priority: 'Medium', createdOn: '2026-02-25', createdAt: new Date('2026-02-25T22:30:00'), citizenName: 'Anitha Sharma', assignedTo: 'resolver_001', assignedDepartment: 'Environment', slaDeadline: '2026-02-28T22:30:00', slaHoursRemaining: 72, hasVoiceNote: false, hasImages: false, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0500', category: 'Pollution', citizenTitle: 'Smoke from unit affecting residents', description: 'A manufacturing unit nearby emitting thick smoke.', subCounty: 'Dasarahalli Zone', ward: 'Peenya', zone: 'Peenya Industrial Area', department: 'Environment', status: 'Assigned', priority: 'Critical', createdOn: '2026-03-01', createdAt: new Date('2026-03-01T06:45:00'), citizenName: 'Manjunath K.', assignedTo: 'resolver_002', assignedDepartment: 'Environment', slaDeadline: '2026-03-01T10:45:00', slaHoursRemaining: 2, hasVoiceNote: true, hasImages: true, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0499', category: 'Pothole', citizenTitle: 'Large pothole on main road', description: 'Very large pothole on the main road causing accidents and vehicle damage.', subCounty: 'East Zone', ward: 'Ulsoor', zone: 'Halasuru', department: 'Works', status: 'Open', priority: 'Critical', createdOn: '2026-03-01', createdAt: new Date('2026-03-01T07:00:00'), citizenName: 'Ravi Shankar', assignedTo: null, assignedDepartment: 'Works', slaDeadline: '2026-03-01T19:00:00', slaHoursRemaining: 10, hasVoiceNote: false, hasImages: true, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0497', category: 'Water Leak', citizenTitle: 'Burst pipe flooding street', description: 'A Cauvery water pipe has burst and is flooding the entire street.', subCounty: 'South Zone', ward: 'JP Nagar', zone: 'JP Nagar 6th Phase', department: 'Water & Sewerage', status: 'Assigned', priority: 'Critical', createdOn: '2026-03-01', createdAt: new Date('2026-03-01T05:30:00'), citizenName: 'Priya Nair', assignedTo: 'resolver_005', assignedDepartment: 'Water & Sewerage', slaDeadline: '2026-03-01T09:30:00', slaHoursRemaining: -3, hasVoiceNote: true, hasImages: true, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0496', category: 'Sewer Blockage', citizenTitle: 'Sewage overflowing into compound', description: 'The sewer line is blocked and sewage is flowing into our apartment compound.', subCounty: 'Mahadevapura Zone', ward: 'Marathahalli', zone: 'Outer Ring Road', department: 'Water & Sewerage', status: 'In Progress', priority: 'High', createdOn: '2026-02-28', createdAt: new Date('2026-02-28T16:00:00'), citizenName: 'Deepak Gowda', assignedTo: 'resolver_006', assignedDepartment: 'Water & Sewerage', slaDeadline: '2026-02-28T04:00:00', slaHoursRemaining: -8, hasVoiceNote: false, hasImages: true, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0494', category: 'Streetlight', citizenTitle: 'Streetlights not working', description: 'All streetlights on our road have been off for a week.', subCounty: 'West Zone', ward: 'Rajajinagar', zone: 'Rajajinagar 4th Block', department: 'Electrical', status: 'Assigned', priority: 'Medium', createdOn: '2026-02-27', createdAt: new Date('2026-02-27T18:30:00'), citizenName: 'Kavitha S.', assignedTo: 'resolver_010', assignedDepartment: 'Electrical', slaDeadline: '2026-03-02T18:30:00', slaHoursRemaining: 56, hasVoiceNote: false, hasImages: false, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0493', category: 'Traffic Signal', citizenTitle: 'Traffic signal not working at junction', description: 'The traffic signal at the main junction has been faulty for 2 days.', subCounty: 'East Zone', ward: 'Shivajinagar', zone: 'Commercial Street', department: 'Traffic Police', status: 'Open', priority: 'High', createdOn: '2026-02-27', createdAt: new Date('2026-02-27T07:15:00'), citizenName: 'Abdul Rahman', assignedTo: null, assignedDepartment: 'Traffic Police', slaDeadline: '2026-02-27T11:15:00', slaHoursRemaining: -48, hasVoiceNote: false, hasImages: true, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0492', category: 'Food Safety', citizenTitle: 'Restaurant serving unhygienic food', description: 'Noticed cockroaches in the kitchen of a restaurant. Health hazard.', subCounty: 'North Zone', ward: 'Malleshwaram', zone: 'Margosa Road', department: 'Public Health', status: 'In Progress', priority: 'High', createdOn: '2026-02-26', createdAt: new Date('2026-02-26T13:45:00'), citizenName: 'Meenakshi Iyer', assignedTo: 'resolver_015', assignedDepartment: 'Public Health', slaDeadline: '2026-02-27T13:45:00', slaHoursRemaining: -20, hasVoiceNote: true, hasImages: true, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0491', category: 'Blocked Drain', citizenTitle: 'Storm drain blocked causing flooding', description: 'The storm drain on our street is completely blocked with garbage.', subCounty: 'Bommanahalli Zone', ward: 'HSR Layout', zone: 'HSR Sector 7', department: 'Works', status: 'Assigned', priority: 'High', createdOn: '2026-02-26', createdAt: new Date('2026-02-26T10:30:00'), citizenName: 'Ganesh Hegde', assignedTo: 'resolver_020', assignedDepartment: 'Works', slaDeadline: '2026-02-28T10:30:00', slaHoursRemaining: 12, hasVoiceNote: false, hasImages: true, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0489', category: 'Road Damage', citizenTitle: 'Road surface badly damaged after rain', description: 'Heavy rains have damaged the road surface. Two-wheelers are skidding.', subCounty: 'Mahadevapura Zone', ward: 'Whitefield', zone: 'ITPL', department: 'Works', status: 'Open', priority: 'Medium', createdOn: '2026-02-25', createdAt: new Date('2026-02-25T15:00:00'), citizenName: 'Pradeep Kumar', assignedTo: null, assignedDepartment: 'Works', slaDeadline: '2026-03-02T15:00:00', slaHoursRemaining: 78, hasVoiceNote: false, hasImages: true, isReopened: false, reopenCount: 0 },
  { id: 'BBMP-2026-0488', category: 'Encroachment', citizenTitle: 'Footpath encroached by vendor', description: 'Street vendors have completely blocked the footpath near the bus stop.', subCounty: 'South Zone', ward: 'Jayanagar', zone: 'Jayanagar 9th Block', department: 'Revenue', status: 'Closed', priority: 'Medium', createdOn: '2026-02-24', createdAt: new Date('2026-02-24T09:00:00'), citizenName: 'Srinivas Murthy', assignedTo: 'resolver_016', assignedDepartment: 'Revenue', slaDeadline: '2026-02-27T09:00:00', slaHoursRemaining: 72, hasVoiceNote: false, hasImages: false, isReopened: false, reopenCount: 0 },
];

export function getMyAssignedIssues(): ResolverIssue[] {
  return ALL_COUNTY_ISSUES.filter(i => i.assignedTo === CURRENT_RESOLVER.id && i.status !== 'Closed');
}

export function getDepartmentIssues(): ResolverIssue[] {
  return ALL_COUNTY_ISSUES.filter(i => i.assignedDepartment === CURRENT_RESOLVER.department && i.assignedTo !== CURRENT_RESOLVER.id && i.status !== 'Closed');
}

export function getAwaitingResponseIssues(): ResolverIssue[] {
  return ALL_COUNTY_ISSUES.filter(i => i.assignedTo === CURRENT_RESOLVER.id && i.status === 'Awaiting Response');
}

export function getReopenedIssues(): ResolverIssue[] {
  return ALL_COUNTY_ISSUES.filter(i => i.assignedTo === CURRENT_RESOLVER.id && i.isReopened);
}

export function getClosedByMeIssues(): ResolverIssue[] {
  return ALL_COUNTY_ISSUES.filter(i => i.assignedTo === CURRENT_RESOLVER.id && i.status === 'Closed');
}

export function getTop100LatestIssues(): ResolverIssue[] {
  return [...ALL_COUNTY_ISSUES].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 100);
}

export const DEPARTMENT_COLORS: Record<string, string> = {
  'Environment': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Water & Sewerage': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Works': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  'Public Health': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
  'Electrical': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Traffic Police': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  'Revenue': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
};
