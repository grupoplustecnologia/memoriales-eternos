/**
 * Cache invalidation helpers
 * Call these when data changes to bust the relevant caches
 */

import { invalidateTags, deleteCached, clearCachePattern } from '@/lib/cache';

/**
 * Invalidate all trending caches
 */
export async function invalidateTrendingCache() {
  await clearCachePattern('trending');
}

/**
 * Invalidate all search caches
 */
export async function invalidateSearchCache() {
  await clearCachePattern('search');
}

/**
 * Invalidate all profile caches
 */
export async function invalidateProfilesCache() {
  await clearCachePattern('profiles');
  await clearCachePattern('user-profiles');
  await clearCachePattern('profile:');
}

/**
 * Invalidate comments cache for a specific profile
 */
export async function invalidateProfileComments(profileId: string) {
  await clearCachePattern(`comments:${profileId}`);
}

/**
 * Invalidate reactions cache for a specific profile
 */
export async function invalidateProfileReactions(profileId: string) {
  await clearCachePattern(`reactions:${profileId}`);
}

/**
 * Call when memorial is created/updated/deleted
 */
export async function invalidateMemorialCache(profileId?: string) {
  await invalidateTrendingCache();
  await invalidateSearchCache();
  await invalidateProfilesCache();

  if (profileId) {
    await deleteCached(`profile:${profileId}`);
  }

  // Invalidate tags for Next.js revalidation
  await invalidateTags('trending', 'search', 'profiles', 'comments', 'reactions');
}

/**
 * Call when like is added/removed
 */
export async function invalidateLikesCache(profileId: string) {
  await invalidateTrendingCache();
  await invalidateProfileReactions(profileId);
}

/**
 * Call when comment is added/removed
 */
export async function invalidateCommentsCache(profileId: string) {
  await invalidateTrendingCache();
  await invalidateProfileComments(profileId);
}

/**
 * Call when tags list is updated
 */
export async function invalidateTagsCache() {
  await deleteCached('tags:list');
  await invalidateTags('tags');
}
