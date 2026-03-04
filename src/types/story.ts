// DIGIT PGR-ready data structures for Citizen Engagement

export type IssueCategory = 'roads' | 'water' | 'waste' | 'streetlights' | 'noise' | 'other';
export type StoryCategory = 'complaint' | 'idea' | 'appreciation';
export type TicketStatus = 'new' | 'assigned' | 'in_progress' | 'resolved' | 'escalated';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type WorkflowAction = 'CREATE' | 'ASSIGN' | 'IN_PROGRESS' | 'REQUEST_INFO' | 'RESOLVE' | 'ESCALATE' | 'CLOSE' | 'REOPEN';

export interface WorkflowHistoryItem {
  id: string;
  performedBy: string;
  performedByRole: 'citizen' | 'officer' | 'system';
  action: WorkflowAction;
  note?: string;
  timestamp: string;
}

export interface TicketRemark {
  id: string;
  by: string;
  byRole: 'citizen' | 'officer';
  text: string;
  timestamp: string;
  attachments?: { fileStoreId: string; fileName: string }[];
}

export interface CitizenInfo {
  name: string;
  mobileNumber?: string;
  email?: string;
}

export interface SLAInfo {
  dueInHours: number;
  remaining: number; // can be negative if overdue
  deadline: string;
}

export interface Story {
  id: string;
  ticketId: string; // Reference number for citizens
  tenantId: string;
  category: StoryCategory;
  issueCategory?: IssueCategory;
  serviceCode?: string; // DIGIT PGR service code
  title: string;
  description: string;
  audioUrl?: string;
  audioBlob?: Blob;
  audioDuration?: number;
  photos?: string[]; // URLs to uploaded photos
  attachments?: { fileStoreId: string; fileName: string }[];
  lat: number;
  lng: number;
  locationDescription?: string;
  wardCode?: string;
  wardName?: string;
  createdAt: string;
  updatedAt?: string;
  source: 'CITIZEN_ENGAGEMENT';
  
  // Contact info
  reporterName?: string;
  reporterPhone?: string;
  citizen?: CitizenInfo;
  
  // Rating (1-5 stars)
  serviceRating?: number;
  
  // Status tracking
  status: TicketStatus;
  priority?: TicketPriority;
  assignedTo?: string;
  assignedDepartment?: string;
  departmentCode?: string;
  
  // SLA tracking
  slaDeadline?: string;
  sla?: SLAInfo;
  isOverdue?: boolean;
  
  // Updates and comments (legacy)
  updates?: TicketUpdate[];
  satisfactionRating?: number; // Post-resolution rating
  
  // Workflow history (DIGIT-compatible)
  history?: WorkflowHistoryItem[];
  remarks?: TicketRemark[];
  
  // DIGIT PGR mapping
  serviceRequestId?: string;
}

export interface TicketUpdate {
  id: string;
  message: string;
  author: string;
  authorType: 'citizen' | 'staff';
  createdAt: string;
}

export type DepartmentSelectionSource = 'AUTO' | 'USER_OVERRIDE';

export type Department = 
  | 'Environment'
  | 'Water and Sewerage'
  | 'Works'
  | 'Public Health'
  | 'Mobility and ICT Infrastructure'
  | 'To be assigned';

export const DEPARTMENTS: Department[] = [
  'Environment',
  'Water and Sewerage',
  'Works',
  'Public Health',
  'Mobility and ICT Infrastructure',
];

export const CATEGORY_TO_DEPARTMENT: Record<IssueCategory, Department> = {
  roads: 'Works',
  water: 'Water and Sewerage',
  waste: 'Environment',
  streetlights: 'Mobility and ICT Infrastructure',
  noise: 'Public Health',
  other: 'To be assigned',
};

export interface BeneficiaryInfo {
  isOnBehalf: boolean;
  name?: string;
  phone?: string;
  relationship?: string;
  receiveUpdates: boolean;
}

export interface StorySubmission {
  category: StoryCategory;
  issueCategory?: IssueCategory;
  title: string;
  description?: string;
  audioBlob?: Blob;
  audioDuration?: number;
  photos?: File[];
  lat?: number;
  lng?: number;
  locationDescription?: string;
  wardCode?: string;
  reporterName?: string;
  reporterPhone?: string;
  shareContactWithDepartment?: boolean;
  serviceRating?: number;
  responsibleDepartment?: Department;
  departmentSelectionSource?: DepartmentSelectionSource;
  beneficiary?: BeneficiaryInfo;
}

export interface Ward {
  code: string;
  name: string;
  subcounty: string;
  center: { lat: number; lng: number };
}

// City wards (sample data — replace with real MDMS ward data)
export const WARDS: Ward[] = [
  { code: 'ward_01', name: 'Ward 1', subcounty: 'Zone A', center: { lat: 28.6139, lng: 77.2090 } },
  { code: 'ward_02', name: 'Ward 2', subcounty: 'Zone A', center: { lat: 28.6200, lng: 77.2150 } },
  { code: 'ward_03', name: 'Ward 3', subcounty: 'Zone B', center: { lat: 28.6300, lng: 77.2200 } },
  { code: 'ward_04', name: 'Ward 4', subcounty: 'Zone B', center: { lat: 28.6350, lng: 77.2100 } },
  { code: 'ward_05', name: 'Ward 5', subcounty: 'Zone C', center: { lat: 28.6400, lng: 77.2300 } },
  { code: 'ward_06', name: 'Ward 6', subcounty: 'Zone C', center: { lat: 28.6450, lng: 77.2250 } },
  { code: 'ward_07', name: 'Ward 7', subcounty: 'Zone D', center: { lat: 28.6500, lng: 77.2100 } },
  { code: 'ward_08', name: 'Ward 8', subcounty: 'Zone D', center: { lat: 28.6550, lng: 77.2050 } },
  { code: 'ward_09', name: 'Ward 9', subcounty: 'Zone E', center: { lat: 28.6600, lng: 77.2180 } },
  { code: 'ward_10', name: 'Ward 10', subcounty: 'Zone E', center: { lat: 28.6650, lng: 77.2120 } },
  { code: 'ward_11', name: 'Ward 11', subcounty: 'Zone F', center: { lat: 28.6700, lng: 77.2200 } },
  { code: 'ward_12', name: 'Ward 12', subcounty: 'Zone F', center: { lat: 28.6750, lng: 77.2280 } },
  { code: 'central', name: 'Central', subcounty: 'Zone A', center: { lat: 28.6139, lng: 77.2090 } },
];

export const ISSUE_CATEGORIES: { code: IssueCategory; label: string; icon: string; description: string; serviceCode: string }[] = [
  { code: 'roads', label: 'Roads & Potholes', icon: '🛣️', description: 'Potholes, road damage, traffic issues', serviceCode: 'ROAD_MAINTENANCE' },
  { code: 'water', label: 'Water & Sewage', icon: '💧', description: 'Leaks, blockages, water supply', serviceCode: 'WATER_SUPPLY' },
  { code: 'waste', label: 'Waste & Garbage', icon: '🗑️', description: 'Garbage collection, dumping', serviceCode: 'WASTE_MANAGEMENT' },
  { code: 'streetlights', label: 'Streetlights', icon: '💡', description: 'Broken or missing lights', serviceCode: 'STREET_LIGHTING' },
  { code: 'noise', label: 'Noise & Pollution', icon: '🔊', description: 'Noise complaints, air quality', serviceCode: 'ENVIRONMENTAL' },
  { code: 'other', label: 'Other Issues', icon: '📋', description: 'Other service requests', serviceCode: 'GENERAL' },
];

export const CATEGORY_LABELS: Record<StoryCategory, string> = {
  complaint: 'Report a Problem',
  idea: 'Share an Idea',
  appreciation: 'Give Thanks',
};

export const CATEGORY_DESCRIPTIONS: Record<StoryCategory, string> = {
  complaint: 'Something that needs fixing or attention',
  idea: 'A suggestion to improve our county',
  appreciation: 'Something good that happened',
};

export const STATUS_LABELS: Record<TicketStatus, { label: string; color: string; bgColor: string }> = {
  new: { label: 'New', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  assigned: { label: 'Assigned', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  in_progress: { label: 'In Progress', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  resolved: { label: 'Resolved', color: 'text-green-700', bgColor: 'bg-green-100' },
  escalated: { label: 'Escalated', color: 'text-red-700', bgColor: 'bg-red-100' },
};

export const PRIORITY_LABELS: Record<TicketPriority, { label: string; color: string }> = {
  LOW: { label: 'Low', color: 'text-slate-600' },
  MEDIUM: { label: 'Medium', color: 'text-blue-600' },
  HIGH: { label: 'High', color: 'text-orange-600' },
  URGENT: { label: 'Urgent', color: 'text-red-600' },
};

export const WORKFLOW_ACTION_LABELS: Record<WorkflowAction, { label: string; icon: string }> = {
  CREATE: { label: 'Created', icon: '📝' },
  ASSIGN: { label: 'Assigned', icon: '👤' },
  IN_PROGRESS: { label: 'In Progress', icon: '🔧' },
  REQUEST_INFO: { label: 'Info Requested', icon: '❓' },
  RESOLVE: { label: 'Resolved', icon: '✅' },
  ESCALATE: { label: 'Escalated', icon: '⚠️' },
  CLOSE: { label: 'Closed', icon: '🔒' },
  REOPEN: { label: 'Reopened', icon: '🔓' },
};