# EcoSphere Design Specification

Based on visual reference designs (Desktop 1280px & Mobile 375px; Optimistic Clarity & DeepTech Horizon themes).

## 1. Color Palette

### Primary & Brand Colors
- **Brand Emerald**: `#10B981` (Primary CTA, healthy AQI, good eco scores)
- **Deep Forest**: `#064E3B` (Brand text, dark accents in light mode)
- **Sky Cyan**: `#38BDF8` (Secondary highlight, atmospheric aura, tech accents)
- **Deep Sky**: `#0369A1` (Ocean/Atmosphere contrast)
- **Amber Warning**: `#F59E0B` / `#FBBF24` (Moderate AQI, attention chips)
- **Coral Red**: `#EF4444` / `#F87171` (Unhealthy AQI, negative impact metrics)
- **Purple / Hazardous**: `#A855F7` / `#7F1D1D`

### Neutral & Glass Backgrounds
- **Light Theme Background**: `#F0FDF4` to `#F8FDFA` (Soft ambient mint wash)
- **Light Theme Glass**: `rgba(255, 255, 255, 0.72)` with `backdrop-filter: blur(16px)` and border `rgba(255, 255, 255, 0.85)`
- **Dark Theme Background**: `#080E14` with `#0B1319` ambient layers
- **Dark Theme Glass**: `rgba(13, 27, 30, 0.75)` with `backdrop-filter: blur(16px)` and border `rgba(16, 185, 129, 0.2)`
- **Text Light**: `#0F172A` (Primary), `#475569` (Secondary), `#94A3B8` (Muted)
- **Text Dark**: `#F8FAFC` (Primary), `#CBD5E1` (Secondary), `#64748B` (Muted)

## 2. Typography & Hierarchy
- **Font Family**: `Poppins` for Headings, `Inter` for UI & Body text
- **Hero Title**: `text-4xl lg:text-5xl font-extrabold tracking-tight`
- **Section Headers**: `text-2xl lg:text-3xl font-bold tracking-tight`
- **Card Titles**: `text-lg lg:text-xl font-bold`
- **Body & Labels**: `text-sm font-medium` or `text-xs font-semibold uppercase tracking-wider`
- **Metrics / Numbers**: `font-bold tracking-tight tabular-nums`

## 3. Spacing, Radius & Shadows
- **Card Radius**: `rounded-2xl` (16px) or `rounded-3xl` (24px)
- **Button / Chip Radius**: `rounded-full` (9999px) or `rounded-xl` (12px)
- **Floating Island**: `rounded-3xl shadow-2xl` with glassmorphic border
- **Shadows**:
  - `shadow-glass`: `0 8px 32px 0 rgba(0, 0, 0, 0.06)`
  - `shadow-glow-emerald`: `0 0 25px -4px rgba(16, 185, 129, 0.35)`
  - `shadow-glow-sky`: `0 0 25px -4px rgba(56, 189, 248, 0.35)`

## 4. Visual Components & Illustrations
1. **Interactive Glass Globe**: Inline SVG / CSS 3D rendered earth sphere with atmospheric glow, swirling clouds, orbit leaves, and continent vectors.
2. **Dynamic Cityscape Simulator**: Inline SVG city skyline with before/after split or responsive smog vs clean greenery, trees, and factory animations.
3. **Semicircle AQI Meter**: Calibrated SVG gauge with gradient arc, floating needle, center rating, and category breakdown.
4. **Hero Action Cards**: Frosted glass cards with squircle badge icons (`Check Air Now`, `Calculate Footprint`, `Simulate a Scenario`).
5. **Live Quick Metrics Ticker**: Pill-shaped bottom row with live animated environmental counters.

## 5. Screen Order & Layout Structure
- **Navbar**: Floating pill header with Logo, Navigation Links, City/Search, Theme Toggle, Profile.
- **Hero Section**: Dual-column layout (Headline + Live AQI Chip on left, Glass 3D Earth on right), followed by 3 Action Cards and 6-metric ticker.
- **Live Dashboard**: Header search bar + Semicircle AQI Gauge + 6 Pollutant Cards + Weather card + 24h interactive trend chart + 7-day forecast row + Personalized Insight card.
- **Carbon Calculator**: 5-step interactive wizard with sliders and sticky live-total summary sidebar with donut breakdown and comparison bars.
- **SCENARIO Simulator**: Interactive city scene with scenario pills, time/intensity sliders, and live metrics delta grid.
- **Action Plan**: Eco Score progress ring, categorized pledge cards, badges collection, and share modal.
- **Learn Page**: Interactive AQI guide, climate science modules, and daily actionable eco tips.
- **Mobile Experience (375px)**: Bottom floating navigation tab bar, stacked card grids, responsive drawers.

## 6. Authentication & User Profile Specification
- **Login Screen Layout**:
  - Split-screen layout (Branding & Eco globe visual on left, glass authentication card on right).
  - Provider buttons: Clean rounded-xl frosted buttons with official inline brand vectors (Google, GitHub, Microsoft).
  - Email & Password input card with `[Show]/[Hide]` password toggle, validation states, and "Continue as guest".
- **Navbar Profile Dropdown**:
  - Pill avatar button in navbar with initials avatar (`AS`), name (`Alex S.`), and chevron.
  - Dropdown card with User Full Name, City/Sub-detail, Starred verification rating (`★ Eco Champion`), `Edit Profile` button, and rose-accented `Log out` button.
- **Profile Edit Screen**:
  - Header with title and avatar selection bar (presets + custom initials + data URL image upload under 200KB).
  - 2-column input layout with required indicator asterisks (`*`), dropdown selects, and input focus rings.
  - Sectioned cards for Account, Location & Units, Household & Lifestyle, Preferences, and Impact Stats.
  - Action footer with `Cancel`, `Save Profile`, `Autofill sample data` (demo mode), and `Delete my local data` confirmation dialog.
