import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { BOTTLE_IMAGE, BOTTLE_SIZE, oilBenefits } from "@/lib/products";
import SectionHeader from "./SectionHeader";

function Benefit({ benefit, align = "left" }) {
  return (
    <li className={`text-center ${align === "right" ? "sm:text-right" : "sm:text-left"}`}>
      <h3 className="text-teal text-sm font-semibold uppercase tracking-[0.14em]">{benefit.title}</h3>
      <p className="text-ink/65 mt-1.5 leading-relaxed max-w-xs mx-auto sm:max-w-none">{benefit.body}</p>
    </li>
  );
}

// The product graphic, built as a page section rather than an image: the
// bottle in the middle, what it does around it. Text stays sharp at any
// size and can be read by screen readers and search engines.
export default function FirstProduct() {
  const left = oilBenefits.slice(0, 3);
  const right = oilBenefits.slice(3);

  return (
    <section id="beard-oil" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          eyebrow="The first product"
          title="Beard oil."
          muted="One job, done properly."
          lede="Growing a beard comes with itch, flakes, and hair that turns wiry and won't sit right. Most men just put up with it. Sorting it shouldn't take a routine."
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-[1fr_auto_1fr] sm:gap-14 items-center">
          <div className="relative flex justify-center sm:order-2">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-4 mx-auto w-60 h-32 rounded-full bg-teal/20 blur-3xl"
            />
            <Image
              src={BOTTLE_IMAGE.src}
              width={BOTTLE_IMAGE.width}
              height={BOTTLE_IMAGE.height}
              alt={`${siteConfig.brandName} beard oil, ${BOTTLE_SIZE} dropper bottle`}
              sizes="160px"
              className="relative h-72 sm:h-80 w-auto rounded-2xl border border-ink/10 shadow-2xl shadow-black/60"
            />
          </div>
          <ul className="space-y-8 sm:order-1">
            {left.map((b) => (
              <Benefit key={b.title} benefit={b} align="right" />
            ))}
          </ul>
          <ul className="space-y-8 sm:order-3 -mt-2 sm:mt-0">
            {right.map((b) => (
              <Benefit key={b.title} benefit={b} />
            ))}
          </ul>
        </div>

        <p className="mt-12 text-center text-ink/45 text-sm">
          {BOTTLE_SIZE} dropper bottle · around two months of daily use
        </p>
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-4">
          <Link href="#first-drop" className="btn">
            Pre-order
          </Link>
          <Link href="/beard-oil" className="btn-text">
            Everything about it →
          </Link>
        </div>
      </div>
    </section>
  );
}
