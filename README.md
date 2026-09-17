# AZAD BLACK — online store

A beard oil store built with Next.js. Customers browse products, add them to a
basket, and pay by card through Stripe. Order emails are sent with Resend.

**If you are taking this site over, read [HANDOVER.md](./HANDOVER.md) first.**
It walks through putting the site live on Vercel step by step.

---

## Running it on your own computer

You need [Node.js](https://nodejs.org) 20 or newer installed.

```bash
npm install          # install dependencies (first time only)
npm run dev          # start the site at http://localhost:3000
```

Other commands:

```bash
npm run build        # make a production build (checks everything compiles)
npm start            # run that production build locally
npm run lint         # check code style
```

## Environment variables

Copy `.env.local.example` to `.env.local` and fill it in. That file is
deliberately **never committed to git** — it holds secrets.

| Variable | What it's for | Where to get it |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Taking payments | Stripe → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe's public key | Same page as above |
| `STRIPE_WEBHOOK_SECRET` | Verifies order notifications are really from Stripe | Stripe → Developers → Webhooks |
| `NEXT_PUBLIC_SITE_URL` | The site's real web address | Your domain, e.g. `https://azadblack.co.uk` |
| `RESEND_API_KEY` | Sending order emails | resend.com → API Keys |
| `EMAIL_FROM` | The "from" address on emails | Must use a domain verified in Resend |
| `OWNER_EMAIL` | Where new-order alerts go | Your own inbox |
| `ADMIN_PASSWORD` | Password for the `/admin` orders page | Choose a strong one |
| `ADMIN_SESSION_SECRET` | Keeps the admin login secure | Run `openssl rand -hex 32` |

## How the shop works

### Changing products or prices

Everything about the products lives in one file: **`src/lib/products.js`**.

Prices are written in **pence**, not pounds — `1399` means £13.99. Each product
has an optional `compareAtCents` (the crossed-out "was" price) and
`discountPercent` (the "Limited discount" badge).

Product photos live in `public/products/`. Reference them by filename, e.g.
`image: "/products/qty-1.png"`.

### Changing text, prices of shipping, or contact details

**`src/lib/site-config.js`** holds the brand name, tagline, support email,
social links, shipping cost and the free-shipping threshold.

Page text lives in the components: the homepage sections are in
`src/app/page.js`, and the FAQ answers are in `src/components/FAQAccordion.js`.

### What happens when someone orders

1. Customer adds items to the basket and clicks **Checkout**.
2. They are sent to Stripe's secure payment page. Card details never touch
   this site.
3. When payment succeeds, Stripe notifies `/api/webhooks/stripe`, which:
   - emails the customer an order confirmation, and
   - emails **you** the order details and delivery address.
4. The customer lands on a thank-you page that confirms the payment really
   went through, and tells them they'll be emailed when it's out for delivery.
5. When you post the parcel, you open `/admin`, find the order, and click
   **Mark as out for delivery**. That emails the customer.

There is no separate database — Stripe stores the orders, and the site reads
them back. That means one less thing to pay for or maintain.

### The admin page

Go to `https://your-domain.co.uk/admin` and enter your `ADMIN_PASSWORD`.

It lists paid orders with the items, total, customer email and shipping
address, plus the button to mark an order as out for delivery. Clicking it
twice won't send the customer a duplicate email.

## Sending order emails

Emails go out through [Resend](https://resend.com).

**Important:** until you verify a domain in Resend, it will only deliver email
to the address that owns the Resend account. Real customers will not receive
anything. To fix that:

1. Go to resend.com → **Domains** → **Add Domain** and enter `azadblack.co.uk`.
2. Resend shows you a few DNS records (usually `MX`, `TXT`/SPF and DKIM).
3. Add those records wherever your domain is registered (e.g. GoDaddy,
   Namecheap, Cloudflare).
4. Wait for Resend to show the domain as **Verified** — usually minutes, but
   it can take a few hours.
5. Set `EMAIL_FROM` to something on that domain, e.g.
   `AZAD BLACK <orders@azadblack.co.uk>`, and redeploy.

Until that's done the site still works and still takes payments — only the
customer emails are held back.

## Security notes

- Prices are always recalculated on the server from `products.js`, so a
  customer editing the page in their browser cannot pay less than the real
  price.
- The Stripe webhook verifies Stripe's signature, so nobody can fake an order.
- The thank-you page asks Stripe whether the payment really succeeded before
  confirming anything.
- The `/admin` page is password protected, its login cookie is signed and
  cannot be read by JavaScript, and search engines are told not to index it.
- Security headers (HSTS, clickjacking and MIME-sniffing protection) are set
  in `next.config.mjs`.
- Never commit `.env.local`, and never paste secret keys into chat or email.
  If a key leaks, roll it in the Stripe/Resend dashboard straight away.
