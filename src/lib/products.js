import { siteConfig } from "./site-config";
import { formatPrice } from "./format";

// Catalog matches the private-label supplier's 100ml dropper bottle
// (Yiwu Qunsen Craft Co.) — landed cost is roughly £1.04-1.21/unit at
// 500-2999pcs before customization/shipping. Sold as quantity tiers.

// The INCI ingredient list, exactly as it appears on the bottle. Every
// tier is the same oil, so it lives here once. A UK cosmetic has to carry
// this on the label, and buyers with allergies need it before they order —
// get the real list from the supplier and paste it in. Until it's filled
// in, the product pages say it's available on request rather than invent one.
export const ingredientsInci = "";

const SINGLE_BOTTLE_CENTS = 1399;

// A struck-through reference price has to be a genuine price or it's a
// misleading saving under UK pricing law. The honest reference for a bundle
// is what the same number of single bottles costs, so it's derived from the
// single-bottle price rather than typed in, and can't drift from it.
function bundlePricing(bottles, priceCents) {
  const compareAtCents = bottles * SINGLE_BOTTLE_CENTS;
  return {
    compareAtCents,
    discountPercent: Math.floor(((compareAtCents - priceCents) / compareAtCents) * 100),
    savingCents: compareAtCents - priceCents,
  };
}

// Kept in step with checkout: no single tier clears the free-delivery
// threshold on its own, so none of them can promise free delivery outright.
function deliveryBullet(priceCents) {
  return priceCents >= siteConfig.freeShippingThresholdCents
    ? "Free UK delivery"
    : `Free UK delivery over ${formatPrice(siteConfig.freeShippingThresholdCents)}`;
}

export const products = [
  {
    slug: "one-bottle",
    name: "1 Bottle",
    bottles: 1,
    scent: "100ml beard oil",
    priceCents: SINGLE_BOTTLE_CENTS,
    color: "#c99b6b",
    image: "/products/qty-1.png",
    description:
      "Your first bottle. Lightweight, fast-absorbing oil base that softens coarse hair and calms the itch and flakiness of the first few weeks of growing out.",
    bullets: [
      "100ml — lasts around 3 months",
      "Non-greasy, fast-absorbing",
      "Softens & tames flyaways",
      deliveryBullet(SINGLE_BOTTLE_CENTS),
    ],
  },
  {
    slug: "two-bottles",
    name: "2 Bottles",
    bottles: 2,
    scent: "2 x 100ml beard oil",
    priceCents: 2299,
    ...bundlePricing(2, 2299),
    color: "#8fa377",
    image: "/products/qty-2.png",
    description:
      "Stock up and never run out. Two bottles at a lower price per bottle than buying one at a time.",
    bullets: [
      "2 x 100ml — around 6 months' supply",
      "Lower price per bottle",
      "Non-greasy, fast-absorbing",
      deliveryBullet(2299),
    ],
  },
  {
    slug: "three-bottles",
    name: "3 Bottles",
    bottles: 3,
    scent: "3 x 100ml beard oil",
    priceCents: 3199,
    ...bundlePricing(3, 3199),
    color: "#e2a582",
    image: "/products/qty-3.png",
    isBestValue: true,
    description:
      "Our best value pack. Around nine months' supply for you, or share the extras — the best way to buy.",
    bullets: [
      "3 x 100ml — around 9 months' supply",
      "Best price per bottle",
      "Great gift option",
      deliveryBullet(3199),
    ],
  },
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}
