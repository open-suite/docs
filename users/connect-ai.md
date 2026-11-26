---
sidebar_position: 14
title: Connect Claude or ChatGPT
---
# Connect Claude or ChatGPT

AI assistants such as Claude and ChatGPT can work in Open Suite for you: find
and summarise mail, plan meetings, draft documents, fill in spreadsheets. They
connect through Open Suite's MCP server, a standard way for assistants to use
other apps. You add one address to the assistant, sign in, and approve it.
No token to copy.

## The address to add

The connector address is your Open Suite address followed by `/mcp`, for
example:

```
https://office.demo.opensuite.online/mcp
```

You can also copy it from **Your account** > **API tokens** >
**Connect Claude or ChatGPT**.

## Add it to the assistant

### Claude

In Claude on the web or the desktop app:

1. Go to **Customize** > **Connectors**.
2. Click **+ Add**, then **Add custom connector**.
3. Enter a name, such as "Open Suite", and the address above, and click
   **Continue**.
4. Keep the sign-in that Claude detects and click **Add**.

On Team and Enterprise plans, an owner adds the connector once in
**Organization settings** > **Connectors**; each person then clicks
**Connect** next to it under **Customize** > **Connectors**. Free plans allow
one custom connector. See Anthropic's
[custom connector guide](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
for the current steps.

In a chat, click **+** at the lower left, choose **Connectors**, and switch
Open Suite on.

### ChatGPT

In ChatGPT on the web:

1. Go to **Plugins**, click the plus button and choose
   **Add custom MCP server**.
2. Enter a name and the address above, and choose OAuth sign-in when asked
   about authentication.
3. Tick **I understand and want to continue**, choose
   **Create as a plugin**, and install it.

In a chat, type @ and choose Open Suite. Custom servers are available on
Business, Enterprise and Edu workspaces (where an admin may need to add or
publish them) and, for reading only, on Pro. See OpenAI's
[guide to custom MCP servers](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt)
for the current steps.

### Claude Code and other MCP clients

In a terminal:

```bash
claude mcp add --transport http opensuite https://office.demo.opensuite.online/mcp
```

Then run `/mcp` in Claude Code and choose Open Suite to sign in.

Any other MCP client that supports remote servers (Streamable HTTP) and OAuth
works the same way: give it the address and sign in when it asks. Clients
that cannot sign in themselves can send an
[API token](./api-tokens.md) instead; see [MCP server](/api/mcp).

## Sign in and approve

When you add the connector, the assistant opens Open Suite in your browser.
Sign in if you are not already, and Open Suite shows
"*Assistant* wants to use your Open Suite account" with what it will be able
to do as you:

- read and change your mail, calendar and contacts;
- read and send chat messages;
- read and change your files and documents.

To let the assistant look but not change anything, untick **Allow changes**.
Click **Allow**. You go back to the assistant, which is now connected. Click
**Cancel** instead to refuse.

## What the assistant can do

The assistant acts as you, with exactly your permissions. It sees what you
can see and nothing else in your organisation. It can, for example:

- search everything, and read and send mail, reply and forward;
- list your events, create events and invite guests, answer invitations, and
  check when colleagues are free;
- manage your contacts, chat with colleagues, and create meeting rooms;
- upload, share and organise files;
- read and write documents, spreadsheets and presentations, and comment on
  documents.

If you are an administrator, it can also manage people and domains as you
can. If you did not allow changes, it can only read.

Changes the assistant makes to a document, spreadsheet or presentation appear
live for anyone who has it open, and merge with what they are typing, as if
another colleague were editing. For documents and spreadsheets, version
history keeps what was there before, so you can restore it.

Assistants usually ask you to confirm before they send mail or invitations.
Check what they are about to send.

## Disconnect

Go to **Your account** > **API tokens**. The assistant is listed with
**connected app**. Click the bin icon at the end of its row and confirm with
**Disconnect**. It can no longer use your account. To use it again, connect
it again from the assistant.

A connection you do not use for 90 days ends on its own.
