import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import FAQAccordion from "@/components/FAQAccordion";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />

      <section id="shop" className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-2xl font-bold text-center mb-10">
            Shop the collection
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="bg-white py-16 border-y border-black/5">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-2xl font-bold mb-4">Our story</h2>
          <p className="text-ink/70">
            Placeholder — swap in your actual founding story here. Keep it short,
            personal, and specific: why you started, what problem you were
            solving for your own beard, what makes your formula different.
          </p>
        </div>
      </section>

      <Testimonials />
      <FAQAccordion />
    </>
  );
}
