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
  { code: 'KR_PURAM', name: 'KR Puram', subcounty: 'Mahadevapura Zone', center: { lat: 13.0070, lng: 77.6950 } },
  { code: 'BELLANDUR', name: 'Bellandur', subcounty: 'Mahadevapura Zone', center: { lat: 12.9355, lng: 77.6780 } },
  { code: 'EJIPURA', name: 'Ejipura', subcounty: 'South-East Zone', center: { lat: 12.9440, lng: 77.6260 } },
  { code: 'AGARA', name: 'Agara', subcounty: 'Bommanahalli Zone', center: { lat: 12.9130, lng: 77.6390 } },
  { code: 'ULSOOR', name: 'Ulsoor', subcounty: 'East Zone', center: { lat: 12.9823, lng: 77.6197 } },
  { code: 'CBD', name: 'CBD (MG Road)', subcounty: 'East Zone', center: { lat: 12.9756, lng: 77.6050 } },
  { code: 'COX_TOWN', name: 'Cox Town', subcounty: 'East Zone', center: { lat: 13.0050, lng: 77.6200 } },
  { code: 'LINGARAJAPURAM', name: 'Lingarajapuram', subcounty: 'East Zone', center: { lat: 13.0090, lng: 77.6400 } },
  { code: 'SILK_BOARD', name: 'Silk Board', subcounty: 'South Zone', center: { lat: 12.9177, lng: 77.6230 } },
  { code: 'CV_RAMAN_NAGAR', name: 'CV Raman Nagar', subcounty: 'Mahadevapura Zone', center: { lat: 12.9850, lng: 77.6630 } },
  { code: 'LAVELLE_ROAD', name: 'Lavelle Road', subcounty: 'East Zone', center: { lat: 12.9730, lng: 77.5990 } },
  { code: 'HENNUR', name: 'Hennur', subcounty: 'East Zone', center: { lat: 13.0350, lng: 77.6400 } },
  { code: 'KR_MARKET', name: 'KR Market', subcounty: 'South Zone', center: { lat: 12.9630, lng: 77.5770 } },
  { code: 'BANASHANKARI', name: 'Banashankari', subcounty: 'South Zone', center: { lat: 12.9260, lng: 77.5480 } },
  { code: 'JAYADEVA', name: 'Jayadeva', subcounty: 'South Zone', center: { lat: 12.9165, lng: 77.6110 } },
  { code: 'MEKHRI_CIRCLE', name: 'Mekhri Circle', subcounty: 'East Zone', center: { lat: 13.0100, lng: 77.5950 } },
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
  { id: 'blr_ev1', wardCode: 'BASAVANAGUDI', wardName: 'Basavanagudi', title: 'Ward Sabha – South Zone', summary: 'Quarterly Ward Sabha for citizens of Basavanagudi, Jayanagar, and Hanumanthanagar wards.', source: 'BBMP Ward Committee / Corporator Office', date: '2026-03-10', type: 'EVENT', lat: 12.9440, lng: 77.5740, isActive: true, location: 'BBMP Head Office, Hudson Circle', agenda: [
    { time: '10:00 AM', topic: 'Opening & Welcome Address', presenter: 'Ward Corporator' },
    { time: '10:15 AM', topic: 'Review of Previous Ward Sabha Minutes', presenter: 'Ward Secretary' },
    { time: '10:30 AM', topic: 'SWD & Road Works Progress Update', presenter: 'BBMP Executive Engineer' },
    { time: '11:00 AM', topic: 'Citizen Grievances & Open Floor Discussion' },
    { time: '11:30 AM', topic: 'New Proposals – Footpath & Streetlight Improvements', presenter: 'BBMP Planning Cell' },
    { time: '12:00 PM', topic: 'Q&A and Closing Remarks', presenter: 'Ward Corporator' },
  ] },
  { id: 'blr_ev2', wardCode: 'KORAMANGALA', wardName: 'Koramangala', title: 'Swachh Bengaluru Clean-up Drive', summary: 'Community cleanup drive at Koramangala 8th Block. Bring gloves; BBMP will provide waste bags.', source: 'BBMP SWM / RWA Koramangala', date: '2026-03-15', type: 'COMMUNITY', lat: 12.9340, lng: 77.6260, isActive: true, location: 'Koramangala 8th Block Community Park', agenda: [
    { time: '7:00 AM', topic: 'Registration & Kit Distribution' },
    { time: '7:30 AM', topic: 'Briefing on Segregation & Safety', presenter: 'BBMP SWM Coordinator' },
    { time: '8:00 AM', topic: 'Clean-up Drive – Zone A (Lanes & Drains)' },
    { time: '9:30 AM', topic: 'Clean-up Drive – Zone B (Park & Lake Perimeter)' },
    { time: '11:00 AM', topic: 'Refreshments & Feedback Session' },
    { time: '11:30 AM', topic: 'Felicitation of Volunteers & Closing', presenter: 'RWA President' },
  ] },

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

  // ── BLR-001 to BLR-070 (CSV-sourced projects) ──
  { id: 'BLR-001', wardCode: 'MARATHAHALLI', wardName: 'Marathahalli', title: 'Adaptive Traffic Signal Installation – ORR Marathahalli Junction', summary: 'Automated traffic signals package at Marathahalli ORR Junction.', source: 'Bengaluru Traffic Police / KRDCL – Public tender', date: '2024-08-01', type: 'INFRASTRUCTURE', lat: 12.9591, lng: 77.6974, isActive: true, projectDetails: { ...generateProjectDetails('BLR-001', 'Adaptive Traffic Signal – Marathahalli'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-002', wardCode: 'CBD', wardName: 'CBD (MG Road)', title: 'Thermoplastic Road Marking Refresh – CBD Core Streets (Phase 1)', summary: 'Road safety & marking works at MG Road, Brigade Road, Residency Road.', source: 'KRDCL / Bengaluru Traffic Police – Public tender', date: '2024-09-01', type: 'INFRASTRUCTURE', lat: 12.9756, lng: 77.6050, isActive: true, projectDetails: { ...generateProjectDetails('BLR-002', 'Road Marking – CBD'), status: 'PLANNED' } },
  { id: 'BLR-003', wardCode: 'SILK_BOARD', wardName: 'Silk Board', title: 'Junction Geometry Improvement – Silk Board (Pilot)', summary: 'Junction redesign + safety upgrades at Silk Board Junction.', source: 'DULT / Bengaluru Traffic Police – Public works program', date: '2024-10-01', type: 'INFRASTRUCTURE', lat: 12.9177, lng: 77.6230, isActive: true, projectDetails: { ...generateProjectDetails('BLR-003', 'Junction Improvement – Silk Board'), status: 'PLANNED' } },
  { id: 'BLR-004', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'Pedestrian Signal Countdown Timers – Indiranagar 100ft Road', summary: 'Signal modernization with countdown timers on Indiranagar 100ft Road.', source: 'Bengaluru Traffic Police – Public works program', date: '2024-11-01', type: 'INFRASTRUCTURE', lat: 12.9719, lng: 77.6412, isActive: true, projectDetails: { ...generateProjectDetails('BLR-004', 'Signal Countdown – Indiranagar'), status: 'PLANNED' } },
  { id: 'BLR-005', wardCode: 'KORAMANGALA', wardName: 'Koramangala', title: 'Road Resurfacing Package – Koramangala 5th Block Internal Roads', summary: 'Road/drain/culvert improvements in Koramangala 5th Block.', source: 'BBMP Roads Dept – Public tender', date: '2024-07-01', type: 'INFRASTRUCTURE', lat: 12.9352, lng: 77.6245, isActive: true, projectDetails: { ...generateProjectDetails('BLR-005', 'Resurfacing – Koramangala 5th Block'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-006', wardCode: 'ULSOOR', wardName: 'Ulsoor', title: 'White-topping Works – Ulsoor to Trinity Corridor', summary: 'White-topping / resurfacing package on Ulsoor to Trinity corridor.', source: 'BBMP Roads Dept – Public tender', date: '2024-12-01', type: 'INFRASTRUCTURE', lat: 12.9815, lng: 77.6200, isActive: true, projectDetails: { ...generateProjectDetails('BLR-006', 'White-topping – Ulsoor-Trinity'), status: 'PLANNED' } },
  { id: 'BLR-007', wardCode: 'HSR_LAYOUT', wardName: 'HSR Layout', title: 'Pothole Patch & Micro-surfacing – HSR Sector 1 (Phase 1)', summary: 'Monsoon pothole mitigation package in HSR Layout Sector 1.', source: 'BBMP Roads Dept – Public works program', date: '2024-06-01', type: 'INFRASTRUCTURE', lat: 12.9121, lng: 77.6446, isActive: true, projectDetails: { ...generateProjectDetails('BLR-007', 'Pothole Mitigation – HSR'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-008', wardCode: 'CBD', wardName: 'CBD (MG Road)', title: 'Footpath Reconstruction – Church Street to Cubbon Road Loop', summary: 'Footpath upgrades in CBD from Church Street to Cubbon Road.', source: 'BBMP Roads Dept / DULT – Public works program', date: '2025-01-01', type: 'INFRASTRUCTURE', lat: 12.9750, lng: 77.6058, isActive: true, projectDetails: { ...generateProjectDetails('BLR-008', 'Footpath – Church St to Cubbon Rd'), status: 'PLANNED' } },
  { id: 'BLR-009', wardCode: 'JAYANAGAR', wardName: 'Jayanagar', title: 'Universal Access Ramps & Tactile Pavers – Jayanagar 4th Block', summary: 'Universal accessibility upgrades in Jayanagar 4th Block.', source: 'BBMP / DULT – Public works program', date: '2024-08-01', type: 'INFRASTRUCTURE', lat: 12.9250, lng: 77.5938, isActive: true, projectDetails: { ...generateProjectDetails('BLR-009', 'Accessibility – Jayanagar 4th Block'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-010', wardCode: 'KR_PURAM', wardName: 'KR Puram', title: 'Bus Bay Improvement – KR Puram TTMC Approach', summary: 'Bus bay + pedestrian integration at KR Puram TTMC.', source: 'BMTC / DULT – Public works program', date: '2024-12-01', type: 'INFRASTRUCTURE', lat: 13.0070, lng: 77.6950, isActive: true, projectDetails: { ...generateProjectDetails('BLR-010', 'Bus Bay – KR Puram'), status: 'PLANNED' } },
  { id: 'BLR-011', wardCode: 'EJIPURA', wardName: 'Ejipura', title: 'Stormwater Drain Desilting – Koramangala Valley (Pre-monsoon)', summary: 'Desilting + silt disposal in Ejipura-Koramangala Valley.', source: 'BBMP SWD Dept – Public works program', date: '2024-05-01', type: 'INFRASTRUCTURE', lat: 12.9420, lng: 77.6260, isActive: true, projectDetails: { ...generateProjectDetails('BLR-011', 'SWD Desilting – Koramangala Valley'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-012', wardCode: 'AGARA', wardName: 'Agara', title: 'Stormwater Drain Wall Strengthening – HSR to Agara Outfall', summary: 'Drain strengthening / retaining wall at Agara Lake Outfall.', source: 'BBMP SWD Dept – Public tender', date: '2024-11-01', type: 'INFRASTRUCTURE', lat: 12.9135, lng: 77.6420, isActive: true, projectDetails: { ...generateProjectDetails('BLR-012', 'SWD Wall – HSR-Agara'), status: 'PLANNED' } },
  { id: 'BLR-013', wardCode: 'BELLANDUR', wardName: 'Bellandur', title: 'Culvert Reconstruction – Bellandur ORR Service Lane', summary: 'Culvert/drain improvements on Bellandur ORR Service Road.', source: 'BBMP SWD Dept – Public tender', date: '2025-02-01', type: 'INFRASTRUCTURE', lat: 12.9355, lng: 77.6780, isActive: true, projectDetails: { ...generateProjectDetails('BLR-013', 'Culvert – Bellandur ORR'), status: 'PLANNED' } },
  { id: 'BLR-014', wardCode: 'BELLANDUR', wardName: 'Bellandur', title: 'Lakeside Drain Interception – Bellandur Catchment (Pilot)', summary: 'Lake protection + inflow management at Bellandur Lake.', source: 'BBMP / Minor Irrigation Dept – Public works program', date: '2025-01-01', type: 'INFRASTRUCTURE', lat: 12.9395, lng: 77.6784, isActive: true, projectDetails: { ...generateProjectDetails('BLR-014', 'Drain Interception – Bellandur'), status: 'PLANNED' } },
  { id: 'BLR-015', wardCode: 'HSR_LAYOUT', wardName: 'HSR Layout', title: 'Lake Rejuvenation – Kaikondrahalli Lake (Phase 2)', summary: 'Lake rejuvenation phase works at Kaikondrahalli Lake.', source: 'BBMP / Minor Irrigation Dept – Public works program', date: '2024-07-01', type: 'INFRASTRUCTURE', lat: 12.9085, lng: 77.6760, isActive: true, projectDetails: { ...generateProjectDetails('BLR-015', 'Lake Rejuvenation – Kaikondrahalli'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-016', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'Solid Waste Segregation Kiosk – Indiranagar Market', summary: 'Dry-wet segregation micro-infra at Indiranagar Market.', source: 'BBMP SWM – Public works program', date: '2025-01-01', type: 'SERVICE', lat: 12.9710, lng: 77.6410, isActive: true, projectDetails: { ...generateProjectDetails('BLR-016', 'Segregation Kiosk – Indiranagar'), status: 'PLANNED' } },
  { id: 'BLR-017', wardCode: 'HSR_LAYOUT', wardName: 'HSR Layout', title: 'Dry Waste Collection Center Upgrade – HSR Layout', summary: 'DWCC upgrade in HSR Layout.', source: 'BBMP SWM – Public works program', date: '2024-09-01', type: 'SERVICE', lat: 12.9116, lng: 77.6413, isActive: true, projectDetails: { ...generateProjectDetails('BLR-017', 'DWCC Upgrade – HSR'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-018', wardCode: 'SHIVAJINAGAR', wardName: 'Shivajinagar', title: 'Compactor Route Optimization – Shivajinagar (Pilot)', summary: 'Ward-level collection efficiency pilot in Shivajinagar.', source: 'BBMP SWM – Public works program', date: '2024-12-01', type: 'SERVICE', lat: 12.9860, lng: 77.6040, isActive: true, projectDetails: { ...generateProjectDetails('BLR-018', 'Compactor Optimization – Shivajinagar'), status: 'PLANNED' } },
  { id: 'BLR-019', wardCode: 'CBD', wardName: 'CBD (MG Road)', title: 'Mechanised Road Sweeping – MG Road / Brigade Road Night Shift', summary: 'Mechanised sweeping contract for MG Road / Brigade Road.', source: 'BBMP SWM – Public works program', date: '2024-06-01', type: 'SERVICE', lat: 12.9756, lng: 77.6050, isActive: true, projectDetails: { ...generateProjectDetails('BLR-019', 'Mechanised Sweeping – CBD'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-020', wardCode: 'KORAMANGALA', wardName: 'Koramangala', title: 'Bulk Generator Compliance Drive – Koramangala', summary: 'Bulk waste generator enforcement in Koramangala.', source: 'BBMP SWM – Program notice', date: '2024-10-01', type: 'NOTICE', lat: 12.9352, lng: 77.6245, isActive: true },
  { id: 'BLR-021', wardCode: 'LINGARAJAPURAM', wardName: 'Lingarajapuram', title: 'Water Pipeline Replacement – Lingarajapuram IOC Flyover', summary: 'CI to DI pipeline replacement at Lingarajapuram.', source: 'BWSSB – Public tender', date: '2024-09-01', type: 'SERVICE', lat: 13.0090, lng: 77.6400, isActive: true, projectDetails: { ...generateProjectDetails('BLR-021', 'Pipeline – Lingarajapuram'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-022', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'Feeder Main Leak Reduction – Indiranagar 100ft Road', summary: 'Feeder main rehabilitation on Indiranagar 100ft Road.', source: 'BWSSB – Public works program', date: '2024-08-01', type: 'SERVICE', lat: 12.9719, lng: 77.6412, isActive: true, projectDetails: { ...generateProjectDetails('BLR-022', 'Feeder Main – Indiranagar'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-023', wardCode: 'JAYANAGAR', wardName: 'Jayanagar', title: 'Valve Chamber Rehabilitation – Jayanagar 3rd Block', summary: 'Valve replacement/chamber works in Jayanagar 3rd Block.', source: 'BWSSB – Public works program', date: '2024-12-01', type: 'SERVICE', lat: 12.9260, lng: 77.5860, isActive: true, projectDetails: { ...generateProjectDetails('BLR-023', 'Valve Chambers – Jayanagar'), status: 'PLANNED' } },
  { id: 'BLR-024', wardCode: 'COX_TOWN', wardName: 'Cox Town', title: 'Cauvery Booster Pump O&M – Cox Town', summary: 'Pump house O&M package for Cox Town service area.', source: 'BWSSB – Public tender', date: '2025-01-01', type: 'SERVICE', lat: 13.0050, lng: 77.6200, isActive: true, projectDetails: { ...generateProjectDetails('BLR-024', 'Booster Pump – Cox Town'), status: 'PLANNED' } },
  { id: 'BLR-025', wardCode: 'HSR_LAYOUT', wardName: 'HSR Layout', title: 'New Service Connection Drive – HSR Layout', summary: 'BWSSB connection regularization camp in HSR Layout.', source: 'BWSSB – Program notice', date: '2024-11-01', type: 'NOTICE', lat: 12.9116, lng: 77.6413, isActive: true },
  { id: 'BLR-026', wardCode: 'KORAMANGALA', wardName: 'Koramangala', title: 'Sewer Line Relining – Koramangala 6th Block (Pilot)', summary: 'Sewer relining / rehabilitation in Koramangala 6th Block.', source: 'BWSSB – Public works program', date: '2024-07-01', type: 'SERVICE', lat: 12.9340, lng: 77.6280, isActive: true, projectDetails: { ...generateProjectDetails('BLR-026', 'Sewer Relining – Koramangala'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-027', wardCode: 'WHITEFIELD', wardName: 'Whitefield', title: 'Manhole Raising & Cover Replacement – Whitefield Main Road', summary: 'Manhole cover replacement on Whitefield Main Road.', source: 'BWSSB – Public works program', date: '2024-12-01', type: 'SERVICE', lat: 12.9698, lng: 77.7499, isActive: true, projectDetails: { ...generateProjectDetails('BLR-027', 'Manhole Covers – Whitefield'), status: 'PLANNED' } },
  { id: 'BLR-028', wardCode: 'EJIPURA', wardName: 'Ejipura', title: 'Sewage Overflow Mitigation – Ejipura Junction', summary: 'Overflow hotspots rectification at Ejipura Junction.', source: 'BWSSB – Program notice', date: '2024-06-01', type: 'SERVICE', lat: 12.9440, lng: 77.6260, isActive: true, projectDetails: { ...generateProjectDetails('BLR-028', 'Sewage Overflow – Ejipura'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-029', wardCode: 'KR_PURAM', wardName: 'KR Puram', title: 'STP Treated Water Reuse Pipeline – KR Puram', summary: 'Treated water diversion pipeline (600mm DI) from KR Puram.', source: 'BWSSB – Public tender', date: '2025-02-01', type: 'SERVICE', lat: 13.0070, lng: 77.6950, isActive: true, projectDetails: { ...generateProjectDetails('BLR-029', 'Treated Water Pipeline – KR Puram'), status: 'PLANNED' } },
  { id: 'BLR-030', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'Public Standpost Rationalization – Old Airport Road', summary: 'Standpost rationalization on Old Airport Road.', source: 'BWSSB – Public works program', date: '2024-12-01', type: 'SERVICE', lat: 12.9580, lng: 77.6460, isActive: true, projectDetails: { ...generateProjectDetails('BLR-030', 'Standpost – Old Airport Rd'), status: 'PLANNED' } },
  { id: 'BLR-031', wardCode: 'JAYANAGAR', wardName: 'Jayanagar', title: 'LED Streetlight Retrofit – Jayanagar Ward Cluster (Phase 1)', summary: 'LED retrofit ward package in Jayanagar.', source: 'BESCOM / BBMP – Public works program', date: '2024-07-01', type: 'INFRASTRUCTURE', lat: 12.9250, lng: 77.5938, isActive: true, projectDetails: { ...generateProjectDetails('BLR-031', 'LED Retrofit – Jayanagar'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-032', wardCode: 'KORAMANGALA', wardName: 'Koramangala', title: 'Dark Spot Lighting – Koramangala 1st Block Parks & Lanes', summary: 'Dark spot illumination in Koramangala 1st Block.', source: 'BESCOM / BBMP – Public works program', date: '2024-11-01', type: 'INFRASTRUCTURE', lat: 12.9290, lng: 77.6270, isActive: true, projectDetails: { ...generateProjectDetails('BLR-032', 'Dark Spot Lighting – Koramangala'), status: 'PLANNED' } },
  { id: 'BLR-033', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'Streetlight Pole Replacement – Indiranagar Inner Roads', summary: 'Pole replacement on Indiranagar inner roads.', source: 'BESCOM – Public works program', date: '2024-08-01', type: 'INFRASTRUCTURE', lat: 12.9719, lng: 77.6412, isActive: true, projectDetails: { ...generateProjectDetails('BLR-033', 'Pole Replacement – Indiranagar'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-034', wardCode: 'SILK_BOARD', wardName: 'Silk Board', title: 'High-mast Light Installation – Silk Board Approaches', summary: 'High-mast lighting at Silk Board junction approaches.', source: 'BESCOM / Traffic Police – Public works program', date: '2025-01-01', type: 'INFRASTRUCTURE', lat: 12.9177, lng: 77.6230, isActive: true, projectDetails: { ...generateProjectDetails('BLR-034', 'High-mast – Silk Board'), status: 'PLANNED' } },
  { id: 'BLR-035', wardCode: 'JAYANAGAR', wardName: 'Jayanagar', title: 'Park Renovation – Jayanagar 4th Block Community Park', summary: 'Park redevelopment in Jayanagar 4th Block.', source: 'BBMP Horticulture – Public works program', date: '2024-06-01', type: 'INFRASTRUCTURE', lat: 12.9255, lng: 77.5920, isActive: true, projectDetails: { ...generateProjectDetails('BLR-035', 'Park Renovation – Jayanagar'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-036', wardCode: 'HSR_LAYOUT', wardName: 'HSR Layout', title: 'Play Equipment & Open Gym – HSR Sector 2 Park', summary: 'Open gym + play equipment in HSR Sector 2 Park.', source: 'BBMP Horticulture – Public works program', date: '2024-12-01', type: 'INFRASTRUCTURE', lat: 12.9150, lng: 77.6520, isActive: true, projectDetails: { ...generateProjectDetails('BLR-036', 'Open Gym – HSR Sector 2'), status: 'PLANNED' } },
  { id: 'BLR-037', wardCode: 'LAVELLE_ROAD', wardName: 'Lavelle Road', title: 'Tree Pruning & Avenue Maintenance – Lavelle Road', summary: 'Avenue tree maintenance on Lavelle Road.', source: 'BBMP Forest Cell – Program notice', date: '2024-09-01', type: 'INFRASTRUCTURE', lat: 12.9730, lng: 77.5990, isActive: true, projectDetails: { ...generateProjectDetails('BLR-037', 'Tree Pruning – Lavelle Road'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-038', wardCode: 'ULSOOR', wardName: 'Ulsoor', title: 'Lake Park Pathway Repairs – Ulsoor Lake Loop', summary: 'Pathway + lighting repairs at Ulsoor Lake.', source: 'BBMP / Minor Irrigation – Public works program', date: '2024-08-01', type: 'INFRASTRUCTURE', lat: 12.9823, lng: 77.6197, isActive: true, projectDetails: { ...generateProjectDetails('BLR-038', 'Pathway Repairs – Ulsoor Lake'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-039', wardCode: 'CBD', wardName: 'CBD (MG Road)', title: 'CCTV Installation – CBD Safety Corridor (Phase 1)', summary: 'CCTV expansion corridor on MG Road – Brigade Road.', source: 'BBMP / Bengaluru City Police – Public works program', date: '2024-12-01', type: 'INFRASTRUCTURE', lat: 12.9756, lng: 77.6050, isActive: true, projectDetails: { ...generateProjectDetails('BLR-039', 'CCTV – CBD Corridor'), status: 'PLANNED' } },
  { id: 'BLR-040', wardCode: 'SHIVAJINAGAR', wardName: 'Shivajinagar', title: 'CCTV – Bus Stops & Underpasses (Pilot)', summary: 'Underpass safety cameras at Shivajinagar - Cantonment.', source: 'Bengaluru City Police / DULT – Public works program', date: '2025-01-01', type: 'INFRASTRUCTURE', lat: 12.9860, lng: 77.6040, isActive: true, projectDetails: { ...generateProjectDetails('BLR-040', 'CCTV – Underpasses'), status: 'PLANNED' } },
  { id: 'BLR-041', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'School Zone Safety – Indiranagar (Raised Crosswalks)', summary: 'School zone calming with raised crosswalks in Indiranagar.', source: 'DULT / BBMP – Public works program', date: '2025-02-01', type: 'INFRASTRUCTURE', lat: 12.9719, lng: 77.6412, isActive: true, projectDetails: { ...generateProjectDetails('BLR-041', 'School Zone – Indiranagar'), status: 'PLANNED' } },
  { id: 'BLR-042', wardCode: 'BELLANDUR', wardName: 'Bellandur', title: 'Median Repair & Guardrail – ORR Bellandur Stretch', summary: 'Median repair + railings on Bellandur ORR.', source: 'BBMP Roads Dept – Public works program', date: '2024-07-01', type: 'INFRASTRUCTURE', lat: 12.9355, lng: 77.6780, isActive: true, projectDetails: { ...generateProjectDetails('BLR-042', 'Median Repair – Bellandur ORR'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-043', wardCode: 'CV_RAMAN_NAGAR', wardName: 'CV Raman Nagar', title: 'Metro Road Restoration – CV Raman Nagar Approaches', summary: 'Post-metro road restoration at CV Raman Nagar.', source: 'BBMP / BMRCL – Public works program', date: '2024-10-01', type: 'INFRASTRUCTURE', lat: 12.9850, lng: 77.6630, isActive: true, projectDetails: { ...generateProjectDetails('BLR-043', 'Metro Restoration – CV Raman Nagar'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-044', wardCode: 'JAYADEVA', wardName: 'Jayadeva', title: 'Metro Road Restoration – Jayadeva Junction Periphery', summary: 'Restoration + resurfacing at Jayadeva Junction.', source: 'BBMP / BMRCL – Public works program', date: '2024-09-01', type: 'INFRASTRUCTURE', lat: 12.9165, lng: 77.6110, isActive: true, projectDetails: { ...generateProjectDetails('BLR-044', 'Metro Restoration – Jayadeva'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-045', wardCode: 'MARATHAHALLI', wardName: 'Marathahalli', title: 'Utility Trench Restoration Audit – ORR (Phase 1)', summary: 'Restoration quality audit on Outer Ring Road.', source: 'BBMP / DULT – Program notice', date: '2025-01-01', type: 'NOTICE', lat: 12.9580, lng: 77.6900, isActive: true },
  { id: 'BLR-046', wardCode: 'CBD', wardName: 'CBD (MG Road)', title: 'Smart Parking Signage & Wayfinding – CBD Pilot', summary: 'Wayfinding + signage pilot in CBD.', source: 'DULT / BBMP – Public works program', date: '2025-02-01', type: 'INFRASTRUCTURE', lat: 12.9750, lng: 77.6050, isActive: true, projectDetails: { ...generateProjectDetails('BLR-046', 'Smart Parking – CBD'), status: 'PLANNED' } },
  { id: 'BLR-047', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'Public Toilet Refurbishment – Indiranagar Metro Vicinity', summary: 'Toilet refurbishment near Indiranagar Metro.', source: 'BBMP – Public works program', date: '2024-08-01', type: 'SERVICE', lat: 12.9780, lng: 77.6390, isActive: true, projectDetails: { ...generateProjectDetails('BLR-047', 'Toilet – Indiranagar Metro'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-048', wardCode: 'SHIVAJINAGAR', wardName: 'Shivajinagar', title: 'Public Toilet Refurbishment – Shivajinagar Bus Stand', summary: 'Bus stand amenities refurbishment at Shivajinagar.', source: 'BBMP – Public works program', date: '2024-12-01', type: 'SERVICE', lat: 12.9860, lng: 77.6040, isActive: true, projectDetails: { ...generateProjectDetails('BLR-048', 'Toilet – Shivajinagar'), status: 'PLANNED' } },
  { id: 'BLR-049', wardCode: 'BELLANDUR', wardName: 'Bellandur', title: 'Mosquito Control Fogging – Bellandur Catchment Wards', summary: 'Vector control seasonal fogging in Bellandur area.', source: 'BBMP Health Dept – Program notice', date: '2024-06-01', type: 'NOTICE', lat: 12.9300, lng: 77.6760, isActive: true },
  { id: 'BLR-050', wardCode: 'JAYANAGAR', wardName: 'Jayanagar', title: 'Dengue Source Reduction – Jayanagar Ward Cluster', summary: 'Ward inspections and awareness for dengue prevention.', source: 'BBMP Health Dept – Program notice', date: '2024-11-01', type: 'NOTICE', lat: 12.9250, lng: 77.5938, isActive: true },
  { id: 'BLR-051', wardCode: 'KR_MARKET', wardName: 'KR Market', title: 'Market Waste Upgrade – KR Market Surroundings (Phase 1)', summary: 'Market waste handling upgrade at KR Market.', source: 'BBMP SWM – Public works program', date: '2024-07-01', type: 'SERVICE', lat: 12.9630, lng: 77.5770, isActive: true, projectDetails: { ...generateProjectDetails('BLR-051', 'Market Waste – KR Market'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-052', wardCode: 'YELAHANKA', wardName: 'Yelahanka', title: 'Ward-level Composting Unit – Yelahanka Pilot', summary: 'Decentralized composting pilot in Yelahanka.', source: 'BBMP SWM – Public works program', date: '2025-02-01', type: 'SERVICE', lat: 13.1007, lng: 77.5963, isActive: true, projectDetails: { ...generateProjectDetails('BLR-052', 'Composting – Yelahanka'), status: 'PLANNED' } },
  { id: 'BLR-053', wardCode: 'MEKHRI_CIRCLE', wardName: 'Mekhri Circle', title: 'Drain Grating – Flood-prone Underpasses (Phase 1)', summary: 'Underpass flood mitigation near Mekhri Circle.', source: 'BBMP SWD Dept – Public works program', date: '2024-12-01', type: 'INFRASTRUCTURE', lat: 13.0100, lng: 77.5950, isActive: true, projectDetails: { ...generateProjectDetails('BLR-053', 'Drain Grating – Underpasses'), status: 'PLANNED' } },
  { id: 'BLR-054', wardCode: 'CBD', wardName: 'CBD (MG Road)', title: 'Kerb Inlet Cleaning – CBD Stormwater Network (Phase 1)', summary: 'Inlet cleaning pre-monsoon in CBD.', source: 'BBMP SWD Dept – Public works program', date: '2024-06-01', type: 'INFRASTRUCTURE', lat: 12.9750, lng: 77.6050, isActive: true, projectDetails: { ...generateProjectDetails('BLR-054', 'Kerb Inlet Cleaning – CBD'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-055', wardCode: 'HENNUR', wardName: 'Hennur', title: 'Road Widening – Hennur Road Stretch (Pilot)', summary: 'Bottleneck removal on Hennur Road.', source: 'BBMP / BDA – Public works program', date: '2025-03-01', type: 'INFRASTRUCTURE', lat: 13.0350, lng: 77.6400, isActive: true, projectDetails: { ...generateProjectDetails('BLR-055', 'Road Widening – Hennur'), status: 'PLANNED' } },
  { id: 'BLR-056', wardCode: 'MARATHAHALLI', wardName: 'Marathahalli', title: 'Signal Free Corridor Prep – ORR Junctions', summary: 'Corridor optimization study + minor works on ORR.', source: 'DULT / Bengaluru Traffic Police – Program notice', date: '2025-01-01', type: 'NOTICE', lat: 12.9580, lng: 77.6900, isActive: true },
  { id: 'BLR-057', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'Ward Office Digitized Noticeboard – Indiranagar (Pilot)', summary: 'Ward transparency pilot with digital noticeboard.', source: 'BBMP – Program notice', date: '2024-12-01', type: 'NOTICE', lat: 12.9719, lng: 77.6412, isActive: true },
  { id: 'BLR-058', wardCode: 'JAYANAGAR', wardName: 'Jayanagar', title: 'Rainwater Harvesting Structures – Jayanagar Parks (Phase 1)', summary: 'RWH public assets in Jayanagar parks.', source: 'BBMP Environment Cell – Public works program', date: '2024-09-01', type: 'INFRASTRUCTURE', lat: 12.9250, lng: 77.5938, isActive: true, projectDetails: { ...generateProjectDetails('BLR-058', 'RWH – Jayanagar Parks'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-059', wardCode: 'KORAMANGALA', wardName: 'Koramangala', title: 'Recharge Pit Construction – Koramangala Parks & Medians', summary: 'Recharge pit cluster in Koramangala.', source: 'BBMP Environment Cell – Public works program', date: '2025-02-01', type: 'INFRASTRUCTURE', lat: 12.9352, lng: 77.6245, isActive: true, projectDetails: { ...generateProjectDetails('BLR-059', 'Recharge Pits – Koramangala'), status: 'PLANNED' } },
  { id: 'BLR-060', wardCode: 'AGARA', wardName: 'Agara', title: 'Lake Desilting & Bund Repair – Agara Lake (Phase 2)', summary: 'Lake works at Agara Lake.', source: 'BBMP / Minor Irrigation Dept – Public works program', date: '2025-01-01', type: 'INFRASTRUCTURE', lat: 12.9130, lng: 77.6390, isActive: true, projectDetails: { ...generateProjectDetails('BLR-060', 'Lake Desilting – Agara'), status: 'PLANNED' } },
  { id: 'BLR-061', wardCode: 'JAYANAGAR', wardName: 'Jayanagar', title: 'Street Vendor Zone Marking – Jayanagar 4th Block (Pilot)', summary: 'Vendor zone demarcation in Jayanagar 4th Block.', source: 'BBMP / DULT – Program notice', date: '2025-02-01', type: 'NOTICE', lat: 12.9255, lng: 77.5920, isActive: true },
  { id: 'BLR-062', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'Roadside Drain Covering – Indiranagar Inner Roads (Stretch B)', summary: 'Drain/culvert improvements on Indiranagar inner roads.', source: 'BBMP SWD Dept – Public tender', date: '2024-08-01', type: 'INFRASTRUCTURE', lat: 12.9719, lng: 77.6412, isActive: true, projectDetails: { ...generateProjectDetails('BLR-062', 'Drain Covering – Indiranagar'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-063', wardCode: 'KORAMANGALA', wardName: 'Koramangala', title: 'Culvert Repair – Koramangala IRR Crossing', summary: 'Culvert repair on Intermediate Ring Road.', source: 'BBMP SWD Dept – Public tender', date: '2025-03-01', type: 'INFRASTRUCTURE', lat: 12.9400, lng: 77.6200, isActive: true, projectDetails: { ...generateProjectDetails('BLR-063', 'Culvert – Koramangala IRR'), status: 'PLANNED' } },
  { id: 'BLR-064', wardCode: 'WHITEFIELD', wardName: 'Whitefield', title: 'Streetlight Control Panel Upgrade – Whitefield (Phase 1)', summary: 'Control panel upgrades in Whitefield.', source: 'BESCOM – Public works program', date: '2025-01-01', type: 'INFRASTRUCTURE', lat: 12.9698, lng: 77.7499, isActive: true, projectDetails: { ...generateProjectDetails('BLR-064', 'Control Panels – Whitefield'), status: 'PLANNED' } },
  { id: 'BLR-065', wardCode: 'MALLESHWARAM', wardName: 'Malleshwaram', title: 'Local Road Recarpeting – Malleshwaram 8th Cross', summary: 'Local street recarpeting on Malleshwaram 8th Cross.', source: 'BBMP Roads Dept – Public tender', date: '2025-02-01', type: 'INFRASTRUCTURE', lat: 13.0030, lng: 77.5700, isActive: true, projectDetails: { ...generateProjectDetails('BLR-065', 'Recarpeting – Malleshwaram'), status: 'PLANNED' } },
  { id: 'BLR-066', wardCode: 'CBD', wardName: 'CBD (MG Road)', title: 'Footpath Encroachment Removal – CBD Retail Streets', summary: 'Encroachment removal on Commercial Street / Brigade Road.', source: 'BBMP / Bengaluru City Police – Program notice', date: '2024-12-01', type: 'NOTICE', lat: 12.9780, lng: 77.6070, isActive: true },
  { id: 'BLR-067', wardCode: 'INDIRANAGAR', wardName: 'Indiranagar', title: 'Bus Shelter Refurbishment – Indiranagar Corridor', summary: 'Bus shelter refurbishment in Indiranagar.', source: 'BMTC / BBMP – Public works program', date: '2024-09-01', type: 'SERVICE', lat: 12.9719, lng: 77.6412, isActive: true, projectDetails: { ...generateProjectDetails('BLR-067', 'Bus Shelters – Indiranagar'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-068', wardCode: 'MARATHAHALLI', wardName: 'Marathahalli', title: 'Traffic Camera Enforcement – ORR (Pilot)', summary: 'Enforcement camera pilot on ORR.', source: 'Bengaluru Traffic Police – Public works program', date: '2025-02-01', type: 'INFRASTRUCTURE', lat: 12.9580, lng: 77.6900, isActive: true, projectDetails: { ...generateProjectDetails('BLR-068', 'Traffic Cameras – ORR'), status: 'PLANNED' } },
  { id: 'BLR-069', wardCode: 'SHIVAJINAGAR', wardName: 'Shivajinagar', title: 'Street Cleaning Initiative – Shivajinagar Core Streets', summary: 'Ward sweeping + drain edge cleaning in Shivajinagar.', source: 'BBMP SWM – Public works program', date: '2024-08-01', type: 'SERVICE', lat: 12.9860, lng: 77.6040, isActive: true, projectDetails: { ...generateProjectDetails('BLR-069', 'Street Cleaning – Shivajinagar'), status: 'WORKS_ONGOING' } },
  { id: 'BLR-070', wardCode: 'JAYANAGAR', wardName: 'Citywide', title: 'Emergency Water Tanker Route Publication – Summer Preparedness', summary: 'Summer tanker plan transparency for multiple wards.', source: 'BWSSB – Program notice', date: '2025-03-01', type: 'NOTICE', lat: 12.9716, lng: 77.5946, isActive: true },
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
