import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // usePolling: Docker Desktop's bind mount on Windows doesn't forward file
  // change events into the container, so without it the dev server (and its
  // HMR/live-reload) never notices host-side edits at all.
  server: { port: 5173, host: true, watch: { usePolling: true } },
});
