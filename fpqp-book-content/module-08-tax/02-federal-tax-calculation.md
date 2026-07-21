---
id: m8c2-federal-tax-calculation
module: 8
chapter: "8.2"
title: Federal Tax Calculation
tags: [form-1040, filing-status, agi, magi, standard-deduction, itemized-deductions, credits, withholding]
see_also: [m8c1-types-of-taxes, m8c3-property-annuities, m8c6-tax-planning]
---

# 8.2 — Federal Tax Calculation

## Overview

The individual income tax computation follows a fixed sequence, and knowing the
sequence is most of the skill. Each step narrows the amount subject to tax, and
where an item enters the sequence determines how much it's worth.

The essential structure:

```
     Gross income
   − Adjustments ("above-the-line" deductions)
   = Adjusted Gross Income (AGI)
   − Standard deduction OR itemized deductions
   − Qualified business income deduction (if applicable)
   = Taxable income
   × Tax rates (bracketed)
   = Tax liability
   − Credits
   + Additional taxes
   − Payments and withholding
   = Refund or amount owed
```

Two structural points drive most planning. **AGI is a gatekeeper** — many
deductions, credits, and phaseouts key off it, so reducing AGI has effects beyond
the deduction itself. And **credits beat deductions**, for reasons developed below.

> **Note on figures.** All dollar amounts, brackets, and thresholds are indexed
> annually. This chapter describes structure — verify current figures against IRS
> publications.

## Forms and Schedules

**Form 1040** is the individual return. Common attachments:

| Schedule | Purpose |
|----------|---------|
| Schedule 1 | Additional income and adjustments to income |
| Schedule 2 | Additional taxes |
| Schedule 3 | Additional credits and payments |
| Schedule A | Itemized deductions |
| Schedule B | Interest and ordinary dividends |
| Schedule C | Profit or loss from a sole proprietorship |
| Schedule D | Capital gains and losses |
| Schedule E | Rental, royalty, partnership, S corp, trust income |
| Schedule SE | Self-employment tax |

Information returns feed the process: **W-2** for wages, the **1099** series for
interest, dividends, proceeds, and nonemployee compensation, **K-1** for
pass-through entities, and **1098** for mortgage interest and tuition.

## Who Should File

Filing is required when gross income exceeds a threshold based on filing status,
age, and dependency status — with a much lower threshold for self-employment
income.

Filing when **not** required is often worthwhile, since it's the only way to
obtain a refund of withheld tax or to claim **refundable** credits, which can
produce a payment even with no tax liability.

## Filing Status

Determined by marital status **on the last day of the tax year**, and it governs
bracket widths, the standard deduction, and many phaseout thresholds.

| Status | Requirements |
|--------|--------------|
| **Single** | Unmarried, not qualifying for another status |
| **Married filing jointly (MFJ)** | Married; both report on one return with joint and several liability |
| **Married filing separately (MFS)** | Married, filing individually — usually least favorable |
| **Head of household (HOH)** | Unmarried, paid more than half the cost of maintaining a home for a qualifying person more than half the year |
| **Qualifying surviving spouse** | Available for two years after a spouse's death, with a dependent child; uses MFJ brackets |

**MFJ** is generally most favorable. **MFS** is usually worse — it restricts or
eliminates several credits and deductions — but is occasionally justified where
one spouse has large medical expenses measured against a smaller AGI, or where
there's concern about the other spouse's return.

**HOH** is materially better than single: wider brackets and a larger standard
deduction. The "qualifying person" requirement is specific, and misapplying HOH is
a frequent error.

## Dependents

A dependent is either a **qualifying child** or a **qualifying relative**, each
with its own tests.

**Qualifying child** tests: relationship, age (under 19, or under 24 if a
full-time student, or any age if permanently disabled), residency (more than half
the year), support (the child didn't provide more than half their own support),
and joint return limitations.

**Qualifying relative** tests: not a qualifying child, a relationship or
full-year household membership, gross income below a threshold, and support
(the taxpayer provided more than half).

Dependency status drives eligibility for the child tax credit, the credit for
other dependents, education credits, the dependent care credit, and head of
household status.

## Determining Taxable Income

### Gross income

All income from whatever source derived, unless specifically excluded. Includes
wages, business income, interest, dividends, capital gains, rents, royalties,
pensions, taxable retirement distributions, alimony under pre-2019 agreements,
and taxable unemployment compensation.

**Common exclusions**: gifts and inheritances received, life insurance death
benefits, qualified municipal bond interest, qualified Roth distributions,
qualified HSA distributions, most employer-provided health coverage, gain on a
principal residence within the exclusion, and qualified scholarships.

### Adjustments to income

Subtracted from gross income to reach AGI, and available **whether or not** the
taxpayer itemizes — which is why they're called above-the-line and why they're
generally more valuable than itemized deductions.

Common adjustments include deductible IRA contributions, HSA contributions,
student loan interest (subject to phaseout), the deductible portion of
self-employment tax, self-employed health insurance premiums, self-employed
retirement plan contributions, and educator expenses.

### Adjusted gross income

The pivot point of the return. AGI (and **modified AGI**, which adds back
specified items and varies by provision) determines:

- The medical expense deduction floor
- IRA deductibility and Roth contribution eligibility
- Education credit and student loan interest phaseouts
- Child tax credit and dependent care credit phaseouts
- Net investment income tax exposure
- Taxation of Social Security benefits
- IRMAA Medicare premium surcharges

Because AGI cascades through so many provisions, an above-the-line deduction is
frequently worth more than its face value — it can restore eligibility for
benefits that phase out. This is a genuine planning insight, not a technicality.

### Standard vs. itemized deductions

Taxpayers take the **greater** of the standard deduction or total itemized
deductions. The standard deduction is a fixed amount by filing status, with
additional amounts for taxpayers who are 65 or older or blind.

Since the standard deduction was substantially increased, the large majority of
taxpayers no longer itemize — which has practical consequences worth flagging to
clients: mortgage interest and charitable contributions produce **no tax benefit**
for a taxpayer taking the standard deduction. Advice premised on their
deductibility is simply wrong for most households.

### Schedule A — itemized deductions

| Category | Notes |
|----------|-------|
| **Medical and dental** | Only the portion exceeding a percentage-of-AGI floor |
| **State and local taxes (SALT)** | Income or sales tax, plus property tax, subject to an overall cap |
| **Mortgage interest** | On acquisition indebtedness within limits; home equity interest only if used to buy, build, or improve the residence |
| **Investment interest** | Limited to net investment income; excess carries forward |
| **Charitable contributions** | Subject to AGI percentage limits varying by gift type and recipient |
| **Casualty and theft losses** | Generally limited to federally declared disaster areas |

The medical floor is high enough that only substantial expenses relative to AGI
produce a deduction — which is why a low-AGI year is when medical deductions
become reachable.

### Qualified business income deduction

Owners of pass-through businesses may deduct a percentage of qualified business
income, subject to income thresholds and, above them, limitations based on wages
paid, property held, and whether the business is a specified service trade or
business. Taken after AGI, and available whether or not the taxpayer itemizes.

## Determining Tax Liability

Taxable income is taxed through the **graduated brackets** described in
[8.1](01-types-of-taxes.md) — each rate applying only to income within its
bracket.

**Long-term capital gains and qualified dividends** are taxed under a **separate
preferential rate schedule**, stacked on top of ordinary income. This means
ordinary income effectively fills the lower brackets first, and the amount of
ordinary income determines which capital gains rate applies. A taxpayer with
little ordinary income may pay 0% on long-term gains — the basis for
**tax-gain harvesting** in low-income years.

## Credits

A **credit reduces tax dollar-for-dollar**. A **deduction reduces taxable
income**, so its value equals the deduction times the marginal rate.

**Worked comparison.** A taxpayer in the 22% bracket:

| | Value |
|---|------|
| $1,000 **deduction** | $1,000 × 22% = **$220** |
| $1,000 **credit** | **$1,000** |

The credit is worth roughly 4.5× the deduction here. And unlike a deduction,
a credit's value doesn't depend on the taxpayer's bracket — which makes credits
proportionally more valuable to lower-bracket taxpayers.

### Refundable vs. nonrefundable

- **Nonrefundable** — can reduce tax to zero but no further; excess is lost or
  carried forward depending on the credit
- **Refundable** — can produce a refund exceeding tax paid

Common individual credits include the child tax credit (partially refundable),
the credit for other dependents, the child and dependent care credit, the earned
income tax credit (refundable), the American Opportunity credit (partially
refundable) and Lifetime Learning credit for education, the saver's credit for
retirement contributions, the foreign tax credit, and various energy credits.

Most phase out at higher income — another instance of AGI's gatekeeping role.

## Additional Taxes and Payments

**Additional taxes** that may apply: self-employment tax, the net investment
income tax on investment income above a threshold, the additional Medicare tax on
wages above a threshold, the 10% early distribution penalty, and household
employment taxes.

**Payments** credited against liability: federal income tax withheld, quarterly
estimated payments, prior-year overpayments applied forward, and refundable
credits.

### Computing the refund or amount owed

> **Total tax − Total payments = Refund (if negative) or amount owed (if positive)**

Withholding is treated as paid **evenly throughout the year** regardless of when
it actually occurred — a useful fact, since increasing year-end withholding can
cure an underpayment that a Q4 estimated payment would not.

**Safe harbor** rules avoid underpayment penalties: generally, paying at least
100% of the prior year's tax (a higher percentage for higher-income taxpayers) or
90% of the current year's tax. Worth knowing for clients with variable income,
who can otherwise incur penalties despite paying in full at filing.

A large refund is not a win — it's an interest-free loan to the government, and
adjusting withholding puts that cash flow back in the client's hands during the
year.

## Common Pitfalls

- Assuming mortgage interest or charitable gifts reduce tax for a standard-deduction taxpayer
- Confusing credits with deductions when comparing strategies
- Overlooking above-the-line adjustments, which are available without itemizing
- Missing head of household eligibility, or claiming it without a qualifying person
- Filing separately without confirming it's actually better
- Ignoring how AGI drives phaseouts across many unrelated provisions
- Failing to make estimated payments and incurring underpayment penalties
- Overlooking the 0% long-term capital gains rate in low-income years
- Treating a large refund as a positive outcome

## Self-Check

**1. Why is a $1,000 credit worth more than a $1,000 deduction?**

<details><summary>Answer</summary>
A credit reduces tax dollar-for-dollar, so it's worth $1,000. A deduction reduces
taxable income, so it's worth the deduction times the marginal rate — $220 at
22%. The credit's value is also independent of bracket, making it proportionally
more valuable to lower-bracket taxpayers.
</details>

**2. Why does AGI matter beyond being an intermediate figure?**

<details><summary>Answer</summary>
AGI and modified AGI drive eligibility and phaseouts across many provisions — IRA
deductibility, Roth eligibility, education and dependent care credits, the
medical expense floor, net investment income tax, taxation of Social Security,
and IRMAA. Reducing AGI can restore benefits worth more than the deduction
itself.
</details>

**3. Why do most taxpayers no longer benefit from mortgage interest deductions?**

<details><summary>Answer</summary>
The standard deduction was substantially increased, so most taxpayers take it
rather than itemizing. Itemized deductions like mortgage interest and charitable
gifts produce a benefit only to the extent total itemized deductions exceed the
standard deduction.
</details>

**4. What's the advantage of an above-the-line adjustment over an itemized deduction?**

<details><summary>Answer</summary>
It's available whether or not the taxpayer itemizes, and it reduces AGI — which
cascades into eligibility for other deductions and credits keyed to AGI. An
itemized deduction only helps if the taxpayer itemizes and doesn't reduce AGI.
</details>

**5. Why can increasing year-end withholding cure an underpayment penalty?**

<details><summary>Answer</summary>
Withholding is treated as paid evenly throughout the year regardless of when it
occurred, so late-year withholding is credited to earlier quarters. A Q4
estimated payment gets no such treatment and won't cure earlier-quarter
shortfalls.
</details>

**6. When might married filing separately be justified?**

<details><summary>Answer</summary>
When one spouse has large medical expenses that clear the AGI floor more easily
against a smaller separate AGI, or where a spouse wants to avoid joint and
several liability for the other's return. Both are exceptions — MFS usually
restricts credits and deductions and produces a worse result.
</details>

## Connections

- Income categories and rate structures: [8.1 — Types of Taxes and Income](01-types-of-taxes.md)
- Basis and capital gain computation: [8.3 — Taxation of Property, Annuities, and Collectibles](03-property-annuities.md)
- Employee benefits affecting gross income: [8.4 — Taxation of Employee Benefits and Retirement Income](04-employee-benefits.md)
- Strategies applying these mechanics: [8.6 — Tax Planning Strategies](06-tax-planning.md)
