import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct, products, ingredientsInci } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import BottleIcon from "@/components/BottleIcon";
import AddToCartForm from "@/components/AddToCartForm";
import PurchaseReassurance from "@/components/PurchaseReassurance";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const title = `${product.name} — ${product.scent}`;
  const url = `${siteConfig.url}/products/${product.slug}`;

  return {
    title,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      title,
      description: product.description,
      url,
      images: product.image ? [{ url: product.image, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${siteConfig.brandName} ${product.name}`,
    description: product.description,
    image: product.image ? `${siteConfig.url}${product.image}` : undefined,
    brand: { "@type": "Brand", name: siteConfig.brandName },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/products/${product.slug}`,
      priceCurrency: siteConfig.currency.toUpperCase(),
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 grid sm:grid-cols-2 gap-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="flex justify-center items-center bg-peach-light rounded-2xl py-16 min-h-[22rem]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={280}
            height={280}
            className="w-full max-w-[280px] h-auto object-contain rounded-lg"
          />
        ) : (
          <BottleIcon color={product.color} className="w-40" />
        )}
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-ink/60 mt-1">{product.scent}</p>
        <div className="flex items-center gap-3 mt-4">
          <p className="text-2xl font-bold">{formatPrice(product.priceCents)}</p>
          {product.compareAtCents && (
            <p className="text-ink/40 line-through" title="Price if bought as single bottles">
              <span className="sr-only">Price as single bottles: </span>
              {formatPrice(product.compareAtCents)}
            </p>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-teal/15 text-teal text-xs font-bold px-2.5 py-1 rounded-full">
              Save {product.discountPercent}%
            </span>
          )}
        </div>
        {product.bottles > 0 && (
          <p className="text-ink/50 text-sm mt-1">
            {formatPrice(Math.round(product.priceCents / product.bottles))} per bottle
            {product.savingCents > 0 &&
              ` · ${formatPrice(product.savingCents)} less than ${product.bottles} single bottles`}
          </p>
        )}
        <p className="text-ink/70 mt-5">{product.description}</p>
        <ul className="mt-5 space-y-2 text-sm text-ink/70">
          {product.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <span className="text-teal">✓</span> {b}
            </li>
          ))}
        </ul>
        <AddToCartForm product={product} />
        <PurchaseReassurance className="mt-5" />

        <div className="mt-8 pt-6 border-t border-ink/10">
          <h2 className="text-sm font-semibold text-ink">Ingredients</h2>
          {ingredientsInci ? (
            <p className="text-ink/60 text-sm mt-2 leading-relaxed">
              {ingredientsInci}
            </p>
          ) : (
            <p className="text-ink/60 text-sm mt-2">
              Full ingredients are printed on the bottle. If you have allergies
              and want the list before ordering, email{" "}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-teal hover:underline"
              >
                {siteConfig.supportEmail}
              </a>
              .
            </p>
          )}
          <p className="text-ink/40 text-xs mt-3">
            For external use only. Patch test first if you have sensitive skin.
          </p>
        </div>
      </div>
    </div>
  );
}
