// Catalog matches the private-label supplier's 100ml dropper bottle
// (Yiwu Qunsen Craft Co.) — landed cost is roughly £1.04-1.21/unit at
// 500-2999pcs before customization/shipping. Prices below are retail.
export const products = [
  {
    slug: "sandalwood",
    name: "Sandalwood",
    scent: "Warm sandalwood, amber, a hint of vanilla",
    priceCents: 1999,
    color: "#c99b6b",
    image: "/products/sandalwood.png",
    description:
      "Our flagship blend. Lightweight, fast-absorbing oil base that softens coarse hair and calms the itch and flakiness of the first few weeks of growing out.",
    bullets: [
      "Softens & tames flyaways",
      "Non-greasy, fast-absorbing",
      "Fragrance: warm sandalwood",
      "100ml — lasts ~3 months",
    ],
  },
  {
    slug: "rosemary",
    name: "Rosemary",
    scent: "Crisp, herbal rosemary",
    priceCents: 1999,
    color: "#8fa377",
    image: "/products/rosemary.png",
    description:
      "A sharp, herbal scent with rosemary oil known for supporting healthier-looking growth. Same nourishing base, refreshing daily fragrance.",
    bullets: [
      "Refreshing herbal scent",
      "Rosemary oil, known for scalp & beard health",
      "Non-greasy, fast-absorbing",
      "100ml — lasts ~3 months",
    ],
  },
  {
    slug: "starter-bundle",
    name: "Starter Duo (Both Scents)",
    scent: "Sandalwood & Rosemary",
    priceCents: 3199,
    compareAtCents: 3998,
    color: "#e2a582",
    isBundle: true,
    description:
      "Try both scents and find your signature. The easiest way to start — and the best value per bottle.",
    bullets: [
      "2 x 100ml bottles",
      "Save 20% vs buying separately",
      "Best gift option",
      "Free shipping included",
    ],
  },
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}
