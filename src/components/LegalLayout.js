export default function LegalLayout({ title, intro, updated, children }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-bold">{title}</h1>
      {intro && <p className="text-ink/70 mt-3">{intro}</p>}
      {updated && (
        <p className="text-ink/40 text-sm mt-2">Last updated: {updated}</p>
      )}
      <div className="mt-10 space-y-8 text-ink/70 leading-relaxed">{children}</div>
    </div>
  );
}

export function LegalSection({ heading, children }) {
  return (
    <section>
      <h2 className="text-ink font-semibold text-lg mb-3">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
