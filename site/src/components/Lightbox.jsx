import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Lightbox({ shots, index, onClose, onNavigate }) {
  const open = index !== null && index >= 0;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(index + 1);
      if (e.key === 'ArrowLeft') onNavigate(index - 1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, index, onClose, onNavigate]);

  const shot = open ? shots[index] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={shot.caption}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'color-mix(in srgb, var(--ink) 90%, transparent)',
            display: 'grid', placeItems: 'center', padding: '5vh 6vw', cursor: 'zoom-out',
          }}
        >
          <motion.figure
            key={shot.id}
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 1100, width: '100%', cursor: 'default' }}
          >
            <div
              className="plate"
              style={{ height: 'min(74vh, 760px)', borderWidth: 10, borderColor: 'var(--paper)' }}
            >
              <img src={shot.src} alt={shot.caption} />
            </div>
            <figcaption
              style={{
                color: 'var(--paper)', fontSize: 13, marginTop: 'var(--space-3)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: 'var(--space-4)', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
            >
              <span>{shot.caption}</span>
              <span style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button onClick={() => onNavigate(index - 1)} aria-label="Previous" style={navBtn}>←</button>
                <button onClick={() => onNavigate(index + 1)} aria-label="Next" style={navBtn}>→</button>
                <button onClick={onClose} aria-label="Close" style={navBtn}>✕</button>
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const navBtn = {
  width: 34, height: 34, display: 'grid', placeItems: 'center',
  background: 'transparent', color: 'var(--color-accent-300)',
  border: '1px solid color-mix(in srgb, var(--paper) 34%, transparent)',
  borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: 14,
  transition: 'background-color 240ms ease, color 240ms ease',
};
