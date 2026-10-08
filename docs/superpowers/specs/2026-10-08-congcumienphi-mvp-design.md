# congcumienphi — MVP Foundation Design

Date: 2026-10-08
Source idea: `/spec` (SEO-first utility hub)

## 1. Goal & success criteria

Build the foundation of an SEO-first hub of free, static, no-signup online tools
at **https://congcumienphi.id.vn**, with 4 tools that exercise every template
type. Later phases add tools by dropping in a new folder.

Done when:

- 4 tools (5 tool pages: KG→LBS and LBS→KG are separate pages) × 2 languages
  work correctly on mobile and desktop.
- `npm test` (tool logic) and `npm run build` + `npm run verify` (SEO checks on
  built HTML) pass, locally and in GitHub Actions.
- Push to `main` deploys to GitHub Pages via GitHub Actions; custom domain via
  `public/CNAME`.
- Sitemap with hreflang is valid and ready for Google Search Console.

Out of scope (MVP): ads (only empty `AdSlot` placeholder), analytics, search box,
category hub pages, per-page OG images, remaining tools from the idea doc.

## 2. Decisions

| Topic | Decision |
|---|---|
| Language | Bilingual. Vietnamese default at `/`, English at `/en/`. Separate, natively written content per language. |
| Domain | `congcumienphi.id.vn` (apex). |
| Repo | Standalone git repo in this folder. |
| Framework | Astro (static output) + TypeScript. Vanilla TS `<script>` per tool, no UI framework. |
| Styling | Plain CSS with tokens, mobile-first, dark mode via `prefers-color-scheme`, system fonts. |
| Tests | Vitest for pure logic; `scripts/verify-dist.mjs` for built-HTML SEO checks. |
| Node | ≥ 22.12 (Astro 7 requirement); CI uses Node 22. |
| URLs | Trailing slash (`/tinh-phan-tram/`), matches GitHub Pages directory serving. |

## 3. MVP tools & URLs

| Tool | Category | VI | EN |
|---|---|---|---|
| Home | – | `/` | `/en/` |
| Percentage calculator | calculator | `/tinh-phan-tram/` | `/en/percentage-calculator/` |
| KG → LBS | converter | `/doi-kg-sang-lbs/` | `/en/kg-to-lbs/` |
| LBS → KG | converter | `/doi-lbs-sang-kg/` | `/en/lbs-to-kg/` |
| Random number | random | `/so-ngau-nhien/` | `/en/random-number-generator/` |
| QR code | generator | `/tao-ma-qr/` | `/en/qr-code-generator/` |

## 4. Architecture

```
src/
  lib/
    types.ts         ToolMeta, Lang, Category
    number.ts        locale-aware parse/format
    registry.ts      all tools, lookups, related-tool resolution, validation
    seo.ts           URL helpers, JSON-LD builders
  i18n/ vi.ts en.ts  shared UI strings (en typed against vi keys)
  tools/
    percentage/      meta.ts logic.ts logic.test.ts Tool.astro content.vi.md content.en.md
    random-number/   (same)
    qr-code/         (same, logic = option validation; rendering via `qrcode`)
    unit-converter/  units.ts (pair definitions → 2 pages each) logic.ts Tool.astro content/*.md
  components/        SeoHead, Breadcrumbs, Faq, RelatedTools, LangSwitch, AdSlot, ToolCard
  layouts/           BaseLayout (html/head/header/footer), ToolLayout (tool page frame)
  pages/
    index.astro, en/index.astro
    [slug].astro, en/[slug].astro   getStaticPaths from registry
    404.astro
  styles/global.css
public/ CNAME robots.txt favicon.svg og-default.png
scripts/verify-dist.mjs
.github/workflows/ deploy.yml ci.yml
```

### ToolMeta

```ts
type Lang = 'vi' | 'en';
type Category = 'calculator' | 'converter' | 'random' | 'generator';
interface ToolMeta {
  id: string;                         // stable internal id, e.g. 'percentage', 'kg-to-lbs'
  category: Category;
  slug: Record<Lang, string>;
  title: Record<Lang, string>;        // <title>
  description: Record<Lang, string>;  // meta description
  h1: Record<Lang, string>;
  name: Record<Lang, string>;         // short name for cards/breadcrumbs
  intro: Record<Lang, string>;        // 1–2 sentences under H1
  related: string[];                  // ids
  component: string;                  // key into a component map in the page
  props?: Record<string, unknown>;    // e.g. converter pair + direction
}
```

Content (`content.<lang>.md`) holds the explanatory sections as Markdown and FAQ
as frontmatter `faq: [{q, a}]`. It is loaded via `import.meta.glob` keyed by
tool id + lang.

Registry validation (runs at build, throws → build fails): unique ids, unique
slugs per language, every `related` id exists, every tool has content for both
languages.

Related tools: `related` ids first, then same-category tools, then others,
capped at 6 and minimum 3 when available; self excluded.

Converter: `units.ts` defines pairs `{ id, from, to, factor, slugs, names }`;
each pair yields two ToolMeta entries (forward + reverse) that link to each
other. Adding cm↔inch later = one entry + content files.

## 5. Page template

Order: breadcrumbs → H1 → intro → tool UI → trust badges (free / no signup /
runs in browser) → `AdSlot` (empty) → Markdown content (what / how / formula /
example) → FAQ (`<details>`) → related tools → footer.

Head (`SeoHead`): title, description, canonical (absolute, trailing slash),
`hreflang` vi/en/x-default(=vi), Open Graph + Twitter card (default image),
`<html lang>`, favicon.

JSON-LD: tool pages → `WebApplication` (`offers.price: 0`, `inLanguage`,
`applicationCategory`), `BreadcrumbList`, `FAQPage` when FAQ exists. Home →
`WebSite`.

Site: custom `/sitemap.xml` endpoint built from the registry (xhtml:link hreflang alternates; `@astrojs/sitemap` pairs by identical path and cannot match differing VI/EN slugs), `robots.txt`
pointing at `sitemap.xml`, bilingual `404.astro`.

## 6. Tool behavior

All tools compute on `input` events (no submit button), results in an
`aria-live="polite"` region, copy button, inline validation messages (no
`alert`), `<noscript>` notice.

Numbers: VI accepts `,` as decimal separator (and `.` as thousands only when
unambiguous, e.g. `1.234,5`); EN accepts `.` decimal and `,` thousands. Output via
`Intl.NumberFormat('vi-VN' | 'en-US')`, max 6 fraction digits (trimmed).

- **Percentage**: three modes shown as fill-in sentences: X% of Y; X is what % of
  Y; % change from X to Y. Each shows the substituted formula. Division by zero →
  inline message.
- **KG↔LBS**: two linked inputs (edit either), factor 1 kg = 2.20462262185 lb;
  swap button links to reverse page; static conversion table (1–10, 15, 20 … 100)
  rendered in HTML at build time.
- **Random number**: min, max, count (1–1000), unique toggle; integers via
  `crypto.getRandomValues` with rejection sampling (no modulo bias); validation:
  min ≤ max, count ≤ range size when unique.
- **QR code**: text/URL input (≤ 2000 chars), size (128–1024), foreground/
  background colors, error correction level; live preview; download PNG and SVG.
  Uses `qrcode` npm package, loaded only on this page. Page states data never
  leaves the device.

## 7. Testing & verification

- Vitest: `number.ts`, each tool's `logic.ts`, converter pair generation,
  registry validation and related-tool resolution.
- `scripts/verify-dist.mjs` on `dist/`: every HTML page (except 404) has one
  `<title>`, meta description, canonical matching its URL, hreflang pairs that
  point to existing pages, parseable JSON-LD, exactly one `<h1>`; every page is
  in the sitemap.
- Manual browser check with Playwright (mobile 390px + desktop) of each tool.

## 8. Deploy

- `.github/workflows/deploy.yml`: on push to `main` + `workflow_dispatch`.
  Job build: checkout → setup-node 22 (npm cache) → `npm ci` → `npm test` →
  `npm run build` → `npm run verify` → `upload-pages-artifact` (dist). Job deploy:
  `deploy-pages`, environment `github-pages`. Permissions `contents: read`,
  `pages: write`, `id-token: write`; concurrency group `pages`.
- `.github/workflows/ci.yml`: on pull_request, same steps without deploy.
- One-time manual setup (documented in README): Pages source = GitHub Actions;
  custom domain `congcumienphi.id.vn` + Enforce HTTPS; DNS A records
  185.199.108.153, .109, .110, .111 and `www` CNAME → `<user>.github.io` (DNS-only
  until the certificate is issued); submit sitemap in Search Console.
