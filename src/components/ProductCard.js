"use client";

import Link from "next/link";
import BottleIcon from "./BottleIcon";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`} className="mb-4">
        <BottleIcon color={product.color} className="w-24" />
      </Link>
      <Link href={`/products/${product.slug}`} className="font-semibold hover:underline">
        {product.name}
      </Link>
      <p className="text-ink/60 text-sm mt-1">{product.scent}</p>
      <div className="mt-3 flex items-center gap-2">
        <span className="font-bold">{formatPrice(product.priceCents)}</span>
        {product.compareAtCents && (
          <span className="text-ink/40 line-through text-sm">
            {formatPrice(product.compareAtCents)}
          </span>
        )}
      </div>
      <button
        onClick={() => addItem(product)}
        className="mt-4 w-full bg-ink text-cream rounded-full py-2.5 text-sm font-semibold hover:bg-navy transition-colors"
      >
        Add to cart
      </button>
    </div>
  );
}
