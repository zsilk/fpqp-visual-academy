---
id: m3c3-interest-rate-assumptions
module: 3
chapter: "3.3"
title: The Importance of Interest Rate Assumptions
tags: [assumptions, inflation, real-return, sensitivity-analysis, nominal-rate]
see_also: [m3c2-tvm-calculations, m3c1-calculator-setup]
---

# 3.3 — The Importance of Interest Rate Assumptions

## Overview

Every projection in the previous chapter rested on an assumed rate, and that
assumption does more to determine the answer than any other input. A retirement
projection at 8% and the same projection at 6% can differ by hundreds of
thousands of dollars over a career — from a two-point change nobody can predict
with confidence.

This creates a professional obligation that's easy to state and easy to neglect:
disclose the assumptions, keep them defensible, and show the client how sensitive
the result is to being wrong. A single-point projection presented without
qualification implies a precision that does not exist.

## Choosing a Rate

### What the rate should reflect

The assumed rate should correspond to the **actual portfolio** funding the goal,
not to a generic market figure. Inputs to a defensible assumption:

- The asset allocation appropriate to the goal's time horizon and the client's
  risk capacity
- Long-run historical returns for those asset classes, treated as context rather
  than as a forecast
- Current conditions — starting valuations and interest rates affect forward
  returns
- **Costs**: fund expense ratios, advisory fees, and trading costs come directly
  off the return
- **Taxes**, where the assets are held in a taxable account

A common and consequential error is assuming a long-run equity return for a
portfolio that is 40% bonds, or using a gross return figure for a client who pays
1% in fees and taxes on top.

### Different rates for different purposes

There is no single correct rate across a plan:

| Application | Rate basis |
|-------------|-----------|
| Long-horizon retirement accumulation | Equity-weighted portfolio return, net of costs |
| Short-horizon goal in cash equivalents | Current money market or CD yields |
| Retirement distribution phase | More conservative — a lower-volatility allocation |
| Comparing debt paydown against investing | The debt's interest rate, which is a guaranteed return |
| Discounting an insurance need | Conservative, since the need is not optional |

That fifth row is worth internalizing: retiring a 20% credit card balance is a
guaranteed 20% return, and no investment assumption competes with it on a
risk-adjusted basis.

## The Danger of Overstating

Overstating the assumed return is the most consequential error in planning
projections, and it fails in a particular direction — it makes the client feel
adequately prepared when they are not.

An illustration. A client saving $500/month for 30 years:

| Assumed return | Ending balance |
|----------------|----------------|
| 4% | $347,024.70 |
| 6% | $502,257.52 |
| 8% | $745,179.71 |

The 8% assumption produces more than **twice** the 4% result from the same
contributions. If the plan assumed 8% and the portfolio delivers 5%, the client
arrives at retirement with a shortfall they no longer have time to correct.

The asymmetry matters: a conservative assumption that proves too pessimistic
leaves the client with a surplus, which is a good problem. An aggressive
assumption that proves too optimistic leaves a shortfall discovered too late to
fix. Given genuine uncertainty in both directions, the errors are not equally
costly — which argues for conservatism.

### Sensitivity analysis

The professional response to assumption uncertainty is not to guess better but to
**show the range**. Run the projection at several rates and present all of them.

This does three things: it's honest about uncertainty, it shows which assumptions
actually drive the outcome, and it converts the conversation from "will I have
enough?" to "under what conditions do I fall short, and what would I do about
it?" — a far more useful discussion.

## Inflation

### Why it can't be ignored

Inflation erodes purchasing power, and over a planning horizon the effect is
large. At 3% inflation, $100,000 of spending power today requires:

| Years out | Nominal dollars needed |
|-----------|------------------------|
| 10 | $134,392 |
| 20 | $180,611 |
| 30 | $242,726 |

A client planning to spend "$100,000 a year" in a retirement starting 30 years
from now is really planning to spend roughly $242,700 in the dollars of that
year. Ignoring inflation understates the requirement by more than half.

It also compounds *through* retirement, not just up to it. A 30-year retirement
means the last year's expenses far exceed the first's, which is why level-payment
projections understate the true need.

### Nominal vs. real returns

- **Nominal return** — the stated return, before adjusting for inflation
- **Real return** — the nominal return adjusted for inflation; what actually buys
  more goods

The approximation everyone reaches for first:

> Real ≈ Nominal − Inflation

Good enough for conversation, but not exact. The correct calculation:

> **Real rate = [(1 + nominal) ÷ (1 + inflation)] − 1**

### Worked example

Nominal return 7%, inflation 3%.

- Approximation: 7% − 3% = **4.00%**
- Exact: (1.07 ÷ 1.03) − 1 = **3.8835%**

The approximation overstates by about 0.12 percentage points. Small in one year;
meaningful over 30, and the program expects the exact method.

### Inflation-adjusted (real dollar) planning

Two internally consistent ways to run a projection:

1. **Nominal approach** — inflate the goal to future dollars, then discount at the
   nominal rate.
2. **Real approach** — keep the goal in today's dollars, and use the real rate as
   the input.

Both produce the same answer when done correctly. The error to avoid is **mixing
them**: using today's dollars for the goal while discounting at the nominal rate.
That understates the required savings substantially, and it's a frequent mistake
because both halves look reasonable in isolation.

The real-rate approach is usually easier to explain to clients, since the goal
stays in dollars they recognize.

### Worked example — inflation-adjusted retirement need

A client, 30 years from retirement, wants the equivalent of $60,000/year in
today's dollars for a 25-year retirement. Assume 3% inflation and a 7% nominal
return.

**Real approach:**

- Real rate = (1.07 ÷ 1.03) − 1 = 3.8835%
- PV of a 25-year, $60,000 annuity at 3.8835% = **$948,974.75** in today's dollars

That figure is the capital needed at retirement, expressed in today's purchasing
power. To express it in the nominal dollars of 30 years out, inflate it:
$948,974.75 × 1.03³⁰ = **$2,303,410.79**.

Both numbers are correct; they answer different questions. The first is what to
communicate to a client, because it's in dollars they can interpret. The second
is what will actually appear on the statement — and showing both prevents the
sticker shock that makes clients dismiss the projection as unrealistic.

## Other Assumptions Worth Disclosing

Rate and inflation get the attention, but a projection contains more:

- **Life expectancy** — planning to age 90 versus 100 changes the required
  capital materially, and longevity risk is asymmetric: outliving the money is
  far worse than leaving some behind
- **Contribution growth** — will savings rise with income, or stay level?
- **Tax rates in retirement** — often assumed lower, which is not reliably true
- **Social Security** — the benefit assumed, and its cost-of-living adjustment
- **Health care costs** — historically inflating faster than general prices
- **Sequence of returns** — an average return assumption hides the fact that poor
  returns early in retirement do disproportionate damage

## Common Pitfalls

- Using a single rate across a plan regardless of the portfolio funding each goal
- Assuming gross returns without subtracting fees, costs, and taxes
- Presenting a single-point projection as though it were a forecast
- Using the nominal − inflation shortcut where precision is required
- Mixing today's-dollar goals with nominal discount rates
- Applying inflation only up to retirement and not through it
- Failing to document the assumptions, so nobody can evaluate the projection later

## Self-Check

**1. Why is overstating the return worse than understating it?**

<details><summary>Answer</summary>
The errors aren't symmetric in consequence. Too conservative an assumption
produces a surplus. Too aggressive an assumption produces a shortfall that
surfaces at retirement, when there's no time left to correct it by saving more or
working longer.
</details>

**2. Compute the exact real return for a 6% nominal return with 2.5% inflation,
and compare to the approximation.**

<details><summary>Answer</summary>
Exact: (1.06 ÷ 1.025) − 1 = 3.4146%. Approximation: 6% − 2.5% = 3.5%. The
shortcut overstates by about 0.085 percentage points.
</details>

**3. What's wrong with stating a goal in today's dollars and discounting at the
nominal rate?**

<details><summary>Answer</summary>
It mixes two frameworks. Today's dollars must be paired with a real rate;
nominal rates must be paired with inflated future dollars. Mixing them
understates the required savings, because the goal isn't inflated but the
discount rate assumes it was.
</details>

**4. Why present a range of rates rather than one?**

<details><summary>Answer</summary>
Because no one can forecast returns reliably, and a single figure implies a
precision that doesn't exist. A range is honest about uncertainty, reveals which
assumptions drive the outcome, and shifts the conversation toward what the client
would do if returns disappoint.
</details>

**5. A client says they'll need "$80,000 a year" in a retirement 25 years out. At
3% inflation, what will that actually cost in year-one nominal dollars?**

<details><summary>Answer</summary>
$80,000 × 1.03²⁵ = $167,502. And it keeps rising through retirement — inflation
doesn't stop at the retirement date, so later years cost more still.
</details>

## Connections

- The calculations these assumptions feed: [3.2 — Time Value of Money Calculations](02-tvm-calculations.md)
- Comparing debt paydown to investing as a rate decision: [2.3 — Credit and Debt](../module-02-cash-management-debt/03-credit-and-debt.md)
- Expected returns by asset class: Module 6
- Retirement needs analysis applying all of this: Module 7
