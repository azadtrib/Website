"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { useCart } from "@/lib/cart-context";

export default function Nav() {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-ink/10">
      <nav className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight text-lg text-ink">
          {siteConfig.brandName}
        </Link>
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-ink/80">
          <Link href="/#shop" className="hover:text-ink transition-colors">
            Shop
          </Link>
          <Link href="/#story" className="hover:text-ink transition-colors">
            Our Story
          </Link>
          <Link href="/#faq" className="hover:text-ink transition-colors">
            FAQ
          </Link>
        </div>
        <button
          onClick={openCart}
          className="relative rounded-full bg-ink text-cream px-4 py-2 text-sm font-semibold transition-all duration-200 hover:opacity-85 active:scale-95"
        >
          Cart
          {itemCount > 0 && (
            <span
              key={itemCount}
              className="absolute -top-2 -right-2 bg-teal text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-[pop_0.3s_ease]"
            >
              {itemCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
