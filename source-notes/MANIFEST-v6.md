---
role: source-set-index
project: fpqp-visual-academy
last_updated: "2026-07-21"
version: 6
---

# MANIFEST — FPQP Authoritative Source Set (v6)

> **FOR AI AGENTS:** This is the index of the authoritative source set for the study site. Site content must derive ONLY from the files listed here. The original book PDFs (kept privately in `source-pdfs/`, NOT to be published) are the verbatim authority; the `.md` files are faithful, page-cited study notes derived from them. If a module's file is `status: partial` (or missing), that module is NOT ready to build. Superseded versions live in `archive/` and must NOT be built from — newest version wins.

## Source book
Foundations in Financial Planning Professional Education Program (FPQP(R)), 2025 Version 24, ISBN 978-1-0788-5107-7, (c) College for Financial Planning — a Kaplan Company. Copyright notice: personal, private use only — **keep this repo PRIVATE; never publish the PDFs or verbatim text.**

## Source PDFs received (sequential page chunks)
| PDF | Book pages | Contents |
|---|---|---|
| 1-21.pdf | cover–TOC | Cover, title/copyright, TOC (Modules 1–9, truncated) |
| 21-40.pdf | TOC end + pp. 1–16 | TOC remainder (Mod 9 end, Mod 10, back matter), Preface, Module 1 pp. 5–16 |
| 41-60.pdf | pp. 17–36 | Module 1 pp. 17–36 (Ch 1.2 end – Ch 1.5 start) |
| 61-80.pdf | pp. 37–56 | Module 1 pp. 37–44 (end), Module 2 pp. 45–56 (start) |
| 81-100.pdf | pp. 57–76 | Module 2: Ch 2.2 financial ratios (end of chapter), Ch 2.3 Credit and Debt through p. 76 |
| 101-120.pdf | pp. 77–96 | Module 2: Ch 2.3 end + review (77), Ch 2.4 Budgeting (78–81), Ch 2.5 Business Forms (82–85), Summary (86), Review Answers (87–89), end page (90); Module 3: cover (91), Introduction (92–93), Ch 3.1 start (94–96) |
| 121-140.pdf | pp. 97–116 | Module 3: Ch 3.1 end (97–98), Ch 3.2 TVM Calculations + review Qs 1–4 (99–116) |
| 141-160.pdf | pp. 117–136 | Module 3: Ch 3.2 review Qs 5–13 (117–118), Ch 3.3 Interest Rate Assumptions (119–123), Summary (124), Review Answers (125–134); Module 4: cover (135), Introduction/LO table (136) |
| 161-180.pdf | pp. 137–156 | Module 4: Ch 4.1 Principles of Risk Management, full (137–154, incl. Ch 4.1 Review Qs 1–6); Ch 4.2 Homeowners Insurance start (155–156, thru the 80% coinsurance example) |
| 181-200.pdf | pp. 157–176 | Module 4: Ch 4.2 rest (157–160), Ch 4.3 Auto & Umbrella (161–168), Summary (169), Module 4 Review Answers (170–172); Module 5: cover (173), Introduction/LO table (174), Ch 5.1 Life Insurance start (175–176: Group Life, Term Life) |
| 201-220.pdf | pp. 177–196 | Module 5: Ch 5.1 rest (177–188: whole/UL/variable/VUL life, Table 5.1, term-vs-permanent, policy provisions [LO 5-2], how-much-life-insurance [LO 5-3], Ch 5.1 Review); Ch 5.2 Health Care Plans & HSAs full (189–195, incl. ACA, Medicare, HSA/HRA/FSA, Table 5.2, Ch 5.2 Review); Ch 5.3 Disability Income start (196). (p. 197 is a blank page.) |

## Markdown source files
| File | Covers | Status |
|---|---|---|
| fpqp-source-01-front-matter-toc-v2.md | Front matter, COMPLETE TOC (master coverage map), Preface outline | complete — **NOT YET IN REPO** (pending from handoff) |
| fpqp-module-01-financial-planning-process-v1.md | Module 1 (book pp. 5–44) | complete — **NOT YET IN REPO** (pending from handoff) |
| fpqp-module-02-cash-management-debt-v2.md | Module 2 (book pp. 45–90, FULL module) | complete |
| fpqp-module-03-time-value-of-money-v2.md | Module 3 (book pp. 91–134, FULL module) | complete |
| fpqp-module-04-insurance-basics-property-v3.md | Module 4 (book pp. 135–172, FULL module) | complete |
| fpqp-module-05-life-health-insurance-v2.md | Module 5 (pp. 173–196 so far; Ch 5.1 & 5.2 complete, Ch 5.3 partial) | **partial** — supersedes v1; resumes at p. 197 |

> **Note on missing files:** `fpqp-source-01-front-matter-toc-v2.md` and `fpqp-module-01-financial-planning-process-v1.md` are part of the authoritative set but were not delivered in the handoff batches. They are still needed (either as the original `.md` files or re-derived from the front-matter and Module 1 PDF chunks).

## Module coverage tracker
| Module | Title | Book pages (actual) | Status |
|---|---|---|---|
| — | Preface | 1–3 | done (outline) — file pending |
| 1 | The Financial Planning Process | 5–44 | ✅ complete — file pending |
| 2 | Cash Management and the Use of Debt | 45–90 | ✅ complete |
| 3 | Time Value of Money | 91–134 | ✅ complete |
| 4 | Insurance Basics and Property Insurance | 135–172 | ✅ complete |
| 5 | Life & Health Insurance | 173–? (thru 196 so far) | 🟡 partial — Ch 5.1 ✅ & Ch 5.2 ✅ done; Ch 5.3 Disability started; Ch 5.4 LTC + Ch 5.5 Annuities + review answers pending |
| 6 | Investment Basics | — | ⏳ pending |
| 7 | Retirement Planning | — | ⏳ pending |
| 8 | Tax Implications | — | ⏳ pending |
| 9 | Estate Planning Basics | 371–411 | ⏳ pending |
| 10 | Case Study | 414–465 | ⏳ pending |
| — | Glossary / Appendices / Index | 469–511 | ⏳ pending |

## Next up
- `221-240.pdf` (book pp. 197–216): finish Chapter 5.3 Disability Income Insurance, then Chapter 5.4 Long-Term Care Insurance [LO 5-7] and Chapter 5.5 Annuities [LO 5-8], the module summary, and the Module 5 Review Answers → grow `fpqp-module-05-...` toward v3 (complete).

## Rules for future chunks
1. PDFs arrive as sequential page ranges, not module-aligned; content is routed into the correct module file(s).
2. Chunks straddling module/chapter boundaries leave the trailing module `status: partial`; completed as vX+1 when the next chunk arrives.
3. Every fact in a module file carries a printed-page reference for audit against the PDFs.
4. Filenames carry version numbers (vX); newest version wins. Superseded versions move to `archive/`.
5. Review questions are captured when they appear; their ANSWERS (in each module's Review Answers section) may arrive one or more chunks later — flag them as pending until captured.

## Page math (reference)
- book printed page = whole-file (scanner) page − 24. Example: 181-200.pdf page 1 = book p. 157.
