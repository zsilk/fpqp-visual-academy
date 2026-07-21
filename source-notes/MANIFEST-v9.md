---
role: source-set-index
project: fpqp-visual-academy
last_updated: "2026-07-21"
version: 9
---

# MANIFEST — FPQP Authoritative Source Set (v9)

> **FOR AI AGENTS:** This is the index of the authoritative source set for the study site. Site content must derive ONLY from the files listed here. The original book PDFs (kept privately in `source-pdfs/`, NOT to be published) are the verbatim authority; the `.md` files are faithful, page-cited study notes derived from them. If a module's file is `status: partial` (or missing), that module is NOT ready to build. Superseded versions live in `archive/` and must NOT be built from — newest version wins.

## Source book
Foundations in Financial Planning Professional Education Program (FPQP(R)), 2025 Version 24, ISBN 978-1-0788-5107-7, (c) College for Financial Planning — a Kaplan Company. Copyright notice: personal, private use only — **keep this repo PRIVATE; never publish the PDFs or verbatim text.**

## Source PDFs received (sequential page chunks)
| PDF | Book pages | Contents |
|---|---|---|
| 1-21.pdf | cover–TOC | Cover, title/copyright, TOC (truncated) |
| 21-40.pdf | TOC end + pp. 1–16 | TOC remainder, Preface, Module 1 pp. 5–16 |
| 41-60.pdf | pp. 17–36 | Module 1 pp. 17–36 |
| 61-80.pdf | pp. 37–56 | Module 1 end (37–44), Module 2 start (45–56) |
| 81-100.pdf | pp. 57–76 | Module 2: Ch 2.2–2.3 through p. 76 |
| 101-120.pdf | pp. 77–96 | Module 2 end; Module 3 cover + Ch 3.1 start |
| 121-140.pdf | pp. 97–116 | Module 3: Ch 3.1 end, Ch 3.2 + review Qs 1–4 |
| 141-160.pdf | pp. 117–136 | Module 3: Ch 3.2 review, Ch 3.3, Summary, Review Answers; Module 4 cover + intro |
| 161-180.pdf | pp. 137–156 | Module 4: Ch 4.1 full; Ch 4.2 start |
| 181-200.pdf | pp. 157–176 | Module 4: Ch 4.2 rest, Ch 4.3, Summary, Review Answers; Module 5 cover + Ch 5.1 start |
| 201-220.pdf | pp. 177–196 | Module 5: Ch 5.1 rest + Ch 5.2 full; Ch 5.3 Disability start |
| 221-240.pdf | pp. 197–216 | Module 5: Ch 5.3 rest, 5.4 LTC, 5.5 Annuities, Summary, Review Answers Ch 5.1–5.4 |
| 241-260.pdf | pp. 217–236 | Module 5: Review Answers Ch 5.5; Module 6 cover + Ch 6.1 |
| 261-280.pdf | pp. 237–256 | Module 6: Ch 6.2 Risk, 6.3 Mutual Funds/ETFs, 6.4 Investment Decisions, Summary, Review Answers start |
| 281-300.pdf | pp. 257–276 | Module 6: Review Answers Ch 6.1–6.4; Module 7 cover, Intro, Ch 7.1 full, Ch 7.2 start |
| 301-320.pdf | pp. 277–296 | Module 7: Ch 7.2 rest (IRAs, 403(b)/457, SIMPLE/SEP, penalty exceptions, RMDs, vesting, Ch 7.2 Review); Ch 7.3 Social Security start (293–296) |
| 321-340.pdf | pp. 297–316 | Module 7: Ch 7.3 rest (FRA, benefits, strategies, Medicare, Ch 7.3 Review), Ch 7.4 (307–310), Summary (311), Review Answers (312–314); Module 8 cover (315), Intro/LO table (316) |

## Markdown source files
| File | Covers | Status |
|---|---|---|
| fpqp-source-01-front-matter-toc-v2.md | Front matter, COMPLETE TOC (master coverage map), Preface outline | complete — **NOT YET IN REPO** (pending from handoff) |
| fpqp-module-01-financial-planning-process-v1.md | Module 1 (book pp. 5–44) | complete — **NOT YET IN REPO** (pending from handoff) |
| fpqp-module-02-cash-management-debt-v2.md | Module 2 (book pp. 45–90, FULL module) | complete |
| fpqp-module-03-time-value-of-money-v2.md | Module 3 (book pp. 91–134, FULL module) | complete |
| fpqp-module-04-insurance-basics-property-v3.md | Module 4 (book pp. 135–172, FULL module) | complete |
| fpqp-module-05-life-health-insurance-v3.md | Module 5 (book pp. 173–218, FULL module) | complete |
| fpqp-module-06-investment-basics-strategies-v2.md | Module 6 (book pp. 219–259, FULL module) | complete |
| fpqp-module-07-retirement-planning-v2.md | Module 7 (book pp. 261–314, FULL module) | complete — supersedes v1 |
| fpqp-module-08-tax-implications-v1.md | Module 8 (pp. 315–316 so far; cover + intro only) | **partial** — resumes at p. 317 |

> **Note on missing files:** `fpqp-source-01-front-matter-toc-v2.md` and `fpqp-module-01-financial-planning-process-v1.md` are part of the authoritative set but were not delivered in the handoff batches. They are still needed (either as the original `.md` files or re-derived from the front-matter and Module 1 PDF chunks).

## Module coverage tracker
| Module | Title | Book pages (actual) | Status |
|---|---|---|---|
| — | Preface | 1–3 | done (outline) — file pending |
| 1 | The Financial Planning Process | 5–44 | ✅ complete — file pending |
| 2 | Cash Management and the Use of Debt | 45–90 | ✅ complete |
| 3 | Time Value of Money | 91–134 | ✅ complete |
| 4 | Insurance Basics and Property Insurance | 135–172 | ✅ complete |
| 5 | Life & Health Insurance | 173–218 | ✅ complete |
| 6 | Investment Basics and Strategies | 219–259 | ✅ complete |
| 7 | Retirement Planning | 261–314 | ✅ complete |
| 8 | Tax Implications of Financial Decisions | 315–? (thru 316 so far) | 🟡 partial — cover + intro only; all chapters pending |
| 9 | Estate Planning Basics | 371–411 | ⏳ pending |
| 10 | Case Study | 414–465 | ⏳ pending |
| — | Glossary / Appendices / Index | 469–511 | ⏳ pending |

## Next up
- `341-360.pdf` (book pp. 317–336): Chapter 8.1 Types of Taxes and Income [LO 8-1], Chapter 8.2 Federal Tax Calculation [LO 8-2, 8-3], and onward → grow `fpqp-module-08-...` toward v2.

## Rules for future chunks
1. PDFs arrive as sequential page ranges, not module-aligned; content is routed into the correct module file(s).
2. Chunks straddling module/chapter boundaries leave the trailing module `status: partial`; completed as vX+1 when the next chunk arrives.
3. Every fact in a module file carries a printed-page reference for audit against the PDFs.
4. Filenames carry version numbers (vX); newest version wins. Superseded versions move to `archive/`.
5. Review questions are captured when they appear; their ANSWERS (in each module's Review Answers section) may arrive one or more chunks later — flag them as pending until captured.

## Page math (reference)
- book printed page = whole-file (scanner) page − 24. Example: 321-340.pdf page 1 = book p. 297.
