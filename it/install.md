---
sidebar_position: 2
title: Install
---
# Install Open Suite

You build Open Suite on your own machine and ship it to the server with one
script, `deploy/deploy.sh`. The script copies the build and runs
`deploy/install.sh` on the server, which installs and configures everything
else.

## What you need

On the server:

- A fresh Ubuntu 24.04 server with a public IPv4 address (IPv6 is used too if
  present). Run the install as root.
- These ports open to the internet:

  | Port | Used for |
  | --- | --- |
  | 80/tcp | Let's Encrypt challenges, redirect to HTTPS |
  | 443/tcp | The web app |
  | 25/tcp | Incoming mail from other servers |
  | 465/tcp, 587/tcp | Mail submission |
  | 993/tcp | IMAP |
  | 7881/tcp, 7882/udp | Meeting audio and video |

- Outbound port 25 open, unless you send through a relay (`OS_MAIL_RELAY`).
  Many cloud providers block it by default.

On your own machine:

- A checkout of [open-suite/opensuite-saas](https://github.com/open-suite/opensuite-saas).
- Node.js and npm (to build the web app), Go (to build the server), `rsync`
  and SSH access to the server as root.

## Choose your names

You need two names, which can be the same:

- The **domain**: the web address people open, for example
  `office.example.com`. It is also the mail server's host name.
- The **mail domain**: the part after `@` in people's addresses, for example
  `example.com`. If you leave it out, it is the same as the domain.

Before you deploy, publish these DNS records:

| Name | Type | Value |
| --- | --- | --- |
| `office.example.com` | A | the server's IPv4 address |
| `office.example.com` | AAAA | the server's IPv6 address, if it has one |
| `example.com` (the mail domain) | MX | `10 office.example.com` |

The records for SPF, DKIM, DMARC and the reverse (PTR) record are covered in
[Mail deliverability](./mail-deliverability.md). Add them as soon as the
server is up.

## Deploy

From the root of your checkout:

```bash
deploy/deploy.sh root@203.0.113.10 office.example.com admin@example.com example.com
```

The arguments are:

```text
deploy/deploy.sh <ssh-host> <domain> <acme-email> [mail-domain]
```

- `ssh-host`: how to reach the server over SSH as root.
- `domain`: the web address.
- `acme-email`: the address Let's Encrypt uses for expiry notices. You can
  pass `file:/path` to read it from a file on the server.
- `mail-domain`: optional, defaults to the domain.

The script:

1. Builds the web app (`npm run build` in `web/`) and a static Linux binary
   (`go build` in `server/`).
2. Copies both, with the `deploy/` folder, to `/root/opensuite-bundle` on
   the server.
3. Runs `install.sh` there, which:
   - installs nginx, pandoc and curl;
   - creates the `opensuite` system user and the data folders;
   - generates the installation's secrets once, in
     `/etc/opensuite/secrets.env`;
   - writes the settings to `/etc/opensuite/opensuite.env`;
   - downloads and configures the chat engine (Tuwunel), the video engine
     (LiveKit) and the mail engine (Stalwart) as systemd services bound to
     loopback;
   - configures the mail engine on its first run;
   - installs the app and nginx configuration and starts everything.

When it finishes it prints `done: https://office.example.com`. The app
requests its certificate within a minute of starting, as long as port 80
reaches the server and the A record is live.

Open the address and choose **Create an organisation** to make the first
organisation. The person who creates an organisation is its owner.

## Settings

Optional settings pass through environment variables in the shell where you
run `deploy.sh`:

| Variable | Values | Default | Effect |
| --- | --- | --- | --- |
| `OS_SIGNUP` | `open`, `code`, `closed` | `open` | Who may create a new organisation. `open`: anyone. `code`: only with the invitation code. `closed`: nobody; the sign-up page says to ask the person who runs the server. |
| `OS_SIGNUP_CODE` | any text | empty | The invitation code when `OS_SIGNUP=code`. |
| `OS_OPERATORS` | comma-separated sign-in addresses | empty | Platform operators. They see an extra **All organisations** tab in Admin, listing every organisation, and can switch an organisation between the Free and Team plans. |
| `OS_MAIL_RELAY` | `host:port:user:password` or `file:/path` | empty | Send outgoing mail through a smarthost instead of delivering directly. Port 465 uses implicit TLS; other ports use STARTTLS. `file:/path` reads the value from a file on the server, so the password never appears on your command line. |
| `OS_ORG_DOMAIN_SUFFIX` | a domain, e.g. `opensuite.example` | empty | Give every new organisation its own mail domain, `<name>.opensuite.example`, chosen at sign-up, and offer to start it with example data. Publish a wildcard MX record, `*.opensuite.example` to the server's mail host, so mail for every such domain reaches the server. Empty: organisations use the installation's mail domain and sign-up offers no example data. |

For example:

```bash
OS_SIGNUP=code OS_SIGNUP_CODE=harbour-2026 \
OS_OPERATORS=ops@example.com \
OS_MAIL_RELAY=file:/etc/opensuite/mail-relay \
deploy/deploy.sh root@203.0.113.10 office.example.com admin@example.com example.com
```

:::warning Pass every setting on every deploy
`install.sh` rewrites `/etc/opensuite/opensuite.env` each time. A variable you
leave out goes back to its default. In particular, leaving out `OS_SIGNUP`
reopens sign-up to everyone.
:::

Sign-up is safe to leave open only because organisations on the Free plan
cannot send mail to other providers.

## Check the installation

```bash
systemctl status opensuite opensuite-mail opensuite-livekit tuwunel nginx
journalctl -u opensuite -f
```

The repository also contains end-to-end and performance checks that drive a
real browser against a deployment. They need a test account:

```bash
OS_BASE=https://office.example.com OS_E2E_USER=... OS_E2E_PASS=... node tests/e2e.cjs
OS_BASE=https://office.example.com OS_E2E_USER=... OS_E2E_PASS=... node tests/perf.cjs
```

## Change a person's address

An administrator cannot rename an address in the web app. On the server, the
`opensuite` binary can move a person to a new address on one of their
organisation's mail domains. Their mailbox, documents, files and chats stay
with them:

```bash
set -a; . /etc/opensuite/opensuite.env; . /etc/opensuite/secrets.env; set +a
sudo -E -u opensuite /opt/opensuite/bin/opensuite move-address old@example.com new@example.com
```

## Files on the server

| Path | Contents |
| --- | --- |
| `/opt/opensuite/bin/opensuite` | The app binary |
| `/opt/opensuite/web/` | The web app |
| `/etc/opensuite/opensuite.env` | Settings, rewritten on every deploy |
| `/etc/opensuite/secrets.env` | Secrets, generated once and never rewritten |
| `/etc/opensuite/livekit.yaml` | Video engine configuration |
| `/etc/stalwart/` | Mail engine configuration |
| `/etc/tuwunel/tuwunel.toml` | Chat engine configuration |
| `/etc/nginx/sites-available/opensuite.conf` | nginx site |
| `/var/lib/opensuite/` | App data (see [Backups](./backups.md)) |
| `/var/lib/stalwart/` | Mail, calendars and contacts |
| `/var/lib/tuwunel/` | Chat history |
