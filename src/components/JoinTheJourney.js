"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { claimOffer, useOfferState, useTimeLeft } from "@/lib/offer-client";

export default function JoinTheJourney() {
  const { offer } = useOfferState();
  const timeLeft = useTimeLeft(offer?.expiresAt);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await claimOffer(email, company);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  const socials = [
    { label: "Instagram", href: siteConfig.instagram },
    { label: "TikTok", href: siteConfig.tiktok },
  ].filter((s) => s.href);

  return (
    <section id="join" className="bg-navy border-t border-ink/5 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <p className="text-teal text-xs font-semibold uppercase tracking-widest">Follow the journey</p>
        <h2 className="text-3xl sm:text-4xl font-bold mt-3">We&apos;re just getting started.</h2>
        <p className="text-ink/70 text-lg mt-4">
          See what we&apos;re building, and help shape what comes next.
        </p>

        {offer ? (
          <div className="mt-8 border border-teal/40 bg-teal/10 rounded-2xl p-5" aria-live="polite">
            <p className="font-semibold">You&apos;re in.</p>
            <p className="text-ink/70 text-sm mt-1">
              Your {offer.percentOff}% code <span className="text-ink font-semibold">{offer.code}</span>{" "}
              is applied at checkout on this device
              {timeLeft && timeLeft !== "expired" ? ` — ${timeLeft}.` : "."}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3" noValidate>
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-cream border border-ink/20 rounded-full px-5 py-3.5 text-base text-ink placeholder:text-ink/40 focus:outline-none focus:border-teal"
              />
            </label>
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="absolute -left-[9999px] w-px h-px opacity-0"
            />
            <button
              type="submit"
              disabled={pending}
              className="bg-ink text-cream rounded-full px-7 py-3.5 font-semibold text-sm transition-all duration-200 hover:opacity-85 active:scale-95 disabled:opacity-50"
            >
              {pending ? "Joining…" : `Join — get ${siteConfig.offer.percentOff}% off`}
            </button>
          </form>
        )}
        {error && (
          <p role="alert" className="text-red-400 text-sm mt-3">
            {error}
          </p>
        )}
        {!offer && (
          <p className="text-ink/45 text-xs mt-4">
            {siteConfig.offer.percentOff}% off a pre-order, valid {siteConfig.offer.validHours} hours
            from signing up. Occasional updates as we build — unsubscribe any time.{" "}
            <Link href="/privacy" className="underline">
              Privacy
            </Link>
          </p>
        )}

        {socials.length > 0 && (
          <div className="mt-10 flex justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/20 rounded-full px-5 py-2.5 text-sm font-semibold hover:border-ink/50 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
