'use client'
import { useState } from 'react'

function PlusIcon({ open }) {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        flexShrink: 0,
        borderRadius: '50%',
        border: '1px solid rgba(194,155,87,0.4)',
        color: 'var(--accent)',
        transition: 'background 0.25s, border-color 0.25s, transform 0.35s',
        background: open ? 'rgba(194,155,87,0.12)' : 'transparent',
        borderColor: open ? 'rgba(194,155,87,0.7)' : 'rgba(194,155,87,0.4)',
        transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
      }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <line x1="6.5" y1="1" x2="6.5" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="1" y1="6.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export default function FaqSection({ faqs }) {
  const [open, setOpen] = useState(0)

  return (
    <section style={{ backgroundColor: '#080808', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-80px',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(194,155,87,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ height: 'clamp(72px, 9vw, 100px)' }} />

      <div className="container">
        <div className="row">

          {/* Left column — heading */}
          <div className="col-lg-4" style={{ paddingRight: '48px' }}>
            <div style={{ position: 'sticky', top: '120px' }}>
              <span style={{
                display: 'block',
                color: 'var(--accent)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Got Questions
              </span>
              <h2 className="cs-primary_font" style={{
                fontSize: 'clamp(32px, 4vw, 46px)',
                fontWeight: 500,
                color: '#fff',
                lineHeight: 1.15,
                margin: '0 0 28px',
              }}>
                Frequently<br />
                <span style={{ color: 'var(--accent)' }}>Asked</span><br />
                Questions
              </h2>
              <div style={{ width: '48px', height: '1px', background: 'var(--accent)', marginBottom: '28px' }} />
              <p style={{
                color: '#888',
                fontSize: '14px',
                lineHeight: 1.85,
                fontWeight: 300,
                margin: '0 0 36px',
              }}>
                Everything you need to know about SLAHAB — Sri Lanka&apos;s premier professional hair &amp; beauty association.
              </p>
              <a
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'var(--accent)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(194,155,87,0.4)',
                  paddingBottom: '4px',
                  transition: 'border-color 0.2s',
                }}
              >
                Ask Us Directly
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right column — accordion */}
          <div className="col-lg-8" style={{ paddingLeft: '24px' }}>
            {faqs.map((faq, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    ...(i === 0 ? { borderTop: '1px solid rgba(255,255,255,0.07)' } : {}),
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '20px',
                      background: 'none',
                      border: 'none',
                      padding: '26px 0',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}>
                      <span style={{
                        color: 'var(--accent)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        opacity: 0.5,
                        minWidth: '28px',
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="cs-primary_font" style={{
                        color: isOpen ? '#fff' : '#bbb',
                        fontSize: 'clamp(15px, 1.6vw, 17px)',
                        fontWeight: isOpen ? 500 : 400,
                        lineHeight: 1.35,
                        transition: 'color 0.25s',
                      }}>
                        {faq.question}
                      </span>
                    </span>
                    <PlusIcon open={isOpen} />
                  </button>

                  {/* Answer — animated height */}
                  <div style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? '400px' : '0px',
                    transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}>
                    <div style={{
                      paddingLeft: '44px',
                      paddingBottom: '28px',
                      paddingRight: '52px',
                    }}>
                      <div style={{
                        width: '2px',
                        height: '100%',
                        background: 'linear-gradient(180deg, var(--accent) 0%, transparent 100%)',
                        position: 'absolute',
                        left: 0,
                      }} />
                      <p style={{
                        color: '#888',
                        fontSize: '14px',
                        lineHeight: 1.9,
                        fontWeight: 300,
                        margin: 0,
                      }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      <div style={{ height: 'clamp(72px, 9vw, 100px)' }} />

      <style>{`
        @media (max-width: 991px) {
          .slahab-faq-left { margin-bottom: 48px; }
        }
      `}</style>
    </section>
  )
}
