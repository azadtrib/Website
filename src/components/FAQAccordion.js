"use client";

import { useState } from "react";
import Link from "next/link";
import { faqs } from "@/lib/faqs";
import { faqSchema, jsonLd } from "@/lib/seo";
import SectionHeader from "./SectionHeader";

const linkClass = "text-teal hover:underline";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeader
          eyebrow="Questions"
          title="Quick answers."
          muted="The obvious ones."
          className="mb-12"
        />
        <div className="space-y-2.5">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="card overflow-hidden transition-colors hover:border-ink/25"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {faq.q}
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className={`flex-none text-ink/50 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  // Collapsed answers are only visually hidden, so without
                  // inert their links would still be reachable by Tab.
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`px-5 pb-5 text-ink/65 text-[15px] leading-relaxed transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {faq.text}
                      {faq.link && (
                        <>
                          {" "}
                          <Link href={faq.link.href} className={linkClass}>
                            {faq.link.label}
                          </Link>
                        </>
                      )}
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
