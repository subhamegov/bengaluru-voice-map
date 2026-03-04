/**
 * @deprecated Use src/config/city.ts (CITY) instead.
 * Kept for backward-compatibility with pages that still import `brand`.
 */
import { CITY } from '@/config/city';

export const brand = {
  name: CITY.authorityName,
  shortName: CITY.issueIdPrefix,
  tagline: CITY.portalCitizenTitle,
  subtitle: CITY.tagline,
  portalTitle: CITY.portalCitizenTitle,
  resolverPortalTitle: CITY.portalStaffTitle,
  electedRepPortalTitle: CITY.portalElectedTitle,
  emblemAlt: CITY.emblemAlt,
  phone: CITY.helpline,
  email: CITY.email,
  website: CITY.website,
  heroCta: CITY.heroCta,
  heroTitle: CITY.heroTitle,
  heroSubtitle: CITY.heroSubtitle,
  copyright: CITY.copyright,
  footerTagline: CITY.footerTagline,
  ticketPrefix: CITY.issueIdPrefix,
  cityName: CITY.cityName,
  trainingDescription: 'Short modules to help citizens and staff use digital services with confidence.',
  resolverTrainingDescription: 'Upskill yourself with structured, easy-to-follow training content designed for resolvers.',
} as const;
