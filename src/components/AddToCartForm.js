"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function AddToCartForm({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-7 flex items-center gap-3">
      <div className="flex items-center border border-ink/20 rounded-full">
        <button
          className="w-9 h-9 transition-transform active:scale-90"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <span className="w-8 text-center">{qty}</span>
        <button
          className="w-9 h-9 transition-transform active:scale-90"
          onClick={() => setQty((q) => q + 1)}
        >
          +
        </button>
      </div>
      <button
        onClick={() => addItem(product, qty)}
        className="flex-1 bg-ink text-cream rounded-full py-3 font-semibold transition-all duration-200 hover:opacity-85 active:scale-95"
      >
        Add to cart
      </button>
    </div>
  );
}
