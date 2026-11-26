---
sidebar_position: 13
title: API tokens
---
# Create an API token

An API token lets a script or another app use Open Suite as you: read your
mail, add calendar events, write documents and so on, with exactly your
permissions. Developers send it with each request to the
[Open Suite API](/api).

To connect Claude, ChatGPT or another AI assistant you do not need a token;
see [Connect Claude or ChatGPT](./connect-ai.md).

## Create a token

1. Click your initials at the bottom of the navigation bar and choose
   **Your account**.
2. Under **API tokens**, click **New token**.
3. Enter a **Name** that says what will use it, such as "Backup script".
4. Choose the **Access**:
   - **Full access: can read and change everything**
   - **Read only: can look but change nothing**
5. Choose when it **Expires**: **Never**, **In 30 days**, **In 90 days** (the
   default) or **In 1 year**.
6. Click **Create token**.

Open Suite shows the token, which starts with `os_`. Click **Copy** and keep it
somewhere safe, such as a password manager. **You won't see it again**: when
you click **Done**, only the first few characters stay visible in the list. If
you lose a token, revoke it and create a new one.

Treat a token like your password. Anyone who has it can do what you can do in
Open Suite (or, with a read-only token, see what you can see) until it expires
or you revoke it.

## The token list

**API tokens** lists your tokens and the apps you have connected. Each row
shows:

- the name, and **connected app** for an app you allowed through
  [Connect Claude or ChatGPT](./connect-ai.md);
- **Full access** or **Read only**, and **Expired** once a token has run out;
- when it was created (or connected), when it was last used, when a token
  expires, and the first characters of the token.

## Revoke a token or disconnect an app

Click the bin icon at the end of the row.

- For a token, confirm with **Revoke**. Anything using the token stops working
  at once. This cannot be undone.
- For a connected app, confirm with **Disconnect**. The app can no longer use
  your account. You can connect it again at any time.

Tokens also stop working when an administrator suspends your account, and
start again when you are reactivated.
