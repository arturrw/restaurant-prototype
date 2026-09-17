import { useLocation, useNavigate } from 'react-router-dom';

// `navigate('/')` from "/" is a no-op — the pathname doesn't change, so
// App.jsx's ScrollToTop (keyed on pathname/hash) never re-runs. Used by any
// "go home" logo/wordmark link, wherever it appears.
export function useGoHome() {
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    if (location.pathname === '/') {
      // The clicked logo link/button keeps focus after the click, and the
      // browser scrolls a focused element into view on its own — fighting
      // our jump-to-top below, especially from the footer, far down the
      // page. Drop focus first, before doing anything about scroll.
      document.activeElement?.blur();

      // `scrollTo({ behavior: 'auto' })` does NOT mean instant here — with
      // `html { scroll-behavior: smooth }` in index.css, 'auto' just defers
      // to that CSS and animates anyway. Override the CSS value for the one
      // scrollTo call that actually needs to be instant, then restore it so
      // every other (intentionally smooth) scroll is unaffected.
      const jump = () => {
        const root = document.documentElement;
        const prevBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        root.style.scrollBehavior = prevBehavior;
      };
      jump();

      // A real mouse click (not a synthetic .click()) on a control far down
      // the page — the footer logo, especially — has the browser scroll it
      // back into view some time after this handler already ran, undoing
      // the jump above. That settles well within half a second, so keep
      // re-asserting the top for that long — whichever call runs last wins.
      const deadline = performance.now() + 900;
      const holdAtTop = () => {
        jump();
        if (performance.now() < deadline) requestAnimationFrame(holdAtTop);
      };
      requestAnimationFrame(holdAtTop);
    } else {
      navigate('/');
    }
  };
}
