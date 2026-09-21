import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const { docs: events } = await payload.find({
    collection: 'events',
    limit: 100,
    where: {
      or: [
        { status: { equals: 'upcoming' } },
        { status: { equals: 'past' } },
      ],
    },
  })

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/events',
    '/icd',
    '/national-awards',
    '/omc',
  ]
  const base = 'https://slahab.lk'

  return [
    ...staticPages.map((p) => ({
      url: `${base}${p}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: p === '' ? 1.0 : 0.8,
    })),
    ...events.map((e) => ({
      url: `${base}/events/${e.slug}`,
      lastModified: new Date(e.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
