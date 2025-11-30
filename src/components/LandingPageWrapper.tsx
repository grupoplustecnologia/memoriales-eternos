// Landing page layout wrapper with automatic lazy loading for non-critical sections
'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Dynamically load non-critical sections
const LazyTestimonialsSections = dynamic(
  () => import('@/components/landing-sections').then(mod => ({ default: () => null })),
  { ssr: false }
);

interface LandingPageWrapperProps {
  children: ReactNode;
  heroContent: ReactNode;
  belowFoldSections?: ReactNode;
}

export function LandingPageWrapper({
  children,
  heroContent,
  belowFoldSections
}: LandingPageWrapperProps) {
  return (
    <div className="min-h-screen">
      {/* Critical: Hero section rendered immediately */}
      <div className="will-change-transform">
        {heroContent}
      </div>

      {/* Non-critical: Other sections load after hero */}
      {children}

      {/* Optional: Below-fold sections defer loading */}
      {belowFoldSections && (
        <div className="lazy-below-fold">
          {belowFoldSections}
        </div>
      )}
    </div>
  );
}
