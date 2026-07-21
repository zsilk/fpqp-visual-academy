# Authoring guide — FPQP® Visual Academy pages

This is the contract every content page follows. The shared engine
(`js/app.js`) and design system (`css/style.css`) do the heavy lifting;
pages declare **content + data**, never new global JS/CSS.

## Ground rules

1. **Source of truth:** `fpqp-book-content/` (42 markdown chapters). All facts,
   numbers, definitions, worked examples, pitfalls, and self-checks come from
   there. Do not invent figures; where the notes flag numbers as year-sensitive,
   keep that caveat.
2. **Do not edit** `js/app.js`, `js/gate.js`, or `css/style.css`. Page-specific
   data goes in an inline `<script>` before the `js/app.js` include.
3. Every page head includes, in order:
   ```html
   <link rel="stylesheet" href="css/style.css">
   <script src="js/gate.js"></script>
   <style>body{--accent:var(--mN);--accent-soft:var(--mNs)}</style>
   ```
   and ends the body with the inline data script then `<script src="js/app.js"></script>`.
4. **Every `<h2>` content section must contain at least one interactive
   element** (any engine below, or the quiz). `<h2>`s automatically get anchor
   links + "Flag to review" buttons — keep them as *direct children of `<main>`*.
5. Keep the site's voice: visual-first, warm, encouraging, emoji headings,
   memory hooks, exam-trap callouts. Match existing markup patterns
   (`.card`, `.grid c2/c3/c4`, `.vs`, `.callout memory|exam|cheer`, `.pill-row`,
   `.step-flow`, `table`, `figure.viz` inline SVG, `.plain-note` for
   plain-language mode).

## Module page structure

```
hero (kicker "Module N of 10", h1, lead, badges)
main.wrap
  .tag-row (topic chips → concepts.html)
  .chapter-nav  — one pill link per chapter, e.g. <a href="#c1">1.1 Planning & goals</a>
  For each chapter N.x:
    <p class="chapter-kicker" id="cX">Chapter N.x</p>
    one or more <h2> sections (title starts with an emoji)
    content blocks + ≥1 interactive per h2 section
    worked example (card or table) where the book has one
    <details class="selfcheck"> items from the book's Self-Check
    .callout exam for Common Pitfalls
  .callout cheer (wrap-up)
  <h2>✍️ Module N self-quiz</h2> + <div id="quiz" class="quiz"></div>
  next-module link
footer
inline data script + js/app.js
```

## Interactive engines (declare data, engine renders)

Existing (keep using them):
- `window.QUIZ = {id:"mN", questions:[{q, opts:[…], a:idx, why, trap?}]}` + `<div id="quiz" class="quiz">`
  — quiz ids MUST stay `m1`…`m10` (hub progress depends on them). 12–16 questions
  covering every chapter.
- `<div data-wheel="…">` (`WHEELS` is engine-owned; only `planning` exists)
- `<div data-tree="roth">` decision tree (engine-owned)
- `<div data-probate>`, `<div data-regmap>`, `<div data-tvm>`, `<div data-lifecompare>`,
  `<div data-taxstack>`, `<div data-numline="rmd">` — engine-owned singletons
- `.barchart` bar charts: `<div class="barchart" data-bars='[{"label":"…","value":7000,"display":"$7,000","color":"--m7"}]'></div>`

New generic engines (page supplies data via globals):
- **Sorter** — sort items into buckets:
  ```html
  <div data-sorter="riskTypes"></div>
  <script>window.SORTERS = {riskTypes:{
    buckets:[{id:"sys",label:"Systematic risk",color:"--m5"},{id:"unsys",label:"Unsystematic risk",color:"--m6"}],
    items:[{text:"Market-wide recession", bucket:"sys", why:"Hits everything — diversification can't remove it."}, …]
  }};</script>
  ```
- **Matcher** — pair terms & definitions (4–8 pairs):
  `<div data-match="terms1"></div>` + `window.MATCHERS = {terms1:{pairs:[["Term","Definition"],…]}}`
- **Order** — click steps into sequence:
  `<div data-order="probate"></div>` + `window.ORDERS = {probate:{steps:["First …","Then …"]}}`
- **Reveal** — prompt cards that open on tap:
  `<div data-reveal="defs"></div>` + `window.REVEALS = {defs:{cols:3, items:[{front:"HO-3", back:"Open-perils dwelling…"}]}}`

Multiple instances per page are fine — give each a unique key. Merge all globals
into ONE inline script per page.

Self-check pattern:
```html
<details class="selfcheck"><summary>Q from the book's Self-Check…</summary>
<div class="sc-a">Answer, in one or two sentences.</div></details>
```

## Verify your work

Run `npm run check-links` from the repo root — it must pass (checks every
href/src and #anchor). Also sanity-check that your inline JSON parses
(`node -e` on the data if unsure).
