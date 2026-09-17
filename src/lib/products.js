// Placeholder catalog — edit names, prices (in cents) and copy to match your
// actual supplier once it's locked in.
export const products = [
  {
    slug: "original",
    name: "Original Beard Oil",
    scent: "Sandalwood & cedarwood, barely-there",
    priceCents: 1999,
    color: "#2f6f6e",
    description:
      "Our flagship blend. Lightweight jojoba and argan oil base that absorbs fast, softens coarse hair, and calms the itch and flakiness of the first few weeks of growing out.",
    bullets: [
      "Softens & tames flyaways",
      "Non-greasy, fast-absorbing",
      "Fragrance: light sandalwood",
      "60ml — lasts ~2 months",
    ],
  },
  {
    slug: "sandalwood",
    name: "Sandalwood Reserve",
    scent: "Warm sandalwood, amber, a hint of vanilla",
    priceCents: 1999,
    color: "#12213a",
    description:
      "A richer, warmer scent profile for guys who want their beard oil to double as a signature scent. Same nourishing base, dialed-up fragrance.",
    bullets: [
      "Deep conditioning blend",
      "Long-lasting warm scent",
      "Reduces beard dandruff",
      "60ml — lasts ~2 months",
    ],
  },
  {
    slug: "cedar-citrus",
    name: "Cedar & Citrus",
    scent: "Bright citrus top notes over grounded cedar",
    priceCents: 1999,
    color: "#c97b3f",
    description:
      "A sharper, energizing scent for daily wear. Great for guys who find heavier oils too strong for the office.",
    bullets: [
      "Bright, energizing scent",
      "Lightweight daily formula",
      "Adds natural shine",
      "60ml — lasts ~2 months",
    ],
  },
  {
    slug: "starter-bundle",
    name: "Starter Bundle (All 3 Scents)",
    scent: "Original, Sandalwood Reserve & Cedar & Citrus",
    priceCents: 4999,
    compareAtCents: 5997,
    color: "#14171c",
    isBundle: true,
    description:
      "Try all three scents and find your signature. The easiest way to start — and the best value per bottle.",
    bullets: [
      "3 x 60ml bottles",
      "Save 20% vs buying separately",
      "Best gift option",
      "Free shipping included",
    ],
  },
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}
