import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import PageIntro from '../components/PageIntro.jsx';
import Reveal from '../components/Reveal.jsx';
import { menuTabs, menus } from '../data/menus.js';

/* `menus[x]` alone would resolve inherited keys — "?service=__proto__" then
   sailed past the guard and blanked the page. Only accept declared tabs. */
const isService = (id) => menuTabs.some((t) => t.id === id);

export default function Menus() {
  const [params, setParams] = useSearchParams();
  const fromUrl = params.get('service');
  const [tab, setTab] = useState(() => (isService(fromUrl) ? fromUrl : 'dinner'));

  const select = (id) => {
    setTab(id);
    setParams({ service: id }, { replace: true });
  };

  const active = menus[isService(tab) ? tab : 'dinner'];

  /* The pill is one measured rect rather than a `layoutId` pair. A shared
     layout animation here leaves a projection node alive inside the route
     subtree, which stops the route-level AnimatePresence in App.jsx from ever
     completing its exit — after switching a tab, every later navigation died. */
  const listRef = useRef(null);
  const [bar, setBar] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [box, setBox] = useState({ width: 0, height: 0 });
  const pillTransition = { type: 'spring', stiffness: 420, damping: 36 };

  useLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current;
      const el = list?.querySelector('[aria-selected="true"]');
      if (!list || !el) return;
      setBar({ left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight });
      setBox({ width: list.offsetWidth, height: list.offsetHeight });
    };
    measure();
    window.addEventListener('resize', measure);
    // Webfonts land after first paint and shift the tab widths.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [tab]);

  /* Switching tabs remounts the section below (see the note by it), which
     used to snap the page to the new content's height in one frame — old
     dish list gone, new one full-height, instantly. Animating this wrapper's
     height between the two smooths that jump into the same motion as the
     fade, instead of a fade happening inside an abrupt layout jump. */
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('auto');

  useLayoutEffect(() => {
    const measure = () => {
      if (contentRef.current) setContentHeight(contentRef.current.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [tab]);

  return (
    <main className="wrap" style={{ paddingBlock: 'calc(var(--space-8)*1.6) calc(var(--space-8)*2)' }}>
      <PageIntro
        kicker="Written each morning"
        title="The Kitchen"
        blurb="Rosalind Vane cooks what the market sends. Dishes change daily; a discretionary 12.5% service is added for tables of six or more."
      />

      <div
        role="tablist"
        aria-label="Menu service"
        ref={listRef}
        style={{
          position: 'relative',
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
          gap: 2,
          margin: 'var(--space-8) auto', padding: 5,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-divider)',
          borderRadius: 999,
          maxWidth: 860,
        }}
      >
        {menuTabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === tab}
            onClick={() => select(t.id)}
            style={{
              position: 'relative', background: 'none', border: 0,
              borderRadius: 999,
              padding: '10px 22px', cursor: 'pointer',
              fontFamily: 'var(--font-heading)', fontSize: 17,
              color: 'color-mix(in srgb, var(--color-text) 62%, transparent)',
            }}
          >
            {t.label}
          </button>
        ))}

        {/* The capsule carries its own paper-coloured label, clipped to its own
            bounds, so the text only turns light exactly where the accent fill
            has already arrived — no separate color transition to fall out of
            sync with the sliding pill. */}
        <motion.div
          aria-hidden
          animate={{ x: bar.left, y: bar.top, width: bar.width, height: bar.height }}
          initial={false}
          transition={pillTransition}
          style={{
            position: 'absolute', left: 0, top: 0, zIndex: 1,
            overflow: 'hidden', borderRadius: 999,
            background: 'var(--color-accent-700)', pointerEvents: 'none',
          }}
        >
          <motion.div
            animate={{ x: -bar.left, y: -bar.top }}
            initial={false}
            transition={pillTransition}
            style={{
              position: 'absolute', left: 0, top: 0,
              width: box.width, height: box.height,
              display: 'flex', flexWrap: 'wrap', gap: 2, padding: 5, justifyContent: 'center',
            }}
          >
            {menuTabs.map((t) => (
              <span
                key={t.id}
                style={{
                  padding: '10px 22px', whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-heading)', fontSize: 17, color: 'var(--paper)',
                }}
              >
                {t.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ height: contentHeight }}
        initial={false}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
      {/* Enter-only, keyed on the tab. Do NOT wrap this in another
          `AnimatePresence mode="wait"` — nesting one inside the route-level
          one in App.jsx deadlocks the route exit, and the page never swaps. */}
      <motion.section
        key={tab}
        ref={contentRef}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: active.columns.length > 1 ? 980 : 820, margin: '0 auto' }}
      >
          <p
            style={{
              textAlign: 'center', fontStyle: 'italic', fontSize: 15,
              color: 'color-mix(in srgb, var(--color-text) 62%, transparent)',
              marginBottom: 'var(--space-8)',
            }}
          >
            {active.note}
          </p>

          <div className={active.columns.length > 1 ? 'menu-grid' : ''}>
            {active.columns.map((col) => (
              <div key={col.heading}>
                <h3
                  style={{
                    fontSize: 13, letterSpacing: '0.24em', textTransform: 'uppercase',
                    color: 'var(--color-accent-700)', fontWeight: 400,
                    fontFamily: 'var(--font-body)',
                    paddingBottom: 'var(--space-2)',
                    borderBottom: '1px solid var(--color-accent-300)',
                  }}
                >
                  {col.heading}
                </h3>
                {col.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.42, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="menu-row"
                    style={{
                      padding: 'var(--space-4) var(--space-2)',
                      borderBottom: '1px solid var(--color-divider)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                      <h4 style={{ margin: 0, fontSize: 20, fontWeight: 400 }}>{item.name}</h4>
                      <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18 }}>{item.price}</span>
                    </div>
                    {item.desc && (
                      <p
                        style={{
                          margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.7, maxWidth: '52ch',
                          color: 'color-mix(in srgb, var(--color-text) 62%, transparent)',
                        }}
                      >
                        {item.desc} {item.veg && <em>v</em>}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {active.panels && (
            <div className="panel-grid" style={{ marginTop: 'calc(var(--space-8)*1.4)' }}>
              {active.panels.map((p) => (
                <div
                  key={p.heading}
                  style={{
                    padding: 'var(--space-6)',
                    border: '1px solid var(--color-divider)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <h3
                    style={{
                      fontSize: 13, letterSpacing: '0.24em', textTransform: 'uppercase',
                      color: 'var(--color-accent-700)', fontWeight: 400,
                      fontFamily: 'var(--font-body)', margin: '0 0 var(--space-3)',
                    }}
                  >
                    {p.heading}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 2, color: 'color-mix(in srgb, var(--color-text) 74%, transparent)' }}>
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          )}
      </motion.section>
      </motion.div>

      <Reveal
        style={{
          maxWidth: 820, margin: 'calc(var(--space-8)*1.6) auto 0', textAlign: 'center',
          borderTop: '1px solid var(--color-divider)', paddingTop: 'var(--space-6)',
        }}
      >
        <p style={{ fontSize: 13, color: 'color-mix(in srgb, var(--color-text) 55%, transparent)', margin: '0 0 var(--space-4)' }}>
          Allergen information is available for every dish — please ask. <em>v</em> denotes vegetarian.
        </p>
        <Link
          to="/visit"
          className="btn btn-primary"
          style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 12, padding: '12px 26px' }}
        >
          Book a table
        </Link>
      </Reveal>
    </main>
  );
}
