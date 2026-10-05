# Books

Static book showcase site: React 19 + TypeScript + Vite 8, Tailwind CSS 4,
React Router 7, react-markdown for chapters. No runtime backend — all content
is frozen data served as static files, deployable to any static host.

## Commands

- `npm run dev` — dev server (serves everything from `public/`)
- `npm run build` — type-check + production build (`tsc -b && vite build`)
- `npm run lint` — ESLint
- `npm test` — Vitest + React Testing Library unit tests
- `npm run preview` — serve the built `dist/` locally
- `node scripts/optimize-images.ts` — convert images under `public/static/` and
  `src/assets/` to WebP; also rewrites image URLs in `public/api/database.json`
  (imported `src/assets` references must be updated by hand)

## Content workflow

`public/api/database.json` is the source of truth for books and characters —
edit it directly and commit; there is no database. Images live in
`public/static/covers/`, `public/static/characters/` and
`public/static/gallery/` in WebP format; the JSON references them by absolute
URL (`/static/...`), so never rename them in code. `books[].purchase_url`
(optional) is the target of the "Купить" button (falls back to `#` when
empty). The script runs on Node >= 22.12 via type-stripping; `sharp` is a
devDependency used only by the script, never in `src/`.

## Deployment

Any static host that serves from the domain root:

- Build command: `npm run build`
- Output directory: `dist`

**GitHub Pages**: `.github/workflows/deploy.yml` builds and deploys on every
push to `main`. Enable it once in repo Settings → Pages → Source: GitHub
Actions; the site is served at `https://<user>.github.io/books-frontend/`.
The workflow passes `VITE_BASE=/<repo-name>/` to Vite, and `BrowserRouter`
normalizes `import.meta.env.BASE_URL` into its `basename` — no manual
changes needed when the URL changes. The workflow also copies `index.html`
to `404.html` so deep links work (GitHub Pages has no SPA fallback). Local
builds and any other host keep root-relative URLs.

**Cloudflare Pages**: `.github/workflows/deploy-cloudflare.yml` builds on
GitHub Actions (Node 22, lint + test + build) and uploads `dist` via
`wrangler pages deploy` — Cloudflare never builds anything itself. One-time
setup: create an API token with the "Cloudflare Pages — Edit" template, then
add repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
(Settings → Secrets and variables → Actions). The site is served at
`https://books-frontend.pages.dev/`; the first workflow run creates the
project. `public/_redirects` provides the SPA fallback, so deep links get
real 200 responses (no base-path handling needed — `VITE_BASE` stays unset).

`public/_redirects` (`/* /index.html 200`) provides the SPA fallback on
Netlify and Cloudflare Pages. On Vercel, add an equivalent rewrite via
`vercel.json`.
