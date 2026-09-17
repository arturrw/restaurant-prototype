// Robustly forces the page to the very top and keeps it there for a beat —
// used any time we need scroll position to actually land on 0, not just
// nudge toward it.
//
// A single scrollTo(0, 0) isn't enough on its own, for two separate reasons
// that both show up well after that call already ran:
//   1. `scrollTo({ behavior: 'auto' })` defers to `html { scroll-behavior:
//      smooth }` in index.css instead of jumping instantly — fixed here by
//      overriding scroll-behavior for just this call, then restoring it.
//   2. Something else keeps adjusting scroll position after our jump: a
//      just-clicked/focused control scrolling itself back into view, or —
//      for a route change — the document's height dropping sharply once the
//      outgoing page actually unmounts (which happens later than the
//      pathname change that triggers this), which the browser compensates
//      for by shifting scroll to keep some anchor in view. Re-asserting the
//      top for a beat outlasts both.
export function holdScrollTop(durationMs = 900) {
  const jump = () => {
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prevBehavior;
  };
  jump();
  const deadline = performance.now() + durationMs;
  const loop = () => {
    jump();
    if (performance.now() < deadline) requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
