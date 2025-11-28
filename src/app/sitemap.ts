import { MetadataRoute } from 'next';
import { STATIC_ROUTES, PET_TYPES, SERVICES, CATEGORIES } from '@/lib/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Convert static routes
  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as any,
    priority: route.priority,
  }));

  // Convert pet type routes
  const petTypeRoutes: MetadataRoute.Sitemap = PET_TYPES.map((pet) => ({
    url: `${baseUrl}/pet-types/${pet.slug}`,
    lastModified: new Date(),
    changeFrequency: pet.changeFrequency as any,
    priority: pet.priority,
  }));

  // Convert service routes
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: service.changeFrequency as any,
    priority: service.priority,
  }));

  // Convert category routes (for future use)
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: category.changeFrequency as any,
    priority: category.priority,
  }));

  return [...staticRoutes, ...petTypeRoutes, ...serviceRoutes, ...categoryRoutes];
}
