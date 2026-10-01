"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { cartStore } from "./cart-store";

const CartContext = createContext(null);

// Must match the per-line limit enforced by /api/checkout, or a customer can
// build a basket that checkout then refuses.
export const MAX_LINE_QUANTITY = 20;

export function CartProvider({ children }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product, quantity = 1) => {
    cartStore.setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === product.slug
            ? { ...i, quantity: Math.min(MAX_LINE_QUANTITY, i.quantity + quantity) }
            : i
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          priceCents: product.priceCents,
          quantity: Math.min(MAX_LINE_QUANTITY, quantity),
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((slug, quantity) => {
    cartStore.setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) =>
            i.slug === slug ? { ...i, quantity: Math.min(MAX_LINE_QUANTITY, quantity) } : i
          )
    );
  }, []);

  const removeItem = useCallback((slug) => {
    cartStore.setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clearCart = useCallback(() => cartStore.setItems([]), []);
  // Stable identities: the drawer's focus handling depends on closeCart, and
  // a new function every render would re-run it on each click.
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const subtotalCents = useMemo(
    () => items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    subtotalCents,
    itemCount,
    isOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
