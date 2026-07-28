import { getPayload } from 'payload'
import config from '@payload-config'
import { verifyPayhereNotification } from '@/lib/payhere'
import { sendConfirmationEmail } from '@/lib/email'
import { generateInvoicePdf } from '@/lib/invoice-pdf'

export async function POST(req: Request) {
  let body: FormData
  try {
    body = await req.formData()
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  const get = (k: string): string => (body.get(k) as string) ?? ''

  const merchant_id      = get('merchant_id')
  const order_id         = get('order_id')
  const payhere_amount   = get('payhere_amount')
  const payhere_currency = get('payhere_currency')
  const status_code      = get('status_code')
  const md5sig           = get('md5sig')
  const payment_id       = get('payment_id')
  const method           = get('method')
  const card_holder      = get('card_holder_name')

  const secret = process.env.PAYHERE_SECRET
  if (!secret) {
    console.error('[payhere/notify] PAYHERE_SECRET not configured')
    return new Response('OK', { status: 200 })
  }

  // Reject requests with invalid signature
  const valid = verifyPayhereNotification(
    { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig },
    secret
  )
  if (!valid) {
    console.warn('[payhere/notify] Invalid signature for order', order_id)
    return new Response('Forbidden', { status: 400 })
  }

  // order_id format: SLAHAB-{registrationId}
  const regId = parseInt(order_id.replace('SLAHAB-', ''), 10)
  if (isNaN(regId)) {
    console.warn('[payhere/notify] Unrecognised order_id:', order_id)
    return new Response('OK', { status: 200 })
  }

  if (status_code === '2') {
    try {
      const payload = await getPayload({ config })

      // Idempotency: skip if already confirmed
      const existing = await payload.findByID({
        collection: 'event-registrations',
        id: regId,
      })

      if (existing.status !== 'confirmed') {
        // Verify paid amount and currency match what was charged — reject underpayments
        const paidAmount      = parseFloat(payhere_amount)
        const expectedAmount  = parseFloat(String(existing.amountCharged ?? 0))
        const expectedCurrency = (existing.currency as string) ?? ''
        if (Math.abs(paidAmount - expectedAmount) > 0.01 || payhere_currency !== expectedCurrency) {
          console.warn(
            `[payhere/notify] Amount/currency mismatch for order ${order_id}:`,
            { expected: `${expectedAmount} ${expectedCurrency}`, got: `${paidAmount} ${payhere_currency}` }
          )
          return new Response('OK', { status: 200 })
        }

        await payload.update({
          collection: 'event-registrations',
          id: regId,
          data: {
            status:           'confirmed',
            payherePaymentId: payment_id,
            paymentMethod:    method || null,
            cardHolderName:   card_holder || null,
          },
        })
        console.log(`[payhere/notify] Registration ${regId} confirmed — payment ${payment_id}`)

        // Fetch with populated event for the email
        const confirmed = await payload.findByID({
          collection: 'event-registrations',
          id: regId,
          depth: 2,
        })

        const event = typeof confirmed.event === 'object' ? confirmed.event as any : null
        const eventTitle = event?.title ?? 'SLAHAB Event'
        const eventVenue = event?.location ?? 'Cinnamon Grand Hotel, Colombo, Sri Lanka'

        const startDate = event?.date ? new Date(event.date) : null
        const endDate   = event?.endDate ? new Date(event.endDate) : null
        const fmtDate   = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        let eventDateRange = startDate ? fmtDate(startDate) : '—'
        if (endDate && startDate && endDate.getTime() !== startDate.getTime()) {
          if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
            eventDateRange = `${startDate.getDate()}–${fmtDate(endDate)}`
          } else {
            eventDateRange = `${fmtDate(startDate)} – ${fmtDate(endDate)}`
          }
        }

        const invoiceDate = confirmed.createdAt
          ? new Date(confirmed.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
          : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })

        try {
          // Generate the invoice PDF server-side and attach it to the email
          const invoicePdf = await generateInvoicePdf({
            orderId:        order_id,
            firstName:      confirmed.firstName as string,
            lastName:       confirmed.lastName as string,
            email:          confirmed.email as string,
            organization:   (confirmed.organization as string) ?? null,
            invoiceDate,
            paymentMethod:  (confirmed.paymentMethod as string) ?? 'Card',
            paymentId:      payment_id || null,
            eventTitle,
            eventDateRange,
            eventVenue,
            packageName:    (confirmed.packageName as string) ?? 'Registration',
            amount:         parseFloat(String(confirmed.amountCharged ?? 0)),
            currency:       (confirmed.currency as string) ?? 'LKR',
          })

          await sendConfirmationEmail({
            to:             confirmed.email as string,
            firstName:      confirmed.firstName as string,
            lastName:       confirmed.lastName as string,
            orderId:        order_id,
            packageName:    (confirmed.packageName as string) ?? 'Registration',
            amount:         parseFloat(String(confirmed.amountCharged ?? 0)),
            currency:       (confirmed.currency as string) ?? 'LKR',
            eventTitle,
            eventDateRange,
            eventVenue,
            invoicePdf,
          })
        } catch (emailErr) {
          // Non-fatal: log and continue — registration is already confirmed
          console.error('[payhere/notify] Email/PDF failed (non-fatal):', emailErr)
        }
      } else {
        console.log(`[payhere/notify] Registration ${regId} already confirmed, skipping`)
      }
    } catch (err) {
      console.error('[payhere/notify] Failed to update registration:', err)
      // Still return 200 — PayHere will retry on non-200, causing loops
    }
  } else {
    // status 0=pending, -1=cancelled, -2=failed, -3=chargedback
    console.log(`[payhere/notify] order ${order_id} status ${status_code} — no action`)
  }

  // PayHere requires HTTP 200; any other code triggers retries
  return new Response('OK', { status: 200 })
}
