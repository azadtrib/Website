import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  products,
  ingredientsInci,
  oilBenefits,
  productDetails,
  oilDescription,
  BOTTLE_IMAGE,
  BOTTLE_SIZE,
} from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import {
  PRODUCT_PATH,
  breadcrumbSchema,
  jsonLd,
  lowestPriceCents,
  productDescription,
  productSchema,
} from "@/lib/seo";
import PackPicker from "@/components/PackPicker";
import PreorderSteps from "@/components/PreorderSteps";
import Ritual from "@/components/Ritual";

const title = `${siteConfig.brandName} Beard Oil ${BOTTLE_SIZE} — Pre-order from ${formatPrice(lowestPriceCents())}`;

export const metadata = {
  // absolute: the layout's "| AZAD BLACK" suffix would repeat the brand.
  title: { absolute: title },
  description: productDescription(),
  alternates: { canonical: PRODUCT_PATH },
  openGraph: {
    type: "website",
    title,
    description: productDescription(),
    url: PRODUCT_PATH,
    images: [{ url: BOTTLE_IMAGE.src, alt: `${siteConfig.brandName} beard oil` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: productDescription(),
    images: [BOTTLE_IMAGE.src],
  },
};

const sectionHeading = "text-[1.75rem] leading-tight sm:text-4xl font-bold tracking-tight";

export default function BeardOilPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema())} />

      {/* Above the fold: what it is, price, and the pre-order button. */}
      <section className="mx-auto max-w-6xl px-5 pt-8 pb-16 sm:py-16 grid sm:grid-cols-2 gap-10 sm:gap-14 items-start">
        {/* On a phone only the labelled bottle shows, kept short, so the
            name, price and pre-order button aren't pushed two screens down.
            The pack photos add nothing the pack picker doesn't already say. */}
        <div>
          <div className="texture relative rounded-xl border border-ink/10 overflow-hidden flex items-center justify-center py-8 sm:py-14">
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-56 h-28 rounded-full bg-teal/20 blur-3xl"
            />
            <Image
              src={BOTTLE_IMAGE.src}
              width={BOTTLE_IMAGE.width}
              height={BOTTLE_IMAGE.height}
              alt={`${siteConfig.brandName} beard oil, ${BOTTLE_SIZE} amber dropper bottle`}
              priority
              sizes="160px"
              className="relative h-60 sm:h-80 w-auto rounded-xl border border-ink/10 shadow-2xl shadow-black/60"
            />
          </div>
          <div className="hidden sm:grid grid-cols-3 gap-3 mt-3">
            {products.map((p) => (
              <figure key={p.slug}>
                <div className="relative aspect-square rounded-lg overflow-hidden border border-ink/10 bg-peach-light">
                  <Image
                    src={p.image}
                    alt={`${siteConfig.brandName} beard oil, ${p.scent}`}
                    fill
                    sizes="17vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-ink/45 text-xs mt-2">{p.scent}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div id="first-drop">
          <p className="eyebrow">Pre-order · The first drop</p>
          <h1 className="text-[2.25rem] leading-[1.05] sm:text-5xl font-bold tracking-tight mt-4">
            {siteConfig.brandName} <span className="heading-muted">Beard Oil</span>
          </h1>
          <p className="lede mt-4">{oilDescription}</p>
          <p className="text-ink/50 text-sm mt-3">
            {BOTTLE_SIZE} dropper bottle · around two months of daily use · from{" "}
            {formatPrice(lowestPriceCents())}
          </p>
          <div className="mt-8 card bg-navy p-5 sm:p-7">
            <PackPicker />
          </div>
        </div>
      </section>

      {/* The problem, and why it's the first thing AZAD BLACK is making. */}
      <section className="border-t border-ink/[0.06] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 grid gap-12 sm:grid-cols-2">
          <div>
            <p className="eyebrow">The problem</p>
            <h2 className={`${sectionHeading} mt-4`}>A beard shouldn&apos;t be a project.</h2>
            <div className="mt-4 space-y-4 lede">
              <p>
                Growing one comes with itch, flakes, and hair that turns coarse and won&apos;t sit
                right. The usual answer is a shelf of products and a routine to go with them.
              </p>
              <p>
                We started here because it&apos;s the most common grooming headache with the
                simplest fix — one product, used for thirty seconds.
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow">What it does</p>
            <h2 className={`${sectionHeading} mt-4`}>One job, done properly.</h2>
            <ul className="mt-6 space-y-5">
              {oilBenefits.map((b) => (
                <li key={b.title}>
                  <h3 className="text-teal text-sm font-semibold uppercase tracking-[0.14em]">{b.title}</h3>
                  <p className="text-ink/65 mt-1">{b.body}</p>
                </li>
              ))}
            </ul>
            <p className="text-ink/45 text-sm mt-5">
              It&apos;s a cosmetic for your beard and the skin under it. It won&apos;t make your
              beard grow.
            </p>
          </div>
        </div>
      </section>

      <Ritual title="How to use it." muted="Thirty seconds." />

      <section className="texture py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 grid gap-12 sm:grid-cols-2">
          <div>
            <p className="eyebrow">Pre-order</p>
            <h2 className={`${sectionHeading} mt-4`}>How the first drop works.</h2>
            <p className="lede mt-4">
              {siteConfig.brandName} is new, and this is our first product. Pre-ordering means
              you&apos;re one of the first people to get it — and helping decide what we build
              next.
            </p>
            <a
              href="#first-drop"
              className="btn mt-8"
            >
              Pre-order the first drop
            </a>
          </div>
          <PreorderSteps />
        </div>
      </section>

      <section className="border-t border-ink/[0.06] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="eyebrow">Details</h2>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              <dt className="text-ink/50">Size</dt>
              <dd className="text-ink/75">{BOTTLE_SIZE} dropper bottle</dd>
              {productDetails.map((d) => (
                <Fragment key={d.label}>
                  <dt className="text-ink/50">{d.label}</dt>
                  <dd className="text-ink/75">{d.value}</dd>
                </Fragment>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="eyebrow">Ingredients</h2>
            {ingredientsInci ? (
              <p className="text-ink/65 text-sm mt-4 leading-relaxed">{ingredientsInci}</p>
            ) : (
              <p className="text-ink/65 text-sm mt-4">
                The full ingredient list will be printed on the bottle. If you have allergies and
                want it before ordering, email{" "}
                <a href={`mailto:${siteConfig.supportEmail}`} className="text-teal hover:underline">
                  {siteConfig.supportEmail}
                </a>
                .
              </p>
            )}
            <p className="text-ink/45 text-xs mt-4">
              For external use only. Patch test first if you have sensitive skin.
            </p>
            <p className="text-sm mt-6">
              More questions?{" "}
              <Link href="/#faq" className="text-teal hover:underline">
                Read the FAQ
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
