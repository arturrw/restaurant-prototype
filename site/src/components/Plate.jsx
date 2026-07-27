import { useState } from 'react';

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
        alt={alt}
        sizes={sizes}
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
