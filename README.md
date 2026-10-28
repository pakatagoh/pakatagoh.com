# Personal Site

Built with [Astro](https://docs.astro.build/en/getting-started) and Tailwind CSS.

## Toolchain

[Mise](https://mise.jdx.dev/) pins Node.js 24.22.1 (LTS) and pnpm 10.14.0 in
`mise.toml`. Run `mise trust` and `mise install`, then prefix the commands below
with `mise exec --` if Mise is not activated in your shell. The `.nvmrc` pin is
kept in sync for nvm users. `package.json` selects Node 24 for Vercel builds and
server functions; Vercel manages the exact patch release.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Verification

```sh
pnpm lint --deny-warnings
pnpm format:check
pnpm build
pnpm test
```

The build tests validate all prerendered pages, referenced local assets, Tailwind
and typography CSS, Markdown heading permalinks, sitemap origins, Vercel runtime,
server routes, and 404 routing. They require a completed build first.

To verify staging canonical URLs locally:

```sh
VERCEL_ENV=preview VERCEL_GIT_COMMIT_REF=staging pnpm build
EXPECTED_SITE_ORIGIN=https://dev.pakatagoh.com pnpm test
```

## Linting and formatting

- `pnpm lint` / `pnpm lint:fix`: Oxlint. It checks JS/TS and supported Astro script
  sections, not the full Astro template or its accessibility.
- `pnpm format` / `pnpm format:check`: Oxfmt, including `.astro` and MDX files.
  Astro formatting uses Oxfmt's bundled formatter and an explicit
  `@astrojs/compiler-rs` dependency. Tailwind class sorting uses
  `src/styles/global.css` so custom theme utilities are recognized.
- Direct Prettier dependencies and plugins are no longer needed. Unlike the old
  organize-imports plugin, this setup does not automatically remove unused Astro
  imports.

## Deployment

Vercel deploys `staging` to <https://dev.pakatagoh.com>. Production is built from
`master`; merging into staging does not publish to production.

Upgrade references:

- [Astro upgrade guide](https://docs.astro.build/en/upgrade-astro/)
- [Astro 7 migration guide](https://docs.astro.build/en/guides/upgrade-to/v7/)
- [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide)
- [Oxfmt migration guide](https://oxc.rs/docs/guide/usage/formatter/migrate-from-prettier.html)
