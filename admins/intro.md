---
sidebar_position: 1
title: Admin overview
slug: /
---
# Open Suite for administrators

Each organisation in Open Suite manages itself from the **Admin** screen in
the app. There is no separate admin console. **Admin** appears in the
navigation bar for owners and administrators.

![The Admin screen with the People tab](/img/admins/people.png)

Admin has three tabs:

- **People**: add colleagues, change their role, reset passwords, suspend and
  remove accounts. See [People](./people.md).
- **Domains**: use your own domain for the suite's web address and for email.
  See [Custom domains](./custom-domains.md).
- **Organisation**: rename the organisation and see the plan, its limits and
  storage use. See [Plan and limits](./plan-and-limits.md).

People who run the whole installation (platform operators) also see a fourth
tab, **All organisations**; see
[Plan and limits](./plan-and-limits.md#change-the-plan).

## Roles

| Role | Can do |
| --- | --- |
| Owner | Everything an administrator can, plus make other people owners and change or remove other owners. The person who created the organisation is its first owner. |
| Administrator | Add, suspend, reactivate and remove people; reset their passwords; make people members or administrators; manage domains; rename the organisation. Administrators cannot change an owner. |
| Member | Use the suite. No Admin screen. |

An organisation always keeps at least one active owner. Nobody can suspend or
remove themselves.

Installing and running the server is covered in [For IT](/it).
