import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import AmbientGlow from './components/AmbientGlow.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Menus from './pages/Menus.jsx';
import Drinks from './pages/Drinks.jsx';
import Gallery from './pages/Gallery.jsx';
import Visit from './pages/Visit.jsx';
import NotFound from './pages/NotFound.jsx';
import { holdScrollTop } from './utils/scrollToTop.js';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      // A single jump here used to land somewhere other than 0 arriving
      // from a page scrolled far down: the outgoing page (still mounted,
      // AnimatePresence exiting it) is what pathname change first fires
      // against, but the actual document-height drop happens later, once
      // it unmounts — and the browser's own scroll compensation for that
      // shift runs well after our early one-shot reset, overriding it.
      holdScrollTop();
      return;
    }
    // The target page may still be mid page-transition (or, arriving from
    // elsewhere, not yet mounted) when this runs, so the element isn't
    // there yet — give it a beat before giving up.
    const id = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
    return () => clearTimeout(id);
  }, [pathname, hash]);
  return null;
}

/* Keep this the ONLY opacity layer on a route change. Components inside a page
   animate position, not opacity, so nothing is ever hidden twice over — that
   stacked up to a second of blank page between routes. */
const page = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.16, ease: 'easeIn' } },
};

export default function App() {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: 'var(--color-bg)' }}>
      <AmbientGlow />
      {/* Everything real sits in its own stacking context above the glow —
          otherwise a merely `position: fixed` glow paints over any ordinary
          (non-positioned) page content instead of behind it. */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ScrollToTop />
        <Header />
        <div style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={page}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/menus" element={<Menus />} />
                <Route path="/drinks" element={<Drinks />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/visit" element={<Visit />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </div>
  );
}
