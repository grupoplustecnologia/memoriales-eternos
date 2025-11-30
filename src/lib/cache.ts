/**
 * Caching utilities for API responses and database queries
 * Uses Vercel KV for distributed caching in production
 * Falls back to in-memory cache for development
 */

import { revalidateTag } from 'next/cache';

// In-memory cache for development (auto-resets on file changes)
const memoryCache = new Map<string, { data: unknown; expires: number }>();

// Lazy load Vercel KV
let kvClient: any = null;
let kvInitialized = false;
let kvAvailable = false;

async function getKvClient() {
  if (kvInitialized) return kvClient;
  
  kvInitialized = true;
  
  // Only try KV if we're in production and have the URL
  if (process.env.NODE_ENV === 'production' && process.env.KV_URL) {
    try {
      const { kv } = await import('@vercel/kv');
      kvClient = kv;
      kvAvailable = true;
      console.log('KV client initialized successfully');
      return kvClient;
    } catch (error) {
      console.warn('Failed to initialize KV client, using memory cache:', error instanceof Error ? error.message : String(error));
      kvAvailable = false;
      return null;
    }
  }
  
  kvAvailable = false;
  return null;
}

/**
 * Get value from cache
 */
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const kv = await getKvClient();
    if (kv) {
      try {
        const cached = await kv.get(key);
        return cached as T | null;
      } catch (error) {
        console.error('KV get error:', error);
        // Fall through to memory cache
      }
    }
  } catch (error) {
    console.error('Error getting KV client:', error);
  }

  // Fallback to memory cache
  const cached = memoryCache.get(key);
  if (cached && cached.expires > Date.now()) {
    return cached.data as T;
  }

  if (cached) {
    memoryCache.delete(key);
  }

  return null;
}

/**
 * Set value in cache with TTL
 */
export async function setCached<T>(
  key: string,
  value: T,
  ttlSeconds: number = 300
): Promise<void> {
  try {
    const kv = await getKvClient();
    if (kv) {
      try {
        // Use replacer to handle Date objects
        const serialized = JSON.stringify(value, (key, val) => {
          if (val instanceof Date) {
            return val.toISOString();
          }
          return val;
        });
        await kv.setex(key, ttlSeconds, serialized);
        return;
      } catch (error) {
        console.error('KV set error:', error);
        // Fall through to memory cache
      }
    }
  } catch (error) {
    console.error('Error getting KV client:', error);
  }

  // Fallback to memory cache
  memoryCache.set(key, {
    data: value,
    expires: Date.now() + ttlSeconds * 1000,
  });
}

/**
 * Delete cache key
 */
export async function deleteCached(key: string): Promise<void> {
  try {
    const kv = await getKvClient();
    if (kv) {
      try {
        await kv.del(key);
        return;
      } catch (error) {
        console.error('KV delete error:', error);
      }
    }
  } catch (error) {
    console.error('Error getting KV client:', error);
  }

  memoryCache.delete(key);
}

/**
 * Clear all cache matching a pattern
 */
export async function clearCachePattern(pattern: string): Promise<void> {
  try {
    const kv = await getKvClient();
    if (kv) {
      try {
        const keys = await kv.keys(pattern);
        if (keys && keys.length > 0) {
          await kv.del(...keys);
          return;
        }
      } catch (error) {
        console.error('KV keys/delete error:', error);
        // Fall through to memory cache
      }
    }
  } catch (error) {
    console.error('Error getting KV client:', error);
  }

  // Fallback to memory cache - simple pattern matching
  for (const key of memoryCache.keys()) {
    if (key.includes(pattern)) {
      memoryCache.delete(key);
    }
  }
}

/**
 * Invalidate cache tags for revalidation
 */
export async function invalidateTags(...tags: string[]): Promise<void> {
  for (const tag of tags) {
    revalidateTag(tag);
  }
  // Also clear from KV cache
  for (const tag of tags) {
    await clearCachePattern(tag);
  }
}

/**
 * Cache key generators
 */
export const cacheKeys = {
  trending: (page: number = 1, limit: number = 20) =>
    `trending:${page}:${limit}`,
  search: (query: string, type: string = 'all', page: number = 1) =>
    `search:${query}:${type}:${page}`,
  profile: (id: string) => `profile:${id}`,
  profiles: (page: number = 1, limit: number = 20) =>
    `profiles:${page}:${limit}`,
  comments: (profileId: string, page: number = 1) =>
    `comments:${profileId}:${page}`,
  reactions: (profileId: string) => `reactions:${profileId}`,
  tags: () => 'tags:list',
  userProfiles: (userId: string, page: number = 1) =>
    `user-profiles:${userId}:${page}`,
};

/**
 * Cache invalidation tags
 */
export const cacheTags = {
  trending: 'trending',
  search: 'search',
  profiles: 'profiles',
  comments: 'comments',
  reactions: 'reactions',
  tags: 'tags',
};

/**
 * Pagination helper
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    totalPages: number;
  };
}

export function getPaginationParams(
  pageParam?: string | number,
  limitParam?: string | number
): { skip: number; take: number; page: number; limit: number } {
  const page = Math.max(1, parseInt(String(pageParam || '1')));
  const limit = Math.min(100, Math.max(1, parseInt(String(limitParam || '20'))));

  return {
    skip: (page - 1) * limit,
    take: limit,
    page,
    limit,
  };
}

/**
 * Calculate pagination metadata
 */
export function calculatePagination(
  page: number,
  limit: number,
  total: number
): PaginatedResponse<unknown>['pagination'] {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    hasMore: page < totalPages,
    totalPages,
  };
}
