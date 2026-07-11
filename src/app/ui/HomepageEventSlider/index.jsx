'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

function formatDateRange(date, endDate) {
  if (!date) return ''
  const start = new Date(date)
  const opts = { day: 'numeric', month: 'long', year: 'numeric' }
  if (!endDate) return start.toLocaleDateString('en-GB', opts)
  const end = new Date(endDate)
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.getDate()} ${start.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`
  }
  return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-GB', opts)}`
}

export default function HomepageEventSlider({ events }) {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  const goTo = useCallback(
    (index) => {
      if (index === current) return
      setVisible(false)
      setTimeout(() => {
        setCurrent(index)
        setVisible(true)
      }, 380)
    },
    [current],
  )

  useEffect(() => {
    if (events.length <= 1) return
    const id = setInterval(() => {
      goTo((current + 1) % events.length)
    }, 6000)
    return () => clearInterval(id)
  }, [current, events.length, goTo])

  if (!events.length) return null

  const event = events[current]
  const imageUrl = event.featuredImage?.url ?? '/images/slahab/blog_icd_president.jpg'
  const dateStr = formatDateRange(event.date, event.endDate)

  return (
    <section
      style={{
        position: 'relative',
        height: '620px',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Background images — crossfade */}
      {events.map((e, i) => {
        const bg = e.featuredImage?.url ?? '/images/slahab/blog_icd_president.jpg'
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: 'opacity 1.2s ease',
              willChange: 'opacity',
            }}
          >
            <img
              src={bg}
              alt=""
              aria-hidden="true"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                filter: 'brightness(0.55)',
              }}
            />
          </div>
        )
      })}

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* Eyebrow label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#eb3e32',
                boxShadow: '0 0 0 3px rgba(235,62,50,0.25)',
                animation: 'pulse 2s infinite',
              }}
            />
            <span
              style={{
                color: '#eb3e32',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '3px',
              }}
            >
              Upcoming Event
            </span>
          </div>

          {/* Tag */}
          {event.tag && (
            <div style={{ marginBottom: '14px' }}>
              <span
                style={{
                  display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#ccc',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                }}
              >
                {event.tag}
              </span>
            </div>
          )}

          {/* Title */}
          <h2
            style={{
              color: '#fff',
              fontSize: 'clamp(28px, 4vw, 50px)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.5px',
            }}
          >
            {event.title}
          </h2>

          {/* Date & Location */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '32px',
            }}
          >
            {dateStr && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(235,62,50,0.15)',
                    border: '1px solid rgba(235,62,50,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    flexShrink: 0,
                  }}
                >
                  📅
                </div>
                <span style={{ color: '#e0e0e0', fontSize: '15px', fontWeight: 500 }}>
                  {dateStr}
                </span>
              </div>
            )}
            {event.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(235,62,50,0.15)',
                    border: '1px solid rgba(235,62,50,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    flexShrink: 0,
                  }}
                >
                  📍
                </div>
                <span style={{ color: '#e0e0e0', fontSize: '15px', fontWeight: 500 }}>
                  {event.location}
                </span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link
              href={`/events/${event.slug}`}
              className="cs-btn cs-style1"
              style={{ display: 'inline-flex' }}
            >
              <span>View Details</span>
            </Link>
            <Link
              href="/events"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                letterSpacing: '0.5px',
                transition: 'color 0.2s',
              }}
            >
              All events →
            </Link>
          </div>
        </div>
      </div>

      {/* Dots + progress — bottom centre */}
      {events.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '36px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to event ${i + 1}`}
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: i === current ? '#eb3e32' : 'rgba(255,255,255,0.35)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      )}

      {/* Side arrow controls */}
      {events.length > 1 && (
        <>
          <button
            onClick={() => goTo((current - 1 + events.length) % events.length)}
            style={{
              position: 'absolute',
              right: '60px',
              bottom: '28px',
              zIndex: 3,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
            aria-label="Previous event"
          >
            ‹
          </button>
          <button
            onClick={() => goTo((current + 1) % events.length)}
            style={{
              position: 'absolute',
              right: '12px',
              bottom: '28px',
              zIndex: 3,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
            aria-label="Next event"
          >
            ›
          </button>
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(235,62,50,0.25); }
          50% { box-shadow: 0 0 0 6px rgba(235,62,50,0.1); }
        }
      `}</style>
    </section>
  )
}
