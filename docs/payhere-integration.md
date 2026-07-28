# PayHere Integration Reference — SLAHAB

## Credentials

| Key | Value |
|-----|-------|
| Merchant ID | `1237165` |
| Domain | `slahab.lk` |
| Sandbox Secret | Store in env var `PAYHERE_SECRET` — never in code. Per-domain; get it from sandbox.payhere.lk → Domains & Credentials |
| Live Secret | Store in env var `PAYHERE_SECRET` — never in code |

## Endpoints

| Mode | Checkout URL |
|------|-------------|
| Sandbox | `https://sandbox.payhere.lk/pay/checkout` |
| Live | `https://www.payhere.lk/pay/checkout` |

JS SDK src (sandbox): same file, mode controlled by endpoint used in payment object.

## Hash Generation (SERVER-SIDE ONLY)

```
hash = toUpperCase( md5( merchant_id + order_id + formatted_amount + currency + toUpperCase(md5(merchant_secret)) ) )
```

Amount must be formatted to 2 decimal places with no commas: `810.00`

### Node.js implementation
```ts
import crypto from 'crypto'

export function generatePayhereHash(
  merchantId: string,
  orderId: string,
  amount: number,
  currency: string,
  merchantSecret: string
): string {
  const hashedSecret = crypto
    .createHash('md5')
    .update(merchantSecret)
    .digest('hex')
    .toUpperCase()

  const formattedAmount = amount.toFixed(2)

  return crypto
    .createHash('md5')
    .update(merchantId + orderId + formattedAmount + currency + hashedSecret)
    .digest('hex')
    .toUpperCase()
}
```

## Notify URL Webhook — Incoming POST fields

| Field | Description |
|-------|-------------|
| `merchant_id` | Our merchant ID |
| `order_id` | The order_id we sent |
| `payment_id` | PayHere unique payment ID |
| `payhere_amount` | Amount charged |
| `payhere_currency` | Currency used |
| `status_code` | 2=Success, 0=Pending, -1=Cancelled, -2=Failed, -3=Chargedback |
| `md5sig` | Verification hash (verify before trusting) |
| `custom_1` | Our custom data (we use: event slug) |
| `custom_2` | Our custom data (we use: registration ID) |
| `method` | VISA / MASTER / AMEX / etc. |
| `card_holder_name` | Name on card |
| `card_no` | Masked e.g. `************4564` |

## Notify URL Verification (SERVER-SIDE)

```ts
const localSig = crypto
  .createHash('md5')
  .update(
    merchant_id + order_id + payhere_amount + payhere_currency +
    status_code + crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase()
  )
  .digest('hex')
  .toUpperCase()

const isValid = localSig === md5sig && status_code === '2'
```

## Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| `2` | **Success** | Confirm registration in Payload |
| `0` | Pending | Wait for next notification |
| `-1` | Cancelled by user | No action |
| `-2` | Failed | Log, no action |
| `-3` | Chargedback | Flag in Payload, investigate |

## Currencies Supported
LKR, USD, GBP, **EUR**, AUD — EUR works for international delegates.

## Sandbox Test Cards

| Result | Visa | Master |
|--------|------|--------|
| ✅ Success | `4916217501611292` | `5307732125531191` |
| ❌ Insufficient funds | `4024007194349121` | `5459051433777487` |
| ❌ Do not honor | `4929768900837248` | `5388172137367973` |

CVV and expiry: any valid values work in sandbox.

## notify_url Constraint
- Must be a **public URL** (not localhost)
- Use Railway deployed URL for testing notify webhook
- Local dev: use `ngrok` or just test on deployed app

---

## SLAHAB Implementation Plan

### Chosen Approach: JavaScript SDK (Onsite Popup)

**Why not redirect checkout:**
- Redirect sends user away from SLAHAB site — poor UX for premium event brand
- No way to know payment result client-side without polling

**Why JS SDK (onsite):**
- PayHere popup overlays on the SLAHAB event page — user never leaves
- Callbacks: `onCompleted`, `onDismissed`, `onError`
- Still uses same notify_url webhook for server confirmation
- Industry standard for embedded payment on event registration pages

### Flow

```
1. User fills RegisterForm on /events/[slug]
2. Form submits → Server Action (actions.ts):
   a. Creates EventRegistration in Payload with status: 'pending'
   b. Returns { registrationId, hash } to client
3. Client receives registrationId + hash
4. Client calls payhere.startPayment({ ...formData, order_id: registrationId, hash })
5. PayHere popup opens — user enters card
6. PayHere POSTs to /api/payhere/notify (our webhook)
7. Webhook:
   a. Verifies md5sig
   b. If status_code === '2': updates EventRegistration status → 'confirmed' in Payload
   c. Returns HTTP 200
8. payhere.onCompleted fires on client → show success UI
```

### Files to Create/Modify

| File | Action |
|------|--------|
| `src/app/api/payhere/notify/route.ts` | Webhook — verify sig, update Payload |
| `src/app/api/payhere/hash/route.ts` | Server endpoint to generate hash securely |
| `src/app/(frontend)/events/[slug]/RegisterForm.jsx` | Add PayHere JS SDK + trigger payment |
| `src/app/(frontend)/events/[slug]/actions.ts` | Return registrationId after creation |
| `.env.local` | Add `PAYHERE_SECRET`, `PAYHERE_MERCHANT_ID`, `NEXT_PUBLIC_PAYHERE_SANDBOX=true` |

### Environment Variables Needed

```env
PAYHERE_MERCHANT_ID=1237165
PAYHERE_SECRET=<your-domain-specific-secret>   # from sandbox.payhere.lk, per-domain
NEXT_PUBLIC_PAYHERE_SANDBOX=true   # set to false for live
```
