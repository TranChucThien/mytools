# congcumienphi.id.vn

Free, static, no-signup online tools – bilingual (Vietnamese at `/`, English at `/en/`), built with Astro and deployed to GitHub Pages.

- Design: [`docs/superpowers/specs/2026-10-08-congcumienphi-mvp-design.md`](docs/superpowers/specs/2026-10-08-congcumienphi-mvp-design.md)
- Original idea: [`spec`](spec)

## Development

Requires **Node ≥ 22.12**.

```bash
npm ci
npm run dev       # http://localhost:4321
npm test          # Vitest – tool logic, number parsing, registry, JSON-LD
npm run check     # astro check (TypeScript)
npm run build     # → dist/
npm run verify    # SEO checks on dist/ (titles, canonical, hreflang, JSON-LD, sitemap, links)
```

## Adding a tool

1. Create `src/tools/<name>/` with:
   - `meta.ts` – `ToolMeta` (slugs, titles, descriptions per language, category, related ids)
   - `logic.ts` + `logic.test.ts` – pure functions, no DOM
   - `Tool.astro` – the UI; a `<script>` imports `logic.ts`
   - `<id>.vi.md` and `<id>.en.md` – explanation, formula, examples; FAQ in frontmatter (`faq: [{q, a}]`)
2. Register the meta in `src/lib/registry.ts` (`TOOLS`) and the component in `src/layouts/ToolLayout.astro` (`COMPONENTS`).

Pages, home listing, footer, related links, hreflang and `sitemap.xml` update automatically. The build fails if a slug is duplicated, a related id is unknown, or a language's content file is missing.

**New unit converter pair** (e.g. cm ↔ inch): add an entry to `PAIRS` in `src/tools/unit-converter/units.ts` and four content files (`cm-to-inches.vi.md`, …). Two pages per language are generated.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: test → type-check → build → verify → deploy to GitHub Pages. Pull requests run the same checks without deploying (`ci.yml`).

The site URL and base path come from `actions/configure-pages`, so the same workflow works on `https://tranchucthien.github.io/mytools/` (base `/mytools/`) and, once the custom domain is set, on `https://congcumienphi.id.vn/` (base `/`). Locally the build defaults to the custom domain at `/`; to reproduce the github.io build:

```bash
SITE_URL=https://tranchucthien.github.io BASE_PATH=/mytools npm run build
SITE_URL=https://tranchucthien.github.io BASE_PATH=/mytools npm run verify
```

In code, never hard-code root paths – use `homePath()` / `toolPath()` from `src/lib/registry.ts` or `withBase()` from `src/lib/paths.ts`. `npm run verify` fails on any `href`/`src` that does not resolve inside the site.

### One-time setup

1. **GitHub → Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Pages → Custom domain:** `congcumienphi.id.vn` (also in `public/CNAME`). After DNS works, tick **Enforce HTTPS**.
3. **DNS** (e.g. Cloudflare) for the apex domain:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `tranchucthien.github.io` |

   On Cloudflare keep these **DNS only (grey cloud)** until GitHub has issued the HTTPS certificate.
4. **Google Search Console:** add the domain property, then submit `https://congcumienphi.id.vn/sitemap.xml`.

## OG image

`public/og-default.png` is a 1200×630 screenshot of `scripts/og-image.html`. Edit the HTML and re-screenshot it to change the social preview.
