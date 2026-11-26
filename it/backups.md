---
sidebar_position: 5
title: Backups
---
# Back up and restore

Everything Open Suite stores lives in a few folders on the one server. Paths
below are the ones `deploy/install.sh` creates.

## What lives where

| Path | Contents | Back up? |
| --- | --- | --- |
| `/var/lib/opensuite/opensuite.db` (with `-wal` and `-shm`) | The app's SQLite database: organisations, people, sessions, sharing, meeting rooms, custom domains, every document, spreadsheet and presentation, their version history, and the search index | Yes |
| `/var/lib/opensuite/files/` | Uploaded files in Files | Yes |
| `/var/lib/opensuite/blobs/` | Pictures inserted into documents and presentations | Yes |
| `/var/lib/opensuite/certs/` | TLS certificates and the ACME account key | Optional; the app requests new certificates if they are missing |
| `/var/lib/stalwart/` | The mail engine's database: every mailbox, calendar and address book, and the DKIM keys | Yes |
| `/var/lib/tuwunel/` | The chat engine's database: conversations and shared chat files | Yes |
| `/etc/opensuite/secrets.env` | The installation's secrets: session and signing key, chat and video engine keys, mail engine admin password | Yes, and keep it apart from the data backup |
| `/etc/opensuite/` (other files) | Settings, video engine configuration, and any files you created for `file:` settings (relay login, ACME address) | Yes |
| `/etc/stalwart/` | Mail engine bootstrap configuration and its `.configured` marker | Yes |
| `/etc/tuwunel/tuwunel.toml` | Chat engine configuration (rewritten by the installer) | Optional |

The live video engine (LiveKit) stores nothing.

`secrets.env` matters as much as the data. The mail engine's admin password
and the chat engine's signing key in it must match what the engines' data
expects. A restore with a fresh `secrets.env` leaves the app unable to reach
existing mailboxes and chat accounts.

## Take a consistent backup

The simplest consistent backup stops the services for the length of the
copy:

```bash
systemctl stop opensuite opensuite-mail tuwunel
tar -czf /root/opensuite-backup.tar.gz \
  /var/lib/opensuite /var/lib/stalwart /var/lib/tuwunel \
  /etc/opensuite /etc/stalwart /etc/tuwunel
systemctl start opensuite-mail tuwunel opensuite
```

Copy the archive off the server and encrypt it: it contains the secrets and
everyone's mail.

To copy the app database without stopping the app, use SQLite's own backup
command (`apt-get install sqlite3`), then copy the folders:

```bash
sqlite3 /var/lib/opensuite/opensuite.db ".backup '/root/opensuite.db'"
```

The mail and chat engines use RocksDB, which should be copied while the
engine is stopped.

## Restore

1. Install Open Suite on the new server with `deploy.sh`, using the same
   domain, mail domain and settings. This creates the users, folders and
   services.
2. Stop the services:
   ```bash
   systemctl stop opensuite opensuite-mail tuwunel
   ```
3. Unpack the archive over `/var/lib/opensuite`, `/var/lib/stalwart`,
   `/var/lib/tuwunel`, `/etc/opensuite` and `/etc/stalwart`, and give the
   folders back to their owners:
   ```bash
   tar -xzf /root/opensuite-backup.tar.gz -C /
   chown -R opensuite:opensuite /var/lib/opensuite/files /var/lib/opensuite/blobs /var/lib/opensuite/opensuite.db*
   chown -R stalwart:stalwart /var/lib/stalwart /etc/stalwart
   chown -R tuwunel:tuwunel /var/lib/tuwunel
   ```
4. Start the services, or run `deploy.sh` once more, which also starts them:
   ```bash
   systemctl start opensuite-mail tuwunel opensuite
   ```
5. Point DNS at the new server if its address changed, and update the PTR
   record.

People's browsers keep a local copy of their documents. If you restore an
older backup, documents edited after that backup may be sent back to the
server the next time those people open them.
