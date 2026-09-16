/**
 * Seed script: creates the ICD Global Conference 2026 — Paris past event.
 * Run once with: npx tsx --env-file=.env.local src/scripts/seed-paris-event.ts
 */
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config'

const IMAGES_DIR = path.resolve(process.cwd(), '../events-2')
const SLUG = 'icd-global-conference-paris-2026'

async function uploadImage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filePath: string,
  index: number,
) {
  const data = fs.readFileSync(filePath)
  const name = `icd-paris-2026-${String(index).padStart(2, '0')}.png`
  return payload.create({
    collection: 'media',
    data: { alt: `ICD Global Conference 2026 Paris — photo ${index + 1}` },
    file: {
      data,
      mimetype: 'image/png',
      name,
      size: data.length,
    },
  })
}

async function seed() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'events',
    where: { slug: { equals: SLUG } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log('Event already exists — skipping seed.')
    process.exit(0)
  }

  // Ordered list: image.png first, then image copy.png, then image copy 2–16.png
  const imageFiles = [
    'image.png',
    'image copy.png',
    ...Array.from({ length: 15 }, (_, i) => `image copy ${i + 2}.png`),
  ].map((name) => path.join(IMAGES_DIR, name))

  console.log(`Uploading ${imageFiles.length} images to UploadThing...`)

  const mediaIds: { image: number | string; caption?: string }[] = []
  let featuredImageId: number | string | undefined

  for (let i = 0; i < imageFiles.length; i++) {
    const filePath = imageFiles[i]
    if (!fs.existsSync(filePath)) {
      console.warn(`  [skip] File not found: ${filePath}`)
      continue
    }
    process.stdout.write(`  Uploading ${path.basename(filePath)}...`)
    const media = await uploadImage(payload, filePath, i)
    console.log(` → id ${media.id}`)
    if (i === 0) featuredImageId = media.id
    mediaIds.push({ image: media.id })
  }

  console.log(`\nCreating event record...`)

  await payload.create({
    collection: 'events',
    data: {
      title: 'ICD Global Conference 2026 — Paris',
      slug: SLUG,
      tag: 'ICD Global Conference',
      status: 'past',
      showOnHomepage: false,
      date: '2026-06-15T00:00:00.000Z',
      location: 'Paris, France',
      excerpt:
        'Members of ICD Sri Lanka, including veteran beautician and IHB founder Ms. Nayana Karunaratne, participated in the prestigious ICD Global Conference held in Paris, representing Sri Lanka.',
      featuredImage: featuredImageId,
      gallery: mediaIds,
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Members of ICD Sri Lanka, including veteran beautician and IHB founder Ms. Nayana Karunaratne, recently participated in the prestigious ICD Global Conference held in Paris, representing Sri Lanka.',
                },
              ],
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Experiencing the latest international hair and beauty trends firsthand will serve as a significant boost in steering our country\'s beauty industry toward a new direction.',
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  })

  console.log('\nICD Paris event seeded successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
