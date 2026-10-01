"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { siteConfig, shipStatus } from "@/lib/site-config";
import { useCart } from "@/lib/cart-context";
import { openOfferModal, useOfferState, useTimeLeft } from "@/lib/offer-client";

export default function PackPicker() {
  const { addItem } = useCart();
  const { offer } = useOfferState();
  const timeLeft = useTimeLeft(offer?.expiresAt);
  // A single bottle first: the lowest-commitment way to try a brand nobody
  // knows yet. The packs sit right beside it, with their savings shown.
  const [slug, setSlug] = useState(products[0].slug);
  const selected = products.find((p) => p.slug === slug);
  const offerActive = offer && timeLeft && timeLeft !== "expired";

  return (
    <div>
      <fieldset>
        <legend className="text-sm font-semibold text-ink mb-3">Choose your pack</legend>
        <div className="grid gap-3">
          {products.map((p) => {
            const checked = p.slug === slug;
            return (
              <label
                key={p.slug}
                className={`relative flex items-center gap-4 rounded-2xl border px-4 py-3.5 cursor-pointer transition-colors ${
                  checked ? "border-teal bg-teal/10" : "border-ink/15 hover:border-ink/30"
                }`}
              >
                <input
                  type="radio"
                  name="pack"
                  value={p.slug}
                  checked={checked}
                  onChange={() => setSlug(p.slug)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`w-5 h-5 rounded-full border-2 flex-none flex items-center justify-center ${
                    checked ? "border-teal" : "border-ink/30"
                  }`}
                >
                  {checked && <span className="w-2.5 h-2.5 rounded-full bg-teal" />}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{p.name}</span>
                    {p.isBestValue && (
                      <span className="bg-teal text-cream text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                        Best value
                      </span>
                    )}
                  </span>
                  <span className="block text-ink/55 text-xs mt-0.5">
                    {formatPrice(Math.round(p.priceCents / p.bottles))} per bottle
                    {p.savingCents > 0 && ` · save ${formatPrice(p.savingCents)}`}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-bold">{formatPrice(p.priceCents)}</span>
                  {p.compareAtCents && (
                    <span className="block text-ink/40 line-through text-xs" title="Price as single bottles">
                      <span className="sr-only">Price as single bottles: </span>
                      {formatPrice(p.compareAtCents)}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 text-sm" aria-live="polite">
        {offerActive ? (
          <p className="text-teal">
            ✓ Your {offer.percentOff}% off is applied at checkout · {timeLeft}
          </p>
        ) : (
          <button
            type="button"
            onClick={openOfferModal}
            className="text-teal hover:underline underline-offset-4"
          >
            Get {siteConfig.offer.percentOff}% off your pre-order →
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => addItem(selected, 1)}
        className="mt-5 w-full bg-ink text-cream rounded-full py-4 font-semibold uppercase tracking-wide text-sm transition-all duration-200 hover:opacity-85 active:scale-95"
      >
        Pre-order — {formatPrice(selected.priceCents)}
      </button>

      <p className="text-ink/55 text-xs mt-3 leading-relaxed">
        {shipStatus()} Cancel any time before it ships for a full refund.
      </p>
    </div>
  );
}
