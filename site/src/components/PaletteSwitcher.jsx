import { useEffect, useState } from 'react';

const palettes = [
  { id: 'green', label: 'Green & gilt', swatch: '#5d7a5a' },
  { id: 'bordeaux', label: 'Bordeaux & gilt', swatch: '#8c3f45' },
  { id: 'inkblue', label: 'Ink blue & brass', swatch: '#3c5a74' },
];

// Mirrors each palette's --ink/--color-accent-300 from index.css. A
// favicon can't read CSS custom properties, so the hexes are duplicated
// here — the only place outside index.css that needs to know them.
const faviconColors = {
  green: { ink: '#1b2a1f', accent: '#b9cdb2' },
  bordeaux: { ink: '#2b1517', accent: '#dfb2b0' },
  inkblue: { ink: '#16222c', accent: '#aac2d5' },
};

// Same flower as LogoMark, drawn at 2x into a 32x32 favicon canvas —
// duplicated rather than shared because a favicon needs a flat string,
// not a React tree.
function faviconHref(paletteId) {
  const { ink, accent } = faviconColors[paletteId] || faviconColors.green;
  const petals = [0, 60, 120, 180, 240, 300]
    .map((deg) => `<ellipse cx="16" cy="6.8" rx="3" ry="5" transform="rotate(${deg} 16 16)" fill="${accent}"/>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="${ink}"/><circle cx="16" cy="16" r="4.6" fill="${accent}"/>${petals}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function PaletteSwitcher() {
  const [active, setActive] = useState(
    () => localStorage.getItem('marigold-palette') || 'green'
  );

  useEffect(() => {
    document.documentElement.dataset.palette = active;
    localStorage.setItem('marigold-palette', active);

    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconHref(active);
  }, [active]);

  return (
    <div role="radiogroup" aria-label="Colour palette" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {palettes.map((p) => (
        <button
          key={p.id}
          role="radio"
          aria-checked={active === p.id}
          aria-label={p.label}
          title={p.label}
          onClick={() => setActive(p.id)}
          style={{
            width: 15, height: 15, padding: 0, borderRadius: '50%',
            background: p.swatch, cursor: 'pointer',
            border: '1px solid color-mix(in srgb, var(--color-text) 25%, transparent)',
            outline: active === p.id ? '1px solid var(--color-text)' : 'none',
            outlineOffset: 2,
            transform: active === p.id ? 'scale(1.12)' : 'scale(1)',
            transition: 'transform 240ms cubic-bezier(0.22,1,0.36,1), outline-color 240ms ease',
          }}
        />
      ))}
    </div>
  );
}
