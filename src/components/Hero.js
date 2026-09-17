import Link from "next/link";
import BottleIcon from "./BottleIcon";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="bg-peach">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24 grid sm:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-widest text-xs font-semibold text-navy/70 mb-4">
            Small batch · Cruelty-free
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 text-ink/70 text-lg max-w-md">
            {siteConfig.description}
          </p>
          <Link
            href="#shop"
            className="inline-block mt-8 bg-ink text-cream rounded-full px-7 py-3.5 font-semibold hover:bg-navy transition-colors"
          >
            Shop the collection
          </Link>
        </div>
        <div className="flex justify-center gap-4">
          <BottleIcon color="#2f6f6e" className="w-24 sm:w-32 -rotate-6" />
          <BottleIcon color="#12213a" className="w-28 sm:w-36 translate-y-4" />
          <BottleIcon color="#c97b3f" className="w-24 sm:w-32 rotate-6" />
        </div>
      </div>
    </section>
  );
}
