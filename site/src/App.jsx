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

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      // `scrollTo({ behavior: 'auto' })` isn't actually instant here — with
      // `html { scroll-behavior: smooth }` in index.css, 'auto' just defers
      // to that CSS and animates instead. Arriving from a page scrolled far
      // down, that animation runs while the outgoing page is still exiting
      // and the new one mounting (AnimatePresence), and the shifting layout
      // under it means it doesn't reliably land on 0. Override the CSS value
      // for this one jump, then restore it so every other (intentionally
      // smooth) scroll on the site is unaffected. Same fix as useGoTo.js.
      const root = document.documentElement;
      const prevBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      root.style.scrollBehavior = prevBehavior;
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
