# FPQP® Visual Academy

A visual-first, static study site for the **FPQP® (Financial Paraplanner Qualified Professional™)** final exam. Concepts are taught through pictures, colors, diagrams, and memory hooks instead of walls of text, and the numbers are updated for **2026** rules.

## What's inside

- **10 module lessons** (`module1.html`–`module10.html`) covering the full current FPQP® curriculum, each with an interactive self-quiz.
- **Toolkit pages** — test-taking skills (`exam-skills.html`) and a checkable/editable 30-day study plan (`study-plan.html`).
- **Progress tracking** — quiz scores and study-plan progress save automatically to the browser via `localStorage`.

## Tech

Plain HTML, one shared stylesheet (`css/style.css`), and one shared vanilla-JS engine (`js/app.js`) that builds the nav, quiz engine, progress meters, and encouragement toasts. No build step and no dependencies.

## Running locally

It's a static site — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Disclaimer

A personal study aid. FPQP® is a mark of the College for Financial Planning® (a Kaplan Company). Always verify details against your official course materials.
