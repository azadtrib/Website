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

#### Sandbox vs live — read this first

Stripe has two separate worlds:

- **Sandbox / test mode** — fake money, for practising. Card numbers like
  `4242 4242 4242 4242` work. The payment page shows an orange **Sandbox**
  badge and the web address contains `cs_test_`.
- **Live mode** — real customers, real money.

They are completely separate: **keys, webhooks, settings and orders do not
carry over between them.** If you've been testing in a sandbox, going live is
not a toggle — you have to redo the key and webhook steps in live mode.

To leave the sandbox: click the sandbox/environment switcher at the top-left of
the Stripe dashboard and choose your real account, then make sure the
**Test mode** toggle (top right) is **OFF**.

#### Activate the account first

Stripe won't give you working live keys until the business is activated. Go to
the dashboard home — if there's a "Start accepting live payments" or
"Complete your profile" prompt, work through it. You'll need:

- Your business/sole-trader details and address
- A bank account for payouts
- Photo ID

Approval is usually quick, but can take a day or two. Do this early.

#### Then get the keys

1. In **live mode**, go to **Developers** → **API keys**.
2. Copy the **Publishable key** (starts `pk_live_`) and reveal + copy the
   **Secret key** (starts `sk_live_`).

In Vercel → your project → **Settings** → **Environment Variables**, add:

| Name | Value |
| --- | --- |
| `STRIPE_SECRET_KEY` | the `sk_live_…` key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | the `pk_live_…` key |

If these already hold `sk_test_`/`pk_test_` values, **edit them** — don't add a
second copy. Then redeploy (Step 6).

> ⚠️ The secret key is like the password to your bank. Never post it in a
> message, email or screenshot. If it ever leaks, click **Roll key** in Stripe
> immediately.

#### Set your business name

In the sandbox your payment page says something random like
"stripe-sandbox-blue-car". Customers would see that on the page where they type
their card details, which looks like a scam.

Go to **Settings** → **Business** → **Public details** and set the public
business name to **AZAD BLACK**. While you're there, add your logo and set the
brand colour under **Settings** → **Branding**.

### 4b. Tell Stripe to notify your site about orders

This is what triggers the order emails.

> 🚨 **The most common mistake.** Webhooks are per-mode. A webhook you created
> while testing **will not fire on real orders**. You must create a new one in
> live mode. If you skip this, payments still succeed and money still arrives —
> but nobody gets an email and orders won't appear on your `/admin` page.

1. In Stripe, **with Test mode OFF**, go to **Developers** → **Webhooks** →
   **Add endpoint**.
2. For the URL, enter your site address followed by the webhook path:
   `https://your-domain.co.uk/api/webhooks/stripe`
3. Under "Select events", choose **`checkout.session.completed`**.
4. Click **Add endpoint**.
5. On the endpoint's page, click **Reveal** under *Signing secret* and copy it
   (starts `whsec_`).
6. Back in Vercel, set (or edit):

| Name | Value |
| --- | --- |
| `STRIPE_WEBHOOK_SECRET` | the `whsec_…` value from the **live** endpoint |

To check it's working after your first real order: open the endpoint in Stripe
and look at its recent deliveries. You want a **200** response. Anything else
(especially 400) means the signing secret doesn't match — copy it again.

### 4c. Turn on Stripe's own receipts (recommended)

Stripe → **Settings** → **Payments** → **Customer emails** → turn on
*Successful payments*. Customers then get a card receipt from Stripe as well as
your branded confirmation email.

---

## Step 5 — Connect Resend (order emails)

1. Sign up at [resend.com](https://resend.com).
2. Go to **API Keys** → **Create API Key**. Set **Permission** to **Full
   access** — not "Sending access". Copy it (starts `re_`).

   > Why full access: the site saves everyone who signs up for the discount
   > as a Resend contact, so you can email them all later with Resend
   > Broadcasts. A "sending access" key can send emails but can't save
   > contacts. Your current key is sending-only, so sign-ups aren't reaching
   > Resend yet. (They're never lost, though — every sign-up is also kept in
   > Stripe, and `/admin` → **Download CSV** gives you the full list any time.)
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

1. Open your live site on your phone, in a private/incognito tab.
2. Wait for the discount pop-up, enter your email, scratch the card.
   - [ ] You see your code and a countdown
   - [ ] The discount email arrives
3. Pick a pack, pre-order, and **pay with your own card**.
   - [ ] The basket shows the 10% off before checkout
   - [ ] Stripe's page shows the discount and the pre-order note by the pay button
   - [ ] You land on the "Pre-order confirmed" page
   - [ ] You receive the pre-order confirmation email
   - [ ] You receive the new-order alert email
   - [ ] The order shows at `your-domain.co.uk/admin`, and you appear in the
         sign-up count
4. On the admin page, try **Email the ship date** and then **Mark as out for
   delivery**, and check both emails arrive.
5. Refund yourself: Stripe → **Payments** → click the payment → **Refund**.

If any email doesn't arrive, it's almost always the Resend domain not being
verified yet (Step 5).

---

## Running the pre-order day to day

The site sells the first drop as a **pre-order**: people pay now, and every
order ships together once your stock arrives.

**When a pre-order comes in** you'll get an email with what was bought and
where to send it. Nothing to do yet.

**When the supplier confirms when stock will land:**

1. In `src/lib/site-config.js`, set `shipEstimate` to how it should read, e.g.
   `"in early December 2026"`. That updates the whole site for new customers.
2. On `/admin`, use **Tell customers the ship date** to email everyone who's
   already ordered. It's safe to run again — nobody is told the same date
   twice.

**When stock arrives**, post each parcel, then on `/admin` click **Mark as out
for delivery** (paste in the tracking number/link if you have one). The
customer is emailed automatically.

**If someone wants to cancel** before it ships, refund them in full: Stripe →
Payments → the payment → Refund. The site promises this, and UK law expects it
when no delivery date was agreed.

> ⚠️ **Don't sit on pre-orders without a date for long.** With no agreed date,
> UK law expects delivery within 30 days of ordering. Give people a date as
> soon as you have one.

**Your mailing list**: `/admin` → **Download CSV** at any time. To email
everyone, import it into Resend (Audience → Contacts) and send a Broadcast —
Broadcasts add the unsubscribe link for you, which the law requires.

**To change prices or products**, edit `src/lib/products.js` on GitHub (you can
edit files directly on the GitHub website). Prices are in pence — `1399` is
£13.99. Saving the change automatically redeploys the site within a minute.

**To see your money**, use the Stripe dashboard. Payouts to your bank are set
up under Stripe → Settings → Payouts.

---

## Things still worth doing

- [ ] **Verify the Resend domain** (Step 5) — customer emails, including the
      discount email, don't reach anyone else without it.
- [ ] **Switch to a full-access Resend key** (Step 5) so sign-ups land in
      Resend as contacts.
- [ ] **Fill in your trader details** in `src/lib/site-config.js` — legal name
      and business address. The legal pages show a warning until you do.
- [ ] **Work through [COMPLIANCE.md](./COMPLIANCE.md)** — the cosmetics safety
      report, Responsible Person, SCPN registration and label. These block
      selling, pre-orders included.
- [ ] **Get the ingredients list** from the supplier and paste it into
      `ingredientsInci` in `src/lib/products.js`.
- [ ] **Set the ship date** (`preorder.shipEstimate`) as soon as you know it.
- [ ] **Add real reviews once you have them.** There are none on the site,
      deliberately — invented reviews are illegal advertising in the UK.

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
