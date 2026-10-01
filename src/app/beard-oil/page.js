import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, ingredientsInci, oilBenefits, productDetails, oilDescription, BOTTLE_SIZE } from "@/lib/products";
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
    images: [{ url: products[0].image, alt: `${siteConfig.brandName} beard oil` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: productDescription(),
    images: [products[0].image],
  },
};

const sectionHeading = "text-2xl sm:text-3xl font-bold";
const eyebrow = "text-teal text-xs font-semibold uppercase tracking-widest";

export default function BeardOilPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema())} />

      {/* Above the fold: what it is, price, and the pre-order button. */}
      <section className="mx-auto max-w-6xl px-5 pt-8 pb-16 sm:py-16 grid sm:grid-cols-2 gap-10 sm:gap-14 items-start">
        {/* On a phone only the main photo shows, kept short, so the name,
            price and pre-order button aren't pushed two screens down. The
            pack photos add nothing the pack picker doesn't already say. */}
        <div className="grid grid-cols-2 gap-3">
          {products.map((p, i) => (
            <figure key={p.slug} className={i === 0 ? "col-span-2" : "hidden sm:block"}>
              <div
                className={`relative rounded-2xl overflow-hidden border border-ink/10 bg-peach-light ${
                  i === 0 ? "aspect-[4/3] sm:aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={p.image}
                  alt={`${siteConfig.brandName} beard oil, ${p.scent}`}
                  fill
                  priority={i === 0}
                  sizes={i === 0 ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
                  className="object-cover"
                />
              </div>
              <figcaption className="hidden sm:block text-ink/45 text-xs mt-2">{p.scent}</figcaption>
            </figure>
          ))}
        </div>

        <div id="first-drop">
          <p className={eyebrow}>Pre-order · The first drop</p>
          <h1 className="text-4xl sm:text-5xl font-bold mt-3">{siteConfig.brandName} Beard Oil</h1>
          <p className="text-ink/70 text-lg mt-4">{oilDescription}</p>
          <p className="text-ink/50 text-sm mt-3">
            {BOTTLE_SIZE} dropper bottle · around two months of daily use · from{" "}
            {formatPrice(lowestPriceCents())}
          </p>
          <div className="mt-8 bg-navy border border-ink/10 rounded-3xl p-5 sm:p-7">
            <PackPicker />
          </div>
        </div>
      </section>

      {/* The problem, and why it's the first thing AZAD BLACK is making. */}
      <section className="bg-navy border-y border-ink/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 grid gap-12 sm:grid-cols-2">
          <div>
            <p className={eyebrow}>The problem</p>
            <h2 className={`${sectionHeading} mt-3`}>A beard shouldn&apos;t be a project.</h2>
            <div className="mt-4 space-y-4 text-ink/70">
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
            <p className={eyebrow}>What it does</p>
            <h2 className={`${sectionHeading} mt-3`}>One job, done properly.</h2>
            <ul className="mt-5 space-y-3">
              {oilBenefits.map((o) => (
                <li key={o} className="flex gap-3 text-ink/80">
                  <span aria-hidden="true" className="text-teal">✓</span>
                  {o}
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

      <Ritual heading="How to use it." />

      <section className="bg-navy border-y border-ink/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 grid gap-12 sm:grid-cols-2">
          <div>
            <p className={eyebrow}>Pre-order</p>
            <h2 className={`${sectionHeading} mt-3`}>How the first drop works.</h2>
            <p className="text-ink/70 mt-4">
              {siteConfig.brandName} is new, and this is our first product. Pre-ordering means
              you&apos;re one of the first people to get it — and helping decide what we build
              next.
            </p>
            <a
              href="#first-drop"
              className="inline-block mt-8 bg-ink text-cream rounded-full px-7 py-4 font-semibold uppercase tracking-wide text-sm transition-all duration-200 hover:opacity-85 active:scale-95"
            >
              Pre-order the first drop
            </a>
          </div>
          <PreorderSteps />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">Details</h2>
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
            <h2 className="text-lg font-semibold">Ingredients</h2>
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
