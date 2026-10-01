# Before you sell: UK compliance checklist

Beard oil is a **cosmetic product** in UK law, not a general consumer good.
That brings obligations that apply before the first sale, not after.

This is a plain-English checklist of what's outstanding, written so you know
what to go and ask for. It isn't legal advice — for the cosmetics items in
particular, the safety assessor and your Responsible Person are the people
whose word counts.

The website side of this is already built (see the bottom section). The parts
below are things only you can do.

---

## 1. Cosmetics law — blocks selling

Under the UK Cosmetics Regulation you can't legally place a cosmetic on the
market until all four of these exist.

### Start with your supplier — this could save you a lot

The oil comes from **Guangzhou Biying Cosmetics Co., Ltd.** (Guangzhou, China;
their own brand is MOOYAM). Their Alibaba listing shows **SCPN (UK)** and
**CPNP (EU)** certificates for this beard oil, which strongly suggests a UK/EU
safety assessment already exists for the formula.

But their notification covers *their* product under *their* Responsible
Person. Once it's relabelled as AZAD BLACK, you're the one placing it on the UK
market, so you need your own notification and the paperwork behind it. Ask
them, in writing, for:

- the **CPSR**, and whether it's valid in the UK and covers a 30ml bottle
  under your label
- the **full INCI ingredient list with percentages** (the listing only says
  "Herbal", which isn't enough for a label or for allergy sufferers)
- their **SCPN notification reference** and who their UK Responsible Person is
- their **GMP certificate** (ISO 22716 / GMPC)
- written confirmation of any **cruelty-free** status, if you want to keep
  that claim

### A Cosmetic Product Safety Report (CPSR)

A qualified safety assessor reviews the formula and signs off that it's safe
for its intended use. You can't write this yourself.

- If the supplier's CPSR is UK-valid and covers your product, you may be able
  to rely on it. Confirm with the assessor who signed it.
- If they only have a Chinese or US assessment, it probably won't satisfy UK
  rules — budget for a UK assessor.
- Expect to supply the exact formula breakdown with percentages.

### A UK Responsible Person (RP)

A named person or company, based in the UK, legally accountable for the
product. If you're importing from the Alibaba supplier and selling under your
own brand, **that's you** unless you appoint a third-party RP service.

The RP holds the Product Information File (PIF) — the CPSR, the formula, the
manufacturing details, and the claims evidence — and must produce it for
Trading Standards on request.

### Registration on the government portal

Every cosmetic must be notified on the **Submit Cosmetic Product Notification
(SCPN)** service before it goes on sale. It's free, it's done by the RP, and
it needs the CPSR and formula to hand.

### A compliant label

The bottle (and/or the box) must show:

- the product function, if not obvious
- the **full ingredients list in INCI order**, prefixed "Ingredients:"
- the nominal content (30ml / 1.01 fl.oz)
- a batch/lot number
- a **period-after-opening symbol** (the open-jar icon, e.g. "12M") rather
  than a best-before date — the supplier gives a 3-year shelf life, which is
  over the 30-month cut-off. Ask them what the PAO should be.
- the **name and UK address of the Responsible Person**
- country of origin — **Made in China**
- any required warnings

> **Action:** get the INCI list from the supplier and paste it into
> `ingredientsInci` in `src/lib/products.js`. Until then the product pages say
> the list is available on request rather than inventing one.

### Watch your product claims

Cosmetic claims have to be substantiated and must not stray into medical
territory. "Softens and conditions" is fine. "Cures", "treats", "guarantees
growth", "stops hair loss" are not — those make it a medicine.

**Don't copy the supplier's marketing.** Their listing calls it a "Beard
Growth Oil" that "accelerates hair regrowth" and "eliminates itching and
dandruff". Growth claims make it a medicine; the rest is stronger than a
cosmetic can say without evidence. The site deliberately uses none of it.
This applies to Instagram and TikTok posts too — the ASA treats social media
posts as advertising.

Still on the site and worth checking:

- the homepage line **"Small batch · Cruelty-free"**. "Small batch" is hard to
  defend for a factory-made private-label oil, and "cruelty-free" needs the
  supplier's written confirmation. Reword it if you can't back both.

The FAQ used to call the oil "non-comedogenic". Nothing from the supplier
supports that, so it now says "made for all skin types", which is what their
listing states.

---

## 2. Trading law — do before launch

### Say who you are

UK e-commerce rules require a seller to be identifiable. Fill in the `business`
block in `src/lib/site-config.js`:

- legal name (your own name if you're a sole trader, otherwise the registered
  company name)
- a geographic business address — a PO box or a bare email isn't enough
- company number, if you've registered a limited company
- VAT number, only if you're VAT registered

Until these are filled in, the legal pages display a visible notice saying so,
and the footer leaves the line out — so you'll see immediately when it's done.

### Sole trader or limited company?

Either is fine legally, but decide before you start taking money, because it
changes what goes on the site, how you're taxed, and your personal liability.
Register as self-employed with HMRC if you're trading as a sole trader.

### VAT

You only need to register once your turnover passes the threshold, but keep an
eye on it. Prices on the site are presented as VAT-inclusive.

### Insurance

Product liability insurance is strongly advised for anything people put on
their skin. Ask a broker for cosmetics product liability.

---

## 3. Credibility — cheap and worth doing

- **Real social links.** Done — the footer links to @azadblack_ on Instagram and
  TikTok. If either handle ever changes, update it in `site-config.js`.
- **A real support inbox.** `hello@azadblack.co.uk` needs to exist and be
  monitored. It's also the address customers reply to on order emails.
- **Real reviews only.** The reviews section was removed because there weren't
  any yet. Publishing invented reviews breaks consumer protection law and
  Trading Standards do enforce it.

---

## What's already done on the website

| Item | Status |
| --- | --- |
| Privacy policy (`/privacy`) | Written, lists the real data processors |
| Terms & conditions (`/terms`) | Written |
| Returns & refunds (`/returns`) | Written, covers both the 30-day guarantee and statutory rights |
| Delivery & shipping (`/shipping`) | Written, pulls live costs from config |
| Footer links to all of the above | Done |
| Social links pointing at the real profiles | Done |
| Ingredients section on product pages | Built, waiting on the real INCI list |
| Trader details shown site-wide | Built, waiting on your business details |

The four legal pages are written in plain English and reflect how this shop
actually works — they're a solid starting point, not a substitute for having
someone qualified glance over them once real money is moving.
