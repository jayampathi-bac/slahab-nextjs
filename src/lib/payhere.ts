import crypto from 'crypto'

// HMAC-signed token that proves a given orderId was issued by this server.
// Used to gate the public invoice URL without a DB lookup — no session required.
export function generateInvoiceToken(orderId: string): string {
  const secret = process.env.PAYLOAD_SECRET
  if (!secret) throw new Error('PAYLOAD_SECRET not set')
  return crypto.createHmac('sha256', secret).update(orderId).digest('base64url')
}

export function verifyInvoiceToken(orderId: string, token: string): boolean {
  try {
    const expected = Buffer.from(generateInvoiceToken(orderId))
    const actual   = Buffer.from(token)
    if (expected.length !== actual.length) return false
    return crypto.timingSafeEqual(expected, actual)
  } catch {
    return false
  }
}

export function generatePayhereHash(
  merchantId: string,
  orderId: string,
  amount: number,
  currency: string,
  merchantSecret: string
): string {
  const secretHash = crypto
    .createHash('md5')
    .update(merchantSecret)
    .digest('hex')
    .toUpperCase()

  return crypto
    .createHash('md5')
    .update(merchantId + orderId + amount.toFixed(2) + currency + secretHash)
    .digest('hex')
    .toUpperCase()
}

export function verifyPayhereNotification(
  params: {
    merchant_id: string
    order_id: string
    payhere_amount: string
    payhere_currency: string
    status_code: string
    md5sig: string
  },
  merchantSecret: string
): boolean {
  const secretHash = crypto
    .createHash('md5')
    .update(merchantSecret)
    .digest('hex')
    .toUpperCase()

  const expected = crypto
    .createHash('md5')
    .update(
      params.merchant_id +
        params.order_id +
        params.payhere_amount +
        params.payhere_currency +
        params.status_code +
        secretHash
    )
    .digest('hex')
    .toUpperCase()

  return expected === params.md5sig
}
