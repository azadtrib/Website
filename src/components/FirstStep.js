import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

// Where the founder appears — after the problem and the product, as the
// reason this exists, not as the headline.
export default function FirstStep() {
  return (
    <section id="story" className="bg-navy border-y border-ink/5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 grid sm:grid-cols-[1fr_1.4fr] gap-10 sm:gap-14 items-start">
        <figure>
          <Image
            src="/about/founder.png"
            alt={`The founder of ${siteConfig.brandName} holding a bottle of the beard oil`}
            width={480}
            height={480}
            sizes="(max-width: 640px) 100vw, 40vw"
            className="w-full max-w-sm mx-auto rounded-2xl object-cover border border-ink/10"
          />
          <blockquote className="mt-5 text-ink/75 italic border-l-2 border-teal/50 pl-4">
            &ldquo;Men want to look sharp. They want a beard that feels good, skin that looks
            healthy, and to feel confident when they leave the house. But most grooming routines
            feel like another chore.&rdquo;
            <footer className="not-italic text-ink/45 text-sm mt-2">— The founder</footer>
          </blockquote>
        </figure>

        <div>
          <p className="text-teal text-xs font-semibold uppercase tracking-widest">The first step</p>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">We&apos;re starting with one product.</h2>
          <div className="mt-5 space-y-4 text-ink/70 text-lg">
            <p>
              {siteConfig.brandName} started with one simple idea: make looking after yourself
              easier. Not a twelve-product range. Not a routine you need a tutorial for. One thing,
              done properly.
            </p>
            <p>
              The beard oil is the first thing we&apos;re putting into people&apos;s hands. If it
              earns its place, we&apos;ll keep building. If it doesn&apos;t, we&apos;ll listen and
              make it better.
            </p>
          </div>
          <p className="text-teal font-semibold text-lg mt-6">You&apos;re here at the start.</p>
        </div>
      </div>
    </section>
  );
}
