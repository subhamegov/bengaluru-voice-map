// API Client for Citizen Engagement Portal
// Designed to be swapped with real DIGIT PGR endpoints later

import { Story, StorySubmission, StoryCategory, IssueCategory, TicketStatus, WARDS, TicketUpdate, WorkflowHistoryItem, WorkflowAction, TicketRemark } from '@/types/story';
import { CITY } from '@/config/city';

// In-memory storage for mock data
let stories: Story[] = [
  {
    id: '1',
    ticketId: `${CITY.issueIdPrefix}-2025-000123`,
    tenantId: 'default',
    category: 'complaint',
    issueCategory: 'roads',
    serviceCode: 'ROAD_MAINTENANCE',
    title: 'Large pothole on Main Avenue',
    description: 'There is a dangerous pothole near the main intersection. Several cars have been damaged. It is about 30cm deep and growing larger after the recent rains.',
    lat: -1.2864,
    lng: 36.8172,
    wardCode: 'central',
    wardName: 'Central',
    createdAt: '2025-06-01T14:33:00.000Z',
    updatedAt: '2025-06-05T17:20:00.000Z',
    source: 'CITIZEN_ENGAGEMENT',
    status: 'in_progress',
    priority: 'HIGH',
    assignedTo: 'James O.',
    assignedDepartment: 'Roads Department',
    citizen: { name: 'John M.', mobileNumber: '0712345678' },
    sla: { dueInHours: 72, remaining: 48, deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() },
    slaDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    serviceRating: 3,
    attachments: [{ fileStoreId: 'att1', fileName: 'pothole.jpg' }],
    history: [
      { id: 'h1', performedBy: 'John M.', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-01T14:33:00.000Z', note: 'Report submitted via mobile app' },
      { id: 'h2', performedBy: 'Dispatch', performedByRole: 'system', action: 'ASSIGN', timestamp: '2025-06-02T09:15:00.000Z', note: 'Assigned to Roads Department' },
      { id: 'h3', performedBy: 'James O.', performedByRole: 'officer', action: 'IN_PROGRESS', timestamp: '2025-06-03T10:00:00.000Z', note: 'Site inspection scheduled' },
      { id: 'h4', performedBy: 'James O.', performedByRole: 'officer', action: 'REQUEST_INFO', timestamp: '2025-06-03T12:45:00.000Z', note: 'Requested additional photos of damage extent' },
    ],
    remarks: [
      { id: 'r1', by: 'James O.', byRole: 'officer', text: 'Visited the site. Damage is extensive, will require full patch.', timestamp: '2025-06-03T11:30:00.000Z' },
      { id: 'r2', by: 'John M.', byRole: 'citizen', text: 'Thank you for the update. Another car got damaged yesterday.', timestamp: '2025-06-04T08:15:00.000Z' },
      { id: 'r3', by: 'James O.', byRole: 'officer', text: 'Work crew scheduled for Monday. Area will be cordoned off.', timestamp: '2025-06-05T14:00:00.000Z' },
    ],
    updates: [
      { id: 'u1', message: 'Issue received and logged.', author: 'System', authorType: 'staff', createdAt: '2025-06-01T14:33:00.000Z' },
      { id: 'u2', message: 'Assigned to Roads Department for repair.', author: 'Dispatch', authorType: 'staff', createdAt: '2025-06-02T09:15:00.000Z' },
    ],
  },
  {
    id: '2',
    ticketId: `${CITY.issueIdPrefix}-2025-000124`,
    tenantId: 'default',
    category: 'complaint',
    issueCategory: 'waste',
    serviceCode: 'WASTE_MANAGEMENT',
    title: 'Garbage not collected for 1 week',
    description: 'The garbage collection truck has not come to our street for over a week. The bins are overflowing and there is a bad smell attracting pests.',
    lat: -1.2673,
    lng: 36.8058,
    wardCode: 'westlands',
    wardName: 'Westlands',
    createdAt: '2025-06-03T10:20:00.000Z',
    updatedAt: '2025-06-04T11:00:00.000Z',
    source: 'CITIZEN_ENGAGEMENT',
    status: 'assigned',
    priority: 'MEDIUM',
    assignedTo: 'Mary W.',
    assignedDepartment: 'Waste Management',
    citizen: { name: 'Sarah K.', mobileNumber: '0723456789' },
    sla: { dueInHours: 48, remaining: 24, deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
    slaDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    serviceRating: 2,
    history: [
      { id: 'h1', performedBy: 'Sarah K.', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-03T10:20:00.000Z' },
      { id: 'h2', performedBy: 'System', performedByRole: 'system', action: 'ASSIGN', timestamp: '2025-06-04T11:00:00.000Z', note: 'Auto-assigned to Waste Management' },
    ],
    remarks: [
      { id: 'r1', by: 'Mary W.', byRole: 'officer', text: 'Collection vehicle was under repair. Service resuming tomorrow.', timestamp: '2025-06-05T09:00:00.000Z' },
    ],
  },
  {
    id: '3',
    ticketId: `${CITY.issueIdPrefix}-2025-000125`,
    tenantId: 'default',
    category: 'appreciation',
    title: 'Thank you for fixing the water pipe!',
    description: 'The burst water pipe was fixed very quickly. We are grateful to the workers who came even on Sunday. Great service!',
    lat: -1.2892,
    lng: 36.7865,
    wardCode: 'kilimani',
    wardName: 'Kilimani',
    createdAt: '2025-06-02T16:00:00.000Z',
    updatedAt: '2025-06-02T16:00:00.000Z',
    source: 'CITIZEN_ENGAGEMENT',
    status: 'resolved',
    priority: 'LOW',
    citizen: { name: 'Peter O.', mobileNumber: '0734567890' },
    satisfactionRating: 5,
    history: [
      { id: 'h1', performedBy: 'Peter O.', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-02T16:00:00.000Z', note: 'Appreciation submitted' },
      { id: 'h2', performedBy: 'System', performedByRole: 'system', action: 'RESOLVE', timestamp: '2025-06-02T16:00:00.000Z', note: 'Auto-resolved (appreciation)' },
    ],
  },
  {
    id: '4',
    ticketId: `${CITY.issueIdPrefix}-2025-000126`,
    tenantId: 'default',
    category: 'complaint',
    issueCategory: 'streetlights',
    serviceCode: 'STREET_LIGHTING',
    title: 'Street light not working near shopping center',
    description: 'The street light near the shopping center has been off for 3 weeks. It is very dark and unsafe at night. Multiple residents have complained.',
    lat: -1.3196,
    lng: 36.7128,
    wardCode: 'karen',
    wardName: 'Karen',
    createdAt: '2025-06-04T08:00:00.000Z',
    source: 'CITIZEN_ENGAGEMENT',
    status: 'new',
    priority: 'MEDIUM',
    citizen: { name: 'Grace N.', mobileNumber: '0745678901' },
    sla: { dueInHours: 120, remaining: 96, deadline: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString() },
    slaDeadline: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString(),
    history: [
      { id: 'h1', performedBy: 'Grace N.', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-04T08:00:00.000Z' },
    ],
  },
  {
    id: '5',
    ticketId: `${CITY.issueIdPrefix}-2025-000127`,
    tenantId: 'default',
    category: 'complaint',
    issueCategory: 'water',
    serviceCode: 'WATER_SUPPLY',
    title: 'Water supply interrupted for 3 days',
    description: 'No water supply in the area for the past 3 days. This is affecting many households and businesses. Urgent attention needed.',
    lat: -1.2621,
    lng: 36.8135,
    wardCode: 'parklands',
    wardName: 'Parklands/Highridge',
    createdAt: '2025-06-01T06:00:00.000Z',
    updatedAt: '2025-06-02T10:00:00.000Z',
    source: 'CITIZEN_ENGAGEMENT',
    status: 'escalated',
    priority: 'URGENT',
    assignedTo: 'David K.',
    assignedDepartment: 'Water Services',
    citizen: { name: 'Michael O.', mobileNumber: '0756789012' },
    sla: { dueInHours: 24, remaining: -48, deadline: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() },
    slaDeadline: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    isOverdue: true,
    history: [
      { id: 'h1', performedBy: 'Michael O.', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-01T06:00:00.000Z' },
      { id: 'h2', performedBy: 'System', performedByRole: 'system', action: 'ASSIGN', timestamp: '2025-06-01T08:00:00.000Z' },
      { id: 'h3', performedBy: 'Michael O.', performedByRole: 'citizen', action: 'ESCALATE', timestamp: '2025-06-02T10:00:00.000Z', note: 'Expected service time exceeded, escalated by citizen' },
    ],
    remarks: [
      { id: 'r1', by: 'David K.', byRole: 'officer', text: 'Main pipeline burst detected. Emergency repair team deployed.', timestamp: '2025-06-02T12:00:00.000Z' },
      { id: 'r2', by: 'Michael O.', byRole: 'citizen', text: 'Still no water. Situation is critical.', timestamp: '2025-06-03T07:00:00.000Z' },
    ],
  },
  {
    id: '6',
    ticketId: `${CITY.issueIdPrefix}-2025-000128`,
    tenantId: 'default',
    category: 'complaint',
    issueCategory: 'noise',
    serviceCode: 'ENVIRONMENTAL',
    title: 'Construction noise at night',
    description: 'Construction site operating heavy machinery after 10 PM, disturbing residents in the area. This has been ongoing for 2 weeks.',
    lat: -1.2892,
    lng: 36.7865,
    wardCode: 'kilimani',
    wardName: 'Kilimani',
    createdAt: '2025-06-05T22:00:00.000Z',
    source: 'CITIZEN_ENGAGEMENT',
    status: 'new',
    priority: 'LOW',
    citizen: { name: 'Anne W.', mobileNumber: '0767890123' },
    sla: { dueInHours: 168, remaining: 144, deadline: new Date(Date.now() + 144 * 60 * 60 * 1000).toISOString() },
    slaDeadline: new Date(Date.now() + 144 * 60 * 60 * 1000).toISOString(),
    history: [
      { id: 'h1', performedBy: 'Anne W.', performedByRole: 'citizen', action: 'CREATE', timestamp: '2025-06-05T22:00:00.000Z' },
    ],
  },
];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function generateTicketId(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 900000) + 100000;
  return `${CITY.issueIdPrefix}-${year}-${num}`;
}

function findWardByCode(code?: string) {
  return WARDS.find(w => w.code === code);
}

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiClient = {
  /**
   * Create a new story (maps to DIGIT PGR /_create)
   */
  async createStory(submission: StorySubmission): Promise<Story> {
    await delay(500);
    
    const ward = findWardByCode(submission.wardCode);
    
    // Convert audio blob to data URL for storage
    let audioUrl: string | undefined;
    if (submission.audioBlob) {
      audioUrl = URL.createObjectURL(submission.audioBlob);
    }

    // Convert photo files to URLs
    let photos: string[] | undefined;
    if (submission.photos && submission.photos.length > 0) {
      photos = submission.photos.map(file => URL.createObjectURL(file));
    }
    
    const story: Story = {
      id: generateId(),
      ticketId: generateTicketId(),
      tenantId: 'default',
      category: submission.category,
      issueCategory: submission.issueCategory,
      title: submission.title,
      description: submission.description || '',
      audioUrl,
      audioBlob: submission.audioBlob,
      audioDuration: submission.audioDuration,
      photos,
      lat: submission.lat || -1.29,
      lng: submission.lng || 36.82,
      locationDescription: submission.locationDescription,
      wardCode: submission.wardCode,
      wardName: ward?.name,
      createdAt: new Date().toISOString(),
      source: 'CITIZEN_ENGAGEMENT',
      reporterName: submission.reporterName,
      reporterPhone: submission.reporterPhone,
      citizen: submission.reporterName ? { name: submission.reporterName, mobileNumber: submission.reporterPhone } : undefined,
      serviceRating: submission.serviceRating,
      status: 'new',
      priority: 'MEDIUM',
      sla: { dueInHours: 168, remaining: 168, deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
      slaDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      history: [
        { id: generateId(), performedBy: submission.reporterName || 'Citizen', performedByRole: 'citizen', action: 'CREATE', timestamp: new Date().toISOString(), note: 'Report submitted' }
      ],
      updates: [
        { id: generateId(), message: 'Your report has been received. Thank you for helping improve our city.', author: 'System', authorType: 'staff', createdAt: new Date().toISOString() }
      ],
    };
    
    stories = [story, ...stories];
    return story;
  },

  /**
   * Get all stories (maps to DIGIT PGR /_search)
   */
  async getStories(categoryOrFilters?: StoryCategory | { category?: StoryCategory; issueCategory?: IssueCategory; wardCode?: string; status?: TicketStatus; limit?: number; }, issueCategory?: IssueCategory, status?: TicketStatus, searchTerm?: string): Promise<Story[]> {
    await delay(500);

    let filteredStories = [...stories];

    // Support both calling conventions
    if (typeof categoryOrFilters === 'object' && categoryOrFilters !== null && categoryOrFilters !== undefined) {
      const filters = categoryOrFilters;
      if (filters.category) filteredStories = filteredStories.filter(s => s.category === filters.category);
      if (filters.issueCategory) filteredStories = filteredStories.filter(s => s.issueCategory === filters.issueCategory);
      if (filters.wardCode) filteredStories = filteredStories.filter(s => s.wardCode === filters.wardCode);
      if (filters.status) filteredStories = filteredStories.filter(s => s.status === filters.status);
      if (filters.limit) filteredStories = filteredStories.slice(0, filters.limit);
    } else {
      const category = categoryOrFilters as StoryCategory | undefined;
      if (category) filteredStories = filteredStories.filter(s => s.category === category);
      if (issueCategory) filteredStories = filteredStories.filter(s => s.issueCategory === issueCategory);
      if (status) filteredStories = filteredStories.filter(s => s.status === status);
      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        filteredStories = filteredStories.filter(s =>
          s.title.toLowerCase().includes(lower) ||
          s.description?.toLowerCase().includes(lower) ||
          s.ticketId.toLowerCase().includes(lower)
        );
      }
    }

    return filteredStories;
  },

  /**
   * Get stories reported by the current user (maps to DIGIT PGR /_search)
   */
  async getMyTickets(): Promise<Story[]> {
    await delay(500);
    // In a real implementation, this would filter by the current user's ID
    return stories.filter(story => story.source === 'CITIZEN_ENGAGEMENT');
  },

  /**
   * Get a single story by ID (maps to DIGIT PGR /_search)
   */
  async getStory(id: string): Promise<Story | undefined> {
    await delay(500);
    return stories.find(story => story.id === id);
  },

  /**
   * Get a single story by ticketId (maps to DIGIT PGR /_search)
   */
  async getStoryByTicketId(ticketId: string): Promise<Story | undefined> {
    await delay(500);
    return stories.find(story => story.ticketId === ticketId);
  },

  /**
   * Add a comment to a story (maps to DIGIT PGR /_update)
   */
  async addComment(ticketId: string, message: string, author: string = 'Citizen', authorType: 'citizen' | 'staff' = 'citizen'): Promise<Story | undefined> {
    await delay(500);
    const story = stories.find(story => story.ticketId === ticketId);
    if (story) {
      const newUpdate: TicketUpdate = {
        id: generateId(),
        message,
        author,
        authorType,
        createdAt: new Date().toISOString()
      };
      story.updates = [...(story.updates || []), newUpdate];
      return story;
    }
    return undefined;
  },

  async addRemark(ticketId: string, text: string, by: string = 'Citizen', byRole: 'citizen' | 'officer' = 'citizen'): Promise<Story | undefined> {
    await delay(500);
    const story = stories.find(story => story.ticketId === ticketId);
    if (story) {
      const newRemark: TicketRemark = {
        id: generateId(),
        text,
        by,
        byRole,
        timestamp: new Date().toISOString()
      };
      story.remarks = [...(story.remarks || []), newRemark];
      return story;
    }
    return undefined;
  },

  /**
   * Update the status of a ticket (maps to DIGIT PGR /_update)
   */
  async updateStatus(ticketId: string, status: TicketStatus, performedBy: string, performedByRole: 'citizen' | 'officer' | 'system', note?: string): Promise<Story | undefined> {
    await delay(500);
    const story = stories.find(story => story.ticketId === ticketId);
    if (story) {
      story.status = status;
      const actionMap: Record<TicketStatus, WorkflowAction> = {
        new: 'CREATE',
        assigned: 'ASSIGN',
        in_progress: 'IN_PROGRESS',
        resolved: 'RESOLVE',
        escalated: 'ESCALATE',
      };
      const historyItem: WorkflowHistoryItem = {
        id: generateId(),
        performedBy,
        performedByRole,
        action: actionMap[status],
        timestamp: new Date().toISOString(),
        note
      };
      story.history = [...(story.history || []), historyItem];
      return story;
    }
    return undefined;
  },

  /**
   * Escalate a ticket (maps to DIGIT PGR /_update)
   */
  async escalateTicket(ticketId: string, note: string, performedBy: string = 'Citizen', performedByRole: 'citizen' | 'officer' | 'system' = 'citizen'): Promise<Story | undefined> {
    await delay(500);
    const story = stories.find(story => story.ticketId === ticketId);
    if (story) {
      story.priority = 'URGENT';
      story.status = 'escalated';
      const historyItem: WorkflowHistoryItem = {
        id: generateId(),
        performedBy,
        performedByRole,
        action: 'ESCALATE',
        timestamp: new Date().toISOString(),
        note: note || 'Ticket escalated'
      };
      story.history = [...(story.history || []), historyItem];
      return story;
    }
    return undefined;
  },

  /**
   * Rate satisfaction with a resolved ticket
   */
  async rateSatisfaction(ticketId: string, rating: number): Promise<Story | undefined> {
    await delay(500);
    const story = stories.find(story => story.ticketId === ticketId);
    if (story) {
      story.satisfactionRating = rating;
      return story;
    }
    return undefined;
  },

  /**
   * Get wards (maps to DIGIT /location/_search)
   */
  async getWards(): Promise<{ name: string; code: string; }[]> {
    await delay(200);
    return WARDS;
  },

  async transcribeAudio(audioBlob: Blob): Promise<string> {
    console.log('Audio transcription placeholder - audio size:', audioBlob.size);
    return '[Voice message - transcription coming soon]';
  },

  speakText: async (text: string, lang: string = 'en-US'): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      utterance.onend = () => resolve();
      utterance.onerror = (e) => reject(e);
      window.speechSynthesis.speak(utterance);
    });
  }
};

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Placeholder for future speech-to-text integration
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  console.log('Audio transcription placeholder - audio size:', audioBlob.size);
  return '[Voice message - transcription coming soon]';
}

// Text-to-speech utility using Web Speech API
export function speakText(text: string, lang: string = 'en-US'): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);
    window.speechSynthesis.speak(utterance);
  });
}
