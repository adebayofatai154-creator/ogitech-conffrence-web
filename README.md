# OGITECH SET — Hybrid International Conference Platform

A full-stack conference website and research submission/publication platform
for the School of Engineering Technology, Ogun State Institute of Technology,
Igbesa (OGITECH) — built for the 2nd Hybrid International Conference.

## Stack
Next.js (App Router) · TypeScript · PostgreSQL · Prisma · Cloudinary · Zod

## Setup

1. Install dependencies
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in real values:
   - `DATABASE_URL` — your PostgreSQL connection string
   - `AUTH_SECRET` — generate with `openssl rand -base64 32`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — for the first admin account

3. Create the database schema
   ```
   npm run db:migrate
   ```

4. Seed the initial admin account
   ```
   npm run db:seed
   ```

5. Run the app
   ```
   npm run dev
   ```

## What's included

- Public site: home, about, conference, speakers, call for papers,
  registration, accommodation, research library + detail pages, contact
- Researcher submission flow: no account needed, drag-and-drop upload to
  Cloudinary, Zod validation client + server side, success confirmation
- Admin: cookie-based session auth (`lib/auth.ts`), protected via
  `middleware.ts`, dashboard metrics, submissions table with search/filter/
  pagination, submission review (mark under review / approve / reject /
  publish with confirmation), metadata editor for title/abstract/category/
  keywords before publishing, published-research list
- Reliability: loading skeletons, empty states, global + route error
  boundaries, custom 404, safe error messages (no stack traces to users)
- SEO: per-page metadata, dynamic metadata for research pages, sitemap.xml,
  robots.txt (admin disallowed)

## About the redesign (this version)

The public frontend was redesigned around a single, information-dense homepage instead
of many separate pages, per the new IA:

- Navigation: Home · Conference · Speakers · Research · Registration · Submit Paper
  (sticky, scroll-spy on the homepage, accessible mobile drawer with focus trap)
- Old standalone pages (`/about`, `/call-for-papers`, `/accommodation`, `/contact`) now
  redirect (308, permanent) to their homepage section, so old links keep working
- `/conference` and `/speakers` remain as expanded secondary pages, reusing the same
  homepage section components
- All backend logic is untouched: Prisma schema, server actions, Cloudinary upload,
  admin auth/dashboard, and the submission workflow are exactly as before
- Fonts are now self-hosted (`public/fonts`, OFL-licensed Montserrat/Inter) instead of
  loaded from Google Fonts at request time
- New: `lib/utils.ts` (date/download-URL helpers), `components/site/*` (header, footer,
  icons, reveal-on-scroll, countdown), `components/home/*` (one component per homepage
  section), `app/site.css` (mobile-first stylesheet for the public site, separate from
  `app/globals.css` which now holds only shared tokens/primitives used by both the
  public site and the admin app)

This was checked in a real headless browser in this environment (not just type-checked):
every public route was screenshotted at 320/375/390/414/480/600/768/900/1024/1100/1280/1440px
with a script that measures `scrollWidth` vs viewport width — zero horizontal overflow
at any width on any page. Heading hierarchy (h1→h2→h3, no skipped levels), focus
trapping and Escape-to-close on the mobile drawer, and WCAG contrast ratios for text/
background pairs (hero, nav, footer, forms, muted captions) were all verified
programmatically. The database itself was stubbed to do this (see the note below).

## Things to double-check before going live

- **Speaker photo crops**: the four supplied speaker photos were scans/screenshots with
  printed captions, a watermark, or colored borders baked in. `lib/speakers.ts` now
  crops/zooms each one (`objectPosition` + `zoom`) to hide that baked-in text — verified
  visually in this environment. If you swap a photo, re-check its crop; a thin sliver of
  a photo\'s original border may still be visible at the very edge on some of them.
- **Speaker photo assignment**: the Keynote Speaker and Lead Speaker photos
  in `lib/speakers.ts` were matched by best guess from the images you
  supplied (only the Rector and the Dean's photos had a matching name
  printed on them). Confirm these are correct or swap the file paths.
- **Secretary's name spelling** ("Engr. Adeimpe H. A.") was unclear in the
  source material — it's a plain env var (`SECRETARY_NAME`) so it's easy
  to correct without touching code.
- **Rate limiting** is not yet implemented on `/submit` or `/admin/login` —
  add it (e.g. via an edge middleware counter or a service like Upstash)
  before launch to slow down abuse.
- This was assembled and reasoned through in one pass, not run against a
  live Postgres/Cloudinary instance — run `npm install && npm run build`
  locally to catch anything environment-specific before deploying.
