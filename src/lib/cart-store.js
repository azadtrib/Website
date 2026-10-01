// A tiny external store for the cart, backed by localStorage.
// Using useSyncExternalStore (instead of useState + useEffect) avoids a
// hydration mismatch: the server always "sees" an empty cart, and the real
// value from localStorage is only read on the client after mount.
import { getProduct } from "./products";

const STORAGE_KEY = "cart-items";
const EMPTY = [];
const MAX_QUANTITY = 20;

let items = EMPTY;
let hydrated = false;
const listeners = new Set();

// A saved basket can be weeks old. Products get removed and prices change in
// the meantime, and a stale basket would show the wrong price and fail at
// checkout with no way out. So whatever was saved is re-checked against the
// live catalogue: unknown products dropped, names and prices refreshed,
// quantities kept within what checkout accepts.
function reconcile(saved) {
  if (!Array.isArray(saved)) return EMPTY;
  const result = [];
  for (const entry of saved) {
    const product = getProduct(entry?.slug);
    const quantity = Math.min(MAX_QUANTITY, Math.floor(Number(entry?.quantity)));
    if (!product || !(quantity >= 1)) continue;
    result.push({
      slug: product.slug,
      name: product.name,
      priceCents: product.priceCents,
      quantity,
    });
  }
  return result;
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const cleaned = reconcile(JSON.parse(raw));
    items = cleaned;
    if (JSON.stringify(cleaned) !== raw) persist();
  } catch {
    // ignore corrupt/unavailable storage
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write failures (private browsing, quota, etc.)
  }
}

export const cartStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    hydrate();
    return items;
  },
  getServerSnapshot() {
    return EMPTY;
  },
  setItems(updater) {
    items = typeof updater === "function" ? updater(items) : updater;
    persist();
    listeners.forEach((listener) => listener());
  },
};
