---
sidebar_position: 2
title: People
---
# Add and manage people

Open **Admin** > **People**. The list shows each person's name and address,
their role (or **Suspended**), and when they were last active. The line above
the list shows how many people your plan allows, for example
"2 of 5 people on the Free plan".

## Add a person

1. Click **Add person**.
2. Enter their **Name**. Open Suite suggests an **Address** from it, such as
   `jonas.weber`; change it if you like. If your organisation has a verified
   mail domain, choose which domain the address uses.
3. Choose a **Role**: **Member**, or **Administrator: can manage people and
   domains**.
4. Click **Add person**.

![The Add a person dialog](/img/admins/add-person.png)

Open Suite creates their account, mailbox, calendar and chat account, and
shows the address with a temporary password. This password is shown only
once. Click **Copy details** to copy the address, password and sign-in link,
pass them on securely, and click **Done**.

At their first sign-in, the person is asked to choose their own password.
They then appear in everyone's contacts and chat.

Addresses use 3 to 32 letters, digits, dots or dashes. Some names, such as
`admin`, `postmaster` and `info`, are reserved. When the organisation has as
many people as the plan allows, adding fails with "Your plan includes 5
people. Upgrade to add more."

## Change a role, reset a password, suspend or remove

Click **...** at the end of the person's row.

![The menu for managing a person](/img/admins/person-menu.png)

- **Make member**, **Make administrator**, and for owners
  **Make owner**: change the role at once.
- **Reset password**: creates a new temporary password and signs the person
  out everywhere. Open Suite shows the password once, like when adding a
  person. They choose their own at their next sign-in.
- **Suspend**: the person can no longer sign in, and is signed out
  everywhere. Their account and data stay. The row shows **Suspended**.
  **Reactivate** lets them sign in again.
- **Remove**: deletes the person's account. Open Suite asks first:
  "Their mailbox and chat account are deleted. Their documents and meeting
  rooms stay with the organisation and become yours." This cannot be undone.

You cannot manage your own row here; use [Your account](/users/account) for
your own name and password. Only owners can change or remove another owner.

## Change someone's address

Addresses cannot be changed in Admin. The people who run the installation can
move a person to a new address while keeping their mail, documents and chats;
see [Install](/it/install#change-a-persons-address).
