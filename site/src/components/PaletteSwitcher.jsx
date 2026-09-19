import { useEffect, useState } from 'react';

const palettes = [
  { id: 'green', label: 'Green & gilt', swatch: '#5d7a5a' },
  { id: 'bordeaux', label: 'Bordeaux & gilt', swatch: '#8c3f45' },
  { id: 'inkblue', label: 'Ink blue & brass', swatch: '#3c5a74' },
];

export default function PaletteSwitcher() {
  const [active, setActive] = useState(
    () => localStorage.getItem('marigold-palette') || 'green'
  );

  useEffect(() => {
    document.documentElement.dataset.palette = active;
    localStorage.setItem('marigold-palette', active);
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
