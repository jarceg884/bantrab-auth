# Tasks: Terms & Conditions and Privacy pages (Bantrab auth)

**Input**: Design documents from `/specs/001-terms-and-conditions/`

**Prerequisites**: `plan.md`, `spec.md`

**Tests**: No test framework exists in this repo and no automated tests were requested — QA is manual/browser-driven via `quickstart.md`. No test tasks below.

**Organization**: Tasks are grouped by user story so each can be implemented and verified independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1 / US2 / US3
- Exact file paths are included.

## Path Conventions

Single Next.js app at the repo root: `app/`, `components/`, `lib/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Feature scaffolding and the content module shell.

- [ ] T001 Confirm spec-kit scaffolding and feature dir `specs/001-terms-and-conditions/` exist (created by `/speckit.specify`)
- [ ] T002 [P] Create `lib/legalContent.js` with `export const LEGAL_LAST_UPDATED = '2026-09-28'` and empty `terms` / `privacy` document objects (shape per spec Key Entities: `id,title,lang,lastUpdated,isDemo,sections[]`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared building blocks required by every story.

**⚠️ CRITICAL**: No user story can be completed until this phase is done.

- [ ] T003 [P] Build `components/LegalPage.js` + `components/LegalPage.module.css` — props `{ document }`; renders Bantrab header (reuse `BantrabLogo`), English `<h1>` from `title`, "Última actualización: <fecha>", the demo/non-binding notice, Spanish sections as `<h2>`+`<p>`, and a back link (FR-004, FR-005, FR-011, FR-015)
- [ ] T004 [P] Build `components/AuthFooter.js` + `components/AuthFooter.module.css` — English links "Terms of Service" → `/terms`, "Privacy Policy" → `/privacy` (FR-007)
- [ ] T005 Write the full Spanish legal copy for both documents in `lib/legalContent.js`:
  - Terms sections: aceptación, descripción del servicio (demo), cuenta y seguridad, uso aceptable, propiedad intelectual, datos personales (enlace a Privacidad), limitación de responsabilidad, cambios, contacto
  - Privacy sections: responsable, datos que recopilamos (nombre, email, contraseña almacenada con hash), finalidad, conservación, terceros, derechos del titular, cookies, contacto

**Checkpoint**: `LegalPage` + `AuthFooter` exist and render with content.

---

## Phase 3: User Story 1 - Terms & Conditions reachable (Priority: P1) 🎯 MVP

**Goal**: `/terms` renders the Terms in Spanish and is reachable from the auth screens' existing link.

**Independent Test**: From `/signup`, click "Terms of Service" → lands on `/terms` (HTTP 200) showing title, date, demo notice, ≥6 sections; Back returns to `/signup`.

### Implementation for User Story 1

- [ ] T006 [US1] Create `app/terms/page.js` — server component; `export const metadata = { title: 'Bantrab — Terms and Conditions' }`; render `<LegalPage document="terms" />` (FR-001, FR-013, FR-014)
- [ ] T007 [US1] Edit `components/AuthForm.js` (legal paragraph ~lines 138–142) — replace the dead `href="#"` + `preventDefault` links with real navigation to `/terms` and `/privacy` (FR-006)
- [ ] T008 [US1] Verify `/terms` returns 200 logged-out and renders correctly

**Checkpoint**: US1 fully functional → first demo/deploy candidate.

---

## Phase 4: User Story 2 - Privacy Policy reachable (Priority: P2)

**Goal**: `/privacy` renders the policy in Spanish and is reachable from the auth screens.

**Independent Test**: From `/signin` or `/signup`, click "Privacy Policy" → `/privacy` (HTTP 200) in Spanish with date + demo notice.

### Implementation for User Story 2

- [ ] T009 [US2] Create `app/privacy/page.js` — `metadata.title = 'Bantrab — Privacy Policy'`; render `<LegalPage document="privacy" />` (FR-002, FR-013)

**Checkpoint**: US1 + US2 both work independently.

---

## Phase 5: User Story 3 - Consent gate on signup (Priority: P3)

**Goal**: Signup cannot be submitted until the user explicitly accepts Terms + Privacy; signin is untouched.

**Independent Test**: Load `/signup` → *Create account* disabled; check box → enabled; uncheck → disabled. `/signin` shows no checkbox.

### Implementation for User Story 3

- [ ] T010 [US3] In `components/AuthForm.js`, add `const [accepted, setAccepted] = useState(false)` and, for `isSignUp` only, render a required checkbox labeled "I accept the Terms and Privacy Policy" with inline links to `/terms` and `/privacy` (FR-008)
- [ ] T011 [US3] Disable the submit button until `accepted && !loading` on signup; leave signin logic unchanged (FR-009)
- [ ] T012 [US3] Render `AuthFooter` on both signin and signup (inside `AuthForm`) (FR-007)
- [ ] T013 [US3] Add consent/footer/link styles to `components/AuthForm.module.css`

**Checkpoint**: All three stories functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates before hand-off to QA/deploy.

- [ ] T014 [P] Accessibility pass — checkbox↔label association, `focus-visible` rings, heading order (one `<h1>`, ordered `<h2>`), AA contrast (FR-012)
- [ ] T015 [P] Responsive pass at 360px / 768px / 1280px — no horizontal scroll on legal pages (SC-005)
- [ ] T016 Run `next build` — must complete with no new errors (FR-014, SC-004)
- [ ] T017 Run the `quickstart.md` manual QA checklist (SC-001…SC-005)
- [ ] T018 Update `README.md` with the new `/terms` and `/privacy` routes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → no dependencies.
- **Foundational (Phase 2)** → depends on Setup; **blocks all stories**.
- **US1 (Phase 3)** → after Phase 2. MVP.
- **US2 (Phase 4)** → after Phase 2; independent of US1 (new file only).
- **US3 (Phase 5)** → after Phase 2; independent of US1/US2 functionally, but edits `AuthForm.js` (see file-conflict note).
- **Polish (Phase 6)** → after all desired stories.

### Within / Across Stories

- T003 and T004 are different files → parallel [P].
- **File conflict**: T007, T010, T011, T012 all edit `components/AuthForm.js` — run them **sequentially** (not in parallel) to avoid clobbering.
- `lib/legalContent.js` (T002, T005) must precede anything that renders content (T006, T009).

### Parallel Opportunities

- T002, T003, T004 can start together.
- After Phase 2, US1 (T006) and US2 (T009) can be built in parallel (separate files).

---

## Implementation Strategy

### MVP First (US1 only)

1. Phase 1 → Phase 2 → Phase 3 (T001–T008).
2. **STOP and VALIDATE**: `/terms` reachable + readable logged-out.
3. Deploy/demo if ready.

### Incremental Delivery

US1 (Terms) → verify → US2 (Privacy) → verify → US3 (Consent gate) → verify → Polish. Each slice is independently testable and adds value without breaking the previous.

---

## Notes

- `[P]` = different files, no dependencies.
- Verify against `spec.md` acceptance scenarios; the spec is the source of truth.
- Commit after each task or logical group; do not commit generated `.next/`.
