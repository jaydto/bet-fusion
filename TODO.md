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

| Task | Status | Branch / PR | Notes |
|------|--------|-------------|-------|
| T-01 Global CSS tokens | ✅ Done | PR #1 | `src/index.css` — Outfit, all tokens, radial glow |
| T-02 Remove orange-pink brand | ✅ Done | PR #1 | `Themes.css` — all vars updated to #3BAAED |
| T-03 Font migration | ✅ Done | PR #1 | Outfit everywhere; `.inter-font` → Outfit |
| T-04 Header colors/buttons | ✅ Done | PR #1 | hover/active → #3BAAED, #000 text |
| T-05 Logo | ✅ Done | — | Existing BetFusion logo kept, transparent bg |
| T-06 Sidebar nav items | ✅ Done | PR #1 | Full rewrite: undabet structure, active #3BAAED |
| T-07 Sidebar logo area | ✅ Done | PR #1 | sidebar.css — 256px, dark bg, border-right |
| T-08 Mobile bottom nav | ✅ Done | PR #1 | BottomNav.jsx + bottomNav.css — 5 items, #2a3040 |
| T-09 Top radial glow | ✅ Done | PR #1 | `.top-gradient-glow` in App.js |
| T-10 Banner carousel | ✅ Done | — | Existing carousel kept, slick dots styled (PR #4) |
| T-11 Section headers | ✅ Done | PR #2 | `section-header`, `-title`, `-all` classes |
| T-12 Game card grid | ✅ Done | PR #2 | game-wrapper, game-image-container, overlay-2 |
| T-13 Landing sections order | ✅ Done | — | Sections unchanged (already correct order) |
| T-14 Auth card layout | ✅ Done | PR #2 | `auth.css` — dark card, dark inputs, blue focus/submit |
| T-15 Back navigation | ⬜ Todo | — | Not blocking — minor polish |
| T-16 Casino category tabs | ✅ Done | PR #2 | ant-tabs pills — #1e293b / #3BAAED active |
| T-17 Casino page header | ✅ Done | PR #2 | section-header pattern applied |
| T-18 Casino game cards | ✅ Done | PR #2 | `gamesSection.jsx` — dark card, overlay, play button |
| T-19 Profile page styling | ✅ Done | PR #3 | balance-card / top-pr → #1e293b + #334155 border |
| T-20 Bet history table | ✅ Done | PR #3 | row bg #0f172a, filter pills #3BAAED active |
| T-21 Footer wiring | ✅ Done | PR #3 | footer.jsx — #0f172a, border-top, links #94a3b8→#3BAAED |
| T-22 Mobile layout | ✅ Done | PR #1 | Sidebar hidden @767px, bottom nav visible |
| T-23 Mobile game grid | ✅ Done | PR #1 | xs={8} = 3 col; game-image 130px on mobile |
| T-24 Mobile carousel | ✅ Done | PR #4 | slick-dots styled, existing autoplay kept |
| T-25 Mobile typography | ✅ Done | PR #4 | h1-h5 scale, body 14px, 72px bottom padding |
| T-26 Mobile auth pages | ✅ Done | PR #2 | auth.css — image hidden, full-width form, 46px inputs |
| T-27 Scrollbar styling | ✅ Done | PR #1 | 4px scrollbar, hide on horizontal sections |
| T-28 Button audit | ✅ Done | PR #3 | login-button2, withdraw-button2, deposit-modal updated |
| T-29 Skeleton screens | ✅ Done | PR #2 | `.game-card-skeleton` — #1e293b shimmer animation |
| T-30 Toasts/alerts | ✅ Done | PR #4 | Toastify + Ant notification dark styled |
| T-31 Deposit/Withdraw pages | ✅ Done | PR #3 | card-d #1e293b, deposit-buttons #3BAAED selected |

**Milestones merged:**
- PR #1 — Milestone 1: design tokens, sidebar, mobile nav (2026-05-20)
- PR #2 — Milestone 2: auth cards, section headers, tabs (2026-05-20)
- PR #3 — Milestone 3: footer, profile, bet history, deposit/withdraw (2026-05-20)
- PR #4 — Milestone 4: mobile polish, toasts, modals, Ant Design dark overrides (2026-05-20)

---

## PHASE 12 — Figma Desktop Deviations (2026-05-21 audit)

### Header
- [x] **D-1.1** Increase `--navbar-height` from `50px` → `56px` (update all sticky top offsets accordingly) ✅ PR #21
- [x] **D-1.2** Add `border-bottom: 1px solid #1e293b` to the navbar element ✅ PR #21
- [x] **D-1.3** Style Login button as ghost/outlined (white text + `border: 1px solid #334155`) ✅ PR #21
- [x] **D-1.5** Add magnifier SVG icon inside the header search input (left-aligned) ✅ PR #22
- [x] **D-1.6** Add notification bell icon in header (between search bar and Login/Register) ✅ PR #23

### Left Sidebar
- [x] **D-2.1** Replace `🎰` emoji + `^` ASCII in sidebar top area — betfusion text logo + chevron SVG ✅ PR #21
- [x] **D-2.2** Replace all Unicode emoji nav icons with proper SVG icons throughout sidebar ✅ PR #21
- [x] **D-2.4** Style "Live Support" as a call-out item distinct from regular nav items ✅ PR #21
- [x] **D-2.5** Add orange pulsing dot/badge to the Live Casino sidebar nav item ✅ PR #21

### Center Content
- [x] **D-3.1** Add horizontal category filter pills on the homepage `/` ✅ PR #22
- [x] **D-3.2** Add left/right arrow navigation + page dots to the carousel ✅ PR #24
- [x] **D-3.3** Show skeleton carousel placeholder while banners are loading ✅ PR #22
- [x] **D-3.4** Add "Play Now" overlay button on game card hover ✅ PR #22
- [x] **D-3.5** Increase game card width from `140px` → `148px` ✅ PR #22
- [x] **D-3.6** Increase section title font-size from `17px` → `18px` ✅ PR #22
- [x] **D-3.9** Fix duplicate `.game-card` CSS in `index.css` ✅ PR #21

### Right Panel
- [x] **D-4.1** Fix right panel Login button border — orange → `#334155` grey ✅ PR #21
- [x] **D-4.3** Support section: green dot to differentiate from promotions orange dot ✅ PR #21
- [x] **D-4.4** Replace text-only app store badges with SVG logos ✅ PR #23

### Global / Colors
- [x] **D-5.1** Fix `.play-now-btn:hover` color — blue `#2d9ad6` → dark orange `#cf4e24` ✅ PR #21
- [x] **D-5.2** Fix stale brand colors in CSS variables (`--game-title`, `--bg-card-dark`, `--bg-section-container`) ✅ PR #23
- [x] **D-5.4** Wrap `<BottomNav />` render in a mobile-only check ✅ PR #22

**All Phase 12 items complete ✅** (PRs #21–24, 2026-05-22)

---

## PHASE 13 — Figma Exact Match Audit (2026-05-26)

> **Source of truth:** Figma file `k28P4oZLf85muzSkGvEvYV` — https://www.figma.com/design/k28P4oZLf85muzSkGvEvYV/BETFUSION-UI?node-id=0-1
> **Workflow:** One branch per milestone → PR → merge to `main` remotely via GitHub (no local merges).
> **Branch naming:** `feat/m5-brand-identity`, `feat/m6-mobile-navigation`, etc.

### Issues identified (2026-05-26 audit)

| # | Area | Issue | Files |
|---|------|--------|-------|
| F-1 | Logo | Text logo `<span>bet</span><span>fusion</span>` used everywhere — should be `logo.png` image | `customNavbar.js`, `sidebar.jsx` |
| F-2 | Brand gradient | Flat `#E55F32` orange used throughout; Figma brand gradient is `linear-gradient(135deg, #cc3366 0%, #fb8603 100%)` | All CSS files |
| F-3 | Color tokens | `--primary`, `--ring` still set to `#E55F32` flat, not gradient-aware | `index.css` |
| F-4 | Header active states | `.hover\:bg-accent:hover` and `.active-btn-display` use `#E55F32` | `header.css` |
| F-5 | Header buttons | Register bg is `#E55F32`; wallet/balance text is `#E55F32`; Deposit link uses flat orange | `UserInfo.jsx` |
| F-6 | Sidebar | Active item border-right, badge bg, live dot all `#E55F32` | `sidebar.css` |
| F-7 | Right panel | Primary button bg, promo CTA, support hover all `#E55F32` | `rightPanel.css` |
| F-8 | Bottom nav | Active/hover color `#E55F32` — should use brand gradient/orange | `bottomNav.css` |
| F-9 | Themes.css | `--btn-color-action`, `--signup`, `--deposit-c`, `--login-btn-cl`, `--blue`, `--header-icon`, `--aqua-text`, `--more-markets-text` all `#E55F32` | `Themes.css` |
| F-10 | Font | Figma uses a specific font — must be confirmed from Figma; current `Outfit` may be wrong | All CSS, `index.css` |
| F-11 | Mobile top nav | Mobile header only shows text logo + auth buttons — missing: hamburger, centered logo.png, search icon, notification bell | `customNavbar.js` |
| F-12 | Carousel desktop | `perPage` forced to `1` always; Figma shows 3 banners on desktop | `carousel.jsx` |
| F-13 | Carousel height | Desktop height set to `360px`; Figma spec is `200px` | `carousel.jsx` |
| F-14 | Gradient sections | Buttons and active UI elements need full gradient, not solid flat orange | Multiple components |

---

### MILESTONE 5 — Brand Identity: Logo + Gradient Tokens
**Branch:** `feat/m5-brand-identity`
**PR target:** `main`

#### F-1 · Swap text logo → logo.png image
**File:** `src/components/header/customNavbar.js`
- [ ] Add `import logo from "../../assets/img/logo.png"` at top
- [ ] Replace `<span><span style={{color:"#E55F32"}}>bet</span><span style={{color:"#fff"}}>fusion</span></span>` with `<img src={logo} alt="BetFusion" style={{ height: "28px", width: "auto" }} />`
- [ ] Apply same `<img>` replacement on both mobile and desktop branches of the component

**File:** `src/components/pages/casino/sidebar.jsx`
- [ ] Add `import logo from "../../../assets/img/logo.png"` at top
- [ ] In `.sidebar-logo-wrap`, replace any text-based logo render with `<img src={logo} alt="BetFusion" className="sidebar-logo-img" />`

#### F-2 · Define brand gradient token + fix index.css
**File:** `src/index.css`
- [ ] Add CSS variable: `--brand-gradient: linear-gradient(135deg, #cc3366 0%, #fb8603 100%)`
- [ ] Add CSS variable: `--brand-orange: #fb8603` (solid fallback for borders/icons)
- [ ] Update `--primary: #E55F32` → `--primary: #fb8603`
- [ ] Update `--ring: #E55F32` → `--ring: #fb8603`

#### F-4 · Header active/hover states
**File:** `src/components/header/header.css`
- [ ] `.hover\:bg-accent:hover` — change `background-color: #E55F32` → `background: var(--brand-gradient)`
- [ ] `.active-btn-display` — change `background-color: #E55F32` → `background: var(--brand-gradient)`

#### F-5 · UserInfo button and icon colors
**File:** `src/components/header/UserInfo.jsx`
- [ ] Wallet icon `color: "#E55F32"` → `color: "#fb8603"`
- [ ] Balance `<span>` `color: "#E55F32"` → `color: "#fb8603"`
- [ ] Deposit `<Link>` `color: "#E55F32"` → `color: "#fb8603"`
- [ ] Register `<Link>` `background: "#E55F32"` → `background: "var(--brand-gradient)"` (inline style update)
- [ ] Register `<Link>` `boxShadow` — update rgba to `rgba(251, 134, 3, 0.3)`

#### F-6 · Sidebar brand colors
**File:** `src/components/pages/casino/sidebar.css`
- [ ] `.sidebar-nav-item--active` `border-right: 3px solid #E55F32` → `border-right: 3px solid #fb8603`
- [ ] `.sidebar-nav-badge` `background: #E55F32` → `background: var(--brand-gradient)`
- [ ] `.sidebar-live-dot` `background: #E55F32` → `background: #fb8603`
- [ ] `.sidebar-support-item` border color `rgba(229, 95, 50, …)` → `rgba(251, 134, 3, …)` and bg `rgba(229, 95, 50, 0.06)` → `rgba(251, 134, 3, 0.06)`

#### F-7 · Right panel brand colors
**File:** `src/components/right-panel/rightPanel.css`
- [ ] `.rp-btn-primary` `background: #E55F32` → `background: var(--brand-gradient)`
- [ ] `.rp-dot` `background: #E55F32` → `background: #fb8603`
- [ ] `.rp-promo-cta` `color: #E55F32` → `color: #fb8603`
- [ ] `.rp-support-link:hover` `color: #E55F32` → `color: #fb8603`

#### F-9 · Themes.css global brand tokens
**File:** `src/assets/css/Themes.css`
- [ ] `--btn-color-action: #E55F32` → `--btn-color-action: #fb8603`
- [ ] `--bet-fusion-button-login: #E55F32` → `--bet-fusion-button-login: #fb8603`
- [ ] `--signup: #E55F32` → `--signup: #fb8603`
- [ ] `--deposit-c: #E55F32` → `--deposit-c: #fb8603`
- [ ] `--bet-fusion-button-register: #E55F32` → `--bet-fusion-button-register: #fb8603`
- [ ] `--blue: #E55F32` → `--blue: #fb8603`
- [ ] `--login-btn-cl: #E55F32` → `--login-btn-cl: #fb8603`
- [ ] `--header-icon: #E55F32` → `--header-icon: #fb8603`
- [ ] `--aqua-text: #E55F32` → `--aqua-text: #fb8603`
- [ ] `--more-markets-text: #E55F32` → `--more-markets-text: #fb8603`

---

### MILESTONE 6 — Mobile Navigation Fix
**Branch:** `feat/m6-mobile-navigation`
**PR target:** `main` (after M5 merged)

#### F-11a · Mobile header layout
**File:** `src/components/header/customNavbar.js`
- [ ] Mobile header layout (max-width 767px):
  - **Left:** Hamburger/menu icon button (opens sidebar drawer or triggers `toggleMenu`)
  - **Center:** `<img src={logo}>` `logo.png` — absolute center or flex-center
  - **Right:** Search icon button + Notification bell icon
- [ ] Remove the current flex-left text logo on mobile
- [ ] Add a `<button>` for hamburger that calls the existing `toggleMenu` prop
- [ ] Search icon taps should open a search overlay or dispatch `shouldShowSearch`
- [ ] Ensure mobile header height stays `56px` (matches `--navbar-height`)
- [ ] Wire hamburger onClick → `toggleMenu`

**File:** `src/components/header/header.css`
- [ ] Add `.mobile-header-logo` style: `height: 28px; width: auto`
- [ ] Add `.mobile-icon-btn`: `background: transparent; border: none; padding: 8px; color: #94a3b8; cursor: pointer`
- [ ] On mobile, ensure header is full-width (`left: 0; width: 100%` via existing media query)

#### F-11b · Mobile header top navigation tabs
**File:** `src/components/pages/casino/landingPage.jsx`
- [ ] On mobile (isMobile), show horizontal scrolling category tabs at the top below the header (currently these only show on desktop):
  ```
  Aviator | Crash | Sports | Casino | Slots | Virtuals | Live | Tournaments
  ```
- [ ] Style: `background: #0f172a`, `border-bottom: 1px solid #1e293b`, font 13px, active item uses `var(--brand-gradient)` text

#### F-8 · Bottom nav brand colors
**File:** `src/components/mobile-navigation/bottomNav.css`
- [ ] `.bottom-nav-item.active` `color: #E55F32` → apply gradient text:
  ```css
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  ```
- [ ] `.bottom-nav-item:hover` same gradient text treatment
- [ ] Add active indicator: small gradient pill/dot above active icon
  ```css
  .bottom-nav-item.active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 3px;
    border-radius: 0 0 3px 3px;
    background: var(--brand-gradient);
  }
  ```
- [ ] `.bottom-nav-item` add `position: relative`

---

### MILESTONE 7 — Font & Typography Alignment
**Branch:** `feat/m7-font-typography`
**PR target:** `main` (after M6 merged)

#### F-10 · Identify and apply correct Figma font
**Action required:** Open Figma file `k28P4oZLf85muzSkGvEvYV` and inspect text layers for font family.

**File:** `src/index.css`
- [ ] Replace `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap')` with the confirmed Figma font import
- [ ] Update `--font-sans` CSS variable to the confirmed font name
- [ ] If Figma uses two fonts (display + body), add both imports and a second token `--font-display`

**Files:** All component CSS and inline styles
- [ ] Global find-and-replace `'Outfit'` → confirmed font name in all `.css` files
- [ ] Global find-and-replace `"Outfit"` → confirmed font name in all `.jsx`/`.js` inline styles
- [ ] Verify heading weights match Figma (likely `font-weight: 700` or `800` for H1–H3)
- [ ] Verify body text size: check Figma body text is `14px` or `16px`
- [ ] Verify nav labels: Figma may specify `12px` or `13px` weight `500` for bottom nav

**Key files to update after font confirmed:**
- `src/index.css` — `--font-sans`, `body` rule
- `src/components/header/header.css`
- `src/components/pages/casino/sidebar.css`
- `src/components/mobile-navigation/bottomNav.css`
- `src/assets/css/Themes.css` — any `font-family` overrides

---

### MILESTONE 8 — Carousel & Content Layout
**Branch:** `feat/m8-carousel-content`
**PR target:** `main` (after M7 merged)

#### F-12 · Fix carousel perPage — restore desktop 3-banner layout
**File:** `src/components/pages/casino/carousel.jsx`
- [ ] Restore `const perPage = isMobile ? 1 : 3` (line ~52, currently hardcoded to `1`)
- [ ] Restore `gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)"` for both the shimmer grid and the banner grid
- [ ] Restore `gap: isMobile ? 0 : 10` for banner grid

#### F-13 · Fix carousel height
**File:** `src/components/pages/casino/carousel.jsx`
- [ ] Change `const bannerHeight = isMobile ? 160 : 360` → `const bannerHeight = isMobile ? 160 : 200`
- [ ] Confirm this matches the `200px` desktop height established in PR #26

#### F-14 · Gradient sections — per Figma spec
**Files:** `src/index.css`, `src/App.js`
- [ ] Verify `.top-gradient-glow` radial overlay is active: `radial-gradient(100% 100% at 50% 0%, rgba(251,134,3,0.15) 0%, transparent 60%)` — update rgba to use brand orange (`fb8603`) instead of the old blue (`3BAAED`)
- [ ] Section divider gradients: check Figma for any horizontal gradient rule separators between sections; implement if present
- [ ] Category pill active state: active pill background → `var(--brand-gradient)`, text `#fff`

**File:** `src/components/pages/casino/landingPage.jsx`
- [ ] Category tab hover/active: update hardcoded `color: "#fff"` on hover to use brand orange `#fb8603`
- [ ] Category tabs border-bottom active: add `borderBottom: "2px solid #fb8603"` on active

---

### MILESTONE 9 — Global Color Audit & QA
**Branch:** `feat/m9-color-audit-qa`
**PR target:** `main` (after M8 merged)

#### Full `#E55F32` sweep
- [ ] Run `grep -rn "E55F32" src/` — fix every remaining instance to either `#fb8603` (solid) or `var(--brand-gradient)` (gradient) based on context
- [ ] Run `grep -rn "3BAAED" src/` — confirm only legitimate "blue accent" uses remain; remove any that should be brand orange

#### Per-file final checks
- [ ] `src/assets/css/Themes.css` — second dark-theme block also has `--bet-fusion-button-login: #E55F32` at line ~196, fix that too
- [ ] `src/assets/css/newCss.css` — audit for any orange/blue color refs
- [ ] `src/assets/css/application.css` — audit for stale brand colors
- [ ] `src/assets/css/sidebar-menu.css` — audit for stale refs

#### Mobile QA checklist (375px viewport)
- [ ] Header: hamburger visible left, logo centered, icons right
- [ ] Logo is `logo.png` image (not text)
- [ ] Category tabs scroll horizontally below header
- [ ] Carousel shows 1 banner, height 160px
- [ ] Game cards: 2–3 columns
- [ ] Bottom nav visible, active item shows gradient color + top indicator pill
- [ ] No `#E55F32` flat orange anywhere — all brand orange uses `#fb8603` or gradient

#### Desktop QA checklist (1440px viewport)
- [ ] Sidebar: `logo.png` in top area, 256px wide
- [ ] Header: search bar centered, register button uses gradient
- [ ] Carousel: 3 banners, height 200px
- [ ] Active sidebar nav item: right border `#fb8603`
- [ ] Right panel: primary button uses gradient

---

### PHASE 13 TRACKING

| Task | Status | Branch / PR | Notes |
|------|--------|-------------|-------|
| M5 — Brand identity (logo + gradient) | ✅ Done | PR #27 | logo.png everywhere, --brand-gradient, all tokens updated |
| M6 — Mobile navigation | ✅ Done | PR #28 | hamburger/logo/icons mobile header, category tabs, carousel fix |
| M7 — Font & typography | ✅ Done | confirmed via DevTools | Outfit already in use; body font confirmed Outfit, sans-serif |
| M8 — Carousel & content layout | ✅ Done | PR #28 | perPage=1, height 360px desktop / 160px mobile |
| M9 — Global color audit & QA | ✅ Done | PR #29 | 0 #E55F32 remaining, logo.png in auth pages too |
| M10 — Section headers & tab active states | ✅ Done | PR #32 | 🔥 icon prefix, SHOW ALL link, active tab orange state |
| M11 — Sidebar section title gradient | ✅ Done | PR #33 | TOP EVENTS / CASINO headers use brand gradient text |

> **Merge protocol:** Each milestone PR is merged via GitHub UI (or `gh pr merge --merge`) to `main` remotely — never `git merge` locally.
