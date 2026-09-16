'use client'
import { useEffect, useState } from 'react'
import Icon from '@/app/ui/Icon'

export default function FloatingRegisterCta({ targetId = 'event-register', label = 'Reserve Your Spot' }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) return

    const update = () => {
      const rect = target.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 80
      // Show once we've scrolled past the hero and the form is out of view
      setShow(!inView && window.scrollY > 500)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [targetId])

  const handleClick = () => {
    const target = document.getElementById(targetId)
    if (!target) return
    const y = target.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
    setTimeout(() => {
      const input = target.querySelector('input, select')
      if (input) input.focus({ preventScroll: true })
    }, 700)
  }

  return (
    <>
      <style>{`
        .cs-float_cta {
          position: fixed;
          right: 30px;
          bottom: 30px;
          z-index: 9998;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          border: none;
          cursor: pointer;
          border-radius: 50px;
          background: linear-gradient(135deg, #e0c07f 0%, #c29b57 45%, #a8823f 100%);
          color: #1a1206;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: var(--secondary-font), sans-serif;
          box-shadow: 0 14px 34px -8px rgba(194, 155, 87, 0.6);
          opacity: 0;
          transform: translateY(20px) scale(0.96);
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s ease, box-shadow 0.25s ease, filter 0.25s ease;
        }
        .cs-float_cta.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .cs-float_cta:hover {
          box-shadow: 0 20px 46px -8px rgba(194, 155, 87, 0.78);
          filter: brightness(1.05);
        }
        @media (max-width: 575px) {
          .cs-float_cta {
            right: 16px;
            left: 16px;
            bottom: 16px;
            justify-content: center;
            padding: 16px;
          }
        }
      `}</style>
      <button
        type="button"
        className={`cs-float_cta ${show ? 'is-visible' : ''}`}
        onClick={handleClick}
        aria-label={label}
      >
        <Icon icon="ph:ticket-light" style={{ fontSize: '18px' }} />
        {label}
      </button>
    </>
  )
}
