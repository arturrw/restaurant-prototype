/* The marigold flower mark — six petals around a center, drawn once here
   so the header, footer and favicon all stay in sync. Uses `currentColor`
   so each placement just sets its own `color`, which is how it ends up
   tracking the active accent palette instead of being baked in. */
export default function LogoMark({ size = 24, className, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
      className={className}
      style={style}
    >
      <circle cx="8" cy="8" r="2.3" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse key={deg} cx="8" cy="3.4" rx="1.5" ry="2.5" transform={`rotate(${deg} 8 8)`} />
      ))}
    </svg>
  );
}
