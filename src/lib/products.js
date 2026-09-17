// Catalog matches the private-label supplier's 100ml dropper bottle
// (Yiwu Qunsen Craft Co.) — landed cost is roughly £1.04-1.21/unit at
// 500-2999pcs before customization/shipping. Prices below are retail.
export const products = [
  {
    slug: "sandalwood",
    name: "Sandalwood",
    scent: "Warm sandalwood, amber, a hint of vanilla",
    priceCents: 1999,
    color: "#1a1a1a",
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
    color: "#3d3d3d",
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
    slug: "pine",
    name: "Pine",
    scent: "Fresh pine and forest woods",
    priceCents: 1999,
    color: "#6e6e6e",
    description:
      "A crisp, woody scent for guys who want something bolder. Great for daily wear without leaning sweet or heavy.",
    bullets: [
      "Bold, woody scent",
      "Lightweight daily formula",
      "Adds natural shine",
      "100ml — lasts ~3 months",
    ],
  },
  {
    slug: "starter-bundle",
    name: "Starter Bundle (All 3 Scents)",
    scent: "Sandalwood, Rosemary & Pine",
    priceCents: 4999,
    compareAtCents: 5997,
    color: "#000000",
    isBundle: true,
    description:
      "Try all three scents and find your signature. The easiest way to start — and the best value per bottle.",
    bullets: [
      "3 x 100ml bottles",
      "Save 20% vs buying separately",
      "Best gift option",
      "Free shipping included",
    ],
  },
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}
