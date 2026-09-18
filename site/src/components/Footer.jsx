import { useState } from 'react';
import { Link } from 'react-router-dom';
import Honeypot from './Honeypot.jsx';
import LogoMark from './LogoMark.jsx';
import { useFormGuard } from '../hooks/useFormGuard.js';
import { useGoHome } from '../hooks/useGoHome.js';

const linkStyle = {
  fontSize: 13.5,
  textDecoration: 'none',
  color: 'color-mix(in srgb, var(--paper) 72%, transparent)',
  transition: 'color 240ms ease',
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle');
  const { isBot } = useFormGuard();
  const goHome = useGoHome();

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Same silent drop as the reservation form: a caught bot still sees
    // the "subscribed" state, just never actually goes on any list.
    if (isBot(honeypot)) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    // A prototype: no request is made, we only simulate the round trip.
    setTimeout(() => setStatus('sent'), 700);
  };

  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        borderTop: '1px solid var(--color-accent-800)',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: 'calc(var(--space-8)*1.5) var(--space-6)' }}>
        <div className="footer-grid">
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 26, margin: 0 }}>The Marigold Arms</p>
            <p
              style={{
                fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase',
                color: 'var(--color-accent-300)', margin: '6px 0 var(--space-4)',
              }}
            >
              Kensington · est. 1848
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.8, margin: 0, color: 'color-mix(in srgb, var(--paper) 68%, transparent)' }}>
              A licensed house, a hanging garden, and a small kitchen that takes it seriously.
            </p>
          </div>

          <div>
            <p style={kicker}>Visit</p>
            <p style={{ fontSize: 13.5, lineHeight: 1.9, margin: 0, color: 'color-mix(in srgb, var(--paper) 72%, transparent)' }}>
              <a
                href="https://www.google.com/maps/search/?api=1&query=14+Elder+Street+London+W8+4QT"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-grow-lines"
                // Not spreading linkStyle's own `transition: color 240ms` here —
                // an inline transition would beat .underline-grow-lines's own
                // `transition: background-size 460ms`, same as any other inline
                // property, making the growth jump instantly instead of easing in.
                style={{ fontSize: linkStyle.fontSize, textDecoration: linkStyle.textDecoration, color: 'inherit' }}
              >
                14 Elder Street<br />London W8 4QT
              </a>
              <br />
              <a href="tel:+442079460014" className="underline-grow" style={linkStyle}>020 7946 0014</a>
            </p>
          </div>

          <div>
            <p style={kicker}>The house</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <Link to="/menus" className="underline-grow" style={linkStyle}>Menus</Link>
              <Link to="/drinks" className="underline-grow" style={linkStyle}>Drinks</Link>
              <Link to="/gallery" className="underline-grow" style={linkStyle}>Gallery</Link>
              <Link to="/visit" className="underline-grow" style={linkStyle}>Book a table</Link>
            </div>
          </div>

          <div>
            <p style={kicker}>Elsewhere</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <Link to="/visit#private-hire" className="underline-grow" style={linkStyle}>Private hire</Link>
              <Link to="/visit#careers" className="underline-grow" style={linkStyle}>Work with us</Link>
              <a href="mailto:table@marigoldarms.co.uk" style={linkStyle}>
                <span className="email-hover">table@marigoldarms.co.uk</span>
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            margin: 'calc(var(--space-8)*1.2) 0 0',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid color-mix(in srgb, var(--paper) 18%, transparent)',
          }}
        >
          <p style={kicker}>Events, once a month</p>
          <p style={{ fontSize: 13.5, lineHeight: 1.8, margin: '0 0 var(--space-4)', maxWidth: '46ch', color: 'color-mix(in srgb, var(--paper) 72%, transparent)' }}>
            Wine dinners, quiz nights, and the odd invitation to help finish a cask before it turns. No spam, easy to leave.
          </p>
          {status === 'sent' ? (
            <p style={{ fontSize: 13.5, color: 'var(--color-accent-300)', margin: 0 }}>
              Thank you — you're on the list. This is a prototype, so nothing was actually sent.
            </p>
          ) : (
            <form onSubmit={subscribe} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', maxWidth: 420 }}>
              <Honeypot value={honeypot} onChange={(e) => setHoneypot(e.target.value)} name="website" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                style={{
                  flex: '1 1 220px', minHeight: 38, padding: '7px 12px',
                  font: 'inherit', fontSize: 14, fontFamily: 'var(--font-body)',
                  color: 'var(--paper)', background: 'transparent',
                  border: '1px solid color-mix(in srgb, var(--paper) 32%, transparent)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn btn-primary hero-cta"
                style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12, borderColor: 'var(--color-accent-300)', color: 'var(--color-accent-300)' }}
              >
                {status === 'sending' ? 'Sending…' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>

        <div
          style={{
            margin: 'calc(var(--space-8)*0.8) 0 0',
            paddingTop: 'var(--space-5)',
            borderTop: '1px solid color-mix(in srgb, var(--paper) 18%, transparent)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 'var(--space-4)',
          }}
        >
          <div>
            {/* A plain button, not a <Link to="/"> — an anchor that's clicked
                far down the page (like this one) keeps browsers busy
                scrolling itself back into view after the click, fighting the
                jump-to-top in useGoHome. Header's logo hit the same thing and
                is a button for the same reason. */}
            <button
              type="button"
              onClick={goHome}
              className="logo-link"
              aria-label="The Marigold Arms — home"
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'none', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left',
              }}
            >
              <LogoMark size={26} style={{ color: 'var(--color-accent-300)' }} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--paper)' }}>
                The Marigold Arms
              </span>
            </button>
            <p
              style={{
                margin: '8px 0 0', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'color-mix(in srgb, var(--paper) 45%, transparent)',
              }}
            >
              © 2026 The Marigold Arms — a prototype
            </p>
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            <a href="https://instagram.com/" aria-label="Instagram" className="social-icon" style={socialIconStyle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5.5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://facebook.com/" aria-label="Facebook" className="social-icon" style={socialIconStyle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M13.4 20.3v-6.9h2.15l.35-2.55h-2.5V9.4c0-.72.22-1.22 1.24-1.22h1.3V5.9c-.23-.03-1-.1-1.9-.1-1.88 0-3.16 1.15-3.16 3.26v1.79h-2.13v2.55h2.13v6.9h2.52Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Base color/background live in the .social-icon CSS class, not here — an
// inline color/background would beat the :hover rule outright, regardless
// of the CSS selector's specificity.
const socialIconStyle = {
  display: 'flex', padding: 7, margin: -7, borderRadius: '50%',
  transition: 'color 240ms ease, background-color 240ms ease',
};

const kicker = {
  fontSize: 10,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-accent-300)',
  margin: '0 0 var(--space-3)',
};
