'use client';

export default function SocialWidget() {
  return (
    <div>
      <style>{`
        .slahab-fb-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 14px 24px;
          background: transparent;
          border: 1px solid rgba(194,155,87,0.35);
          color: #ccc;
          text-decoration: none;
          transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease;
          width: 100%;
        }
        .slahab-fb-btn:hover {
          border-color: rgba(194,155,87,0.85);
          background: rgba(194,155,87,0.07);
          color: #fff;
        }
        .slahab-fb-btn:hover .fb-icon-wrap {
          background: rgba(194,155,87,0.15);
          border-color: rgba(194,155,87,0.6);
        }
        .fb-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(194,155,87,0.25);
          flex-shrink: 0;
          transition: background 0.3s, border-color 0.3s;
        }
        .fb-label {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .fb-label-top {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(194,155,87,0.7);
          line-height: 1;
        }
        .fb-label-main {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.3px;
          line-height: 1.2;
        }
        .fb-arrow {
          margin-left: auto;
          opacity: 0.4;
          transition: opacity 0.3s, transform 0.3s;
        }
        .slahab-fb-btn:hover .fb-arrow {
          opacity: 1;
          transform: translateX(3px);
        }
      `}</style>

      <a
        href="https://www.facebook.com/slahab.srilanka/"
        target="_blank"
        rel="noopener noreferrer"
        className="slahab-fb-btn"
      >
        <span className="fb-icon-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(194,155,87,0.9)">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </span>
        <span className="fb-label">
          <span className="fb-label-top">Follow us on</span>
          <span className="fb-label-main">Facebook</span>
        </span>
        <svg className="fb-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </a>

      {/* LinkedIn — not active yet */}
      {/* <Link href='/' className="cs-center"><Icon icon="fa6-brands:linkedin-in" /></Link> */}

      {/* Twitter / X — not active yet */}
      {/* <Link href='/' className="cs-center"><Icon icon="fa6-brands:twitter" /></Link> */}

      {/* YouTube — not active yet */}
      {/* <Link href='/' className="cs-center"><Icon icon="fa6-brands:youtube" /></Link> */}
    </div>
  )
}
