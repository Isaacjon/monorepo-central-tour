# Central Tour Monorepo

Yarn 4 workspaces monorepo that hosts the Central Tour consumer and partner apps, sharing a design system and tooling.

- `apps/b2c` — public consumer app (Next.js 16, React 19, Tailwind v4, next-intl)
- `apps/b2b` — partner console (same stack, different `--primary` via CSS variables only)
- `packages/ui` — shadcn primitives + common wrappers, consumed as `import { Button } from "ui"`
- `packages/config` — shared ESLint (flat), Prettier, PostCSS, and Tailwind v4 `globals.css`

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) and [`AGENTS.md`](./AGENTS.md) for rules.

## Requirements

- Node `^22`
- Yarn `4.13.x` (Corepack enabled)

## Install

```bash
corepack enable
yarn install
```

## Run apps independently

```bash
yarn dev:b2c   # http://localhost:3000
yarn dev:b2b   # http://localhost:3001
```

## Build

```bash
yarn build:b2c
yarn build:b2b
```

## Quality

```bash
yarn lint
yarn lint:fix
yarn format
yarn format:check
yarn type-check
```

## Structure

```
.
├── apps/
│   ├── b2c/
│   └── b2b/
├── packages/
│   ├── ui/
│   └── config/
├── eslint.config.mjs      # imports packages/config/eslint/next.mjs
├── tsconfig.base.json
└── package.json
```

## Theming

Both apps pull tokens from `@central-tour/config/styles/globals.css`. Each app's
`apps/<app>/src/app/globals.css` imports that file and can override CSS variables
(e.g. `--primary`) without forking UI components.

## Adding a shadcn component

Run the shadcn CLI against the `packages/ui` workspace (its `components.json` is
preconfigured). Do not modify generated primitives — wrap them in
`packages/ui/src/common/*` or in an app's `src/modules/*`.
