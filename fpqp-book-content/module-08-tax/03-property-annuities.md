---
id: m8c3-property-annuities
module: 8
chapter: "8.3"
title: Taxation of Property, Annuities, and Collectibles
tags: [basis, holding-period, capital-gain, step-up, like-kind-exchange, section-121, collectibles]
see_also: [m8c2-federal-tax-calculation, m8c6-tax-planning, m5c5-annuities]
---

# 8.3 — Taxation of Property, Annuities, and Collectibles

## Overview

Selling property triggers a gain or loss, and computing it requires two inputs:
**basis** and **amount realized**. Getting basis right is where most of the
difficulty lies, because it changes over time and depends on how the property was
acquired.

The chapter's other theme is that not all gains are taxed alike. Holding period,
asset type, and the nature of the disposition all shift the result — sometimes
dramatically, as with the step-up in basis at death.

> **Note on figures.** Rates, exclusion amounts, and thresholds are indexed and
> subject to legislation. Verify current figures against IRS publications.

## Basis

**Basis** is the taxpayer's investment in the property for tax purposes — the
amount recovered tax-free on sale.

### Original basis

Generally **cost**, including purchase price plus acquisition costs such as
commissions, sales tax, freight, and installation. For real property it includes
closing costs like title fees and recording charges.

### Adjusted basis

Basis changes over the holding period:

| Increases basis | Decreases basis |
|-----------------|-----------------|
| Capital improvements | Depreciation taken (or allowable) |
| Legal fees defending title | Casualty loss deductions claimed |
| Assessments for local improvements | Return-of-capital distributions |
| Reinvested dividends (in a fund) | Certain tax credits claimed |

> **Adjusted basis = Original basis + Additions − Reductions**

Two items generate persistent errors:

**Reinvested dividends.** In a mutual fund held in a taxable account, reinvested
distributions were already taxed in the year received and therefore **increase
basis**. Failing to track them means reporting an inflated gain and paying tax
twice on the same money.

**Depreciation.** Basis is reduced by depreciation **allowable**, whether or not
actually claimed. A taxpayer who neglected to depreciate a rental still reduces
basis — the deduction is lost, and the basis reduction happens anyway.

### Basis of property acquired other than by purchase

| How acquired | Basis rule |
|--------------|-----------|
| **Inheritance** | **Stepped up (or down) to fair market value** at the date of death (or alternate valuation date) |
| **Gift — for gain** | **Carryover** of the donor's adjusted basis |
| **Gift — for loss** | **Lesser** of donor's basis or FMV at the date of gift |
| Property from a spouse | Carryover basis; transfers between spouses are generally nontaxable |

The **step-up at death** is one of the most consequential rules in the code.
Appreciation during the decedent's lifetime **escapes income tax entirely**. An
asset bought for $50,000 and worth $400,000 at death passes to heirs with a
$400,000 basis; if they sell immediately, there is no taxable gain.

This produces a direct conflict with lifetime gifting, and it's the interaction
flagged back in
[1.3](../module-01-financial-planning-process/03-knowledge-domains.md):

- **Gifting appreciated property** during life carries over the low basis, so the
  recipient inherits the built-in gain
- **Holding until death** delivers a step-up and eliminates the gain

The planning implication is a useful rule of thumb: **gift cash or high-basis
assets; bequeath low-basis appreciated assets.** Doing the reverse creates
avoidable tax.

The **dual basis rule for gifts** — carryover for gain, lesser-of for loss —
exists to prevent shifting a built-in loss to another taxpayer. A practical
consequence: a donor should generally **sell** depreciated property, claim the
loss, and gift the proceeds, rather than gifting the property itself.

## Holding Period

Determines whether a gain is short-term or long-term.

| Holding period | Character |
|----------------|-----------|
| **One year or less** | **Short-term** — taxed at ordinary rates |
| **More than one year** | **Long-term** — preferential rates |

The period begins the **day after** acquisition and includes the disposition
date.

Special rules:

- **Inherited property** is **always long-term**, regardless of how briefly the
  heir held it
- **Gifted property** generally **tacks** the donor's holding period when
  carryover basis applies

## Class of Property

| Class | Description | Gain treatment |
|-------|-------------|----------------|
| **Capital assets** | Most property held for investment or personal use | Capital gain or loss |
| **Ordinary income property** | Inventory, receivables, property held for sale to customers | Ordinary income |
| **Section 1231 property** | Depreciable property and land used in a trade or business | Net gain generally long-term capital; net loss generally ordinary — favorable both ways |

**Depreciation recapture** limits the favorable treatment on business property.
Gain attributable to prior depreciation is recaptured — taxed as ordinary income
for personal property under Section 1245, and for real property under Section
1250 at a maximum rate applied to unrecaptured Section 1250 gain. The effect is
that depreciation deductions taken at ordinary rates are, in substance, repaid at
sale.

Losses on **personal-use property** — a residence sold at a loss, a personal
vehicle — are **not deductible**. Gains on the same property are taxable. The
asymmetry surprises clients regularly.

## Calculating Capital Gain or Loss

> **Amount realized − Adjusted basis = Gain or loss**

**Amount realized** = sale price − selling expenses (commissions, closing costs).

### Netting capital gains and losses

A defined sequence:

1. Net short-term gains against short-term losses
2. Net long-term gains against long-term losses
3. Net the two results against each other

If the result is a **net loss**, a limited amount is deductible against ordinary
income each year, with the remainder **carried forward indefinitely**, retaining
its short- or long-term character.

### Worked example

A client sells stock held three years:

- Purchase price: $28,000, plus $150 commission → **basis $28,150**
- Sale price: $47,000, less $200 commission → **amount realized $46,800**
- **Long-term capital gain = $46,800 − $28,150 = $18,650**

Same year, they sell another position at a **$6,000 short-term loss**.

After netting, the client reports a **net long-term gain of $12,650**, taxed at
preferential rates. The short-term loss offset gain that would have been taxed at
the preferential rate — which is why, given a choice, it's generally better to
offset **short-term gains** (ordinary rates) with losses than long-term gains.

### The wash sale rule

A loss is **disallowed** if substantially identical securities are purchased
within **30 days before or after** the sale — a 61-day window centered on the
sale date.

The disallowed loss isn't permanently lost; it's **added to the basis** of the
replacement shares, deferring rather than eliminating it. The rule applies to
purchases in the taxpayer's IRA as well, and in that case the loss **is**
permanently lost, since IRA basis provides no benefit.

This rule constrains tax-loss harvesting: the position can be replaced with a
similar but not substantially identical security to maintain market exposure.

## Nonrecognition Provisions

Situations where gain isn't currently recognized.

### Section 121 — sale of a principal residence

Excludes gain on the sale of a principal residence, up to a stated amount
(doubled for married filing jointly), provided the taxpayer **owned and used** the
property as a principal residence for at least **two of the five years** preceding
the sale. Generally available once every two years.

Partial exclusions may apply for a sale caused by a change in employment, health,
or other unforeseen circumstances.

This is among the most valuable provisions available to ordinary taxpayers, and
the two-of-five-year test is directly testable.

### Section 1031 — like-kind exchanges

Deferral of gain on the exchange of **real property held for productive use in a
trade or business or for investment**. Following legislative change, like-kind
treatment applies **only to real property** — personal property no longer
qualifies.

Strict timing applies: replacement property must be **identified within 45 days**
and the exchange **completed within 180 days**. Receiving **boot** — cash or
non-like-kind property — triggers recognition to that extent. Basis carries over,
adjusted, so the deferred gain is preserved for a later sale.

### Other nonrecognition provisions

- **Installment sales** — gain recognized proportionally as payments are received,
  spreading income across years
- **Involuntary conversions** — deferral where insurance or condemnation proceeds
  are reinvested in similar property within a statutory period
- **Transfers between spouses** — generally nontaxable, with carryover basis

## Taxation of Annuities

Building on [5.5](../module-05-life-health-disability/05-annuities.md).

### Non-qualified deferred annuities

Funded with **after-tax** dollars, so the owner has basis. Growth is
**tax-deferred**.

**Withdrawals before annuitization** follow **last-in, first-out**: earnings come
out first and are taxed as **ordinary income** — never capital gain, regardless of
how the underlying growth was generated. A **10% penalty** applies to the taxable
portion before age 59½, subject to exceptions.

### Annuitization and the exclusion ratio

Once annuitized, each payment splits between tax-free return of basis and taxable
earnings:

> **Exclusion ratio = Investment in the contract ÷ Expected total return**

**Worked example.** A client invested $90,000 in a non-qualified annuity. It now
pays $1,000/month for a life expectancy of 20 years.

```
Expected total return = $1,000 × 12 × 20 = $240,000
Exclusion ratio       = $90,000 ÷ $240,000 = 37.5%
Tax-free per payment  = $1,000 × 37.5% = $375
Taxable per payment   = $625
```

Once basis is **fully recovered**, subsequent payments are **fully taxable**. If
the annuitant dies before recovering basis, the unrecovered amount is generally
deductible on the final return.

### Fixed vs. variable

The exclusion ratio approach applies to **fixed** annuities, where payments are
level. **Variable** annuities use an **excludable amount per payment** rather than
a ratio, since payment amounts fluctuate.

**Partial annuitization** allows annuitizing part of a contract while leaving the
rest deferred, with basis allocated between the portions.

### Death benefits

Annuity death benefits receive **no step-up in basis**. Beneficiaries owe
**ordinary income** tax on the gain — a sharp contrast with appreciated securities
in a taxable account, which do receive a step-up. This makes annuities relatively
poor assets to leave to heirs, and a relevant point when deciding which assets to
spend down first.

## Taxation of Collectibles

Collectibles — art, antiques, rare coins, stamps, gems, precious metals, and
certain other tangible personal property — are taxed at a **maximum rate of 28%**
on long-term gains, higher than the top rate on other long-term capital gains.

Notably, this treatment extends to **precious metals ETFs** structured as grantor
trusts holding physical metal, which surprises investors who assume ETF treatment
follows other securities.

Short-term collectible gains are taxed at ordinary rates like any other
short-term gain. Losses on collectibles held for **personal use** are not
deductible; losses on collectibles held for **investment** are.

## Common Pitfalls

- Failing to add reinvested distributions to basis, double-taxing the gain
- Forgetting that basis is reduced by depreciation allowable even if never claimed
- Gifting appreciated property that would have received a step-up at death
- Gifting depreciated property rather than selling it and gifting proceeds
- Triggering a wash sale, especially by repurchasing in an IRA where the loss is permanently lost
- Missing the two-of-five-year test for the residence exclusion
- Blowing Section 1031's 45- and 180-day deadlines
- Expecting capital gain treatment on annuity growth
- Assuming annuity beneficiaries receive a step-up
- Overlooking the 28% collectibles rate, including on metals ETFs

## Self-Check

**1. Explain the step-up in basis and its planning implication.**

<details><summary>Answer</summary>
Inherited property takes a basis equal to fair market value at death, so
appreciation during the decedent's lifetime escapes income tax entirely. The
implication is to gift cash or high-basis assets during life and bequeath
low-basis appreciated assets at death.
</details>

**2. A client gifts stock with a $20,000 basis now worth $12,000. The recipient
sells for $10,000. What's the loss?**

<details><summary>Answer</summary>
For loss purposes, basis is the lesser of the donor's basis ($20,000) or FMV at
the gift date ($12,000) — so $12,000. The loss is $2,000. The $8,000 of decline
during the donor's ownership is lost to both parties, which is why the donor
should have sold and gifted the proceeds.
</details>

**3. What is the wash sale rule and why does an IRA repurchase make it worse?**

<details><summary>Answer</summary>
A loss is disallowed if substantially identical securities are bought within 30
days before or after the sale. Normally the disallowed loss is added to the
replacement shares' basis, deferring it. If the repurchase occurs in an IRA,
there's no basis benefit to preserve, so the loss is permanently lost.
</details>

**4. A client invested $60,000 in an annuity now paying $800/month for a 25-year
life expectancy. Compute the exclusion ratio and the taxable portion.**

<details><summary>Answer</summary>
Expected return = $800 × 12 × 25 = $240,000. Exclusion ratio = $60,000 ÷ $240,000
= 25%. Tax-free per payment = $200; taxable = $600. Once the full $60,000 basis
is recovered, payments become fully taxable.
</details>

**5. State the Section 121 requirements.**

<details><summary>Answer</summary>
The taxpayer must have owned and used the property as a principal residence for
at least two of the five years preceding the sale, and the exclusion is generally
available only once every two years. It excludes gain up to a stated amount,
doubled for married filing jointly.
</details>

**6. Why are collectibles taxed differently, and what's the trap for metals investors?**

<details><summary>Answer</summary>
Long-term gains on collectibles face a maximum 28% rate rather than the lower
rates on other long-term capital gains. The trap is that precious metals ETFs
structured as grantor trusts holding physical metal receive collectibles
treatment, not ordinary securities treatment.
</details>

## Connections

- Where gains enter the return: [8.2 — Federal Tax Calculation](02-federal-tax-calculation.md)
- Income character fundamentals: [8.1 — Types of Taxes and Income](01-types-of-taxes.md)
- Harvesting and gain-timing strategies: [8.6 — Tax Planning Strategies](06-tax-planning.md)
- Annuity structure and products: [5.5 — Annuities](../module-05-life-health-disability/05-annuities.md)
- Step-up, gifting, and estate transfer: Module 9
