'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Icon from '@/app/ui/Icon'

function formatDateRange(date, endDate) {
  if (!date) return ''
  const start = new Date(date)
  if (!endDate)
    return start.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const end = new Date(endDate)
  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth()
  ) {
    return `${start.getDate()}–${end.getDate()} ${start.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    })}`
  }
  return `${start.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })} – ${end.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`
}

function formatShortDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function EventPopup({ events }) {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      )
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = useCallback(() => {
    setVisible(false)
    setTimeout(() => setMounted(false), 500)
  }, [])

  useEffect(() => {
    if (!visible) return
    const onKey = (e) => e.key === 'Escape' && dismiss()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, dismiss])

  if (!events.length || !mounted) return null

  const event = events[current]
  const imageUrl = event.featuredImage?.url ?? '/images/slahab/blog_icd_president.jpg'
  const dateStr = formatDateRange(event.date, event.endDate)
  const lowestPrice = event.pricingTiers?.[event.pricingTiers.length - 1]?.price
  const deadlineStr = formatShortDate(event.registrationDeadline)

  return (
    <>
      <style>{`
        @keyframes ep-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        .ep-close-btn:hover { background: rgba(255,255,255,0.15) !important; }
        .ep-later-btn:hover { border-color: rgba(194,155,87,0.5) !important; color: #fff !important; }
        @media (max-width: 600px) {
          .ep-inner { flex-direction: column !important; min-height: auto !important; }
          .ep-image-col {
            width: 100% !important;
            height: 160px !important;
            min-height: 160px !important;
            flex-shrink: 0 !important;
          }
          .ep-content-col { width: 100% !important; padding: 18px !important; }
          .ep-title { font-size: 18px !important; margin-bottom: 16px !important; }
          .ep-details-list { gap: 10px !important; margin-bottom: 16px !important; }
          .ep-divider { margin-bottom: 12px !important; }
          .ep-dots { margin-top: 12px !important; }
          .ep-card { width: min(92vw, 480px) !important; max-height: 95vh !important; overflow: hidden !important; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Card */}
      <div
        className="ep-card"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          zIndex: 9999,
          width: 'min(760px, calc(100vw - 24px))',
          maxHeight: '90vh',
          borderRadius: '24px',
          overflow: 'hidden',
          background: '#0a0a0a',
          boxShadow: '0 50px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(194,155,87,0.15)',
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -46%) scale(0.93)',
          transition:
            'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform, opacity',
        }}
      >
        {/* Close button */}
        <button
          className="ep-close-btn"
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '20px',
            lineHeight: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
        >
          ×
        </button>

        {/* Split layout */}
        <div
          className="ep-inner"
          style={{ display: 'flex', minHeight: '400px' }}
        >
          {/* Left — image column */}
          <div
            className="ep-image-col"
            style={{
              position: 'relative',
              width: '42%',
              flexShrink: 0,
              minHeight: '400px',
              overflow: 'hidden',
              backgroundColor: '#111',
            }}
          >
            <img
              src={imageUrl}
              alt={event.title}
              onLoad={() => setImgLoaded(true)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.7s ease',
              }}
            />
            {/* Gradient for readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, transparent 60%, rgba(10,10,10,0.9) 100%), linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
              }}
            />

            {/* Tag badge bottom-left of image */}
            {event.tag && (
              <span
                className="cs-primary_font"
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                  fontSize: '9px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(10,10,10,0.5)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {event.tag}
              </span>
            )}
          </div>

          {/* Right — content column */}
          <div
            className="ep-content-col"
            style={{
              flex: 1,
              padding: '40px 36px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minWidth: 0,
            }}
          >
            {/* Top section */}
            <div>
              {/* Live pulse + label */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent)',
                    display: 'inline-block',
                    flexShrink: 0,
                    animation: 'ep-pulse 2s infinite',
                  }}
                />
                <span
                  className="cs-primary_font"
                  style={{
                    color: 'var(--accent)',
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                  }}
                >
                  Upcoming Event
                </span>
              </div>

              {/* Title */}
              <h2
                className="ep-title cs-primary_font"
                style={{
                  color: '#fff',
                  fontSize: '28px',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  marginBottom: '32px',
                  letterSpacing: '0.5px',
                }}
              >
                {event.title}
              </h2>

              {/* Details list */}
              <div
                className="ep-details-list"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  marginBottom: '32px',
                }}
              >
                {dateStr && (
                  <DetailRow icon="ph:calendar-blank-light" label="Dates" value={dateStr} />
                )}
                {event.location && (
                  <DetailRow icon="ph:map-pin-light" label="Venue" value={event.location} />
                )}
                {lowestPrice && (
                  <DetailRow icon="ph:currency-eur-light" label="Starting From" value={lowestPrice} highlight />
                )}
                {deadlineStr && (
                  <DetailRow icon="ph:clock-light" label="Register by" value={deadlineStr} />
                )}
              </div>
            </div>

            {/* Bottom — CTAs */}
            <div>
              {/* Divider */}
              <div
                className="ep-divider"
                style={{
                  height: '1px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  marginBottom: '24px',
                }}
              />

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  href={`/events/${event.slug}`}
                  onClick={dismiss}
                  style={{
                    display: 'inline-flex',
                    flex: '1 1 auto',
                    justifyContent: 'center',
                    minWidth: '160px',
                    backgroundColor: 'var(--accent)',
                    color: '#000',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    padding: '14px 20px',
                    textDecoration: 'none',
                    transition: 'opacity 0.3s ease',
                    textAlign: 'center',
                    alignItems: 'center',
                  }}
                >
                  <span>View Details</span>
                </Link>
                <button
                  className="ep-later-btn"
                  onClick={dismiss}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#888',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s, color 0.3s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Maybe later
                </button>
              </div>

              {/* Multi-event dots */}
              {events.length > 1 && (
                <div
                  className="ep-dots"
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '24px',
                    alignItems: 'center',
                  }}
                >
                  {events.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setCurrent(i); setImgLoaded(false) }}
                      style={{
                        width: i === current ? '24px' : '6px',
                        height: '6px',
                        borderRadius: '3px',
                        backgroundColor:
                          i === current ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'width 0.3s ease, background-color 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function DetailRow({ icon, label, value, highlight }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
      <Icon icon={icon} style={{ fontSize: '18px', color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
      <div style={{ minWidth: 0 }}>
        <span
          style={{
            display: 'block',
            color: '#666',
            fontSize: '9px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '4px',
          }}
        >
          {label}
        </span>
        <span
          style={{
            color: highlight ? 'var(--accent)' : '#eaeaea',
            fontSize: '14px',
            fontWeight: 300,
            lineHeight: 1.4,
            letterSpacing: '0.5px',
          }}
        >
          {value}
        </span>
      </div>
    </div>
  )
}
