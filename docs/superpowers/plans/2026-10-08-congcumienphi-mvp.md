# congcumienphi MVP Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Static bilingual (VI default, EN under `/en/`) Astro site with 4 tools (5 tool pages), full SEO plumbing, and GitHub Pages deployment.

**Architecture:** Each tool is a self-contained folder (`meta.ts`, pure `logic.ts` + tests, `Tool.astro` UI with a vanilla TS script, per-language Markdown content). A registry aggregates metas and drives `getStaticPaths`, the home page, related links, hreflang and sitemap. A post-build script verifies SEO invariants on `dist/`.

**Tech Stack:** Astro 7, TypeScript, Vitest 5, `@astrojs/sitemap`, `qrcode`, GitHub Actions + Pages. Node ≥ 22.12.

**Spec:** `docs/superpowers/specs/2026-10-08-congcumienphi-mvp-design.md`

**Execution mode (user-delegated):** native/inline, user asked to proceed autonomously without further review gates.

## Global Constraints

- Site URL `https://congcumienphi.id.vn`; `trailingSlash: 'always'`; `build.format: 'directory'`.
- Languages `vi` (default, no prefix) and `en` (prefix `/en/`); x-default → vi.
- No UI framework; plain CSS with tokens; system fonts; dark mode via `prefers-color-scheme`.
- No network calls at runtime; tool data never leaves the browser.
- Number output via `Intl.NumberFormat('vi-VN'|'en-US')`, ≤ 6 fraction digits.
- Build fails on registry inconsistencies (dupe slug, missing related id, missing content language).

## Review Focus

1. Vietnamese decimal input `1,5` and grouped `1.234,5` parse correctly on VI pages; EN `1,234.5` on EN pages — `number.test.ts`.
2. Percentage division by zero / empty inputs show a message, never `NaN`/`Infinity` — `percentage/logic.test.ts`.
3. Random unique with count > range size, min > max, huge ranges (> 2^32) are rejected or handled without bias/hangs — `random-number/logic.test.ts`.
4. Converter round-trip and negative/zero inputs; table values match the factor — `unit-converter/logic.test.ts`.
5. Language switch on a converter reverse page lands on the matching reverse page in the other language — `registry.test.ts` (`alternateUrl`).

---

### Task 1: Scaffold + number utilities

**Files:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `.gitignore`, `src/lib/types.ts`, `src/lib/number.ts`, `src/lib/number.test.ts`

**Produces:**
- `type Lang = 'vi'|'en'`, `type Category`, `interface ToolMeta` (as in spec §4, plus `props?`).
- `parseNumber(input: string, lang: Lang): number | null` — trims, strips spaces; VI: `.` thousands, `,` decimal; EN: `,` thousands, `.` decimal; a lone separator that can't be thousands (e.g. VI `1.5`) is accepted as decimal; returns null for empty/invalid.
- `formatNumber(n: number, lang: Lang, maxFrac = 6): string`.

- [ ] Tests: `parseNumber('1,5','vi')===1.5`, `parseNumber('1.234,5','vi')===1234.5`, `parseNumber('1.5','vi')===1.5`, `parseNumber('1,234.5','en')===1234.5`, `parseNumber('-3','en')===-3`, `parseNumber('','vi')===null`, `parseNumber('abc','en')===null`, `formatNumber(1234.5,'vi')==='1.234,5'`, `formatNumber(1/3,'en')==='0.333333'`.
- [ ] Run → fail; implement; run → pass; commit.

### Task 2: Tool logic modules (pure, tested)

**Files:** `src/tools/percentage/logic.ts`(+test), `src/tools/random-number/logic.ts`(+test), `src/tools/unit-converter/units.ts`, `src/tools/unit-converter/logic.ts`(+test), `src/tools/qr-code/logic.ts`(+test)

**Produces:**
- `percentOf(p, y): number`; `whatPercent(x, y): number | null` (null if y=0); `percentChange(from, to): number | null` (null if from=0).
- `randomInts(opts:{min,max,count,unique}, rng?: (n:number)=>number): {ok:true, values:number[]} | {ok:false, error: 'minMax'|'count'|'range'|'tooMany'}`; `secureRandomBelow(n)` uses `crypto.getRandomValues` with rejection sampling; ranges limited to `Number.MAX_SAFE_INTEGER` span; unique with count > span → `'tooMany'`; count 1..1000 else `'count'`.
- `UnitPair {id, factor, from:{symbol,name:{vi,en}}, to:{...}, slug:{forward:{vi,en}, reverse:{vi,en}}}`; `PAIRS: UnitPair[]` with kg↔lbs (factor 2.20462262185); `convert(value, factor, direction:'forward'|'reverse')`; `conversionTable(factor, direction): {input:number, output:number}[]` for 1–10,15,20,25…100.
- `validateQrInput(text): {ok:true}|{ok:false,error:'empty'|'tooLong'}` (max 2000); `clampSize(n): number` (128–1024).

- [ ] Write tests incl. Review Focus 2–4, fail, implement, pass, commit.

### Task 3: Registry, metas, i18n strings, SEO helpers

**Files:** `src/tools/*/meta.ts`, `src/tools/unit-converter/meta.ts` (generates 2 metas per pair), `src/lib/registry.ts`(+test), `src/lib/seo.ts`(+test), `src/i18n/vi.ts`, `src/i18n/en.ts`, `src/i18n/index.ts`

**Produces:**
- `TOOLS: ToolMeta[]`, `getTool(id)`, `toolPath(meta, lang): string` (`/tinh-phan-tram/`, `/en/percentage-calculator/`), `alternateUrl(meta, lang)`, `relatedTools(meta, min=3, max=6): ToolMeta[]`, `validateRegistry(tools, contentKeys: Set<string>)` throwing `Error` with a clear message.
- `absoluteUrl(path)`, `webApplicationLd(meta, lang)`, `breadcrumbLd(items)`, `faqLd(faq)`, `websiteLd(lang)`.
- `t(lang)` returns `UiStrings`; `en.ts` typed `UiStrings` derived from `vi.ts`.

- [ ] Tests: dupe slug throws; unknown related throws; missing content key throws; relatedTools excludes self, returns ≥3; `toolPath` for both langs; `alternateUrl` of `lbs-to-kg` vi → `/en/lbs-to-kg/` (Review Focus 5); JSON-LD builders contain `@type` and absolute URLs. Fail → implement → pass → commit.

### Task 4: Layouts, components, styles, pages, content

**Files:** `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/layouts/ToolLayout.astro`, `src/components/{SeoHead,Breadcrumbs,Faq,RelatedTools,LangSwitch,AdSlot,ToolCard,TrustBadges}.astro`, `src/lib/content.ts` (glob of `src/tools/**/content*.md`), `src/pages/{index,404,[slug]}.astro`, `src/pages/en/{index,[slug]}.astro`, `src/tools/*/Tool.astro`, `src/tools/*/content.{vi,en}.md`, `src/tools/unit-converter/content/{kg-to-lbs,lbs-to-kg}.{vi,en}.md`, `public/{CNAME,robots.txt,favicon.svg,og-default.png}`

- [ ] Build each Tool.astro with `<script>` importing logic + `parseNumber/formatNumber`; strings passed via `data-*` attributes / JSON script tag.
- [ ] `npm run build` passes; commit.

### Task 5: verify-dist + workflows + README

**Files:** `scripts/verify-dist.mjs`, `.github/workflows/deploy.yml`, `.github/workflows/ci.yml`, `README.md`

- [ ] verify-dist checks per spec §7; exits 1 with list of problems.
- [ ] `npm run build && npm run verify` pass; commit.

### Task 6: Browser verification

- [ ] `npm run preview`; Playwright at 390px and 1280px: each tool computes correctly, language switch lands on counterpart, no console errors, QR download works. Fix issues; commit.
