---
sidebar_position: 2.5
title: Groups
---
# Create and manage groups

A group is a shared inbox with an address of its own, such as `sales@` or
`orders@`. Mail sent to it lands in one inbox
that all its members see in Mail beside their own; they can answer from the
group's address and see who in the group has read and answered each
conversation. How members use a group is described in
[Shared inboxes](/users/shared-inboxes).

Open **Admin** > **Groups**. The list shows each group's name and address,
how many members it has and who can write to it. The line above the list
shows how many groups your plan allows, for example "1 of 5 groups on the
Free plan".

![Admin, Groups tab](/img/admins/groups.png)

## Create a group

1. Click **New group**.
2. Enter its **Name**, such as "Sales". Mail from the group is sent under
   this name. Open Suite suggests an **Address** from it; change it if you
   like, and if your organisation has a verified mail domain, choose which
   domain the address uses.
3. Optionally, add a **Description** saying what the group is for. People see
   it in Contacts.
4. Choose **Who can send mail to it** (see below).
5. Click **Create group**.

![The New group dialog](/img/admins/group-new.png)

The group's settings open, so you can add its members straight away.

Group addresses are 3 to 32 letters, digits, dots or dashes. On your own
domain you can use any name, including `support`, `info` and `billing`. On
the installation's shared mail domain, reserved names such as `admin`,
`postmaster`, `support` and `info` cannot be used. An address cannot belong
to a person and a group at once.

## Add members and choose their roles

Open the group's settings: click the sliders icon at the end of its row (or,
in Mail, next to the group's name). Choose someone from **Add someone…**,
choose their role, and click **Add**. Members can be people or
[agents](./agents.md).

![A group's settings with two members](/img/admins/group-settings.png)

| Role | Can |
| --- | --- |
| Viewer | Read the group's mail |
| User | Read, and send and reply as the group |
| Group admin | Also add and remove viewers and users, change them between the two, rename the group and change who can write to it |

To change a member's role, choose another in the list next to their name;
it applies at once. The bin icon removes them from the group. Removing a
person from the organisation also removes them from its groups.

Administrators of the organisation can manage every group, whether or not
they are members. Only they create and delete groups and appoint or remove
group admins. A group admin who is not an administrator sees the group's
settings from Mail and can manage its viewers and users.

## Who can send mail to a group

| Choice | Who can write to it |
| --- | --- |
| Anyone, including people outside your organisation | Everyone. This is the default. |
| Only people in your organisation | Your organisation's people and groups |
| Only the group's members | Its members, whatever their role |

Mail from someone who may not write is not delivered. A colleague on Open
Suite gets a message back saying who may write to the group; mail from
outside is dropped without a reply, so forged spam does not cause mail to
innocent addresses.

## Rename or delete a group

In the group's settings, change its **Name**, **Description** or **Who can
send mail to it** and click **Save**. The address cannot be changed; create
a new group instead.

**Delete group** (organisation administrators only) asks first, then deletes
the group and all of its mail. Its address stops receiving mail.
