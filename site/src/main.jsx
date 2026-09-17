import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

document.documentElement.dataset.palette = localStorage.getItem('marigold-palette') || 'green';

// The browser's own scroll restoration (default: 'auto') tries to remember
// and restore a scroll position per history entry on its own, independent
// of React — and can win a race against App.jsx's ScrollToTop, landing on
// some browser-remembered position instead of the top after a route change.
// This app owns scroll position itself; the browser shouldn't second-guess it.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
