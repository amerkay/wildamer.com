---
title: How to Create a Salesforce OAuth2 Integration User for your n8n Credential
description: I am surprised at how confusing setting up an "Integration User" in Salesforce is. I wrote this tutorial on how to do so, to make life easier for future me and future you.
publishedAt: 2025-11-28
imageDark: /imgs/article-n8n-salesforce-integration-user/featured-salesforce-n8n-connected-app-dark.png
image: /imgs/article-n8n-salesforce-integration-user/featured-salesforce-n8n-connected-app.png
isHideFeaturedImageOnPage: false
isFeatured: true
featuredOrder: 5
tags: [Hiring, CRM, Automation]
---

Logging in with a regular Salesforce user account was straightforward from n8n's "Salesforce OAuth2 API" credentials, but this uses up one of your charity's 10 free NPSP user accounts. So you want to use an Integration User license instead.

## Checklist for creating a Salesforce n8n integration user

Below is a checklist to make your life easier when creating a Salesforce Integration user for use with n8n's OAuth2 credential.

### Before we start: I recommend testing in a Partial Copy Sandbox

To create a new Sandbox to test your workflow in, or to give access to a freelancer, navigate to "Setup" under your production Salesforce instance, then search "sandbox". See screenshot below.

![Create new Salesforce Sandbox](/imgs/article-hire-n8n-automation-expert-crm/salesforce-new-sandbox-screenshot.png)

### 1. Create a new Salesforce Integration User

Create your `n8n_user` with:

- Name `n8n Integration User`
- Role `Integration User`,
- License `Salesforce Integration`,
- Profile `Minimum Access - API Only Integrations`.
- Make sure it's set to the correct timezone and currency, in this case `GMT` and `GBP`.
- Note about the email, you can use the "[plus email address trick](https://roadtoalm.com/2025/07/18/the-secret-power-of-the-in-live-outlook-or-hotmail-addresses/)", for example: `yourname+n8n@charity.org.uk`
  ![Create new Salesforce Integration User Screenshot](/imgs/article-n8n-salesforce-integration-user/salesforce-integration-user-screenshot.png)

### 2. Verify the new user and create a password

Check your email, right-click and copy the URL into an incognito window. Create a password for the new integration user.

> You will need to do so in an incognito window (or Firefox Private window) because in your current window you are already logged in to your System Admin user account.

### 3. Create a new Permission Set

This is specific to your integration, so it will not be exactly the same.

For BOS-UK's (Borneo Orangutan Foundation UK) use-case of automating closing Salesforce NPSP opportunities when new Stripe payments succeed, this is what we needed to configure:

- Create new permission set: `n8n Integration`
- Use License `Salesforce API Integration`
- Allow **Read, Create, Edit** on `Contact`, `Recurring Donation`
- `Opportunity` needs `Individual One-Time Donations` and `Individual Recurring Donations` permissions as well as **Modify All Records**.
- Also allow **Read** on `Account`, `gcga__Gift_Aid_Declaration__c`, `gcga__Gift_Aid_Schedule__c`.
- Finally, assign the new permission set to our new n8n user (`Manage Assignments` -> `Add` -> our new `n8n_user`).

> Note: After running your first flow, you need to check the NPSP Settings -> Error Log on Salesforce.

### 4. Make Integration User passwords never expire

This is recommended but optional.

From `Users` -> `Profiles` -> `Integration User` -> `Password Policies` -> `Edit` -> `User passwords expire in` and set it to `Never expires`.

### 5. The confusing hidden step: Install the n8n app

This is not documented properly anywhere as of the time of writing this post in Nov 2025. I only figured this step out after reading this [forum post about Salesforce-n8n connection errors](https://community.n8n.io/t/salesforce-connection-issue-with-n8n-oauth-error/193442/6).

To get the n8n app to show as a Connected App in Salesforce, you first need to "Connect account" from an n8n credential **using the System Admin user you are logged in as**.

#### 5.1. From n8n, create a Salesforce OAuth2 Credential and Connect using admin account

To see the `n8n` App on the Connected Apps list, you need to first use your SysAdmin account (the one you're using to modify the settings), and you need to authorise n8n.

To do so, go to n8n and navigate to the Salesforce credential (or create a new Salesforce OAuth2 API Credential) and click "Connect to my account". **It might throw an error,** that's fine, ignore it. This will install the n8n app automatically.

![n8n add Salesforce OAuth2 Credential](/imgs/article-n8n-salesforce-integration-user/n8n-add-salesforce-oauth2-credential.png)

#### 5.2. Install the n8n Connected App

Now, you should see `Apps` -> `Connected Apps` -> `Connected Apps OAuth Usage` -> `n8n`. Click `Install` and follow the steps.

![Install n8n Salesforce Connected App](/imgs/article-n8n-salesforce-integration-user/salesforce-install-n8n-connected-app.png)

### 6. Relax the IP Restrictions for the Connected App

From the same screen under `Connected Apps OAuth Usage`, find the n8n app row again and click `Manage App Policies` -> `Edit Policies` -> `IP Relaxation` -> `Relax IP Restrictions`.

### 7. From your n8n OAuth2 credential, connect using the new integration user

Do this from an incognito/private window, or start by logging out from your Sys Admin account on Salesforce.

The last step is to go to `n8n` -> `Credentials` -> and `Connect to Salesforce` Production with the new n8n user until you see this screen.

> Note: It seems to not work on the first attempt; just retry 3-5 times until you stop getting errors and see the `Connection successful` screen! Don't ask me why that happens!

![n8n Connect to Salesforce Oauth2 Integration User Success](/imgs/article-n8n-salesforce-integration-user/n8n-connection-to-salesforce-success.png)

### Don't forget to check the NPSP Error Log

To find out related permissions that you may have missed, execute a few test runs and check the error log.

![Salesforce NPSP Settings Error Log](/imgs/article-n8n-salesforce-integration-user/salesforce-npsp-settings-error-log.png)

---

## Wrapping up

This is needlessly convoluted 🤷 &mdash; I hope this tutorial helps you in the future.
