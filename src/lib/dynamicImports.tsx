/**
 * Dynamic imports configuration for code splitting and lazy loading
 * Reduces initial bundle size by code-splitting heavy components
 */

'use client';

import dynamic from 'next/dynamic';
import type React from 'react';

/**
 * Loading component shown while lazy-loaded component is being imported
 */
export const ComponentLoader = () => (
  <div className="w-full h-64 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse rounded-lg" />
);

/**
 * Lazy load InteractiveMap component
 * Reduces initial JS by ~20kB
 */
export const DynamicInteractiveMap = dynamic(() => import('@/components/InteractiveMap').then(mod => ({ default: mod.InteractiveMap })), {
  loading: () => <ComponentLoader />,
  ssr: false
});

/**
 * Lazy load MapboxMap component
 * Only needed on map pages, reduces initial bundle
 */
export const DynamicMapboxMap = dynamic(() => import('@/components/MapboxMap'), {
  loading: () => <ComponentLoader />,
  ssr: false
});

/**
 * Lazy load CommentsSection component
 * These are below the fold in most cases
 */
export const DynamicCommentsSection = dynamic(() => import('@/components/CommentsSection').then(mod => ({ default: mod.CommentsSection })), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: false
});

/**
 * Lazy load ReactionsPanel component
 */
export const DynamicReactionsPanel = dynamic(() => import('@/components/ReactionsPanel').then(mod => ({ default: mod.ReactionsPanel })), {
  loading: () => <div className="h-12 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: false
});

/**
 * Helper to create dynamic component with custom loader
 */
export const createDynamicComponent = (
  importFn: () => Promise<any>,
  options?: {
    ssr?: boolean;
    loading?: () => React.ReactNode;
  }
) => {
  return dynamic(() => importFn(), {
    loading: options?.loading || (() => <ComponentLoader />),
    ssr: options?.ssr ?? true
  });
};
