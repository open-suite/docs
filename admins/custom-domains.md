---
sidebar_position: 4
title: Custom domains
---
# Use your own domain

By default your organisation uses the installation's web address and mail
domain. Under **Admin** > **Domains** you can add a domain you own, for the
suite's web address, for email addresses, or both. The Free plan includes one
custom domain, the Team plan ten.

![Domains, before any domain is added](/img/admins/domains-empty.png)

## Add a domain

1. Type the domain, for example `northwind.example`, and click
   **Add domain**.
2. Open Suite shows the DNS records to publish. Click the copy button next to
   a value to copy it, and add the records at your DNS provider.
3. Click **Check DNS**. Open Suite looks the records up and shows what it
   found. Check again after your changes have spread; this can take from a
   few minutes to a few hours.

![A domain with its DNS records and the result of Check DNS](/img/admins/domains.png)

Two badges show the state: **Web address live** or **Web address not set**,
and **Email live** or **Email not set**.

## The records

The values below come from the demo installation; yours show your own
server's names.

| Purpose | Type | Name | Value |
| --- | --- | --- | --- |
| Open the suite at this address | CNAME | your domain | the installation's web address, for example `office.demo.opensuite.online` |
| Prove you own the domain (mail) | TXT | your domain | `opensuite-verify=` followed by your organisation's code |
| Receive mail | MX | your domain | `10` and the installation's mail host |
| Authorise sending (SPF) | TXT | your domain | `v=spf1 mx include:` the installation's mail domain `~all` |
| Sign outgoing mail (DKIM) | TXT | two names ending in `._domainkey.` your domain | shown once email is live |
| Reject forgeries (DMARC) | TXT | `_dmarc.` your domain | `v=DMARC1; p=quarantine` |

### Web address

Only the first record is needed for the web address. When your domain points
at the server, **Check DNS** reports "Points at Open Suite. A certificate is
issued within a minute." Open Suite then gets an HTTPS certificate for it, and
people in your organisation can open the suite at your domain.

Many DNS providers do not allow a CNAME on a bare domain such as
`northwind.example` next to MX and TXT records. In that case use an A record
(and AAAA, if the server has IPv6) with the server's address, or your
provider's ALIAS or ANAME record. Open Suite only checks that the name
resolves to the server. A subdomain such as `office.northwind.example` can
use the CNAME as shown.

### Email

Email needs the ownership TXT record and the MX record. When both are found,
**Check DNS** reports "Ownership record found." and "Mail is routed to Open
Suite.", the badge turns to **Email live**, and two DKIM records are added to
the list. Publish those, and the SPF and DMARC records, so other providers
trust your mail.

Once email is live, you can choose the domain when you
[add a person](./people.md#add-a-person). Existing people keep their address;
the people who run the installation can move them to the new domain.

If your domain already receives mail somewhere else, changing the MX record
moves all of its mail to Open Suite.

## Remove a domain

Click the bin (**Remove domain**). A domain cannot be removed while people
still have addresses on it: "People still have addresses on this domain.
Remove them first."
