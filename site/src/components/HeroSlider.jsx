import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const INTERVAL = 5000;

export default function HeroSlider({ slides, children }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const advance = useCallback(
    (next) => setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;
    timer.current = setTimeout(() => advance(index + 1), INTERVAL);
    return () => clearTimeout(timer.current);
  }, [index, paused, advance, slides.length]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', height: 'min(88vh, 780px)', minHeight: 520, overflow: 'hidden' }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{
            opacity: { duration: 1.1, ease: 'easeInOut' },
            scale: { duration: 8, ease: 'linear' },
          }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <img
            src={slides[index].src}
            alt={slides[index].alt}
            fetchpriority={index === 0 ? 'high' : 'auto'}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'sepia(0.18) saturate(0.86) contrast(1.04)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Two scrims: a vertical one for the header and indicators, and a centred
          radial one so the headline stays legible over busy photographs. */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'linear-gradient(to bottom, color-mix(in srgb, var(--ink) 66%, transparent), color-mix(in srgb, var(--ink) 30%, transparent) 50%, color-mix(in srgb, var(--ink) 78%, transparent))',
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 68% 58% at 50% 48%, color-mix(in srgb, var(--ink) 62%, transparent), transparent 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
          padding: 'var(--space-8)', pointerEvents: 'none',
        }}
      >
        {children}
      </div>

      {/* Slide indicators — timed bars that fill as the slide plays. */}
      <div
        style={{
          position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 10, zIndex: 3,
        }}
      >
        {slides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => advance(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            style={{
              width: 46, height: 2, padding: 0, border: 0, cursor: 'pointer',
              background: 'color-mix(in srgb, var(--paper) 34%, transparent)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <motion.span
              key={`${i}-${index}-${paused}`}
              initial={{ scaleX: i === index ? 0 : i < index ? 1 : 0 }}
              animate={{ scaleX: i === index && !paused ? 1 : i === index ? 0.06 : 0 }}
              transition={{ duration: i === index && !paused ? INTERVAL / 1000 : 0.3, ease: 'linear' }}
              style={{
                position: 'absolute', inset: 0, transformOrigin: 'left',
                background: 'var(--color-accent-300)',
              }}
            />
          </button>
        ))}
      </div>

      {/* Scroll cue. */}
      <div
        className="float-slow"
        aria-hidden
        style={{
          position: 'absolute', bottom: 56, left: '50%', transform: 'translateX(-50%)',
          width: 1, height: 34,
          background: 'linear-gradient(to bottom, transparent, var(--color-accent-300))',
        }}
      />
    </section>
  );
}
