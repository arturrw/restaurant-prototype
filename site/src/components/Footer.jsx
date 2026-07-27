import { Link } from 'react-router-dom';

const linkStyle = {
  fontSize: 13.5,
  textDecoration: 'none',
  color: 'color-mix(in srgb, var(--paper) 72%, transparent)',
  transition: 'color 240ms ease',
};

export default function Footer() {
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
              <Link to="/visit" style={linkStyle}>Private hire</Link>
              <Link to="/visit" style={linkStyle}>Work with us</Link>
              <a href="mailto:table@marigoldarms.co.uk" style={linkStyle}>table@marigoldarms.co.uk</a>
            </div>
          </div>
        </div>

        <p
          style={{
            margin: 'calc(var(--space-8)*1.2) 0 0',
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
