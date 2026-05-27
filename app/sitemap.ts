import type { MetadataRoute } from 'next';
import { categories, legalPages, site } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['/', ...categories.map(([, href]) => href), ...Object.keys(legalPages).map((slug) => `/${slug}`)];
  return routes.map((route) => ({
    url: `${site.domain}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route.includes('policy') || route.includes('terms') ? 0.4 : 0.8,
  }));
}
