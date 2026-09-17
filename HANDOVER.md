# Putting the AZAD BLACK store live

This guide takes you from "I've been handed a folder of code" to "my shop is
online and taking real payments". No coding required — it's all clicking
through websites and copying values between them.

Set aside about an hour. Do the steps in order.

---

## Before you start, get these accounts

| Account | What for | Cost |
| --- | --- | --- |
| [GitHub](https://github.com) | Stores the website's code | Free |
| [Vercel](https://vercel.com) | Runs the website | Free to start |
| [Stripe](https://stripe.com) | Takes card payments | ~1.5% + 20p per sale |
| [Resend](https://resend.com) | Sends order emails | Free to start |
| A domain name | e.g. azadblack.co.uk | ~£10/year |

---

## Step 1 — Get the code onto your GitHub

The code currently lives in someone else's GitHub account. You want your own
copy so you're in control.

1. Ask them to go to the repository on GitHub → **Settings** → scroll to the
   bottom → **Transfer ownership**, and transfer it to your GitHub username.
   (Alternatively they can add you as a collaborator, but transferring is
   cleaner if the shop is yours.)
2. Accept the transfer from the email GitHub sends you.

You should now see the repository listed under your own GitHub account.

---

## Step 2 — Put the site on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up **using your GitHub
   account** — this makes the next step much easier.
2. Click **Add New…** → **Project**.
3. Find the store's repository in the list and click **Import**.
4. Leave all the build settings exactly as they are. Vercel recognises
   Next.js automatically.
5. **Don't click Deploy yet** — first open the **Environment Variables**
   section and add the values in Step 3 below.

---

## Step 3 — Add your settings (environment variables)

These are the passwords and keys the site needs. In Vercel, add each one as a
separate variable (Name on the left, Value on the right).

Start with these three:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.co.uk` (your real domain) |
| `ADMIN_PASSWORD` | Any strong password you'll remember — this protects your orders page |
| `ADMIN_SESSION_SECRET` | A long random string. Get one at [random.org/strings](https://www.random.org/strings/) or just mash the keyboard for 40+ characters |

Then add the Stripe and Resend ones from Steps 4 and 5.

Now click **Deploy**. It takes a couple of minutes. When it finishes you'll get
a temporary web address like `azad-black.vercel.app` — the shop is live, but
payments won't work until Step 4.

---

## Step 4 — Connect Stripe (payments)

### 4a. Get your keys

1. Log in to [Stripe](https://dashboard.stripe.com).
2. Make sure the **Test mode** toggle (top right) is **OFF** for real payments.
3. Go to **Developers** → **API keys**.
4. Copy the **Publishable key** (starts `pk_live_`) and reveal + copy the
   **Secret key** (starts `sk_live_`).

In Vercel → your project → **Settings** → **Environment Variables**, add:

| Name | Value |
| --- | --- |
| `STRIPE_SECRET_KEY` | the `sk_live_…` key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | the `pk_live_…` key |

> ⚠️ The secret key is like the password to your bank. Never post it in a
> message, email or screenshot. If it ever leaks, click **Roll key** in Stripe
> immediately.

### 4b. Tell Stripe to notify your site about orders

This is what triggers the order emails.

1. In Stripe go to **Developers** → **Webhooks** → **Add endpoint**.
2. For the URL, enter your site address followed by the webhook path:
   `https://your-domain.co.uk/api/webhooks/stripe`
3. Under "Select events", choose **`checkout.session.completed`**.
4. Click **Add endpoint**.
5. On the endpoint's page, click **Reveal** under *Signing secret* and copy it
   (starts `whsec_`).
6. Back in Vercel, add:

| Name | Value |
| --- | --- |
| `STRIPE_WEBHOOK_SECRET` | the `whsec_…` value |

### 4c. Turn on Stripe's own receipts (recommended)

Stripe → **Settings** → **Payments** → **Customer emails** → turn on
*Successful payments*. Customers then get a card receipt from Stripe as well as
your branded confirmation email.

---

## Step 5 — Connect Resend (order emails)

1. Sign up at [resend.com](https://resend.com).
2. Go to **API Keys** → **Create API Key**, and copy it (starts `re_`).
3. Go to **Domains** → **Add Domain** → enter `azadblack.co.uk`.
4. Resend will show you several DNS records to add. Go to wherever you bought
   your domain, find its DNS settings, and add each record exactly as shown.
5. Wait until Resend shows the domain as **Verified** (usually minutes).
6. In Vercel, add:

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | the `re_…` key |
| `EMAIL_FROM` | `AZAD BLACK <orders@azadblack.co.uk>` |
| `OWNER_EMAIL` | your own email, for new-order alerts |

> **This step matters.** Until the domain is verified, Resend refuses to email
> anyone except the person who owns the Resend account. Customers would get
> nothing. Payments still work fine in the meantime — it's only the emails
> that wait.

---

## Step 6 — Point your domain at the site

1. In Vercel → your project → **Settings** → **Domains**.
2. Type your domain and click **Add**.
3. Vercel shows you DNS records to add — put them in at your domain registrar,
   same as you did for Resend.
4. Wait for Vercel to show a green tick. HTTPS is set up automatically.
5. Double-check `NEXT_PUBLIC_SITE_URL` in your environment variables matches
   this domain exactly (with `https://`, no trailing slash).

After changing any environment variable, go to the **Deployments** tab and
click **Redeploy** — changes only take effect on a new deployment.

---

## Step 7 — Test it properly before telling anyone

Do a real end-to-end run. It costs you only the Stripe fee on a real card.

1. Open your live site on your phone.
2. Add a product to the basket, go through checkout and **pay with your own
   card**.
3. Check that:
   - [ ] You land on the thank-you page
   - [ ] You receive the order confirmation email
   - [ ] You receive the new-order alert email
   - [ ] The order shows in Stripe → **Payments**
   - [ ] The order shows at `your-domain.co.uk/admin`
4. On the admin page, click **Mark as out for delivery** and check the
   "out for delivery" email arrives.
5. Refund yourself: Stripe → **Payments** → click the payment → **Refund**.

If any email doesn't arrive, it's almost always the Resend domain not being
verified yet (Step 5).

---

## Running the shop day to day

**When an order comes in** you'll get an email with what was bought and where
to send it. Post the parcel, then go to `your-domain.co.uk/admin`, sign in with
your `ADMIN_PASSWORD`, find the order, and click **Mark as out for delivery**.
The customer is emailed automatically. Clicking twice won't spam them.

**To change prices or products**, edit `src/lib/products.js` on GitHub (you can
edit files directly on the GitHub website). Prices are in pence — `1399` is
£13.99. Saving the change automatically redeploys the site within a minute.

**To see your money**, use the Stripe dashboard. Payouts to your bank are set
up under Stripe → Settings → Payouts.

---

## Things still worth doing

- [ ] **Verify the Resend domain** (Step 5) — customer emails don't work
      without it.
- [ ] **Add real customer reviews.** The reviews section was removed because
      there weren't any yet. Publishing made-up reviews is illegal advertising
      in the UK, so only add genuine ones.
- [ ] **Write proper legal pages** — returns/refunds policy, privacy policy and
      terms. UK consumer law requires these for online selling, and Stripe
      expects them too.
- [ ] **Check the product descriptions are accurate** — avoid medical claims
      like "cures" or "guarantees growth", which aren't allowed.
- [ ] **Decide on shipping.** The site currently ships to the UK only, charges
      £3.99, and is free over £35. Change those in `src/lib/site-config.js`.
- [ ] **Set the social links** — Instagram and TikTok in
      `src/lib/site-config.js` currently point at the generic homepages.

---

## If something goes wrong

- **Site won't build after an edit** — Vercel → **Deployments** → click the
  failed one to see the error. The previous working version stays live, so
  customers aren't affected.
- **Payments failing** — check `STRIPE_SECRET_KEY` is the `sk_live_` key and
  that you redeployed after adding it.
- **No emails** — check the Resend domain is verified, and look at Stripe →
  Developers → Webhooks to see whether the notification was delivered.
- **Locked out of /admin** — change `ADMIN_PASSWORD` in Vercel and redeploy.
