# BetFusion UI/UX Overhaul — Match Undabet Design

## Reference
- **Undabet (source of truth):** `http://localhost:3001` — Username: `0795781794` | Password: `r3mot3ch`
- **Figma (mobile spec):** https://www.figma.com/design/k28P4oZLf85muzSkGvEvYV/BETFUSION-UI?node-id=0-1&t=zcfdm5GB1DXbOyFp-1
- **BetFusion (target):** `http://localhost:3000`

---

## PHASE 1 — Design Tokens & Global Styles

### T-01 · Replace global CSS variables with Undabet/Chachisha tokens
**File:** `src/index.css`
- [ ] Add `@import` for `Outfit` font (weights 300–800) from Google Fonts
- [ ] Replace all `:root` variables with Chachisha design tokens:
  - `--background: #020617`
  - `--foreground: #f8fafc`
  - `--primary: #3BAAED`
  - `--primary-foreground: #000`
  - `--card: #0f172a`
  - `--card-foreground: #f8fafc`
  - `--secondary: #1e293b`
  - `--muted: #1e293b`
  - `--muted-foreground: #94a3b8`
  - `--border: #1e293b`
  - `--ring: #3BAAED`
  - `--radius: 0.5rem`
  - `--sidebar: #0f172a`
  - `--sidebar-border: #1e293b`
  - `--sidebar-width: 256px`
  - `--font-sans: 'Outfit', sans-serif`
- [ ] Add Chachisha typography tokens (`--text-xs` through `--text-2xl`, `--tracking-tight`)
- [ ] Set `body` to use `var(--font-sans)`, `var(--background)`, `var(--foreground)`, letter-spacing `-0.025em`
- [ ] Add `.top-gradient-glow` fixed radial gradient overlay: `radial-gradient(100% 100% at 50% 0%, rgba(59,170,237,0.2) 0%, transparent 60%)`
- [ ] Add `.main-layout` flex container rule
- [ ] Add `.hide-scrollbar` utility class
- [ ] Update heading tags to `font-weight: 800`, `letter-spacing: var(--tracking-tight)`

### T-02 · Remove/replace bet-fusion orange-pink brand tokens
**File:** `src/assets/css/Themes.css`
- [ ] Update `--btn-color-action` from orange/pink gradient → `#3BAAED`
- [ ] Update `--bet-fusion-button-login` → `#3BAAED`
- [ ] Update `--login-btn-cl` → `#3BAAED`
- [ ] Update `--aqua-text` → `#3BAAED`
- [ ] Update `--more-markets-text` → `#3BAAED`
- [ ] Update `--deposit-c` → `#3BAAED`
- [ ] Update `--bet-fusion-primary` → `#020617`
- [ ] Update `--bet-fusion-secondary` → `#0f172a`
- [ ] Update `--bet-fusion-header-bg` → `#0f172a`
- [ ] Update `--bet-fusion-body-bg` → `#020617`
- [ ] Update `--top-pr` → `#0f172a`
- [ ] Update `--bet-fusion-promo-card` → `#0f172a`
- [ ] Update `--bet-fusion-mobile-nav` → `#2a3040`
- [ ] Update `--dark` to remain `#000`
- [ ] Update `--light` to remain `#fff`

### T-03 · Typography migration: Inter → Outfit
**Files:** All `*.css` files, `src/index.css`
- [ ] Remove any `font-family: 'Inter'` declarations
- [ ] Ensure all `font-family` declarations fall back to `var(--font-sans)` (Outfit)
- [ ] Verify heading weights are 700–800 throughout

---

## PHASE 2 — Header

### T-04 · Header colors and button styles
**File:** `src/components/header/header.css`, `src/components/header/header.js`
- [ ] Update `.hover\:bg-accent:hover` background to `#3BAAED` (hardcoded, matches undabet)
- [ ] Update `.active-btn-display` background to `#3BAAED`
- [ ] Header background must use `var(--sidebar)` = `#0f172a`
- [ ] **Register button**: solid `#3BAAED` background, black text, no gradient
- [ ] **Login button**: transparent/outline style with white text
- [ ] Ensure Outfit font applied to all header text

### T-05 · Logo — swap to BetFusion branding
**File:** `src/components/header/customNavbar.js`
- [ ] Verify logo asset matches BetFusion brand (not undabet VNDA logo)
- [ ] Logo container background: transparent or `#0f172a`

---

## PHASE 3 — Sidebar

### T-06 · Sidebar nav items — match undabet category structure
**File:** `src/components/pages/casino/sidebar.jsx` (and any related CSS)
- [ ] Reorder/update sidebar nav items to mirror undabet:
  1. Originals
  2. Popular
  3. Crash Games
  4. Live Casino
  5. Game Shows
  6. *(separator)*
  7. Live Support · phone number
  8. Refer & Earn
  9. VIP Club (with NEW badge)
  10. *(separator)*
  11. Terms & Conditions
  12. Privacy Policy
  13. Responsible Gaming
  14. Login (when logged out)
- [ ] Each nav item: icon + label, 40px height, `border-radius: 8px`
- [ ] Active item: `background: #3BAAED`, text `#000`
- [ ] Hover: `background: rgba(59,170,237,0.1)`, text `#3BAAED`
- [ ] Sidebar background: `#0f172a`
- [ ] Sidebar border-right: `1px solid #1e293b`
- [ ] Sidebar width: `256px` on desktop, hidden on mobile
- [ ] "NEW" badge on VIP Club: bright yellow/gold pill

### T-07 · Sidebar logo area
- [ ] Top of sidebar: BetFusion logo, `padding: 16px`
- [ ] Bottom of logo area: `1px solid #1e293b` separator

---

## PHASE 4 — Mobile Bottom Navigation

### T-08 · Replace current mobile nav with Undabet BottomNav
**Source:** `undabet-frontend/src/components/mobile-navigation/BottomNav.jsx` + `bottomNav.css`
**Target:** `src/components/mobile-navigation/`
- [ ] Copy `BottomNav.jsx` from undabet into bet-fusion (update imports/branding as needed)
- [ ] Copy `bottomNav.css` styling — use exact undabet values:
  - `background: #2a3040`
  - `height: 64px`
  - `border-radius: 16px 16px 0 0`
  - `box-shadow: 0 -4px 20px rgba(0,0,0,0.3)`
  - Active color: `#45C4FF`
  - Label font: `Outfit`, 12px, weight 500
- [ ] Nav items (5): Home, Sports, Promos, Casino, Profile — with SVG icons matching undabet
- [ ] Wire up active state from `useLocation()`
- [ ] Add `padding-bottom: 72px` to `main` on mobile to prevent content hiding
- [ ] Register `BottomNav` in `App.js` (undabet already imports it)

---

## PHASE 5 — Landing Page / Home

### T-09 · Add top radial glow to layout
**File:** `src/App.js` or root layout
- [ ] Add `<div className="top-gradient-glow" />` as first child of `.main-layout`
- [ ] Ensure it's `position: fixed`, full viewport, `pointer-events: none`, `z-index: 0`
- [ ] Main content container: `position: relative; z-index: 1`

### T-10 · Banner carousel styling
**File:** `src/components/pages/casino/carousel.jsx` + CSS
- [ ] Carousel container: full width of content area, `border-radius: 12px`, overflow hidden
- [ ] 3 visible banners in a row on desktop, single swipeable on mobile
- [ ] Banner cards: `border-radius: 12px`, no hard border, smooth image fill

### T-11 · Section headers ("Popular Games", "All >")
**File:** `src/components/pages/casino/sectionHeader.jsx`
- [ ] Match undabet section header: label left-aligned, "All >" link right-aligned
- [ ] Label: `font-size: 18px`, `font-weight: 700`, `color: #f8fafc`
- [ ] "All >" link: `color: #3BAAED`, `font-size: 14px`
- [ ] Separator: `margin-bottom: 16px`

### T-12 · Game card grid layout
**Files:** `src/components/pages/casino/horizontalGameRow.jsx`, `landingV2.css`
- [ ] Game card: `border-radius: 12px`, `background: #0f172a`, `overflow: hidden`
- [ ] Card image: aspect-ratio `3/4` or `1/1` (match undabet)
- [ ] Hover state: slight scale transform `scale(1.03)`, smooth `transition: 0.2s`
- [ ] Game grid row: horizontal scroll on mobile, 6-column grid on desktop
- [ ] Skeleton loader cards: `background: #1e293b`, animated shimmer

### T-13 · Landing sections order
**File:** `src/components/pages/casino/landingPage.jsx`
- [ ] Sections in order (match undabet): Popular Games → Originals → Live Casino → Slots → Crash Games
- [ ] Each section uses `<SectionHeader>` + `<HorizontalGameRow>` pattern
- [ ] `RecentWinsMarquee` strip below carousel (if undabet has it)

---

## PHASE 6 — Auth Pages (Login / Register)

### T-14 · Auth pages card layout — match undabet 2-column card
**Files:** `src/components/pages/auth/registerTwo.js`, `src/components/pages/loginTwo.js`, `landingV2.css`
- [ ] Auth card: `background: #2a3040`, `border-radius: 16px`, `border: 1px solid #3d4354`
- [ ] 2-column grid: left = promo image, right = form
- [ ] On mobile: image hidden, form full width
- [ ] Input fields: `background: #3d4354`, `border: 1px solid #3d4354`, `border-radius: 10px`, `color: #e5e5e5`, height 40px
- [ ] Input focus: `border-color: #3BAAED`, `box-shadow: 0 0 0 2px rgba(59,170,237,0.25)`
- [ ] Submit button: `background: #3BAAED`, `color: #000`, `font-weight: 700`, `border-radius: 10px`, full width
- [ ] Title: `font-size: 20px`, `font-weight: 600`, `color: #e5e5e5`
- [ ] Subtitle: `font-size: 12px`, `color: #a3a3a3`
- [ ] Separator lines: `background: #3d4354`
- [ ] Font throughout: Outfit

### T-15 · Back navigation on auth pages
**File:** `src/components/pages/backNavigation.jsx` (exists in undabet, check bet-fusion)
- [ ] Ensure back arrow nav matches undabet style
- [ ] Background: `#020617`, arrow color: `#3BAAED`

---

## PHASE 7 — Casino Page

### T-16 · Casino category tabs
**File:** `src/components/pages/casino/categoryTabs.jsx`
- [ ] Tab bar: horizontal scroll, `border-bottom: 1px solid #1e293b`
- [ ] Active tab: `color: #3BAAED`, `border-bottom: 2px solid #3BAAED`
- [ ] Inactive tab: `color: #94a3b8`
- [ ] Tab font: Outfit, 14px, weight 500

### T-17 · Casino page header
**File:** `src/components/pages/casino/pageHeader.jsx`
- [ ] Match undabet's section header style (dark bg, white text, blue accents)

### T-18 · Casino game cards (library view)
**File:** `src/components/pages/casino/gamesLibrary.jsx`
- [ ] Grid: 4–6 cols desktop, 2–3 cols mobile
- [ ] Card: `border-radius: 12px`, `overflow: hidden`, hover scale effect
- [ ] Provider badge: small overlay on card bottom
- [ ] Skeleton loading: shimmer on `#1e293b` background

---

## PHASE 8 — Profile / Account Pages

### T-19 · Profile page card styling
**File:** `src/components/pages/Accounts/NewProfile.jsx`, `component/newProfile.css`
- [ ] Page background: `#020617`
- [ ] Section cards: `background: #0f172a`, `border: 1px solid #1e293b`, `border-radius: 12px`
- [ ] Labels: `color: #94a3b8`, values: `color: #f8fafc`
- [ ] Action buttons: `background: #3BAAED`, `color: #000`
- [ ] Withdraw/Deposit cards: match undabet's `withdrawCard.jsx` / `depositCard.jsx` styling

### T-20 · Bet history table
**File:** `src/components/pages/Accounts/component/bethistory.css`
- [ ] Table rows alternating: `#0f172a` / `#020617`
- [ ] Header row: `#1e293b`
- [ ] Win/Loss badges: green/red pill with Outfit font

---

## PHASE 9 — Footer

### T-21 · Footer — import and wire up undabet Footer component
**File:** `src/App.js`, `src/components/pages/casino/footer.jsx`
- [ ] Ensure `<Footer />` is imported and rendered in App.js (undabet has it, bet-fusion may not)
- [ ] Footer background: `#0f172a`
- [ ] Footer border-top: `1px solid #1e293b`
- [ ] Links color: `#94a3b8`, hover: `#3BAAED`
- [ ] Section headers in footer: `#f8fafc`, weight 700
- [ ] Responsible gambling disclaimer: `font-size: 12px`, `color: #64748b`

---

## PHASE 10 — Mobile Responsiveness (Figma Spec)

### T-22 · Mobile layout — sidebar hidden, bottom nav visible
- [ ] On `max-width: 767px`: sidebar `display: none`
- [ ] On `max-width: 767px`: bottom nav `display: grid`
- [ ] Main content: `width: 100%`, no left margin on mobile
- [ ] Header on mobile: logo center or left, Login/Register as compact buttons

### T-23 · Mobile game card grid
- [ ] 2 columns on `max-width: 480px`, 3 columns on `481px–767px`
- [ ] Card image aspect ratio: `1/1` on mobile
- [ ] Section header: `font-size: 16px` on mobile

### T-24 · Mobile carousel
- [ ] Single banner swipeable on mobile
- [ ] Dots indicator below carousel
- [ ] Auto-play every 4s

### T-25 · Mobile typography scale
- [ ] Body: 14px on mobile (from 16px desktop)
- [ ] Section headers: 16px on mobile
- [ ] Nav labels: 12px (bottom nav)
- [ ] Button text: 14px

### T-26 · Mobile auth pages
- [ ] Image panel hidden on mobile
- [ ] Form takes full width
- [ ] Input height: 44px on mobile (better touch target)

---

## PHASE 11 — Miscellaneous / Polish

### T-27 · Scrollbar styling
- [ ] Custom thin scrollbar: `width: 4px`, track `#0f172a`, thumb `#1e293b`
- [ ] Hide scrollbar on horizontal scroll sections

### T-28 · Button component audit
**All button instances across the codebase**
- [ ] Primary CTA: `background: #3BAAED`, `color: #000`, `border-radius: 8px`, `font-weight: 700`
- [ ] Secondary: `background: #1e293b`, `color: #f8fafc`, `border-radius: 8px`
- [ ] Remove all orange/pink gradient instances: `linear-gradient(360deg, #fb8603 0%, #cc3366 100%)`

### T-29 · Loading/Skeleton screens
**File:** `src/components/loading/`, casino skeleton files
- [ ] Skeleton base color: `#1e293b`
- [ ] Shimmer animation color: `#2a3a4a`

### T-30 · Toast / Alert notifications
- [ ] Background: `#0f172a`, border: `#3BAAED`, text: `#f8fafc`
- [ ] Match undabet toast styling

### T-31 · Deposit/Withdraw pages
**Files:** `src/components/pages/deposit-withraw/`
- [ ] Page background: `#020617`
- [ ] Form card: `background: #0f172a`, `border-radius: 12px`
- [ ] Amount input: Outfit font, `background: #1e293b`
- [ ] Confirm button: `background: #3BAAED`, full width

---

## TRACKING

| Task | Status | Notes |
|------|--------|-------|
| T-01 Global CSS tokens | ⬜ Todo | |
| T-02 Remove orange-pink brand | ⬜ Todo | |
| T-03 Font migration | ⬜ Todo | |
| T-04 Header colors/buttons | ⬜ Todo | |
| T-05 Logo | ⬜ Todo | |
| T-06 Sidebar nav items | ⬜ Todo | |
| T-07 Sidebar logo area | ⬜ Todo | |
| T-08 Mobile bottom nav | ⬜ Todo | |
| T-09 Top radial glow | ⬜ Todo | |
| T-10 Banner carousel | ⬜ Todo | |
| T-11 Section headers | ⬜ Todo | |
| T-12 Game card grid | ⬜ Todo | |
| T-13 Landing sections order | ⬜ Todo | |
| T-14 Auth card layout | ⬜ Todo | |
| T-15 Back navigation | ⬜ Todo | |
| T-16 Casino category tabs | ⬜ Todo | |
| T-17 Casino page header | ⬜ Todo | |
| T-18 Casino game cards | ⬜ Todo | |
| T-19 Profile page styling | ⬜ Todo | |
| T-20 Bet history table | ⬜ Todo | |
| T-21 Footer wiring | ⬜ Todo | |
| T-22 Mobile layout | ⬜ Todo | |
| T-23 Mobile game grid | ⬜ Todo | |
| T-24 Mobile carousel | ⬜ Todo | |
| T-25 Mobile typography | ⬜ Todo | |
| T-26 Mobile auth pages | ⬜ Todo | |
| T-27 Scrollbar styling | ⬜ Todo | |
| T-28 Button audit | ⬜ Todo | |
| T-29 Skeleton screens | ⬜ Todo | |
| T-30 Toasts/alerts | ⬜ Todo | |
| T-31 Deposit/Withdraw pages | ⬜ Todo | |
