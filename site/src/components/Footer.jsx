import { useState } from 'react';
import { Link } from 'react-router-dom';
import Honeypot from './Honeypot.jsx';
import { useFormGuard } from '../hooks/useFormGuard.js';

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
              14 Elder Street<br />London W8 4QT<br />
              <a href="tel:+442079460014" style={linkStyle}>020 7946 0014</a>
            </p>
          </div>

          <div>
            <p style={kicker}>The house</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <Link to="/menus" style={linkStyle}>Menus</Link>
              <Link to="/drinks" style={linkStyle}>Drinks</Link>
              <Link to="/gallery" style={linkStyle}>Gallery</Link>
              <Link to="/visit" style={linkStyle}>Book a table</Link>
            </div>
          </div>

          <div>
            <p style={kicker}>Elsewhere</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <Link to="/visit#private-hire" style={linkStyle}>Private hire</Link>
              <Link to="/visit#careers" style={linkStyle}>Work with us</Link>
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
                placeholder="e.g. you@example.com"
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
                className="btn btn-primary"
                style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12, borderColor: 'var(--color-accent-300)', color: 'var(--color-accent-300)' }}
              >
                {status === 'sending' ? 'Sending…' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>

        <p
          style={{
            margin: 'calc(var(--space-8)*0.8) 0 0',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid color-mix(in srgb, var(--paper) 18%, transparent)',
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'color-mix(in srgb, var(--paper) 45%, transparent)',
          }}
        >
          © 2026 The Marigold Arms — a prototype
        </p>
      </div>
    </footer>
  );
}

const kicker = {
  fontSize: 10,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--color-accent-300)',
  margin: '0 0 var(--space-3)',
};
