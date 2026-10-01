import { cookies } from "next/headers";
import { getStripeClient } from "./stripe";
import { siteConfig } from "./site-config";
import { hmacHex, signValue, verifySignedValue } from "./signing";

// The first-drop offer: every email address gets its own Stripe promotion
// code, single use, expiring `validHours` after it's issued. Stripe enforces
// the expiry and the single use, so nothing here can be talked out of it.
//
// The code is derived from the email (keyed with a server secret, so it
// can't be guessed from an address). The same email therefore always maps
// to the same code, and signing up again can't restart the clock.

const COOKIE_NAME = "first_drop_offer";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normaliseEmail(raw) {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return null;
  return email;
}

export function codeForEmail(email) {
  return `${siteConfig.offer.codePrefix}-${hmacHex(`offer:${email}`).slice(0, 8).toUpperCase()}`;
}

let couponReady = null;

// The coupon behind every code. Created on first use so there's nothing to
// set up by hand in the Stripe dashboard; afterwards it's just looked up.
function ensureCoupon(stripe) {
  if (!couponReady) {
    const { couponId, percentOff } = siteConfig.offer;
    couponReady = stripe.coupons.retrieve(couponId).catch((err) => {
      if (err?.code !== "resource_missing") throw err;
      return stripe.coupons.create({
        id: couponId,
        percent_off: percentOff,
        duration: "once",
        name: `First drop ${percentOff}% off`,
      });
    });
    couponReady.catch(() => {
      couponReady = null;
    });
  }
  return couponReady;
}

async function findPromotionCode(stripe, code) {
  const { data } = await stripe.promotionCodes.list({ code, limit: 1 });
  return data[0] || null;
}

function describe(promo) {
  const expiresAt = promo.expires_at * 1000;
  const usedUp =
    promo.max_redemptions != null && promo.times_redeemed >= promo.max_redemptions;
  return {
    promoId: promo.id,
    code: promo.code,
    expiresAt,
    usable: promo.active && !usedUp && expiresAt > Date.now(),
  };
}

export async function issueOffer(email) {
  const stripe = getStripeClient();
  const code = codeForEmail(email);

  const existing = await findPromotionCode(stripe, code);
  if (existing) return { ...describe(existing), isNew: false };

  await ensureCoupon(stripe);
  const { couponId, validHours } = siteConfig.offer;
  try {
    const promo = await stripe.promotionCodes.create({
      promotion: { type: "coupon", coupon: couponId },
      code,
      expires_at: Math.floor(Date.now() / 1000) + validHours * 3600,
      max_redemptions: 1,
      metadata: { email, source: "first-drop-offer" },
    });
    return { ...describe(promo), isNew: true };
  } catch (err) {
    // Two submissions racing for the same email: the other one won, so use
    // the code it created rather than failing.
    const raced = await findPromotionCode(stripe, code);
    if (raced) return { ...describe(raced), isNew: false };
    throw err;
  }
}

// The browser keeps a signed reference to its code so checkout can apply it
// automatically. Signed so it can't be edited to point at someone else's code
// or to push back the expiry.
export async function rememberOffer({ promoId, expiresAt }) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, signValue(`${promoId}|${expiresAt}`), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.max(0, Math.floor((expiresAt - Date.now()) / 1000)),
  });
}

export async function readRememberedOffer() {
  const cookieStore = await cookies();
  const payload = verifySignedValue(cookieStore.get(COOKIE_NAME)?.value);
  if (!payload) return null;
  const [promoId, expiresAt] = payload.split("|");
  if (!promoId || !(Number(expiresAt) > Date.now())) return null;
  return { promoId, expiresAt: Number(expiresAt) };
}

// Every email that has signed up, read back from Stripe — each sign-up is a
// promotion code carrying the address in its metadata. This is the mailing
// list of record: it works even if the Resend key can't store contacts.
export async function listSignups(max = 10000) {
  const stripe = getStripeClient();
  // Not filtered by coupon: changing the discount means a new coupon, and
  // everyone who signed up under the old one still belongs on the list.
  const codes = await stripe.promotionCodes
    .list({ limit: 100 })
    .autoPagingToArray({ limit: max });

  return codes
    .filter((p) => p.metadata?.source === "first-drop-offer" && p.metadata?.email)
    .map((p) => ({
      email: p.metadata.email,
      code: p.code,
      signedUpAt: new Date(p.created * 1000).toISOString(),
      expiresAt: p.expires_at ? new Date(p.expires_at * 1000).toISOString() : "",
      redeemed: p.times_redeemed > 0,
    }));
}
