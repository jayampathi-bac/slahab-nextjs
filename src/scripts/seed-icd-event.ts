/**
 * Seed script: creates the ICD "Beauty & Wellness — Miracles of Asia" event.
 * Run once with: npx tsx --env-file=.env.local src/scripts/seed-icd-event.ts
 */
// Env vars loaded via --env-file=.env.local when running this script
import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'events',
    where: { slug: { equals: 'beauty-wellness-miracles-of-asia-2026' } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log('Event already exists — skipping seed.')
    process.exit(0)
  }

  await payload.create({
    collection: 'events',
    data: {
      title: 'Beauty & Wellness — Miracles of Asia',
      slug: 'beauty-wellness-miracles-of-asia-2026',
      tag: 'ICD Asia Event',
      status: 'upcoming',
      showOnHomepage: true,
      date: '2026-11-01T00:00:00.000Z',
      endDate: '2026-11-03T23:59:59.000Z',
      location: 'Cinnamon Grand Hotel, Colombo, Sri Lanka',
      excerpt:
        'An exclusive three-day international gathering hosted by ICD Sri Lanka (SLAHAB), bringing together elite hair and beauty professionals from across Asia for world-class seminars, cultural showcases, bridal fashion, and a spectacular gala dinner.',
      registrationDeadline: '2026-10-15T23:59:59.000Z',
      contactName: 'Nayana Karunaratne',
      contactEmail: 'nayana.karunaratne@gmail.com',
      contactPhone: '+94 77 73 77 723',
      pricingTiers: [
        {
          name: 'Single Room',
          price: '€810 / person',
          includes:
            '3 nights accommodation (single room) at Cinnamon Grand Hotel, daily breakfast, full conference access for all 3 days, and exclusive gift package.',
        },
        {
          name: 'Sharing Double Room',
          price: '€640 / person',
          includes:
            '3 nights accommodation (sharing double room) at Cinnamon Grand Hotel, daily breakfast, full conference access for all 3 days, and exclusive gift package.',
        },
        {
          name: 'Conference Only',
          price: 'Contact for pricing',
          includes: 'Full conference access for all 3 days and gift package. No accommodation included.',
        },
      ],
      program: [
        {
          dayTitle: 'Day 1 — Arrival & Welcome',
          dayDate: '2026-11-01T00:00:00.000Z',
          activities: [
            {
              time: 'All Day',
              title: 'Delegate Arrivals & Check-In',
              description: 'Delegates arrive at Cinnamon Grand Hotel, Colombo and check in.',
            },
            {
              time: '7:00 PM – 10:00 PM',
              title: 'Welcome Cocktail & Dinner',
              description:
                'Official opening evening featuring cultural dance performances, welcome speeches, local Sri Lankan cuisine, and fine wines.',
            },
          ],
        },
        {
          dayTitle: 'Day 2 — Eastern Wellness & Bridal Show',
          dayDate: '2026-11-02T00:00:00.000Z',
          activities: [
            {
              time: '9:30 AM – 2:30 PM',
              title: 'Eastern Wellness Seminar',
              description:
                'A deep dive into holistic Eastern wellness philosophies: health, mindfulness, and aromatherapy. Includes a buffet lunch and exclusive gift package for all delegates.',
            },
            {
              time: '3:00 PM – 6:00 PM',
              title: 'Free Afternoon / Complimentary City Tour',
              description:
                'Explore Colombo at your own pace or join a complimentary guided city tour (optional).',
            },
            {
              time: '7:00 PM onwards',
              title: '"Threads of Tradition" — Asian Bridal Show & Dinner',
              description:
                'An exclusive showcase of Asian bridal and wedding hair collections designed by ICD Sri Lanka. Followed by a sit-down dinner.',
            },
          ],
        },
        {
          dayTitle: 'Day 3 — Wellness Seminars & Gala Dinner',
          dayDate: '2026-11-03T00:00:00.000Z',
          activities: [
            {
              time: '9:00 AM – 2:30 PM',
              title: 'Wellness "Head to Toe" — Education & Look & Learn',
              description:
                'Three focused 45-minute sessions covering wellness techniques from head to toe: hair, skin, and nail care. Education seminars and live demonstrations by industry experts.',
            },
            {
              time: '3:00 PM – 6:00 PM',
              title: 'Free Afternoon',
              description:
                'Time for shopping, relaxing at the hotel spa, or exploring local markets.',
            },
            {
              time: '7:00 PM – 11:00 PM',
              title: '"Wonder of Asia" Gala Dinner & Closing Ceremony',
              description:
                'A spectacular sit-down gala dinner celebrating the spirit of Asia. Closing ceremony with awards and farewell speeches.',
            },
          ],
        },
      ],
    },
  })

  console.log('ICD event seeded successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
