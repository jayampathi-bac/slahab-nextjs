'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function registerForEvent(_prevState: unknown, formData: FormData) {
  const payload = await getPayload({ config })

  const eventIdStr = formData.get('eventId') as string
  const eventId = !isNaN(Number(eventIdStr)) ? Number(eventIdStr) : eventIdStr
  const firstName = (formData.get('firstName') as string)?.trim()
  const lastName = (formData.get('lastName') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()
  const country = (formData.get('country') as string)?.trim()
  const organization = (formData.get('organization') as string)?.trim()
  const roomType = formData.get('roomType') as string
  const dietaryRequirements = (formData.get('dietaryRequirements') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!firstName || !lastName || !email) {
    return { success: false, error: 'First name, last name, and email are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  try {
    await payload.create({
      collection: 'event-registrations',
      data: {
        event: eventId,
        firstName,
        lastName,
        email,
        ...(phone && { phone }),
        ...(country && { country }),
        ...(organization && { organization }),
        ...(roomType && { roomType: roomType as 'single' | 'sharing-double' | 'conference-only' }),
        ...(dietaryRequirements && { dietaryRequirements }),
        ...(message && { message }),
      },
    })
    return { success: true }
  } catch (err) {
    console.error('Event registration error:', err)
    return { success: false, error: 'Registration failed. Please try again or contact us directly.' }
  }
}
