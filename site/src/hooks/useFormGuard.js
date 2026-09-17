import { useRef } from 'react';

// No script fills a form and submits it within this window; a real person
// reading labels and typing (or even using autofill, which still needs a
// deliberate click) reliably takes longer.
const MIN_FILL_MS = 800;

/* A backend-free spam guard for prototype forms: combines a honeypot field
   (bots tend to fill every input they find) with a minimum time-on-form.
   Either signal alone is enough to call it automated. */
export function useFormGuard() {
  const startedAt = useRef(Date.now());
  const isBot = (honeypotValue) =>
    Boolean(honeypotValue?.trim()) || Date.now() - startedAt.current < MIN_FILL_MS;
  return { isBot };
}
