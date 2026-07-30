import type { MetadataRoute } from 'next';
import { categoryLinks, extraLegalPages, legalPages, mainRoutes, site } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const noindexRoutes = new Set([
    '/india-ai-photo-prompts',
    '/nepal-ai-photo-prompts',
    '/bangladesh-ai-photo-prompts',
    '/pakistan-ai-photo-prompts',
    '/sri-lanka-ai-photo-prompts',
    '/arabic-ai-photo-prompts',
  ]);
  const routes = Array.from(new Set([
    ...mainRoutes.map((route) => route.href).filter((href) => href !== '/account'),
    ...categoryLinks.map(([, href]) => href).filter((href) => !noindexRoutes.has(href)),
    ...Object.keys(legalPages).map((slug) => `/${slug}`),
    ...Object.keys(extraLegalPages).map((slug) => `/${slug}`),
  ]));
  return routes.map((route) => ({
    url: `${site.domain}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route.includes('policy') || route.includes('terms') ? 0.4 : 0.75,
  }));
}
