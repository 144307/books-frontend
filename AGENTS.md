# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview
Book showcase storefront: fully static site (React 19 + TypeScript + Vite 8),
deployable to any static host. Book/character data is frozen — no runtime
backend and no database; BookContextProvider fetches
`public/api/database.json`, which is also the content source of truth (edit
it directly). The former Express + better-sqlite3 backend repo (books-server)
is archived.
React Router 7 for routing, Tailwind CSS 4 (via Vite plugin) for styling,
react-markdown for rendering book chapters. Some UI copy and TODOs are in Russian.

## Commands
- `npm run dev` — Vite dev server (serves everything from `public/`, no proxy)
- `npm run build` — type-check + production build (`tsc -b && vite build`)
- `npm run lint` — ESLint (flat config, typescript-eslint + react-hooks + react-refresh)
- `npm test` — Vitest + React Testing Library (jsdom; setup in `src/test/setup.ts`)
- `npm run preview` — serve built output
- `node scripts/optimize-images.ts` — one-shot WebP conversion of images under
  `public/static/` + `src/assets/`; also rewrites image URLs in
  `public/api/database.json` (run it after adding new images; imported
  `src/assets` references must be updated by hand)

The verification loop for every change is `npm run lint && npm test && npm run build`
— CI (`.github/workflows/ci.yml`) runs the same trio. Tests are co-located with
the code (`*.test.ts(x)` next to the module); run one file via
`npx vitest run src/utils/fragment.test.ts`.

## Architecture
- `src/main.tsx` — entry: StrictMode > BrowserRouter > BookContextProvider >
  ScrollToTop + App
- `src/App.tsx` — all routes live here: `/` (Home), `/now-in-works`,
  `/about-author`, `/books/:bookID` (BookPage),
  `/books/:bookID/fragment/:fragmentID?` (trailing segment optional, defaults
  to chapter 1 in code), `*` → NotFound.
- `src/pages/` — route-level components (Home, BookPage, Fragment, NowInWorks,
  AboutAuthor, NotFound). Every page renders inside `Layout`
  (skip-link + sticky Header + `<main>` + Footer).
- `src/components/X/X.tsx` — one folder per component, file named same as
  component. Shared primitives: `Layout` (page shell), `Button`
  (variant "outline" | "accent", sizes "md" | "lg", renders Link when `to` is
  given, external anchor when `href`), `PageMessage`
  (kind "loading" | "error" | "notice").
- `src/context/` — context triplet pattern:
  `BookContext.ts` (createContext) + `BookContextProvider.tsx` (fetch + state
  + item-level shape validation) + `useBookContext.ts` (useContext wrapper
  that throws if missing)
- `src/hooks/usePageTitle.ts` — sets `document.title` (`{page} — {site}` pattern)
- `src/utils/fragment.ts` — pure chapter resolution logic used by Fragment
- `src/types.ts` — shared API/domain types (`ClientBook`, `Character`,
  `BookContextState`)
- `src/assets/` — imported assets (banner), WebP format

### Data flow
All books are fetched ONCE in BookContextProvider from `/api/database.json`
(a static file in `public/api/`) and live in context
({ books, characters, isLoading, error }). Pages read from context; the
Fragment page resolves chapters locally (no per-chapter fetch). Book rows
carry `chapters: string[]` (contiguous chapters collected from `chapter_1..5`
DB columns at export time) — markdown rendered by react-markdown. Books also
carry `character_ids: number[]` (BookPage filters the shared character list)
and `gallery: string[]` (illustration URLs for its Gallery section);
`purchase_url: string | null` toggles the "Купить" button.
Images are served from `public/static/` (`/static/covers/...`,
`/static/characters/...`, `/static/gallery/...` — URLs come from the JSON,
never rewrite them in code).
Content edits: `public/api/database.json` IS the source of truth — edit it
directly and commit (there is no database; the old sqlite export workflow was
removed). `scripts/*.ts` are NOT part of `tsc -b` (outside all tsconfigs)
and run via Node type-stripping (Node >= 22.12); `sharp` is a devDependency
only — never import it in `src/`.

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
- No runtime env vars; the app is fully static.

### Styling (Tailwind 4, no config file)
- Utility classes inline; no CSS modules; global CSS only in `src/index.css`
  (`@import "tailwindcss"; @plugin "@tailwindcss/typography";`).
- Typography plugin for prose: `prose prose-stone prose-p:my-4 prose-p:text-justify`.
- Arbitrary values are idiomatic here: `w-[54rem]`, `bg-[#f4ecd8]`,
  `tracking-[0.3em]`; book font via `font-book` (`--font-book` in `@theme`).
- Buttons: use the shared `Button` component (variant "outline" | "accent",
  size "md" | "lg") instead of re-inlining button classes; it always sets
  `type="button"` for real buttons and handles Link/anchor variants.
- Layout constants: universal page width via the `page-width` utility defined in
  `src/index.css` (81rem, centered, max-w-full); pair with `px-6` for gutters.
  Sepia page background `bg-[#f4ecd8]`.

### Error handling
- Fetches validate response.ok, then shape-check the JSON body, throwing
  descriptive Errors ("Bad response shape", `HTTP ${res.status}`).
- Errors land in state and render the sepia error UI (Header + amber-toned
  message), never alert()/console-only.
- Defensive defaults at boundaries: `?? "-1"` / `?? "1"` for
  params, strict coercion (`=== true`) for optional booleans from the API.

### React conventions
- Effects: include every reactive dependency used (params, context slices).
- Prefer context reads over prop-drilling; pages map context.books by id
  (`books.find(b => b.id === bookID)`) — ids are 1-based, arrays are 0-indexed.
- No comments in code; keep diffs minimal and surgical.

### Testing
- Vitest + React Testing Library on jsdom; config in `vite.config.ts`
  (`test.environment`, setup file), cleanup in `src/test/setup.ts`.
- Tests are co-located (`X.test.tsx` next to `X.tsx`); use explicit vitest
  imports (`import { describe, it, expect } from "vitest"`) — globals are OFF.
- Components using router features need a `MemoryRouter` wrapper; context
  consumers need `<BookContext value={state}>`.

## Gotchas
- `tsc -b` enforces `noUnusedLocals` / `noUnusedParameters` — delete dead code.
- `erasableSyntaxOnly` — no enums/namespaces/parameter properties.
- StrictMode double-invokes effects in dev; keep effects idempotent.
- TODO.txt (Russian) tracks pending work; consult it before large refactors.
- Windows environment: quote asset paths containing spaces/Cyrillic characters.
