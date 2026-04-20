<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`.
Docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# HARD ARCHITECTURE RULES (MUST NOT BE BROKEN)

These rules apply **identically to every app** under `apps/*` (today: `apps/b2c`, `apps/b2b`; any future app inherits them automatically). b2c and b2b share the same architecture — they only differ in **scale and content** (page counts per module, route groups, translations, CSS variable overrides). They do NOT differ in structure, boundaries, or conventions.

## Routing and boundaries

- `apps/*/src/app/` is for routing ONLY
- DO NOT put UI, hooks, or business logic inside `apps/*/src/app/`
- All feature code MUST live inside `apps/*/src/modules/*`
- Pages in `apps/*/src/app/` MUST only compose modules
- Shared primitives live in `packages/ui` — never fork them per app

## Auth / features (per app, same shape)

- Login/register MUST live in `apps/<app>/src/modules/auth`
- Profile / bookings / dashboard / any product flow MUST live in `apps/<app>/src/modules/<product>`
- Number of pages inside a module may differ between apps (e.g. `profile` with 3 pages in b2c vs 10+ in b2b) — that is allowed
- Route files MUST NOT contain business logic or UI beyond composition, in any app

## API (per app, same shape)

- DO NOT call APIs inside React components
- Use `apps/*/src/shared/api` for the base client
- Use `apps/*/src/modules/*/services` for feature logic

If any rule is violated:
→ STOP
→ Fix the structure BEFORE continuing

---

# AI Agent Instructions

Act like a senior frontend engineer.

Priorities:

1. ARCHITECTURE.md
2. User request
3. README.md
4. Existing patterns (prefer patterns from whichever app already implements the feature; copy shape, not the exact code)

If a user request conflicts with ARCHITECTURE.md:
→ DO NOT proceed blindly
→ Ask OR refactor to comply with architecture

Rules are app-agnostic: when writing in `apps/b2c` or `apps/b2b`, treat them as two instances of the same architecture.

---

# Project model

- Monorepo with multiple product apps under `apps/*` (currently `b2c`, `b2b`). Both apps have near-identical architecture; only page inventory and content differ.
- Both apps share:
  - `packages/ui` — shadcn primitives + common wrappers
  - `packages/config` — ESLint, Prettier, PostCSS, shared Tailwind v4 `globals.css`
- Each app is an independent product surface
- Each domain inside an app = independent module (flights, hotels, auth, home, profile, …)

---

# Per-app divergence (what is allowed to differ)

Allowed to differ between apps:

- Number of modules present
- Number of pages inside a module (e.g. `profile` — 2–3 pages in b2c, 10+ pages in b2b)
- Route groups and URL shape (e.g. one app uses `(protected)`, the other may not need it)
- Theme via CSS variables in `apps/<app>/src/app/globals.css` (`--primary`, etc.)
- Copy and translations in `messages/*.json`
- Locale list in next-intl routing (only if a product truly needs different coverage)

NOT allowed to differ:

- Folder shape (`src/app`, `src/modules`, `src/shared`)
- Module contract (`components`, `hooks`, `services`, `types`, `pages`)
- Where API calls live (never in components; always in `src/shared/api` + `src/modules/*/services`)
- Shared primitive source (always `packages/ui`)
- Base tooling (always `packages/config` + `tsconfig.base.json`)

---

# Required working rules (every app)

- preserve module boundaries
- keep `packages/*` generic only
- keep business logic inside app modules
- avoid cross-module leakage
- prefer server components
- use client components only when necessary
- prefer URL-driven state
- treat `packages/ui/src/components/ui/*` (shadcn base) as stable primitives
- never restyle/repurpose root shadcn primitives for a single screen
- create feature-level variants via wrappers in `packages/ui/src/common` (monorepo-wide) or `apps/*/src/shared/components/common` (app-local)
- override theme only via CSS variables in `apps/*/src/app/globals.css`

---

# Commands

- `yarn dev:b2c` / `yarn dev:b2b` — run a single app
- `yarn build:b2c` / `yarn build:b2b` — build a single app
- `yarn lint` / `yarn lint:fix` — shared ESLint across monorepo
- `yarn format` / `yarn format:check` — Prettier across monorepo
- `yarn type-check` — TS across all workspaces

---

# Adding a page (quick reference)

Steps are the same in every app under `apps/*`:

1. Create the page composition at `apps/<app>/src/modules/<product>/pages/<page-name>.tsx` (not in `src/app/`).
2. Add supporting code in the same module: `components/`, `hooks/`, `services/`, `types/`.
3. Put new API calls in `src/modules/<product>/services/*`, using the base client from `src/shared/api`. Never from a component.
4. Wire the route as a one-liner at `apps/<app>/src/app/[lang]/<segment>/page.tsx` that imports the page component — no UI, no logic in route files.
5. Add translations to every locale in `apps/<app>/messages/<locale>.json` under a module namespace.
6. Verify: `yarn workspace <app> type-check`, `yarn lint`, `yarn workspace <app> build`.

Full detail, examples, and anti-patterns: [`ARCHITECTURE.md`](./ARCHITECTURE.md#adding-a-page-to-an-existing-module-any-app-in-apps).

---

# Git commits (Conventional Commits)

Format: `type(scope): description`

Valid scopes include: `b2c`, `b2b`, `ui`, `config`, `repo`, or a module name.

Examples:

- `feat(b2c): add hotel search shell`
- `feat(b2b): add supplier contracts module`
- `fix(ui): handle empty button label`
- `chore(config): bump eslint`
- `chore(repo): update workspace scripts`
