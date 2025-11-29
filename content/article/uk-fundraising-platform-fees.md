---
title: UK fundraising platforms with no fees don't exist, but this is how to make 15% more!
description: I built a calculator to compare fees of the most popular UK fundraising platforms vs. owning your own form using GiveWP or BeaconCRM or similar, where you can keep the "fees covered" paid by donors and increase your charity's income.
publishedAt: 2025-11-28
navigation: false
isFeatured: true
featuredOrder: 1
isComingSoon: false
image: /imgs/uk-fundraising-platform-fees/uk-fundraising-platform-fee-calculator.png
imageDark: /imgs/uk-fundraising-platform-fees/uk-fundraising-platform-fee-calculator-dark.png
isHideFeaturedImageOnPage: true
---

::cost-of-donation-platforms-calculator
::

**No web form should ever cost more than $25/month. After all, it's a form!** JustGiving, Donorbox, Raisely, FundraiserUp and a dozen other services exist. All of them take a cut from your donation income, recurring, forever!

They all say their services are "free", but are they really? **NOT at all and it's infuriating!** Let's talk about that.

In this article, I am going to focus on the UK, as that's where the 10 charities I worked with operate.

_TLDR; You need to own your donation form and have your own "cover our fees" upsell that your org keeps. The "donor covers fees" offered by platforms will cost you thousands!_

## How does the calculator above work?

The calculator above shows you lost income vs. potential gain by simulating incoming donations based on real data obtained from the charities I work with. It will help you estimate how much you'd lose by using each of the donation platforms listed compared to hosting your own form with a plugin like GiveWP.

## Real data from 14,000 donations

To simulate lost income accurately, I obtained 14k donation records over 12 months from the charities I work with. The distribution looks like this:

| Amount Donated   | Count | Percentage |
| ---------------- | ----- | ---------- |
| £3-£4.99         | 2,222 | 15.8%      |
| £5-£9.99         | 6,012 | 42.7%      |
| £10-£19.99       | 5,121 | 36.4%      |
| £20-£49.99       | 447   | 3.2%       |
| £50-£99.99       | 88    | 0.6%       |
| £100-£199.99     | 36    | 0.3%       |
| £200-£499.99     | 22    | 0.2%       |
| £500-£999.99     | 3     | 0.02%      |
| £1000+           | 3     | 0.02%      |

### So how to avoid this tax on your non-profit's fundraising success?

Use a flat fee payment form. I compared multiple options and the best I found is GiveWP.

You pay $350/year (~£22/month), and that's it.

![GiveWP's Pricing](/imgs/uk-fundraising-platform-fees/givewp-pricing.png)

> I **do not** have any affiliation with GiveWP. I recommend GiveWP because they excel at what they do and their pricing model is an extremely reasonable flat rate of ~$350/year. Plus, most charities already use Wordpress.

#### When does it make sense to use these platforms?

It only really makes sense for a charity to use a %-cut fundraising platform if you don't have a website or your charity is tiny (makes less than £500 per month).

### Other reasons to avoid donation platforms

As if the above numbers aren't enough, you also end up with a vendor lock-in.

1. Your subscription and customer data are now held hostage by these platforms. Instead of the subscriptions and customer records living in your Stripe account, they now live in the platform's Stripe account so that they can **take their cut as an "application fee" from your donations** and lock your organization in.
   \
   Check this out as an example (real-world screenshot):
   ![Raisely Stripe Transaction](/imgs/uk-fundraising-platform-fees/raisely-stripe-transaction.png)

2. Also, now because your customer data lives on their platform, you need to **pay for custom integrations with your CRM**.
   MoveData.io, as an example, charges $200 per month for a simple Raisely -> Salesforce integration. \
   And don't even get me started on Zapier! For 500 donations per month x ~20 tasks per flow = 10,000 tasks per month; Zapier's Team plan costs £198.01/mo for 10 tasks/mo!

---

## The "donor covers fees" per platform &amp; other fees

### Donorbox

Asks donors to cover the following fees:
- 9.2% for £5
- 6.8% for £10
- 5.6% for £20
- 4.9% for £50
- 4.6% for £100
- 4.5% for £200
- 4.4% for £500
- 4.4% for £1000

If you use it for free, they charge you 2.95% per donation, but you don't get access to integrations unless you pay $150/month ($1800/year), which also lowers their rate to 1.75%.

![Donorbox's Pricing](/imgs/uk-fundraising-platform-fees/donorbox-pricing.png)

Here is a real payment example. Donorbox is one of the decent platforms that only charge you their flat rate, and passes the rest of the "covered fees" to your charity.

![Donorbox transaction example](/imgs/uk-fundraising-platform-fees/donorbox-example.png)

### GoFundMe

They ask donors to add 16.5% to any amount. It can be turned off.

On top of that, they charge the charity 2.9% + 25p per donation. 

![GoFundMe's Pricing](/imgs/uk-fundraising-platform-fees/gofundme-pricing.png)

### Crowdfunder.co.uk

They ask donors to add 20% to all amounts. It can be turned off.

Plus 1.9% + 20p (per pledge) on UK/EU cards

![Crowdfunder's Pricing](/imgs/uk-fundraising-platform-fees/crowdfunder-pricing.png)

### whydonate

They ask donors for the following percentages on top of the donation amount:
- 14% £5-£250
- 11% £250-£500
- 9% £500+

They don't take fees from the charity. Your charity still needs to pay the Stripe fees.

![whydonate's pricing](/imgs/uk-fundraising-platform-fees/whydonate-pricing.png)

### givey.com

Flat rate 5% on all donations, which includes the Stripe transaction fees. That's a good deal and it's unique!

See [Givey's charges and fees](https://support.givey.com/en/articles/764870-what-are-your-charges-or-fees) page.

![Givey's Pricing](/imgs/uk-fundraising-platform-fees/givey-fee-table.png)

### FundraiserUp:

They ask donors for the following percentages on top of each donation amount:
- 16.7% for £3
- 12% for £5
- 10% for £10
- 8.5% for £20
- 7.5% for £30-£200/month
- 7% for £1000

If the donor does not "cover the fee", they charge your charity 4% of the donation amount. Your charity still needs to pay the Stripe fees.

![FundraiserUp's Pricing](/imgs/uk-fundraising-platform-fees/fundraiserup-pricing.png)

### Funraisin

I went through some donation forms and tried the following donation amounts one by one, these are the "cover the fees" they ask the donor to add to the amount:
- 34.3% for £3
- 22.2% for £5
- 13.3% for £10
- 9.2% for £20
- 6.6% for £50
- 6% for £100
- 6% for £200
- 4% for £500
- 2% for £1000

Capped at £20.

They do not publish their pricing, but from third-party sources, it seems that if the donor does not cover the fee, [they charge your charity 5%](https://www.zeffy.com/compare/zeffy-vs-funraisin).

Plus, Funraisin charges a fee of [4.75% for each Gift Aid](https://support.funraisin.co/blog/gift-aid-claim) claim.

### JustGiving

- 33.3% for £3
- 20% for £5
- 17% for £10+

Plus 5% on Gift Aid income.

![JustGiving's Pricing](/imgs/uk-fundraising-platform-fees/justgiving-pricing.png)


### Raisely

Based on tests I ran on real Raisely forms, this is how much they ask donors to add:
- 34.7% for £3
- 22.6% for £5
- 13.5% for £10
- 9% for £20
- 6.3% for £50
- 5% for £100
- 4.75% for £200
- 4.6% for £500
- 4.55% for £1000

If you have more than 2000 donation per year, or if you want access to their Pro features, you need to pay AUD$179/month + 10% GST or AUD $1074 + GST if you do it annually.

![Raisely's Pricing](/imgs/uk-fundraising-platform-fees/raisely-pricing.png)

### Enthuse

They prompt donors for a tip of 17% to 7% on larger amounts. 

- 17% for £3 
- 13% for £5
- 9.9% for £10
- 8.4% for £20
- 7.5% for £50
- 7.2% for £100
- 7.05% for £200
- 6.93% for £1000

Monthly fees of £39.99/month for donations and £24.99/month for fundraising forms. They charge 5% if you disable the "cover fees". Not just that, they also take 5% from your GiftAid claims!

![Enthuse Pricing](/imgs/uk-fundraising-platform-fees/enthuse-pricing.png)

---

## Wrapping up

Above are just a few examples. All of these platforms run this way. It's called the "tip-based business model" and you want to **avoid it.**

Bottom line: Own your donation forms and don't fall for the hidden lock-in mechanism where your org's subscriptions are owned by one of these platforms.