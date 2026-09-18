# API

**There is no API yet.** The Visit page's booking form and the footer
newsletter signup are both frontend-only today — submitting them validates
input client-side but sends nothing anywhere (see `site/README.md`).

What exists is the data layer this future API will sit in front of:
PostgreSQL, modelled with [Prisma](https://www.prisma.io/), in
[`db/`](db). This document describes that schema so a backend can be built
against it without re-deriving it from `db/prisma/schema.prisma`.

## Models

### `Client`

A person, deduplicated by `phone`/`email` across reservations and
newsletter signups, so a future admin view can show one history per guest.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | Primary key |
| `name` | `String?` | |
| `phone` | `String?` | Unique |
| `email` | `String?` | Unique |
| `createdAt` / `updatedAt` | `DateTime` | |

### `Reservation`

One submission of the Visit page booking form.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | Primary key |
| `clientId` | `String?` | FK → `Client`, optional |
| `name` | `String` | |
| `phone` | `String` | |
| `date` | `Date` | |
| `sitting` | `String` | Which sitting/service was booked |
| `guests` | `Int` | |
| `notes` | `String?` | |
| `status` | `PENDING \| CONFIRMED \| CANCELLED` | Defaults to `PENDING` |
| `createdAt` | `DateTime` | |

### `NewsletterSignup`

One submission of the footer email signup.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` (cuid) | Primary key |
| `email` | `String` | Unique |
| `clientId` | `String?` | FK → `Client`, unique |
| `createdAt` | `DateTime` | |

## Running the database locally

```bash
docker compose up -d postgres   # from the repo root

cd db
cp .env.example .env
npm install
npm run migrate      # apply/create migrations (interactive, local dev)
npm run studio        # browse data at http://localhost:5555
```

See [`db/README.md`](db/README.md) for the full rundown, and
[ARCHITECTURE.md](ARCHITECTURE.md) for how this fits into the rest of the
stack.

## Building the API

When a backend gets built against this schema, this document should grow
endpoint-by-endpoint (route, method, request/response shape) instead of
staying schema-only — update it alongside whatever framework gets chosen.
