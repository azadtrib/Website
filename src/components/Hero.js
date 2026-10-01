import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

// Problem → solution → action, in that order. Nothing here about who started
// the brand — that comes later, in support of the problem, not as the hook.
export default function Hero() {
  return (
    <section className="bg-peach overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-10 pb-14 sm:py-24 grid sm:grid-cols-2 gap-10 sm:gap-14 items-center">
        <div className="animate-fade-in-up">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-teal" />
            Pre-orders open · The first drop
          </p>
          <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl font-bold text-ink mt-4">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 text-ink/70 text-lg max-w-md">
            You want to look after yourself — not take on a ten-step routine.{" "}
            {siteConfig.brandName} keeps it simple, starting with one thing done properly: beard oil.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="#first-drop"
              className="text-center bg-ink text-cream rounded-full px-7 py-4 font-semibold uppercase tracking-wide text-sm transition-all duration-200 hover:opacity-85 active:scale-95"
            >
              Pre-order the first drop
            </Link>
            <Link
              href="#ritual"
              className="text-center border border-ink/25 rounded-full px-7 py-4 font-semibold text-sm text-ink transition-colors hover:border-ink/50"
            >
              See how simple it is
            </Link>
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <Image
            src="/hero.png"
            alt={`A man holding a dropper bottle of ${siteConfig.brandName} beard oil`}
            width={620}
            height={633}
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="w-full max-w-xl mx-auto rounded-2xl object-cover border border-ink/10"
          />
        </div>
      </div>
    </section>
  );
}
