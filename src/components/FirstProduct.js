import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { BOTTLE_SIZE, oilBenefits, products } from "@/lib/products";

export default function FirstProduct() {
  return (
    <section id="beard-oil" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 grid sm:grid-cols-2 gap-10 sm:gap-14 items-center">
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-ink/10 bg-peach-light">
          <Image
            src={products[0].image}
            alt={`A ${BOTTLE_SIZE} dropper bottle of ${siteConfig.brandName} beard oil`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-teal text-xs font-semibold uppercase tracking-widest">The first product</p>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">Beard oil.</h2>
          <p className="text-ink/70 text-lg mt-5">
            Growing a beard comes with itch, flakes, and hair that turns wiry and won&apos;t sit
            right. Most men just put up with it. Sorting it shouldn&apos;t take a routine.
          </p>
          <ul className="mt-6 space-y-2.5">
            {oilBenefits.map((o) => (
              <li key={o} className="flex gap-3 text-ink/80">
                <span aria-hidden="true" className="text-teal">✓</span>
                {o}
              </li>
            ))}
          </ul>
          <p className="text-ink/50 text-sm mt-5">
            {BOTTLE_SIZE} dropper bottle · around two months of daily use
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="#first-drop"
              className="text-center bg-ink text-cream rounded-full px-7 py-4 font-semibold uppercase tracking-wide text-sm transition-all duration-200 hover:opacity-85 active:scale-95"
            >
              Pre-order
            </Link>
            <Link
              href="/beard-oil"
              className="text-center border border-ink/25 rounded-full px-7 py-4 font-semibold text-sm text-ink transition-colors hover:border-ink/50"
            >
              Everything about it
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
