'use client';

import { SchemaMarkup, schemaToJsonLd } from '@/lib/schema';

interface SchemaHeadProps {
  schemas: SchemaMarkup | SchemaMarkup[];
}

/**
 * Component to render JSON-LD schema tags in the head
 * Must be used within a client component to avoid hydration issues
 */
export function SchemaHead({ schemas }: SchemaHeadProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: Array.isArray(schemas) 
          ? JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': schemas
            })
          : schemaToJsonLd(schemas)
      }}
    />
  );
}
