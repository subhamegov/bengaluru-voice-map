export interface Department {
  id: string;
  name: string;
  icon: string;
  rating: number;
  totalRatings: number;
  appreciations: number;
  responsibilities: string[];
  keyOutcomes: string[];
  escalationContacts: { role: string; name: string; phone: string }[];
}

export interface CityMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string;
}

export interface ServiceUpdate {
  id: string;
  service: string;
  status: 'normal' | 'partial' | 'outage';
  title: string;
  affectedAreas: string[];
  department: string;
  expectedFixTime: string;
  updatedAt: string;
}

export interface CityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  type: 'hearing' | 'budget' | 'baraza' | 'consultation';
  agendaUrl?: string;
}

export interface QuickHelpItem {
  id: string;
  question: string;
  answer: string;
}

export const CITY_METRICS: CityMetric[] = [
  { id: 'population', label: 'Population Served', value: '1.3 Cr', description: 'BBMP serves approximately 1.3 crore (13 million) residents across 8 zones and 198 wards.', icon: 'Users' },
  { id: 'wards', label: 'Number of Wards', value: '198', description: 'The city is divided into 198 administrative wards under 8 BBMP zones.', icon: 'MapPin' },
  { id: 'waste', label: 'Daily Waste Collection', value: '5,500', description: 'Over 5,500 tonnes of waste are collected daily from households and commercial areas.', icon: 'Trash2' },
  { id: 'calls', label: 'Daily Service Requests', value: '1,200+', description: 'Average of 1,200+ citizen service requests received daily across all channels.', icon: 'Phone' },
  { id: 'parking', label: 'Property Tax Collection', value: '₹3,800 Cr', description: 'Annual property tax collection. Pay online at bbmptax.karnataka.gov.in.', icon: 'Car' },
  { id: 'permits', label: 'Trade Licences', value: '65,000+', description: 'Active trade licences managed. Apply online at bbmp.gov.in/trade-licence.', icon: 'FileText' },
];

export const CHARTER_RIGHTS = [
  'Right to timely service delivery within published standards',
  'Right to accessible information about all municipal services',
  'Right to complaint redress within 14 working days',
  'Right to fair and equal treatment without discrimination',
  'Right to privacy and protection of personal information',
  'Right to participate in Ward Sabha and budget discussions',
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'environment', name: 'Solid Waste Management', icon: 'Leaf', rating: 4.0, totalRatings: 1800, appreciations: 310,
    responsibilities: ['Door-to-door waste collection', 'Street sweeping', 'Dry waste & e-waste centres', 'Composting and processing', 'Bulk waste generators compliance'],
    keyOutcomes: ['95% daily collection coverage', 'Reduced black-spot dumping', 'Faster debris clearance'],
    escalationContacts: [
      { role: 'Zonal Health Officer', name: 'Dr. Rajesh Kumar', phone: '+91 80 XXXX XXXX' },
      { role: 'Joint Commissioner (SWM)', name: 'Sri Venkatesh Murthy', phone: '+91 80 XXXX XXXX' },
    ],
  },
  {
    id: 'water', name: 'Water Supply & Sewerage (BWSSB)', icon: 'Droplets', rating: 3.6, totalRatings: 2500, appreciations: 280,
    responsibilities: ['Cauvery water supply', 'Borewell maintenance', 'Sewer line repairs', 'New water connections', 'Water quality monitoring'],
    keyOutcomes: ['Cauvery Stage V supply expansion', 'Reduced pipe burst response time', 'Improved sewage treatment'],
    escalationContacts: [
      { role: 'Area Engineer', name: 'Sri Manjunath', phone: '+91 80 XXXX XXXX' },
      { role: 'Chief Engineer', name: 'Sri Nagendra Prasad', phone: '+91 80 XXXX XXXX' },
    ],
  },
  {
    id: 'works', name: 'Infrastructure & Roads', icon: 'Hammer', rating: 3.3, totalRatings: 3200, appreciations: 200,
    responsibilities: ['Road resurfacing and pothole repair', 'Footpath construction', 'Stormwater drain maintenance', 'Bridge and flyover maintenance'],
    keyOutcomes: ['Pothole filling within 48 hours', 'Pre-monsoon drain desilting', 'Pedestrian safety upgrades'],
    escalationContacts: [
      { role: 'Executive Engineer', name: 'Sri Basavaraj H.', phone: '+91 80 XXXX XXXX' },
      { role: 'Chief Engineer', name: 'Sri Prahlad Rao', phone: '+91 80 XXXX XXXX' },
    ],
  },
  {
    id: 'health', name: 'Public Health', icon: 'Heart', rating: 3.9, totalRatings: 1100, appreciations: 190,
    responsibilities: ['Food safety inspections', 'Vector control (dengue, malaria)', 'Public health clinics', 'Disease outbreak management'],
    keyOutcomes: ['Reduced dengue cases', 'Food establishment compliance', 'Epidemic preparedness'],
    escalationContacts: [
      { role: 'Medical Officer', name: 'Dr. Shilpa Reddy', phone: '+91 80 XXXX XXXX' },
      { role: 'Chief Health Officer', name: 'Dr. Suresh Babu', phone: '+91 80 XXXX XXXX' },
    ],
  },
  {
    id: 'mobility', name: 'Electrical & Street Lighting', icon: 'Monitor', rating: 3.7, totalRatings: 850, appreciations: 120,
    responsibilities: ['Streetlight maintenance', 'LED conversion program', 'Traffic signal coordination with BTP', 'CCTV systems'],
    keyOutcomes: ['90% LED conversion', 'Fault resolution within 24 hours', 'Smart streetlight pilots'],
    escalationContacts: [
      { role: 'Electrical Inspector', name: 'Sri Ramesh Gowda', phone: '+91 80 XXXX XXXX' },
      { role: 'Superintendent Engineer (Elec)', name: 'Sri Anand Kumar', phone: '+91 80 XXXX XXXX' },
    ],
  },
];

export const SERVICE_UPDATES: ServiceUpdate[] = [
  { id: 'u1', service: 'Water Supply', status: 'partial', title: 'Cauvery supply disruption – Koramangala', affectedAreas: ['Koramangala', 'BTM Layout', 'HSR Layout'], department: 'BWSSB', expectedFixTime: 'Today, 8:00 PM', updatedAt: '2 hours ago' },
  { id: 'u2', service: 'Electricity', status: 'partial', title: 'Transformer maintenance – Indiranagar', affectedAreas: ['Indiranagar', 'HAL 2nd Stage', 'Domlur'], department: 'BESCOM (coordinated)', expectedFixTime: 'Today, 5:00 PM', updatedAt: '4 hours ago' },
  { id: 'u3', service: 'Garbage Collection', status: 'partial', title: 'Collection delays – Mahadevapura Zone', affectedAreas: ['Whitefield', 'Marathahalli', 'Varthur'], department: 'BBMP SWM', expectedFixTime: 'Tomorrow, 6:00 AM', updatedAt: '1 hour ago' },
  { id: 'u4', service: 'Traffic Signals', status: 'outage', title: 'Signal failure at Silk Board Junction', affectedAreas: ['Silk Board', 'BTM Layout', 'HSR Layout'], department: 'Traffic Police / BBMP', expectedFixTime: 'Today, 3:00 PM', updatedAt: '30 minutes ago' },
];

export const CITY_EVENTS: CityEvent[] = [
  { id: 'e1', title: 'Public Budget Hearing – FY 2026-27', date: '2026-03-15', time: '10:00 AM – 1:00 PM', venue: 'BBMP Head Office, Hudson Circle', type: 'budget', agendaUrl: 'https://bbmp.gov.in/budget-hearing' },
  { id: 'e2', title: 'Ward Sabha – South Zone', date: '2026-03-18', time: '2:00 PM – 5:00 PM', venue: 'Jayanagar Community Hall', type: 'baraza' },
  { id: 'e3', title: 'Solid Waste Policy Consultation', date: '2026-03-20', time: '9:00 AM – 12:00 PM', venue: 'BBMP Council Hall', type: 'consultation', agendaUrl: 'https://bbmp.gov.in/swm-policy' },
  { id: 'e4', title: 'Traffic Management Public Hearing', date: '2026-03-22', time: '10:00 AM – 2:00 PM', venue: 'Vidhana Soudha, Conference Hall', type: 'hearing' },
];

export const QUICK_HELP: QuickHelpItem[] = [
  { id: 'h1', question: 'Where do I report a streetlight issue?', answer: 'Report through BBMP Sahaaya app, or call 080-22660000. Select "Streetlight" category. Include pole number if visible.' },
  { id: 'h2', question: 'How do citizens pay property tax?', answer: 'Pay online at bbmptax.karnataka.gov.in, at BBMP zonal offices, or at designated bank branches. SAS (Self Assessment Scheme) applies.' },
  { id: 'h3', question: 'What is the expected fix time for garbage collection complaints?', answer: '24 hours for residential, 12 hours for commercial/market areas, 4 hours for health hazard situations.' },
  { id: 'h4', question: 'How do departments coordinate field tasks?', answer: 'Use "Multi-Department" tag on tickets. Weekly coordination at zonal offices. Urgent: call BBMP Control Room 080-22660000.' },
  { id: 'h5', question: 'Where can citizens apply for trade licences?', answer: 'Online at bbmp.gov.in/trade-licence or at BBMP zonal offices. Processing: 3-5 working days.' },
  { id: 'h6', question: 'How do I access the Citizen Service Charter?', answer: 'Available at bbmp.gov.in/service-charter. Physical copies at all BBMP zonal offices.' },
];
