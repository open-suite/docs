---
sidebar_position: 2
title: Authentication
---
# Authentication

Every request carries a Bearer token:

```
Authorization: Bearer os_...
```

There are two ways to get one:

- **API tokens**, for your own scripts and for [agents](/admins/agents).
  Create one in the app and paste it into the program.
- **OAuth 2.1**, for apps that act for whoever uses them, such as AI
  assistants. The app sends the person to Open Suite to approve it and
  receives tokens itself.

Without a valid token the API answers `401` with a `WWW-Authenticate` header
that points OAuth clients to the [discovery documents](#discovery).

## API tokens

People create their own tokens in **Your account** > **API tokens**; see
[Create an API token](/users/api-tokens). Administrators create tokens for
agents in **Admin** > **People**; see [Agents](/admins/agents). Each token is
**Full access** or **Read only**, and expires never, or after 30 days, 90
days or a year.

A token starts with `os_`. Its secret is shown once, when it is created; Open
Suite keeps only a hash of it. A member can have up to 100 tokens.

Tokens can also be managed through the API itself: `list_tokens`,
`create_token` and `revoke_token` for your own, and `admin_list_agent_tokens`,
`admin_create_agent_token` and `admin_revoke_agent_token` for an agent's.

```bash
curl https://office.demo.opensuite.online/api/v1/tokens \
  -H "Authorization: Bearer $OPENSUITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Nightly report", "readOnly": true, "expiresInDays": 90}'
```

The response contains the new token in `secret`, once.

## What a token may do

- A token acts as the member it belongs to, with that member's permissions,
  exactly as if they were using the app. It sees their own mail, calendar,
  contacts and chat, and the files and documents they own or that are shared
  with them.
- It never reaches beyond the member's organisation.
- A **read-only** token can call every reading operation. Anything that
  changes something is refused with `403` and "This token can only read.
  Create one with full access to make changes."
- Administration operations (`admin_...`) need a member who is an owner or
  administrator; anyone else gets `403`.
- A token stops working when it expires, when it is revoked, and while its
  member is suspended. A removed member's tokens are deleted with them.

`GET /api/v1/me` tells you who a token acts as, and `readOnly` whether it can
change anything.

## OAuth 2.1 for apps

Apps that act for a person can use OAuth instead of asking them to paste a
token. This is how Claude, ChatGPT and other assistants connect to the
[MCP server](./mcp.md) with nothing but its address. Open Suite follows the
MCP authorization specification:

- Only the **authorization code** grant with **PKCE** (`S256`) is offered.
  The authorization response includes the issuer (`iss`).
- Scopes are `read` and `write`. Asking for no scope asks for both. On the
  consent screen the person can untick **Allow changes**, and the app then
  gets `read` only, whatever it asked for.
- **Access tokens** last an hour (`expires_in: 3600`).
- **Refresh tokens** start with `osr_` and rotate: each one works once and the
  answer carries the next. A connection unused for 90 days lapses. A refresh
  may ask for less (`scope=read`), never for more.
- The `resource` parameter (RFC 8707) may name the MCP server
  (`https://<host>/mcp`) or the API (`https://<host>/api/v1`).

What the person approves becomes a connected app. It appears in their
**Your account** > **API tokens** list, where they can disconnect it.

### Discovery

| Document | Address |
| --- | --- |
| Protected resource metadata (RFC 9728) for the API | `/.well-known/oauth-protected-resource` |
| Protected resource metadata for the MCP server | `/.well-known/oauth-protected-resource/mcp` |
| Authorization server metadata (RFC 8414) | `/.well-known/oauth-authorization-server` |

The authorization server metadata lists the endpoints:

| Endpoint | Address |
| --- | --- |
| Authorization | `/oauth/authorize` |
| Token | `/oauth/token` |
| Dynamic client registration (RFC 7591) | `/oauth/register` |
| Revocation (RFC 7009) | `/oauth/revoke` |

### Identifying your app

An app identifies itself in one of two ways:

- **Client ID Metadata Document**: use an `https` URL as the `client_id`.
  Open Suite fetches the JSON at that address, which must contain the same
  `client_id`, a `client_name` and `redirect_uris`. Only public clients
  (`token_endpoint_auth_method` `none`) can be identified this way.
- **Dynamic registration**: `POST /oauth/register` with `redirect_uris` and a
  `client_name`. Open Suite returns a `client_id` starting with `osc_`, and a
  `client_secret` unless you register with `token_endpoint_auth_method`
  `none`.

Redirect addresses must be `https`, `http` on the loopback interface (any
port), or an app's own scheme such as `myapp://callback`.

### The flow

1. Send the person's browser to `/oauth/authorize` with `response_type=code`,
   `client_id`, `redirect_uri`, `code_challenge`,
   `code_challenge_method=S256`, `state`, and optionally `scope` and
   `resource`.
2. They sign in if needed and see the consent screen: "*Your app* wants to
   use your Open Suite account". They click **Allow** or **Cancel**.
3. Open Suite redirects to your `redirect_uri` with `code`, `state` and
   `iss`, or with `error=access_denied`. The code is valid for two minutes
   and works once.
4. Exchange it at the token endpoint:

```bash
curl https://office.demo.opensuite.online/oauth/token \
  -d grant_type=authorization_code \
  -d code="$CODE" \
  -d code_verifier="$VERIFIER" \
  -d redirect_uri=http://127.0.0.1:8976/callback \
  -d client_id="$CLIENT_ID"
```

```json
{"access_token": "os_...", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "osr_...", "scope": "read write"}
```

5. Before the hour is up, refresh:

```bash
curl https://office.demo.opensuite.online/oauth/token \
  -d grant_type=refresh_token \
  -d refresh_token="$REFRESH_TOKEN" \
  -d client_id="$CLIENT_ID"
```

Keep the new refresh token; the old one no longer works.

Confidential clients authenticate at the token and revocation endpoints with
`client_secret_post` or `client_secret_basic`; public clients send only
`client_id`.

### Disconnect from the app

To end a connection, post either of its tokens to `/oauth/revoke`:

```bash
curl https://office.demo.opensuite.online/oauth/revoke \
  -d token="$REFRESH_TOKEN" \
  -d client_id="$CLIENT_ID"
```

The person can also disconnect the app themselves in **Your account**.
