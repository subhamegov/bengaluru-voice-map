/**
 * Single source of truth for city/authority branding.
 * Change these values to rebrand the entire portal for any ULB.
 */

import kenyaCoatOfArms from '@/assets/kenya-coat-of-arms.png';

export const CITY = {
  /** Full name of the governing authority */
  authorityName: 'Municipal Corporation',

  /** Citizen-facing portal title */
  portalCitizenTitle: 'Citizen Service Portal',

  /** Staff/resolver portal title */
  portalStaffTitle: 'Resolver Dashboard',

  /** Elected representative portal title */
  portalElectedTitle: 'Elected Representative Dashboard',

  /** Helpline number */
  helpline: '1800-111-555',

  /** Support email */
  email: 'support@municipality.gov.in',

  /** Official website */
  website: 'https://municipality.gov.in',

  /** Path to emblem/logo asset */
  emblemAsset: kenyaCoatOfArms,

  /** Alt text for the emblem image */
  emblemAlt: 'Government Emblem',

  /** Prefix for issue/ticket IDs */
  issueIdPrefix: 'ULB',

  /** Label for the smallest admin boundary (e.g. ward, zone) */
  adminUnitLabel: 'Ward',

  /** Plural of the admin unit */
  adminUnitPlural: 'Wards',

  /** City display name */
  cityName: 'My City',

  /** Tagline displayed in header/hero */
  tagline: 'Empowering citizens through transparent governance',

  /** Hero section copy */
  heroTitle: 'Your Voice Matters',
  heroSubtitle:
    'Report civic issues, track resolutions, and participate in building a better city.',
  heroCta: 'Report an Issue',

  /** Footer */
  footerTagline:
    'Building a smart, inclusive, and responsive city together.',
  copyright: (year: number) =>
    `© ${year} Municipal Corporation. All rights reserved.`,
} as const;
