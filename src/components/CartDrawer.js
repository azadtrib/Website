"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { siteConfig } from "@/lib/site-config";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, subtotalCents } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-navy border-l border-ink/10 z-50 shadow-xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-ink/10">
          <h2 className="font-bold text-lg">Your cart</h2>
          <button onClick={closeCart} className="text-ink/60 hover:text-ink text-sm">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <p className="text-ink/60 text-sm">Your cart is empty.</p>
          )}
          {items.map((item) => (
            <div key={item.slug} className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-ink/60 text-xs">{formatPrice(item.priceCents)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-7 h-7 rounded-full border border-ink/20 text-sm"
                  onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                >
                  −
                </button>
                <span className="w-5 text-center text-sm">{item.quantity}</span>
                <button
                  className="w-7 h-7 rounded-full border border-ink/20 text-sm"
                  onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 border-t border-ink/10 space-y-3">
          <div className="flex justify-between text-sm text-ink/70">
            <span>Shipping</span>
            <span>
              {subtotalCents >= siteConfig.freeShippingThresholdCents || subtotalCents === 0
                ? "Free"
                : formatPrice(siteConfig.flatShippingCents)}
            </span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(subtotalCents)}</span>
          </div>
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <button
            disabled={items.length === 0 || loading}
            onClick={handleCheckout}
            className="w-full bg-ink text-cream rounded-full py-3 font-semibold disabled:opacity-40 hover:opacity-85 transition-opacity"
          >
            {loading ? "Redirecting…" : "Checkout"}
          </button>
        </div>
      </aside>
    </>
  );
}
