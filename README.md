# FPQP® Visual Academy

A visual-first, static study site for the **FPQP® (Financial Paraplanner Qualified Professional™)** final exam. Concepts are taught through pictures, colors, diagrams, and memory hooks instead of walls of text, and the numbers are updated for **2026** rules.

## What's inside

- **10 module lessons** (`module1.html`–`module10.html`) covering the full current FPQP® curriculum, each with an interactive self-quiz.
- **Interactive diagrams** instead of static text — a clickable 7-step planning-process wheel (Module 1), a Roth-vs-Traditional decision tree and an RMD birth-year number line (Module 7), a drag-to-explore marginal tax-bracket stack (Module 8), and a hover/tap probate-bypass map (Module 9).
- **Topic tools** — a searchable **Topics A–Z** index (`concepts.html`) that re-sorts the curriculum by subject rather than module, a filterable **Number Bank** (`number-bank.html`) of every 2026 figure, and a flip-card **Flashcards** deck (`flashcards.html`) for the closed-book exam.
- **Toolkit pages** — test-taking skills (`exam-skills.html`) and a checkable/editable 30-day study plan (`study-plan.html`).
- **Consistent color = topic** — each topic keeps its accent color across the whole site, surfaced by a persistent "Color = topic" legend (bottom-left) as a built-in memory hook.
- **Trap-answer callouts** in quizzes flag the outdated numbers that make classic wrong answers.
- **Progress tracking** — quiz scores and study-plan progress save automatically to the browser via `localStorage`.
- **Print-friendly** — a dedicated print stylesheet turns any page into a clean offline study sheet (quiz answers and both flashcard sides are revealed in print).

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
