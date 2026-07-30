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
release=$(date -u +%Y%m%d%H%M%S)
root=/var/www/docs.opensuite.online
ssh root@91.107.222.144 "mkdir -p $root/releases/$release"
rsync -av --delete build/ root@91.107.222.144:$root/releases/$release/
ssh root@91.107.222.144 \
  "ln -sfn releases/$release $root/current.new && mv -Tf $root/current.new $root/current"
```
