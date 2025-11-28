'use client';

import { generateSchemaOrgMarkup, SchemaOrgMarkup } from '@/lib/seo';

interface RichSnippetProps {
  type: 'organization' | 'memorial' | 'website' | 'breadcrumb';
  data?: Record<string, unknown>;
}

export default function RichSnippet({ type, data }: RichSnippetProps) {
  const schemaMarkup: SchemaOrgMarkup = generateSchemaOrgMarkup(type, data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaMarkup)
      }}
    />
  );
}
