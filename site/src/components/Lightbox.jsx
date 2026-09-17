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
          {/* Same stage-around-the-card trick as the dish lightbox: a wrapper
              that isn't clipped by the plate's own rounded corners, so the
              prev/next arrows can straddle its edge — half on the photo,
              half spilling onto the backdrop — instead of sitting inside it. */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: 1100, width: '100%', cursor: 'default' }}
          >
            <motion.figure
              key={shot.id}
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{ margin: 0 }}
            >
              <div
                className="plate"
                style={{ height: 'min(74vh, 760px)', borderWidth: 10, borderColor: 'var(--paper)' }}
              >
                <img src={shot.src} alt={shot.caption} />
                <button onClick={onClose} aria-label="Close" className="overlay-btn" style={{ ...overlayBtn, top: 24, right: 24, transform: 'none' }}>✕</button>
              </div>
              <figcaption
                style={{
                  color: 'var(--paper)', fontSize: 13, marginTop: 'var(--space-3)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}
              >
                {shot.caption}
              </figcaption>
            </motion.figure>

            <button
              onClick={() => onNavigate(index - 1)}
              aria-label="Previous"
              disabled={index === 0}
              className="overlay-btn"
              style={{ ...overlayBtn, ...(index === 0 ? disabledOverlayBtn : null), left: -19, top: 'min(37vh, 380px)' }}
            >←</button>
            <button
              onClick={() => onNavigate(index + 1)}
              aria-label="Next"
              disabled={index === shots.length - 1}
              className="overlay-btn"
              style={{ ...overlayBtn, ...(index === shots.length - 1 ? disabledOverlayBtn : null), right: -19, top: 'min(37vh, 380px)' }}
            >→</button>
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

// At the first/last shot: visibly inert instead of quietly doing nothing.
const disabledOverlayBtn = { opacity: 0.35, cursor: 'default' };
