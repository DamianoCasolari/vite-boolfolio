# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev       # Vite dev server (--host, so it's reachable from other devices on the LAN)
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

There is no lint script and no test suite configured in this repo (no ESLint/Prettier config, no test runner). Don't assume `npm test` or `npm run lint` exist.

## Architecture

This is a single-page freelance portfolio site: Vue 3 (Options API almost everywhere — `CookieBanner.vue` is the one exception using `<script setup>`), Vue Router, Bootstrap 5 + custom SCSS, and three.js for a 3D showcase. No backend: content comes from a static JSON file and the router is client-side only (`createWebHistory`).

### Routing (`src/router.js`)

Flat route list: `home`, `services`, `contacts`, `about`, `single-project` (`/projects/:slug`), `privacyPolicy`, `cookiePolicy`, catch-all `PageNotFound`. `scrollBehavior` resets scroll to top on every navigation (unless there's a hash or saved position).

### Global app shell (`src/App.vue`)

Always mounted, outside `router-view`: `SiteHeader`, `CookieBanner`, `OfferToast`, `SiteWelcomeModal`. `SiteFooter` is mounted conditionally — it's excluded on `services`, `contacts`, `about`, `privacyPolicy`, `cookiePolicy`, `PageNotFound` (so it only actually shows on `home` and `single-project`).

### Desktop/mobile split pattern

Several views don't rely on CSS alone for responsive layout — they pick between two entirely separate components at runtime based on `window.innerWidth >= 992` (Bootstrap's `lg` breakpoint): e.g. `ServicesView.vue` renders `ServicesDesktop.vue` or `ServicesMobile.vue`, and `IcosahedronShowcase.vue` internally branches its three.js behavior (autoplay rotation vs. wheel/pointer-driven rotation) on the same 992px check. When editing one of these, remember the other file needs the equivalent change — they are not kept in sync automatically. `about` is the exception: there's only `AboutMobile.vue`, used at every width.

`src/views/servizi_prima_versione/` is a leftover pre-redesign copy of the Services page (`ServicesDesktop.vue`/`ServicesMobile.vue`). It is not imported anywhere — dead code, safe to ignore unless asked to remove it.

### Global reactive state (`src/assets/js/language.js`)

No Vuex/Pinia. A handful of plain `reactive`/`ref` singletons are exported from this one module and imported directly wherever needed: `languageState` (IT/EN toggle — `languageState.eng_lan`), `cookieBannerDismissed`, `heroSeen`, `firstLoading`, `appReady`. There is no i18n library; every user-facing string is duplicated inline with `v-if="languageState.eng_lan"` / `v-else` (English/Italian), Italian is the default.

### `OfferToast.vue` — global floating CTA

This single component covers two different jobs depending on viewport and route, via a `mode` computed (`'offer' | 'wa' | 'none'`):
- Desktop: always `'offer'` (the "2026 Special Offer" promo), on every route.
- Mobile: `'offer'` only on `home` (reveals after scrolling past 50% of the hero `.jumbotron`, not a timer); `'wa'` (persistent WhatsApp CTA, copy varies by route) on most other routes; `'none'` on `services`, `about`, and `single-project` because those pages already render their own contextual WhatsApp CTA — don't re-enable `'wa'` there without removing the page-local one first, or it'll duplicate.
- On mobile it also self-docks above `SiteFooter`'s `.site_footer` element (switches from `position: fixed` to an absolute position computed from the footer's offset) so it never overlaps the footer when scrolled to the bottom of the page.

### Data (`src/assets/data/info_projects.json`)

Portfolio project entries are a static JSON array imported directly by `SiteMain.vue` and `SingleProject.vue` — no API/fetch. Sibling files `info_projects copy.json` and `info_projects copy 2.json` in the same folder are unused backups, not imported by anything.

### `IcosahedronShowcase.vue`

Raw three.js (no wrapper library): builds an icosahedron, projects each face with a `PlaneGeometry` "badge" textured from each project's logo/image (drawn onto a `<canvas>` at runtime, rounded + cover-cropped), and rotates it via wheel/pointer input on desktop or autoplay on mobile. Clicking a badge raycasts to the nearest face and routes to `single-project` for that project's slug.

### Styling

Global SCSS entry point is `src/styles/general.scss` (imported once from `main.js`), which `@use`s the partials in `src/styles/partials/` and then imports Bootstrap's SCSS. Most page/component-specific styles instead live directly in each `.vue` file's own `<style>` block (a mix of scoped and global blocks in the same file is common — check which one before adding a selector). `src/styles/partials/_magnetic_cta.scss` is *not* part of the global import list; it's opted into per-component via `@use "../styles/partials/magnetic_cta" as *;` and paired with the JS helpers in `src/assets/js/magnetic_cta.js` (`onMagneticMove`/`onMagneticLeave`) to drive the cursor-following "liquid glass" hover effect used on the various WhatsApp CTAs across the site.

Breakpoints are ad hoc numbers repeated in each file's media queries (992px for the desktop/mobile component split, 767/768px for mobile-only tweaks like `OfferToast`) rather than shared SCSS variables — `_variables.scss` only defines a few brand colors (`$clr_snow`, `$clr_street`, `$hay`, `$clr_carbon`).

### Analytics/consent

`CookieBanner.vue` gates Google Analytics: `src/assets/js/analytics.js` only loads the GA script after consent is stored in `localStorage` (`cookie_consent`), and `main.js` re-loads it on boot if consent was already given in a previous visit.
