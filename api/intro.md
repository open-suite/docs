---
sidebar_position: 1
title: Overview
slug: /
---
# The Open Suite API

Everything a member can do in Open Suite, a program can do through its API.
Use it to automate work, connect other systems, or give an AI agent a place
to work. The same operations are offered to AI assistants as tools of the
[MCP server](./mcp.md).

## What it covers

| Area | What you can do |
| --- | --- |
| Account and people | Who the token acts as (`get_me`), your own tokens, the organisation's directory |
| Administration | Add, change, suspend and remove people and [agents](/admins/agents), agents' tokens, custom domains, the organisation's name (administrators only) |
| Groups | The organisation's [shared inboxes](/admins/groups) and their members; create, rename and delete them, add and remove members (administrators and group admins) |
| Mail | Folders, list and search, read messages and conversations, send, reply, forward, drafts, attachments, move, flag, delete; in your own mailbox or, with `group`, a group's |
| Calendar | Calendars, events in a time window (repeats unrolled), create and change events with guests and a meeting link, answer invitations, colleagues' free/busy times |
| Contacts | Your address book: list, find, add, change, delete |
| Chat | Conversations, read messages, send messages and files, start direct and group conversations |
| Meetings | Create, list and delete meeting rooms |
| Files | List, upload, download, folders, rename, move, share, public links, trash |
| Documents, spreadsheets, presentations | Create, import and export; read and write text as Markdown, cells and CSV, slides; comments; versions; sharing and trash. See [Working with documents](./documents.md). |
| Search | One query across documents, files, people, mail, events and contacts |

The full list of operations, with every parameter and response, is in the
[reference](./reference.md).

## Basics

- **Base URL**: `https://<your Open Suite address>/api/v1`, for example
  `https://office.demo.opensuite.online/api/v1`.
- **Authentication**: send an API token as `Authorization: Bearer <token>`.
  See [Authentication](./authentication.md).
- **Format**: requests and responses are JSON, except file uploads and
  downloads, which are the file's bytes.
- **Errors**: an error is the HTTP status with a JSON body such as
  `{"error": "That document doesn't exist, or you can't open it."}`. The
  message is written so it can be shown to a person.
- **Times**: timestamps are Unix seconds, except in mail, calendar and chat,
  which use RFC 3339 (`2026-12-01T09:00:00Z`). The reference says which for
  each field.

A token acts as its member and can do exactly what that member can do in the
app: their own data, what is shared with them, and the administration
operations if they are an administrator. A read-only token can only read.

## Your first request

```bash
curl https://office.demo.opensuite.online/api/v1/me \
  -H "Authorization: Bearer $OPENSUITE_TOKEN"
```

```json
{
  "user": {"id": "u8f2k1x9q3", "name": "Maria Lopez", "email": "maria.lopez@demo.opensuite.online", "role": "owner", "agent": false},
  "org": {"id": "o4n7c2v8m1", "name": "Northwind Studio", "plan": "free",
          "limits": {"label": "Free", "maxUsers": 5, "storageGB": 5, "domains": 1, "maxGroups": 5, "mailOutside": false}},
  "readOnly": false
}
```

## Examples

Send a mail:

```bash
curl https://office.demo.opensuite.online/api/v1/mail/send \
  -H "Authorization: Bearer $OPENSUITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": ["Jonas Weber <jonas.weber@demo.opensuite.online>"],
    "subject": "Draft budget",
    "text": "Hi Jonas,\n\nThe draft budget is in the shared folder.\n\nMaria"
  }'
```

The response gives the sent message's `id` and `threadId`. A copy is filed
in Sent.

Every mail operation also works in a group's shared inbox: add `group` with
the group's id or address (`list_groups` lists them). This answers the
newest message in the Enquiries group as the group:

```bash
id=$(curl -s "https://office.demo.opensuite.online/api/v1/mail/messages?group=northwind.enquiries@demo.opensuite.online&limit=1" \
  -H "Authorization: Bearer $OPENSUITE_TOKEN" | jq -r '.items[0].id')
curl "https://office.demo.opensuite.online/api/v1/mail/messages/$id/reply?group=northwind.enquiries@demo.opensuite.online" \
  -H "Authorization: Bearer $OPENSUITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text": "Thank you, we will be in touch this week."}'
```

The reply comes from the group's address, and the group's messages report
who in it has read and answered them (`readBy`, `repliedBy`). The member's
role decides what works: a viewer can read and mark read, but sending,
filing and deleting are refused.

Create an event with a guest and a video meeting link:

```bash
curl https://office.demo.opensuite.online/api/v1/calendar/events \
  -H "Authorization: Bearer $OPENSUITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Budget review",
    "start": "2026-12-01T10:00",
    "duration": "PT45M",
    "timeZone": "Europe/Berlin",
    "guests": ["jonas.weber@demo.opensuite.online"],
    "meeting": true
  }'
```

Guests get an invitation by mail, as when you create the event in the app.

Search everything:

```bash
curl "https://office.demo.opensuite.online/api/v1/search?q=budget&in=documents,mail" \
  -H "Authorization: Bearer $OPENSUITE_TOKEN"
```

### Python

This script lists unread mail in the inbox, page by page, with only the
standard library:

```python
import json
import os
import urllib.parse
import urllib.request

BASE = "https://office.demo.opensuite.online/api/v1"
TOKEN = os.environ["OPENSUITE_TOKEN"]


def call(method, path, params=None, body=None):
    url = BASE + path
    if params:
        url += "?" + urllib.parse.urlencode(params)
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", "Bearer " + TOKEN)
    if data is not None:
        req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req) as res:
        return json.load(res)


cursor = None
while True:
    params = {"unread": "true", "limit": 100}
    if cursor:
        params["cursor"] = cursor
    page = call("GET", "/mail/messages", params)
    for m in page["items"]:
        sender = m["from"][0]["email"] if m.get("from") else ""
        print(m["receivedAt"], sender, m["subject"])
    cursor = page.get("next")
    if not cursor:
        break
```

### JavaScript

```js
const BASE = 'https://office.demo.opensuite.online/api/v1'
const headers = {
  Authorization: `Bearer ${process.env.OPENSUITE_TOKEN}`,
  'Content-Type': 'application/json',
}

const res = await fetch(`${BASE}/chat/rooms`, {
  method: 'POST',
  headers,
  body: JSON.stringify({ people: ['jonas.weber@demo.opensuite.online'] }),
})
if (!res.ok) throw new Error((await res.json()).error)
const room = await res.json()

await fetch(`${BASE}/chat/rooms/${room.id}/messages`, {
  method: 'POST',
  headers,
  body: JSON.stringify({ text: 'The budget review is booked for Tuesday at 10.' }),
})
```

The API allows calls from web pages on other sites (CORS) when they send a
token.

## Pagination

Lists that can grow long (people, mail, contacts, files, documents, versions,
meeting rooms, chat messages) return one page at a time:

```json
{"items": [ ... ], "next": "50"}
```

Pass `limit` (1 to 200, default 50) for the page size. When there are more
items, the response has `next`: pass it as `cursor` to get the next page.
The last page has no `next`. Treat the cursor as opaque.

## Limits

- **Rate**: each token can make 1,200 requests a minute. Above that the API
  answers `429 Too Many Requests` with a `Retry-After` header giving the
  seconds to wait.
- **Mail**: each member, person or agent, can send up to 200 messages an hour
  through the API (sending, replying, forwarding and sending drafts). Above
  that, `429` with `Retry-After`.
- **Plan**: the organisation's plan still applies. On the Free plan mail only
  reaches addresses hosted on the same installation, and uploads count towards
  the organisation's storage; see [Plan and limits](/admins/plan-and-limits).
- **Imports**: files up to 40 MB, 30 imports a minute per member.

## Versioning

The API is at `/api/v1`, and it is stable. Operations, fields and values may
be added to v1, so ignore fields you do not know; nothing is renamed or
removed. A change that would break programs would come as a new version at a
new path.
