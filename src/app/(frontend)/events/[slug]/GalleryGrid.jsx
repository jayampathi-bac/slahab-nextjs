'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

function ChevronIcon({ direction }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {direction === 'left'
        ? <polyline points="15 18 9 12 15 6" />
        : <polyline points="9 18 15 12 9 6" />}
    </svg>
  )
}

const AUTOPLAY_MS = 2000

export default function GalleryGrid({ images, eventTitle }) {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const thumbsRef = useRef(null)
  const navigating = useRef(false)

  const navigate = useCallback((index) => {
    if (navigating.current) return
    navigating.current = true
    setVisible(false)
    setTimeout(() => {
      setCurrent(index)
      setVisible(true)
      navigating.current = false
    }, 220)
  }, [])

  const prev = useCallback(() => navigate((current - 1 + images.length) % images.length), [current, images.length, navigate])
  const next = useCallback(() => navigate((current + 1) % images.length), [current, images.length, navigate])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  // Autoplay
  useEffect(() => {
    const id = setTimeout(() => next(), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [current, next])

  // Keep active thumbnail scrolled into view — scroll only the strip, not the page
  useEffect(() => {
    const strip = thumbsRef.current
    if (!strip) return
    const active = strip.children[current]
    if (!active) return
    const targetLeft = active.offsetLeft - (strip.offsetWidth - active.offsetWidth) / 2
    strip.scrollTo({ left: targetLeft, behavior: 'smooth' })
  }, [current])

  // Swipe support
  const touchStart = useRef(null)
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return
    const dx = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
    touchStart.current = null
  }

  const img = images[current]
  const total = images.length

  return (
    <>
      <style>{`
        .gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(8,8,8,0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(194,155,87,0.35);
          color: var(--accent);
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s, transform 0.2s;
        }
        .gallery-arrow:hover {
          background: rgba(194,155,87,0.15);
          border-color: var(--accent);
          transform: translateY(-50%) scale(1.08);
        }
        .gallery-arrow-left  { left: 24px; }
        .gallery-arrow-right { right: 24px; }
        .gallery-thumb-btn {
          flex-shrink: 0;
          width: 68px;
          height: 68px;
          padding: 0;
          background: none;
          cursor: pointer;
          transition: opacity 0.25s, transform 0.25s;
        }
        .gallery-thumb-btn:hover { opacity: 0.9 !important; transform: scale(1.05); }
        .gallery-thumbs::-webkit-scrollbar { height: 3px; }
        .gallery-thumbs::-webkit-scrollbar-track { background: transparent; }
        .gallery-thumbs::-webkit-scrollbar-thumb { background: rgba(194,155,87,0.4); border-radius: 2px; }
        @media (max-width: 767px) {
          .gallery-viewer-inner { padding: 0 52px !important; }
          .gallery-arrow { width: 40px !important; height: 40px !important; }
          .gallery-arrow-left { left: 8px !important; }
          .gallery-arrow-right { right: 8px !important; }
          .gallery-thumb-btn { width: 52px !important; height: 52px !important; }
        }
        @media (max-width: 400px) {
          .gallery-viewer-inner { padding: 0 44px !important; }
        }
      `}</style>

      {/* ── Main viewer ── */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#080808',
          userSelect: 'none',
          overflow: 'hidden',
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Image */}
        <div
          className="gallery-viewer-inner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '320px',
            padding: '0 88px',
            transition: 'opacity 0.22s ease',
            opacity: visible ? 1 : 0,
          }}
        >
          <img
            key={current}
            src={img?.image?.url}
            alt={img?.caption || `${eventTitle} — photo ${current + 1}`}
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '75vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Arrows */}
        <button className="gallery-arrow gallery-arrow-left" onClick={prev} aria-label="Previous">
          <ChevronIcon direction="left" />
        </button>
        <button className="gallery-arrow gallery-arrow-right" onClick={next} aria-label="Next">
          <ChevronIcon direction="right" />
        </button>

        {/* Counter */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(8,8,8,0.65)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(194,155,87,0.3)',
            color: 'var(--accent)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '2.5px',
            padding: '8px 16px',
            fontFamily: 'inherit',
          }}
        >
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>

        {/* Progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
          <div
            key={`${current}`}
            style={{
              height: '100%',
              backgroundColor: 'var(--accent)',
              width: '100%',
              transition: `width ${AUTOPLAY_MS}ms linear`,
            }}
          />
        </div>

        {/* Caption overlay */}
        {img?.caption && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '40px 24px 20px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
              color: '#ddd',
              fontSize: '13px',
              fontWeight: 300,
              letterSpacing: '0.5px',
              textAlign: 'center',
            }}
          >
            {img.caption}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      <div
        ref={thumbsRef}
        className="gallery-thumbs"
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          padding: '14px 20px 12px',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(194,155,87,0.4) transparent',
          backgroundColor: '#080808',
        }}
      >
        {images.map((item, i) => (
          <button
            key={i}
            className="gallery-thumb-btn"
            onClick={() => navigate(i)}
            aria-label={`View photo ${i + 1}`}
            style={{
              opacity: i === current ? 1 : 0.38,
              outline: i === current ? '2px solid var(--accent)' : '2px solid transparent',
              outlineOffset: '1px',
            }}
          >
            <img
              src={item.image?.url}
              alt=""
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </button>
        ))}
      </div>
    </>
  )
}
