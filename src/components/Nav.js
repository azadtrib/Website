"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { useCart } from "@/lib/cart-context";

export default function Nav() {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-black/10">
      <nav className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight text-lg text-ink">
          {siteConfig.brandName}
        </Link>
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-ink/80">
          <Link href="/#shop" className="hover:text-ink">
            Shop
          </Link>
          <Link href="/#story" className="hover:text-ink">
            Our Story
          </Link>
          <Link href="/#faq" className="hover:text-ink">
            FAQ
          </Link>
        </div>
        <button
          onClick={openCart}
          className="relative rounded-full bg-ink text-cream px-4 py-2 text-sm font-semibold hover:bg-navy transition-colors"
        >
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-teal text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
