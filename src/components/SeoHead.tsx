'use client';

import Head from 'next/head';
import { SeoMetaTags, SchemaOrgMarkup } from '@/lib/seo';

interface SeoHeadProps {
  metaTags: SeoMetaTags;
  schemaMarkup?: SchemaOrgMarkup;
}

export default function SeoHead({ metaTags, schemaMarkup }: SeoHeadProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      {metaTags.keywords && <meta name="keywords" content={metaTags.keywords} />}
      {metaTags.robots && <meta name="robots" content={metaTags.robots} />}

      {/* Canonical Tag */}
      {metaTags.canonical && <link rel="canonical" href={metaTags.canonical} />}

      {/* Open Graph Meta Tags */}
      {metaTags.ogTitle && <meta property="og:title" content={metaTags.ogTitle} />}
      {metaTags.ogDescription && <meta property="og:description" content={metaTags.ogDescription} />}
      {metaTags.ogImage && <meta property="og:image" content={metaTags.ogImage} />}
      {metaTags.ogUrl && <meta property="og:url" content={metaTags.ogUrl} />}
      {metaTags.ogType && <meta property="og:type" content={metaTags.ogType} />}

      {/* Twitter Meta Tags */}
      {metaTags.twitterCard && <meta name="twitter:card" content={metaTags.twitterCard} />}
      {metaTags.twitterTitle && <meta name="twitter:title" content={metaTags.twitterTitle} />}
      {metaTags.twitterDescription && <meta name="twitter:description" content={metaTags.twitterDescription} />}
      {metaTags.twitterImage && <meta name="twitter:image" content={metaTags.twitterImage} />}

      {/* Schema.org Structured Data */}
      {schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup)
          }}
        />
      )}

      {/* Additional SEO Tags */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#7a8b62" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Head>
  );
}
