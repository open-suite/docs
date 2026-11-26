---
sidebar_position: 3
title: Mail deliverability
---
# Mail deliverability

Other providers accept mail from a new server only when its DNS proves who it
is. Publish the records below for the installation's mail domain. In the
examples the web domain (and mail host) is `office.example.com`, the mail
domain is `example.com`, and the server's address is `203.0.113.10`.

Organisations that add their own domain in Admin → Domains get their own list
of records on that screen, including DKIM; see
[Custom domains](/admins/custom-domains). This page is about the
installation's own mail domain, which every organisation uses until it adds
one.

## MX: receive mail

```text
example.com.   MX   10 office.example.com.
```

The mail host is always the web domain you passed to `deploy.sh`. It needs an
A record (and AAAA if the server has IPv6) pointing at the server.

## SPF: who may send

If the server delivers mail itself:

```text
example.com.   TXT   "v=spf1 mx ~all"
```

If you send through a relay with `OS_MAIL_RELAY`, add the relay's own SPF
include as its documentation says, for example:

```text
example.com.   TXT   "v=spf1 mx include:relay.example.net ~all"
```

## DKIM: signed mail

The mail engine creates DKIM keys for the mail domain when it is first set
up. The Admin screen shows DKIM records only for custom domains, so read the
installation's own records on the server:

```bash
set -a; . /etc/opensuite/secrets.env; . /etc/opensuite/opensuite.env; set +a
curl -s -u "$OS_MAIL_ADMIN" -H 'Content-Type: application/json' http://127.0.0.1:8446/jmap/ \
  -d '{"using":["urn:ietf:params:jmap:core","urn:stalwart:jmap"],"methodCalls":[["x:Domain/query",{"filter":{"name":"'"$OS_MAIL_DOMAIN"'"}},"0"],["x:Domain/get",{"#ids":{"resultOf":"0","name":"x:Domain/query","path":"/ids"},"properties":["dnsZoneFile"]},"1"]]}' \
  | python3 -c 'import json,sys; print(json.load(sys.stdin)["methodResponses"][1][1]["list"][0]["dnsZoneFile"])'
```

This prints a zone file for the domain. Publish each TXT record whose name
contains `._domainkey.` exactly as shown. When a value is split across several
quoted strings, join them into one value if your DNS provider asks for a
single string.

If you relay through a smarthost that signs mail itself, follow its DKIM
instructions as well.

## DMARC: what to do with forgeries

```text
_dmarc.example.com.   TXT   "v=DMARC1; p=quarantine"
```

Start with `p=none` and a `rua=` reporting address if you want to watch the
results before enforcing.

## PTR: reverse DNS

Ask your hosting provider to set the reverse DNS (PTR) record of the server's
IP address to the mail host:

```text
10.113.0.203.in-addr.arpa.   PTR   office.example.com.
```

Most large providers reject or junk mail from an address whose reverse name
does not match the name the server announces. The mail engine announces the
web domain.

## Sending through a relay

Many cloud providers block outbound port 25, and a new IP address has no
reputation. Both are reasons to send through a relay (smarthost). Set
`OS_MAIL_RELAY` when you deploy:

```bash
OS_MAIL_RELAY=smtp.relay.example.net:587:username:password deploy/deploy.sh ...
```

or keep the value in a file on the server (readable by root only) and pass its
path:

```bash
OS_MAIL_RELAY=file:/etc/opensuite/mail-relay deploy/deploy.sh ...
```

With a relay, mail to addresses this installation hosts is delivered locally
and everything else goes through the relay.

:::note
Setting `OS_MAIL_RELAY` back to empty does not remove a relay that was set up
earlier; the mail engine keeps routing through it. To stop relaying, change
the relay in the mail engine's configuration.
:::

## Check your records

```bash
dig +short MX example.com
dig +short TXT example.com
dig +short TXT _dmarc.example.com
dig +short -x 203.0.113.10
```

Then send a message from a Team-plan organisation to an outside mailbox and
check the headers for `spf=pass`, `dkim=pass` and `dmarc=pass`. Organisations
on the Free plan cannot send to outside addresses at all.
