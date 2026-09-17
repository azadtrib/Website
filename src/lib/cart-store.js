// A tiny external store for the cart, backed by localStorage.
// Using useSyncExternalStore (instead of useState + useEffect) avoids a
// hydration mismatch: the server always "sees" an empty cart, and the real
// value from localStorage is only read on the client after mount.
const STORAGE_KEY = "cart-items";
const EMPTY = [];

let items = EMPTY;
let hydrated = false;
const listeners = new Set();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) items = JSON.parse(raw);
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
