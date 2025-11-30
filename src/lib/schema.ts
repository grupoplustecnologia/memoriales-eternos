/**
 * Schema.org JSON-LD Markup Generators
 * Generates structured data for search engines
 */

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

/**
 * Generate Organization schema
 * Used on all pages
 */
export const generateOrganizationSchema = (): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Forever Pet Friend',
  url: 'https://memorias-eternas.app',
  logo: 'https://memorias-eternas.app/logo.png',
  description: 'Monumentos virtuales eternos para honrar a tus mascotas queridas',
  sameAs: [
    'https://www.facebook.com/foreverpetfriend',
    'https://www.instagram.com/foreverpetfriend',
    'https://twitter.com/foreverpetfriend'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@memorias-eternas.app'
  }
});

/**
 * Generate LocalBusiness schema for city-specific pages
 */
export const generateLocalBusinessSchema = (cityName: string, country: string = 'Spain'): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: `Forever Pet Friend - Cementerio Virtual en ${cityName}`,
  description: `Memorial virtual para mascotas en ${cityName}, ${country}. Crea monumentos eternos para honrar a tus compañeros queridos.`,
  url: `https://memorias-eternas.app/cementerio-mascotas-${cityName.toLowerCase()}-online`,
  image: `https://memorias-eternas.app/og-${cityName.toLowerCase()}.jpg`,
  areaServed: {
    '@type': 'City',
    name: cityName
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@memorias-eternas.app'
  },
  priceRange: 'Gratis - €79.99/año'
});

/**
 * Generate BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }))
});

/**
 * Generate FAQPage schema
 */
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

/**
 * Generate Product/Service schema for pricing plans
 */
export const generateServiceSchema = (serviceName: string, price?: string): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  provider: {
    '@type': 'Organization',
    name: 'Forever Pet Friend',
    url: 'https://memorias-eternas.app'
  },
  description: `${serviceName} - Crea y comparte memorials virtuales para tus mascotas`,
  ...(price && {
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'EUR'
    }
  })
});

/**
 * Generate Article schema for memorial pages
 */
export const generateArticleSchema = (
  title: string,
  description: string,
  imageUrl: string,
  url: string,
  datePublished?: string,
  dateModified?: string
): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: description,
  image: imageUrl,
  url: url,
  author: {
    '@type': 'Organization',
    name: 'Forever Pet Friend'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Forever Pet Friend',
    logo: {
      '@type': 'ImageObject',
      url: 'https://memorias-eternas.app/logo.png'
    }
  },
  datePublished: datePublished || new Date().toISOString(),
  dateModified: dateModified || new Date().toISOString()
});

/**
 * Generate WebPage schema
 */
export const generateWebPageSchema = (
  title: string,
  description: string,
  url: string,
  imageUrl?: string
): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description: description,
  url: url,
  ...(imageUrl && {
    image: {
      '@type': 'ImageObject',
      url: imageUrl
    }
  }),
  isPartOf: {
    '@type': 'WebSite',
    name: 'Forever Pet Friend',
    url: 'https://memorias-eternas.app'
  }
});

/**
 * Generate Person schema for memorial profiles
 */
export const generatePersonSchema = (
  name: string,
  description: string,
  birthDate?: string,
  deathDate?: string,
  imageUrl?: string,
  url?: string
): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: name,
  description: description,
  ...(imageUrl && { image: imageUrl }),
  ...(birthDate && { birthDate: birthDate }),
  ...(deathDate && { deathDate: deathDate }),
  ...(url && { url: url })
});

/**
 * Generate Pet/Animal schema
 */
export const generatePetSchema = (
  petName: string,
  petType: string,
  breed: string,
  imageUrl?: string,
  description?: string
): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'Thing',
  name: petName,
  additionalType: `Pet/${petType}`,
  breed: breed,
  ...(imageUrl && { image: imageUrl }),
  ...(description && { description: description })
});

/**
 * Generate AggregateOffer schema for subscription plans
 */
export const generateSubscriptionSchema = (): SchemaMarkup => ({
  '@context': 'https://schema.org',
  '@type': 'AggregateOffer',
  priceCurrency: 'EUR',
  offers: [
    {
      '@type': 'Offer',
      name: 'Huella Eterna (Gratuito)',
      price: '0',
      priceCurrency: 'EUR',
      description: '1 memorial gratuito'
    },
    {
      '@type': 'Offer',
      name: 'Cielo de Estrellas',
      price: '49.99',
      priceCurrency: 'EUR',
      billingDuration: 'P1Y',
      description: 'Memorials ilimitados anuales'
    },
    {
      '@type': 'Offer',
      name: 'Santuario Premium',
      price: '79.99',
      priceCurrency: 'EUR',
      billingDuration: 'P1Y',
      description: 'Familia: 10 usuarios, memorials ilimitados'
    }
  ]
});

/**
 * Helper to embed schema as JSON-LD script tag
 * Usage: Place in <head> or <script type="application/ld+json"> tag
 */
export const schemaToJsonLd = (schema: SchemaMarkup | SchemaMarkup[]): string => {
  return JSON.stringify(schema, null, 2);
};

/**
 * Generate multiple schemas and combine them
 */
export const generateCombinedSchema = (schemas: SchemaMarkup[]): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@graph': schemas
});
