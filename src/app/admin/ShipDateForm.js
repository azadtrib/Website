"use client";

import { useActionState } from "react";
import { sendShipDateToCustomers } from "./actions";

export default function ShipDateForm({ waiting }) {
  const [state, formAction, pending] = useActionState(sendShipDateToCustomers, {
    error: null,
    ok: null,
  });

  return (
    <form action={formAction} className="bg-navy border border-teal/30 rounded-2xl p-5 space-y-3">
      <div>
        <h2 className="font-semibold">Tell customers the ship date</h2>
        <p className="text-ink/60 text-sm mt-1">
          Emails all {waiting} pre-order{waiting === 1 ? "" : "s"} that haven&apos;t shipped yet.
          Also update <code>preorder.shipEstimate</code> in the site config so new customers see
          it too.
        </p>
      </div>
      <label className="block">
        <span className="sr-only">Expected ship date</span>
        <input
          name="shipDate"
          required
          maxLength={80}
          placeholder='How it should read after "expected to ship" — e.g. the week of 8 December'
          className="w-full bg-cream border border-ink/20 rounded-full px-4 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-teal"
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input type="checkbox" name="confirm" value="yes" className="accent-[var(--color-teal)]" />
        I&apos;ve checked the date — email these customers now
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending || waiting === 0}
          className="bg-ink text-cream rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 hover:opacity-85 active:scale-95 disabled:opacity-40"
        >
          {pending ? "Sending…" : "Email the ship date"}
        </button>
        {state?.ok && <span className="text-teal text-sm">{state.ok}</span>}
        {state?.error && <span className="text-red-400 text-sm">{state.error}</span>}
      </div>
    </form>
  );
}
