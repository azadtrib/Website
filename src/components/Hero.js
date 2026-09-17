import Link from "next/link";
import Image from "next/image";
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
            className="inline-block mt-8 bg-ink text-cream rounded-full px-7 py-3.5 font-semibold hover:opacity-85 transition-opacity"
          >
            Shop the collection
          </Link>
        </div>
        <div className="flex justify-center">
          <Image
            src="/hero.png"
            alt={siteConfig.brandName}
            width={620}
            height={633}
            priority
            className="w-full max-w-sm rounded-2xl object-cover border border-ink/10"
          />
        </div>
      </div>
    </section>
  );
}
