'use client';

interface CanonicalHeadProps {
  url: string;
}

/**
 * Component to render canonical link tag
 * Prevents duplicate content issues in search engines
 */
export function CanonicalHead({ url }: CanonicalHeadProps) {
  return <link rel="canonical" href={url} />;
}
