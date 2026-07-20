# FPQP® Visual Academy

A visual-first, static study site for the **FPQP® (Financial Paraplanner Qualified Professional™)** final exam. Concepts are taught through pictures, colors, diagrams, and memory hooks instead of walls of text, and the numbers are updated for **2026** rules.

## What's inside

- **10 module lessons** (`module1.html`–`module10.html`) covering the full current FPQP® curriculum, each opening with a **myth-or-fact warm-up** and closing with a self-quiz.
- **Interactive diagrams** instead of static text — a clickable 7-step planning-process wheel and a "who regulates whom" map (Module 1), a live **TVM calculator** (Module 3), a **term-vs-whole-life cost-over-time** chart (Module 5), a Roth-vs-Traditional decision tree, an RMD birth-year number line and a contribution bar chart (Module 7), a drag-to-explore marginal tax-bracket stack (Module 8), and a hover/tap probate-bypass map (Module 9).
- **Topic tools** — a searchable **Topics A–Z** index (`concepts.html`) whose chips deep-link to the exact section, a filterable **Number Bank** (`number-bank.html`), a big flip-card **Flashcards** deck (`flashcards.html`) you can mark *known* / *needs review*, **Scenario Drills** (`scenarios.html`), and a print-ready **Formula Sheet** (`formulas.html`).
- **Flag & Rematch** — flag any section (or a flashcard) to review; it collects on your **Rematch list** (`review.html`), a personal focus queue.
- **Guided tour** — a first-visit walkthrough (re-runnable via the hub button) introduces the nav, warm-ups, flagging, the color legend, and the plain-language toggle.
- **Plain-language ⇄ exam-precise toggle** adds plain-English explanations alongside the exam wording.
- **Toolkit pages** — test-taking skills (`exam-skills.html`) and a checkable/editable 30-day study plan (`study-plan.html`).
- **Consistent color = topic** — each topic keeps its accent color site-wide, surfaced by a persistent, numbered "Color = topic" legend (colorblind-friendly: color is never the only cue).
- **Trap-answer callouts** in quizzes flag the outdated numbers that make classic wrong answers.
- **Deep-linkable sections** — every section heading gets a shareable anchor and a "flag to review" control.
- **Progress tracking** — quiz scores, flags, flashcard marks, mode, and study-plan progress all save automatically via `localStorage`.
- **Accessible & print-friendly** — reduced-motion is honored globally; a dedicated print stylesheet turns any page into a clean offline study sheet (quiz answers, plain-language notes, and both flashcard sides are revealed in print).

## Tech

Plain HTML, one shared stylesheet (`css/style.css`), and one shared vanilla-JS engine (`js/app.js`) that builds the nav, quiz engine, progress meters, interactive diagrams, flashcards, the Number Bank filter, and the color legend. No build step and no runtime dependencies.

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

## Disclaimer

A personal study aid. FPQP® is a mark of the College for Financial Planning® (a Kaplan Company). Always verify details against your official course materials.
