import Image from "next/image";
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="bg-navy py-16 border-y border-ink/5">
        <div className="mx-auto max-w-4xl px-5 grid sm:grid-cols-[auto_1fr] gap-8 items-center">
          <Image
            src="/about/founder.png"
            alt="Founder of the brand"
            width={256}
            height={256}
            className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl object-cover mx-auto border-2 border-teal/40"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold mb-4">Our story</h2>
            <p className="text-ink/70">
              Placeholder — swap in your actual founding story here. Keep it short,
              personal, and specific: why you started, what problem you were
              solving for your own beard, what makes your formula different.
            </p>
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQAccordion />
    </>
  );
}
