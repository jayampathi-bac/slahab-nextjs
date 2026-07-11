'use client'
import { useActionState } from 'react'
import { registerForEvent } from './actions'
import Icon from '@/app/ui/Icon'

const inputStyle = {
  width: '100%',
  padding: '12px 0',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  color: '#fff',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s',
  fontFamily: 'inherit',
  fontWeight: 300,
}

const labelStyle = {
  display: 'block',
  color: '#888',
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '2px',
  marginBottom: '4px',
}

export default function RegisterForm({ eventId, pricingTiers }) {
  const [state, action, isPending] = useActionState(registerForEvent, null)

  if (state?.success) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Icon icon="ph:check-circle-light" style={{ fontSize: '64px', color: 'var(--accent)', marginBottom: '24px' }} />
        <h3 className="cs-primary_font" style={{ color: '#fff', fontSize: '28px', fontWeight: 400, marginBottom: '16px' }}>
          Registration Received
        </h3>
        <p style={{ color: '#aaa', fontSize: '15px', lineHeight: 1.8, fontWeight: 300 }}>
          Thank you for registering. We&apos;ll review your application and confirm your participation shortly.
        </p>
      </div>
    )
  }

  return (
    <form action={action}>
      <input type="hidden" name="eventId" value={eventId} />

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
        <label style={labelStyle}>Accommodation Preference</label>
        <select
          name="roomType"
          style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundColor: '#0a0a0a', color: '#fff' }}
          defaultValue=""
        >
          <option value="" disabled style={{ color: '#666' }}>
            Select a package…
          </option>
          {pricingTiers && pricingTiers.length > 0 ? (
            pricingTiers.map((tier, i) => (
              <option
                key={i}
                value={
                  i === 0 ? 'single' : i === 1 ? 'sharing-double' : 'conference-only'
                }
              >
                {tier.name} – {tier.price}
              </option>
            ))
          ) : (
            <>
              <option value="single">Single Room – €810</option>
              <option value="sharing-double">Sharing Double Room – €640</option>
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
        disabled={isPending}
        style={{
          width: '100%',
          padding: '18px',
          backgroundColor: isPending ? '#111' : 'var(--accent)',
          color: isPending ? '#888' : '#000',
          border: isPending ? '1px solid #333' : 'none',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.3s',
        }}
      >
        {isPending ? 'Submitting…' : 'Register Now'}
      </button>

      <p style={{ color: '#666', fontSize: '11px', textAlign: 'center', marginTop: '20px', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '1px' }}>
        Secure Your Registration
      </p>
    </form>
  )
}
