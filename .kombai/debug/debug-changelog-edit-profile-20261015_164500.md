## Changes Made

### 1. Implemented the responsive edit-profile workspace
- **File:** `src/pages/EditProfilePage.jsx`
- **Change:** Filled the blank target with labelled name, email, phone, location, and 240-character bio fields; a live profile preview; dirty-state-aware Save/Discard actions; and required-field validation. The saved snapshot is tracked separately from the draft. Save trims and validates data before storing it in `localStorage` under `godsent-profile-preview`; storage errors leave the draft intact and show an accessible error. Success copy makes clear the account profile is not updated.
- **Revert:** Restore the file to its original blank placeholder and remove its route import/branches from `src/App.jsx`.

### 2. Added profile routes and active navigation state
- **File:** `src/App.jsx`
- **Change:** Mapped both `#profile` and `#edit-profile` to EditProfilePage and passed `#profile` to the existing Navbar for active link styling. Other routes remain unchanged.
- **Revert:** Remove the import, `isEditProfileRoute` check, active-link conditional, and render branch.

### 3. Added responsive Tailwind theme tokens
- **File:** `src/components/portalStyles.js`
- **Change:** Added `editProfile*` class tokens for the form/preview workspace, readable field styles, responsive grid, character count, action hierarchy, and status feedback. Reused the existing palette, fonts, and breakpoints.
- **Revert:** Remove the `editProfile*` tokens.

## Verification
- `npm run build` passed.
- `npm run lint` passed.
- Vite returned HTTP 200 for `/#profile`, `/#edit-profile`, `/src/App.jsx`, and `/src/pages/EditProfilePage.jsx`.
- `git diff --check` found no whitespace errors; Git emitted LF-to-CRLF normalization notices.
- Browser screenshot validation was unavailable because browser access was disabled.

## Revert Status
- [ ] Change 1 - Edit profile page
- [ ] Change 2 - Route and active navbar state
- [ ] Change 3 - Tailwind class tokens
