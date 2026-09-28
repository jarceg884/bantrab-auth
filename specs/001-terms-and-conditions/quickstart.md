# Quickstart & QA — Terms & Conditions and Privacy pages

**Feature**: `001-terms-and-conditions` | **Date**: 2026-09-28

## Run the app

```bash
cd /d/Codigo/demos/Bantrab
npm run dev            # http://localhost:3000
```

## Routes under test

| Route      | Expected                                                        |
|------------|-----------------------------------------------------------------|
| `/terms`   | 200, logged-out OK, Spanish body, English title, date, demo notice |
| `/privacy` | 200, logged-out OK, Spanish body, English title, date, demo notice |

## Build gate (must pass before deploy)

```bash
npm run build          # next build — no new errors
```

## Manual QA checklist (maps to Success Criteria)

1. **SC-001 — reachable & fast**
   - [ ] Open `http://localhost:3000/terms` → HTTP 200, renders < 1s.
   - [ ] Open `http://localhost:3000/privacy` → HTTP 200, renders < 1s.
2. **SC-002 — no dead links**
   - [ ] Open `/signup` (and `/signin`): click "Terms of Service" → goes to `/terms`.
   - [ ] Click "Privacy Policy" → goes to `/privacy`.
   - [ ] No "Terms/Privacy" control remains a `href="#"` dead anchor.
3. **SC-003 — consent gate (signup only)**
   - [ ] `/signup` loads with the checkbox unchecked and **Create account** disabled.
   - [ ] Attempting to submit while unchecked sends no request.
   - [ ] Check the box → **Create account** enables.
   - [ ] Uncheck → disables again.
   - [ ] `/signin` shows **no** checkbox; signin still works.
4. **FR-004/FR-005 — legal page content**
   - [ ] Both pages show "Última actualización: …" and a visible demo / non-binding notice.
   - [ ] `/terms` shows ≥6 numbered sections, in Spanish.
   - [ ] `/privacy` shows the policy sections, in Spanish.
5. **SC-004 — clean run**
   - [ ] `next build` completes with no new errors.
   - [ ] Browser console clean on both legal pages.
6. **SC-005 + FR-012 — responsive & accessible**
   - [ ] Resize to 360px: no horizontal scroll on `/terms` or `/privacy`.
   - [ ] Tab order reaches the checkbox and all links; focus ring visible.
   - [ ] Checkbox toggles with Space and is announced with its label.

## Demo-content sanity

- [ ] The demo/not-binding notice is present and legible on both pages (Constitution II).
- [ ] The page copy does not read as Bantrab's official/binding terms.
