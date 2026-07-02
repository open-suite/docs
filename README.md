# Open Suite docs

Docusaurus site served at https://docs.opensuite.online.

## Develop

```bash
npm install
npm start          # live-reload dev server
npm run build      # static build into build/ — fails on broken links
```

Content lives in `users/`, `admins/`, and `it/` (one sidebar each; see
`PROJECT.md` for the structure and writing conventions).

## Deploy

The site is plain static files behind nginx on the marketing server:

```bash
npm run build
rsync -av --delete build/ root@opensuite.online:/var/www/docs.opensuite.online/
```
