---
id: index
type: index
title: FPQP Study Notes
description: Original study notes following the Financial Paraplanner Qualified Professional curriculum.
modules_total: 10
modules_complete: 10
---

# FPQP Study Notes

Study notes organized around the Financial Paraplanner Qualified Professional
(FPQP®) curriculum — the ten-module program administered by the College for
Financial Planning. Written for self-study and structured to be consumed by a
static site generator.

## About These Notes

These are **original explanatory notes**, not a transcription. They cover
standard, publicly documented professional material — the CFP Board's seven-step
planning process, IRS rules, insurance and investment fundamentals, behavioral
finance concepts — organized to follow the FPQP topic sequence so study stays
aligned with the exam domains.

The official courseware is copyrighted and is not reproduced here. Use these
notes alongside your own licensed copy of the course materials.

Where tax figures, contribution limits, and thresholds appear, they change
annually. Verify against current IRS publications before relying on any number.

## Progress

| Module | Title | Status |
|--------|-------|--------|
| 1 | The Financial Planning Process | Complete |
| 2 | Cash Management and the Use of Debt | Complete |
| 3 | The Time Value of Money | Complete |
| 4 | Insurance Basics and Property Insurance | Complete |
| 5 | Life and Health Insurance | Complete |
| 6 | Investment Basics and Strategies | Complete |
| 7 | Retirement Planning | Complete |
| 8 | Tax Implications of Financial Decisions | Complete |
| 9 | Estate Planning Basics | Complete |
| 10 | Case Study | Complete |

## Contents

### Module 1 — The Financial Planning Process
- [1.1 Personal Financial Planning and Financial Goals](module-01-financial-planning-process/01-planning-and-goals.md)
- [1.2 Steps in the Personal Financial Planning Process](module-01-financial-planning-process/02-seven-step-process.md)
- [1.3 Knowledge Required for Appropriate Analysis and Plan Creation](module-01-financial-planning-process/03-knowledge-domains.md)
- [1.4 Client Behaviors, Communication, and Counseling Principles](module-01-financial-planning-process/04-client-behaviors.md)
- [1.5 Ethical and Regulatory Issues for the Financial Planning Professional](module-01-financial-planning-process/05-ethics-regulation.md)

### Module 2 — Cash Management and the Use of Debt
- [2.1 Financial Statements](module-02-cash-management-debt/01-financial-statements.md)
- [2.2 Financial Situation Analysis](module-02-cash-management-debt/02-financial-situation-analysis.md)
- [2.3 Credit and Debt](module-02-cash-management-debt/03-credit-and-debt.md)
- [2.4 Budgeting](module-02-cash-management-debt/04-budgeting.md)
- [2.5 Closely Held Business Forms](module-02-cash-management-debt/05-business-forms.md)

### Module 3 — The Time Value of Money
- [3.1 Getting Started — Financial Calculator Setup](module-03-time-value-of-money/01-calculator-setup.md)
- [3.2 Time Value of Money Calculations](module-03-time-value-of-money/02-tvm-calculations.md)
- [3.3 The Importance of Interest Rate Assumptions](module-03-time-value-of-money/03-interest-rate-assumptions.md)

### Module 4 — Insurance Basics and Property Insurance
- [4.1 Principles of Risk Management](module-04-insurance-property/01-risk-management-principles.md)
- [4.2 Homeowners Insurance](module-04-insurance-property/02-homeowners.md)
- [4.3 Automobile and Umbrella Liability Insurance](module-04-insurance-property/03-auto-umbrella.md)

### Module 5 — Life and Health Insurance
- [5.1 Life Insurance](module-05-life-health-disability/01-life-insurance.md)
- [5.2 Health Care Plans and Health Savings Accounts](module-05-life-health-disability/02-health-plans.md)
- [5.3 Disability Income Insurance](module-05-life-health-disability/03-disability.md)
- [5.4 Long-Term Care Insurance](module-05-life-health-disability/04-long-term-care.md)
- [5.5 Annuities](module-05-life-health-disability/05-annuities.md)

### Module 6 — Investment Basics and Strategies
- [6.1 Asset Classes](module-06-investments/01-asset-classes.md)
- [6.2 Types and Measurements of Risk](module-06-investments/02-risk.md)
- [6.3 Mutual Funds and ETFs](module-06-investments/03-mutual-funds.md)
- [6.4 Investment Decisions](module-06-investments/04-investment-decisions.md)

### Module 7 — Retirement Planning
- [7.1 Retirement Opportunities and Challenges](module-07-retirement/01-opportunities-challenges.md)
- [7.2 Sources of Retirement Income](module-07-retirement/02-sources-of-income.md)
- [7.3 Social Security and Medicare](module-07-retirement/03-social-security-medicare.md)
- [7.4 Financial Planning for Retirees](module-07-retirement/04-planning-for-retirees.md)

### Module 8 — Tax Implications of Financial Decisions
- [8.1 Types of Taxes and Income](module-08-tax/01-types-of-taxes.md)
- [8.2 Federal Tax Calculation](module-08-tax/02-federal-tax-calculation.md)
- [8.3 Taxation of Property, Annuities, and Collectibles](module-08-tax/03-property-annuities.md)
- [8.4 Taxation of Employee Benefits and Retirement Income](module-08-tax/04-employee-benefits.md)
- [8.5 Keeping the Proper Records](module-08-tax/05-recordkeeping.md)
- [8.6 Tax Planning Strategies](module-08-tax/06-tax-planning.md)

### Module 9 — Estate Planning Basics
- [9.1 Estate Planning Terminology](module-09-estate/01-estate-terminology.md)
- [9.2 Estate Transfer Tools](module-09-estate/02-transfer-tools.md)
- [9.3 Estate Transfer Expenses](module-09-estate/03-transfer-expenses.md)
- [9.4 Incapacity Planning](module-09-estate/04-incapacity-planning.md)

### Module 10 — Case Study
- [10.1 Getting to Know Your Clients — The Whitfield Case](module-10-case-study/01-client-profile.md)
- [10.2 Analysis — Ratios, Gaps, and Findings](module-10-case-study/02-analysis.md)
- [10.3 Recommendations and Implementation](module-10-case-study/03-recommendations.md)

### Reference
- [Curriculum Map](_meta/curriculum-map.md) — full module and chapter scope-and-sequence

## Structure for Site Generation

Every chapter file carries YAML frontmatter:

```yaml
id: m1c2-seven-step-process   # stable unique key
module: 1                      # integer
chapter: "1.2"                 # string, preserves the decimal
title: ...                     # human-readable heading
tags: [...]                    # topic tags for filtering and search
see_also: [...]                # ids of related chapters
```

Section headings are consistent across files, so a generator can rely on them:

`## Overview` · `## Key Concepts` · `## Definitions` · `## Worked Example` ·
`## Common Pitfalls` · `## Self-Check` · `## Connections`

Not every chapter uses every section, but no chapter invents new ones at this
level. Definitions and comparisons are always tables, so a global glossary can be
assembled by extracting every table under a `## Definitions` heading. Self-check
answers are wrapped in `<details>` — collapsed for study, present in the DOM for
indexing and search.

Cross-references use relative Markdown links, so they resolve both in a plain
file browser and after conversion to HTML.
