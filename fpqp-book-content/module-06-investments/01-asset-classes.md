---
id: m6c1-asset-classes
module: 6
chapter: "6.1"
title: Asset Classes
tags: [asset-classes, cash-equivalents, stocks, bonds, real-estate, yield, fdic]
see_also: [m6c2-risk, m6c3-mutual-funds, m6c4-investment-decisions]
---

# 6.1 — Asset Classes

## Overview

An asset class is a group of investments sharing similar characteristics and
behaving similarly in the market. The reason classes matter is not taxonomy — it's
that different classes respond differently to the same conditions, and combining
imperfectly correlated classes is what makes diversification work.

The three core classes are **cash equivalents**, **fixed income (bonds)**, and
**equities (stocks)**, with **real estate** commonly treated as a fourth. Each
occupies a distinct position on the risk/return spectrum, and each serves a
different role in funding goals.

## Cash and Cash Equivalents

Short-term, highly liquid instruments with minimal principal risk. Their job in a
portfolio is **liquidity and stability**, not return.

### Why liquidity matters

Cash equivalents are what fund the emergency reserve and any goal inside roughly
a one-year horizon. The reason is asymmetry: money needed soon has no time to
recover from a decline, so certainty of principal outranks expected return. This
connects directly to the horizon logic from
[1.1](../module-01-financial-planning-process/01-planning-and-goals.md).

### The instruments

| Instrument | Description | Insurance / risk |
|-----------|-------------|------------------|
| **Money market deposit account** | Bank deposit account with limited transactions | FDIC insured |
| **Money market mutual fund** | Fund holding short-term debt instruments | **Not** FDIC insured |
| **Certificate of deposit (CD)** | Bank time deposit, fixed rate and term | FDIC insured; early withdrawal penalty |
| **Treasury bill** | U.S. government obligation, one year or less, sold at a discount | Backed by the U.S. government |
| **Savings account** | Basic bank deposit | FDIC insured |

### FDIC insurance

Federal Deposit Insurance Corporation coverage protects deposits at insured banks
up to a per-depositor, per-institution, per-ownership-category limit. Credit
unions have parallel coverage through the NCUA.

Two distinctions clients regularly miss:

- **Money market mutual funds are not FDIC insured**, despite the similar name to
  money market deposit accounts. They're securities, and while they aim to
  maintain a stable value, that isn't guaranteed.
- Coverage is per **ownership category**, so joint accounts, individual accounts,
  and certain retirement accounts each receive separate limits at the same bank.

### CDs

Fixed rate for a fixed term, with an early withdrawal penalty. **Laddering** —
staggering maturities across several dates — balances the higher yields of longer
terms against periodic access to principal, and reduces the risk of committing
everything at a single interest rate.

## Common Stock

Equity ownership in a corporation. The highest expected long-run return among the
core classes, and the highest volatility.

### What ownership conveys

- **Residual claim** on assets and earnings — shareholders are paid after
  creditors and bondholders, which is precisely why equities are riskier and
  command a higher expected return
- **Voting rights** on directors and major corporate matters, generally one vote
  per share; some companies issue multiple classes with unequal voting power
- **Limited liability** — a shareholder's loss is capped at their investment

### Capitalization

**Market capitalization = share price × shares outstanding.** The standard way of
segmenting equities into large-cap, mid-cap, and small-cap. Smaller companies
have historically shown higher volatility and higher expected returns; larger
companies are typically more stable and more liquid.

### Public and private ownership

Public companies trade on exchanges with substantial regulatory disclosure
requirements and ready liquidity. Private company shares don't trade publicly,
disclose far less, and are difficult to value and to sell — illiquidity that
matters greatly on a personal balance sheet and in estate settlement.

### Types of return from common stock

Two sources, and both count:

1. **Dividends** — distributions of earnings, at the board's discretion
2. **Capital appreciation** — increase in share price

> **Total return = (Ending value − Beginning value + Income) ÷ Beginning value**

**Worked example.** A stock purchased at $50 pays $2 in dividends over the year
and ends at $54.

```
Total return = ($54 − $50 + $2) ÷ $50 = $6 ÷ $50 = 12.0%
```

Reporting only the price change (8%) understates the result by a third. Dividends
are a substantial share of long-run equity return, which is also why indexed
annuity crediting that excludes them
([5.5](../module-05-life-health-disability/05-annuities.md)) gives up so much.

### Taxes and inflation

A nominal return is not what the investor keeps. Two deductions apply:

**Taxes.** Qualified dividends and long-term capital gains receive preferential
rates; ordinary dividends and short-term gains are taxed as ordinary income.

> **After-tax return = Nominal return × (1 − tax rate)**

**Inflation.** Then adjust for purchasing power, using the exact method from
[3.3](../module-03-time-value-of-money/03-interest-rate-assumptions.md):

> **Real return = [(1 + after-tax return) ÷ (1 + inflation)] − 1**

**Worked example — tax- and inflation-adjusted return.** A 9% nominal return, a
22% tax rate, and 3% inflation.

```
After-tax = 9% × (1 − 0.22) = 7.02%
Real      = (1.0702 ÷ 1.03) − 1 = 3.90%
```

A 9% headline return delivers **3.90%** of actual purchasing power gain. This
calculation is worth running for clients, because the gap between the two numbers
is far larger than most people assume — and it explains why tax-advantaged
accounts and asset location matter so much.

## Bonds

A bond is a loan to an issuer. The investor is a **creditor**, not an owner —
paid before shareholders, with a contractual right to interest and principal.

### Terminology

| Term | Meaning |
|------|---------|
| **Par / face value** | Amount repaid at maturity, conventionally $1,000 |
| **Coupon rate** | Stated annual interest rate, applied to par |
| **Maturity** | Date principal is repaid |
| **Current yield** | Annual coupon ÷ current market price |
| **Yield to maturity (YTM)** | Total return if held to maturity, including all coupons and any gain or loss versus par |
| **Indenture** | The contract specifying the issuer's obligations and any covenants |

### Issuers

| Issuer | Instrument | Key feature |
|--------|-----------|-------------|
| U.S. Treasury | Bills, notes, bonds | Backed by the U.S. government; interest exempt from **state** tax |
| Federal agencies | Agency securities | Slightly higher yield than Treasuries |
| Municipalities | Municipal bonds | Interest generally exempt from **federal** tax, and from state tax for in-state residents |
| Corporations | Corporate bonds | Higher yields, credit risk, fully taxable |

**Municipal bonds** are the classic asset-location decision. Their tax exemption
makes them attractive to high-bracket investors and unattractive to low-bracket
ones. The comparison uses **taxable equivalent yield**:

> **TEY = Tax-free yield ÷ (1 − marginal tax rate)**

**Worked example.** A 3.5% municipal yield for an investor in the 32% bracket:

```
TEY = 3.5% ÷ (1 − 0.32) = 3.5% ÷ 0.68 = 5.15%
```

The muni is equivalent to a **5.15%** taxable bond. For an investor in the 12%
bracket the same muni is worth only 3.98% equivalent — which is why municipal
bonds generally don't belong in a low-bracket investor's portfolio, and never in
a tax-deferred account.

### Par, discount, and premium

Bond prices move **inversely** to interest rates. This is the single most
important bond concept.

The reason is straightforward: a bond's coupon is fixed. If prevailing rates
rise, an existing bond paying less than the new market rate becomes less
attractive, so its price must fall until its yield matches. If rates fall, the
opposite occurs.

| Condition | Price | Relationship |
|-----------|-------|--------------|
| Coupon rate = market rate | **Par** | Current yield = coupon = YTM |
| Coupon rate < market rate | **Discount** (below par) | Current yield > coupon; YTM > current yield |
| Coupon rate > market rate | **Premium** (above par) | Current yield < coupon; YTM < current yield |

**Worked example — current yield.** A bond with a 5% coupon ($50 annually on
$1,000 par) trading at $900:

```
Current yield = $50 ÷ $900 = 5.56%
```

Trading at a discount, so current yield exceeds the coupon rate. YTM would be
higher still, because the holder also collects a $100 gain at maturity.

**Duration** measures price sensitivity to rate changes — longer maturities and
lower coupons produce greater sensitivity. A long-maturity bond is far more
volatile in response to rate moves than a short one, which is why bond maturity
should be matched to horizon just as asset class is.

### Bond ratings

Agencies — Moody's, Standard & Poor's, Fitch — assess credit risk.

| Grade | S&P / Fitch | Moody's |
|-------|-------------|---------|
| **Investment grade** | AAA to BBB− | Aaa to Baa3 |
| **Speculative / high yield ("junk")** | BB+ and below | Ba1 and below |

The **BBB−/Baa3 boundary** is the investment grade line and is directly testable.
Lower ratings mean higher default risk and therefore higher yields — the yield
premium is compensation for that risk, not free extra return.

### Call provisions

A **call provision** lets the issuer redeem the bond before maturity, typically
when rates have fallen and the issuer wants to refinance more cheaply.

This works against the investor, and precisely when it hurts: the bond is called
after rates drop, so the investor loses an above-market coupon and must reinvest
at lower prevailing rates — **reinvestment risk**. Callable bonds therefore offer
higher yields as compensation. **Yield to call** is the relevant measure for a
bond likely to be called.

## Real Estate

### Types

- **Direct ownership** — residence, rental property, raw land, commercial property
- **REITs** — Real Estate Investment Trusts, which hold portfolios of property or
  mortgages and trade like securities. Required to distribute most taxable income
  to shareholders, so they typically yield well; distributions are largely
  ordinary income
- **Real estate limited partnerships** — pooled direct investment, illiquid

### Advantages

- Potential appreciation and rental income
- Diversification, since real estate correlates imperfectly with stocks and bonds
- Leverage — property can be purchased with borrowed money, amplifying returns
- Tax benefits including depreciation deductions and, for a primary residence,
  the capital gain exclusion on sale
- Some inflation-hedging characteristics, since rents and values often rise with
  prices

### Disadvantages

- **Illiquidity** — sales take time and carry high transaction costs
- High unit cost, producing concentration in a single property
- Management burden for direct ownership
- Leverage amplifies losses as well as gains
- Valuation is imprecise without a sale
- Property-specific and location risk

REITs address the liquidity and unit-cost problems while giving up direct control
and the leverage benefits.

## Comparing the Classes

| Class | Expected return | Volatility | Liquidity | Primary role |
|-------|----------------|------------|-----------|--------------|
| Cash equivalents | Lowest | Lowest | Highest | Reserve, near-term goals |
| Bonds | Moderate | Moderate | Generally good | Income, stability, diversification |
| Stocks | Highest | High | Good for public equities | Long-term growth |
| Real estate | Moderate to high | Moderate to high | **Low** for direct ownership | Diversification, income, inflation hedge |

The pattern is consistent — higher expected return comes with higher volatility
and often with less liquidity. That relationship is the subject of
[6.2](02-risk.md).

## Common Pitfalls

- Assuming money market mutual funds carry FDIC insurance
- Measuring stock return by price change alone and ignoring dividends
- Comparing nominal returns without adjusting for taxes and inflation
- Forgetting that bond prices move inversely to rates
- Holding municipal bonds in a tax-deferred account or in a low bracket
- Overlooking call provisions and the reinvestment risk they create
- Treating high-yield bonds as fixed income "with a bit more yield" rather than as credit risk
- Underestimating the illiquidity and transaction costs of direct real estate

## Self-Check

**1. Why do bond prices fall when interest rates rise?**

<details><summary>Answer</summary>
The coupon is fixed. When prevailing rates rise, an existing bond paying below
the new market rate is less attractive, so its price must fall until its yield to
maturity matches what's available on new issues.
</details>

**2. A 4% municipal bond, investor in the 35% bracket. Taxable equivalent yield?**

<details><summary>Answer</summary>
TEY = 4% ÷ (1 − 0.35) = 4% ÷ 0.65 = **6.15%**. The investor would need a 6.15%
taxable yield to match the muni after tax.
</details>

**3. A stock bought at $80 pays $3 in dividends and ends the year at $85. Total return?**

<details><summary>Answer</summary>
($85 − $80 + $3) ÷ $80 = $8 ÷ $80 = **10.0%**. Price appreciation alone would
show only 6.25%.
</details>

**4. Why does a call provision disadvantage the bondholder?**

<details><summary>Answer</summary>
Issuers call bonds when rates have fallen, so the investor loses an above-market
coupon and must reinvest at lower prevailing rates. The call caps upside while
leaving downside intact, which is why callable bonds pay higher yields.
</details>

**5. Compute the real, after-tax return on a 10% nominal return at a 24% tax rate
with 3.5% inflation.**

<details><summary>Answer</summary>
After-tax = 10% × 0.76 = 7.6%. Real = (1.076 ÷ 1.035) − 1 = **3.96%**. The
headline 10% delivers under 4% of real purchasing power gain.
</details>

**6. Which rating boundary separates investment grade from speculative?**

<details><summary>Answer</summary>
BBB− (S&P and Fitch) or Baa3 (Moody's). At or above is investment grade; below is
speculative or high yield.
</details>

## Connections

- How risk in these classes is categorized and measured: [6.2 — Types and Measurements of Risk](02-risk.md)
- Pooled vehicles for accessing them: [6.3 — Mutual Funds](03-mutual-funds.md)
- Combining classes into a portfolio: [6.4 — Investment Decisions](04-investment-decisions.md)
- Horizon-driven asset selection: [1.1 — Personal Financial Planning and Financial Goals](../module-01-financial-planning-process/01-planning-and-goals.md)
- Real versus nominal return mechanics: [3.3 — Interest Rate Assumptions](../module-03-time-value-of-money/03-interest-rate-assumptions.md)
