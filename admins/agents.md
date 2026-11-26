---
sidebar_position: 3
title: Agents
---
# Agents

An agent is a member of your organisation for a program rather than a
person: a support assistant that answers the shared mailbox, a script that
files invoices, an AI that keeps a report up to date. It has no password and
cannot sign in to the app. It works only through the [API](/api), with API
tokens that administrators create for it.

Otherwise an agent is a member like anyone else. It has its own address and
mailbox, calendar, files and chat account. Colleagues can mail it, invite it
to meetings, share documents with it and message it in chat. In
**Admin** > **People** it is listed with everyone else, marked **Agent**.

An agent only sees what is its own or shared with it, like a person in the
same role. Use one when a program should act under its own name; for a script
that acts as you, create an [API token](/users/api-tokens) of your own
instead.

## Add an agent

1. Open **Admin** > **People** and click **Add agent**.
2. Enter its **Name**, such as "Support assistant". Open Suite suggests an
   **Address** from it; change it if you like. If your organisation has a
   verified mail domain, choose which domain the address uses.
3. Choose a **Role**: **Member**, or **Administrator: can manage people and
   domains**.
4. Click **Add agent**.

Open Suite shows **Agent added** and offers to create its first token. Click
**Create token** to do it now, or **Later**.

Addresses follow the same rules as for people; see
[People](./people.md#add-a-person).

## Create a token for an agent

1. In **Admin** > **People**, click **...** at the end of the agent's row and
   choose **Manage tokens**.
2. Click **New token**.
3. Enter a **Name** that says where the token is used, such as "Helpdesk
   server".
4. Choose the **Access**: **Full access: can read and change everything**, or
   **Read only: can look but change nothing**.
5. Choose when it **Expires**: **Never**, **In 30 days**, **In 90 days** or
   **In 1 year**.
6. Click **Create token**.

The token is shown once. Click **Copy**, put it where the program keeps its
secrets, and click **Done**. Nobody can see it again, administrators
included; if it is lost, revoke it and create another.

The program sends the token with every request; see
[Authentication](/api/authentication). Give each program or server its own
token, so you can revoke one without stopping the others.

## Manage and revoke an agent's tokens

**Manage tokens** lists the agent's tokens with their access, when each was
created and last used, and when it expires. To revoke one, click the bin icon
at the end of its row and confirm with **Revoke**. Anything using that token
stops working at once.

Only agents' tokens are managed here. People create and revoke their own in
**Your account**; administrators never see or hold them.

## Suspend or remove an agent

Click **...** at the end of the agent's row.

- **Suspend**: all its tokens stop working until you choose **Reactivate**.
  Its mailbox, files and tokens are kept.
- **Remove**: deletes the agent. Open Suite asks first: "Its mailbox and chat
  account are deleted and its tokens stop working. Its documents and meeting
  rooms stay with the organisation and become yours." This cannot be undone.
- **Make member** and **Make administrator** change its role. An agent cannot
  be an owner, and has no password to reset.

## Agents as administrators

An agent with the **Administrator** role can do through the API everything an
administrator can do in Admin: add, suspend and remove people and agents,
create agents' tokens, connect domains and rename the organisation. Give that
role only to a program that needs it, and prefer a read-only token where the
agent only has to look.

## Agents and the plan

Each agent has a mailbox and storage, so agents count towards the plan's
people limit just like people. On the Free plan, five members in total,
people and agents together, can belong to the organisation. See
[Plan and limits](./plan-and-limits.md).

On the Free plan, mail from agents follows the same rule as mail from people:
it only reaches addresses hosted on the same Open Suite installation. Through
the API, each member, agent or person, can send up to 200 messages an hour.
