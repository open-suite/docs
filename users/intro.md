---
sidebar_position: 1
title: Get started
slug: /
---
# Get started with Open Suite

Open Suite is an office suite in your browser: mail, calendar, contacts, chat,
video meetings, files, documents, spreadsheets and presentations. Everything is
in one app with one sign-in, and one search box finds anything in it.

Your sign-in address is also your email address. If your organisation uses
its own domain it looks like `maria.lopez@northwind.example`; otherwise it ends
in the installation's mail domain, such as `@demo.opensuite.online`.

:::note Looking for the earlier version?
These pages describe the current Open Suite. The earlier version, built from
Nextcloud, Keycloak and La Suite apps, is documented at
[docs.opensuite.online/classic](https://docs.opensuite.online/classic/).
:::

## Sign in

1. Open your organisation's Open Suite address in a browser.
2. Enter your **Address** and **Password**. You can leave out the part after
   `@` if your address is on the installation's main mail domain.
3. Click **Sign in**.

![The Open Suite sign-in page](/img/users/sign-in.png)

Open Suite keeps you signed in on that browser for 30 days.

## First sign-in with a temporary password

When an administrator adds you, they give you your address and a temporary
password. The first time you sign in with it, Open Suite asks you to
**Choose your password**. Enter a new password of at least 10 characters and
click **Continue**.

![Choosing a password at first sign-in](/img/users/choose-password.png)

## Create a new organisation

If the installation allows sign-up, the sign-in page shows
**New here? Create an organisation**. Use it to start a new organisation with
yourself as its owner:

1. Click **Create an organisation**.
2. Enter the **Organisation** name. Open Suite suggests **Your organisation's
   address** from it, such as `acme` for `acme.opensuite.online`, and tells
   you whether it is free; change it if you like. Everyone you add gets an
   email address there.
3. Enter **Your name** and **Your address** (the part before `@`), such as
   `jane` for `jane@acme.opensuite.online`. This is your sign-in and your
   email address.
4. Choose a **Password** of at least 10 characters.
5. If the form asks for an **Invitation code**, enter the code the people who
   run the installation gave you.
6. Click **Create organisation**.

![The Create your organisation form](/img/users/sign-up.png)

You go straight to Home, in a new organisation with just you in it. To look
around a suite that is already full of work, sign in to the public demo
instead. As the owner, you can add colleagues from
[Admin](/admins). If the page says **Sign-up is closed**, ask the people who
run the installation for an account.

Some installations do not give each organisation its own address. Their form
has no organisation address, and your address is on the installation's own
domain.

## What is where

| To do this | Open |
| --- | --- |
| Read and send email | [Mail](./mail.md) |
| Plan meetings and events | [Calendar](./calendar.md) |
| Keep addresses and phone numbers | [Contacts](./contacts.md) |
| Message colleagues | [Chat](./chat.md) |
| Hold a video call | [Meet](./meet.md) |
| Store, share and preview files | [Files](./files.md) |
| Write a document | [Documents](./documents.md) |
| Work with numbers and charts | [Spreadsheets](./spreadsheets.md) |
| Present slides | [Presentations](./presentations.md) |
| Find anything | [Search](./home-and-search.md#search-everything) |
| Change your name or password | [Your account](./account.md) |
| Let a script use your account | [API tokens](./api-tokens.md) |
| Work with an AI assistant | [Connect Claude or ChatGPT](./connect-ai.md) |

## Sign out

Click your initials at the bottom of the navigation bar and choose
**Sign out**.
