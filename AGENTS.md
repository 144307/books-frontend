# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview
Book showcase storefront: React 19 + TypeScript + Vite 8 frontend consuming a
JSON API (external Express + better-sqlite3 backend on localhost:8000).
React Router 7 for routing, Tailwind CSS 4 (via Vite plugin) for styling,
react-markdown for rendering book chapters. Some UI copy and TODOs are in Russian.

## Commands
- `npm run dev` — Vite dev server; proxies `/api` and `/static` to http://localhost:8000
- `npm run build` — type-check + production build (`tsc -b && vite build`)
- `npm run lint` — ESLint (flat config, typescript-eslint + react-hooks + react-refresh)
- `npm run preview` — serve built output

There is NO test framework installed and no test script. Do not assume
Jest/Vitest/etc. exists. "Running a single test" is not applicable. If tests
are ever added, update this file. The de-facto verification loop for every
change is: `npm run lint && npm run build` — run both, they must pass.

## Architecture
- `src/main.tsx` — entry: StrictMode > BrowserRouter > BookContextProvider > App
- `src/App.tsx` — all routes live here. Route: `/books/:bookID/fragment/:fragmentID?`
  (trailing segment optional, defaults to chapter 1 in code). `*` → NotFound.
- `src/pages/` — route-level components (Home, Fragment, NotFound)
- `src/components/X/X.tsx` — one folder per component, file named same as component
- `src/context/` — context triplet pattern:
  `BookContext.ts` (createContext) + `BookContextProvider.tsx` (fetch + state)
  + `useBookContext.ts` (useContext wrapper that throws if missing)
- `src/types.ts` — shared API/domain types (`ClientBook`, `BookContextState`)
- `src/assets/` — imported assets (note: filenames contain spaces/Cyrillic)

### Data flow
All books are fetched ONCE in BookContextProvider from `${VITE_API_BASE_URL ?? ""}/api/database`
and live in context ({ books, isLoading, error }). Pages read from context; the
Fragment page resolves chapters locally (no per-chapter fetch). Backend rows carry
`chapter_1`..`chapter_5` columns (nullable) on the books table. Env var
`VITE_API_BASE_URL` is optional (dev proxy handles routing).

## Code Style

### Components
- `function Component() { ... }` declaration, `export default Component;` at the
  bottom. No default-exported arrow constants.
- Props typed via a named `ComponentProps` interface above the component.
- One component per file. Keep files small and single-purpose.

### Imports
- Double quotes, named imports. react-router v7: import from `"react-router"`,
  NEVER `"react-router-dom"`.
- `verbatimModuleSyntax` is ON — type-only imports MUST use `import type { X } from ...`
- Import order used across the codebase: react/router first, then components,
  then context, then types, then assets.

### Types
- Shared domain shapes go in `src/types.ts`. API responses are `unknown` at the
  boundary; validate shape manually (typeof / Array.isArray checks) before casting.
- Model async page state as a discriminated union (`{ type: "loading" } | "success" | "error"`)
  or a context state object `{ books, isLoading, error }` — not booleans.
- URL params are strings: parse with the `rawX`/`X` pattern
  (`const rawBookID = useParams()["bookID"]; const bookID = Number.parseInt(rawBookID ?? "-1")`)
  and handle NaN/missing via guards or error UI.

### Naming
- PascalCase components/types/interfaces, camelCase values/functions,
  snake_case ONLY for API-derived fields (`book_name`, `has_next`).
- Env vars: `VITE_API_BASE_URL` (access via `import.meta.env`).

### Styling (Tailwind 4, no config file)
- Utility classes inline; no CSS modules; global CSS only in `src/index.css`
  (`@import "tailwindcss"; @plugin "@tailwindcss/typography";`).
- Typography plugin for prose: `prose prose-stone prose-p:my-4 prose-p:text-justify`.
- Arbitrary values are idiomatic here: `w-[54rem]`, `bg-[#f4ecd8]`,
  `font-['Libre_Baskerville']`, `tracking-[0.3em]`.
- Buttons follow the established pattern: `cursor-pointer rounded-lg border
  border-stone-400 bg-stone-700 ... enabled:hover:bg-stone-600 disabled:cursor-not-allowed
  disabled:opacity-40` + `type="button"` always.
- Layout constants: universal page width via the `page-width` utility defined in
  `src/index.css` (81rem, centered, max-w-full); pair with `px-6` for gutters.
  Sepia page background `bg-[#f4ecd8]`.

### Error handling
- Fetches validate response.ok, then shape-check the JSON body, throwing
  descriptive Errors ("Bad response shape", `HTTP ${res.status}`).
- Errors land in state and render the sepia error UI (Header + amber-toned
  message), never alert()/console-only.
- Defensive defaults at boundaries: `?? ""` for env, `?? "-1"` / `?? "1"` for
  params, strict coercion (`=== true`) for optional booleans from the API.

### React conventions
- Effects: include every reactive dependency used (params, context slices).
- Prefer context reads over prop-drilling; pages map context.books by id
  (`books.find(b => b.id === bookID)`) — ids are 1-based, arrays are 0-indexed.
- No comments in code; keep diffs minimal and surgical.

## Gotchas
- `tsc -b` enforces `noUnusedLocals` / `noUnusedParameters` — delete dead code.
- `erasableSyntaxOnly` — no enums/namespaces/parameter properties.
- StrictMode double-invokes effects in dev; keep effects idempotent.
- Backend is a separate repo (localhost:8000). Frontend cannot fix API contracts;
  flag backend changes to the user instead of mocking around them.
- TODO.txt (Russian) tracks pending work; consult it before large refactors.
- Windows environment: quote asset paths containing spaces/Cyrillic characters.
