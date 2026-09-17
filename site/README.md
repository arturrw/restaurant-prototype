# The Marigold Arms

A working site built from the `Marigold Arms.dc.html` prototype in the parent folder.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Stack

Vite · React 18 · React Router 6 · Tailwind v4 (reset + a few utilities) · Framer Motion.

The Classical design system from `../_ds/classical-*/styles.css` is ported into
`src/index.css` as CSS custom properties and component classes, so the tokens,
type scale and `.plate` / `.btn` / `.input` / `.table` styles match the prototype.
The prototype's four palettes are `[data-palette]` blocks, switched at runtime by
the swatches in the header and remembered in `localStorage`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero slideshow, story, features, signature dishes, dining room |
| `/menus` | Five services as tabs; the active one is mirrored to `?service=` |
| `/drinks` | Cask, cocktail and wine lists |
| `/gallery` | Nine plates with a keyboard-navigable lightbox |
| `/visit` | Booking form with validation (nothing is sent) and details |
| `*` | Not found |

## Animation

Modelled on churchillarmskensington.co.uk:

- **Hero** — four slides, 5s each, 1.1s crossfade with a slow Ken Burns push;
  progress bars, pause on hover and when the tab is hidden.
- **Header** — shrinks and gains a shadow past 24px of scroll; a spring-damped
  reading-progress hairline sits under it.
- **Scroll reveals** — `Reveal` / `RevealGroup` wrap Framer Motion's
  `whileInView`, fire once, and stagger their children.
- **Route changes** — cross-fade with a small vertical offset.
- **Menu tabs** — the underline is a shared `layoutId`, so it slides between tabs.
- **Lightbox, drawer, form** — spring/eased enter and exit, plus an SVG tick that
  draws itself on a successful booking.

Everything collapses under `prefers-reduced-motion: reduce`.

## Images

Remote Unsplash URLs, mapped per slot in `src/data/images.js`. Swap the ids there
(or point them at local files in `public/`) to use real photography.

## Deploying

Client-side routing, so a static host needs all unknown paths rewritten to
`index.html` (Netlify `_redirects`, Vercel rewrites, `try_files` on nginx).

### Docker

From the repo root:

```bash
docker compose up --build
```

`site` builds the app and copies `dist/` into a shared volume, then `nginx`
(config at `../nginx/nginx.conf`) serves it on http://localhost:8080. The
`nginx` service is separate so it can later front additional services (e.g.
an API) rather than being baked into the app image.

CI (`.github/workflows/ci.yml`) builds the app, brings up this same compose
stack, and runs the Playwright e2e suite against it on every push/PR.
