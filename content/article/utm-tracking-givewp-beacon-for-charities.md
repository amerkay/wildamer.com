---
title: How to use UTM parameters to track donations using Beacon CRM and GiveWP
description: As a charity, you need to know what works and what doesn't. This means you need to know which source and campaign brings in the most one-time and recurring donations.
publishedAt: 2025-12-01
image: /imgs/utm-tracking-for-charities/utm-tracking-for-charities.png
imageDark: /imgs/utm-tracking-for-charities/utm-tracking-for-charities-dark.png
isFeatured: true
featuredOrder: 2
tags: [UTM Tracking, CRM]
---

## UTM Tags — Intro

When you publish a link on Instagram, TikTok, or create Meta or Google Ads, you need to make sure that those links have the following three URL parameters set.

These tell Google Analytics (or other analytics tools) where a click, visit, or conversion came from.

Side note: I didn't know this until recently, but **UTM stands for Urchin Tracking Module**. Who knew!

### The three main URL parameters you should set on all published links

![UTM Parameters URL Diagram](/imgs/utm-tracking-for-charities/utm-parameter-url-diagram.png)

1. **utm_source** — Tracks *where* the traffic is coming from \
   **Common values:** `instagram`, `facebook`, `tiktok`, `youtube`, `linkedin`, `newsletter`, `google`, `meta`, `twitter` (or `x`), `reddit`, `sms`

2. **utm_medium** — Tracks the *type* of marketing channel \
   **Common values:** `social` (organic social posts), `paid-social` (Meta, TikTok, LinkedIn paid ads), `cpc` (Google Ads / SEM), `email`, `sms`, `display`, `referral`, `organic`, `banner`, `qr`

3. **utm_campaign** — Tracks the *specific campaign name* \
   **Example values:** `summer_campaign`, `donation_drive`

To learn more, this is a good comprehensive [guide to UTM parameters in Google Analytics 4](https://www.analyticsmania.com/post/utm-parameters-in-google-analytics-4/).

### Use Google's UTM Campaign URL Builder Tool

![Google's Campaign URL Builder](/imgs/utm-tracking-for-charities/google-campaign-url-builder.png)

You can use [**Google's Campaign URL Builder**](https://ga-dev-tools.google/ga4/campaign-url-builder/) to help create URLs with UTM parameters faster.


Also see Google's 
[collect campaign data with custom URLs documentation](https://support.google.com/analytics/answer/10917952?hl=en).

## Standardize Your UTM Tags

This is **important**. If you don't stick to the same spelling and capitalization, you'll end up with multiple entries for what should be one source, medium, or campaign.

Guidelines:

* Use **lowercase**, **no spaces**, and **underscores** (`snake_case`). Be consistent across teams.
* Always set: **utm_source**, **utm_medium**, **utm_campaign**.
  Optionally add **utm_content** for creative/placement.
* Only tag **links you control that lead to your own site**.
  (Do NOT tag internal links or links leading to other sites.)
* Use [Google's Campaign URL Builder](https://ga-dev-tools.google/ga4/campaign-url-builder/) to avoid typos.

## Where to See the Data in Google Analytics 4?

On your GA4 account, go to: \
**Reports → Acquisition → Traffic acquisition**

There you can break down by session/source, session/medium, campaign, manual ad content (utm_content), etc.

This is a good tutorial on [how to find your Campaign data in Google Analytics 4](https://www.wholewhale.com/tips/how-to-find-campaign-data-in-google-analytics/).


---

## UTM Tag Usage Examples

### 1) Organic Social: Instagram, TikTok, Facebook (Non-Paid Posts, Bios, Stories)
Use UTMs on every link you publish.

**Template**
```
utm_source=instagram | tiktok | facebook
utm_medium=social
utm_campaign=your_campaign_name
utm_content=story | reel | bio_link
```

**Example (Instagram Reel for the "kariba_relocation" campaign)**
```
?utm_source=instagram&utm_medium=social&utm_campaign=kariba_relocation&utm_content=reel
```

### 2) Newsletter (Mailchimp)
The easiest method is to **turn on Google Analytics link tracking** in the campaign's **Settings & Tracking**. Mailchimp will automatically append UTMs.

More info: [Integrate Google Analytics with Mailchimp](https://mailchimp.com/help/integrate-google-analytics-with-mailchimp/)

### 3) Paid: Google Ads
Turn **ON** Auto-tagging. This adds the UTM parameters automatically, attributing paid clicks to **utm_source=google, utm_medium=cpc**.

Google Ads + GA4 will handle the detailed attribution without needing manual UTMs.

More info: [\[GA4\] Benefits of Google Ads auto-tagging](https://support.google.com/analytics/answer/10723328?hl=en)

### 4) Paid: Meta Ads (Facebook & Instagram Ads)
Add UTMs **at the ad level**. Prefer **dynamic parameters** so campaign/ad names auto-populate.

Meta's reference: [Specifications for URL dynamic parameters on Meta Business Help Centre](https://www.facebook.com/business/help/2360940870872492)

Tutorial with screenshots: [How to Use UTM Codes to Track Facebook Ads Effectively](https://magicbrief.com/post/how-to-use-utm-codes-to-track-facebook-ads-effectively)

**Suggested dynamic template (URL Parameters):**
```
utm_source={{site_source_name}}
&utm_medium=paid-social
&utm_campaign={{campaign.name}}
&utm_term={{adset.name}}
&utm_content={{ad.name}}
&utm_id={{campaign.id}}
```

![Meta Build a URL Parameter](/imgs/utm-tracking-for-charities/meta-build-url-parameter.png)

---

## Configuring UTM parameters with the Custom Built "Beacon Multi-Currency Forms" WordPress Plugin

To make embedding multi-currency forms and passing UTM tracking parameters to Beacon easier, I created a [WordPress plugin called Beacon Multi-Currency Forms](/project/wordpress-beacon-crm-multi-currency-donation-forms).

To configure Beacon + WordPress + UTM tag forwarding:
1. Download and install the plugin, [instructions under each release](https://github.com/amerkay/wp-beacon-multi-currency-forms/releases).
2. From your WordPress settings, navigate to `Settings -> Beacon Multi-Currency Forms` and check the boxes for `Beacon JavaScript` and `UTM Parameter Tracking`. \
    This configures the plugin to remember where a user came from (the 3 UTM parameters listed above) for 180 days and automatically sets the `bcn_*` URL parameters on Beacon forms submitted.
    !["Beacon Multi-Currency Forms" WordPress Plugin UTM configs](/imgs/utm-tracking-for-charities/wp-bmcf-utm-config-settings.png)
3. Follow [Beacon's tutorial to configure your GA4 property ID](https://guide.beaconcrm.org/en/articles/5720151-tracking-forms-with-google-analytics).
4. Add the **`utm_*` custom fields to your Beacon's Subscription and Payment** entity types.
    ![Add UTM custom fields to Beacon](/imgs/utm-tracking-for-charities/beacon-add-custom-fields.png)
5. This is important: **Each Beacon form must have the `utm_*` URL data fields configured**.
    ![Add utm_* parameters to your Beacon form](/imgs/utm-tracking-for-charities/beacon-form-configure-utm.png)

When configured properly, the parameters are passed to GA4, as well as to Beacon forms, which store them under each Payment/Subscription record. 

## Configuring UTM parameters with GiveWP and Beacon

To get GiveWP to sync with Beacon, you will need to set up the [GiveWP &ndash; Beacon n8n integration automation](/project/givewp-beacon-crm-n8n-workflow-integration).

To configure GiveWP with Google Analytics:
1. Follow the [GiveWP tutorial](https://givewp.com/documentation/add-ons/google-analytics/).
    ![GiveWP Google Analytics Settings](/imgs/utm-tracking-for-charities/givewp-settings-google-analytics.png)
2. Make sure your n8n Upsert Subscription and Upsert Payment nodes passes the UTM parameters. That's all covered in my [GiveWP to Beacon n8n integration tutorial](/project/givewp-beacon-crm-n8n-workflow-integration).
    ![n8n GiveWP UTM Parameters](/imgs/utm-tracking-for-charities/n8n-givewp-utm-parameters.png)

That's it!

---

## Wrapping up

Tracking conversion sources is crucial for a non-profit. That's why you should get it right and integrate it with your CRM. 

Doing it right will let you know which campaigns brought in more donors and/or donations. It allows you to run A/B tests between campaigns to find the winning formula for your charity. It allows you to segment your email campaigns accurately. 

Good luck tracking your success and growing your charity! Please [share your story with me](/contact) if you find this useful.