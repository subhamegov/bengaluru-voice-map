// Mock API for government and community happenings — Bengaluru / BBMP context
// Will be replaced with DIGIT MDMS or civic open-data API

import { Happening, ProjectDetails, ProjectComment } from '@/types/happenings';

// Bengaluru ward list for findWardByCoords
interface SimpleWard {
  code: string;
  name: string;
  subcounty: string;
  center: { lat: number; lng: number };
}

const WARDS: SimpleWard[] = [
  { code: 'JAYANAGAR', name: 'Jayanagar', subcounty: 'South Zone', center: { lat: 12.9250, lng: 77.5938 } },
  { code: 'KORAMANGALA', name: 'Koramangala', subcounty: 'Bommanahalli Zone', center: { lat: 12.9352, lng: 77.6245 } },
  { code: 'INDIRANAGAR', name: 'Indiranagar', subcounty: 'East Zone', center: { lat: 12.9784, lng: 77.6408 } },
  { code: 'MALLESHWARAM', name: 'Malleshwaram', subcounty: 'North Zone', center: { lat: 13.0035, lng: 77.5700 } },
  { code: 'WHITEFIELD', name: 'Whitefield', subcounty: 'Mahadevapura Zone', center: { lat: 12.9698, lng: 77.7500 } },
  { code: 'HSR_LAYOUT', name: 'HSR Layout', subcounty: 'Bommanahalli Zone', center: { lat: 12.9116, lng: 77.6389 } },
  { code: 'BTM_LAYOUT', name: 'BTM Layout', subcounty: 'South Zone', center: { lat: 12.9166, lng: 77.6101 } },
  { code: 'RAJAJINAGAR', name: 'Rajajinagar', subcounty: 'West Zone', center: { lat: 12.9900, lng: 77.5550 } },
  { code: 'HEBBAL', name: 'Hebbal', subcounty: 'North Zone', center: { lat: 13.0358, lng: 77.5970 } },
  { code: 'YELAHANKA', name: 'Yelahanka', subcounty: 'Yelahanka Zone', center: { lat: 13.1007, lng: 77.5963 } },
  { code: 'BASAVANAGUDI', name: 'Basavanagudi', subcounty: 'South Zone', center: { lat: 12.9432, lng: 77.5730 } },
  { code: 'MARATHAHALLI', name: 'Marathahalli', subcounty: 'Mahadevapura Zone', center: { lat: 12.9591, lng: 77.7009 } },
  { code: 'ELECTRONIC_CITY', name: 'Electronic City', subcounty: 'Bommanahalli Zone', center: { lat: 12.8450, lng: 77.6600 } },
  { code: 'SHIVAJINAGAR', name: 'Shivajinagar', subcounty: 'East Zone', center: { lat: 12.9850, lng: 77.6050 } },
  { code: 'VIJAYANAGAR', name: 'Vijayanagar', subcounty: 'West Zone', center: { lat: 12.9700, lng: 77.5370 } },
];

// Helper to generate mock comments (Indian names)
const generateMockComments = (projectId: string): ProjectComment[] => [
  {
    id: `${projectId}_c1`,
    author: 'Lakshmi Devi',
    authorType: 'citizen',
    text: 'Finally! We have been facing this problem for months. Hope this will be completed on time.',
    timestamp: '2026-02-08T14:30:00Z',
    affectedAs: 'Resident nearby',
    helpfulCount: 12,
  },
  {
    id: `${projectId}_c2`,
    author: 'BBMP Project Monitoring Cell',
    authorType: 'official',
    text: 'Thank you for your feedback. The contractor is on schedule and we expect minimal disruptions during the work.',
    timestamp: '2026-02-07T09:15:00Z',
    helpfulCount: 8,
  },
  {
    id: `${projectId}_c3`,
    author: 'Suresh Kumar',
    authorType: 'citizen',
    text: 'My business has been affected. Can the authorities ensure this is fast-tracked?',
    timestamp: '2026-02-05T16:45:00Z',
    affectedAs: 'Business owner',
    helpfulCount: 24,
  },
];

const generateProjectDetails = (projectId: string, title: string): ProjectDetails => ({
  status: 'WORKS_ONGOING',
  budget: '₹2.5 Cr',
  financialYear: 'FY 2025-26',
  expectedEndDate: '2026-06-30',
  fullDescription: `This project involves comprehensive infrastructure upgrades to improve service delivery. ${title} is part of BBMP's commitment to enhancing quality of life for all residents of Bengaluru.`,
  timeline: [
    { stage: 'Project identified in ward planning', status: 'DONE', date: '2025-08-15', note: 'Ward committee consultation completed' },
    { stage: 'Technical design & feasibility completed', status: 'DONE', date: '2025-10-10', note: 'DPR approved by Chief Engineer' },
    { stage: 'Budget approved in council', status: 'DONE', date: '2025-11-30' },
    { stage: 'Tender floated & contractor selected', status: 'DONE', date: '2026-01-01', note: 'e-Procurement portal tender' },
    { stage: 'Works ongoing on site', status: 'IN_PROGRESS', date: '2026-02-10', note: 'Phase 1 underway' },
    { stage: 'Testing & commissioning', status: 'PENDING', date: null },
    { stage: 'Project completion & monitoring', status: 'PENDING', date: null },
  ],
  relatedTickets: [
    { id: 'BBMP-2025-001234', summary: 'Frequent disruptions reported by residents' },
    { id: 'BBMP-2025-001567', summary: 'Quality concerns from local businesses' },
  ],
  relatedSurveys: [
    { id: 'survey_001', title: 'Citizen Satisfaction Survey – Ward Infrastructure' },
  ],
  publicUpdates: [
    { date: '2026-02-20', text: 'Contractor has mobilised. Residents advised to follow safety signage.' },
    { date: '2026-03-01', text: 'Phase 1 nearing completion. Temporary traffic diversions expected.' },
  ],
  comments: generateMockComments(projectId),
  engagement: {
    followers: 132,
    followersThisWeek: 12,
    comments: 24,
    linkedComplaints: 7,
    surveyResponses: 318,
  },
});

// ── Bengaluru seed project markers (25–40 realistic entries) ──
// Sourced conceptually from public tender / project patterns
const projectsAsHappenings: Happening[] = [
  // Road Resurfacing
  { id: 'blr_r1', wardCode: 'KORAMANGALA', wardName: 'Koramangala', title: 'Resurfacing of 80 Feet Road – Koramangala', summary: 'Hot-mix resurfacing of 80 Feet Road from Sony Signal to St. John\'s Hospital junction. Expect lane closures.', source: 'BBMP Roads Infrastructure – Public Works (e-Procurement Ref: BBMP/RD/2025-26/PKG-12)', date: '2026-01-15', type: 'INFRASTRUCTURE', lat: 12.9352, lng: 77.6220, isActive: true, projectDetails: generateProjectDetails('blr_r1', 'Resurfacing of 80 Feet Road') },
  { id: 'blr_r2', wardCode: 'JAYANAGAR', wardName: 'Jayanagar', title: 'Road Rehabilitation – 11th Main, Jayanagar 4th Block', summary: 'Milling and relaying of bituminous road with footpath reconstruction.', source: 'BBMP Roads Division – South Zone (Tender: BBMP/SZ/RD/2025/018)', date: '2026-02-01', type: 'INFRASTRUCTURE', lat: 12.9270, lng: 77.5830, isActive: true, projectDetails: generateProjectDetails('blr_r2', 'Road Rehabilitation – 11th Main') },
  { id: 'blr_r3', wardCode: 'MARATHAHALLI', wardName: 'Marathahalli', title: 'Marathahalli–Silk Board Flyover Approach Road Repair', summary: 'Repair of approach road surface and crash barriers on Marathahalli-Silk Board corridor.', source: 'BBMP Major Roads – e-Procurement Portal', date: '2025-12-20', type: 'INFRASTRUCTURE', lat: 12.9570, lng: 77.7010, isActive: true, projectDetails: { ...generateProjectDetails('blr_r3', 'Flyover Approach Road Repair'), status: 'WORKS_ONGOING' } },

  // Stormwater Drain
  { id: 'blr_sd1', wardCode: 'HSR_LAYOUT', wardName: 'HSR Layout', title: 'Stormwater Drain Desilting – HSR Layout Sector 7', summary: 'Desilting and repair of primary SWD running through HSR Layout Sector 7 to prevent monsoon flooding.', source: 'BBMP SWD Division (Ref: BBMP/SWD/BN/2025/009)', date: '2026-01-20', type: 'INFRASTRUCTURE', lat: 12.9100, lng: 77.6380, isActive: true, projectDetails: generateProjectDetails('blr_sd1', 'SWD Desilting – HSR Layout') },
  { id: 'blr_sd2', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'Raja Kaluve Rehabilitation – Indiranagar', summary: 'Widening and retaining wall construction for the raja kaluve (major drain) along CMH Road.', source: 'BBMP SWD – East Zone (Public Works Notice)', date: '2026-02-10', type: 'INFRASTRUCTURE', lat: 12.9780, lng: 77.6400, isActive: true, projectDetails: generateProjectDetails('blr_sd2', 'Raja Kaluve Rehabilitation') },
  { id: 'blr_sd3', wardCode: 'BTM_LAYOUT', wardName: 'BTM Layout', title: 'SWD Widening – Madiwala to Silk Board', summary: 'Major drain widening from Madiwala lake outlet to Silk Board junction.', source: 'BBMP SWD (Tender: BBMP/SWD/SZ/2025/015)', date: '2025-11-15', type: 'INFRASTRUCTURE', lat: 12.9180, lng: 77.6120, isActive: true, projectDetails: { ...generateProjectDetails('blr_sd3', 'SWD Widening – Madiwala'), status: 'WORKS_ONGOING' } },

  // Junction Improvements
  { id: 'blr_ji1', wardCode: 'SHIVAJINAGAR', wardName: 'Shivajinagar', title: 'Signal Junction Improvement – Mekhri Circle', summary: 'Geometric improvement and signal upgrade at Mekhri Circle to reduce congestion.', source: 'BBMP Traffic Engineering Cell / Bengaluru Traffic Police', date: '2026-02-15', type: 'INFRASTRUCTURE', lat: 13.0050, lng: 77.5850, isActive: true, projectDetails: generateProjectDetails('blr_ji1', 'Mekhri Circle Junction Improvement') },
  { id: 'blr_ji2', wardCode: 'BASAVANAGUDI', wardName: 'Basavanagudi', title: 'Lalbagh West Gate Junction Redesign', summary: 'Road geometry redesign and pedestrian crossing upgrade at Lalbagh West Gate.', source: 'BBMP Traffic Engineering / DULT', date: '2026-01-25', type: 'INFRASTRUCTURE', lat: 12.9490, lng: 77.5720, isActive: true, projectDetails: { ...generateProjectDetails('blr_ji2', 'Lalbagh West Gate Junction'), status: 'PLANNED' } },

  // Lake Rejuvenation
  { id: 'blr_lk1', wardCode: 'BELLANDUR', wardName: 'Bellandur', title: 'Bellandur Lake Rejuvenation – Phase 2', summary: 'Deweeding, desilting, and sewage diversion for Bellandur Lake. Part of BBMP/BDA lake restoration program.', source: 'BBMP Lakes Division / BDA (Ref: BDA/LAKE/BLR/2025/003)', date: '2025-10-01', type: 'INFRASTRUCTURE', lat: 12.9300, lng: 77.6700, isActive: true, projectDetails: { ...generateProjectDetails('blr_lk1', 'Bellandur Lake Rejuvenation'), budget: '₹85 Cr', status: 'WORKS_ONGOING' } },
  { id: 'blr_lk2', wardCode: 'HEBBAL', wardName: 'Hebbal', title: 'Hebbal Lake Boundary Wall & Walking Track', summary: 'Construction of boundary wall and walking track around Hebbal Lake.', source: 'BBMP Lakes / Forest Dept (Public Notice)', date: '2026-01-10', type: 'INFRASTRUCTURE', lat: 13.0370, lng: 77.5950, isActive: true, projectDetails: { ...generateProjectDetails('blr_lk2', 'Hebbal Lake Walking Track'), status: 'FUNDED' } },
  { id: 'blr_lk3', wardCode: 'VARTHUR', wardName: 'Varthur', title: 'Varthur Lake STP Commissioning', summary: 'Commissioning of 90 MLD Sewage Treatment Plant to prevent untreated sewage inflow into Varthur Lake.', source: 'BWSSB / BBMP Lakes (Project Ref: BWSSB/STP/2024/VR-01)', date: '2025-09-15', type: 'SERVICE', lat: 12.9420, lng: 77.7380, isActive: true, projectDetails: { ...generateProjectDetails('blr_lk3', 'Varthur Lake STP'), status: 'COMPLETED' } },

  // Streetlight Replacement
  { id: 'blr_sl1', wardCode: 'MALLESHWARAM', wardName: 'Malleshwaram', title: 'LED Streetlight Replacement – Sampige Road', summary: 'Replacement of 240 sodium vapour lights with LED on Sampige Road and Margosa Road.', source: 'BBMP Electrical Division – North Zone (Tender: BBMP/EL/NZ/2025/007)', date: '2026-01-05', type: 'INFRASTRUCTURE', lat: 13.0030, lng: 77.5690, isActive: true, projectDetails: { ...generateProjectDetails('blr_sl1', 'LED Streetlight – Sampige Road'), status: 'COMPLETED' } },
  { id: 'blr_sl2', wardCode: 'ELECTRONIC_CITY', wardName: 'Electronic City', title: 'Smart Streetlight Installation – Electronic City Phase 1', summary: 'Installation of IoT-enabled smart streetlights with dimming and fault-detection on Hosur Road stretch.', source: 'BBMP Smart City / BESCOM (Ref: BSCC/SL/EC/2025/002)', date: '2026-02-20', type: 'INFRASTRUCTURE', lat: 12.8460, lng: 77.6610, isActive: true, projectDetails: generateProjectDetails('blr_sl2', 'Smart Streetlights – E-City') },

  // SWM Processing Facility
  { id: 'blr_swm1', wardCode: 'DASARAHALLI', wardName: 'Dasarahalli', title: 'Dry Waste Collection Centre Upgrade – Peenya', summary: 'Upgradation of DWCC at Peenya with mechanised sorting and increased capacity.', source: 'BBMP SWM Division (Public Tender: BBMP/SWM/DZ/2025/011)', date: '2026-01-20', type: 'SERVICE', lat: 13.0310, lng: 77.5120, isActive: true, projectDetails: generateProjectDetails('blr_swm1', 'DWCC Upgrade – Peenya') },
  { id: 'blr_swm2', wardCode: 'BOMMANAHALLI', wardName: 'Bommanahalli', title: 'Micro-Composting Centre – Hongasandra', summary: 'New 5-TPD micro-composting unit for wet waste processing serving 4 wards.', source: 'BBMP SWM / IEC Cell (Ref: BBMP/SWM/BN/2025/004)', date: '2025-12-01', type: 'SERVICE', lat: 12.8980, lng: 77.6300, isActive: true, projectDetails: { ...generateProjectDetails('blr_swm2', 'Composting Centre – Hongasandra'), status: 'COMPLETED' } },

  // Footpath Improvements
  { id: 'blr_fp1', wardCode: 'RAJAJINAGAR', wardName: 'Rajajinagar', title: 'Footpath Reconstruction – Dr. Rajkumar Road', summary: 'Reconstruction of footpaths with tactile paving and ramp access on Dr. Rajkumar Road.', source: 'BBMP Public Works – West Zone (Tender: BBMP/WZ/FP/2025/006)', date: '2026-02-05', type: 'INFRASTRUCTURE', lat: 12.9910, lng: 77.5540, isActive: true, projectDetails: generateProjectDetails('blr_fp1', 'Footpath – Dr. Rajkumar Road') },
  { id: 'blr_fp2', wardCode: 'ULSOOR', wardName: 'Ulsoor', title: 'Pedestrian Pathway – MG Road to Ulsoor Lake', summary: 'Widened pedestrian pathway with heritage-style bollards connecting MG Road to Ulsoor Lake.', source: 'BBMP / DULT Walkability Project', date: '2026-03-01', type: 'INFRASTRUCTURE', lat: 12.9790, lng: 77.6180, isActive: true, projectDetails: { ...generateProjectDetails('blr_fp2', 'Pedestrian Pathway – MG Road'), status: 'PLANNED' } },

  // Metro-related Road Restoration
  { id: 'blr_mr1', wardCode: 'WHITEFIELD', wardName: 'Whitefield', title: 'Road Restoration Post Metro Phase 2 – Whitefield', summary: 'Restoration of roads damaged during Namma Metro Phase 2 construction at Whitefield.', source: 'BMRCL / BBMP Coordination Cell (Ref: BMRCL/REST/WF/2025)', date: '2026-01-10', type: 'INFRASTRUCTURE', lat: 12.9700, lng: 77.7490, isActive: true, projectDetails: generateProjectDetails('blr_mr1', 'Metro Road Restoration – Whitefield') },
  { id: 'blr_mr2', wardCode: 'VIJAYANAGAR', wardName: 'Vijayanagar', title: 'Utility Shifting & Road Repair – Mysore Road Metro', summary: 'Post-metro utility shifting and road repair on Mysore Road corridor near RV College.', source: 'BMRCL / BBMP / BESCOM / BWSSB joint notice', date: '2025-11-01', type: 'INFRASTRUCTURE', lat: 12.9580, lng: 77.5350, isActive: true, projectDetails: { ...generateProjectDetails('blr_mr2', 'Metro Utility Shifting – Mysore Road'), status: 'WORKS_ONGOING' } },

  // Water Supply / BWSSB
  { id: 'blr_ws1', wardCode: 'JP_NAGAR', wardName: 'JP Nagar', title: 'Cauvery Water Pipeline Extension – JP Nagar 6th Phase', summary: 'Extension of Cauvery Stage V pipeline to serve JP Nagar 6th Phase and Sarakki.', source: 'BWSSB (Tender Ref: BWSSB/CV5/JPN/2025/002)', date: '2026-02-01', type: 'SERVICE', lat: 12.9050, lng: 77.5850, isActive: true, projectDetails: generateProjectDetails('blr_ws1', 'Cauvery Pipeline – JP Nagar') },
  { id: 'blr_ws2', wardCode: 'THANISANDRA', wardName: 'Thanisandra', title: 'Borewell Rejuvenation & Water ATM – Thanisandra', summary: 'Rejuvenation of 15 borewells and installation of 5 water ATMs in Thanisandra ward.', source: 'BWSSB / BBMP (Public Notice)', date: '2026-01-25', type: 'SERVICE', lat: 13.0580, lng: 77.6310, isActive: true, projectDetails: { ...generateProjectDetails('blr_ws2', 'Borewell Rejuvenation – Thanisandra'), status: 'PROCUREMENT' } },

  // Traffic / CCTV
  { id: 'blr_tc1', wardCode: 'SADASHIVANAGAR', wardName: 'Sadashivanagar', title: 'ANPR Camera Installation – Palace Road', summary: 'Installation of Automatic Number Plate Recognition cameras at 8 junctions on Palace Road.', source: 'Bengaluru Traffic Police / Smart City (Ref: BTP/ANPR/2025/006)', date: '2026-02-20', type: 'NOTICE', lat: 13.0080, lng: 77.5810, isActive: true, projectDetails: generateProjectDetails('blr_tc1', 'ANPR Cameras – Palace Road') },

  // Community Events
  { id: 'blr_ev1', wardCode: 'BASAVANAGUDI', wardName: 'Basavanagudi', title: 'Ward Sabha – South Zone', summary: 'Quarterly Ward Sabha for citizens of Basavanagudi, Jayanagar, and Hanumanthanagar wards.', source: 'BBMP Ward Committee / Corporator Office', date: '2026-03-10', type: 'EVENT', lat: 12.9440, lng: 77.5740, isActive: true },
  { id: 'blr_ev2', wardCode: 'KORAMANGALA', wardName: 'Koramangala', title: 'Swachh Bengaluru Clean-up Drive', summary: 'Community cleanup drive at Koramangala 8th Block. Bring gloves; BBMP will provide waste bags.', source: 'BBMP SWM / RWA Koramangala', date: '2026-03-15', type: 'COMMUNITY', lat: 12.9340, lng: 77.6260, isActive: true },

  // Service Notices
  { id: 'blr_sn1', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'Scheduled Water Supply Disruption – HAL Areas', summary: 'BWSSB scheduled maintenance on Cauvery pipeline. Indiranagar, HAL areas affected Wed 6 AM–6 PM.', source: 'BWSSB Public Notice', date: '2026-03-05', type: 'NOTICE', lat: 12.9770, lng: 77.6420, isActive: true },
  { id: 'blr_sn2', wardCode: 'MALLESHWARAM', wardName: 'Malleshwaram', title: 'BESCOM Transformer Maintenance – Malleshwaram 18th Cross', summary: 'BESCOM scheduled transformer maintenance. Power outage expected 10 AM–4 PM Thursday.', source: 'BESCOM / BBMP Coordination', date: '2026-03-08', type: 'SERVICE', lat: 13.0020, lng: 77.5710, isActive: true },

  // Emergency
  { id: 'blr_em1', wardCode: 'BELLANDUR', wardName: 'Bellandur', title: 'Waterlogging Alert – ORR Near Bellandur', summary: 'Heavy rain advisory: Expect waterlogging on Outer Ring Road near Bellandur Gate. Avoid area if possible.', source: 'BBMP Disaster Management Cell', date: '2026-03-01', type: 'EMERGENCY', lat: 12.9280, lng: 77.6720, isActive: true },

  // Additional projects to reach 30+
  { id: 'blr_r4', wardCode: 'YELAHANKA', wardName: 'Yelahanka', title: 'Pothole Filling – Yelahanka New Town Main Road', summary: 'Emergency pothole filling and patch repair on Yelahanka-Doddaballapur Road.', source: 'BBMP Roads – Yelahanka Zone (Work Order)', date: '2026-02-25', type: 'INFRASTRUCTURE', lat: 13.1010, lng: 77.5950, isActive: true, projectDetails: { ...generateProjectDetails('blr_r4', 'Pothole Filling – Yelahanka'), status: 'WORKS_ONGOING' } },
  { id: 'blr_fp3', wardCode: 'BANASHANKARI', wardName: 'Banashankari', title: 'Footpath Widening – Banashankari 2nd Stage', summary: 'Footpath widening and accessible ramp construction on Banashankari main road.', source: 'BBMP Public Works – South Zone', date: '2026-02-10', type: 'INFRASTRUCTURE', lat: 12.9260, lng: 77.5480, isActive: true, projectDetails: generateProjectDetails('blr_fp3', 'Footpath Widening – Banashankari') },
  { id: 'blr_sl3', wardCode: 'RT_NAGAR', wardName: 'RT Nagar', title: 'Solar Streetlights – HBR Layout', summary: 'Installation of 180 solar LED streetlights in HBR Layout and surrounding areas.', source: 'BBMP Electrical / KREDL (Tender Ref: BBMP/EL/NZ/2025/014)', date: '2026-01-15', type: 'INFRASTRUCTURE', lat: 13.0210, lng: 77.5960, isActive: true, projectDetails: { ...generateProjectDetails('blr_sl3', 'Solar Streetlights – HBR Layout'), status: 'WORKS_ONGOING' } },
  { id: 'blr_sd4', wardCode: 'HAGADUR', wardName: 'Hagadur', title: 'Stormwater Drain Construction – Hoodi', summary: 'Construction of new secondary SWD from Hoodi Circle to Whitefield railway underpass.', source: 'BBMP SWD – Mahadevapura Zone', date: '2026-02-15', type: 'INFRASTRUCTURE', lat: 12.9810, lng: 77.7190, isActive: true, projectDetails: generateProjectDetails('blr_sd4', 'SWD Construction – Hoodi') },
];

// Combine all
const allHappenings: Happening[] = [...projectsAsHappenings];

// Distance helper
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find ward by coordinates
export function findWardByCoords(lat: number, lng: number): { code: string; name: string } | null {
  let nearestWard = null;
  let minDistance = Infinity;

  for (const ward of WARDS) {
    const distance = getDistance(lat, lng, ward.center.lat, ward.center.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestWard = { code: ward.code, name: ward.name };
    }
  }

  return nearestWard;
}

// Mock reverse geocoding for nearby landmarks (Bengaluru)
export async function getNearbyLandmarks(lat: number, lng: number): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const landmarks = [
    'Near Vidhana Soudha',
    'Close to MG Road Metro Station',
    'Near Cubbon Park',
    'Close to Lalbagh Botanical Garden',
    'Near Forum Mall, Koramangala',
    'Close to Mantri Mall',
    'Near ISRO Layout',
    'Close to Silk Board Junction',
    'Near Majestic Bus Stand',
    'Close to Bangalore Palace',
  ];

  const shuffled = landmarks.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.random() > 0.5 ? 2 : 1);
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const happeningsApi = {
  async getHappenings(filters?: {
    wardCode?: string;
    lat?: number;
    lng?: number;
    radiusKm?: number;
    type?: string;
  }): Promise<Happening[]> {
    await delay(400);

    let result = [...allHappenings].filter(h => h.isActive);

    if (filters?.lat && filters?.lng) {
      const radius = filters.radiusKm || 10;
      result = result.filter(h => {
        const distance = getDistance(filters.lat!, filters.lng!, h.lat, h.lng);
        return distance <= radius;
      });
      result.sort((a, b) => {
        const distA = getDistance(filters.lat!, filters.lng!, a.lat, a.lng);
        const distB = getDistance(filters.lat!, filters.lng!, b.lat, b.lng);
        return distA - distB;
      });
    } else if (filters?.wardCode) {
      result = result.filter(h => h.wardCode === filters.wardCode);
    }

    if (filters?.type) {
      result = result.filter(h => h.type === filters.type);
    }

    return result;
  },

  async getHappening(id: string): Promise<Happening | null> {
    await delay(200);
    return allHappenings.find(h => h.id === id) || null;
  },

  async getAllHappeningsForMap(): Promise<Happening[]> {
    await delay(300);
    return allHappenings.filter(h => h.isActive);
  },
};
