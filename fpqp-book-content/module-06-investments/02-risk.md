---
id: m6c2-risk
module: 6
chapter: "6.2"
title: Types and Measurements of Risk
tags: [systematic-risk, unsystematic-risk, standard-deviation, beta, diversification, risk-adjusted-return]
see_also: [m6c1-asset-classes, m6c4-investment-decisions]
---

# 6.2 — Types and Measurements of Risk

## Overview

In investing, "risk" means variability of returns — the chance that the outcome
differs from the expectation, in either direction. That's narrower than the
colloquial sense of "chance of losing money," and the difference matters, because
the standard measures treat upside and downside deviation identically.

The organizing distinction in this chapter is between risk that **diversification
can eliminate** and risk that it cannot. That single split explains why
diversification works, why it has limits, and why investors are compensated for
some risks but not others.

## Systematic vs. Unsystematic Risk

### Systematic risk (market risk, non-diversifiable)

Affects the entire market or broad asset classes. It cannot be diversified away,
because it moves everything together. Holding more securities does not help.

| Risk | Description |
|------|-------------|
| **Market risk** | Broad market movements affecting nearly all securities |
| **Interest rate risk** | Rate changes altering security values — bonds especially |
| **Purchasing power (inflation) risk** | Inflation eroding real returns |
| **Reinvestment rate risk** | Having to reinvest cash flows at lower rates |
| **Exchange rate risk** | Currency fluctuations affecting foreign holdings |

A useful mnemonic: **PRIME** — Purchasing power, Reinvestment, Interest rate,
Market, Exchange rate.

Because systematic risk cannot be diversified away, it is the risk the market
**compensates** investors for bearing. That's the theoretical basis for expecting
higher returns from riskier asset classes.

### Unsystematic risk (unique, diversifiable)

Specific to an individual company, industry, or sector. It **can** be
substantially eliminated through diversification.

| Risk | Description |
|------|-------------|
| **Business risk** | Company-specific operating problems — bad management, lost customers |
| **Financial risk** | Risk from the company's use of leverage |
| **Default (credit) risk** | An issuer failing to pay interest or principal |
| **Liquidity / marketability risk** | Inability to sell promptly at a fair price |
| **Political / regulatory risk** | Legal or regulatory changes affecting a company or industry |
| **Tax risk** | Adverse changes in tax treatment |

Because it can be diversified away at essentially no cost, unsystematic risk is
**not compensated**. An investor holding a single stock bears both systematic and
unsystematic risk but is only rewarded for the systematic portion — which is the
precise argument against concentrated positions, including employer stock.

### How diversification works

Combining securities whose returns don't move perfectly together reduces
portfolio variability, because losses in one holding are partly offset by gains
in another.

**Correlation** measures how closely two assets move together, ranging from +1.0
(perfectly together) to −1.0 (perfectly opposite), with 0 meaning no
relationship. The lower the correlation, the greater the diversification benefit.

Two implications worth holding onto:

- Combining assets with correlations below +1.0 reduces portfolio risk **without
  necessarily reducing expected return** — the closest thing to a free lunch in
  finance
- Most unsystematic risk is eliminated with a moderate number of well-chosen
  securities across industries; beyond that, additional holdings add little. What
  remains is systematic risk, which is the floor diversification cannot go below

The practical failure mode is *apparent* diversification: twenty holdings all in
the same sector, or a portfolio of funds that all hold the same large-cap stocks.
Diversification requires low correlation, not merely many positions.

## Measuring Risk

### Standard deviation

Measures **total** risk — the dispersion of returns around their average. Higher
standard deviation means more variability and less predictable outcomes.

Under a normal distribution:

| Range | Probability |
|-------|-------------|
| Mean ± 1 standard deviation | ≈ 68% |
| Mean ± 2 standard deviations | ≈ 95% |
| Mean ± 3 standard deviations | ≈ 99.7% |

**Worked example.** A fund with a 9% average return and a 15% standard deviation.

- About **68%** of years fall between −6% and +24%  (9 ± 15)
- About **95%** of years fall between −21% and +39%  (9 ± 30)

That second range is what makes the number concrete for clients. A 15% standard
deviation sounds abstract; "a 21% loss year is well within normal" does not.

Two caveats worth stating: standard deviation treats upside and downside
deviation identically, and real return distributions have fatter tails than the
normal distribution implies — extreme events occur more often than the model
suggests.

Standard deviation captures **total** risk, systematic and unsystematic together,
which makes it the right measure for evaluating a **whole portfolio**.

### Beta

Measures **systematic** risk only — an investment's volatility relative to the
overall market.

| Beta | Interpretation |
|------|----------------|
| **1.0** | Moves with the market |
| **> 1.0** | More volatile than the market — a beta of 1.3 suggests ~13% move for a 10% market move |
| **< 1.0** | Less volatile — a beta of 0.7 suggests ~7% move for a 10% market move |
| **0** | Uncorrelated with the market |
| **Negative** | Tends to move opposite the market |

Beta is the appropriate measure for a security held **within** an already
diversified portfolio, because at that point unsystematic risk has already been
diversified away and only the systematic contribution matters.

**Standard deviation for the whole portfolio; beta for a component within a
diversified one.** That distinction is directly testable.

## Risk-Adjusted Return

Comparing raw returns across investments is misleading, because a higher return
achieved with far more risk isn't necessarily better. Risk-adjusted measures put
them on comparable footing.

### The Sharpe ratio

> **Sharpe = (Portfolio return − Risk-free rate) ÷ Standard deviation**

Excess return earned per unit of **total** risk. Higher is better. It uses
standard deviation, so it's appropriate for comparing whole portfolios.

### Worked example — risk-adjusted return

Two funds, with a risk-free rate of 3%:

| | Fund A | Fund B |
|---|--------|--------|
| Return | 12% | 9% |
| Standard deviation | 20% | 10% |
| Sharpe ratio | (12 − 3) ÷ 20 = **0.45** | (9 − 3) ÷ 10 = **0.60** |

Fund A produced the higher raw return, but Fund B delivered more excess return
per unit of risk. On a risk-adjusted basis **Fund B is superior**, despite
trailing by three percentage points.

This is the central lesson: raw return alone is an incomplete basis for
comparison, and the fund that tops a performance table often did so by taking
more risk.

### The Treynor ratio

> **Treynor = (Portfolio return − Risk-free rate) ÷ Beta**

The same idea using **beta** instead of standard deviation, so it measures excess
return per unit of **systematic** risk. Appropriate for evaluating a component
within a diversified portfolio.

### Alpha

The return earned **above** what the investment's risk level would predict.
Positive alpha suggests outperformance on a risk-adjusted basis; negative alpha
suggests the opposite. Often used to assess whether active management added value
beyond what the risk taken would justify.

## Risk Tolerance and Risk Capacity

Revisiting the distinction from
[1.1](../module-01-financial-planning-process/01-planning-and-goals.md), now with
the measurement vocabulary:

- **Risk tolerance** — how much volatility the client can accept *emotionally*
- **Risk capacity** — how much loss they can absorb *financially* without
  derailing goals

Plan to the **lower** of the two. A client whose capacity is high but tolerance is
low will abandon the strategy in a drawdown, converting a paper loss into a
permanent one — so the emotionally sustainable portfolio outperforms the
theoretically optimal one the client won't hold.

Time horizon drives capacity directly: a longer horizon allows recovery from
losses, so it supports more volatility.

## Common Pitfalls

- Believing diversification reduces systematic risk — it doesn't
- Holding many positions that are highly correlated and calling it diversified
- Expecting compensation for unsystematic risk, which the market doesn't reward
- Comparing raw returns without adjusting for the risk taken
- Applying beta to an undiversified portfolio, where unsystematic risk still dominates
- Treating standard deviation as a hard bound rather than a probabilistic measure
- Assuming return distributions are normal, understating extreme events
- Building to risk tolerance while ignoring risk capacity, or the reverse

## Self-Check

**1. Why is unsystematic risk not compensated by the market?**

<details><summary>Answer</summary>
It can be eliminated through diversification at essentially no cost. Investors
aren't rewarded for bearing a risk they could have removed for free, so expected
return compensates only systematic risk.
</details>

**2. When is standard deviation the right measure, and when is beta?**

<details><summary>Answer</summary>
Standard deviation measures total risk and is appropriate for evaluating a whole
portfolio. Beta measures systematic risk only and is appropriate for a security
held within an already diversified portfolio, where unsystematic risk has already
been diversified away.
</details>

**3. A portfolio returns 11% with a standard deviation of 14%. Roughly what range
covers about 95% of years?**

<details><summary>Answer</summary>
Two standard deviations: 11 ± 28, so about **−17% to +39%**. The downside figure
is the one worth showing a client before they commit.
</details>

**4. Fund X returns 14% with an 18% standard deviation; Fund Y returns 10% with a
9% standard deviation. Risk-free rate 3%. Which is better risk-adjusted?**

<details><summary>Answer</summary>
Fund X Sharpe = (14 − 3) ÷ 18 = 0.61. Fund Y Sharpe = (10 − 3) ÷ 9 = 0.78. **Fund
Y** delivers more excess return per unit of risk despite the lower raw return.
</details>

**5. What does a beta of 0.8 mean?**

<details><summary>Answer</summary>
The security has historically moved about 80% as much as the market — roughly an
8% move for a 10% market move, in either direction. It's less volatile than the
market with respect to systematic risk.
</details>

**6. Why can't diversification protect against inflation risk?**

<details><summary>Answer</summary>
Inflation (purchasing power) risk is systematic — it affects the entire market
rather than individual securities. Adding holdings doesn't help; only asset
classes with different inflation sensitivity, such as real assets or
inflation-indexed bonds, address it.
</details>

## Connections

- The asset classes these risks apply to: [6.1 — Asset Classes](01-asset-classes.md)
- Diversifying efficiently through pooled vehicles: [6.3 — Mutual Funds](03-mutual-funds.md)
- Translating risk into an allocation: [6.4 — Investment Decisions](04-investment-decisions.md)
- Tolerance versus capacity: [1.1 — Personal Financial Planning and Financial Goals](../module-01-financial-planning-process/01-planning-and-goals.md)
- Behavioral biases that surface during drawdowns: [1.4 — Client Behaviors](../module-01-financial-planning-process/04-client-behaviors.md)
