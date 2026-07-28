import { getPayload } from 'payload'
import config from '@payload-config'
import { verifyInvoiceToken } from '@/lib/payhere'
import { NextRequest } from 'next/server'

// HTML-escape all user-supplied values before interpolating into the template
function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
}

function formatDateRange(start: string | null | undefined, end: string | null | undefined): string {
  if (!start) return '—'
  if (!end || start === end) return formatDate(start)
  const s = new Date(start)
  const e = new Date(end)
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()}–${e.getDate()} ${s.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`
  }
  return `${formatDate(start)} – ${formatDate(end)}`
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params

  // Verify the HMAC token — prevents enumeration of sequential order IDs
  const token = req.nextUrl.searchParams.get('t') ?? ''
  if (!verifyInvoiceToken(orderId, token)) {
    return new Response('Not found', { status: 404 })
  }

  const regId = parseInt(orderId.replace('SLAHAB-', ''), 10)
  if (isNaN(regId)) {
    return new Response('Not found', { status: 404 })
  }

  const payload = await getPayload({ config })

  let reg: any
  try {
    reg = await payload.findByID({
      collection: 'event-registrations',
      id: regId,
      depth: 2,
    })
  } catch {
    return new Response('Not found', { status: 404 })
  }

  if (!reg || reg.status !== 'confirmed') {
    return new Response('Invoice not available — payment not confirmed.', { status: 404 })
  }

  const event        = typeof reg.event === 'object' ? reg.event : null
  const eventTitle   = esc(event?.title ?? 'Event')
  const eventDateRange = esc(formatDateRange(event?.date, event?.endDate))
  const eventVenue   = esc(event?.location ?? 'Cinnamon Grand Hotel, Colombo, Sri Lanka')

  const invoiceDate    = esc(formatDate(reg.createdAt))
  const amount         = parseFloat(reg.amountCharged ?? 0)
  const amountFormatted = esc(amount.toLocaleString('en-US', { minimumFractionDigits: 2 }))

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${esc(orderId)} — SLAHAB</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: Georgia, 'Times New Roman', serif;
      color: #111;
      background: #fff;
      padding: 0;
    }

    @media print {
      .no-print { display: none !important; }
      body { padding: 0; }
      .page { box-shadow: none; margin: 0; max-width: 100%; }
    }

    @media screen {
      body { background: #f0efe9; padding: 40px 16px 60px; }
    }

    .page {
      max-width: 720px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 4px 40px rgba(0,0,0,0.08);
    }

    .header {
      background: #0a0a0a;
      padding: 36px 52px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .brand-name {
      color: #c29b57;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 5px;
      text-transform: uppercase;
    }
    .brand-sub {
      color: #555;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-family: Arial, sans-serif;
      margin-top: 4px;
    }
    .invoice-label { text-align: right; }
    .invoice-label .word {
      color: #c29b57;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 4px;
      text-transform: uppercase;
      font-family: Arial, sans-serif;
      display: block;
    }
    .invoice-label .number {
      color: #fff;
      font-size: 18px;
      font-weight: 400;
      font-family: monospace;
      display: block;
      margin-top: 4px;
    }

    .stripe { background: #c29b57; height: 3px; }

    .body { padding: 48px 52px; }

    .meta-row {
      display: flex;
      gap: 48px;
      margin-bottom: 40px;
      padding-bottom: 32px;
      border-bottom: 1px solid #ebebeb;
    }
    .meta-label {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #999;
      font-family: Arial, sans-serif;
      margin-bottom: 6px;
    }
    .meta-value {
      font-size: 14px;
      color: #111;
      line-height: 1.5;
      font-family: Arial, sans-serif;
    }

    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 0;
    }
    .items-table thead tr { border-bottom: 2px solid #111; }
    .items-table th {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #999;
      font-family: Arial, sans-serif;
      padding: 0 0 12px;
      text-align: left;
    }
    .items-table th:last-child { text-align: right; }
    .items-table td {
      padding: 20px 0;
      border-bottom: 1px solid #f0f0f0;
      font-family: Arial, sans-serif;
      font-size: 14px;
      vertical-align: top;
    }
    .items-table td:last-child { text-align: right; }
    .item-name { color: #111; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
    .item-desc { color: #888; font-size: 12px; line-height: 1.5; }

    .total-row {
      display: flex;
      justify-content: flex-end;
      padding-top: 20px;
    }
    .total-label {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #999;
      font-family: Arial, sans-serif;
      margin-bottom: 6px;
      text-align: right;
    }
    .total-amount {
      font-size: 28px;
      font-weight: 700;
      color: #c29b57;
      font-family: Arial, sans-serif;
    }

    .status-row {
      margin-top: 36px;
      padding-top: 32px;
      border-top: 1px solid #ebebeb;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(194,155,87,0.08);
      border: 1px solid rgba(194,155,87,0.3);
      padding: 8px 16px;
    }
    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #c29b57;
      flex-shrink: 0;
    }
    .status-text {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #c29b57;
      font-family: Arial, sans-serif;
    }
    .payment-id { font-size: 12px; color: #aaa; font-family: monospace; }

    .footer {
      background: #0a0a0a;
      padding: 28px 52px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 48px;
    }
    .footer-brand {
      color: #c29b57;
      font-size: 10px;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-family: Arial, sans-serif;
      margin-bottom: 4px;
    }
    .footer-detail { color: #555; font-size: 11px; font-family: Arial, sans-serif; line-height: 1.7; }

    .print-bar {
      background: #f9f9f7;
      border-top: 1px solid #e8e8e0;
      padding: 20px 52px;
      display: flex;
      justify-content: flex-end;
    }
    .btn-print {
      background: #c29b57;
      color: #000;
      border: none;
      padding: 12px 28px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      cursor: pointer;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
  <div class="page">

    <div class="print-bar no-print">
      <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
    </div>

    <div class="header">
      <div>
        <div class="brand-name">SLAHAB</div>
        <div class="brand-sub">Sri Lanka Association of Hairdressers &amp; Beauticians</div>
      </div>
      <div class="invoice-label">
        <span class="word">Invoice</span>
        <span class="number">${esc(orderId)}</span>
      </div>
    </div>
    <div class="stripe"></div>

    <div class="body">

      <div class="meta-row">
        <div>
          <div class="meta-label">Bill To</div>
          <div class="meta-value">
            ${esc(reg.firstName)} ${esc(reg.lastName)}<br>
            ${esc(reg.email)}${reg.organization ? `<br>${esc(reg.organization)}` : ''}
          </div>
        </div>
        <div>
          <div class="meta-label">Invoice Date</div>
          <div class="meta-value">${invoiceDate}</div>
        </div>
        <div>
          <div class="meta-label">Payment Method</div>
          <div class="meta-value">${esc(reg.paymentMethod ?? 'Card')}</div>
        </div>
      </div>

      <table class="items-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="item-name">${eventTitle}</div>
              <div class="item-desc">
                ${esc(reg.packageName ?? 'Registration')}<br>
                ${eventDateRange} &middot; ${eventVenue}
              </div>
            </td>
            <td>1</td>
            <td>${esc(reg.currency)} ${amountFormatted}</td>
          </tr>
        </tbody>
      </table>

      <div class="total-row">
        <div>
          <div class="total-label">Total Paid</div>
          <div class="total-amount">${esc(reg.currency)} ${amountFormatted}</div>
        </div>
      </div>

      <div class="status-row">
        <div class="status-badge">
          <div class="status-dot"></div>
          <span class="status-text">Payment Confirmed</span>
        </div>
        ${reg.payherePaymentId ? `<span class="payment-id">Txn: ${esc(reg.payherePaymentId)}</span>` : ''}
      </div>

    </div>

    <div class="footer">
      <div>
        <div class="footer-brand">SLAHAB</div>
        <div class="footer-detail">
          No 646, Galle Road, Colombo 3, Sri Lanka<br>
          Official OMC Representative &middot; ICD Sri Lanka Chapter &middot; Est. 1996
        </div>
      </div>
      <div style="text-align:right;">
        <div class="footer-detail" style="color:#444;">slahab1996@gmail.com</div>
        <div class="footer-detail" style="color:#444;">+94 770567359</div>
      </div>
    </div>

  </div>
</body>
</html>`

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // Prevent scripts from running in the invoice page
      'Content-Security-Policy': "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'none'; object-src 'none';",
    },
  })
}
