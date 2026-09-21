import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://slahab.lk'

// Static sitemap — no DB dependency, generated at build time.
// When a new event is added, add its slug here and redeploy.
const staticPages = [
  { path: '',                priority: 1.0 },
  { path: '/about',         priority: 0.8 },
  { path: '/contact',       priority: 0.8 },
  { path: '/events',        priority: 0.9 },
  { path: '/icd',           priority: 0.8 },
  { path: '/national-awards', priority: 0.8 },
  { path: '/omc',           priority: 0.8 },
]

const eventSlugs = [
  'beauty-wellness-miracles-of-asia-2026',
  // add new event slugs here when created
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages.map(({ path, priority }) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...eventSlugs.map((slug) => ({
      url: `${BASE}/events/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
