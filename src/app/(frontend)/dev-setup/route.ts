import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Not available in production' }, { status: 403 })
  }

  const payload = await getPayload({ config })
  const cleanup = new URL(req.url).searchParams.get('cleanup')

  if (cleanup) {
    // Delete duplicate media from failed upload attempts — keep IDs 1-4
    const { docs } = await payload.find({ collection: 'media', limit: 100 })
    const toDelete = docs.filter((d) => Number(d.id) > 4)
    await Promise.all(
      toDelete.map((d) => payload.delete({ collection: 'media', id: d.id })),
    )
    return Response.json({ deleted: toDelete.map((d) => ({ id: d.id, filename: d.filename })) })
  }

  // Normal: fix event dates + featured image
  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: 'beauty-wellness-miracles-of-asia-2026' } },
    limit: 1,
  })
  if (!docs.length) return Response.json({ error: 'Event not found' }, { status: 404 })

  try {
    const updated = await payload.update({
      collection: 'events',
      id: docs[0].id,
      data: {
        date: '2026-11-01T07:00:00.000Z',
        endDate: '2026-11-03T23:59:00.000Z',
        registrationDeadline: '2026-10-15T23:59:00.000Z',
        featuredImage: 3,
        showOnHomepage: true,
        status: 'upcoming',
      },
    })
    return Response.json({
      success: true,
      event: { id: updated.id, title: updated.title, date: updated.date, endDate: updated.endDate },
    })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
