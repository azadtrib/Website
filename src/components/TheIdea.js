import { siteConfig } from "@/lib/site-config";
import SectionHeader from "./SectionHeader";

const principles = [
  {
    title: "One job each",
    body: "Every product does one thing properly. Nothing to learn, nothing to layer.",
  },
  {
    title: "Seconds, not minutes",
    body: "If it takes longer than making a coffee, it's too much.",
  },
  {
    title: "Not a beauty routine",
    body: "Look after yourself without turning it into a hobby.",
  },
];

export default function TheIdea() {
  return (
    <>
      <section id="idea" className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            eyebrow="The problem"
            title="Most grooming asks too much."
            lede="More products, more steps, more time. Most men want to look after themselves — they just don't want it to become another job."
          />
          <p className="mt-6 text-center font-semibold text-ink">So we did the opposite.</p>

          <ol className="mt-12 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {principles.map((p, i) => (
              <li key={p.title} className="card p-5 flex gap-4 sm:block sm:p-6">
                <span className="text-teal text-sm font-semibold tabular-nums pt-0.5 sm:pt-0">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold sm:mt-3">{p.title}</h3>
                  <p className="text-ink/60 mt-1 sm:mt-2">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The philosophy as one big line, like a pull quote between sections. */}
      <section className="bg-navy border-y border-ink/[0.06] py-16 sm:py-24">
        <p className="mx-auto max-w-3xl px-5 text-center text-[2rem] leading-[1.1] sm:text-5xl font-bold tracking-tight text-balance">
          {siteConfig.description}
        </p>
      </section>
    </>
  );
}
