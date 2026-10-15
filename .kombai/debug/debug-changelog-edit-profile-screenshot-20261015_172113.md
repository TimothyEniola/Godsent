## Changes Made

### 1. Rebuilt the Edit Profile screen to match the reference
- **File:** `src/pages/EditProfilePage.jsx`
- **Change:** Replaced the preview/workspace UI with the screenshot layout: centered Edit Profile heading, circular camera/photo picker, six prefilled icon-led fields in two columns, and a bottom “Click here to save” submit action. Added local image validation/object-URL cleanup, while preserving required name/email validation, browser-only save feedback, and discard behavior when changes are dirty. The existing bio remains in the profile state and save payload although it is not shown in this screenshot, preventing accidental data loss.
- **Revert:** Restore the prior form-plus-preview implementation.

### 2. Added screenshot-sized Tailwind field styles and removed obsolete editor tokens
- **File:** `src/components/portalStyles.js`
- **Change:** Reused the shared profile page/title/avatar/detail/footer tokens for the matching layout; added compact input wrappers, icon-led input styles, save prompt, and discard link. Removed unused preview/workspace styles from the previous editor layout and consolidated the `editProfilePage` key to avoid a duplicate object key.
- **Revert:** Restore the former `editProfile*` style entries.

## Verification
- `npm run build` passed.
- `npm run lint` passed.
- Vite returned HTTP 200 for `/#edit-profile` and `/src/pages/EditProfilePage.jsx`.
- `git diff --check` found no whitespace errors; Git emitted only LF-to-CRLF notices.
- Browser screenshot comparison was unavailable because browser access was disabled.

## Revert Status
- [ ] Change 1 - Screenshot-aligned editor
- [ ] Change 2 - Tailwind form tokens
