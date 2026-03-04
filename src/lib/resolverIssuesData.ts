// Shared issue data and types for the Resolver app

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

// Calculate age in hours/days
export function getIssueAge(createdAt: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 24) {
    return `${diffHours}h`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d`;
}

// Format SLA countdown
export function getSlaCountdown(hoursRemaining: number): { text: string; isOverdue: boolean; isUrgent: boolean } {
  if (hoursRemaining <= 0) {
    return { text: `${Math.abs(hoursRemaining)}h overdue`, isOverdue: true, isUrgent: true };
  }
  if (hoursRemaining < 24) {
    return { text: `${hoursRemaining}h left`, isOverdue: false, isUrgent: hoursRemaining < 8 };
  }
  const days = Math.floor(hoursRemaining / 24);
  const hours = hoursRemaining % 24;
  return { text: `${days}d ${hours}h left`, isOverdue: false, isUrgent: false };
}

// Mock current resolver info
export const CURRENT_RESOLVER = {
  id: 'resolver_001',
  name: 'John Resolver',
  department: 'Environment',
  team: 'Waste Management Unit',
};

// Comprehensive mock data - ALL county issues
export const ALL_COUNTY_ISSUES: ResolverIssue[] = [
  // Assigned to current resolver
  {
    id: 'ULB-2025-0501',
    category: 'Garbage Collection',
    citizenTitle: 'Garbage not collected for 3 days',
    description: 'The garbage collection truck has not come to our estate for 3 days. Waste is piling up.',
    subCounty: 'Westlands',
    ward: 'Parklands',
    zone: 'Zone A',
    department: 'Environment',
    status: 'Assigned',
    priority: 'High',
    createdOn: '2025-12-11',
    createdAt: new Date('2025-12-11T08:30:00'),
    citizenName: 'John Kamau',
    citizenPhone: '+254 722 XXX XXX',
    assignedTo: 'resolver_001',
    assignedDepartment: 'Environment',
    slaDeadline: '2025-12-12T08:30:00',
    slaHoursRemaining: 18,
    hasVoiceNote: true,
    hasImages: true,
    isReopened: false,
    reopenCount: 0,
  },
  {
    id: 'ULB-2025-0498',
    category: 'Illegal Dumping',
    citizenTitle: 'Construction waste dumped on roadside',
    description: 'Someone has dumped construction debris on the roadside near the market.',
    subCounty: 'Kasarani',
    ward: 'Roysambu',
    zone: 'Zone C',
    department: 'Environment',
    status: 'In Progress',
    priority: 'Medium',
    createdOn: '2025-12-10',
    createdAt: new Date('2025-12-10T14:20:00'),
    citizenName: 'Sarah Mutua',
    assignedTo: 'resolver_001',
    assignedDepartment: 'Environment',
    slaDeadline: '2025-12-12T14:20:00',
    slaHoursRemaining: 42,
    hasVoiceNote: false,
    hasImages: true,
    isReopened: false,
    reopenCount: 0,
  },
  {
    id: 'ULB-2025-0495',
    category: 'Street Cleaning',
    citizenTitle: 'Market area very dirty',
    description: 'The market area has not been cleaned properly. There are food scraps everywhere.',
    subCounty: 'Starehe',
    ward: 'Ngara',
    zone: 'Zone B',
    department: 'Environment',
    status: 'Awaiting Response',
    priority: 'Medium',
    createdOn: '2025-12-09',
    createdAt: new Date('2025-12-09T09:15:00'),
    citizenName: 'Grace Njeri',
    assignedTo: 'resolver_001',
    assignedDepartment: 'Environment',
    slaDeadline: '2025-12-11T09:15:00',
    slaHoursRemaining: -6,
    hasVoiceNote: false,
    hasImages: false,
    isReopened: false,
    reopenCount: 0,
  },
  {
    id: 'ULB-2025-0490',
    category: 'Garbage Collection',
    citizenTitle: 'Skip bins overflowing',
    description: 'The communal skip bins in our area are overflowing.',
    subCounty: 'Langata',
    ward: 'Karen',
    zone: 'Zone A',
    department: 'Environment',
    status: 'Reopened',
    priority: 'High',
    createdOn: '2025-12-08',
    createdAt: new Date('2025-12-08T11:00:00'),
    citizenName: 'Peter Ochieng',
    assignedTo: 'resolver_001',
    assignedDepartment: 'Environment',
    slaDeadline: '2025-12-11T11:00:00',
    slaHoursRemaining: 4,
    hasVoiceNote: true,
    hasImages: true,
    isReopened: true,
    reopenCount: 2,
  },
  // Closed by current resolver
  {
    id: 'ULB-2025-0485',
    category: 'Noise Pollution',
    citizenTitle: 'Loud music from bar at night',
    description: 'A bar near our residential area plays very loud music until 3 AM.',
    subCounty: 'Kilimani',
    ward: 'Kilimani',
    zone: 'Zone D',
    department: 'Environment',
    status: 'Closed',
    priority: 'Medium',
    createdOn: '2025-12-07',
    createdAt: new Date('2025-12-07T22:30:00'),
    citizenName: 'Alice Wanjiku',
    assignedTo: 'resolver_001',
    assignedDepartment: 'Environment',
    slaDeadline: '2025-12-10T22:30:00',
    slaHoursRemaining: 72,
    hasVoiceNote: false,
    hasImages: false,
    isReopened: false,
    reopenCount: 0,
  },
  // Assigned to department (Environment) but not specifically to current resolver
  {
    id: 'ULB-2025-0500',
    category: 'Pollution',
    citizenTitle: 'Smoke from factory affecting residents',
    description: 'A factory nearby is emitting thick black smoke.',
    subCounty: 'Embakasi',
    ward: 'Pipeline',
    zone: 'Zone E',
    department: 'Environment',
    status: 'Assigned',
    priority: 'Critical',
    createdOn: '2025-12-11',
    createdAt: new Date('2025-12-11T06:45:00'),
    citizenName: 'David Mwangi',
    assignedTo: 'resolver_002',
    assignedDepartment: 'Environment',
    slaDeadline: '2025-12-11T10:45:00',
    slaHoursRemaining: 2,
    hasVoiceNote: true,
    hasImages: true,
    isReopened: false,
    reopenCount: 0,
  },
  // Other departments - for Search Issues
  {
    id: 'ULB-2025-0499',
    category: 'Pothole',
    citizenTitle: 'Large pothole on main road',
    description: 'There is a very large pothole on the main road causing accidents.',
    subCounty: 'Westlands',
    ward: 'Parklands',
    zone: 'Zone A',
    department: 'Works',
    status: 'Open',
    priority: 'Critical',
    createdOn: '2025-12-11',
    createdAt: new Date('2025-12-11T07:00:00'),
    citizenName: 'Michael Otieno',
    assignedTo: null,
    assignedDepartment: 'Works',
    slaDeadline: '2025-12-11T19:00:00',
    slaHoursRemaining: 10,
    hasVoiceNote: false,
    hasImages: true,
    isReopened: false,
    reopenCount: 0,
  },
  {
    id: 'ULB-2025-0497',
    category: 'Water Leak',
    citizenTitle: 'Burst pipe flooding street',
    description: 'A water pipe has burst and is flooding the entire street.',
    subCounty: 'Umoja',
    ward: 'Umoja I',
    zone: 'Zone B',
    department: 'Water & Sewerage',
    status: 'Assigned',
    priority: 'Critical',
    createdOn: '2025-12-11',
    createdAt: new Date('2025-12-11T05:30:00'),
    citizenName: 'Mary Wanjiku',
    assignedTo: 'resolver_005',
    assignedDepartment: 'Water & Sewerage',
    slaDeadline: '2025-12-11T09:30:00',
    slaHoursRemaining: -3,
    hasVoiceNote: true,
    hasImages: true,
    isReopened: false,
    reopenCount: 0,
  },
  {
    id: 'ULB-2025-0496',
    category: 'Sewer Blockage',
    citizenTitle: 'Sewage overflowing into compound',
    description: 'The sewer line is blocked and sewage is flowing into our compound.',
    subCounty: 'Embakasi',
    ward: 'Kayole North',
    zone: 'Zone C',
    department: 'Water & Sewerage',
    status: 'In Progress',
    priority: 'High',
    createdOn: '2025-12-10',
    createdAt: new Date('2025-12-10T16:00:00'),
    citizenName: 'James Kiprop',
    assignedTo: 'resolver_006',
    assignedDepartment: 'Water & Sewerage',
    slaDeadline: '2025-12-11T04:00:00',
    slaHoursRemaining: -8,
    hasVoiceNote: false,
    hasImages: true,
    isReopened: false,
    reopenCount: 0,
  },
  {
    id: 'ULB-2025-0494',
    category: 'Street Light',
    citizenTitle: 'Street lights not working',
    description: 'All street lights on our road have been off for a week.',
    subCounty: 'Dagoretti',
    ward: 'Kawangware',
    zone: 'Zone D',
    department: 'Mobility & ICT',
    status: 'Assigned',
    priority: 'Medium',
    createdOn: '2025-12-09',
    createdAt: new Date('2025-12-09T18:30:00'),
    citizenName: 'Nancy Chebet',
    assignedTo: 'resolver_010',
    assignedDepartment: 'Mobility & ICT',
    slaDeadline: '2025-12-12T18:30:00',
    slaHoursRemaining: 56,
    hasVoiceNote: false,
    hasImages: false,
    isReopened: false,
    reopenCount: 0,
  },
  {
    id: 'ULB-2025-0493',
    category: 'Traffic Light',
    citizenTitle: 'Traffic light not working at junction',
    description: 'The traffic light at the main junction has been faulty.',
    subCounty: 'Starehe',
    ward: 'Nairobi Central',
    zone: 'CBD',
    department: 'Mobility & ICT',
    status: 'Open',
    priority: 'High',
    createdOn: '2025-12-09',
    createdAt: new Date('2025-12-09T07:15:00'),
    citizenName: 'Brian Wekesa',
    assignedTo: null,
    assignedDepartment: 'Mobility & ICT',
    slaDeadline: '2025-12-09T11:15:00',
    slaHoursRemaining: -48,
    hasVoiceNote: false,
    hasImages: true,
    isReopened: false,
    reopenCount: 0,
  },
  {
    id: 'ULB-2025-0492',
    category: 'Food Safety',
    citizenTitle: 'Restaurant selling expired food',
    description: 'I bought food from a restaurant and got sick. They are selling expired products.',
    subCounty: 'Westlands',
    ward: 'Highridge',
    zone: 'Zone A',
    department: 'Public Health',
    status: 'In Progress',
    priority: 'High',
    createdOn: '2025-12-08',
    createdAt: new Date('2025-12-08T13:45:00'),
    citizenName: 'Elizabeth Akinyi',
    assignedTo: 'resolver_015',
    assignedDepartment: 'Public Health',
    slaDeadline: '2025-12-09T13:45:00',
    slaHoursRemaining: -20,
    hasVoiceNote: true,
    hasImages: true,
    isReopened: false,
    reopenCount: 0,
  },
  {
    id: 'ULB-2025-0491',
    category: 'Blocked Drain',
    citizenTitle: 'Storm drain blocked causing flooding',
    description: 'The storm drain on our street is completely blocked.',
    subCounty: 'Roysambu',
    ward: 'Zimmerman',
    zone: 'Zone F',
    department: 'Works',
    status: 'Assigned',
    priority: 'High',
    createdOn: '2025-12-08',
    createdAt: new Date('2025-12-08T10:30:00'),
    citizenName: 'Samuel Omondi',
    assignedTo: 'resolver_020',
    assignedDepartment: 'Works',
    slaDeadline: '2025-12-10T10:30:00',
    slaHoursRemaining: 12,
    hasVoiceNote: false,
    hasImages: true,
    isReopened: false,
    reopenCount: 0,
  },
  {
    id: 'ULB-2025-0489',
    category: 'Road Damage',
    citizenTitle: 'Road surface badly damaged after rain',
    description: 'Heavy rains have damaged the road surface. Vehicles are getting stuck.',
    subCounty: 'Kasarani',
    ward: 'Ruaraka',
    zone: 'Zone B',
    department: 'Works',
    status: 'Open',
    priority: 'Medium',
    createdOn: '2025-12-07',
    createdAt: new Date('2025-12-07T15:00:00'),
    citizenName: 'Faith Nyambura',
    assignedTo: null,
    assignedDepartment: 'Works',
    slaDeadline: '2025-12-12T15:00:00',
    slaHoursRemaining: 78,
    hasVoiceNote: false,
    hasImages: true,
    isReopened: false,
    reopenCount: 0,
  },
  {
    id: 'ULB-2025-0488',
    category: 'Pest Control',
    citizenTitle: 'Rat infestation in market',
    description: 'There is a serious rat problem in the local market area.',
    subCounty: 'Langata',
    ward: 'Mugumo-ini',
    zone: 'Zone C',
    department: 'Public Health',
    status: 'Closed',
    priority: 'Medium',
    createdOn: '2025-12-06',
    createdAt: new Date('2025-12-06T09:00:00'),
    citizenName: 'Patrick Kibet',
    assignedTo: 'resolver_016',
    assignedDepartment: 'Public Health',
    slaDeadline: '2025-12-09T09:00:00',
    slaHoursRemaining: 72,
    hasVoiceNote: false,
    hasImages: false,
    isReopened: false,
    reopenCount: 0,
  },
];

// Get issues assigned to current resolver
export function getMyAssignedIssues(): ResolverIssue[] {
  return ALL_COUNTY_ISSUES.filter(
    (issue) => issue.assignedTo === CURRENT_RESOLVER.id && issue.status !== 'Closed'
  );
}

// Get issues assigned to current resolver's department
export function getDepartmentIssues(): ResolverIssue[] {
  return ALL_COUNTY_ISSUES.filter(
    (issue) => 
      issue.assignedDepartment === CURRENT_RESOLVER.department && 
      issue.assignedTo !== CURRENT_RESOLVER.id &&
      issue.status !== 'Closed'
  );
}

// Get issues awaiting response from current resolver
export function getAwaitingResponseIssues(): ResolverIssue[] {
  return ALL_COUNTY_ISSUES.filter(
    (issue) => issue.assignedTo === CURRENT_RESOLVER.id && issue.status === 'Awaiting Response'
  );
}

// Get reopened issues for current resolver
export function getReopenedIssues(): ResolverIssue[] {
  return ALL_COUNTY_ISSUES.filter(
    (issue) => issue.assignedTo === CURRENT_RESOLVER.id && issue.isReopened
  );
}

// Get issues closed by current resolver
export function getClosedByMeIssues(): ResolverIssue[] {
  return ALL_COUNTY_ISSUES.filter(
    (issue) => issue.assignedTo === CURRENT_RESOLVER.id && issue.status === 'Closed'
  );
}

// Get top 100 latest issues (for Search page)
export function getTop100LatestIssues(): ResolverIssue[] {
  return [...ALL_COUNTY_ISSUES]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 100);
}

// Department badge colors
export const DEPARTMENT_COLORS: Record<string, string> = {
  'Environment': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Water & Sewerage': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Works': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  'Public Health': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
  'Mobility & ICT': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
};
