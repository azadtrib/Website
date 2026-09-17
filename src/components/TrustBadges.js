import { siteConfig } from "@/lib/site-config";

const badges = [
  { title: "30-Day Guarantee", desc: "Not into it? Full refund, no questions." },
  { title: "Cruelty-Free", desc: "Never tested on animals." },
  { title: "Fast Shipping", desc: "Orders ship within 1-2 business days." },
  { title: "Small Batch", desc: "Made in limited runs for freshness." },
];

export default function TrustBadges() {
  return (
    <section className="bg-navy text-ink py-10">
      <div className="mx-auto max-w-6xl px-5 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {badges.map((b) => (
          <div key={b.title} className="text-center sm:text-left">
            <p className="font-semibold">{b.title}</p>
            <p className="text-ink/60 text-sm mt-1">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
