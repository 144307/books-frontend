# Books

Static book showcase site: React 19 + TypeScript + Vite 8, Tailwind CSS 4,
React Router 7, react-markdown for chapters. No runtime backend — all content
is frozen data served as static files, deployable to any static host.

## Commands

- `npm run dev` — dev server (serves everything from `public/`)
- `npm run build` — type-check + production build (`tsc -b && vite build`)
- `npm run lint` — ESLint
- `npm run preview` — serve the built `dist/` locally
- `npm run export-data` — regenerate `public/api/database.json` from `data/database.sqlite`

## Content workflow

`data/database.sqlite` is the source of truth. After changing it (sqlite
client only — the admin tooling lives in the archived books-server repo):

```
npm run export-data
```

then commit both `data/database.sqlite` and `public/api/database.json`.
Images live in `public/static/covers/` and `public/static/characters/`; the
JSON references them by absolute URL (`/static/...`), so never rename them
in code. The export script runs on Node >= 22.12 via type-stripping;
`better-sqlite3` is a devDependency used only by the script, never in `src/`.

## Deployment

Any static host that serves from the domain root:

- Build command: `npm run build`
- Output directory: `dist`

`public/_redirects` (`/* /index.html 200`) provides the SPA fallback on
Netlify and Cloudflare Pages. On Vercel, add an equivalent rewrite via
`vercel.json`. Subpath hosting (e.g. GitHub Pages project sites) is not
supported — asset and data URLs are root-relative.
