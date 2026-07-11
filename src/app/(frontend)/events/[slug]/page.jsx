import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Div from '@/app/ui/Div'
import Spacing from '@/app/ui/Spacing'
import RegisterForm from './RegisterForm'
import Icon from '@/app/ui/Icon'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  if (!docs.length) return { title: 'Event Not Found | SLAHAB' }
  const event = docs[0]
  return {
    title: `${event.title} | SLAHAB Events`,
    description: event.excerpt || `Join us for ${event.title}`,
  }
}

function formatDate(dateStr, opts = {}) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...opts,
  })
}

function formatDateRange(date, endDate) {
  if (!date) return ''
  const start = new Date(date)
  if (!endDate) return formatDate(date)
  const end = new Date(endDate)
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.getDate()} ${start.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`
  }
  return `${formatDate(date, { day: 'numeric', month: 'short' })} – ${formatDate(endDate)}`
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (!docs.length) notFound()

  const event = docs[0]
  const dateRange = formatDateRange(event.date, event.endDate)
  const imageUrl = event.featuredImage?.url ?? '/images/slahab/Poster 1.jpg'

  const hasProgram = event.program && event.program.length > 0
  const hasPricing = event.pricingTiers && event.pricingTiers.length > 0

  return (
    <div style={{ backgroundColor: '#fff' }}>
      {/* Editorial Hero Banner */}
      <div
        style={{
          position: 'relative',
          height: '75vh',
          minHeight: '600px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <img
          src={imageUrl}
          alt={event.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Dark sophisticated gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '80px' }}>
          {event.tag && (
            <span
              className="cs-primary_font"
              style={{
                display: 'inline-block',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                padding: '8px 20px',
                marginBottom: '24px',
              }}
            >
              {event.tag}
            </span>
          )}
          <h1
            className="cs-primary_font"
            style={{
              color: '#fff',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 400,
              lineHeight: 1.1,
              maxWidth: '900px',
              marginBottom: '32px',
            }}
          >
            {event.title}
          </h1>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', color: '#eaeaea', fontSize: '15px', fontWeight: 300, letterSpacing: '1px' }}>
            {dateRange && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon icon="ph:calendar-blank-light" style={{ fontSize: '20px', color: 'var(--accent)' }} />
                {dateRange}
              </span>
            )}
            {event.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon icon="ph:map-pin-light" style={{ fontSize: '20px', color: 'var(--accent)' }} />
                {event.location}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Div>
        <Spacing lg="100" md="60" />
        <div className="container">
          <div className="row">
            {/* Left: Details */}
            <div className="col-lg-7">
              {/* Refined Horizontal Info Bar */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '40px',
                  marginBottom: '60px',
                  paddingBottom: '40px',
                  borderBottom: '1px solid #eaeaea',
                }}
              >
                {dateRange && (
                  <InfoBlock icon="ph:calendar-blank-light" label="Dates" value={dateRange} />
                )}
                {event.location && (
                  <InfoBlock icon="ph:map-pin-light" label="Venue" value={event.location} />
                )}
                {hasPricing && (
                  <InfoBlock
                    icon="ph:currency-eur-light"
                    label="Starting From"
                    value={event.pricingTiers[event.pricingTiers.length - 1]?.price ?? ''}
                  />
                )}
                {event.registrationDeadline && (
                  <InfoBlock
                    icon="ph:clock-light"
                    label="Register By"
                    value={formatDate(event.registrationDeadline)}
                  />
                )}
              </div>

              {/* Description */}
              {event.excerpt && (
                <p
                  style={{
                    fontSize: '19px',
                    color: '#333',
                    lineHeight: 1.9,
                    fontWeight: 300,
                    marginBottom: '60px',
                  }}
                >
                  {event.excerpt}
                </p>
              )}

              {/* Program Schedule - Editorial Vertical Timeline */}
              {hasProgram && (
                <div style={{ marginBottom: '80px' }}>
                  <h2
                    className="cs-primary_font"
                    style={{
                      fontSize: '32px',
                      fontWeight: 400,
                      color: '#111',
                      marginBottom: '40px',
                      letterSpacing: '1px',
                    }}
                  >
                    Event Program
                  </h2>
                  <div style={{ position: 'relative', borderLeft: '1px solid var(--accent)', paddingLeft: '40px' }}>
                    {event.program.map((day, di) => (
                      <div key={di} style={{ marginBottom: di === event.program.length - 1 ? '0' : '60px' }}>
                        <div
                          style={{
                            position: 'absolute',
                            left: '-6px',
                            width: '11px',
                            height: '11px',
                            backgroundColor: 'var(--accent)',
                            borderRadius: '50%',
                            marginTop: '8px',
                          }}
                        />
                        <div style={{ marginBottom: '24px' }}>
                          <h3 className="cs-primary_font" style={{ color: '#111', fontSize: '22px', fontWeight: 600, margin: '0 0 4px 0' }}>
                            {day.dayTitle}
                          </h3>
                          {day.dayDate && (
                            <span style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                              {formatDate(day.dayDate, { day: 'numeric', month: 'long' })}
                            </span>
                          )}
                        </div>
                        
                        {day.activities && day.activities.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {day.activities.map((act, ai) => (
                              <div key={ai} style={{ display: 'flex', gap: '30px' }}>
                                {act.time && (
                                  <div
                                    style={{
                                      minWidth: '100px',
                                      color: '#888',
                                      fontSize: '13px',
                                      fontWeight: 500,
                                      letterSpacing: '1px',
                                      paddingTop: '3px',
                                    }}
                                  >
                                    {act.time}
                                  </div>
                                )}
                                <div>
                                  <h4
                                    style={{
                                      fontWeight: 600,
                                      color: '#222',
                                      fontSize: '16px',
                                      marginBottom: act.description ? '8px' : 0,
                                    }}
                                  >
                                    {act.title}
                                  </h4>
                                  {act.description && (
                                    <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                                      {act.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Tiers - Minimalist Luxury Cards */}
              {hasPricing && (
                <div style={{ marginBottom: '80px' }}>
                  <h2
                    className="cs-primary_font"
                    style={{
                      fontSize: '32px',
                      fontWeight: 400,
                      color: '#111',
                      marginBottom: '40px',
                      letterSpacing: '1px',
                    }}
                  >
                    Pricing Packages
                  </h2>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '30px',
                    }}
                  >
                    {event.pricingTiers.map((tier, ti) => (
                      <div
                        key={ti}
                        style={{
                          border: ti === 0 ? '1px solid var(--accent)' : '1px solid #eaeaea',
                          padding: '40px 30px',
                          position: 'relative',
                          backgroundColor: '#fff',
                          textAlign: 'center',
                        }}
                      >
                        {ti === 0 && (
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              backgroundColor: '#fff',
                              padding: '0 10px',
                            }}
                          >
                            <span
                              style={{
                                color: 'var(--accent)',
                                fontSize: '10px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                              }}
                            >
                              Popular
                            </span>
                          </div>
                        )}
                        <h3
                          style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            color: '#111',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '20px',
                          }}
                        >
                          {tier.name}
                        </h3>
                        <p
                          className="cs-primary_font"
                          style={{
                            fontSize: '36px',
                            fontWeight: 400,
                            color: 'var(--accent)',
                            marginBottom: '20px',
                          }}
                        >
                          {tier.price}
                        </p>
                        {tier.includes && (
                          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.8, fontWeight: 300 }}>
                            {tier.includes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Block - Sophisticated Minimal */}
              {(event.contactName || event.contactEmail || event.contactPhone) && (
                <div style={{ padding: '40px 0', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', marginBottom: '60px' }}>
                  <h3 className="cs-primary_font" style={{ fontSize: '22px', fontWeight: 400, color: '#111', marginBottom: '24px' }}>
                    Contact & Enquiries
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {event.contactName && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Icon icon="ph:user-light" style={{ fontSize: '18px', color: 'var(--accent)' }} />
                        <span style={{ color: '#444', fontWeight: 300, fontSize: '15px' }}>{event.contactName}</span>
                      </div>
                    )}
                    {event.contactPhone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Icon icon="ph:phone-light" style={{ fontSize: '18px', color: 'var(--accent)' }} />
                        <a href={`tel:${event.contactPhone}`} style={{ color: '#444', fontWeight: 300, fontSize: '15px', textDecoration: 'none' }}>
                          {event.contactPhone}
                        </a>
                      </div>
                    )}
                    {event.contactEmail && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Icon icon="ph:envelope-simple-light" style={{ fontSize: '18px', color: 'var(--accent)' }} />
                        <a href={`mailto:${event.contactEmail}`} style={{ color: '#444', fontWeight: 300, fontSize: '15px', textDecoration: 'none' }}>
                          {event.contactEmail}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Registration Form */}
            <div className="col-lg-4 offset-lg-1">
              <div
                style={{
                  position: 'sticky',
                  top: '120px',
                  backgroundColor: '#0a0a0a',
                  padding: '50px 40px',
                  border: '1px solid rgba(194, 155, 87, 0.4)',
                }}
              >
                <h2
                  className="cs-primary_font"
                  style={{
                    color: '#fff',
                    fontSize: '28px',
                    fontWeight: 400,
                    marginBottom: '12px',
                    letterSpacing: '1px',
                  }}
                >
                  Reserve Your Spot
                </h2>
                <p style={{ color: '#888', fontSize: '14px', fontWeight: 300, lineHeight: 1.6, marginBottom: '32px' }}>
                  Fill in the form below and our team will confirm your registration.
                </p>

                {event.registrationLink ? (
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#ccc', marginBottom: '24px', fontSize: '14px', fontWeight: 300 }}>
                      Registration is handled via our official portal.
                    </p>
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        backgroundColor: 'var(--accent)',
                        color: '#000',
                        fontSize: '13px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        padding: '16px 32px',
                        textDecoration: 'none',
                        transition: 'opacity 0.3s',
                      }}
                    >
                      Register Now
                    </a>
                  </div>
                ) : (
                  <RegisterForm eventId={String(event.id)} pricingTiers={event.pricingTiers} />
                )}
              </div>
            </div>
          </div>
        </div>
        <Spacing lg="120" md="80" />
      </Div>
    </div>
  )
}

function InfoBlock({ icon, label, value }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <Icon icon={icon} style={{ fontSize: '22px', color: 'var(--accent)' }} />
        <span style={{ color: '#888', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>
          {label}
        </span>
      </div>
      <p className="cs-primary_font" style={{ color: '#111', fontSize: '20px', margin: 0 }}>
        {value}
      </p>
    </div>
  )
}
