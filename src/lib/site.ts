/**
 * Single source of truth for the Learning Lab brand, company and contact
 * details. The footer, legal pages and metadata read from here so the identity
 * stays consistent across the site.
 */
export const site = {
  name: "Learning Lab",
  domain: "simulith.online",
  url: "https://simulith.online",
  tagline: "Make the invisible visible",
  description:
    "Learning Lab is a scientific simulation workspace: run experiments in the browser, work through guided practicals and ask a tutor that reads the simulation you are looking at.",
  company: "Ivents",
  companyLine: "Learning Lab is a product of Ivents.",
  email: "hello@simulith.online",
  location: "Lagos, Nigeria",
  lastUpdated: "4 November 2026",
} as const;
