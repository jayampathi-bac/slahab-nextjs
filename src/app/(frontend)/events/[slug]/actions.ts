'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { generatePayhereHash } from '@/lib/payhere'

const ROOM_TYPE_INDEX: Record<string, number> = {
  single: 0,
  'sharing-double': 1,
  'conference-only': 2,
}

function parsePriceText(text: string): number {
  const match = text?.match(/[\d,]+\.?\d*/)
  return match ? parseFloat(match[0].replace(',', '')) : 0
}

export async function registerForEvent(_prevState: unknown, formData: FormData) {
  const payload = await getPayload({ config })

  const eventIdStr = formData.get('eventId') as string
  const slug       = formData.get('eventSlug') as string
  const eventId    = !isNaN(Number(eventIdStr)) ? Number(eventIdStr) : eventIdStr
  const firstName  = (formData.get('firstName') as string)?.trim()
  const lastName   = (formData.get('lastName') as string)?.trim()
  const email      = (formData.get('email') as string)?.trim()
  const phone      = (formData.get('phone') as string)?.trim()
  const country    = (formData.get('country') as string)?.trim()
  const organization         = (formData.get('organization') as string)?.trim()
  const roomType             = (formData.get('roomType') as string)?.trim()
  const dietaryRequirements  = (formData.get('dietaryRequirements') as string)?.trim()
  const message              = (formData.get('message') as string)?.trim()

  if (!firstName || !lastName || !email)
    return { success: false, error: 'First name, last name, and email are required.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, error: 'Please enter a valid email address.' }
  if (!roomType)
    return { success: false, error: 'Please select an accommodation package to continue.' }

  // Fetch event to resolve SKU pricing
  let event: any
  try {
    event = await payload.findByID({ collection: 'events', id: eventId as number })
  } catch {
    return { success: false, error: 'Event not found. Please refresh and try again.' }
  }

  // Find pricing tier by packageKey (explicit), fall back to position index
  const tiers = event.pricingTiers ?? []
  const tier  = tiers.find((t: any) => t.packageKey === roomType)
             ?? tiers[ROOM_TYPE_INDEX[roomType] ?? 0]

  const amount      = tier?.priceAmount ?? parsePriceText(tier?.price ?? '')
  const currency    = (tier?.currency as string) ?? 'EUR'
  const packageName = (tier?.name as string) ?? roomType

  if (!amount || amount <= 0)
    return { success: false, error: 'Package pricing is not configured. Please contact us directly.' }

  // Create the order record (pending until payment webhook confirms)
  let registration: any
  try {
    registration = await payload.create({
      collection: 'event-registrations',
      data: {
        event:        eventId as number,
        status:       'pending',
        firstName,
        lastName,
        email,
        packageName,
        amountCharged: amount,
        currency,
        ...(phone        && { phone }),
        ...(country      && { country }),
        ...(organization && { organization }),
        ...(roomType     && { roomType: roomType as 'single' | 'sharing-double' | 'conference-only' }),
        ...(dietaryRequirements && { dietaryRequirements }),
        ...(message      && { message }),
      },
    })
  } catch (err) {
    console.error('Registration create error:', err)
    return { success: false, error: 'Could not create registration. Please try again.' }
  }

  const orderId = `SLAHAB-${registration.id}`

  // Write back the orderId so the Payload record is traceable before payment fires
  await payload.update({
    collection: 'event-registrations',
    id: registration.id,
    data: { payhereOrderId: orderId },
  })

  // Generate hash server-side — PAYHERE_SECRET never leaves the server
  const hash = generatePayhereHash(
    process.env.PAYHERE_MERCHANT_ID!,
    orderId,
    amount,
    currency,
    process.env.PAYHERE_SECRET!
  )

  return {
    success:        true,
    payhereReady:   true,
    orderId,
    registrationId: registration.id,
    hash,
    amount:         amount.toFixed(2),
    currency,
    packageName,
    eventTitle:     event.title as string,
    eventSlug:      slug,
    firstName,
    lastName,
    email,
    phone:          phone ?? '',
    country:        country ?? 'Sri Lanka',
  }
}
