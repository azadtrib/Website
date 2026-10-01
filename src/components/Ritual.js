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

export default function Ritual({ id, heading = "The whole routine." }) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <p className="text-teal text-xs font-semibold uppercase tracking-widest">The ritual</p>
        <h2 className="text-3xl sm:text-4xl font-bold mt-3">{heading}</h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="bg-navy border border-ink/10 rounded-2xl p-6">
              <span className="text-teal font-mono text-sm">0{i + 1}</span>
              <h3 className="text-xl font-bold mt-3">{step.title}</h3>
              <p className="text-ink/65 mt-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
