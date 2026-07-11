/**
 * Direct DB update script — no Next.js / Payload runtime needed.
 * Run: node src/scripts/update-event.mjs
 */
import pg from 'pg'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local manually
const envPath = resolve(__dirname, '../../.env.local')
const envLines = readFileSync(envPath, 'utf8').split('\n')
for (const line of envLines) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
}

const { Pool } = pg
const pool = new Pool({ connectionString: process.env.DATABASE_URI })

async function run() {
  const client = await pool.connect()
  try {
    // ── 1. Show current event state ──────────────────────────────────────────
    const { rows: before } = await client.query(
      `SELECT id, title, date, end_date, registration_deadline, featured_image_id, show_on_homepage, status
       FROM events WHERE slug = $1`,
      ['beauty-wellness-miracles-of-asia-2026'],
    )
    console.log('BEFORE:', before[0] ?? 'not found')

    if (!before.length) {
      console.error('Event not found. Create it in admin first.')
      process.exit(1)
    }

    const eventId = before[0].id

    // ── 2. Confirm media ID 3 exists (Cinnamon Grand Hotel image) ────────────
    const { rows: media } = await client.query(
      `SELECT id, filename, url FROM media WHERE id = 3`,
    )
    console.log('Featured image media:', media[0] ?? 'NOT FOUND — check media table')

    // ── 3. Update the event ───────────────────────────────────────────────────
    await client.query(
      `UPDATE events SET
         date                    = $1,
         end_date                = $2,
         registration_deadline   = $3,
         featured_image_id       = $4,
         show_on_homepage        = $5,
         status                  = $6,
         updated_at              = NOW()
       WHERE id = $7`,
      [
        '2026-11-01T07:00:00.000Z',  // 1 Nov 2026
        '2026-11-03T23:59:00.000Z',  // 3 Nov 2026
        '2026-10-15T23:59:00.000Z',  // Register by 15 Oct
        3,                            // icd-033.jpg — Cinnamon Grand Hotel
        true,
        'upcoming',
        eventId,
      ],
    )

    // ── 4. Confirm ────────────────────────────────────────────────────────────
    const { rows: after } = await client.query(
      `SELECT id, title, date, end_date, registration_deadline, featured_image_id, show_on_homepage, status
       FROM events WHERE id = $1`,
      [eventId],
    )
    console.log('AFTER: ', after[0])
    console.log('\n✓ Event updated successfully.')
  } finally {
    client.release()
    await pool.end()
  }
}

run().catch((err) => { console.error(err); process.exit(1) })
