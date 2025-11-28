/**
 * Routes Configuration
 * Central location for all route definitions used across the app
 * This file is used by sitemap.ts to automatically generate sitemap entries
 * Update this file when adding new landing pages
 */

export interface RouteConfig {
  slug: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export const STATIC_ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'daily' as const },
  { path: '/map', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/create', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/my-memorials', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/plans', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/auth/login', priority: 0.6, changeFrequency: 'never' as const },
];

/**
 * PET TYPES - Add new pet types here to automatically include in sitemap
 * Format: { slug: 'url-slug', priority: 0.0-1.0 }
 */
export const PET_TYPES: RouteConfig[] = [
  { slug: 'dogs', priority: 0.85, changeFrequency: 'monthly' as const },
  { slug: 'cats', priority: 0.85, changeFrequency: 'monthly' as const },
  { slug: 'rabbits', priority: 0.75, changeFrequency: 'monthly' as const },
  { slug: 'birds', priority: 0.75, changeFrequency: 'monthly' as const },
  { slug: 'ferrets', priority: 0.7, changeFrequency: 'monthly' as const },
  { slug: 'hamsters', priority: 0.7, changeFrequency: 'monthly' as const },
  { slug: 'small-mammals', priority: 0.7, changeFrequency: 'monthly' as const },
  // ADD NEW PET TYPES HERE - e.g., { slug: 'reptiles', priority: 0.7, changeFrequency: 'monthly' as const },
];

/**
 * SERVICES - Add new services here to automatically include in sitemap
 * Format: { slug: 'url-slug', priority: 0.0-1.0 }
 */
export const SERVICES: RouteConfig[] = [
  { slug: 'generic', priority: 0.85, changeFrequency: 'monthly' as const },
  { slug: 'digital', priority: 0.8, changeFrequency: 'monthly' as const },
  { slug: 'online', priority: 0.8, changeFrequency: 'monthly' as const },
  { slug: 'free', priority: 0.8, changeFrequency: 'monthly' as const },
  { slug: 'deceased', priority: 0.75, changeFrequency: 'monthly' as const },
  // ADD NEW SERVICES HERE - e.g., { slug: 'premium', priority: 0.8, changeFrequency: 'monthly' as const },
];

/**
 * CATEGORIES - For future expansion
 * Add category pages here to automatically include in sitemap
 */
export const CATEGORIES: RouteConfig[] = [
  // ADD CATEGORY ROUTES HERE when implemented
  // e.g., { slug: 'pet-types', priority: 0.9, changeFrequency: 'monthly' as const },
  // e.g., { slug: 'services', priority: 0.9, changeFrequency: 'monthly' as const },
];

/**
 * Helper function to generate full URL for a route
 */
export function getRouteUrl(path: string, baseUrl: string = 'http://localhost:3000'): string {
  return `${baseUrl}${path}`;
}

/**
 * Helper function to generate pet type URL
 */
export function getPetTypeUrl(slug: string, baseUrl: string = 'http://localhost:3000'): string {
  return `${baseUrl}/pet-types/${slug}`;
}

/**
 * Helper function to generate service URL
 */
export function getServiceUrl(slug: string, baseUrl: string = 'http://localhost:3000'): string {
  return `${baseUrl}/services/${slug}`;
}

/**
 * Helper function to get total number of indexed pages
 */
export function getTotalIndexedPages(): number {
  return STATIC_ROUTES.length + PET_TYPES.length + SERVICES.length + CATEGORIES.length;
}

/**
 * Helper function to get all routes for analytics/reporting
 */
export function getAllRoutes() {
  return {
    static: STATIC_ROUTES,
    petTypes: PET_TYPES,
    services: SERVICES,
    categories: CATEGORIES,
    total: getTotalIndexedPages(),
  };
}
