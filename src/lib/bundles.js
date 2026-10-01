import { products, getProduct } from "./products";

const SINGLE_SLUG = "one-bottle";

// If someone has stacked up single bottles, there's a cheaper way to buy the
// same oil. Returns the biggest pack the singles could be swapped for and how
// much it saves, or null when there's nothing worth suggesting. Prices come
// from the catalogue, so this stays right if they change.
export function bundleSuggestion(items) {
  const singleLine = items.find((i) => i.slug === SINGLE_SLUG);
  const single = getProduct(SINGLE_SLUG);
  if (!singleLine || !single || singleLine.quantity < 2) return null;

  const target = products
    .filter((p) => p.bottles > 1 && p.bottles <= singleLine.quantity)
    .sort((a, b) => b.bottles - a.bottles)[0];
  if (!target) return null;

  const saveCents = target.bottles * single.priceCents - target.priceCents;
  if (saveCents <= 0) return null;

  return { target, singlesToReplace: target.bottles, saveCents };
}
