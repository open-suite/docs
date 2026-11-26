---
sidebar_position: 5
title: Reference
---
# API reference

Every installation describes its own API, generated from the same table of
operations that serves the requests and the [MCP server](./mcp.md)'s tools,
so the description always matches the running version:

| | Demo installation | Your installation |
| --- | --- | --- |
| Reference, for reading | [office.demo.opensuite.online/api/v1/reference](https://office.demo.opensuite.online/api/v1/reference) | `https://<your Open Suite address>/api/v1/reference` |
| OpenAPI 3.1 document, for tools | [office.demo.opensuite.online/api/v1/openapi.json](https://office.demo.opensuite.online/api/v1/openapi.json) | `https://<your Open Suite address>/api/v1/openapi.json` |

Both are public; you need no token to read them. Load the OpenAPI document
into an API client such as Postman or Bruno, or into a code generator, to get
a ready-made client.

The reference groups operations by area: Account, People, Mail, Calendar,
Contacts, Chat, Meetings, Files, Documents, Document content, Spreadsheet
content, Presentation content, Search and Administration. Each operation's
`operationId` (such as `send_mail`) is also its MCP tool name.
