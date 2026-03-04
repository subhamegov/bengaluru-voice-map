/**
 * Central branding configuration.
 * Change these values to rebrand the entire portal.
 */
export const brand = {
  // Organisation
  name: 'Municipal Corporation',
  shortName: 'ULB',
  tagline: 'Citizen Service Portal',
  subtitle: 'Empowering citizens through transparent governance',
  portalTitle: 'Citizen Service Portal',
  resolverPortalTitle: 'Resolver Dashboard',
  electedRepPortalTitle: 'Elected Representative Dashboard',

  // Emblem / Logo
  emblemAlt: 'Government Emblem',

  // Contact
  phone: '1800-111-555',
  email: 'support@municipality.gov.in',
  website: 'https://municipality.gov.in',

  // CTA copy
  heroCta: 'Report an Issue',
  heroTitle: 'Your Voice Matters',
  heroSubtitle: 'Report civic issues, track resolutions, and participate in building a better city.',

  // Footer
  copyright: (year: number) => `© ${year} Municipal Corporation. All rights reserved.`,
  footerTagline: 'Building a smart, inclusive, and responsive city together.',

  // Misc
  ticketPrefix: 'ULB',
  cityName: 'My City',
  trainingDescription: 'Short modules to help citizens and staff use digital services with confidence.',
  resolverTrainingDescription: 'Upskill yourself with structured, easy-to-follow training content designed for resolvers.',
} as const;
