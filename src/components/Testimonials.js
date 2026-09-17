// PLACEHOLDER COPY — replace with real customer reviews before launch.
// Publishing fabricated reviews/ratings as if they were real customer
// testimonials is deceptive advertising (FTC endorsement rules) — swap these
// out for genuine feedback once you have real orders.
const placeholderReviews = [
  {
    quote: "Placeholder review text — swap in a real customer quote here.",
    author: "Verified Buyer",
  },
  {
    quote: "Placeholder review text — swap in a real customer quote here.",
    author: "Verified Buyer",
  },
  {
    quote: "Placeholder review text — swap in a real customer quote here.",
    author: "Verified Buyer",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-peach-light py-16">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-2xl font-bold text-center mb-10">
          What customers are saying
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {placeholderReviews.map((r, i) => (
            <div
              key={i}
              className="bg-navy rounded-2xl p-6 border border-ink/10 transition-all duration-300 hover:border-ink/25 hover:-translate-y-1"
            >
              <span className="text-teal text-4xl font-serif leading-none">&ldquo;</span>
              <p className="text-ink/80 italic mt-2">{r.quote}</p>
              <p className="text-ink/50 text-sm mt-4">— {r.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
