---
sidebar_position: 5
title: Plan and limits
---
# Plan and limits

Open **Admin** > **Organisation**. The **Organisation** card lets you change
the organisation's **Name**; click **Save**. The name appears on Home, in
sharing dialogs and on meeting pages.

The **Plan** card shows your plan and how much of it you use.

![The Organisation tab with the plan and its limits](/img/admins/organisation.png)

## The plans

| | Free | Team |
| --- | --- | --- |
| People | 5 | 250 |
| Storage | 5 GB | 250 GB |
| Groups (shared inboxes) | 5 | 250 |
| Custom domains | 1 | 10 |
| Mail to other providers | No, Open Suite addresses only | Yes |

New organisations start on the Free plan.

### Mail on the Free plan

On the Free plan, people can send mail only to addresses on domains that the
same Open Suite installation hosts: the installation's own mail domain and the
verified domains of any organisation on it. Mail to anyone else, such as a
Gmail or company address, is refused with "Your organisation's plan sends mail
only to addresses on Open Suite." The same applies to mail sent as a
[group](./groups.md). Receiving mail from anywhere works on both plans.

On the Team plan, people can mail anyone.

### Storage

Storage is shared by the whole organisation. It counts uploaded files, and documents,
spreadsheets and presentations with the pictures in them; the Plan card shows
both parts. Mail does not count towards it.
Items in the trash count until they are deleted for ever, after 30 days or
when someone empties the trash. When storage is full, uploads and new content
fail with "Your organisation's storage is full."

### People, groups and domains

When the organisation has as many people, groups or custom domains as the
plan allows, adding another fails with a message naming the limit. Removing a
person or deleting a group frees its place. Groups do not count as people. [Agents](./agents.md) count as people, because
each has its own mailbox and storage.

The organisation's own address on Open Suite (see
[Custom domains](./custom-domains.md)) does not count as a custom domain.

## Change the plan

There is no upgrade button in the app. The platform operators of your
installation (set by the people who run it, see
[Install](/it/install#settings)) see an extra Admin tab,
**All organisations**, listing every organisation with its number of people
and documents and its creation date. They switch an organisation between
**Free** and **Team** in the **Plan** column. Ask them if you need more.
