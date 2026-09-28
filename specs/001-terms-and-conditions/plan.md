# Implementation Plan: Terms & Conditions and Privacy pages

**Branch**: `001-terms-and-conditions` | **Date**: 2026-09-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-terms-and-conditions/spec.md`

## Summary

Add two static, Spanish-language legal pages (`/terms`, `/privacy`) to the Bantrab Next.js 15 demo. Both are rendered by one shared, Bantrab-styled component fed from a plain JS content module. Wire the pre-existing dead legal links in `AuthForm`, add an auth footer with those links, and gate the signup submit button behind a required consent checkbox. No backend change, no new dependencies.

## Technical Context

**Language/Version**: JavaScript (ES2022), Next.js 15.x (App Router), React 19

**Primary Dependencies**: `next`, `react`, `react-dom` (all existing) — **none added**

**Storage**: N/A — content is a static module (`lib/legalContent.js`)

**Testing**: No test framework installed in this repo. QA is manual/browser-driven (see `quickstart.md`). Adding Playwright/e2e is out of scope for this feature.

**Target Platform**: Web — server-rendered static pages, modern browsers (Chrome/Edge/Firefox/Safari)

**Project Type**: Web application (single Next.js app)

**Performance Goals**: Static HTML, no client JS required for the legal pages; first load < 1s locally

**Constraints**: Reuse Bantrab brand + existing CSS Modules; no new runtime deps; UI chrome English / legal body Spanish; works logged-out from 360px up

**Scale/Scope**: 2 new routes, 1 shared page component, 1 content module, 1 footer component, 1 small edit to `AuthForm`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Spec-First** — spec drafted, awaiting user validation before dev starts → PASS (pending).
- **II. Demo Fidelity** — enforced by FR-005 (visible non-binding notice) → PASS by design.
- **III. Brand Integrity** — FR-010 reuses `BantrabLogo` + documented palette → PASS.
- **IV. Language Split** — FR-011 (English chrome / Spanish body) → PASS.
- **V. Simplicity / No New Deps** — static pages + shared component, no deps → PASS.
- **VI. Accessibility & Responsiveness** — FR-012 + SC-005, verified in QA → PASS (to verify).

No violations. Complexity Tracking not required.

## Project Structure

### Documentation (this feature)

```text
specs/001-terms-and-conditions/
├── spec.md              # Feature spec (/speckit.specify)
├── plan.md              # This file (/speckit.plan)
├── research.md          # Phase 0 — decisions (/speckit.plan)
├── quickstart.md        # Phase 1 — manual QA/run guide (/speckit.plan)
└── tasks.md             # Phase 2 — task list (/speckit.tasks)
```

`data-model.md` and `contracts/` are **N/A** for this feature: there is no persistence and no API. The route contract is captured inline below.

### Source Code (repository root)

```text
app/
├── terms/page.js            # NEW  — /terms route (server component + metadata.title)
├── privacy/page.js          # NEW  — /privacy route (server component + metadata.title)
├── signin/page.js           # existing — renders <AuthForm mode="signin" />
├── signup/page.js           # existing — renders <AuthForm mode="signup" />
├── layout.js                # existing
└── globals.css              # existing — shared base styles (reused)
components/
├── LegalPage.js             # NEW  — renders a LegalDocument (EN chrome, ES body, demo notice)
├── LegalPage.module.css     # NEW
├── AuthFooter.js            # NEW  — EN links to /terms and /privacy
├── AuthFooter.module.css    # NEW
├── AuthForm.js              # EDIT — wire links (FR-006), add footer (FR-007), consent box (FR-008/009)
├── AuthForm.module.css      # EDIT — consent + footer + link styles
├── BantrabLogo.js           # existing — reused (FR-010)
└── AuthIllustration.js      # existing
lib/
└── legalContent.js          # NEW  — LEGAL_LAST_UPDATED + { terms, privacy } documents (Spanish)
```

**Structure Decision**: Single existing Next.js application, App Router. Legal content lives in `lib/legalContent.js` and is rendered by one reusable `LegalPage` component so `/terms` and `/privacy` stay structurally identical and future documents are cheap to add. Only `AuthForm.js`/`AuthForm.module.css` are edited; everything else is additive.

### Route Contract

| Route      | Render | Auth    | Response | Notes                                   |
|------------|--------|---------|----------|-----------------------------------------|
| `/terms`   | static | public  | 200      | Terms body in Spanish; title in English |
| `/privacy` | static | public  | 200      | Policy body in Spanish; title in English|

**Middleware note (verified in source)**: `middleware.js` uses `matcher: ['/dashboard/:path*']` only — `/terms` and `/privacy` are NOT auth-gated, so they return 200 logged-out. `next.config.mjs` sets `output: 'standalone'`, so the same holds inside the production container.

### Component Contract (props)

| Component    | Props                                   | Renders                                              |
|--------------|-----------------------------------------|------------------------------------------------------|
| `LegalPage`  | `document` (`'terms'` \| `'privacy'`)   | Header (logo), EN `<h1>`, "Última actualización", demo notice, ES sections, back link |
| `AuthFooter` | —                                        | EN links: "Terms of Service" → `/terms`, "Privacy Policy" → `/privacy` |
| `AuthForm`   | `mode` (`'signin'` \| `'signup'`)       | unchanged + footer (both) + consent checkbox (signup only) |

## Complexity Tracking

> No constitution violations — section intentionally empty.
