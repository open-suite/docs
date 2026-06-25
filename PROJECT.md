# Open Suite docs — project instructions

What this is, how to reach the live demo, and how an agent should drive a browser
reliably while building/maintaining these docs.

## 1. What we are building

A Docusaurus site (in `docs/`) with **three audiences**, each its own section
and sidebar:

| Section  | Route      | Audience            | Covers (examples)                                   |
| -------- | ---------- | ------------------- | --------------------------------------------------- |
| Users    | `/users`   | End users           | create a Word doc, make a calendar invite, join a call |
| Admins   | `/admins`  | Org/team admins     | invite users, reset passwords, manage storage quotas   |
| IT       | `/it`      | Operators           | install the stack, the deploy pipeline, backups        |

Rules of thumb:
- User docs are task-oriented and screenshot-driven (real demo, not mockups).
- Admin docs target the Keycloak admin console + Nextcloud admin settings.
- IT docs are command-driven (code blocks); screenshots are usually unnecessary.

Build/preview: `cd docs && npm start`. Verify before claiming done: `npm run build`
(fails on broken links).

## 2. The live demo

- Portal: **https://bridge.demo.opensuite.online**
- Apps: `nextcloud.`, `id.` (Keycloak SSO), `meet.` under `*.demo.opensuite.online`.
- Demo user: **`johndoe`**. Password is a **public demo credential** (the demo is
  open to anyone) seeded into the cluster, retrievable on the demo box:
  ```bash
  ssh root@95.217.109.206 \
    'KUBECONFIG=/etc/rancher/k3s/k3s.yaml kubectl -n mb-bureaublad get secret demo-seed \
     -o jsonpath="{.data.DEMO_PASS}" | base64 -d'
  ```
- Logging in is the **one** step an agent cannot do itself (typing credentials to
  authenticate is disallowed by the harness, even for a public demo password).
  A human signs in **once** in the dedicated browser profile below; the session
  then persists and no further logins are needed.

## 3. Reliable browser access (dedicated session)

Do **not** rely on the claude-in-chrome extension for this work (reconnect churn,
no file output). Use the dedicated, always-on Chrome with its own profile.

- One-time/ensure-running: `agent-browser` (script in `~/gbin`). It launches real
  Google Chrome with `--user-data-dir=~/.agent-browser --remote-debugging-port=9222`,
  kept alive by launchd (`co.ritza.agent-browser`), and prints the CDP URL.
- Profile `~/.agent-browser` is separate from the user's personal Chrome and
  **persists cookies/logins** — log into a site once, reuse forever.
- Attach from Playwright and capture:
  ```js
  import { chromium } from 'playwright';
  const b = await chromium.connectOverCDP('http://localhost:9222');
  const page = b.contexts()[0].pages()[0];   // the visible tab
  await page.bringToFront();                  // drive the tab the human can SEE
  await page.goto('https://bridge.demo.opensuite.online/');
  await page.screenshot({ path: 'shot.png' });// real file on disk
  await b.close();                            // detaches; does NOT kill Chrome
  ```
  Gives real DOM, CDP/devtools, network, console, and screenshots-to-disk.

Gotchas learned the hard way:
- **Always `page.bringToFront()`** the tab you drive. A persistent profile can have
  leftover tabs; if you drive a background tab, the human stares at the wrong one
  and never sees the login prompt. This caused a long false-failure loop.
- Don't gate "logged in?" on the URL alone — the portal shows `bridge.../` for a
  split second before redirecting to Keycloak. Poll for a **portal-only element**
  (e.g. text "Start instant meeting") instead.
- Cross-app SSO needs the Keycloak session cookie. `storageState` may drop the
  httpOnly `KEYCLOAK_IDENTITY` cookie — the persistent profile keeps it, which is
  why the dedicated profile (not per-run contexts) is the right tool.
- Screenshots: viewport 1440×900, `deviceScaleFactor: 2` for crisp images.

Store agent scratch scripts outside the repo (e.g. the session scratchpad), not in
`docs/`. Captured images belong in `docs/static/img/<section>/`.
