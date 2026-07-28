'use client'
import { useActionState, useEffect, useRef, useState } from 'react'
import { registerForEvent } from './actions'
import Icon from '@/app/ui/Icon'

const inputStyle = {
  width: '100%',
  padding: '13px 15px',
  backgroundColor: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(194,155,87,0.22)',
  borderRadius: '7px',
  color: '#f4f1ea',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.25s, background-color 0.25s, box-shadow 0.25s',
  fontFamily: 'inherit',
  fontWeight: 400,
}

const labelStyle = {
  display: 'block',
  color: '#d8b878',
  fontSize: '10px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1.8px',
  marginBottom: '9px',
}

export default function RegisterForm({ eventId, eventSlug, pricingTiers }) {
  const [state, action, isPending] = useActionState(registerForEvent, null)

  // Payment state machine
  const [paymentStep, setPaymentStep] = useState('form')
  // 'form' | 'payment-loading' | 'payment-active' | 'completed' | 'dismissed' | 'error'
  const [paymentData, setPaymentData] = useState(null)
  const [paymentError, setPaymentError] = useState(null)
  const paymentInitiated = useRef(false)

  // Load the PayHere SDK directly on mount. We inject the script tag ourselves
  // instead of using next/script — its afterInteractive scheduler can silently
  // fail to inject over dev/proxy setups (e.g. ngrok with a degraded HMR socket),
  // leaving window.payhere undefined so the popup never opens.
  useEffect(() => {
    if (window.payhere || document.getElementById('payhere-sdk')) return
    const s = document.createElement('script')
    s.id = 'payhere-sdk'
    s.src = 'https://www.payhere.lk/lib/payhere.js'
    s.async = true
    document.body.appendChild(s)
  }, [])

  // When server action returns ready: build payment object, then poll until
  // window.payhere is available (handles both fresh load and cached script cases).
  useEffect(() => {
    if (!state?.payhereReady || paymentInitiated.current) return

    setPaymentStep('payment-loading')

    const origin  = window.location.origin
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin

    const data = {
      sandbox:      process.env.NEXT_PUBLIC_PAYHERE_SANDBOX === 'true',
      merchant_id:  process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID,
      return_url:   `${origin}/events/${state.eventSlug}?payment=success`,
      cancel_url:   `${origin}/events/${state.eventSlug}?payment=cancelled`,
      notify_url:   `${siteUrl}/api/payhere/notify`,
      order_id:     state.orderId,
      items:        `${state.eventTitle} — ${state.packageName}`.slice(0, 250),
      amount:       state.amount,
      currency:     state.currency,
      hash:         state.hash,
      first_name:   state.firstName,
      last_name:    state.lastName,
      email:        state.email,
      phone:        state.phone || '0000000000',
      address:      'N/A',
      city:         'Colombo',
      country:      state.country || 'Sri Lanka',
      custom_1:     state.eventSlug,
      custom_2:     String(state.registrationId),
    }

    setPaymentData(data)

    let cancelled = false
    const tryFire = () => {
      if (cancelled) return
      if (window.payhere) {
        firePayment(data)
      } else {
        setTimeout(tryFire, 100)
      }
    }
    tryFire()

    return () => { cancelled = true }
  }, [state?.payhereReady, state?.orderId])

  function firePayment(data) {
    if (paymentInitiated.current) return
    paymentInitiated.current = true

    window.payhere.onCompleted = () => {
      setPaymentStep('completed')
    }
    window.payhere.onDismissed = () => {
      setPaymentStep('dismissed')
      paymentInitiated.current = false
    }
    window.payhere.onError = (err) => {
      setPaymentError(typeof err === 'string' ? err : 'Payment could not be processed.')
      setPaymentStep('error')
      paymentInitiated.current = false
    }

    window.payhere.startPayment(data)
    setPaymentStep('payment-active')
  }

  // ── Completed: order receipt ──────────────────────────────────────────────
  if (paymentStep === 'completed') {
    return (
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div style={{ marginBottom: '28px' }}>
          <Icon
            icon="ph:check-circle-light"
            style={{ fontSize: '72px', color: 'var(--accent)' }}
          />
        </div>
        <p
          className="cs-primary_font"
          style={{
            color: 'var(--accent)',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '12px',
          }}
        >
          Order Confirmed
        </p>
        <h3
          className="cs-primary_font"
          style={{ color: '#fff', fontSize: '26px', fontWeight: 400, marginBottom: '32px' }}
        >
          You&apos;re registered!
        </h3>

        {/* Order receipt */}
        <div
          style={{
            textAlign: 'left',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <ReceiptRow label="Reference" value={state?.orderId} mono />
          <ReceiptRow label="Package" value={state?.packageName} />
          <ReceiptRow
            label="Amount Paid"
            value={`${state?.currency} ${parseFloat(state?.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            highlight
          />
          <ReceiptRow label="Email" value={state?.email} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            backgroundColor: 'rgba(194,155,87,0.06)',
            border: '1px solid rgba(194,155,87,0.2)',
            padding: '16px 18px',
            marginTop: '28px',
          }}
        >
          <Icon
            icon="ph:envelope-simple-light"
            style={{ fontSize: '18px', color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}
          />
          <p style={{ color: '#aaa', fontSize: '13px', fontWeight: 300, lineHeight: 1.7, margin: 0 }}>
            A confirmation and invoice have been sent to{' '}
            <span style={{ color: '#ccc' }}>{state?.email}</span>.
            Check your inbox for your booking details and printable invoice.
          </p>
        </div>
      </div>
    )
  }

  // ── Dismissed: payment not completed ─────────────────────────────────────
  if (paymentStep === 'dismissed') {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            backgroundColor: 'rgba(194,155,87,0.08)',
            border: '1px solid rgba(194,155,87,0.25)',
            padding: '18px 20px',
            marginBottom: '28px',
          }}
        >
          <Icon
            icon="ph:warning-light"
            style={{ fontSize: '22px', color: 'var(--accent)', flexShrink: 0, marginTop: '1px' }}
          />
          <div>
            <p style={{ color: '#eaeaea', fontSize: '14px', fontWeight: 400, marginBottom: '4px' }}>
              Payment not completed
            </p>
            <p style={{ color: '#888', fontSize: '13px', fontWeight: 300 }}>
              Your registration slot is held. Complete payment to confirm your spot.
            </p>
          </div>
        </div>

        <button
          onClick={() => firePayment(paymentData)}
          style={{
            width: '100%',
            padding: '18px',
            backgroundColor: 'var(--accent)',
            color: '#000',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            cursor: 'pointer',
            marginBottom: '16px',
            transition: 'opacity 0.3s',
          }}
        >
          Resume Payment
        </button>

        <button
          onClick={() => {
            setPaymentStep('form')
            setPaymentData(null)
            paymentInitiated.current = false
          }}
          style={{
            display: 'block',
            width: '100%',
            background: 'none',
            border: 'none',
            color: '#555',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            cursor: 'pointer',
            textAlign: 'center',
            padding: '8px',
            transition: 'color 0.2s',
          }}
        >
          Start Over
        </button>
      </div>
    )
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (paymentStep === 'error') {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            backgroundColor: 'rgba(255,80,80,0.06)',
            border: '1px solid rgba(255,80,80,0.2)',
            padding: '18px 20px',
            marginBottom: '28px',
          }}
        >
          <Icon
            icon="ph:x-circle-light"
            style={{ fontSize: '22px', color: '#ff6b6b', flexShrink: 0, marginTop: '1px' }}
          />
          <div>
            <p style={{ color: '#eaeaea', fontSize: '14px', fontWeight: 400, marginBottom: '4px' }}>
              Payment failed
            </p>
            <p style={{ color: '#888', fontSize: '13px', fontWeight: 300 }}>
              {paymentError || 'Something went wrong. Please try again or contact us.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setPaymentStep('form')
            setPaymentData(null)
            setPaymentError(null)
            paymentInitiated.current = false
          }}
          style={{
            width: '100%',
            padding: '18px',
            backgroundColor: 'var(--accent)',
            color: '#000',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            cursor: 'pointer',
            transition: 'opacity 0.3s',
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  // ── Form (default) + payment-loading/active overlay ───────────────────────
  const isPaymentLoading = paymentStep === 'payment-loading' || paymentStep === 'payment-active'
  const isProcessing = isPending || isPaymentLoading

  return (
    <>
      <style>{`
        .slahab-reg-form input::placeholder,
        .slahab-reg-form textarea::placeholder {
          color: rgba(244,241,234,0.38);
          font-weight: 300;
        }
        .slahab-reg-form input:focus,
        .slahab-reg-form textarea:focus,
        .slahab-reg-form select:focus {
          border-color: var(--accent);
          background-color: rgba(194,155,87,0.07);
          box-shadow: 0 0 0 3px rgba(194,155,87,0.14);
        }
        .slahab-reg-form input:hover,
        .slahab-reg-form textarea:hover,
        .slahab-reg-form select:hover {
          border-color: rgba(194,155,87,0.4);
        }
        .slahab-reg-form select option {
          background-color: #141210;
          color: #f4f1ea;
        }
      `}</style>

      <form action={action} className="slahab-reg-form" style={{ position: 'relative' }}>
        {/* Loading overlay while payment popup initialises */}
        {isPaymentLoading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(10,10,10,0.7)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              zIndex: 10,
              borderRadius: '2px',
            }}
          >
            <style>{`
              @keyframes ph-spin { to { transform: rotate(360deg); } }
              .ph-spin { animation: ph-spin 0.9s linear infinite; }
            `}</style>
            <Icon icon="ph:circle-notch-light" className="ph-spin" style={{ fontSize: '36px', color: 'var(--accent)' }} />
            <p
              className="cs-primary_font"
              style={{
                color: 'var(--accent)',
                fontSize: '10px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '3px',
              }}
            >
              Opening secure payment…
            </p>
          </div>
        )}

        <input type="hidden" name="eventId"   value={eventId} />
        <input type="hidden" name="eventSlug" value={eventSlug} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          <div>
            <label style={labelStyle}>First Name *</label>
            <input type="text" name="firstName" required style={inputStyle} placeholder="Jane" />
          </div>
          <div>
            <label style={labelStyle}>Last Name *</label>
            <input type="text" name="lastName" required style={inputStyle} placeholder="Doe" />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={labelStyle}>Email Address *</label>
          <input type="email" name="email" required style={inputStyle} placeholder="jane@example.com" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          <div>
            <label style={labelStyle}>Phone / WhatsApp</label>
            <input type="tel" name="phone" style={inputStyle} placeholder="+94 77 000 0000" />
          </div>
          <div>
            <label style={labelStyle}>Country</label>
            <input type="text" name="country" style={inputStyle} placeholder="Sri Lanka" />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={labelStyle}>Salon / Organization</label>
          <input type="text" name="organization" style={inputStyle} placeholder="Your salon name" />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={labelStyle}>Package *</label>
          <select
            name="roomType"
            required
            style={{
              ...inputStyle,
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23c29b57\' stroke-width=\'2\'><polyline points=\'6 9 12 15 18 9\'/></svg>")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 14px center',
              paddingRight: '40px',
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Select a package…
            </option>
            {pricingTiers && pricingTiers.length > 0 ? (
              pricingTiers.map((tier, i) => (
                <option
                  key={i}
                  value={tier.packageKey || (i === 0 ? 'single' : i === 1 ? 'sharing-double' : 'conference-only')}
                >
                  {tier.name}
                  {tier.price ? ` — ${tier.price}` : ''}
                </option>
              ))
            ) : (
              <>
                <option value="single">Single Room — €810 / person</option>
                <option value="sharing-double">Sharing Double Room — €640 / person</option>
                <option value="conference-only">Conference Only</option>
              </>
            )}
          </select>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={labelStyle}>Dietary Requirements</label>
          <textarea
            name="dietaryRequirements"
            rows={1}
            style={{ ...inputStyle, resize: 'vertical' }}
            placeholder="e.g. vegetarian, gluten-free…"
          />
        </div>

        <div style={{ marginBottom: '40px' }}>
          <label style={labelStyle}>Additional Notes</label>
          <textarea
            name="message"
            rows={2}
            style={{ ...inputStyle, resize: 'vertical' }}
            placeholder="Any special requests…"
          />
        </div>

        {state?.error && (
          <p
            style={{
              color: '#fff',
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderLeft: '2px solid var(--accent)',
              padding: '12px 16px',
              marginBottom: '30px',
              fontSize: '13px',
              fontWeight: 300,
            }}
          >
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          style={{
            width: '100%',
            padding: '18px',
            background: isProcessing
              ? '#181818'
              : 'linear-gradient(135deg, #e0c07f 0%, #c29b57 45%, #a8823f 100%)',
            color: isProcessing ? '#777' : '#1a1206',
            border: isProcessing ? '1px solid #2e2e2e' : 'none',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            boxShadow: isProcessing ? 'none' : '0 10px 24px -8px rgba(194,155,87,0.55)',
            transition: 'transform 0.2s, box-shadow 0.2s, filter 0.2s',
          }}
          onMouseEnter={e => { if (!isProcessing) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 30px -8px rgba(194,155,87,0.7)'; e.currentTarget.style.filter = 'brightness(1.05)' } }}
          onMouseLeave={e => { if (!isProcessing) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 24px -8px rgba(194,155,87,0.55)'; e.currentTarget.style.filter = 'brightness(1)' } }}
        >
          {isPending ? 'Processing…' : isPaymentLoading ? 'Opening Payment…' : 'Register & Pay'}
        </button>

        <div style={{ marginTop: '22px', textAlign: 'center' }}>
          <p
            style={{
              color: '#8a857c',
              fontSize: '11px',
              margin: '0 0 14px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Icon icon="ph:lock-simple-light" style={{ fontSize: '13px' }} />
            Secured by PayHere
          </p>
          {/* Accepted payment methods — official PayHere logo banner (responsive) */}
          <img
            src="/images/payhere/payhere-short-banner.png"
            alt="Accepted payment methods via PayHere: Visa, Mastercard, American Express, and more"
            width={580}
            height={120}
            className="slahab-payhere-badge"
            style={{ width: '100%', maxWidth: '250px', height: 'auto', display: 'block', margin: '0 auto', opacity: 0.95 }}
          />
        </div>
      </form>
    </>
  )
}

function ReceiptRow({ label, value, mono, highlight }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
      <span
        style={{
          color: '#666',
          fontSize: '10px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: highlight ? 'var(--accent)' : '#eaeaea',
          fontSize: mono ? '13px' : '14px',
          fontWeight: mono ? 400 : 300,
          fontFamily: mono ? 'monospace' : 'inherit',
          textAlign: 'right',
          wordBreak: 'break-all',
        }}
      >
        {value}
      </span>
    </div>
  )
}
