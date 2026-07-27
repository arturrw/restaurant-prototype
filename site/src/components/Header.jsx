import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import PaletteSwitcher from './PaletteSwitcher.jsx';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/menus', label: 'Menus' },
  { to: '/drinks', label: 'Drinks' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/visit', label: 'Visit' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header
      className="site-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        background: scrolled
          ? 'color-mix(in srgb, var(--color-bg) 88%, transparent)'
          : 'color-mix(in srgb, var(--color-bg) 96%, transparent)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-divider)',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: scrolled
            ? 'var(--space-2) var(--space-6)'
            : 'var(--space-4) var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-6)',
          transition: 'padding 380ms ease',
        }}
      >
        <button
          onClick={() => navigate('/')}
          aria-label="The Marigold Arms — home"
          style={{
            display: 'flex', flexDirection: 'column', gap: 1,
            background: 'none', border: 0, padding: 0, cursor: 'pointer',
            textAlign: 'left', color: 'var(--color-text)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: scrolled ? 19 : 25,
              lineHeight: 1,
              letterSpacing: '0.01em',
              transition: 'font-size 380ms ease',
            }}
          >
            The Marigold Arms
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 9,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-700)',
              opacity: scrolled ? 0 : 1,
              maxHeight: scrolled ? 0 : 16,
              overflow: 'hidden',
              transition: 'opacity 300ms ease, max-height 380ms ease',
            }}
          >
            Kensington · est. 1848
          </span>
        </button>

        <nav className="nav-desktop" style={{ marginLeft: 'auto', alignItems: 'center', gap: 'var(--space-6)' }}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {({ isActive }) => (
                <span
                  className="underline-grow"
                  data-active={isActive}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    letterSpacing: '0.04em',
                    color: isActive ? 'var(--color-accent-700)' : 'var(--color-text)',
                    transition: 'color 240ms ease',
                  }}
                >
                  {l.label}
                </span>
              )}
            </NavLink>
          ))}
          <PaletteSwitcher />
          <NavLink
            to="/visit"
            className="btn btn-primary"
            style={{ letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: 12 }}
          >
            Book a table
          </NavLink>
        </nav>

        <button
          className="nav-burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            marginLeft: 'auto', width: 40, height: 40, placeItems: 'center',
            background: 'none', border: '1px solid var(--color-divider)',
            borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--color-text)',
          }}
        >
          <span style={{ display: 'block', width: 18, height: 12, position: 'relative' }}>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? [{ y: 5, rotate: 45 }, { opacity: 0 }, { y: -5, rotate: -45 }][i]
                    : { y: 0, rotate: 0, opacity: 1 }
                }
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute', left: 0, top: i * 5,
                  width: 18, height: 1.5, background: 'currentColor', borderRadius: 2,
                }}
              />
            ))}
          </span>
        </button>
      </div>

      {/* Reading-progress hairline. */}
      <motion.div
        style={{
          scaleX: progress,
          transformOrigin: 'left',
          height: 2,
          background: 'var(--color-accent)',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="drawer-only"
            style={{ overflow: 'hidden', borderTop: '1px solid var(--color-divider)' }}
          >
            <motion.div
              initial="hidden"
              animate="shown"
              variants={{ shown: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
              style={{ padding: 'var(--space-4) var(--space-6) var(--space-6)', display: 'grid', gap: 'var(--space-3)' }}
            >
              {links.map((l) => (
                <motion.div
                  key={l.to}
                  variants={{ hidden: { opacity: 0, x: -14 }, shown: { opacity: 1, x: 0 } }}
                >
                  <NavLink
                    to={l.to}
                    end={l.end}
                    onClick={() => setMenuOpen(false)}
                    style={({ isActive }) => ({
                      fontFamily: 'var(--font-heading)',
                      fontSize: 24,
                      textDecoration: 'none',
                      color: isActive ? 'var(--color-accent-700)' : 'var(--color-text)',
                    })}
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div variants={{ hidden: { opacity: 0, x: -14 }, shown: { opacity: 1, x: 0 } }}>
                <PaletteSwitcher />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}>
                <NavLink
                  to="/visit"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary btn-block"
                  style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12, marginTop: 'var(--space-2)' }}
                >
                  Book a table
                </NavLink>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
