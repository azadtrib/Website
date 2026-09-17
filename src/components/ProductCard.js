"use client";

import Link from "next/link";
import Image from "next/image";
import BottleIcon from "./BottleIcon";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="group relative bg-navy rounded-2xl border border-ink/10 p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-ink/25 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/products/${product.slug}`}
        className="mb-4 w-24 h-24 flex items-center justify-center overflow-hidden"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={96}
            height={96}
            className="w-24 h-24 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <BottleIcon
            color={product.color}
            className="w-24 transition-transform duration-300 group-hover:scale-110"
          />
        )}
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
        className="mt-4 w-full bg-ink text-cream rounded-full py-2.5 text-sm font-semibold transition-all duration-200 hover:opacity-85 active:scale-95"
      >
        Add to cart
      </button>
    </div>
  );
}
