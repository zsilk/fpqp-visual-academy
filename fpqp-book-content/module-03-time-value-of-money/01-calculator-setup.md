---
id: m3c1-calculator-setup
module: 3
chapter: "3.1"
title: Getting Started — Financial Calculator Setup
tags: [tvm, calculator, hp-10bii, ti-baii-plus, cash-flow-sign-convention]
see_also: [m3c2-tvm-calculations, m3c3-interest-rate-assumptions]
---

# 3.1 — Getting Started: Financial Calculator Setup

## Overview

Every time value of money problem in the program is solved on a financial
calculator, and the overwhelming majority of wrong answers come from calculator
settings rather than from misunderstanding the concept. Three settings account
for nearly all of them: payments per year, END versus BEGIN mode, and leftover
values from the previous problem.

Getting fluent with the machine before learning the concepts is worth the time.
The two calculators the program supports are the **HP 10bII+** and the
**TI BAII Plus**.

## The Five TVM Registers

Both calculators expose the same five variables. Enter any four, solve for the
fifth.

| Register | Meaning |
|----------|---------|
| **N** | Total number of periods |
| **I/YR** or **I/Y** | Interest rate per year, entered as a percent |
| **PV** | Present value — the value today |
| **PMT** | Payment per period, constant across all periods |
| **FV** | Future value — the value at the end |

Two rules govern the inputs, and both are common error sources:

1. **N is total periods, not years.** Monthly payments over 30 years means
   N = 360, not 30.
2. **I/YR is the annual rate.** Both calculators divide it internally by the
   payments-per-year setting. Entering a monthly rate while P/YR is set to 12
   divides it again and produces a badly wrong answer.

## The Cash Flow Sign Convention

The single most important idea in calculator operation, and the one that
generates the most confusion.

> Money **flowing away from you** is **negative**. Money **flowing toward you** is
> **positive**.

Deposits, investments, and loan payments you make are negative. Withdrawals, loan
proceeds you receive, and maturity values you collect are positive.

If PV and FV (or PV and PMT) carry the same sign when they represent opposite
directions of flow, the calculator returns an error or a nonsensical result. When
a TVM problem returns something absurd, check the signs first.

Worked orientation:

- **Saving**: you deposit $10,000 today (PV = −10,000) and collect $16,289 in ten
  years (FV = +16,289).
- **Borrowing**: you receive $250,000 today (PV = +250,000) and make payments
  (PMT = −1,264.14).

Same mathematics, mirrored signs, because the direction of flow is reversed.

## END vs. BEGIN Mode

Determines whether payments occur at the **end** of each period (an *ordinary
annuity*) or the **beginning** (an *annuity due*).

| Mode | Use for |
|------|---------|
| END (default) | Loan payments, mortgages, most retirement contributions, ordinary annuities |
| BEGIN | Rent, lease payments, insurance premiums, retirement income beginning immediately, annuities due |

END is correct for most problems, which is why it's the default — and why
forgetting to switch *back* out of BEGIN mode silently corrupts every subsequent
problem. Both calculators display an indicator when in BEGIN mode; make checking
it a reflex.

An annuity due is always worth more than an otherwise identical ordinary annuity,
because each payment has one extra period to compound.

## HP 10bII+ Setup

| Setting | Keystrokes | Notes |
|---------|-----------|-------|
| Payments per year | `1` `SHIFT` `P/YR` | Set to **1**, then express N and I/YR in matching periods — the approach that causes the fewest errors |
| Decimal places | `SHIFT` `DISP` `4` | Four places is plenty |
| BEGIN/END toggle | `SHIFT` `BEG/END` | Indicator appears when in BEGIN |
| Clear TVM registers | `SHIFT` `C ALL` | Do this before every problem |

### Basic sequence

1. `SHIFT` `C ALL` to clear
2. Confirm P/YR and BEGIN/END
3. Enter each known value, pressing its register key after the number
4. Press the key for the unknown to solve

## TI BAII Plus Setup

| Setting | Keystrokes | Notes |
|---------|-----------|-------|
| Payments per year | `2ND` `P/Y` `1` `ENTER` `2ND` `QUIT` | Set to **1** for the same reason |
| Decimal places | `2ND` `FORMAT` `4` `ENTER` `2ND` `QUIT` | |
| BEGIN/END toggle | `2ND` `BGN` `2ND` `SET` `2ND` `QUIT` | Displays BGN when active |
| Clear TVM registers | `2ND` `CLR TVM` | Before every problem |

### Basic sequence

1. `2ND` `CLR TVM`
2. Confirm P/Y and BGN/END
3. Enter knowns, pressing the register key after each
4. Press `CPT` then the unknown's key to compute

Note the difference from the HP: the TI requires `CPT` before solving; the HP
does not.

## Why Set P/YR to 1

Both calculators can be set to 12 payments per year and handle the conversion
automatically. Setting it to **1** and doing the conversion yourself is more
reliable:

- The setting is invisible once you leave it, and a stale P/YR from a prior
  problem is a silent error
- Explicit conversion makes the period basis obvious in your own work
- It matches how formulas are written, so calculator and formula agree

With P/YR = 1, convert manually before entering:

| Compounding | N | I/YR |
|-------------|---|------|
| Annual | years | annual rate |
| Semiannual | years × 2 | rate ÷ 2 |
| Quarterly | years × 4 | rate ÷ 4 |
| Monthly | years × 12 | rate ÷ 12 |
| Daily | years × 365 | rate ÷ 365 |

**Example.** 6% annual rate, monthly compounding, 30 years → N = 360,
I/YR = 0.5. Both must be converted; converting one and not the other is a
frequent and costly slip.

## Pre-Flight Checklist

Before every problem:

1. **Clear** the TVM registers — stale values are the top error source
2. **Check** BEGIN/END matches the problem
3. **Check** P/YR is what you expect
4. **Convert** N and I/YR to the same period basis
5. **Set signs** so outflows are negative and inflows positive

## Common Pitfalls

- Not clearing registers, so a leftover PMT or FV corrupts the answer
- Leaving the calculator in BEGIN mode after an annuity due problem
- Entering N in years when payments are monthly
- Converting the rate but not the periods, or vice versa
- Entering the interest rate as a decimal (`0.06`) instead of a percent (`6`)
- Sign convention errors producing negative or nonsensical results

## Self-Check

**1. Why is the sign convention necessary at all?**

<details><summary>Answer</summary>
TVM mathematics requires that inflows and outflows be distinguishable. The
calculator uses sign to encode direction — negative for money leaving you,
positive for money coming to you. Without opposing signs on opposing flows the
equation has no valid solution.
</details>

**2. A 5% annual rate compounded quarterly over 8 years, with P/YR = 1. What are
N and I/YR?**

<details><summary>Answer</summary>
N = 8 × 4 = 32, and I/YR = 5 ÷ 4 = 1.25.
</details>

**3. Which mode for a lease with payments due on the first of each month, and why?**

<details><summary>Answer</summary>
BEGIN mode. Payments occur at the start of each period, making it an annuity due.
Each payment has an extra period to compound, so the value differs from the
END-mode result.
</details>

**4. A problem returns a wildly large FV. What do you check first?**

<details><summary>Answer</summary>
Whether the registers were cleared — a leftover PMT from the prior problem is the
most common cause. Then verify N and I/YR share a period basis, and that the
rate was entered as a percent rather than a decimal.
</details>

## Connections

- Applying these settings to actual problems: [3.2 — Time Value of Money Calculations](02-tvm-calculations.md)
- Choosing the rate to enter: [3.3 — The Importance of Interest Rate Assumptions](03-interest-rate-assumptions.md)
