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
| `01-deploy` | installs k3s + Helmfile, clones MinBZK infra, applies our `patches/local/*` |
| `02-networking` | ingress, DNS, network policy |
| `03-restart-oidc-apps` | restarts apps to pick up SSO config |
| `04-nextcloud-office` | wires Nextcloud + Collabora |
| `05-docs` / `06-grist` | La Suite Docs and Grist |
| `07-session-lifetimes` | Keycloak session tuning |
| `08-open-suite-portal` | builds and deploys the branded portal |
| `09-portal-header` | injects the cross-app header overlay |

When it finishes it prints the portal URL: `https://bridge.<domain>`.
