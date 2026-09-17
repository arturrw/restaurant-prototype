// A few soft, blurred blobs in the active palette's accent, drifting slowly
// behind the page. Colour comes entirely from CSS custom properties, so it
// re-tints itself whenever the palette switcher changes `data-palette`.
export default function AmbientGlow() {
  return (
    <div className="ambient-glow" aria-hidden="true">
      <span className="ambient-glow__blob ambient-glow__blob--a" />
      <span className="ambient-glow__blob ambient-glow__blob--b" />
      <span className="ambient-glow__blob ambient-glow__blob--c" />
    </div>
  );
}
