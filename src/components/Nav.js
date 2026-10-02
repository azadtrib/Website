"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import Logo from "./Logo";

const links = [
  { href: "/beard-oil", label: "Beard oil" },
  { href: "/#story", label: "Our story" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const menuButton = (
    <button
      type="button"
      className="sm:hidden -mr-2 w-10 h-10 flex items-center justify-center text-ink"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      aria-controls="mobile-menu"
      onClick={() => setMenuOpen((open) => !open)}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        {menuOpen ? (
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        ) : (
          <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );

  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-ink/[0.07]">
      <nav className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="-ml-1 p-1" onClick={() => setMenuOpen(false)}>
          <Logo className="h-8 sm:h-9" priority />
        </Link>

        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-ink/70">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={openCart}
            aria-label={itemCount > 0 ? `Basket, ${itemCount} item${itemCount === 1 ? "" : "s"}` : "Basket"}
            className="relative w-10 h-10 flex items-center justify-center text-ink/85 hover:text-ink transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 7h12l-1 13H7L6 7Z M9 7V6a3 3 0 0 1 6 0v1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            {itemCount > 0 && (
              <span
                key={itemCount}
                aria-hidden="true"
                className="absolute top-0.5 right-0 bg-teal text-cream text-[11px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center animate-[pop_0.3s_ease]"
              >
                {itemCount}
              </span>
            )}
          </button>
          {menuButton}
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="sm:hidden border-t border-ink/[0.07] bg-cream">
          <ul className="mx-auto max-w-6xl px-5 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 text-ink/80 hover:text-ink border-b border-ink/[0.06] last:border-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
