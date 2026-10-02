import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { BOTTLE_IMAGE, BOTTLE_SIZE } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { lowestPriceCents } from "@/lib/seo";

// Problem → solution → action, in that order. Nothing here about who started
// the brand — that comes later, in support of the problem, not as the hook.
export default function Hero() {
  // The last three words of the tagline drop back to the muted tone.
  const words = siteConfig.tagline.split(" ");
  const lead = words.slice(0, -3).join(" ");
  const muted = words.slice(-3).join(" ");

  return (
    <section className="texture overflow-hidden">
      <div className="mx-auto max-w-3xl px-5 pt-12 pb-16 sm:pt-24 sm:pb-24 text-center animate-fade-in-up">
        <p className="eyebrow">Pre-orders open · The first drop</p>
        <h1 className="mt-5 text-[2.5rem] leading-[1.04] sm:text-7xl font-bold tracking-tight text-balance">
          {lead} <span className="heading-muted block">{muted}</span>
        </h1>
        <p className="lede mt-6 max-w-xl mx-auto">
          You want to look after yourself — not take on a ten-step routine.{" "}
          {siteConfig.brandName} keeps it simple, starting with one thing done properly: beard oil.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-4">
          <Link href="#first-drop" className="btn">
            Pre-order the first drop
          </Link>
          <Link href="#ritual" className="btn-text">
            See how simple it is
          </Link>
        </div>

        <div className="relative mt-12 sm:mt-16 flex justify-center">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full bg-teal/20 blur-3xl"
          />
          <Image
            src={BOTTLE_IMAGE.src}
            width={BOTTLE_IMAGE.width}
            height={BOTTLE_IMAGE.height}
            alt={`A ${BOTTLE_SIZE} amber dropper bottle of ${siteConfig.brandName} beard oil`}
            priority
            sizes="160px"
            className="relative h-[17rem] sm:h-80 w-auto rounded-2xl border border-ink/10 shadow-2xl shadow-black/60"
          />
        </div>
        <p className="mt-6 text-ink/45 text-xs uppercase tracking-[0.2em]">
          {BOTTLE_SIZE} · from {formatPrice(lowestPriceCents())} · UK delivery
        </p>
      </div>
    </section>
  );
}
