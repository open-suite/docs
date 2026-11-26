# Open Suite Classic docs

The `classic` branch holds the docs for Open Suite Classic, the k3s
distribution (`open-suite/open-suite`). It is served at
https://docs.opensuite.online/classic/, beside the current product's docs on
`main`, and only changes when the classic distribution does.

## Develop

```bash
npm install
npm start          # live-reload dev server
npm run build      # static build into build/ — fails on broken links
```

Content lives in `users/`, `admins/`, and `it/` (one sidebar each; see
`PROJECT.md` for the structure and writing conventions). Raw `<img>` tags
need the `/classic/` prefix; Markdown images and links get it automatically.

## Deploy

nginx on the marketing server serves `/classic/` from
`/var/www/docs.opensuite.online/classic-root/classic`, a symlink to the
current release:

```bash
npm run build
release=$(date -u +%Y%m%d%H%M%S)
root=/var/www/docs.opensuite.online
ssh root@91.107.222.144 "mkdir -p $root/classic-releases/$release"
rsync -av --delete build/ root@91.107.222.144:$root/classic-releases/$release/
ssh root@91.107.222.144 \
  "ln -sfn ../classic-releases/$release $root/classic-root/classic.new && mv -Tf $root/classic-root/classic.new $root/classic-root/classic"
```
