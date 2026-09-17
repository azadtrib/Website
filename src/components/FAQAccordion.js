"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const faqs = [
  {
    q: "How long does one bottle last?",
    a: "With a few drops a day, most guys get about 3 months out of a 100ml bottle.",
  },
  {
    q: "Will it clog my pores or cause breakouts?",
    a: "Our base oils are non-comedogenic and absorb quickly, so they shouldn't clog pores for most skin types.",
  },
  {
    q: "What's your return policy?",
    a: `If you're not happy, reach out within ${siteConfig.guaranteeDays} days of delivery for a full refund.`,
  },
  {
    q: "How long does shipping take?",
    a: "Orders ship within 1-2 business days. Delivery time depends on your location.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-16">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="text-2xl font-bold text-center mb-10">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-ink/15 rounded-xl overflow-hidden transition-colors hover:border-ink/30"
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-medium"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {faq.q}
                  <span
                    className={`text-teal text-xl leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`px-5 pb-4 text-ink/70 text-sm transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
