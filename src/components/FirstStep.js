import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import SectionHeader from "./SectionHeader";

// Where the founder appears — after the problem and the product, as the
// reason this exists, not as the headline.
export default function FirstStep() {
  return (
    <section id="story" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeader eyebrow="Why AZAD BLACK" title="We're starting" muted="with one product." />

        <div className="mt-12 grid sm:grid-cols-2 gap-10 sm:gap-14 items-center">
          <Image
            src="/about/founder.png"
            alt={`The founder of ${siteConfig.brandName} holding a bottle of the beard oil`}
            width={480}
            height={480}
            sizes="(max-width: 640px) 100vw, 40vw"
            className="w-full max-w-sm mx-auto rounded-xl object-cover border border-ink/10"
          />

          <div>
            <div className="space-y-4 lede">
              <p>
                {siteConfig.brandName} started with one simple idea: make looking after yourself
                easier. Not a twelve-product range. Not a routine you need a tutorial for. One
                thing, done properly.
              </p>
              <p>
                The beard oil is the first thing we&apos;re putting into people&apos;s hands. If it
                earns its place, we&apos;ll keep building. If it doesn&apos;t, we&apos;ll listen
                and make it better.
              </p>
            </div>
            <blockquote className="mt-8 card p-6">
              <p className="text-ink/80 italic leading-relaxed">
                &ldquo;Men want to look sharp. They want a beard that feels good, skin that looks
                healthy, and to feel confident when they leave the house. But most grooming
                routines feel like another chore.&rdquo;
              </p>
              <footer className="text-ink/45 text-sm mt-3">— The founder</footer>
            </blockquote>
            <p className="text-teal font-semibold mt-8">You&apos;re here at the start.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
