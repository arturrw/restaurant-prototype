import { useState } from 'react';

const RESPONSIVE_WIDTHS = [480, 800, 1200, 1600];

// Unsplash serves any width on request, so hand the browser several sizes
// instead of one 1400px file it then shrinks down to a phone-sized slot.
function unsplashSrcSet(src) {
  if (!src.includes('images.unsplash.com') || !/[?&]w=\d+/.test(src)) return undefined;
  return RESPONSIVE_WIDTHS.map((w) => `${src.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`).join(', ');
}

/* A matted photograph. Mirrors the reference site's lazy images, which
   sit at 0.6 opacity and fade to full over 600ms once decoded. */
export default function Plate({ src, alt = '', className = '', style, zoom = true, sizes, eager = false }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`plate ${zoom ? 'plate-zoom' : ''} ${className}`}
      style={style}
      data-loaded={loaded}
    >
      {!loaded && <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />}
      <img
        src={src}
        srcSet={unsplashSrcSet(src)}
        alt={alt}
        sizes={sizes || '(min-width: 1024px) 50vw, 100vw'}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 600ms ease, transform 900ms cubic-bezier(0.22,1,0.36,1), filter 600ms ease',
        }}
      />
    </div>
  );
}
