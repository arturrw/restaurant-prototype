# db

PostgreSQL schema and migrations for The Marigold Arms, managed with
[Prisma](https://www.prisma.io/). No API/admin app reads this yet — this is
just the data layer, ready to be imported by whatever backend gets built.

## Models

- **Client** — a person, matched by phone/email across reservations and
  newsletter signups so the future admin dashboard can show one history
  per person.
- **Reservation** — one submission of the Visit page booking form
  (name, phone, date, sitting, guests, notes, status).
- **NewsletterSignup** — one submission of the footer email signup form.

## Usage

The `postgres` service in the root `docker-compose.yml` runs the database.

```bash
docker compose up -d postgres

cd db
cp .env.example .env   # matches the docker-compose credentials
npm install
npm run migrate         # apply migrations, create new ones from schema changes
npm run studio           # browse data at http://localhost:5555
```

`npm run migrate` is for local development (`prisma migrate dev`, needs an
interactive shadow database). CI/production apply already-created migrations
non-interactively with `npm run migrate:deploy`.
