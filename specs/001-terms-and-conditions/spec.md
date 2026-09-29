# Feature Specification: Terms & Conditions and Privacy pages (Bantrab auth)

**Feature Branch**: `001-terms-and-conditions`

**Created**: 2026-09-28

**Status**: Approved — validated by user 2026-09-29 (consent UI-only, chrome EN / legal body ES, fixed date 2026-09-28, v1 excludes cookie banner, EN legal text, i18n, dashboard legal links; checkbox only on /signup)

**Input**: User description: "Página de Términos y Condiciones para la demo Bantrab: enlazada desde signin/signup, con checkbox obligatorio en signup."

**Project**: `D:\Codigo\demos\Bantrab` (Next.js 15 App Router). Existing: `/signin`, `/signup` (both render `components/AuthForm.js`), `/dashboard`. The legal line in `AuthForm.js` (lines ~138–142) already shows "Terms of Service" and "Privacy Policy" links pointing at `href="#"` (dead). There is no `/terms`, no `/privacy`, no footer, no consent checkbox.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read the Terms & Conditions from the auth screens (Priority: P1)

A visitor on `/signup` or `/signin` activates the existing "Terms of Service" link and lands on a readable, Bantrab-branded Terms & Conditions page written in Spanish, which states its last-updated date and that the content is demo-only.

**Why this priority**: The link already lives in the UI but goes nowhere (dead `href="#"`). Making the document reachable is the core requirement and a viable MVP on its own.

**Independent Test**: From `/signup`, click "Terms of Service" → the browser lands on `/terms`, which renders the document with an English page title, a Spanish body, the "Última actualización" date, the demo notice, and ≥6 numbered sections; browser Back returns to `/signup`.

**Acceptance Scenarios**:

1. **Given** a logged-out visitor on `/signup`, **When** they activate "Terms of Service", **Then** the browser navigates to `/terms` and the page shows the Terms content in Spanish.
2. **Given** a visitor opens `/terms` directly with no session, **When** the page loads, **Then** it renders fully (HTTP 200) without requiring login.
3. **Given** the `/terms` page is shown, **Then** it displays "Última actualización: <date>" and a visible notice that the content is demo-only and not legally binding.

---

### User Story 2 - Read the Privacy Policy (Priority: P2)

A visitor activates the existing "Privacy Policy" link and reaches a Bantrab-branded Privacy Policy page in Spanish, with the same date + demo notice.

**Why this priority**: The second half of the already-present legal line; same surface, same mechanics. Independent from US1 once the shared page component exists.

**Independent Test**: From `/signin` or `/signup`, click "Privacy Policy" → `/privacy` renders the policy in Spanish with date + demo notice; direct logged-out access also works.

**Acceptance Scenarios**:

1. **Given** a logged-out visitor on any auth screen, **When** they activate "Privacy Policy", **Then** the browser navigates to `/privacy` and shows the policy in Spanish.
2. **Given** `/privacy` is opened directly, **Then** it returns HTTP 200 with no authentication.

---

### User Story 3 - Explicit consent before creating an account (Priority: P3)

On `/signup`, an unchecked required checkbox labeled "I accept the Terms and Privacy Policy" (with working links) appears above the *Create account* button; the button stays disabled until the box is checked. `/signin` is unchanged and shows no checkbox.

**Why this priority**: Adds an explicit, deliberate consent gate. Important, but lower than simply making the documents reachable (P1/P2).

**Independent Test**: Load `/signup` → *Create account* disabled, box unchecked. Check the box → button enables. Uncheck → disables again. Signin shows no checkbox.

**Acceptance Scenarios**:

1. **Given** `/signup` freshly loaded, **When** the page renders, **Then** the checkbox is unchecked and "Create account" is disabled.
2. **Given** the checkbox is unchecked, **When** the user attempts to submit, **Then** no request is sent and the button remains disabled.
3. **Given** the checkbox is checked, **Then** "Create account" is enabled and signup behaves exactly as today.
4. **Given** `/signin`, **Then** no consent checkbox is rendered.

---

### Edge Cases

- **Logged-out deep links**: direct navigation to `/terms` and `/privacy` must render (no `middleware.js` redirect to `/signin`).
- **Canonical paths**: routes are lowercase `/terms` and `/privacy`; trailing slashes handled by Next.js defaults.
- **Long body on small screens**: at 360px the legal body wraps with no horizontal scroll.
- **Keyboard-only**: the checkbox and every link are reachable by Tab with a visible focus ring; Space toggles the box.
- **Assistive tech**: the checkbox is announced with its label; the page uses a single `<h1>` and ordered `<h2>` sections.
- **Dead-link removal**: the auth-page links must perform real navigation — no `onClick={e => e.preventDefault()}`.
- **Static date**: "Última actualización" is a content constant, not computed per request (pages are static).
- **No persistence (demo)**: consent is not stored server-side — see Assumptions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST expose a Terms & Conditions page at `/terms` rendering the Terms body in Spanish.
- **FR-002**: System MUST expose a Privacy Policy page at `/privacy` rendering the policy body in Spanish.
- **FR-003**: Both pages MUST be publicly accessible without authentication (HTTP 200 logged-out).
- **FR-004**: Both pages MUST display "Última actualización: <fecha>".
- **FR-005**: Both pages MUST display a visible notice that the content is demo-only and not legally binding.
- **FR-006**: The existing "Terms of Service" and "Privacy Policy" links in `AuthForm` MUST navigate to `/terms` and `/privacy` (remove the dead `href="#"` + `preventDefault`).
- **FR-007**: The signin and signup screens MUST render a footer containing links to Terms and Privacy.
- **FR-008**: The signup form MUST include a required consent checkbox labeled "I accept the Terms and Privacy Policy", with inline links to both documents.
- **FR-009**: The "Create account" button MUST be disabled until the consent checkbox is checked (signup only).
- **FR-010**: Both pages MUST reuse the Bantrab identity: `BantrabLogo` component; palette yellow `#FFE200`, magenta `#DE0066`, teal `#00ACAA`, gray `#D2D7DB`, wordmark `#1C1C1B`, white background.
- **FR-011**: UI chrome (page titles, footer, checkbox label) MUST be in English; legal body copy MUST be in Spanish.
- **FR-012**: Pages MUST be responsive from 360px to desktop and meet WCAG 2.1 AA (semantic headings/landmarks, keyboard operable, visible focus, AA contrast).
- **FR-013**: Each page MUST set its own `metadata.title` ("Bantrab — Terms and Conditions" / "Bantrab — Privacy Policy").
- **FR-014**: Pages MUST be statically rendered (no server data fetching) and the project MUST pass `next build` with no new errors.
- **FR-015**: Each legal page MUST offer a way back into the app (brand/header logo and a "Back" affordance or footer link to signin/signup).
- **FR-016**: Brand colors MUST meet WCAG AA where applied to text or to interactive/focus indicators. Yellow `#FFE200` (≈1.15:1 on white) and gray `#D2D7DB` (≈1.4:1 on white) are **decorative surfaces only** — never used as a text color or a focus indicator on white. Text placed on a yellow surface MUST be `#1C1C1B`. Body/link text and focus indicators MUST use a color with ≥4.5:1 (text) / ≥3:1 (non-text) against their background — e.g. magenta `#DE0066` (≈4.6:1 on white) or wordmark `#1C1C1B`.

### Key Entities *(include if feature involves data)*

- **LegalDocument** (content only; not persisted): `id` (`terms` | `privacy`), `title` (English chrome label), `lang` (`es`), `lastUpdated` (date), `isDemo` (boolean), `sections[]` (each: Spanish heading + Spanish paragraphs). Relationship: referenced by the shared legal-page component and linked from `AuthFooter` and the signup consent line.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Both `/terms` and `/privacy` return HTTP 200 for a logged-out request — in `next dev` **and** in the standalone production build/container — rendering with no data fetch (static, FR-014) and a clean browser console (SC-004). (Wall-clock "<1s" is environment-dependent and is not an acceptance criterion; the objective checks are HTTP 200 + no fetch + no console errors.)
- **SC-002**: Zero dead legal links — every "Terms"/"Privacy" link resolves to `/terms` or `/privacy` (no remaining `href="#"` for these).
- **SC-003**: 100% of signup attempts with an unchecked box are blocked (button disabled; no network request).
- **SC-004**: `next build` completes with no new errors and the browser console is clean on both legal pages.
- **SC-005**: Both legal pages show no horizontal scrollbar at 360px viewport width.

## Assumptions

- The app is a demo. The legal text is illustrative and MUST NOT be presented as Bantrab's binding terms.
- Consent is enforced in the UI only; acceptance is **not** persisted server-side (auth backend unchanged). A legal audit trail would be a separate backend feature — flagged to the user, not built here.
- "Última actualización" is a hardcoded content constant (proposed `2026-09-28`), not computed per request.
- No new runtime dependencies (no MDX/CMS): content lives in a plain JS module rendered by a shared component.
- UI labels stay in English per project convention; only the legal body copy is Spanish.
- Existing tokens/classes from `AuthForm.module.css` and `globals.css` are reused.
