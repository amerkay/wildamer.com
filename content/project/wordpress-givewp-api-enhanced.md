---
title: "Wordpress Plugin: A better GiveWP API, Enhanced with Full Donation Meta Data"
description: I created this WordPress plugin in order to get access to the full GiveWP donor, donation and subscription metadata. It exposes 5 new API endpoints and uses the built-in GiveWP API Authentication mechanism.
tags: [Wordpress plugin]
publishedAt: 2025-11-30

image: /imgs/project-givewp-api-enhanced/givewp-api-enhanced.png
imageDark: /imgs/project-givewp-api-enhanced/givewp-api-enhanced-dark.png

# featuredOrder 1 is first, 2 is second, empty values shown after numbered items
featuredOrder: 4
isFeatured: true

forOrganization: Pangea Trust - Elephant Sanctuary
forOrganizationLink: https://www.pangeatrust.org/
githubLink: https://github.com/amerkay/wp-give-api-enhanced
---

## Why I Built This Plugin

While volunteering with [Pangea Trust (Elephant Sanctuary)](https://www.pangeatrust.org/), a UK registered charity operating in Portugal, I helped them set up GiveWP to manage their donations and recurring subscriptions.

GiveWP does a lot of things really well, but I hit a wall when trying to build automations with n8n:

- The **built-in API is too basic** to build proper integrations.
- There's **no way to load Gift Aid data** through the API.
- **Custom fields and meta data** for donations and donors are completely inaccessible.
- You end up making **multiple API calls** just to piece together a complete picture of a donation.

I wanted a setup where:
- A single API call returns the **complete donation data** including the donor, form, campaign, and subscription information.
- **Gift Aid data** is accessible for UK charities that need it for tax reclaims.
- **All custom meta fields** are included without needing to dig through WordPress internals.

The plugin I created does exactly that. It's published on my GitHub @ [amerkay/wp-give-api-enhanced](https://github.com/amerkay/wp-give-api-enhanced), under the GPLv2 open source license. Totally free to use, modify and redistribute.


## What's Wrong with GiveWP's Default API

GiveWP ships with an API, but it's designed for basic use cases. If you're trying to build serious automations—say syncing donations to a CRM, sending personalised thank-you emails, or generating Gift Aid reports—you'll quickly discover the limitations:

**Problem 1: No Custom Field Access**

Added a "How did you hear about us?" field to your donation form? Great. Now try getting that data through the API. You can't.

**Problem 2: No Gift Aid Data**

For UK charities, Gift Aid is worth an extra 25% on eligible donations. GiveWP stores this data, but the API doesn't expose it. If you want to automate Gift Aid declarations to HMRC, you're stuck exporting CSVs manually.

**Problem 3: Too Many API Calls**

Want to know which campaign a donation belongs to? That's a separate call. Want the donor's total giving history? Another call. Want subscription details? Yet another. For a simple n8n workflow, you end up chaining 4-5 HTTP requests just to get context around a single donation.

**The Enhanced API Fix**

This plugin adds 5 endpoints that return complete, nested data:

| Endpoint | What You Get |
|----------|--------------|
| `/donation/{id}` | Full donation with nested donor, form, campaign, subscription data |
| `/donor/{id}` | Donor profile with all meta fields including Gift Aid |
| `/subscription/{id}` | Recurring subscription details |
| `/campaign/{id}` | Campaign info with goal statistics |
| `/form/{id}` | Form configuration and donation levels |

One call to `/donation/123` returns everything you need. No chaining required.


## Integration Guide: Setup in 5 Minutes

If you already have:
- A WordPress site with GiveWP installed
- At least one donation form receiving donations

You can get the enhanced API running in under 5 minutes.

### 1. Install & Activate the Plugin

1. Download the latest release .zip file from the [plugin's GitHub "Releases" tab](https://github.com/amerkay/wp-give-api-enhanced/releases).
2. Go to WordPress Admin → Plugins → Add New → Upload Plugin
3. Upload the zip file and activate

That's it. Zero configuration needed. The endpoints are live immediately.

### 2. Generate API Credentials

The plugin uses GiveWP's native authentication, so you don't need to manage separate credentials.

1. Navigate to **GiveWP → Tools → API**
2. Click **Generate API Keys**
3. Select a user and click **Generate**
4. Copy your **Public Key** and **Token**

### 3. Make Your First API Call

Append your credentials as query parameters:

```
https://your-site.com/wp-json/give-api-enhanced/v1/donation/123?key=YOUR_PUBLIC_KEY&token=YOUR_TOKEN
```

You'll get back a complete donation object:

```json
{
  "donation": {
    "id": 123,
    "amount": {
      "currency": "GBP",
      "formatted": "105.58"
    },
    // ...
    "donor": {
      "id": 1,
      "meta": {
        "_give_gift_aid_card_address": "1 Test Rd",
        "_give_gift_aid_card_zip": "L11 D11",
        "_give_gift_aid_opt_in_date": "2025-11-21 03:20:55"
      },
    },
    "form": {
      "id": 10,
      "title": "Donation Form"
    },
    "campaign": {
      "id": 1,
      "title": "Fundraising Campaign",
      "goal_stats": {
        "actual": 555,
        "percentage": 27.75
      }
    },
    "subscription": {
      "id": 6,
      "status": "active",
      "period": "month"
    }
  }
}
```

### 4. Setting Up n8n Integration

If you're using n8n for automation:

1. Create a Webhook Trigger, and add it to your GiveWP webhooks.
2. Add an **HTTP Request** node
3. Set **Authentication** to **Generic Credential Type** → **Query Auth**
4. Create a credential with:
   - **Name:** `key` **Value:** `YOUR_PUBLIC_KEY`
   - **Name:** `token` **Value:** `YOUR_TOKEN`
5. Set **Method:** GET
6. Set **URL:** `https://your-site.com/wp-json/give-api-enhanced/v1/donation/{{$json.body.data.donation.id}}`

Now you can trigger workflows on new donations and have complete data available without extra API calls.


## Wrapping Up

If you're running GiveWP and need:
- Full access to custom fields and meta data
- Gift Aid data for UK tax reclaims
- Complete donation context in a single API call
- A foundation for n8n, Zapier, or custom integrations

Then this plugin fills the gap that GiveWP's default API leaves open.

You can find the source code and installation instructions on my GitHub at [github.com/amerkay/wp-give-api-enhanced](https://github.com/amerkay/wp-give-api-enhanced).

If you found this useful, please [share your use-case with me](/contact).