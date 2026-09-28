# Phase 0 Research — Terms & Conditions and Privacy pages

**Feature**: `001-terms-and-conditions` | **Date**: 2026-09-28

This feature has no unknown technical dependencies (no new libraries, no external APIs), so research is limited to the design decisions below.

## Decisions

### D1 — Where does the legal text live?
**Decision**: A plain JS module `lib/legalContent.js` exporting a `LEGAL_LAST_UPDATED` constant and `terms` / `privacy` document objects (structured `sections[]`).
**Rationale**: Zero new dependencies, statically importable by server components, trivially editable, no MDX/CMS toolchain for a two-page demo.
**Alternatives rejected**: MDX (adds a build dependency and config), headless CMS (overkill for a demo, adds an external service), hardcoding JSX per page (duplicates structure across routes).

### D2 — One component or two pages?
**Decision**: One shared `components/LegalPage.js` rendered by both routes.
**Rationale**: Guarantees identical brand chrome, heading structure, date, and demo notice across both documents (Constitution III & VI); adding a third document later is a content-only change.
**Alternatives rejected**: Duplicating markup in each `page.js` (drift risk, inconsistent a11y).

### D3 — Language handling
**Decision**: English chrome (page `<h1>`/title, footer, checkbox label) + Spanish body copy, with the body rendered under `lang="es"`.
**Rationale**: Matches the confirmed decision (option 5-B) and Constitution IV; `lang="es"` keeps screen-reader pronunciation correct.
**Alternatives rejected**: All-Spanish page (violates the project's English-UI convention), all-English (wrong for a Guatemalan legal surface).

### D4 — Consent enforcement
**Decision**: UI-only gate on `/signup` — required checkbox, submit button disabled until checked. No server persistence.
**Rationale**: The auth backend is a demo and out of scope; storing consent would require an API/schema change (a separate feature). Documented as an assumption in the spec.
**Alternatives rejected**: Persisting acceptance to the user record (backend change, not requested), blocking signin too (signin has no legal gate).

### D5 — "Last updated" date
**Decision**: A hardcoded content constant (`2026-09-28`), not computed at render time.
**Rationale**: Pages are static; a per-request date would defeat static rendering and produce unstable output.

### D6 — Link wiring
**Decision**: Reuse the existing legal paragraph in `AuthForm` by replacing the dead `href="#"`/`preventDefault` with real links; add a small `AuthFooter` for a persistent, discoverable entry point on both screens.
**Rationale**: Minimal change, removes an existing defect (dead links), satisfies FR-006/FR-007.

## Open items carried from the spec (confirmed with user)

| # | Decision | Value |
|---|----------|-------|
| 1 | Legal content source | Demo content, clearly marked |
| 2 | Route scope | `/terms` **and** `/privacy` |
| 3 | Where linked from | Existing auth links **+** footer |
| 4 | Signup consent | Required checkbox that blocks submit |
| 5 | Content language | Spanish body / English UI |
| — | Extra | "Last updated" date **+** demo disclaimer |
