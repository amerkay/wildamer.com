---
title: "Wordpress Plugin: Embed Beacon CRM Multi-Currency Donation Forms"
description: I created this WordPress plugin for embedding Beacon CRM donation forms with multi-currency support, automatic geo-location detection, and UTM tracking. 
tags: [Wordpress plugin]
publishedAt: 2025-11-30

image: /imgs/project-wp-beacon-multi-currency-forms/frontend-wp-beacon-multi-currency-forms-auto-currency-selection.png
imageDark: /imgs/project-wp-beacon-multi-currency-forms/frontend-wp-beacon-multi-currency-forms-auto-currency-selection-dark.png

# featuredOrder 1 is first, 2 is second, empty values shown after numbered items
featuredOrder: 1
isFeatured: true

forOrganization: Pangea Trust - Elephant Sanctuary
forOrganizationLink: https://www.pangeatrust.org/
githubLink: https://github.com/amerkay/wp-beacon-multi-currency-forms
---

## Why I Built This Plugin

While volunteering with [Pangea Trust (Elephant Sanctuary)](https://www.pangeatrust.org/), a UK registered charity operating in Portugal, I helped them setup Beacon CRM to track their donors.

Beacon CRM does a lot of things really well, but:
- There is **no native multi-currency front-end experience**. You need to create a form per currency per campaign.
- To support multiple currencies on your website, you will end up with **multiple pages, multiple forms, and a confusing donor journey**.
- No native support for UTM tracking parameters (`utm_source`, `utm_medium` and `utm_campaign`).

I wanted a setup where:
- Donors land on **one** URL. The site **chooses the right currency automatically** based on the user's IP location, but still lets donors override it.
- **UTM data sticks for months**, not just for the first pageview and syncs to Beacon Payment and Subscription record types.

The plugin I created does exactly that. It's published on my GitHub @ [amerkay/wp-beacon-multi-currency-forms](https://github.com/amerkay/wp-beacon-multi-currency-forms), under the GPLv3 open source license. Totally free to use, modify and redistribute.


## The £15,000 Question: Why Beacon Forms are great?

In my article on [UK fundraising platforms fees](/article/uk-fundraising-platform-fees), the calculator shows the same pattern across Donorbox, Raisely, FundraiserUp, JustGiving and friends:
- They look "free", but in reality, they **tax your success** via "optional donor covers donation tips" and per-donation fees.
- Over time, that "tip-based" business model can cost a small charity **£10k to £20k+** in avoidable fees&hellip; **every year**!
- They setup the donation subscriptions in their own system and Stripe accounts, which ends up costing you extra in custom integrations and locks you in so you can't really move the subscriptions away from their platforms.

If your charity makes £10,000 per month in donations, you'd could lose about £1,000 to £2,000 if you use one of these platforms that keep the donor tip compared to setting up on your own "cover our fees" with Beacon CRM or GiveWP.

The reason Beacon forms are great:
- You **keep control of your subscriptions**: Beacon sets up subscriptions in your charity's Stripe/PayPal account. No platform lock-in.
- You **keep the "cover our fees" upside** instead of outsourcing it to a tip-based platform. You can choose the percentage in your Beacon account.

![Beacon Forms Cover Donation Fees](/imgs/project-wp-beacon-multi-currency-forms/beacon-form-cover-fees.png)

It's worth mentioning some of Beacon's downsides, too:
- No multi-currency in a single form. This Wordpress plugin fixes that, but you still need to create one form per currency.
- No long-term **UTM tracking**. This plugin fixes that with a 180-day cookie, and syncing the UTM values to the Payment and Subscription record types in Beacon.
- No multi-step forms
- No conditional form fields requires the Premium plan which costs £5,000 a year.


## Integration Guide: From Zero to Donations in 15 Minutes

If you already have:
- A WordPress site.
- A Beacon CRM account.
- At least one existing Beacon donation form.

You can get to a working multi-currency Beacon form in WordPress in a few minutes.

### 1. Install & Activate the Plugin

1. Download the latest release .zip file from the [plugin's GitHub "Releases" tab](https://github.com/amerkay/wp-beacon-multi-currency-forms/releases).
2. Go to WordPress Admin → Plugins → Add New → Upload Plugin
3. Upload the zip file and activate

> TODO, update this once the plugin gets publish on the Wordpress Plugin marketplace.

![Beacon Embed Form](/imgs/project-wp-beacon-multi-currency-forms/beacon-embed-form.png)

### 2. Configure Your Beacon Account

1. Go to **Settings → Beacon Multi-Currency Forms**.
2. Under **Account Settings**:
   - Find your Beacon account name from the standard embed snippet: `data-account="pangeatrust"` → enter `pangeatrust`. See screenshot above.
3. Save.

![Wordpress Beacon CRM Multi-Currency Forms Account Settings](/imgs/project-wp-beacon-multi-currency-forms/config-wp-beacon-multi-currency-forms-account-id.png)

### 3. Create Your First Multi-Currency Form

In the **Donation Forms** section:

1. Click **Add New Form**.
2. Give it a name, e.g. `General Donations`.
3. For each currency you support:
   - Select the currency (`GBP`, `EUR`, `USD`, &hellip;).
   - Paste in the Beacon form ID for that currency, found in Beacon's embed as `data-form="f0rm1d"`.
   - Mark one currency as the **default**.
4. Save.

![Wordpress Beacon CRM Multi-currency Forms configuration](/imgs/project-wp-beacon-multi-currency-forms/config-wp-beacon-multi-currency-forms-form.png)

### 4. Enable Geo-Location

If you want automatic currency selection:

1. Install **GeoIP Detection**.
2. Configure it with MaxMind (see [Github README section](https://github.com/amerkay/wp-beacon-multi-currency-forms?tab=readme-ov-file#4-advanced-multi-currency--geo-location)).
3. Enable **JavaScript API**.
4. That's all; the Beacon plugin auto-detects and uses it.

![GeoIP Detection MaxMind Configuration](/imgs/project-wp-beacon-multi-currency-forms/config-geoip-detect-maxmind-settings.png)

### 5. (Optional) Enable UTM Tracking

Still under **Settings → Beacon Multi-Currency Forms**:

1. Enable **"UTM parameter tracking"**.
2. Use the defaults or set your own parameter names:
   - e.g. `bcn_pay_c_utm_source`, etc.
3. Save.

![Wordpress Beacon CRM UTM Tracking Settings](/imgs/project-wp-beacon-multi-currency-forms/config-wp-beacon-multi-currency-forms-utm-tracking-settings.png)

> Note: Don't forget to add the custom fields `utm_source`, `utm_medium` and `utm_campaign` to your Beacon `Payment` and `Subscription` record types.

### 6. Add the "Beacon Donation Form" to a Page

You can do that using Wordpress Block Editor, Divi or Elementor. If you use another page builder, you can use shortcodes.

1. Edit your **Donate** page.
2. Click **+ Add Block**.
3. Search for **"Beacon Donation Form"**.
4. Select your form from the dropdown (`General Donations`).
5. Publish/Update.

![Wordpress Block Editor - Adding Beacon Donation Form](/imgs/project-wp-beacon-multi-currency-forms/page-wp-beacon-multi-currency-forms-block-editor.png)

You now have a live Beacon form, rendered in the right currency for each visitor.

### 7. Add a Donation Box

If you want to have a donation box that redirects to a full donation form as your main call-to-action (CTA), you can add a "Beacon Donation Box".

1. Edit a page or widget area.
2. Add **"Beacon Donation Box"** block.
3. Configure:
   - Form: `General Donations` (or another).
   - Title, subtitle, notice.
   - Button text.
   - Frequencies: `single,monthly,annual`.
   - Preset amounts for each frequency.
   - Optional custom colors & params.
4. Save.

![Beacon Donation Box CTA](/imgs/project-wp-beacon-multi-currency-forms/frontend-wp-beacon-multi-currency-forms-donate-box.png)


The CTA box will send donors through the same multi-currency + UTM-aware pipeline.


## Technical Architecture: How It Works
You can find the [technical-oriented README file on the GitHub repo](https://github.com/amerkay/wp-beacon-multi-currency-forms).

The end result: one form configuration per campaign, many currencies, clean WordPress integration, and no third-party tax on your donations.


## Wrapping up

If you're already on WordPress + Beacon CRM and want:

- Multi-currency forms.
- Simple geolocation-based currency detection.
- UTM tracking that actually persists.
- Embedded donation boxes within your site's design.

Then this plugin is the missing piece you need to make your life easier when integrating Beacon with Wordpress. 

You can find the source code and installation instructions on my GitHub at [github.com/amerkay/wp-beacon-multi-currency-forms](https://github.com/amerkay/wp-beacon-multi-currency-forms)
