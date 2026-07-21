---
id: m3c2-tvm-calculations
module: 3
chapter: "3.2"
title: Time Value of Money Calculations
tags: [future-value, present-value, annuity, rate-of-return, amortization, compounding]
see_also: [m3c1-calculator-setup, m3c3-interest-rate-assumptions]
---

# 3.2 — Time Value of Money Calculations

## Overview

The premise underneath everything: a dollar today is worth more than a dollar
later, because a dollar today can be invested and earn a return. Every
calculation in this chapter is a version of moving money forward or backward
through time at an assumed rate.

There are only five variables — N, I/YR, PV, PMT, FV. Enter four, solve for the
fifth. What varies across problem types is which one is unknown, so the real
skill is reading a word problem and correctly identifying which variable is
being asked for.

> **Note on worked answers.** All figures below are computed at full precision
> and rounded for display. Small differences from your calculator (a dollar or
> two) usually come from intermediate rounding, not from method.

## Core Formulas

Useful to know even though the calculator does the work — they make the period
conversions obvious.

| Quantity | Formula |
|----------|---------|
| Future value of a lump sum | FV = PV(1 + r)ⁿ |
| Present value of a lump sum | PV = FV ÷ (1 + r)ⁿ |
| Future value of an ordinary annuity | FV = PMT × [((1 + r)ⁿ − 1) ÷ r] |
| Present value of an ordinary annuity | PV = PMT × [(1 − (1 + r)⁻ⁿ) ÷ r] |
| Annuity due (either direction) | Ordinary annuity result × (1 + r) |

Here **r** is the rate *per period* and **n** is the *number of periods* — not
annual figures unless compounding is annual.

## Future Value

What an amount today grows to at an assumed rate.

### Problem 1 — Lump sum, annual compounding

A client invests $25,000 today at 7%, compounded annually, for 12 years.

```
N     = 12
I/YR  = 7
PV    = -25,000
PMT   = 0
FV    = ?
```

**FV = $56,304.79**

The $25,000 more than doubles. Note that $31,304.79 of growth on a $25,000
principal comes entirely from compounding — interest earning interest.

### Problem 2 — Compounding frequency

Same client, same 7%, same 12 years — but compounded **monthly**.

```
N     = 12 × 12 = 144
I/YR  = 7 ÷ 12 = 0.583333
PV    = -25,000
FV    = ?
```

**FV = $57,768.02**

About $1,463 more than annual compounding, from frequency alone. More frequent
compounding always produces a higher future value at the same stated rate,
because interest starts earning interest sooner.

### Problem 3 — Series of payments

A client saves $500 at the end of every month for 30 years at 6% annual,
compounded monthly.

```
N     = 360
I/YR  = 0.5
PV    = 0
PMT   = -500
FV    = ?
```

**FV = $502,257.52**

Total contributed: $180,000. Growth: $322,257.52. This is the single most
persuasive calculation in personal finance — nearly two-thirds of the final
balance is compounding, not contribution.

### Problem 4 — Annuity due

Same as Problem 3, but payments at the **beginning** of each month. Switch to
BEGIN mode:

**FV = $504,768.81**

$2,511 higher, because every payment gets one extra month of growth. Equivalently,
the ordinary annuity result × (1 + 0.005).

### Problem 5 — Lump sum plus payments

A client has $25,000 today and adds $500/month for 30 years at 6% monthly.

```
N = 360 · I/YR = 0.5 · PV = -25,000 · PMT = -500 · FV = ?
```

**FV = $652,821.90**

Both PV and PMT are negative — both are outflows from the client. This is the
most realistic form of a retirement projection: existing balance plus ongoing
contributions.

## Present Value

What a future amount is worth today — the discounting direction.

### Problem 6 — Lump sum

A client needs $80,000 in 6 years for a goal, and expects 5% annually. How much
must be invested today?

```
N = 6 · I/YR = 5 · PMT = 0 · FV = 80,000 · PV = ?
```

**PV = −$59,697.23**

Negative because it's a required deposit — an outflow.

### Problem 7 — Present value of an income stream

A client wants $40,000 per year for 25 years in retirement, with the portfolio
earning 5%. What lump sum is required at the start of retirement?

```
N = 25 · I/YR = 5 · PMT = 40,000 · FV = 0 · PV = ?
```

**PV = $563,757.78**

This is the retirement capital-needs calculation in its simplest form. Note it
assumes level payments and ignores inflation — 3.3 addresses why that matters
and how to correct for it.

### Problem 8 — Why FV = 0 here

Setting FV = 0 means the portfolio is exactly exhausted at the end of the 25th
year. If the client wants to leave $100,000 to heirs, enter FV = 100,000, and the
required PV rises. This is a small change that clients care about a great deal,
and it's worth asking about explicitly.

## Solving for the Rate

### Problem 9

An investment grew from $15,000 to $28,000 over 9 years, with no additions.

```
N = 9 · PV = -15,000 · PMT = 0 · FV = 28,000 · I/YR = ?
```

**I/YR = 7.18%**

This is the compound annual growth rate. It's the correct way to describe average
growth — simply averaging annual returns overstates the result, because it
ignores the compounding path.

## Solving for the Payment

### Problem 10 — Required savings

A client needs $100,000 in 18 years for education funding and expects 6% annually.

```
N = 18 · I/YR = 6 · PV = 0 · FV = 100,000 · PMT = ?
```

**PMT = −$3,235.65 per year**

### Problem 11 — Loan payment

A $320,000 mortgage at 6.5% for 30 years, monthly.

```
N = 360 · I/YR = 6.5 ÷ 12 = 0.541667 · PV = 320,000 · FV = 0 · PMT = ?
```

**PMT = −$2,022.62 per month**

PV is positive (the client receives the loan proceeds) and PMT is negative (the
client pays). Total paid over the term: 360 × $2,022.62 = $728,143 — of which
$408,143 is interest. Computing that total is often more persuasive than
discussing the rate.

## Solving for Number of Periods

### Problem 12

How long for $5,000 to double at 8%, compounded annually?

```
I/YR = 8 · PV = -5,000 · PMT = 0 · FV = 10,000 · N = ?
```

**N = 9.01 years**

### The Rule of 72

A quick mental approximation: **72 ÷ rate ≈ years to double.**

72 ÷ 8 = 9 years, against the precise 9.01. The rule is accurate enough for
conversation in the roughly 5–12% range and drifts at the extremes. Useful for
illustrating a point to a client without reaching for a calculator — not for
computing a recommendation.

## Reading Word Problems

The practical skill. A translation guide:

| Phrasing | Solve for |
|----------|-----------|
| "What will it be worth?" | FV |
| "How much do I need today / what lump sum?" | PV |
| "How much must I save each month/year?" | PMT |
| "What return did I earn?" / "What rate is needed?" | I/YR |
| "How long until…?" | N |

And the setup checks:

- Are payments at the beginning or end of the period? → BEGIN vs. END
- How often does compounding occur? → convert N and I/YR together
- Which flows are outbound from the client? → those are negative
- Is there a residual amount at the end? → FV = 0 or a target value

## Common Pitfalls

- Converting the rate but not the number of periods
- Forgetting to clear registers between problems
- Entering PV and PMT with the same sign when flows run opposite directions
- Leaving BEGIN mode on after an annuity due problem
- Solving for FV when the question asked for the required PMT — read the question twice
- Averaging annual returns instead of computing a compound growth rate
- Treating the Rule of 72 as precise

## Self-Check

**1. Why does monthly compounding beat annual at the same stated rate?**

<details><summary>Answer</summary>
Interest is credited more often, so it begins earning interest sooner. In Problem
2 the same 7% over 12 years produced $57,768.02 monthly versus $56,304.79
annually — about $1,463 from frequency alone.
</details>

**2. In a loan problem, why is PV positive while PMT is negative?**

<details><summary>Answer</summary>
The client receives the loan proceeds (money flowing toward them, positive) and
makes payments (money flowing away, negative). The sign convention encodes
direction of flow, and opposite directions require opposite signs.
</details>

**3. A client saved $180,000 over 30 years and ended with $502,257. What does
this show?**

<details><summary>Answer</summary>
Roughly $322,000 — about 64% of the final balance — came from compound growth
rather than contributions. It demonstrates why time in the market dominates
contribution size over long horizons, and why starting early matters more than
starting large.
</details>

**4. A client wants $40,000/year for 25 years and also to leave $100,000 to
heirs. What changes in the setup?**

<details><summary>Answer</summary>
FV changes from 0 to 100,000. Setting FV = 0 exhausts the portfolio exactly; a
residual bequest requires a larger PV at the start of retirement.
</details>

**5. Estimate the doubling time at 9% using the Rule of 72, and state its limits.**

<details><summary>Answer</summary>
72 ÷ 9 = 8 years. It's a mental approximation, reasonably accurate around 5–12%
and less so at the extremes — fine for illustrating a concept, not for computing
a recommendation.
</details>

## Connections

- Calculator settings these problems depend on: [3.1 — Calculator Setup](01-calculator-setup.md)
- Choosing the rate to assume, and adjusting for inflation: [3.3 — Interest Rate Assumptions](03-interest-rate-assumptions.md)
- Loan payment and total interest applications: [2.3 — Credit and Debt](../module-02-cash-management-debt/03-credit-and-debt.md)
- Retirement capital needs analysis in depth: Module 7
