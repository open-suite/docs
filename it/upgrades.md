---
sidebar_position: 4
title: Upgrades
---
# Upgrade Open Suite

Re-running `deploy.sh` is the release process. Pull the new version of the
repository and run the same command you used to install, with the same
settings:

```bash
git pull
OS_SIGNUP=... OS_SIGNUP_CODE=... OS_OPERATORS=... OS_MAIL_RELAY=... \
deploy/deploy.sh root@203.0.113.10 office.example.com admin@example.com example.com
```

`install.sh` is idempotent:

- A service restarts only when its binary or its configuration changed. An
  upgrade of the app alone does not interrupt calls, chat or mail.
- Secrets in `/etc/opensuite/secrets.env` are generated once and never
  replaced.
- The engine versions are pinned at the top of `deploy/install.sh`
  (`TUWUNEL_VERSION`, `STALWART_VERSION`, `LIVEKIT_VERSION`). When a new
  release of the repository changes one, the installer downloads that engine
  and restarts it.
- The database schema is migrated by the app when it starts.
- Web app files from older builds stay on disk for 14 days, so browser tabs
  that are still open keep working, and are then deleted.

People do not need to do anything. The web app checks for a new version in
the background and uses it on the next load.

:::warning
Pass every setting again. `install.sh` rewrites `/etc/opensuite/opensuite.env`
on each run and missing variables go back to their defaults, which reopens
sign-up (`OS_SIGNUP=open`) and removes your operators.
:::

Take a backup before upgrading; see [Backups](./backups.md).
