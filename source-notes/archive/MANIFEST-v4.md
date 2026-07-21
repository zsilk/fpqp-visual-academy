---
role: source-set-index
project: fpqp-visual-academy
last_updated: "2026-07-20"
version: 4
---

# MANIFEST — FPQP Authoritative Source Set (v4)

> **FOR AI AGENTS:** This is the index of the authoritative source set for the study site. Site content must derive ONLY from the files listed here. The original book PDFs (kept privately in `source-pdfs/`, NOT to be published) are the verbatim authority; the `.md` files are faithful, page-cited study notes derived from them. If a module's file is `status: partial` (or missing), that module is NOT ready to build.

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

## Markdown source files
| File | Covers | Status |
|---|---|---|
| fpqp-source-01-front-matter-toc-v2.md | Front matter, COMPLETE TOC (master coverage map), Preface outline | complete |
| fpqp-module-01-financial-planning-process-v1.md | Module 1 (book pp. 5–44) | complete |
| fpqp-module-02-cash-management-debt-v2.md | Module 2 (book pp. 45–90, FULL module) | complete — supersedes v1 |
| fpqp-module-03-time-value-of-money-v2.md | Module 3 (book pp. 91–134, FULL module) | complete — supersedes v1 |
| fpqp-module-04-insurance-basics-property-v2.md | Module 4 (pp. 135–156 so far; Ch 4.1 complete, Ch 4.2 partial) | **partial** — supersedes v1; resumes at p. 157 |

## Module coverage tracker
| Module | Title | Book pages (actual) | Status |
|---|---|---|---|
| — | Preface | 1–3 | done (outline) |
| 1 | The Financial Planning Process | 5–44 | ✅ complete |
| 2 | Cash Management and the Use of Debt | 45–90 | ✅ complete |
| 3 | Time Value of Money | 91–134 | ✅ complete |
| 4 | Insurance Basics and Property Insurance | 135–? (thru 156 so far) | 🟡 partial — Ch 4.1 ✅ done; Ch 4.2 in progress; Ch 4.3 + review answers pending |
| 5 | Life & Health Insurance | — | ⏳ pending |
| 6 | Investment Basics | — | ⏳ pending |
| 7 | Retirement Planning | — | ⏳ pending |
| 8 | Tax Implications | — | ⏳ pending |
| 9 | Estate Planning Basics | 371–411 | ⏳ pending |
| 10 | Case Study | 414–465 | ⏳ pending |
| — | Glossary / Appendices / Index | 469–511 | ⏳ pending |

## Next up
- `181-200.pdf` (book pp. 157–176): rest of Chapter 4.2 Homeowners (Section I coverages C/D, Section II liability, HO forms), then Chapter 4.3 Automobile & Umbrella Liability → grow `fpqp-module-04-...` toward v3.

## Rules for future chunks
1. PDFs arrive as sequential page ranges, not module-aligned; content is routed into the correct module file(s).
2. Chunks straddling module/chapter boundaries leave the trailing module `status: partial`; completed as v3+ when the next chunk arrives.
3. Every fact in a module file carries a printed-page reference for audit against the PDFs.
4. Filenames carry version numbers (vX); newest version wins.
5. Review questions are captured when they appear; their ANSWERS (in each module's Review Answers section) may arrive one or more chunks later — flag them as pending until captured.
