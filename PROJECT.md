# Open Suite docs — project structure

A Docusaurus site with three audiences, each its own section and sidebar:

| Section  | Route      | Audience            | Covers (examples)                                   |
| -------- | ---------- | ------------------- | --------------------------------------------------- |
| Users    | `/users`   | End users           | write a document, send an invitation, join a call      |
| Admins   | `/admins`  | Organisation admins | add people, reset passwords, custom domains, the plan  |
| IT       | `/it`      | Operators           | install, mail DNS, upgrades, backups                   |

These docs cover Open Suite, the single-binary suite whose source is
[open-suite/opensuite-saas](https://github.com/open-suite/opensuite-saas).
The earlier k3s distribution is documented separately at
`https://docs.opensuite.online/classic/`; link to it with an absolute URL.

Rules of thumb:

- User docs are task-oriented and screenshot-driven (real demo, not mockups).
- Admin docs target the suite's own Admin screen (People, Domains,
  Organisation, and All organisations for platform operators).
- IT docs are command-driven (code blocks); screenshots are usually unnecessary.
- Every UI label must match the code in `web/src` of the suite. Check it there;
  do not document what the suite's README lists as not included yet.

## Screenshot and annotation workflow

Use real screens from the live demo, never reconstructed or AI-generated UI.
Capture at a 1440×900 viewport after the page has finished loading. Use a 2×
device scale when the browser runner supports it, and save the untouched PNG in
`static/img/<section>/`.
Before committing, check that the image contains only demo data and no tokens,
passwords, personal accounts, browser chrome, or loading indicators.

New annotations are HTML/CSS overlays, not pixels baked into a second image.
This keeps the screenshot reusable, the callout text accessible, and marker
positions easy to correct when a screen changes. The shared implementation is
in `src/css/custom.css` (`annotated-shot`, `shot-marker`, and
`shot-callouts`). Copy this MDX pattern:

```mdx
<p className="shot-scroll-hint">Swipe or scroll the screenshot to see every detail.</p>
<div className="annotated-shot-scroll">
  <div className="annotated-shot">
    <img src="/img/users/example.png" alt="Describe the screen, not the annotations" />
    <span aria-hidden="true" className="shot-marker" style={{left: '24%', top: '18%'}}>1</span>
    <span aria-hidden="true" className="shot-marker" style={{left: '67%', top: '42%'}}>2</span>
  </div>
</div>

<div className="shot-callouts">
  <div><span>1</span><p><strong>Action name</strong> explains what happens here.</p></div>
  <div><span>2</span><p><strong>Second action</strong> explains the next useful control.</p></div>
</div>
```

Marker coordinates are percentages of the screenshot: `left = x / width ×
100` and `top = y / height × 100`. Put markers beside a control rather than on
top of its label. Keep the sequence in task order, use no more markers than the
reader needs, and repeat every number in the callout cards below. Do not add
arrows or text boxes over the interface. For several
controls packed into one menu or navigation bar, add `shot-marker--compact`
instead of allowing full-size markers to overlap.

After changing screenshots or markers, run `npm run build` and inspect the
page at desktop and mobile widths. Mobile deliberately keeps the screenshot at
a readable minimum width and provides horizontal scrolling; the callout cards
must remain readable without relying on the image alone.

Build/preview: `npm start`. Verify before publishing: `npm run build`
(fails on broken links). See `README.md` for how the site is deployed.

The screenshots come from the live demo at
`https://office.demo.opensuite.online`, using the sample organisation
"Northwind Studio" (owner `maria.lopez`, colleague `jonas.weber`). Sign-up on
the demo is open, so you can also create your own organisation there. Do not
use or capture the team's test accounts `ada` and `grace.hopper`, and never
send mail from the demo to outside addresses.

Drive the browser in background tabs with their own storage, as the suite's
`tests/browser.cjs` does (`Target.createBrowserContext` and
`Target.createTarget` with `background: true`). For call screens, replace
`getUserMedia` with a drawn canvas so no real camera or microphone opens.
