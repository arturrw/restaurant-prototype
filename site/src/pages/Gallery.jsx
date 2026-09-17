import { useState } from 'react';

import Lightbox from '../components/Lightbox.jsx';
import PageIntro from '../components/PageIntro.jsx';
import Plate from '../components/Plate.jsx';
import { RevealGroup, RevealItem } from '../components/Reveal.jsx';
import { gallery } from '../data/images.js';

export default function Gallery() {
  const [open, setOpen] = useState(null);

  const navigate = (next) => setOpen(Math.max(0, Math.min(gallery.length - 1, next)));

  return (
    <main className="wrap" style={{ paddingBlock: 'calc(var(--space-8)*1.6) calc(var(--space-8)*2)' }}>
      <PageIntro
        kicker="Nine plates"
        title="The House in Pictures"
        blurb="Click any plate to see it large. Use the arrow keys to move between them."
      />

      <RevealGroup className="gallery-grid" stagger={0.07} style={{ marginTop: 'calc(var(--space-8)*1.4)' }}>
        {gallery.map((shot, i) => (
          <RevealItem as="figure" key={shot.id} fade={i > 2}>
            <button
              onClick={() => setOpen(i)}
              aria-label={`Enlarge: ${shot.caption}`}
              style={{ display: 'block', width: '100%', padding: 0, border: 0, background: 'none', cursor: 'zoom-in' }}
            >
              <Plate src={shot.src} alt={shot.caption} style={{ height: 300 }} />
            </button>
            <figcaption style={{ marginTop: 'var(--space-2)', fontSize: 12 }}>{shot.caption}</figcaption>
          </RevealItem>
        ))}
      </RevealGroup>

      <Lightbox shots={gallery} index={open} onClose={() => setOpen(null)} onNavigate={navigate} />
    </main>
  );
}
