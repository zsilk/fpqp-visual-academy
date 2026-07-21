# FPQP® Visual Academy

A visual-first, static study site for the **FPQP® (Financial Paraplanner Qualified Professional™)** final exam. Concepts are taught through pictures, colors, diagrams, and memory hooks instead of walls of text, and the numbers are updated for **2026** rules.

## What's inside

- **10 module lessons** (`module1.html`–`module10.html`) covering the full current FPQP® curriculum, each opening with a **myth-or-fact warm-up** and closing with a self-quiz.
- **Interactive diagrams** instead of static text — a clickable 7-step planning-process wheel and a "who regulates whom" map (Module 1), a live **TVM calculator** (Module 3), a **term-vs-whole-life cost-over-time** chart (Module 5), a Roth-vs-Traditional decision tree, an RMD birth-year number line and a contribution bar chart (Module 7), a drag-to-explore marginal tax-bracket stack (Module 8), and a hover/tap probate-bypass map (Module 9).
- **Topic tools** — a searchable **Topics A–Z** index (`concepts.html`) whose chips deep-link to the exact section, a filterable **Number Bank** (`number-bank.html`), a big flip-card **Flashcards** deck (`flashcards.html`) you can mark *known* / *needs review*, **Scenario Drills** (`scenarios.html`), and a print-ready **Formula Sheet** (`formulas.html`).
- **Flag & Rematch** — flag any section (or a flashcard) to review; it collects on your **Rematch list** (`review.html`), a personal focus queue.
- **Guided tour** — a first-visit walkthrough (re-runnable via the hub button) introduces the nav, warm-ups, flagging, the color legend, and the plain-language toggle.
- **Plain-language ⇄ exam-precise toggle** adds plain-English explanations alongside the exam wording.
- **Toolkit pages** — test-taking skills (`exam-skills.html`) and a feedback inbox (`feedback-log.html`).
- **Access gate** — the site sits behind a study PIN with per-user profiles (Bluffman / Rhaley); 10 wrong PIN attempts locks the gate for 15 minutes (`js/gate.js`).
- **Feedback button** — a floating 💬 button on every page reports wrong content or broken formatting in two taps; reports land in `feedback-log.html` (stored in Netlify Blobs, queued locally when offline).
- **Consistent color = topic** — each topic keeps its accent color site-wide, surfaced by a persistent, numbered "Color = topic" legend (colorblind-friendly: color is never the only cue).
- **Trap-answer callouts** in quizzes flag the outdated numbers that make classic wrong answers.
- **Deep-linkable sections** — every section heading gets a shareable anchor and a "flag to review" control.
- **Progress tracking** — quiz scores, flags, flashcard marks, and mode save automatically per user, locally **and** to the server (Netlify Blobs via `/api/state`), so progress follows each user across devices and survives cleared browsers. Offline changes re-sync on the next visit.
- **Accessible & print-friendly** — reduced-motion is honored globally; a dedicated print stylesheet turns any page into a clean offline study sheet (quiz answers, plain-language notes, and both flashcard sides are revealed in print).

## Tech

Plain HTML, one shared stylesheet (`css/style.css`), and one shared vanilla-JS engine (`js/app.js`) that builds the nav, quiz engine, progress meters, interactive diagrams, flashcards, the Number Bank filter, and the color legend. No build step. Two Netlify Functions (`netlify/functions/`) back per-user progress sync and the feedback inbox with **Netlify Blobs** (strong consistency, so saves are immediately readable — the fix for progress not persisting).

Study content is authored from the original notes in `fpqp-book-content/` — the authoritative source for all study material. Page-authoring conventions live in `docs/AUTHORING.md`.

## Checking links

A zero-dependency Node script validates that every internal link, `#anchor`, and nav target resolves:

```bash
npm run check-links   # or: node tools/check-links.mjs
```

It runs automatically on every push/PR via GitHub Actions (`.github/workflows/lint.yml`).

## Running locally

It's a static site — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Accuracy

All figures and core concepts are verified against the **official 2026 FFPN v2.5 (CFFP) course decks**, the CFFP **Annual Limits** sheet, and the **exam tax tables** — retirement, estate, HSA, and standard-deduction numbers, the tax brackets, RMD ages, ratios, and mnemonics (including the official 7-step "Umbrellas In A Downpour Prevent Immense Mess"). Module 1 also carries the official FPQP® Code of Ethics, behavioral-finance biases, and communication/counseling material; a few real-world extras (Reg BI, the regulator map, fee models) are kept but labeled *beyond the exam*. Note: exam windows through March 2026 provide **2025** tax tables — see the note on the Number Bank.

## Disclaimer

A personal study aid. FPQP® is a mark of the College for Financial Planning® (a Kaplan Company). Always verify details against your official course materials.
