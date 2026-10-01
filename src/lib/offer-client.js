"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

// Browser-side view of the first-drop offer: whether this visitor has
// unlocked a code, and whether the pop-up is open. The real code lives in
// Stripe and a signed cookie; this copy is only for display (the countdown,
// "applied at checkout" in the basket) and is never trusted by the server.

const OFFER_KEY = "first-drop-offer";
const DISMISSED_KEY = "first-drop-offer-dismissed";
const DISMISS_FOR_MS = 7 * 24 * 60 * 60 * 1000;

const SERVER_SNAPSHOT = { offer: null, modalOpen: false };
let snapshot = SERVER_SNAPSHOT;
let hydrated = false;
const listeners = new Set();

function readStorage(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    if (value == null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private browsing etc. — the offer still works via the cookie.
  }
}

function setSnapshot(next) {
  snapshot = { ...snapshot, ...next };
  listeners.forEach((listener) => listener());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const saved = readStorage(OFFER_KEY);
  snapshot = {
    ...snapshot,
    offer: saved?.expiresAt > Date.now() ? saved : null,
  };
}

const store = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    hydrate();
    return snapshot;
  },
  getServerSnapshot() {
    return SERVER_SNAPSHOT;
  },
};

export function useOfferState() {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}

export function saveOffer(offer) {
  writeStorage(OFFER_KEY, offer);
  setSnapshot({ offer });
}

export function openOfferModal() {
  setSnapshot({ modalOpen: true });
}

export function closeOfferModal() {
  // Closing counts as "not now": the pop-up won't open by itself again for a
  // week. Opening it deliberately (a "get 10% off" link) still works.
  writeStorage(DISMISSED_KEY, Date.now());
  setSnapshot({ modalOpen: false });
}

export function recentlyDismissed() {
  const at = readStorage(DISMISSED_KEY);
  return typeof at === "number" && Date.now() - at < DISMISS_FOR_MS;
}

export async function claimOffer(email, company = "") {
  const res = await fetch("/api/offer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, company }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  if (!data.code) throw new Error("Something went wrong. Please try again.");
  const offer = { code: data.code, percentOff: data.percentOff, expiresAt: data.expiresAt };
  saveOffer(offer);
  return offer;
}

// "23h 41m left" — ticks once a minute, which is all the precision a 24-hour
// window needs.
export function useTimeLeft(expiresAt) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!expiresAt) return;
    const id = setInterval(() => setNow(Date.now()), 30 * 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  if (!expiresAt) return null;
  const ms = expiresAt - now;
  if (ms <= 0) return "expired";
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return hours > 0 ? `${hours}h ${minutes}m left` : `${minutes}m left`;
}
