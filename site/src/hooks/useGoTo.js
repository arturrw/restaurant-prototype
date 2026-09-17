import { useLocation, useNavigate } from 'react-router-dom';
import { holdScrollTop } from '../utils/scrollToTop.js';

// `navigate(path)` to the page you're already on is a no-op — the pathname
// doesn't change, so App.jsx's ScrollToTop (keyed on pathname/hash) never
// re-runs. Used by any nav link that should jump back to the top of the
// current page when it's clicked while already there, instead of doing
// nothing.
export function useGoTo() {
  const navigate = useNavigate();
  const location = useLocation();

  return (path) => {
    if (location.pathname === path) {
      // The clicked link keeps focus after the click, and the browser
      // scrolls a focused element into view on its own — fighting the
      // jump-to-top below, especially from far down the page. Drop focus
      // first, before doing anything about scroll.
      document.activeElement?.blur();
      holdScrollTop();
    } else {
      navigate(path);
    }
  };
}
