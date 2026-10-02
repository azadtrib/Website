import SectionHeader from "./SectionHeader";

const steps = [
  {
    title: "Apply",
    body: "A few drops into your palm. Rub your hands together.",
  },
  {
    title: "Shape",
    body: "Work it through your beard, down to the skin. Fingers or a comb.",
  },
  {
    title: "Go",
    body: "That's it. About thirty seconds, once a day.",
  },
];

export default function Ritual({ id, title = "One oil.", muted = "Thirty seconds." }) {
  return (
    <section id={id} className="bg-navy border-y border-ink/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeader eyebrow="How it works" title={title} muted={muted} />
        <p className="mt-5 text-center text-ink/50 text-sm uppercase tracking-[0.3em]">
          Apply <span className="text-teal">•</span> Shape <span className="text-teal">•</span> Go
        </p>
        <ol className="mt-12 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {steps.map((step, i) => (
            <li key={step.title} className="card p-5 flex gap-4 sm:block sm:p-6">
              <span className="text-teal text-sm font-semibold tabular-nums pt-0.5 sm:pt-0">0{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold sm:mt-3">{step.title}</h3>
                <p className="text-ink/60 mt-1 sm:mt-2">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
