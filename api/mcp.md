---
sidebar_position: 3
title: MCP server
---
# MCP server

Open Suite has a built-in [Model Context Protocol](https://modelcontextprotocol.io)
server, so AI assistants and agent frameworks can use the whole suite as
tools. People connect Claude, ChatGPT and similar apps by its address; see
[Connect Claude or ChatGPT](/users/connect-ai).

## Address and transport

- **URL**: `https://<your Open Suite address>/mcp`, for example
  `https://office.demo.opensuite.online/mcp`.
- **Transport**: Streamable HTTP. Send one JSON-RPC request per `POST`; the
  answer is a JSON response. Other methods get `405`.
- **Protocol versions**: `2026-07-28`, and for clients that still open with an
  `initialize` handshake, `2025-11-25`, `2025-06-18` and `2025-03-26`.
- **Stateless**: there are no sessions and the server never pushes messages.
  Each request stands on its own.
- **Credentials**: a Bearer token on every request, either an
  [API token](./authentication.md#api-tokens) or an access token from
  [OAuth](./authentication.md#oauth-21-for-apps). A request without one gets
  `401` with a `WWW-Authenticate` header pointing to
  `/.well-known/oauth-protected-resource/mcp`, which is how clients discover
  where to sign in.

## Connect a client

Clients that support OAuth need only the URL. For Claude Code:

```bash
claude mcp add --transport http opensuite https://office.demo.opensuite.online/mcp
```

For a client or agent that should use a fixed token, such as one belonging to
an [agent](/admins/agents), send it as a header. In Claude Code:

```bash
claude mcp add --transport http opensuite https://office.demo.opensuite.online/mcp \
  --header "Authorization: Bearer $OPENSUITE_TOKEN"
```

Most MCP client libraries and configuration files have a similar `headers`
setting.

## Tools

Every [API operation](./reference.md) is a tool, with the same name as its
`operationId`: `get_me`, `search`, `list_messages`, `send_mail`,
`list_events`, `create_event`, `free_busy`, `read_document`,
`write_document`, `read_cells`, `write_cells`, `edit_slides`,
`upload_file` and so on. A tool takes the operation's path, query and body
parameters as one set of arguments, runs through the same permission checks
and handler as the HTTP call, and returns the same JSON, as text and as
structured content.

What a client sees depends on its credentials:

- With a **read-only** token or connection, only the tools that read are
  listed, and calls to others are refused.
- Members who are not administrators do not see the administration tools
  (`admin_...`).

Tools carry hints for clients: `readOnlyHint` for tools that change nothing,
`destructiveHint` for deletions, `write_document` and `restore_version`, and
`openWorldHint` for tools that send mail or invitations to other people.

Operations whose HTTP body is a file (`upload_file`, `import_document`,
`upload_mail_attachment`, `send_chat_file`) take the content as `text` or
`contentBase64`, with an optional `contentType`. `send_chat_file` can instead
take the `fileId` of a file in Files. Tools that download a file return text
as text and anything else as an embedded resource, up to 8 MB; for larger
files use the HTTP API.

Errors come back as tool results with `isError: true` and the same message
the API would give, so the assistant can read it and try again.

## Resources

| Resource | Contents |
| --- | --- |
| `opensuite://documents/{id}` | A text document as Markdown, a spreadsheet's first sheet as CSV, or a presentation as JSON |
| `opensuite://files/{id}` | A file from Files |
| `opensuite://mail/{id}` | A mail message as JSON |

`resources/list` returns the caller's 100 most recently changed documents.

## Instructions for the model

The server tells clients what it is and how to use it: start with `get_me`,
use `search` to find things, read and write text documents as Markdown,
spreadsheets as cells and presentations as slides, and ask before sending
mail or invitations on someone's behalf. Changes merge with people editing at
the same time; see [Working with documents](./documents.md).
