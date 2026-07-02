# Open Suite docs — project structure

A Docusaurus site with three audiences, each its own section and sidebar:

| Section  | Route      | Audience            | Covers (examples)                                   |
| -------- | ---------- | ------------------- | --------------------------------------------------- |
| Users    | `/users`   | End users           | create a Word doc, make a calendar invite, join a call |
| Admins   | `/admins`  | Org/team admins     | invite users, reset passwords, manage storage quotas   |
| IT       | `/it`      | Operators           | install the stack, the deploy pipeline, backups        |

Rules of thumb:

- User docs are task-oriented and screenshot-driven (real demo, not mockups).
- Admin docs target the Keycloak admin console + Nextcloud admin settings.
- IT docs are command-driven (code blocks); screenshots are usually unnecessary.

Screenshots: viewport 1440×900 at 2× device scale for crisp images; captured
images belong in `static/img/<section>/`.

Build/preview: `npm start`. Verify before publishing: `npm run build`
(fails on broken links). See `README.md` for how the site is deployed.

The live demo the screenshots come from is at
`https://bridge.demo.opensuite.online` (public demo, user `johndoe`).
