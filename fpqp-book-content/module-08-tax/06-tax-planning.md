---
id: m8c6-tax-planning
module: 8
chapter: "8.6"
title: Tax Planning Strategies
tags: [tax-planning, after-tax-return, income-shifting, deferral, ugma-utma, 529, coverdell, asset-location]
see_also: [m8c1-types-of-taxes, m8c3-property-annuities, m8c5-recordkeeping]
---

# 8.6 — Tax Planning Strategies

## Overview

This chapter applies the three levers introduced in
[8.1](01-types-of-taxes.md) — **character, timing, and location** — to concrete
strategies. Every technique below is one of those three at work, and recognizing
which lever a strategy pulls is more useful than memorizing the strategies
individually.

One framing point first. **Tax avoidance** — arranging affairs to minimize tax
within the law — is legitimate and is what planning consists of. **Tax evasion** —
concealing income or fabricating deductions — is criminal. The line is
substantive, not cosmetic.

A second framing point, more often violated in practice: **taxes are a
consideration, not the objective.** A recommendation that reduces tax while
producing a worse overall outcome is a bad recommendation. Clients who make
investment decisions primarily to avoid tax frequently end up worse off — the
classic case being refusing to sell a badly concentrated position solely because
of the gain.

## Eliminating or Reducing Tax

### After-tax rate of return

The measure that makes strategies comparable. Applying the formulas from
[6.1](../module-06-investments/01-asset-classes.md):

> **After-tax return = Pretax return × (1 − marginal tax rate)**

**Worked comparison.** An investor in the 32% bracket weighing a 6% corporate
bond against a 4.3% municipal bond:

```
Corporate, after tax = 6% × (1 − 0.32)  = 4.08%
Municipal, after tax                     = 4.30%   (federally exempt)
```

The municipal wins despite the lower headline yield. Equivalently, via taxable
equivalent yield:

```
TEY = 4.3% ÷ (1 − 0.32) = 6.32%
```

The same municipal bond for an investor in the 12% bracket:

```
TEY = 4.3% ÷ (1 − 0.12) = 4.89%
```

Now the 6% corporate is clearly better. **The right answer depends entirely on the
client's bracket**, which is why this must be computed rather than assumed.

### Tax-exempt and tax-advantaged income

- **Municipal bond interest** — generally federally exempt; also state-exempt for
  in-state residents. Note it still counts toward provisional income for Social
  Security taxation ([8.4](04-employee-benefits.md))
- **Roth account distributions** — tax-free if qualified, and excluded from
  provisional income
- **HSA distributions** for qualified medical expenses — tax-free
- **Life insurance death benefits** — generally income-tax-free
- **Section 121 residence gain exclusion**

### Tax-loss harvesting

Selling positions at a loss to offset realized gains, then reinvesting in a
similar but **not substantially identical** security to maintain market exposure.

Mechanics: losses offset gains of the same character first, then across
characters; a limited amount of net loss is deductible against ordinary income
annually, with the remainder carried forward indefinitely.

Constraints and cautions:

- The **wash sale rule** disallows the loss if substantially identical securities
  are bought within 30 days before or after — and a repurchase inside an IRA makes
  the loss **permanent** ([8.3](03-property-annuities.md))
- Harvesting **lowers basis** in the replacement position, so it defers rather
  than eliminates tax. The benefit is the time value of the deferral, plus
  potential rate arbitrage if the eventual gain is taxed at a lower rate
- It's most valuable when offsetting **short-term** gains taxed at ordinary rates

### Tax-gain harvesting

The less familiar mirror image. In a year when taxable income is low enough that
long-term capital gains fall in the **0% bracket**, deliberately realizing gains
costs nothing and **resets basis higher**.

The wash sale rule does not apply to gains, so the position can be repurchased
immediately. Prime candidates: early retirees before Social Security and RMDs
begin, clients in a low-income year, and students or those between jobs.

## Shifting Tax to Others

Moving income from a high-bracket taxpayer to a lower-bracket one. The techniques
work, but each has significant limits.

### Trusts

A trust can hold income-producing assets, with income taxed to the trust or to
beneficiaries depending on structure and distributions.

The constraint is severe: **trust tax brackets are highly compressed**, reaching
the top rate at a very low income level. A non-grantor trust retaining income
frequently pays **more** tax than the grantor would have. Income shifting through
trusts generally requires **distributing** income to lower-bracket beneficiaries.

**Grantor trusts** are disregarded for income tax purposes — the grantor is taxed
on trust income regardless of distributions — so they shift nothing for income tax
purposes, though they remain valuable for estate planning (see Module 9).

Trust drafting is legal work and belongs with an attorney.

### Gifting — UGMA and UTMA

**Uniform Gifts to Minors Act** and **Uniform Transfers to Minors Act** accounts
hold assets for a minor under a custodian, without the cost of a trust. UTMA is
broader, permitting real estate and other property beyond UGMA's securities and
cash.

| Feature | Treatment |
|---------|-----------|
| Ownership | **The minor's**, irrevocably — the gift cannot be undone |
| Control | Custodian manages until the age of majority under state law |
| At majority | The child receives **unrestricted control** |
| Income tax | Taxed to the child, subject to the **kiddie tax** |
| Financial aid | Counted as a **student** asset, assessed at a much higher rate than parental assets |
| Estate | Included in the custodian's estate if the custodian is the donor and dies while serving |

Two limitations deserve emphasis with clients:

**The kiddie tax** substantially undercuts the income-shifting purpose. A child's
unearned income above a threshold is taxed at the **parents' marginal rate**,
applying to children under 18 and to full-time students under 24 who don't provide
more than half their own support. Only a modest amount of unearned income escapes.

**Loss of control at majority.** Funds intended for education become the child's
to spend on anything at 18 or 21. Parents are frequently unaware of this until it
is irreversible, and it's the single most important thing to disclose before
funding one.

### Employing family members

A business owner may hire a child or other family member, deducting **reasonable**
compensation for **actual services** performed. This shifts income to a
lower-bracket taxpayer and creates **earned income** enabling IRA or Roth IRA
contributions — a genuinely powerful combination for a young person with decades
of compounding ahead.

Requirements: the work must be real, the compensation reasonable for the services,
and proper payroll records maintained. A sole proprietorship employing the owner's
child under 18 may also have **payroll tax exemptions**.

Excessive or fictitious compensation is a recognized audit target, and the
substance requirement is real.

## Deferring Receipt of Taxable Income

Deferral is valuable for two reasons: the time value of the postponed tax, and the
possibility of paying at a lower rate later.

### Retirement plans

The primary deferral vehicle — pretax contributions reduce current income and
grow tax-deferred. Covered in
[7.2](../module-07-retirement/02-sources-of-income.md).

Note the trade-off from [8.4](04-employee-benefits.md): deferred growth emerges as
**ordinary income**, forfeiting preferential capital gains rates that a taxable
account would have provided. The deduction and deferral usually dominate, but the
comparison isn't automatic.

### Life insurance cash value

Cash value grows **tax-deferred**, and policy loans are generally not taxable
while the policy remains in force.

The trap from [5.1](../module-05-life-health-disability/01-life-insurance.md):
if the policy **lapses or is surrendered with a loan outstanding**, the gain
becomes taxable — often a large, unexpected bill on a policy the client thought
had simply ended.

### Installment sales

Spreading gain recognition across the years payments are received, keeping the
seller in lower brackets rather than concentrating gain in one year. Useful for
sales of real estate or a business. The seller takes on the buyer's credit risk in
exchange.

### Other deferral techniques

- **Section 1031 exchanges** for real property ([8.3](03-property-annuities.md))
- **Deferring year-end income** into January where the client controls timing
- **Accelerating deductions** into the current year
- **Bunching deductions** — concentrating charitable gifts or elective medical
  expenses into alternating years so they exceed the standard deduction in the
  bunched year. A **donor-advised fund** enables this cleanly: take a large
  deduction in the funding year, distribute to charities over time

## Saving for Education

### Coverdell Education Savings Account

- Modest annual contribution limit per beneficiary
- Contributions **not deductible**; growth and qualified withdrawals **tax-free**
- Covers **K–12 as well as higher education** expenses
- **Income phaseouts** limit contributor eligibility
- Must generally be used by the beneficiary's age 30, or rolled to another family
  member
- Broad investment flexibility, similar to a brokerage account

### Section 529 plans

The dominant education savings vehicle.

| Feature | Treatment |
|---------|-----------|
| Contributions | Not federally deductible; **many states offer a deduction or credit** for in-state plans |
| Growth | Tax-deferred |
| Qualified withdrawals | **Tax-free** |
| Contribution limits | High lifetime limits set by the plan; no income phaseout |
| **Control** | **The account owner retains control** — the beneficiary cannot claim the funds |
| Beneficiary changes | Permitted to another qualifying family member |
| Financial aid | Counted as a **parental** asset when parent-owned — assessed far more favorably than a student asset |
| Gift tax | Contributions are completed gifts; **five-year forward averaging** permits front-loading several years of annual exclusion gifts at once |

**Qualified expenses** include tuition, fees, books, supplies, required equipment,
and room and board for students enrolled at least half-time. Expanded uses now
include a limited annual amount for K–12 tuition, apprenticeship costs, and a
lifetime cap on student loan repayment. Recent legislation also permits, subject
to conditions including a long-standing account, limited rollovers of unused 529
funds to a **Roth IRA** for the beneficiary.

**Non-qualified withdrawals**: earnings are taxed as ordinary income **plus a 10%
penalty**. The penalty is waived — though tax on earnings still applies — for
scholarship receipt, disability, death, or attendance at a U.S. military academy.

### 529 vs. UGMA/UTMA vs. Coverdell

| | 529 | UGMA/UTMA | Coverdell |
|---|-----|-----------|-----------|
| Control retained by owner | **Yes** | No — child at majority | Yes, to age 30 |
| Contribution limit | Very high | Unlimited (gift tax applies) | Low |
| Income phaseout | **None** | None | **Yes** |
| K–12 use | Limited tuition amount | Any use | **Yes, broadly** |
| Financial aid treatment | **Parental asset — favorable** | **Student asset — unfavorable** | Parental asset |
| Investment flexibility | Plan menu | Full | Full |
| Tax-free growth | Yes, if qualified | No — kiddie tax applies | Yes, if qualified |

For most families the **529 is the default recommendation**: no income limits,
high contribution capacity, retained control, favorable aid treatment, and
frequently a state tax benefit. The main trade-off is a restricted investment
menu.

### Education tax credits

Separately from savings vehicles, the **American Opportunity** and **Lifetime
Learning** credits reduce tax directly. Note that the **same expenses cannot be
used for both a credit and a tax-free 529 withdrawal** — coordinating which
expenses are allocated where is a real planning step, and it's frequently
overlooked.

## Asset Location

Placing assets in the account type that minimizes total tax — the **location**
lever, and one of the most reliable sources of value a planner can add, because it
requires no forecasting.

| Hold in **taxable** | Hold in **tax-deferred** |
|---------------------|--------------------------|
| Broad index funds and ETFs (low turnover, low distributions) | Taxable bonds and bond funds |
| Individual stocks held long-term | REITs (distributions largely ordinary income) |
| Municipal bonds (already exempt) | High-turnover active funds |
| Assets intended for heirs (step-up in basis) | Short-term trading strategies |

**Roth accounts** ideally hold the **highest-expected-growth** assets, since all
growth escapes tax permanently and there are no lifetime RMDs on a Roth IRA.

Two specific points: municipal bonds in a tax-deferred account waste their
exemption entirely, and appreciated assets intended for heirs should stay in a
**taxable** account to capture the step-up — assets in a traditional IRA get no
step-up and emerge as ordinary income to beneficiaries.

## Common Pitfalls

- Letting tax considerations override sound investment decisions
- Holding a concentrated position solely to avoid the gain
- Comparing municipal and taxable yields without computing taxable equivalent yield
- Triggering wash sales while harvesting, especially through an IRA
- Funding UGMA/UTMA accounts without disclosing the loss of control at majority
- Expecting UGMA/UTMA income shifting to work despite the kiddie tax
- Retaining income in a non-grantor trust and hitting compressed brackets
- Paying family members amounts unreasonable for the services actually performed
- Missing the low-income window for 0% capital gains harvesting or Roth conversions
- Double-counting the same expenses for an education credit and a 529 withdrawal
- Holding municipal bonds or REITs in the wrong account type

## Self-Check

**1. A 5% corporate bond versus a 3.6% municipal, investor in the 24% bracket.
Which wins?**

<details><summary>Answer</summary>
Corporate after tax = 5% × 0.76 = 3.80%. The municipal yields 3.60% tax-free. The
**corporate wins** by 0.20 points. Equivalently, the muni's TEY is 3.6 ÷ 0.76 =
4.74%, below the corporate's 5%.
</details>

**2. Why does the kiddie tax undercut UGMA/UTMA income shifting?**

<details><summary>Answer</summary>
A child's unearned income above a modest threshold is taxed at the parents'
marginal rate — applying to children under 18 and full-time students under 24 who
don't provide more than half their own support. Only a small amount escapes, so
the shifting benefit is largely eliminated.
</details>

**3. What's the most important thing to disclose before funding a UTMA?**

<details><summary>Answer</summary>
The child gains unrestricted control at the age of majority and may use the funds
for anything. The gift is irrevocable and cannot be redirected. Parents often
discover this only when it's too late to change.
</details>

**4. Why does a 529 usually beat a UTMA for education savings?**

<details><summary>Answer</summary>
The owner retains control and can change beneficiaries; there are no income
phaseouts and high contribution limits; growth and qualified withdrawals are
tax-free rather than subject to the kiddie tax; and it's treated as a parental
asset for financial aid, assessed far more favorably than a student asset.
</details>

**5. What is tax-gain harvesting and who should consider it?**

<details><summary>Answer</summary>
Deliberately realizing long-term gains in a year when taxable income is low
enough that they fall in the 0% capital gains bracket, resetting basis higher at
no tax cost. The wash sale rule doesn't apply to gains, so the position can be
repurchased immediately. Early retirees before Social Security and RMDs, and
anyone in an unusually low-income year, are prime candidates.
</details>

**6. Why keep appreciated assets intended for heirs in a taxable account?**

<details><summary>Answer</summary>
Taxable-account assets receive a step-up in basis at death, eliminating the
built-in gain permanently. The same assets in a traditional IRA get no step-up and
are distributed to beneficiaries as ordinary income.
</details>

**7. What's the difference between tax avoidance and tax evasion?**

<details><summary>Answer</summary>
Avoidance is arranging affairs to minimize tax within the law — legitimate, and
what planning consists of. Evasion is concealing income or fabricating deductions
— criminal. The distinction is substantive rather than a matter of labeling.
</details>

## Connections

- The three levers this chapter applies: [8.1 — Types of Taxes and Income](01-types-of-taxes.md)
- Deduction and credit mechanics: [8.2 — Federal Tax Calculation](02-federal-tax-calculation.md)
- Basis, wash sales, and nonrecognition: [8.3 — Taxation of Property, Annuities, and Collectibles](03-property-annuities.md)
- Records these strategies depend on: [8.5 — Keeping the Proper Records](05-recordkeeping.md)
- Account selection and contribution priority: [7.2 — Sources of Retirement Income](../module-07-retirement/02-sources-of-income.md)
- Gift tax and trusts for transfer purposes: Module 9
