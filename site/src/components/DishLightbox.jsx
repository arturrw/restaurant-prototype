import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function DishLightbox({ dishes, index, onClose, onNavigate }) {
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

  const dish = open ? dishes[index] : null;

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
          aria-label={dish.name}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'color-mix(in srgb, var(--ink) 90%, transparent)',
            display: 'grid', placeItems: 'center', padding: '5vh 6vw', cursor: 'zoom-out',
          }}
        >
          {/* A stage around the card, not clipped by its rounded corners, so
              the prev/next arrows can straddle the card's edge — half on the
              photo, half spilling onto the backdrop — instead of sitting
              entirely inside it. */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: 860, width: '100%', cursor: 'default' }}
          >
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr', gap: 0,
                background: 'var(--paper)', borderRadius: 'var(--radius-md)', overflow: 'hidden',
              }}
            >
              <div className="plate" style={{ height: 'min(50vh, 460px)', border: 0, outline: 0, borderRadius: 0 }}>
                <img src={dish.image} alt={dish.name} />
                <button onClick={onClose} aria-label="Close" className="overlay-btn" style={{ ...overlayBtn, top: 14, right: 14, transform: 'none' }}>✕</button>
              </div>

              <div style={{ padding: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 400 }}>
                    {dish.name}
                  </h3>
                  <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 20 }}>{dish.price}</span>
                </div>
                {dish.desc && (
                  <p style={{ margin: 'var(--space-3) 0 0', fontSize: 15, lineHeight: 1.8, color: 'color-mix(in srgb, var(--color-text) 68%, transparent)' }}>
                    {dish.desc} {dish.veg && <em>v</em>}
                  </p>
                )}
              </div>
            </motion.div>

            <button onClick={() => onNavigate(index - 1)} aria-label="Previous dish" className="overlay-btn" style={{ ...overlayBtn, left: -19, top: 'min(25vh, 230px)' }}>←</button>
            <button onClick={() => onNavigate(index + 1)} aria-label="Next dish" className="overlay-btn" style={{ ...overlayBtn, right: -19, top: 'min(25vh, 230px)' }}>→</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const overlayBtn = {
  position: 'absolute', top: '50%', transform: 'translateY(-50%)',
  width: 38, height: 38, display: 'grid', placeItems: 'center',
  background: 'color-mix(in srgb, var(--ink) 55%, transparent)',
  color: 'var(--paper)',
  borderRadius: '50%', cursor: 'pointer', fontSize: 15,
  backdropFilter: 'blur(2px)',
};
