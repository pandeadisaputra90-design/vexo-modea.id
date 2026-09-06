# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/modeal-auto-bali/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.
>
> **Note:** This file documents the design system **already implemented and shipped**
> across the site (not a generic recommendation) — every token below is pulled directly
> from `tailwind.config.js` and `src/index.css`. Keep this file in sync if those change.

---

**Project:** MoDeal Auto Bali
**Category:** Automotive / Used-Car Dealership (Denpasar, Bali)
**Theme:** Futuristic Charcoal + Electric Blue + Neon Orange

---

## Global Rules

### Color Palette

| Role | Token | Hex | Tailwind Class |
|------|-------|-----|-----------------|
| Background (darkest) | `charcoal-950` | `#05070a` | `bg-charcoal-950` |
| Background (base) | `charcoal-900` | `#0a0e14` | `bg-charcoal-900` |
| Background (raised) | `charcoal-800` | `#10141c` | `bg-charcoal-800` |
| Border / divider | `charcoal-700` | `#171c26` | `border-charcoal-700` |
| Electric Blue (primary accent) | `electric-500` / `electric` (DEFAULT) | `#00b4ff` / `#00c2ff` | `bg-electric-500`, `text-electric-400` |
| Electric Blue (bright) | `electric-400` | `#20c9ff` | `text-electric-400` |
| Electric Blue (light) | `electric-300` | `#5ddbff` | `text-electric-300` |
| Neon Orange (secondary accent) | `ember-500` (DEFAULT) | `#ff7a1a` | `bg-ember-500`, `text-ember-400` |
| Neon Orange (bright) | `ember-400` | `#ff8736` | `text-ember-400` |
| Body text | — | `#e6edf5` | `text-white` (+ opacity variants) |
| Heading text | — | `#f5f9ff` | (set via global `h1`-`h6` rule) |
| Muted text | — | `white/60`, `white/50`, `white/40` | `text-white/60` etc. |

**Color Notes:** Dark charcoal base throughout (no light mode). Electric blue is the primary
interactive/CTA accent; neon orange is the secondary accent used for warmth, warranty/финance
highlights, and to break up all-blue monotony. Never introduce colors outside this palette
(no slate/gray substitutes, no red as a primary accent).

### Typography

- **Heading Font:** Orbitron (`font-display`) — used for all `h1`-`h6`, buttons, eyebrows, nav logo
- **Body Font:** Rajdhani (`font-sans`) — used for all body copy, falls back to `"Segoe UI", sans-serif`
- **Mood:** technical, precise, futuristic HUD — not organic/soft
- **Google Fonts import** (already in `src/index.css`):
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap');
  ```

### Spacing

No custom spacing tokens are defined — the site uses Tailwind's default spacing scale
(0.25rem / 4px increments) directly (`p-4`, `gap-6`, `py-20` for section padding, etc.).
Sections consistently use `py-20` (`py-12` for compact trust strips); page containers use
`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

### Shadows (custom, defined in `tailwind.config.js`)

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-glow-blue` | `0 0 20px rgba(0,194,255,.35), 0 0 60px rgba(0,194,255,.12)` | Primary buttons, active/selected cards |
| `shadow-glow-blue-lg` | `0 0 40px rgba(0,194,255,.45), 0 0 100px rgba(0,194,255,.18)` | Primary button hover state |
| `shadow-glow-orange` | `0 0 20px rgba(255,122,26,.35), 0 0 60px rgba(255,122,26,.12)` | Secondary buttons (financing/garansi CTAs) |
| `shadow-glass` | `0 8px 32px rgba(0,0,0,.45)` | All glass/glow cards |

### Background Effects

| Class | Purpose |
|-------|---------|
| `bg-grid` | Faint electric-blue grid pattern overlay (hero sections, page heroes) |
| `bg-radial-glow` | Radial electric-blue glow from top, used behind hero headings |
| `bg-ember-glow` | Radial orange glow from bottom, paired with `bg-radial-glow` for hero depth |

---

## Component Specs

Reusable classes are defined in `@layer components` in `src/index.css` — always use these
instead of writing new one-off button/card styles.

### Buttons

```css
.btn-primary {
  /* pill, Orbitron, uppercase, electric gradient, glow-blue shadow */
  @apply inline-flex items-center justify-center gap-2 rounded-full px-6 py-3
    font-display font-semibold text-sm tracking-wide uppercase
    bg-gradient-to-r from-electric-500 to-electric-600 text-charcoal-950 shadow-glow-blue
    transition-all duration-300 hover:shadow-glow-blue-lg hover:scale-[1.03] active:scale-[0.98];
}

.btn-secondary {
  /* pill, Orbitron, uppercase, ember gradient, glow-orange shadow */
  @apply inline-flex items-center justify-center gap-2 rounded-full px-6 py-3
    font-display font-semibold text-sm tracking-wide uppercase
    bg-gradient-to-r from-ember-500 to-ember-600 text-white shadow-glow-orange
    transition-all duration-300 hover:shadow-glow-orange hover:scale-[1.03] active:scale-[0.98];
}

.btn-outline {
  /* pill, electric border, transparent fill */
  @apply inline-flex items-center justify-center gap-2 rounded-full px-6 py-3
    font-display font-semibold text-sm tracking-wide uppercase
    border border-electric-500/50 text-electric-400 bg-transparent
    transition-all duration-300 hover:bg-electric-500/10 hover:border-electric-400 hover:text-electric-300;
}
```

Use `btn-primary` for the main conversion action (buy/credit), `btn-secondary` for
warranty/insurance/financing-adjacent CTAs, `btn-outline` for secondary/tertiary actions.
The WhatsApp CTA component (`src/components/ui/WhatsAppButton.tsx`) wraps these two variants
plus a floating round variant (fixed bottom-right, 56px, `#25D366`, pulsing ring).

### Cards

```css
.glass {
  @apply bg-white/[0.04] backdrop-blur-md border border-white/10;
}
.glass-card {
  @apply glass rounded-2xl shadow-glass transition-all duration-300;
}
.glow-card {
  @apply glass-card hover:border-electric/50 hover:shadow-glow-blue hover:-translate-y-1;
}
```

Use `glow-card` for anything clickable/interactive (vehicle cards, service toggles);
use plain `glass-card` for static content panels (spec panels, calculator panel).

### Inputs

```css
.input-field {
  @apply w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3
    text-sm text-white placeholder:text-white/30
    focus:border-electric-400/60 focus:bg-white/[0.06] focus:outline-none
    focus:ring-2 focus:ring-electric-500/20 transition-all;
}
```

### Section Eyebrow (small kicker label above headings)

```css
.section-eyebrow {
  @apply inline-flex items-center gap-2 rounded-full border border-electric-500/30
    bg-electric-500/5 px-4 py-1.5 text-xs font-display font-semibold uppercase
    tracking-[0.2em] text-electric-400;
}
```

### Gradient Text

```css
.text-gradient-blue { @apply bg-gradient-to-r from-electric-300 via-electric-400 to-electric-500 bg-clip-text text-transparent; }
.text-gradient-orange { @apply bg-gradient-to-r from-ember-300 via-ember-400 to-ember-500 bg-clip-text text-transparent; }
```

Used for the emphasized word/phrase inside headings (see `SectionHeading` component's
`highlight` prop and hero `<h1>`s).

---

## Layout Patterns

- **Section rhythm:** alternate `bg-charcoal-950` / `bg-charcoal-900` between consecutive
  `<section>`s so page scroll has visible depth (see `Inspection.tsx`, `Financing.tsx`).
- **Page hero:** every inner page opens with the shared `PageHero` component — `bg-charcoal-950`,
  grid + radial-glow overlays, centered eyebrow/title/description, `pt-32 sm:pt-40` to clear
  the fixed navbar.
- **Numbered step/timeline cards:** large `text-white/10` background numeral (`01`-`04`),
  icon tile (`bg-electric-500/10` or `bg-ember-500/10`), title, description — see
  `Inspection.tsx`'s `PROCESS`/`TECH_TIMELINE` and `Financing.tsx`'s `CREDIT_STEPS`.
- **Interactive toggle → detail panel:** a row of clickable `glow-card`-style buttons
  (active state = `border-electric-500/60` + `shadow-glow-blue`) controlling one shared
  detail panel below (see `Financing.tsx`'s service toggles).

---

## Anti-Patterns (Do NOT Use)

- ❌ Any light-mode / white-background surface — this is a dark-theme-only site
- ❌ Colors outside the charcoal/electric/ember palette (no slate, no red-as-accent, no purple)
- ❌ Fonts other than Orbitron (headings) / Rajdhani (body)
- ❌ Sharp/square corners on buttons — buttons are always `rounded-full` pills
- ❌ Plain `shadow-md`/`shadow-lg` Tailwind defaults on cards — use the custom `glow-*`/`glass` shadows
- ❌ Emojis as functional icons — use `lucide-react` icons (already the convention throughout)
- ❌ Hardcoded contact info (phone/WhatsApp/address/social) in components — always read from
  `src/config/site.ts`'s `SITE` object and `waLink()`/`waVehicleLink()` helpers

## Pre-Delivery Checklist

Before delivering any UI code for this project, verify:

- [ ] Uses `charcoal`/`electric`/`ember` Tailwind tokens only (no ad-hoc hex colors)
- [ ] Headings use `font-display` (Orbitron); body text uses default `font-sans` (Rajdhani)
- [ ] Buttons use `btn-primary`/`btn-secondary`/`btn-outline`, not one-off styles
- [ ] Cards use `glass-card`/`glow-card`
- [ ] Contact/WhatsApp data comes from `src/config/site.ts`, never hardcoded
- [ ] `lucide-react` icons, not emoji, for functional UI icons
- [ ] Section backgrounds alternate `charcoal-950`/`charcoal-900` for visual rhythm
- [ ] Responsive at 375px, 768px, 1024px, 1440px (mobile-first Tailwind breakpoints)
- [ ] No horizontal scroll on mobile
- [ ] `tsc -b --noEmit` and `npm run build` pass before considering the change done
