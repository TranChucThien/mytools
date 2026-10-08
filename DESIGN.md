# DESIGN.md: congcumienphi

**Design read:** utility tool hub for mainstream Vietnamese (and English) users, with a calm, trustworthy, friendly-fintech-calculator language, built on native CSS tokens (no framework). Structure is inspired by consumer money-app calculators (sage canvas, white rounded cards, ink-bordered inputs, heavy display type); the colour, type and naming are our own.

**Dials:** `DESIGN_VARIANCE 5` · `MOTION_INTENSITY 3` · `VISUAL_DENSITY 4`. People come to finish a task fast: the tool is always the first thing on the page, motion is feedback only.

## Tokens (`src/styles/tokens.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--canvas` | `#eef2ee` | `#0e120f` | Page background (sage) |
| `--surface` | `#fcfdfc` | `#161b17` | Cards, header |
| `--surface-2` | `#e3e9e3` | `#1f2620` | Secondary buttons, table heads |
| `--ink` | `#111511` | `#eaeeea` | Headings, input text, input borders |
| `--body` | `#3f453f` | `#bfc6bf` | Body copy |
| `--mute` | `#5f665f` | `#939b93` | Captions, helper text |
| `--line` | `#d3dbd3` | `#2a322b` | Hairlines, card borders |
| `--field-border` | `#111511` | `#7a857b` | Input borders |
| `--accent` | `#0f7a50` | `#4fd69c` | The only accent: primary buttons, links, focus |
| `--on-accent` | `#f4fbf7` | `#052615` | Text on accent |
| `--accent-soft` | `#d6f0e0` | `#133525` | Result panels, active tints |
| `--accent-ink` | `#0a4d33` | `#9be9c5` | Text on accent-soft |
| `--danger` | `#b42318` | `#ff8a7a` | Errors only |

No pure `#000`/`#fff`. Theme follows `prefers-color-scheme`; no section inverts.

## Type

**Be Vietnam Pro** (self-hosted via `@fontsource`, designed for Vietnamese diacritics), weights 400/500/600/800.

- Display (H1): 800, `clamp(2rem, 4.5vw, 2.75rem)`, line-height 1.1, tracking -0.02em.
- H2: 700→600, 1.375rem, tracking -0.01em. H3: 600, 1.0625rem.
- Body 16px / 1.6, prose max 68ch. Results: 800, 1.75rem, tabular numbers.

## Shape

- Cards, buttons, tool panels: **20px**. Inputs, selects: **12px**. Pills (badges, search, lang switch): full.
- Elevation = surface contrast (`--surface` on `--canvas`) + 1px `--line`. No drop shadows except a faint tinted one on the sticky header.

## Components

- **Button primary**: `--accent` / `--on-accent`, 48px min height, 20px radius, 600 weight, `:active` scale .98.
- **Button secondary**: `--surface-2` / `--ink`.
- **Input**: `--surface` bg, 1.5px `--field-border`, 12px radius, 48px min height; focus = 3px `--accent` ring. Label above, error below.
- **Result panel**: `--accent-soft` bg, value in 800 weight, formula in `--accent-ink` at 0.875rem.
- **Tool tile** (home, related): icon chip (40px, `--accent-soft` bg, `--accent-ink` icon) + name + one line.
- **Icons**: `@tabler/icons` outline, stroke 2, via `Icon.astro`. Never hand-draw SVG.

## Rules

- One accent. No emoji. **No em dash or en dash in visible copy**; use a hyphen, comma or colon.
- Tool first: H1 + one-sentence intro, then the tool, then explanation, FAQ, related tools.
- Every number input accepts the page locale (`1.234,5` VI / `1,234.5` EN).
- Motion: transitions on `transform`/`opacity`/`background-color` ≤ 200ms, removed under `prefers-reduced-motion`.
- Mobile < 768px: single column, 16px gutters, no horizontal scroll.
