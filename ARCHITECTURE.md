# Central Tour Monorepo Architecture

Canonical architecture for the Central Tour monorepo. It applies **identically to every app** under `apps/*` — today that is `apps/b2c` and `apps/b2b`, tomorrow it is any new consumer product. If generated code conflicts with this document, this document wins.

## How the two apps relate

b2c and b2b are two instances of **the same architecture**. They differ in:

- which modules they include,
- how many pages each module has (e.g. `profile` can have 2–3 pages in b2c and 10+ pages in b2b),
- route groups and URL shape,
- theme (CSS variables only),
- copy / translations.

They do **not** differ in:

- folder structure,
- module contract,
- API/state/routing conventions,
- shared UI source (`packages/ui`),
- tooling (`packages/config`, `tsconfig.base.json`).

Everywhere this document says `apps/*`, the rule is identical in every app.

## Documentation map

| Document                         | Role                                                |
| -------------------------------- | --------------------------------------------------- |
| `README.md`                      | Short human overview and onboarding                 |
| `ARCHITECTURE.md`                | **This file** — full architecture and rules         |
| `AGENTS.md`                      | AI assistant behavior, verification, and priorities |
| `.cursor/rules/central-tour.mdc` | Cursor always-on condensed rules                    |

## Top-level layout

```txt
.
├── apps/
│   ├── b2c/                       # Next.js app (public consumer)
│   ├── b2b/                       # Next.js app (partner console)
│   └── <future-app>/              # same shape as b2c / b2b
├── packages/
│   ├── ui/                        # shadcn primitives + common wrappers
│   └── config/                    # eslint, prettier, postcss, shared globals.css
├── eslint.config.mjs              # root flat config (imports packages/config)
├── tsconfig.base.json             # shared TS options
├── package.json                   # yarn 4 workspaces
└── .yarnrc.yml
```

## App-level layout (identical for every app in apps/\*)

```txt
apps/<app>/
├── src/
│   ├── app/                       # routing ONLY (Next App Router)
│   │   ├── [lang]/layout.tsx
│   │   ├── [lang]/page.tsx
│   │   ├── globals.css            # app-local theme overrides (CSS vars only)
│   │   └── ...
│   ├── modules/                   # product modules (auth, home, profile, flights, ...)
│   │   └── <product>/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/          # API/data orchestration for this product
│   │       ├── types/
│   │       └── pages/             # page-level compositions (count varies per app)
│   ├── shared/                    # app-local generic code
│   │   ├── api/                   # base API client + shared request helpers
│   │   ├── lib/                   # utilities, i18n
│   │   ├── components/common/     # app-level generic components
│   │   └── types/
│   └── proxy.ts                   # next-intl routing (Next 16 `proxy.ts` convention)
├── messages/                      # next-intl dictionaries (en/ru/uz)
├── public/
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json                  # extends ../../tsconfig.base.json
```

Both `apps/b2c` and `apps/b2b` follow this tree exactly. If a new app is added under `apps/<name>`, it gets the same tree.

## Core principle

Each product area is an independent module, for example:

- `auth`, `home`, `profile`, `flights`, `hotels`, `transfers`, `excursions`, `car-rental`, `packages`, `extras`, …

Each module may own its own UI, business logic, routes/flows, services, types, hooks, and pages. Shared code supports modules without absorbing product-specific behavior.

Module inventory and page counts are allowed to differ between apps. Module **shape** is not.

### Example — same module, different depth per app

```txt
apps/b2c/src/modules/profile/pages/
  profile-overview.tsx
  profile-bookings.tsx
  profile-settings.tsx

apps/b2b/src/modules/profile/pages/
  profile-overview.tsx
  profile-company.tsx
  profile-agents.tsx
  profile-payouts.tsx
  profile-contracts.tsx
  profile-markups.tsx
  profile-api-keys.tsx
  profile-audit-log.tsx
  profile-notifications.tsx
  profile-settings.tsx
```

Both look like the same module; each follows the same `components/hooks/services/types/pages` contract. The page count diverges because the products diverge, and that is fine.

## Packages

- `packages/ui`
  - Base shadcn primitives in `src/components/ui/*` — **do not edit** after generation; treat as stable.
  - App-wide variants/wrappers in `src/common/*` (e.g. `SecondaryGrayButton`).
  - Every app consumes UI via `import { Button } from "ui"`.
- `packages/config`
  - Exports shared ESLint flat config (`@central-tour/config/eslint/next`).
  - Exports shared Prettier (`@central-tour/config/prettier`).
  - Exports shared PostCSS (`@central-tour/config/postcss`).
  - Owns the shared Tailwind v4 `globals.css` with `@theme inline` tokens.

## Theming

- Tailwind v4 CSS-first: `@import "tailwindcss"` + `@theme inline` in the shared stylesheet.
- Per-app overrides are **CSS variables only** (in each app's `src/app/globals.css`).
- Do not fork UI components per app. If b2b wants a different primary, it overrides `--primary`. If a screen needs a different visual, create a wrapper in `packages/ui/src/common` or `apps/<app>/src/shared/components/common`, not a fork of the shadcn base.

## ESLint

- Single root `eslint.config.mjs` imports the shared preset from `packages/config/eslint/next.mjs`.
- Run `yarn lint` from the repo root; one config covers every workspace (every app in `apps/*`, every package in `packages/*`).
- `import/order` uses static `pathGroups` matching `@/app/**`, `@/modules/**`, `@/shared/**`, `ui`, `ui/**`.

## Routing

- Each app owns its own routes and URL design.
- Every app uses next-intl's `proxy.ts` (Next 16 convention) at `apps/<app>/src/proxy.ts` for locale routing.
- Use Next route groups per app as needed (e.g. `(auth)`, `(main)`, `(protected)`) — b2c and b2b may use different combinations.
- Protected routes enforced on the server (layout or proxy/middleware equivalent).

## Rendering

- Default to server components.
- Use client components only when necessary (forms, filters, modals, local UI state, browser APIs).
- SEO-critical pages must render meaningful server HTML.
- Prefer URL-based state for filters/search/deep links.

## State and API rules

- server state with TanStack Query (when added)
- URL state via route/query params
- local UI state via local state or Zustand only when necessary
- API calls go through `apps/*/src/shared/api` (base client) and `apps/*/src/modules/*/services` (feature logic)
- **Never** call APIs directly from React components.

## Shared vs module boundary

Use `packages/ui` and `apps/*/src/shared/` for:

- UI primitives (`packages/ui/src/components/ui`)
- cross-app wrappers (`packages/ui/src/common`)
- utilities (`apps/*/src/shared/lib`)
- generic API client (`apps/*/src/shared/api`)
- app-wide constants (`apps/*/src/shared`)

Use `apps/*/src/modules/` for:

- business logic
- product-specific UI
- product-specific services, types, hooks, pages

## Adding a page to an existing module (any app in `apps/*`)

Follow these steps every time, in any app. The contract is identical whether you touch `apps/b2c`, `apps/b2b`, or a future app.

1. **Build the page component inside the module** — never in `src/app/`.

   ```
   apps/<app>/src/modules/<product>/pages/<page-name>.tsx
   ```

   This file is the composition root for the page: it owns layout, orchestrates child components, and calls `src/modules/<product>/services/*` or `src/shared/api/*` for data. No inline API calls. No business logic inside `src/app/`.

2. **If the page needs fresh child components, add them to the same module.**

   ```
   apps/<app>/src/modules/<product>/components/<component-name>.tsx
   apps/<app>/src/modules/<product>/hooks/use-<thing>.ts
   apps/<app>/src/modules/<product>/types/<thing>.ts
   ```

   If a component is generic enough that another module could reuse it:
   - App-wide generic → `apps/<app>/src/shared/components/common/`
   - Monorepo-wide generic → `packages/ui/src/common/`

3. **If the page needs a new endpoint, extend the module's services — not a component.**

   ```
   apps/<app>/src/modules/<product>/services/<resource>.ts
   ```

   Use the shared base client from `apps/<app>/src/shared/api`. Never `fetch`/`axios` from inside a React component.

4. **Wire the route in `src/app/`** — the routing file is the only place that knows this page exists.

   ```tsx
   // apps/<app>/src/app/[lang]/<route-segment>/page.tsx
   import { YourPage } from "@/modules/<product>/pages/<page-name>"

   export default async function Page({
     params,
   }: {
     params: Promise<{ lang: string }>
   }) {
     const { lang } = await params
     return <YourPage lang={lang} />
   }
   ```

   The route file must contain **only** composition — no UI, no logic.

5. **Add translations.** For every locale in `apps/<app>/messages/<locale>.json`, add keys under a namespace that matches the module (e.g. `"profile"`). Use `getTranslations("profile")` in the page.

6. **Verify.**

   ```bash
   yarn workspace <app> type-check
   yarn lint
   yarn workspace <app> build
   ```

### Conventions used in the example

- Page file lives at `modules/<product>/pages/<page-name>.tsx`, not in `app/`.
- The route file in `app/` is a one-liner that imports and renders the page component.
- Number of pages per module can differ between apps (b2c may ship 3 profile pages, b2b may ship 10) — **the shape above is the same in every app**.

### Anti-patterns (in any app)

- Putting page UI directly inside `apps/*/src/app/[lang]/<route>/page.tsx` → move to `src/modules/<product>/pages/*`.
- Calling `fetch(...)` inside a component → move to `src/modules/<product>/services/*`.
- Creating a per-app copy of a shared component → override theme via CSS variables or create a wrapper in `packages/ui/src/common`.
- Using `@/shared/...` for business logic → move it to `@/modules/<product>/...`.

## Adding a new app under apps/\*

1. Copy the shape of an existing app (e.g. `apps/b2c`).
2. Set a unique workspace name in `package.json` and a unique dev port.
3. Depend on `"ui": "workspace:*"` and `"@central-tour/config": "workspace:*"`.
4. Import the shared globals in `src/app/globals.css` and override only CSS variables.
5. Add `dev:<app>` / `build:<app>` scripts in the root `package.json`.
6. All rules in this document apply automatically — the new app is just another instance of the same architecture.
