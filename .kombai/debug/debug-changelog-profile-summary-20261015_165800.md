## Changes Made

### 1. Added shared profile storage and compatibility defaults
- **File:** `src/utils/profileStorage.js`
- **Change:** Added the `godsent-profile-preview` storage helper, shared schema including nationality and position, and screenshot sample defaults. Existing saved values (name, email, phone, location, bio) are preserved; missing fields merge from defaults. Invalid records and storage failures return safe error states.
- **Revert:** Remove this file and restore page-local storage logic in `EditProfilePage.jsx`.

### 2. Implemented the screenshot-matched profile summary
- **File:** `src/pages/Profile.jsx`
- **Change:** Replaced the blank file with the centered title/avatar picker, six screenshot details in a responsive two-column grid, edit link, saved status, and scroll cue. Profile photos are validated and previewed locally with object URL cleanup; no photo upload/persistence is claimed.
- **Revert:** Restore the file to its original blank placeholder and remove its App import/route.

### 3. Connected the summary and editor to the shared schema
- **File:** `src/pages/EditProfilePage.jsx`
- **Change:** Added nationality and position fields, renamed location to Residential Address, and migrated read/save/normalization to the shared profile storage helper. The editor retains its draft, saved-snapshot, validation, and local-only save behavior.
- **Revert:** Restore the prior editor and its page-local schema.

### 4. Split the profile routes
- **File:** `src/App.jsx`
- **Change:** `#profile` renders the summary, `#edit-profile` renders the editor, and both keep the Profile navbar item active.
- **Revert:** Remove the Profile import and restore the shared `isEditProfileRoute` mapping.

### 5. Added summary layout tokens
- **File:** `src/components/portalStyles.js`
- **Change:** Added responsive Tailwind classes for profile heading/avatar, detail grid and values, footer actions/status, photo errors, and scroll cue, reusing existing theme tokens.
- **Revert:** Remove the `profile*` entries.

## Verification
- `npm run build` passed.
- `npm run lint` passed.
- Local Vite returned HTTP 200 for both `/#profile` and `/#edit-profile`, and for the summary, editor, App, and shared storage modules.
- `git diff --check` found no whitespace errors; Git emitted only LF-to-CRLF notices.
- Browser screenshot comparison was unavailable because browser access was disabled.

## Revert Status
- [ ] Change 1 - Shared profile storage
- [ ] Change 2 - Profile summary page
- [ ] Change 3 - Editor schema integration
- [ ] Change 4 - Route split
- [ ] Change 5 - Tailwind summary tokens
