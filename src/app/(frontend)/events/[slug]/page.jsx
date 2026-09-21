import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Div from '@/app/ui/Div'
import Spacing from '@/app/ui/Spacing'
import SectionHeading from '@/app/ui/SectionHeading'
import Cta from '@/app/ui/Cta'
import Accordion from '@/app/ui/Accordion'
import RegisterForm from './RegisterForm'
import FloatingRegisterCta from './FloatingRegisterCta'
import GalleryGrid from './GalleryGrid'
import Icon from '@/app/ui/Icon'
import { siteConfig } from '@/lib/siteConfig'

export const dynamic = 'force-dynamic'

function isSafeUrl(url) {
  try {
    const { protocol } = new URL(url)
    return protocol === 'https:' || protocol === 'http:'
  } catch {
    return false
  }
}

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
    alternates: { canonical: `/events/${slug}` },
    openGraph: { url: `/events/${slug}` },
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

const INCLUDED_ICONS = [
  'ph:bed-light',
  'ph:coffee-light',
  'ph:ticket-light',
  'ph:gift-light',
  'ph:certificate-light',
  'ph:users-three-light',
]

export default async function EventDetailPage({ params }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  if (!docs.length) notFound()

  const event = docs[0]
  const isPast = event.status === 'past'
  const dateRange = formatDateRange(event.date, event.endDate)
  const imageUrl = event.featuredImage?.url ?? '/images/slahab/Poster 1.jpg'

  const hasProgram = event.program && event.program.length > 0
  const hasPricing = event.pricingTiers && event.pricingTiers.length > 0
  const hasIncluded = event.included && event.included.length > 0
  const hasGallery = event.gallery && event.gallery.length > 0
  const hasFaq = event.faq && event.faq.length > 0
  const hasContact = event.contactName || event.contactEmail || event.contactPhone

  // Derived stats for the highlight strip
  const days = hasProgram ? event.program.length : 0
  const sessions = hasProgram
    ? event.program.reduce((n, d) => n + (d.activities?.length || 0), 0)
    : 0
  const packages = hasPricing ? event.pricingTiers.length : 0
  const stats = [
    days && { value: String(days), label: days === 1 ? 'Day' : 'Days' },
    sessions && { value: `${sessions}`, label: 'Sessions' },
    packages && { value: String(packages), label: packages === 1 ? 'Package' : 'Packages' },
    { value: '1996', label: 'Established' },
  ].filter(Boolean)

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.excerpt || event.title,
    startDate: event.date,
    endDate: event.endDate || event.date,
    eventStatus: isPast
      ? 'https://schema.org/EventEnded'
      : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: imageUrl,
    organizer: {
      '@type': 'Organization',
      name: 'SLAHAB',
      url: siteConfig.url,
    },
    ...(event.venue && {
      location: {
        '@type': 'Place',
        name: event.venue,
        address: { '@type': 'PostalAddress', addressCountry: 'LK' },
      },
    }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Events', item: `${siteConfig.url}/events` },
      { '@type': 'ListItem', position: 3, name: event.title, item: `${siteConfig.url}/events/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
    <div className="slahab-event-page" style={{ backgroundColor: '#fff' }}>
      <style>{`
        .slahab-event-page .cs-section_subtitle {
          color: var(--accent) !important;
          font-size: 12px !important;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 14px !important;
        }
        .slahab-event-page .cs-section_title {
          font-size: 42px;
          line-height: 1.2;
        }
        @media (max-width: 991px) {
          .slahab-event-page .cs-section_title { font-size: 30px; line-height: 1.18; }
          .slahab-overview-image-col { display: none !important; }

          /* Gold line before subtitle on mobile */
          .slahab-event-page .cs-section_subtitle::before {
            content: '';
            display: inline-block;
            width: 22px;
            height: 2px;
            background: var(--accent);
            vertical-align: middle;
            margin-right: 8px;
            margin-bottom: 2px;
          }

          /* Premium entry bar for overview section */
          .slahab-overview-section {
            border-top: 2px solid var(--accent);
            background: linear-gradient(180deg, #faf7f2 0%, #ffffff 100px);
          }

          /* Premium facts card on mobile */
          .slahab-quickfacts {
            display: flex !important;
            flex-direction: row !important;
            grid-template-columns: unset !important;
            gap: 0 !important;
            border: 1px solid rgba(194,155,87,0.25) !important;
            border-radius: 16px !important;
            overflow: hidden;
            background: linear-gradient(135deg, #fdf9f2 0%, #fff 70%) !important;
            box-shadow: 0 10px 36px -16px rgba(0,0,0,0.13) !important;
          }
          .slahab-quickfacts > div {
            flex: 1;
            padding: 18px 16px !important;
          }
          .slahab-quickfacts > div:not(:last-child) {
            border-right: 1px solid rgba(194,155,87,0.25);
          }
        }
        @media (max-width: 575px) {
          .slahab-event-page .cs-section_title { font-size: 26px; }
        }
      `}</style>
      {/* ── Editorial Hero ──────────────────────────────────────────── */}
      <div style={{ position: 'relative', height: '78vh', minHeight: '620px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <img src={imageUrl} alt={event.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.45) 48%, rgba(10,10,10,0.15) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '84px' }}>
          {event.tag && (
            <span className="cs-primary_font" style={{ display: 'inline-block', border: '1px solid var(--accent)', color: 'var(--accent)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', padding: '8px 20px', marginBottom: '24px' }}>
              {event.tag}
            </span>
          )}
          <h1 className="cs-primary_font" style={{ color: '#fff', fontSize: 'clamp(36px, 6vw, 74px)', fontWeight: 400, lineHeight: 1.08, maxWidth: '960px', marginBottom: '32px' }}>
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

      {/* ── Overview + stat strip ────────────────────────────────────── */}
      <Div className="cs-light_mode slahab-overview-section">
        <div style={{ height: 'clamp(52px, 8vw, 80px)' }} />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <SectionHeading subtitle="About the Event" title="An unmissable international gathering">
                <div style={{ height: '24px' }} />
                {event.excerpt && (
                  <p style={{ color: '#4a4a4a', fontSize: 'clamp(16px, 4vw, 18px)', lineHeight: 1.9, fontWeight: 400, margin: 0 }}>{event.excerpt}</p>
                )}
                <div style={{ height: '28px' }} />
                <Div className="cs-separator cs-accent_bg" />
                <div style={{ height: '28px' }} />
                <div className="slahab-quickfacts" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '26px' }}>
                  <QuickFact icon="ph:calendar-blank-light" label="Dates" value={dateRange} />
                  <QuickFact icon="ph:map-pin-light" label="Venue" value={event.location} />
                  {hasPricing && <QuickFact icon="ph:tag-light" label="Starting From" value={event.pricingTiers[event.pricingTiers.length - 1]?.price} />}
                  {event.registrationDeadline && <QuickFact icon="ph:clock-light" label="Register By" value={formatDate(event.registrationDeadline)} />}
                </div>
              </SectionHeading>
            </div>
            <div className="col-lg-5 offset-lg-1 slahab-overview-image-col" style={{ position: 'relative', marginTop: '20px' }}>
              <img src={imageUrl} alt={event.title} className="cs-radius_15" style={{ width: '100%', height: '480px', objectFit: 'cover', objectPosition: 'top center', boxShadow: '0 30px 60px rgba(0,0,0,0.14)' }} />
              {(event.tag || event.location) && (
                <div style={{ position: 'absolute', bottom: '-26px', left: '-26px', background: 'linear-gradient(165deg, #26221b, #0d0b08)', padding: '22px 28px', borderRadius: '14px', border: '1px solid rgba(194,155,87,0.45)', boxShadow: '0 24px 50px rgba(0,0,0,0.35)', zIndex: 10, maxWidth: '260px' }}>
                  <div style={{ color: 'var(--accent)', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {event.tag || 'Hosted by SLAHAB'}
                  </div>
                  <div style={{ marginTop: '7px', color: '#ffffff', fontSize: '15px', fontWeight: 500 }}>
                    {event.location?.split(',')[0] || 'Colombo, Sri Lanka'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {!isPast && stats.length > 1 && (
          <>
            <Spacing lg="58" md="38" />
            <div className="container">
              <div style={{ background: 'linear-gradient(165deg, #1a1713 0%, #0b0a08 100%)', borderRadius: '18px', padding: '56px 40px', border: '1px solid rgba(194,155,87,0.2)', boxShadow: '0 40px 80px -30px rgba(0,0,0,0.4)' }}>
                <div className="cs-event_stats" style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: '24px', textAlign: 'center' }}>
                  {stats.map((s, i) => (
                    <div key={i}>
                      <div className="cs-primary_font" style={{ color: 'var(--accent)', fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 500, lineHeight: 1 }}>{s.value}</div>
                      <div style={{ color: '#b7b2a8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '12px' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        <div style={{ height: 'clamp(52px, 8vw, 80px)' }} />
      </Div>

      {/* ── Program / Description + registration sidebar ─────────────── */}
      {(hasProgram || !isPast) && (
      <div className="container">
        <div style={{ height: 'clamp(52px, 7vw, 72px)' }} />
        <div className="row">
          <div className={hasProgram ? 'col-lg-7' : 'col-lg-8'}>
            {hasProgram && (
              <>
                <SectionHeading subtitle="Day by Day" title="Event Program" />
                <Spacing lg="45" md="30" />
                <div style={{ position: 'relative', borderLeft: '1px solid var(--accent)', paddingLeft: '40px' }}>
                  {event.program.map((day, di) => (
                    <div key={di} style={{ marginBottom: di === event.program.length - 1 ? '0' : '60px' }}>
                      <div style={{ position: 'absolute', left: '-6px', width: '11px', height: '11px', backgroundColor: 'var(--accent)', borderRadius: '50%', marginTop: '8px' }} />
                      <div style={{ marginBottom: '24px' }}>
                        <h3 className="cs-primary_font" style={{ color: '#111', fontSize: '22px', fontWeight: 600, margin: '0 0 4px 0' }}>{day.dayTitle}</h3>
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
                              {act.time && <div style={{ minWidth: '100px', color: '#888', fontSize: '13px', fontWeight: 500, letterSpacing: '1px', paddingTop: '3px' }}>{act.time}</div>}
                              <div>
                                <h4 style={{ fontWeight: 600, color: '#222', fontSize: '16px', marginBottom: act.description ? '8px' : 0 }}>{act.title}</h4>
                                {act.description && <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{act.description}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sticky registration form — hidden for past events */}
          {!isPast && (
            <div className="col-lg-4 offset-lg-1">
              <div id="event-register" style={{ position: 'sticky', top: '120px', background: 'linear-gradient(165deg, #201d18 0%, #121110 50%, #0a0908 100%)', padding: '46px 40px', borderRadius: '16px', border: '1px solid rgba(194,155,87,0.28)', boxShadow: '0 40px 80px -24px rgba(0,0,0,0.75), 0 8px 24px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(194,155,87,0.04)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
                <div aria-hidden style={{ position: 'absolute', top: '-120px', right: '-120px', width: '260px', height: '260px', background: 'radial-gradient(circle, rgba(194,155,87,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative' }}>
                  <span className="cs-primary_font" style={{ display: 'block', color: 'var(--accent)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '14px' }}>Registration</span>
                  <h2 className="cs-primary_font" style={{ color: '#fff', fontSize: '30px', fontWeight: 500, marginBottom: '12px', letterSpacing: '0.5px' }}>Reserve Your Spot</h2>
                  <p style={{ color: '#a7a29a', fontSize: '14px', fontWeight: 300, lineHeight: 1.7, marginBottom: '32px' }}>
                    Secure your place at this exclusive gathering. Complete the form below to register and pay.
                  </p>
                  {event.registrationLink ? (
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ color: '#ccc', marginBottom: '24px', fontSize: '14px', fontWeight: 300 }}>Registration is handled via our official portal.</p>
                      <a href={isSafeUrl(event.registrationLink) ? event.registrationLink : '#'} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: 'var(--accent)', color: '#000', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', padding: '16px 32px', textDecoration: 'none' }}>
                        Register Now
                      </a>
                    </div>
                  ) : (
                    <RegisterForm eventId={String(event.id)} eventSlug={event.slug} pricingTiers={event.pricingTiers} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={{ height: 'clamp(52px, 7vw, 72px)' }} />
      </div>
      )}

      {/* ── What's Included (full width) ─────────────────────────────── */}
      {hasIncluded && (
        <Div className="cs-light_mode" style={{ backgroundColor: '#fcfcfc' }}>
          <Spacing lg="66" md="44" />
          <div className="container">
            <SectionHeading subtitle="Your Experience" title="What's Included" variant="cs-style1 text-center" />
            <Spacing lg="44" md="28" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {event.included.map((item, ii) => (
                <div key={ii} style={{ border: '1px solid #ececec', borderRadius: '14px', padding: '36px 30px', background: '#fff', boxShadow: '0 16px 40px -26px rgba(0,0,0,0.18)', textAlign: 'center' }}>
                  <Icon icon={INCLUDED_ICONS[ii % INCLUDED_ICONS.length]} style={{ fontSize: '40px', color: 'var(--accent)' }} />
                  <h4 style={{ color: '#111', fontSize: '17px', fontWeight: 600, margin: '20px 0 8px' }}>{item.title}</h4>
                  {item.description && <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
          <Spacing lg="66" md="44" />
        </Div>
      )}

      {/* ── Pricing (full width, centered) ───────────────────────────── */}
      {hasPricing && (
        <div className="container">
          <div style={{ height: 'clamp(52px, 7vw, 66px)' }} />
          <SectionHeading subtitle="Packages" title="Pricing Packages" variant="cs-style1 text-center" />
          <div style={{ height: 'clamp(36px, 5vw, 52px)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '860px', margin: '0 auto' }}>
            {event.pricingTiers.map((tier, ti) => (
              <div
                key={ti}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  padding: ti === 0 ? '0' : '0',
                  background: ti === 0
                    ? 'linear-gradient(160deg, #fdf8ee 0%, #fff 100%)'
                    : '#fafaf8',
                  border: `1px solid ${ti === 0 ? 'rgba(194,155,87,0.45)' : '#e4e0da'}`,
                  boxShadow: ti === 0
                    ? '0 28px 64px -20px rgba(194,155,87,0.22), 0 4px 18px rgba(0,0,0,0.05)'
                    : '0 12px 40px -18px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                }}
              >
                {/* Top accent bar for featured */}
                {ti === 0 && (
                  <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
                )}

                <div style={{ padding: '40px 36px' }}>
                  {/* Package label */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' }}>
                      {tier.name}
                    </span>
                    {ti === 0 && (
                      <span style={{ background: 'rgba(194,155,87,0.12)', border: '1px solid rgba(194,155,87,0.3)', color: 'var(--accent)', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '20px' }}>
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Price / package title */}
                  <h3 className="cs-primary_font" style={{ fontSize: 'clamp(20px, 2.4vw, 26px)', fontWeight: 500, color: '#111', lineHeight: 1.25, margin: '0 0 20px 0' }}>
                    {tier.price}
                  </h3>

                  {/* Gold divider */}
                  <div style={{ width: '36px', height: '1px', background: 'var(--accent)', marginBottom: '20px' }} />

                  {/* Includes */}
                  {tier.includes && (
                    <p style={{ color: '#6b6560', fontSize: '13px', lineHeight: 1.85, fontWeight: 400, margin: 0, letterSpacing: '0.2px' }}>
                      {tier.includes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 'clamp(52px, 7vw, 66px)' }} />
        </div>
      )}

      {/* ── Contact (full width, centered) ───────────────────────────── */}
      {hasContact && (
        <div className="container">
          <Spacing lg="50" md="40" />
          <div style={{ borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', padding: '40px 0', display: 'flex', flexWrap: 'wrap', gap: '20px 50px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <span style={{ color: '#999', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>Contact &amp; Enquiries</span>
            {event.contactName && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#444', fontWeight: 300, fontSize: '15px' }}>
                <Icon icon="ph:user-light" style={{ fontSize: '18px', color: 'var(--accent)' }} />{event.contactName}
              </span>
            )}
            {event.contactPhone && (
              <a href={`tel:${event.contactPhone}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#444', fontWeight: 300, fontSize: '15px', textDecoration: 'none' }}>
                <Icon icon="ph:phone-light" style={{ fontSize: '18px', color: 'var(--accent)' }} />{event.contactPhone}
              </a>
            )}
            {event.contactEmail && (
              <a href={`mailto:${event.contactEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#444', fontWeight: 300, fontSize: '15px', textDecoration: 'none' }}>
                <Icon icon="ph:envelope-simple-light" style={{ fontSize: '18px', color: 'var(--accent)' }} />{event.contactEmail}
              </a>
            )}
          </div>
        </div>
      )}

      {/* ── Gallery ──────────────────────────────────────────────────── */}
      {hasGallery && (
        <div style={{ backgroundColor: '#080808' }}>
          <div style={{ height: 'clamp(60px, 8vw, 88px)' }} />
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>Moments</p>
            <h2 className="cs-primary_font" style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, margin: 0 }}>Event Gallery</h2>
          </div>
          <div style={{ height: 'clamp(32px, 4vw, 52px)' }} />
          <GalleryGrid images={event.gallery} eventTitle={event.title} />
          <div style={{ height: 'clamp(60px, 8vw, 88px)' }} />
        </div>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      {hasFaq && (
        <Div className="cs-light_mode">
          <Spacing lg="65" md="45" />
          <div className="container">
            <SectionHeading subtitle="Good to Know" title="Frequently Asked Questions" variant="cs-style1 text-center" />
            <Spacing lg="40" md="25" />
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <Accordion data={event.faq} />
              </div>
            </div>
          </div>
          <Spacing lg="65" md="45" />
        </Div>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <div className="container">
        <div style={{ height: 'clamp(72px, 10vw, 80px)' }} />
        <Cta title="Have questions about this event? <br />Reach out to the SLAHAB team." btnText="Contact Us" btnLink="/contact" bgSrc="/images/cta_bg.jpeg" />
        <div style={{ height: 'clamp(80px, 12vw, 100px)' }} />
      </div>

      {/* Floating conversion CTA — appears once the form scrolls out of view */}
      {!isPast && !event.registrationLink && <FloatingRegisterCta />}
    </div>
    </>
  )
}

function QuickFact({ icon, label, value }) {
  if (!value) return null
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <Icon icon={icon} style={{ fontSize: '20px', color: 'var(--accent)' }} />
        <span style={{ color: '#999', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>{label}</span>
      </div>
      <div className="cs-primary_font" style={{ color: '#141414', fontSize: '18px' }}>{value}</div>
    </div>
  )
}
