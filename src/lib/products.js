// Catalog matches the private-label supplier's 100ml dropper bottle
// (Yiwu Qunsen Craft Co.) — landed cost is roughly £1.04-1.21/unit at
// 500-2999pcs before customization/shipping. Sold as quantity tiers with
// an escalating discount off the £19.99 single-bottle price.
export const products = [
  {
    slug: "one-bottle",
    name: "1 Bottle",
    scent: "100ml beard oil",
    priceCents: 1399,
    compareAtCents: 1999,
    discountPercent: 30,
    color: "#c99b6b",
    image: "/products/qty-1.png",
    description:
      "Your first bottle. Lightweight, fast-absorbing oil base that softens coarse hair and calms the itch and flakiness of the first few weeks of growing out.",
    bullets: [
      "100ml — lasts ~3 months",
      "Non-greasy, fast-absorbing",
      "Softens & tames flyaways",
      "Free UK shipping over £35",
    ],
  },
  {
    slug: "two-bottles",
    name: "2 Bottles",
    scent: "2 x 100ml beard oil",
    priceCents: 2299,
    compareAtCents: 3998,
    discountPercent: 42,
    color: "#8fa377",
    image: "/products/qty-2.png",
    description:
      "Stock up and never run out. Two bottles at a lower price per bottle than buying one at a time.",
    bullets: [
      "2 x 100ml bottles",
      "Lower price per bottle",
      "Non-greasy, fast-absorbing",
      "Free UK shipping",
    ],
  },
  {
    slug: "three-bottles",
    name: "3 Bottles",
    scent: "3 x 100ml beard oil",
    priceCents: 3199,
    compareAtCents: 5997,
    discountPercent: 46,
    color: "#e2a582",
    image: "/products/qty-3.png",
    isBestValue: true,
    description:
      "Our best value pack. A 3 month supply for you, or share the extras — the best way to buy.",
    bullets: [
      "3 x 100ml bottles",
      "Best price per bottle",
      "Great gift option",
      "Free UK shipping",
    ],
  },
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}
