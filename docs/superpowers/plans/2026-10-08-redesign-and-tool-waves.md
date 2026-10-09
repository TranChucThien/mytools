# Redesign + Tool Waves Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [x]`) syntax.

**Goal:** Give the site its own design system (via the `design-taste-frontend` + `awesome-design` skills), restructure the code so tools scale to 50+, then ship the tool backlog in three waves.

**Spec:** `docs/superpowers/specs/2026-10-08-congcumienphi-mvp-design.md` (unchanged decisions: Astro static, VI default + `/en/`, pure-logic modules with Vitest, verify-dist, base-path aware). Design rules: `DESIGN.md` (root).

**Execution mode (user-delegated):** inline, autonomous; commit after each phase/tool group; full gate (`npm test`, `astro check`, build, verify at `/` and `/mytools`, e2e) before each commit that touches UI.

## Global Constraints

- Every internal URL through `homePath/toolPath/withBase`; verify-dist must pass with `BASE_PATH=/mytools`.
- Design: tokens only from `src/styles/tokens.css`; one accent; radius scale 12 (inputs) / 20 (cards, buttons); icons only from `@tabler/icons` (no hand-drawn SVG); no emoji; **no em/en dash (`—`, `–`) in visible copy**; motion = CSS transitions on transform/opacity, disabled under `prefers-reduced-motion`.
- Content per tool: VI + EN written natively, ≥ 4 FAQ, formula + worked examples; numbers in examples must be computed, not invented.
- Rules that change by law (salary/tax/insurance) live in a dated config file with the legal source noted.

## Review Focus

1. Subpath deploy (`/mytools/`): every asset/link resolves (verify-dist + e2e at base).
2. Vietnamese number input (`1.234,5`) everywhere a number is typed.
3. Date tools across month/year boundaries and leap years (Feb 29).
4. Affine converters (°C↔°F): negative values and round-trip.
5. Text tools with Vietnamese diacritics and Unicode normalization (NFC vs NFD input).

---

## Phase 1: Design system + scale refactor

- [x] `DESIGN.md` at repo root: design read, dials, tokens, components, do/don't.
- [x] Self-host **Be Vietnam Pro** (`@fontsource/be-vietnam-pro`, weights 400/500/600/800; designed for Vietnamese diacritics).
- [x] `@tabler/icons` + `Icon.astro` (inline raw SVG by name). Replace the hand-drawn logo/check marks.
- [x] `ToolMeta.icon` (Tabler name) for cards, category headers, related tools.
- [x] Rewrite `global.css` → `tokens.css` + `base.css` + `components.css`; restyle header (sticky), footer, tool card, inputs, buttons, result panel, FAQ, related tiles.
- [x] Home: split hero (headline + subtext left, live mini percentage tool right = real component preview, not a fake screenshot); tool directory grouped by category with client-side search filter.
- [x] Remove `–`/`—` from all visible copy (titles, metas, content).
- [x] Generalize converter to affine pairs `y = a·x + b` (enables °C↔°F) and a units hub page later.
- [x] Gate + screenshots light/dark × 390/1280; commit.

## Phase 2: Wave 1 (fast, reuse templates)

- [x] Converter pairs: cm↔inch, m↔feet, km↔miles, g↔oz, lít↔gallon (US), MB↔GB (decimal, note binary), km/h↔mph, °C↔°F, m²↔ft², ha↔m².
- [x] Calculators: tính tuổi, tính giảm giá, BMI, VAT (thêm/tách 8%/10%).
- [x] Text: đếm từ/ký tự, bỏ dấu tiếng Việt, chuyển hoa/thường, tạo slug.
- [x] Random/generator: tung đồng xu, bốc thăm tên, tạo mật khẩu.
- [x] Each: logic + tests, meta (icon, related), VI/EN content, e2e smoke. Commit per group.

## Phase 3: Wave 2 (Vietnam-specific)

- [x] Đọc số thành chữ (VND, hóa đơn), lãi tiết kiệm, lãi vay (dư nợ giảm dần + cố định, lịch trả nợ), VietQR chuyển khoản (EMVCo payload + CRC16, bank BIN list), vòng quay may mắn, chia đội, đếm ngày giữa hai ngày.

## Phase 4: Wave 3 (complex)

- [x] Lương Gross↔Net + thuế TNCN (dated config), âm↔dương lịch (Hồ Ngọc Đức algorithm, tested against known dates), nén/đổi kích thước ảnh (canvas, client-only).

## Status (2026-10-09)

All four phases implemented. 94 indexable pages (47 tools × 2 languages incl. 22 converter pages), 210 unit tests, 87 e2e checks, verify-dist clean at `/` and `/mytools/`.
Salary rules verified against published legal sources on 2026-10-08 (see `src/tools/salary/rules.ts`). Lunar calendar validated against Vietnamese Tết dates 2020-2030 (2030 differs from China by one day) and a 21-year round trip.
