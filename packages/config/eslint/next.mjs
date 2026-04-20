import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const monorepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.."
)

/** Absolute tsconfig paths so import resolver works when ESLint cwd is a workspace (e.g. apps/b2b). */
function listWorkspaceTsconfigs() {
  const roots = ["apps", "packages"].map((segment) =>
    path.join(monorepoRoot, segment)
  )
  const projects = []
  for (const root of roots) {
    if (!fs.existsSync(root)) continue
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const tsconfig = path.join(root, entry.name, "tsconfig.json")
      if (fs.existsSync(tsconfig)) projects.push(tsconfig)
    }
  }
  return projects
}

const typescriptResolverProjects = listWorkspaceTsconfigs()

const eslintIgnore = [
  "**/.git/**",
  "**/.next/**",
  "**/.yarn/**",
  "**/node_modules/**",
  "**/dist/**",
  "**/out/**",
  "**/build/**",
  "**/coverage/**",
  "**/*.min.js",
  "**/*.config.js",
  "**/*.d.ts",
]

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    settings: {
      tailwindcss: {
        callees: ["classnames", "clsx", "ctl", "cn", "cva"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          project: typescriptResolverProjects,
        },
        node: true,
      },
    },
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "max-lines": [
        "warn",
        {
          max: 200,
        },
      ],
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/namespace": "error",
      "import/default": "error",
      "import/export": "error",
      "import/no-named-as-default": "warn",
      "import/no-named-as-default-member": "warn",
      "import/no-duplicates": "warn",
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      "import/order": [
        "warn",
        {
          groups: [
            "external",
            "builtin",
            "internal",
            "sibling",
            "parent",
            "index",
          ],
          pathGroups: [
            { pattern: "@/app/**", group: "internal" },
            { pattern: "@/modules/**", group: "internal" },
            { pattern: "@/shared/**", group: "internal" },
            { pattern: "ui", group: "internal" },
            { pattern: "ui/**", group: "internal" },
            { pattern: "env", group: "internal" },
            { pattern: "theme", group: "internal" },
            { pattern: "@/public/**", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["internal"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  eslintConfigPrettier,
  globalIgnores(eslintIgnore),
])

export default eslintConfig
