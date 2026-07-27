import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Menus from './pages/Menus.jsx';
import Drinks from './pages/Drinks.jsx';
import Gallery from './pages/Gallery.jsx';
import Visit from './pages/Visit.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
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
  );
}
