/**
 * SEO Utilities and Helpers
 */

export interface SeoMetaTags {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string;
  robots?: string;
  viewport?: string;
  charset?: string;
}

export interface SchemaOrgMarkup {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

/**
 * Generate SEO meta tags for different page types
 */
export const generatePageMetaTags = (pageType: string, data?: Record<string, unknown>): SeoMetaTags => {
  const baseUrl = 'https://forever-pet-friend.app';

  switch (pageType) {
    case 'home':
      return {
        title: 'Forever Pet Friend - Monumentos Virtuales para tus Mascotas Queridas',
        description:
          'Crea memorials virtuales eternos para tus mascotas. Comparte historias, tributos y recuerdos en una comunidad global de amantes de animales.',
        keywords: 'memorial mascotas, memorial perros, memorial gatos, monumentos virtuales, mascotas fallecidas',
        canonical: `${baseUrl}/`,
        ogTitle: 'Forever Pet Friend - Monumentos Virtuales para Mascotas',
        ogDescription: 'Crea y comparte memorials eternos para tus mascotas queridas',
        ogImage: `${baseUrl}/og-home.jpg`,
        ogUrl: `${baseUrl}/`,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        robots: 'index, follow'
      };

    case 'profile':
      const profileData = data as { name?: string; breed?: string; story?: string; photoUrl?: string; id?: string };
      return {
        title: `${profileData.name || 'Memorial'} - Forever Pet Friend`,
        description: `${profileData.story?.substring(0, 155) || 'Un hermoso memorial para una mascota especial'}...`,
        keywords: `memorial ${profileData.breed || 'mascota'}, ${profileData.name || 'memorial'}`,
        canonical: `${baseUrl}/profile/${profileData.id}`,
        ogTitle: `Memorial de ${profileData.name}`,
        ogDescription: profileData.story?.substring(0, 155) || 'Un hermoso memorial',
        ogImage: profileData.photoUrl || `${baseUrl}/og-memorial.jpg`,
        ogUrl: `${baseUrl}/profile/${profileData.id}`,
        ogType: 'article',
        twitterCard: 'summary_large_image',
        robots: 'index, follow'
      };

    case 'map':
      return {
        title: 'Mapa de Memorials - Forever Pet Friend',
        description: 'Explora memorials de mascotas de todo el mundo en nuestro mapa interactivo. Descubre historias de amor y compasión.',
        keywords: 'mapa memorials, memorials mundiales, mascotas fallecidas',
        canonical: `${baseUrl}/map`,
        ogTitle: 'Mapa de Memorials - Forever Pet Friend',
        ogDescription: 'Explora memorials de mascotas en un mapa interactivo global',
        ogImage: `${baseUrl}/og-map.jpg`,
        ogUrl: `${baseUrl}/map`,
        ogType: 'website',
        twitterCard: 'summary',
        robots: 'index, follow'
      };

    case 'create':
      return {
        title: 'Crear Memorial - Forever Pet Friend',
        description: 'Crea un hermoso memorial virtual para tu mascota. Comparte su historia, fotos y momentos especiales.',
        keywords: 'crear memorial, memorial mascota, homenaje mascota',
        canonical: `${baseUrl}/create`,
        ogTitle: 'Crear Memorial para tu Mascota',
        ogDescription: 'Crea un hermoso memorial virtual para recordar a tu mascota',
        ogImage: `${baseUrl}/og-create.jpg`,
        ogUrl: `${baseUrl}/create`,
        ogType: 'website',
        robots: 'index, follow'
      };

    case 'about':
      return {
        title: 'Acerca de Forever Pet Friend - Nuestra Misión',
        description:
          'Forever Pet Friend es una plataforma dedicada a crear memorials virtuales eternos para mascotas queridas alrededor del mundo.',
        keywords: 'sobre nosotros, Forever Pet Friend, memorial mascotas',
        canonical: `${baseUrl}/about`,
        ogTitle: 'Acerca de Forever Pet Friend',
        ogDescription: 'Conoce nuestra misión de crear memorials virtuales para mascotas',
        ogImage: `${baseUrl}/og-about.jpg`,
        ogUrl: `${baseUrl}/about`,
        ogType: 'website',
        robots: 'index, follow'
      };

    case 'pricing':
      return {
        title: 'Planes de Precios - Forever Pet Friend',
        description:
          'Elige el plan perfecto para crear el memorial de tu mascota. Opciones flexibles y asequibles para todos.',
        keywords: 'precios, planes, premium, memorials mascotas',
        canonical: `${baseUrl}/pricing`,
        ogTitle: 'Planes de Precios - Forever Pet Friend',
        ogDescription: 'Descubre nuestros planes y elige el mejor para ti',
        ogImage: `${baseUrl}/og-pricing.jpg`,
        ogUrl: `${baseUrl}/pricing`,
        ogType: 'website',
        robots: 'index, follow'
      };

    default:
      return {
        title: 'Forever Pet Friend - Monumentos Virtuales para Mascotas',
        description: 'Crea memorials virtuales para tus mascotas queridas',
        canonical: baseUrl,
        ogType: 'website',
        robots: 'index, follow'
      };
  }
};

/**
 * Generate Schema.org structured data for different content types
 */
export const generateSchemaOrgMarkup = (type: string, data?: Record<string, unknown>): SchemaOrgMarkup => {
  const baseUrl = 'https://forever-pet-friend.app';

  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Forever Pet Friend',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: 'Plataforma de memorials virtuales para mascotas',
        sameAs: ['https://www.facebook.com/memoriaseternasmx', 'https://twitter.com/memoriaseternasmx'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          email: 'support@forever-pet-friend.app'
        }
      };

    case 'memorial':
      const memorialData = data as { name?: string; photoUrl?: string; story?: string; birthDate?: string; deathDate?: string; id?: string };
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `Memorial de ${memorialData.name}`,
        description: memorialData.story?.substring(0, 200),
        image: memorialData.photoUrl || `${baseUrl}/og-memorial.jpg`,
        datePublished: memorialData.birthDate,
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: 'Forever Pet Friend'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Forever Pet Friend',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`
          }
        },
        mainEntity: {
          '@type': 'Thing',
          name: memorialData.name
        }
      };

    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Forever Pet Friend',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/map?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      };

    case 'breadcrumb':
      const breadcrumbData = data as { items?: Array<{ name: string; url: string }> };
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: (breadcrumbData.items || []).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };

    default:
      return {
        '@context': 'https://schema.org',
        '@type': 'Thing'
      };
  }
};

/**
 * Generate sitemap URLs
 */
export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemapUrls = (profiles?: Array<{ id: string; updatedAt?: string }>): SitemapUrl[] => {
  const baseUrl = 'https://forever-pet-friend.app';

  const staticUrls: SitemapUrl[] = [
    {
      loc: `${baseUrl}/`,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/map`,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/create`,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/about`,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/pricing`,
      changefreq: 'monthly',
      priority: 0.8
    },
    // SEO Landing Pages
    {
      loc: `${baseUrl}/cementerio-virtual-mascotas`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-perros`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-gatos`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-mascotas-exoticas`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/memorial-mascotas-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/memorial-perros-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/memorial-gatos-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    // Phase 2 - Additional SEO Landing Pages
    {
      loc: `${baseUrl}/cementerio-virtual-conejos`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-hamsters`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-cobayas`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-loros`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-pajaros`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-hurones`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-tortugas`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-animales-compania`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-animales-domesticos`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/cementerio-virtual-perros-gatos`,
      changefreq: 'weekly',
      priority: 0.85
    },
    // Phase 3 - Memorial Online Pages
    {
      loc: `${baseUrl}/memorial-cachorros-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/memorial-mascotas-exoticas-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/memorial-conejos-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/memorial-hamsters-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/memorial-cobayas-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/memorial-loros-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/memorial-pajaros-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/memorial-hurones-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/memorial-tortugas-online`,
      changefreq: 'weekly',
      priority: 0.85
    },
    // Phase 3 - Homenaje Virtual Pages
    {
      loc: `${baseUrl}/homenaje-virtual-mascotas`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/homenaje-virtual-perros`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/homenaje-virtual-gatos`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/homenaje-virtual-mascotas-exoticas`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/homenaje-virtual-mi-perro`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/homenaje-virtual-mi-gato`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/homenaje-virtual-mi-mascota`,
      changefreq: 'weekly',
      priority: 0.85
    },
    // PHASE 4: Crear Memorial Pages
    {
      loc: `${baseUrl}/crear-memorial-mascota`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/crear-memorial-perro`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/crear-memorial-gato`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/crear-memorial-mascota-exotica`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/crear-memorial-conejo`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/crear-memorial-hamster`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/crear-memorial-pajaro`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/crear-memorial-loro`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/crear-memorial-tortuga`,
      changefreq: 'weekly',
      priority: 0.85
    },
    // PHASE 4: Registrar Mascota Pages
    {
      loc: `${baseUrl}/registrar-mascota-cementerio-virtual`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/registrar-perro-cementerio-virtual`,
      changefreq: 'weekly',
      priority: 0.85
    },
    {
      loc: `${baseUrl}/registrar-gato-cementerio-virtual`,
      changefreq: 'weekly',
      priority: 0.85
    }
  ];

  const dynamicUrls: SitemapUrl[] = (profiles || []).map((profile) => ({
    loc: `${baseUrl}/profile/${profile.id}`,
    lastmod: profile.updatedAt || new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.6
  }));

  return [...staticUrls, ...dynamicUrls];
};

/**
 * Generate sitemap XML
 */
export const generateSitemapXml = (urls: SitemapUrl[]): string => {
  const urlEntries = urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>
    `
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

/**
 * Generate robots.txt content
 */
export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /?*sort=
Crawl-delay: 1

User-agent: Googlebot
Allow: /
Crawl-delay: 0

Sitemap: https://forever-pet-friend.app/sitemap.xml`;
};

/**
 * Generate canonical URL
 */
export const generateCanonicalUrl = (pathname: string): string => {
  const baseUrl = 'https://forever-pet-friend.app';
  return `${baseUrl}${pathname}`;
};

/**
 * URL friendly slug generator
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
};

/**
 * Image optimization suggestions
 */
export interface ImageOptimization {
  src: string;
  alt: string;
  loading: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
}

export const optimizeImage = (src: string, alt: string, priority: boolean = false): ImageOptimization => {
  return {
    src,
    alt,
    loading: priority ? 'eager' : 'lazy',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    srcSet: `${src}?w=320 320w, ${src}?w=640 640w, ${src}?w=1024 1024w`
  };
};

/**
 * Generate rich snippets for product/article
 */
export const generateRichSnippet = (type: 'product' | 'article' | 'review', data: Record<string, unknown>) => {
  const baseSchema = {
    '@context': 'https://schema.org'
  };

  switch (type) {
    case 'product':
      return {
        ...baseSchema,
        '@type': 'Product',
        name: data.name,
        description: data.description,
        image: data.image,
        brand: {
          '@type': 'Brand',
          name: 'Forever Pet Friend'
        },
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: data.rating,
          ratingCount: data.ratingCount
        }
      };

    case 'article':
      return {
        ...baseSchema,
        '@type': 'NewsArticle',
        headline: data.headline,
        description: data.description,
        image: data.image,
        datePublished: data.publishedDate,
        dateModified: data.modifiedDate,
        author: {
          '@type': 'Person',
          name: data.author
        }
      };

    case 'review':
      return {
        ...baseSchema,
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: data.rating,
          bestRating: 5,
          worstRating: 1
        },
        reviewBody: data.reviewText,
        author: {
          '@type': 'Person',
          name: data.author
        }
      };

    default:
      return baseSchema;
  }
};

/**
 * Meta tags for social sharing
 */
export const generateSocialMetaTags = (platform: 'facebook' | 'twitter' | 'linkedin', data: {
  title: string;
  description: string;
  image: string;
  url: string;
}): Record<string, string> => {
  switch (platform) {
    case 'facebook':
      return {
        'og:title': data.title,
        'og:description': data.description,
        'og:image': data.image,
        'og:url': data.url,
        'og:type': 'article'
      };

    case 'twitter':
      return {
        'twitter:card': 'summary_large_image',
        'twitter:title': data.title,
        'twitter:description': data.description,
        'twitter:image': data.image,
        'twitter:url': data.url
      };

    case 'linkedin':
      return {
        'og:title': data.title,
        'og:description': data.description,
        'og:image': data.image,
        'og:url': data.url,
        'og:type': 'article'
      };

    default:
      return {};
  }
};
