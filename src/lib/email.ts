import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

interface ConfirmationEmailParams {
  to: string
  firstName: string
  lastName: string
  orderId: string
  packageName: string
  amount: number
  currency: string
  eventTitle: string
  eventDateRange: string
  eventVenue: string
  invoicePdf: Buffer
}

export async function sendConfirmationEmail(params: ConfirmationEmailParams) {
  const {
    to, firstName, lastName, orderId, packageName,
    amount, currency, eventTitle, eventDateRange, eventVenue, invoicePdf,
  } = params

  const amountFormatted = esc(amount.toLocaleString('en-US', { minimumFractionDigits: 2 }))
  const from = process.env.RESEND_FROM || 'onboarding@resend.dev'

  // Escape all values that came from user input or external data
  const eFirstName     = esc(firstName)
  const eLastName      = esc(lastName)
  const eOrderId       = esc(orderId)
  const ePackageName   = esc(packageName)
  const eCurrency      = esc(currency)
  const eEventTitle    = esc(eventTitle)
  const eEventDateRange = esc(eventDateRange)
  const eEventVenue    = esc(eventVenue)

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed — ${eOrderId}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;">

        <!-- Header -->
        <tr>
          <td style="background:#0a0a0a;padding:40px 48px;">
            <p style="margin:0;color:#c29b57;font-size:20px;font-weight:700;letter-spacing:5px;text-transform:uppercase;font-family:Georgia,serif;">SLAHAB</p>
            <p style="margin:6px 0 0;color:#555;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Sri Lanka Association of Hairdressers &amp; Beauticians</p>
          </td>
        </tr>

        <!-- Gold accent bar -->
        <tr><td style="background:#c29b57;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:48px 48px 32px;">
            <p style="margin:0 0 8px;color:#c29b57;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Order Confirmed</p>
            <h1 style="margin:0 0 24px;color:#111;font-size:26px;font-weight:400;font-family:Georgia,serif;">Dear ${eFirstName},</h1>
            <p style="margin:0 0 32px;color:#555;font-size:15px;line-height:1.8;font-family:Arial,sans-serif;">
              Your registration for <strong style="color:#111;">${eEventTitle}</strong> has been confirmed and payment received. We look forward to welcoming you in Colombo.
            </p>

            <!-- Receipt box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e4;margin-bottom:32px;">
              <tr><td style="padding:20px 24px 4px;">
                <p style="margin:0 0 16px;color:#c29b57;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">Booking Receipt</p>
              </td></tr>
              <tr><td style="padding:0 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#999;font-size:10px;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Reference</td>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#111;font-size:13px;text-align:right;font-family:monospace;">${eOrderId}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#999;font-size:10px;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Guest</td>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#111;font-size:14px;text-align:right;font-family:Arial,sans-serif;">${eFirstName} ${eLastName}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#999;font-size:10px;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Package</td>
                    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#111;font-size:14px;text-align:right;font-family:Arial,sans-serif;">${ePackageName}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#999;font-size:10px;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Amount Paid</td>
                    <td style="padding:10px 0;color:#c29b57;font-size:15px;font-weight:700;text-align:right;font-family:Arial,sans-serif;">${eCurrency} ${amountFormatted}</td>
                  </tr>
                </table>
              </td></tr>
              <tr><td style="padding:4px 24px 20px;">&nbsp;</td></tr>
            </table>

            <!-- Event details box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f7;border-left:3px solid #c29b57;margin-bottom:32px;">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 8px;color:#111;font-size:15px;font-weight:600;font-family:Georgia,serif;">${eEventTitle}</p>
                <p style="margin:0;color:#666;font-size:13px;line-height:1.8;font-family:Arial,sans-serif;">
                  &#128197; ${eEventDateRange}<br>
                  &#128205; ${eEventVenue}
                </p>
              </td></tr>
            </table>

            <!-- Invoice attached note -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e4;background:#faf8f4;margin-bottom:32px;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0;color:#666;font-size:13px;line-height:1.6;font-family:Arial,sans-serif;">
                    &#128206; Your official invoice <strong style="color:#111;">Invoice-${eOrderId}.pdf</strong> is attached to this email.
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin:0;color:#aaa;font-size:12px;line-height:1.8;font-family:Arial,sans-serif;">
              Please present your booking reference <strong style="color:#888;">${eOrderId}</strong> at event check-in.<br>
              Questions? Contact us at
              <a href="mailto:slahab1996@gmail.com" style="color:#c29b57;text-decoration:none;">slahab1996@gmail.com</a>
              or <a href="tel:+94770567359" style="color:#c29b57;text-decoration:none;">+94 77 0567359</a>.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0a0a0a;padding:28px 48px;">
            <p style="margin:0 0 4px;color:#c29b57;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-family:Arial,sans-serif;">SLAHAB</p>
            <p style="margin:0;color:#555;font-size:11px;line-height:1.7;font-family:Arial,sans-serif;">
              No 646, Galle Road, Colombo 3, Sri Lanka<br>
              Official OMC Representative · ICD Sri Lanka Chapter · Est. 1996
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: `Booking Confirmed — ${orderId} | ${eventTitle}`,
    html,
    attachments: [
      {
        filename: `Invoice-${orderId}.pdf`,
        content: invoicePdf,
      },
    ],
  })

  if (error) {
    console.error('[email] Failed to send confirmation:', error)
    throw error
  }

  console.log(`[email] Confirmation sent to ${to} — id: ${data?.id}`)
  return data
}
