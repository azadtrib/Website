import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import BottleIcon from "@/components/BottleIcon";
import AddToCartForm from "@/components/AddToCartForm";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 grid sm:grid-cols-2 gap-12">
      <div className="flex justify-center items-start bg-peach-light rounded-2xl py-16">
        <BottleIcon color={product.color} className="w-40" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-ink/60 mt-1">{product.scent}</p>
        <p className="text-2xl font-bold mt-4">{formatPrice(product.priceCents)}</p>
        <p className="text-ink/70 mt-5">{product.description}</p>
        <ul className="mt-5 space-y-2 text-sm text-ink/70">
          {product.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <span className="text-teal">✓</span> {b}
            </li>
          ))}
        </ul>
        <AddToCartForm product={product} />
      </div>
    </div>
  );
}
