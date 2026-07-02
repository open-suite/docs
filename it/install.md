---
sidebar_position: 2
---
# Install (single VPS, k3s)

## Requirements

- Fresh **Ubuntu 24.04** server, ≥12 vCPU and ≥48 GiB RAM.
- A domain with a wildcard record `*.<domain>` pointing at the server's IP.
- Root SSH access.

## Deploy

From a checkout of the `open-suite/open-suite` repo on the server, as root:

```bash
sudo ./deploy.sh <domain> you@example.com 'MASTER_PASSWORD'
```

This is idempotent — re-running is safe. It runs the staged pipeline:

| Step | Does |
| ---- | ---- |
| `01-deploy` | installs k3s + Helmfile, clones MinBZK infra at the pinned `UPSTREAM_REF`, applies our `patches/local/*` |
| `02-networking` | ingress, DNS, network policy |
| `03-restart-oidc-apps` | restarts apps to pick up SSO config |
| `04-nextcloud-office` | wires Nextcloud + Collabora |
| `05-docs` / `06-grist` | La Suite Docs and Grist |
| `07-session-lifetimes` | Keycloak session tuning |
| `08-open-suite-portal` | builds and deploys the branded portal |
| `09-portal-header` | injects the cross-app header overlay |
| `10-keycloak-login` | Open Suite Keycloak login theme (+ demo credential panel) |
| `11-element-web` | Element Web tweaks for non-E2EE chat defaults |
| `12-auth-gate` | edge auth gate in front of the app ingresses |
| `13-meet-frontend` | La Suite Meet frontend patches (permission prompts, home actions) |

When it finishes it prints the portal URL: `https://bridge.<domain>`.

## Demo mode (optional)

For a public demo install, set these before running `deploy.sh`:

| Env var | Default | Meaning |
| ------- | ------- | ------- |
| `OPEN_SUITE_DEMO_MODE` | `false` | `true` shows a demo-credentials panel on the login page |
| `OPEN_SUITE_DEMO_USERNAME` | `johndoe` | demo user shown on the panel |
| `OPEN_SUITE_DEMO_PASSWORD` | `myStrongPassword123` | demo user's password |
| `OPEN_SUITE_DEMO_ADMIN_USERNAME` | `demoadmin` | dedicated demo admin account |
| `OPEN_SUITE_DEMO_ADMIN_PASSWORD` | unset | unset → a password is generated, stored at `/etc/mijnbureau/demo-admin-password` (mode 600), and never shown on the login page; set it explicitly to display it on the panel |

Demo data (calendar events with Meet links, docs, a chat thread) is seeded by
`scripts/demo/seed-demo.sh`; `scripts/demo/install-cron.sh` sets up a daily
reset. See `scripts/demo/README.md` in the repo.
