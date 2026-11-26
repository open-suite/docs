---
sidebar_position: 1
title: Architecture
slug: /
---
# Open Suite for IT

Open Suite is one Go program and one web app that together provide mail,
calendar, contacts, chat, video meetings, files, documents, spreadsheets and
presentations behind a single sign-in. It runs on one Ubuntu server with
native packages and systemd. There are no containers and no cluster. A full
installation uses about 0.5 GB of memory.

One installation hosts many organisations. Each organisation has its own
people, administrators and, optionally, its own domain for the web address and
for mail.

These pages cover the installation itself. Organisation administrators manage
their people and domains from the suite's own Admin screen; see
[For admins](/admins).

:::note Looking for the earlier k3s distribution?
The version built from Nextcloud, Keycloak, La Suite Meet and Docs on k3s is
documented separately at
[docs.opensuite.online/classic](https://docs.opensuite.online/classic/).
:::

## How the parts fit together

```
browser ── https ──> nginx ──┬─> opensuite (Go, :8600)   identity, organisations, documents, files
   one origin, one cookie    ├─> Tuwunel   (:8008)       chat engine (Matrix homeserver)
                             ├─> LiveKit   (:7880)       video engine (media on udp/7882, tcp/7881)
                             └─> /assets from disk
                 opensuite ──┴─> Stalwart  (:8446)       mail engine (SMTP 25/465/587, IMAP 993)
```

| Part | What it does | Listens on |
| --- | --- | --- |
| nginx | TLS for every domain, static assets, proxies everything else | 80, 443 |
| `opensuite` | Accounts, organisations, sessions, documents, spreadsheets, presentations, files, meeting rooms, search index, certificates (ACME), custom domains. SQLite database. | 127.0.0.1:8600 |
| Stalwart | Mail, calendars and address books. Configured and queried by `opensuite` only. | 25, 465, 587, 993; HTTP on 127.0.0.1:8446 |
| Tuwunel | Chat (Matrix). Federation is off. | 127.0.0.1:8008 |
| LiveKit | Video and audio for meetings | 127.0.0.1:7880, media on 7881/tcp and 7882/udp |
| pandoc | Converts Word, OpenDocument and Markdown for document import and export | not a service |

The three engines have no login page and no user interface of their own.
People never authenticate to them directly. The `opensuite` program creates
their accounts and talks to them with machine credentials, so there is no
single sign-on layer to keep in step.

The browser only ever talks to one origin. The web app is a single-page app
that keeps a copy of the person's data in the browser (IndexedDB) and works
offline for documents. Spreadsheets run their calculation engine in the
browser.

## Certificates and custom domains

The `opensuite` program has its own ACME client. It requests Let's Encrypt
certificates for the main domain and for every verified custom domain, and
writes them to `/var/lib/opensuite/certs/<name>.crt` and `.key`. nginx picks
the certificate per TLS handshake by server name, so adding a custom domain
needs no nginx change and no reload. The mail engine uses the certificate of
the main domain.

## Plans and limits

Each organisation is on a plan. The limits are set in the code
(`server/auth.go`):

| Plan | People | Storage | Custom domains | Mail to other providers |
| --- | --- | --- | --- | --- |
| Free | 5 | 5 GB | 1 | No |
| Team | 250 | 250 GB | 10 | Yes |

New organisations start on Free. On the Free plan, people can send mail only
to addresses on domains this installation hosts. This keeps throwaway
sign-ups from using the server's sending reputation for spam. A platform
operator (see `OS_OPERATORS` in [Install](./install.md)) moves an organisation
to Team in Admin → All organisations.

## What is not included yet

- A wiki.
- Payments.
- Mail and calendar access from other apps. IMAP runs, but people have no app
  passwords yet.
- Chat with other Matrix servers (federation is off), and end-to-end
  encrypted chat.
- Offline editing of spreadsheets beyond the session already open.
- Shared calendars, comments on spreadsheet cells, charts inside exported
  Excel files, tables in presentations, and version history for
  presentations.
