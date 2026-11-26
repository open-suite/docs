---
sidebar_position: 4
title: Working with documents
---
# Working with documents

The API reads and writes what is inside documents, spreadsheets and
presentations in forms a program or a language model can work with: Markdown
for text, cells and CSV for spreadsheets, and simple operations for slides.

Changes go through the same path as a person's typing. They are saved,
indexed for search, recorded in version history and sent at once to everyone
who has the document open, where they appear live and merge with what those
people are typing. Nobody's work is overwritten, and nobody needs to reload.

Each document has a `kind`: `doc` (text document), `sheet` (spreadsheet) or
`slides` (presentation). Using an operation on the wrong kind returns `409`.
Reading needs view access, writing needs edit access, and commenting needs
comment access; see [Files and sharing](/users/files).

## Find and create documents

`GET /api/v1/documents` (`list_documents`) lists what you can open, most
recently changed first, filtered by `kind`, `folder`, `q` (title) or
`trashed`. Use [`search`](./intro.md#examples) to search inside them. Each
document has a `url` where it opens in the app.

`POST /api/v1/documents` (`create_document`) creates one, optionally with
content: text for a document, CSV for a spreadsheet, or slide operations for a
presentation.

```bash
curl https://office.demo.opensuite.online/api/v1/documents \
  -H "Authorization: Bearer $OPENSUITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "kind": "doc",
    "title": "Meeting notes 1 December",
    "content": "# Budget review\n\n## Decisions\n\n- Keep the travel budget as it is\n- Review again in March\n\n## Actions\n\n1. Jonas: update the forecast\n2. Maria: send the summary"
  }'
```

The response is the new document, with its `id` and `url`.

`PATCH /api/v1/documents/{id}` (`update_document`) renames, moves, shares or
trashes a document. `DELETE` deletes it for good (owner only).

## Text documents

### Read

```bash
curl "https://office.demo.opensuite.online/api/v1/documents/$DOC/text?format=markdown" \
  -H "Authorization: Bearer $OPENSUITE_TOKEN"
```

```json
{"format": "markdown", "content": "# Budget review\n\n## Decisions\n..."}
```

`format` is `markdown` (default), `html` or `text`. The text reads as it
would with every suggestion accepted, without comment markings. Pictures are
linked as `/api/v1/blobs/<id>`, which you can fetch with the same token
(`get_image`).

### Write

`PUT /api/v1/documents/{id}/text` (`write_document`) takes `content`, a
`format` (`markdown` by default, `html` or `text`) and a `mode`:

| Mode | Effect |
| --- | --- |
| `replace` (default) | The document becomes the new text. Paragraphs that do not change are kept as they are, with their comments. |
| `append` | Adds the text at the end. |
| `prepend` | Adds the text at the start. |

```bash
curl -X PUT https://office.demo.opensuite.online/api/v1/documents/$DOC/text \
  -H "Authorization: Bearer $OPENSUITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode": "append", "content": "## Next meeting\n\nTuesday 9 March at 10:00."}'
```

To edit part of a document, read it as Markdown, change it, and write it back
with `replace`. Only the paragraphs you changed are touched.

### Comments

| Operation | Does |
| --- | --- |
| `GET .../comments` (`list_comments`) | Threads with the quoted text, author, replies and whether resolved |
| `POST .../comments` (`add_comment`) | Starts a thread on a passage, found by its exact text |
| `POST .../comments/{thread}/replies` (`reply_to_comment`) | Replies; a reply reopens a resolved thread |
| `PATCH .../comments/{thread}` (`resolve_comment`) | `{"resolved": true}` or `false` |

```bash
curl https://office.demo.opensuite.online/api/v1/documents/$DOC/comments \
  -H "Authorization: Bearer $OPENSUITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"quote": "Review again in March", "text": "Can we make this February?"}'
```

`quote` must match text in the document exactly. If it occurs more than once,
`occurrence` says which (from 1).

## Spreadsheets

### Read cells

```bash
curl "https://office.demo.opensuite.online/api/v1/documents/$SHEET/cells?sheet=Budget&range=A1:D20" \
  -H "Authorization: Bearer $OPENSUITE_TOKEN"
```

The response lists the `sheets` (name, index and size) and, for the range,
`values` (as shown), `formulas` (as typed) and the same range as `csv`.
`sheet` is a name or a 0-based index (default the first); without `range`
you get everything used.

### Write cells

`PUT /api/v1/documents/{id}/cells` (`write_cells`) takes exactly one of:

- `values`: rows of values written from `start` (default `A1`). Text starting
  with `=` is a formula; `null` leaves a cell as it is.
- `csv`: CSV pasted at `start`.
- `clear`: a range to empty, such as `A2:D20`.

```bash
curl -X PUT https://office.demo.opensuite.online/api/v1/documents/$SHEET/cells \
  -H "Authorization: Bearer $OPENSUITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sheet": "Budget",
    "start": "A1",
    "values": [
      ["Item", "Q1", "Q2", "Total"],
      ["Travel", 1200, 900, "=B2+C2"],
      ["Software", 800, 800, "=B3+C3"]
    ]
  }'
```

The spreadsheet recalculates as if the values had been typed.
`POST .../sheets` (`add_sheet`) adds a sheet by `name`. To create a
spreadsheet from data, use `create_document` with `kind` `sheet` and the data
as CSV in `content`.

## Presentations

`GET /api/v1/documents/{id}/slides` (`read_slides`) returns the theme and
every slide in order with its id, position, layout, speaker notes and
elements (text boxes with their text, pictures, lines), each with an id.

`POST /api/v1/documents/{id}/slides` (`edit_slides`) applies a list of `ops`
in order, as one change:

| `op` | Fields |
| --- | --- |
| `addSlide` | `layout` (such as `title` or `title-body`), `title`, `body` (lines starting with `- ` become bullets), `notes`, `position` (1-based; default the end) |
| `setText` | `slide`, `element` (a text box's id), `text` |
| `setNotes` | `slide`, `notes` |
| `moveSlide` | `slide`, `position` |
| `deleteSlide` | `slide` |
| `setTheme` | `theme` |

```bash
curl https://office.demo.opensuite.online/api/v1/documents/$DECK/slides \
  -H "Authorization: Bearer $OPENSUITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ops": [
    {"op": "addSlide", "layout": "title-body", "title": "Decisions",
     "body": "- Keep the travel budget\n- Review again in March",
     "notes": "Mention the February option."}
  ]}'
```

`create_document` with `kind` `slides` takes the same operations in `slides`.

## Versions

Versions are taken automatically as people work, and by hand with a name.
They need edit access.

| Operation | Does |
| --- | --- |
| `GET .../versions` (`list_versions`) | Versions, newest first, with who edited |
| `POST .../versions` (`create_version`) | Saves the current state, optionally with a `name` |
| `PATCH .../versions/{version}` (`rename_version`) | Names or renames a version |
| `GET .../versions/{version}/content` (`read_version`) | A document's text as Markdown, or a spreadsheet's cells, as they were |
| `POST .../versions/{version}/restore` (`restore_version`) | Makes the document as it was. The present state is saved as a version first, so a restore can be undone. |

Presentations have no version history yet.

## Import and export

`POST /api/v1/documents/import?name=<file name>` (`import_document`) takes a
file as the request body (up to 40 MB) and creates a new document; the
extension decides the kind.

| Kind | Import | Export (`format`) |
| --- | --- | --- |
| Text document | `.docx`, `.odt`, `.md`, `.html`, `.txt` | `docx`, `odt`, `md`, `html`, `txt` |
| Spreadsheet | `.xlsx`, `.csv` | `xlsx`, `csv` (one sheet, chosen with `sheet`) |
| Presentation | `.pptx` | `pptx` |

```bash
curl "https://office.demo.opensuite.online/api/v1/documents/import?name=Report.docx" \
  -H "Authorization: Bearer $OPENSUITE_TOKEN" \
  -H "Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document" \
  --data-binary @Report.docx

curl -o Budget.xlsx "https://office.demo.opensuite.online/api/v1/documents/$SHEET/export?format=xlsx" \
  -H "Authorization: Bearer $OPENSUITE_TOKEN"
```
