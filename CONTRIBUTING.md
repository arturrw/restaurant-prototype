# Contributing

## Setup

```bash
cd site
npm install
npm run dev      # http://localhost:5173
```

For the database (only needed if you're working on `db/` or a future
backend), see [`db/README.md`](db/README.md).

## Before opening a PR

From `site/`:

```bash
npm run lint      # eslint
npm run build     # make sure it builds
npm run test:e2e  # Playwright — needs the Docker stack running (see below)
```

To run the e2e suite the way CI does:

```bash
docker compose up --build -d   # from the repo root
cd site
BASE_URL=http://localhost:8080 npm run test:e2e
```

CI (`.github/workflows/ci.yml`) runs the same lint/build/e2e steps on every
push and PR — a green run there is the bar.

## Conventions

- Frontend code lives entirely in `site/src/`; static content (menus,
  drinks, images, etc.) is hand-written data under `site/src/data/` rather
  than pulled from a CMS.
- Styling uses the CSS custom properties and component classes in
  `site/src/index.css` (ported from the `_ds/classical-*` design system) —
  prefer those over one-off inline styles or new utility classes.
- Respect `prefers-reduced-motion: reduce`: any new animation should have a
  reduced-motion fallback, matching the existing ones in `index.css`.
- Keep commit messages and PR descriptions focused on *why*, not a
  restatement of the diff.

## Project layout

See [ARCHITECTURE.md](ARCHITECTURE.md) for how the frontend, database and
Docker/nginx pieces fit together, and [API.md](API.md) for the data schema
a future backend will build against.
