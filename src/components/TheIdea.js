import { siteConfig } from "@/lib/site-config";

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
    <section id="idea" className="bg-navy border-y border-ink/5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <p className="text-teal text-xs font-semibold uppercase tracking-widest">The idea</p>
        <h2 className="text-3xl sm:text-4xl font-bold mt-3 max-w-2xl">{siteConfig.description}</h2>
        <p className="text-ink/70 text-lg mt-5 max-w-2xl">
          Most grooming asks for more — more products, more steps, more time. We think the opposite:
          find the few things that actually make a difference, do them properly, and make them take
          seconds.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {principles.map((p) => (
            <li key={p.title} className="border-t border-teal/40 pt-5">
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p className="text-ink/65 mt-2">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
