"use client";

import { useActionState } from "react";
import { markDelivered } from "./actions";

const inputClass =
  "w-full bg-cream border border-ink/20 rounded-full px-4 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-teal";

export default function MarkDeliveredButton({ sessionId }) {
  const [state, formAction, pending] = useActionState(markDelivered, {
    error: null,
    ok: null,
  });

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="sessionId" value={sessionId} />
      <div className="grid sm:grid-cols-2 gap-2">
        <label className="block">
          <span className="sr-only">Tracking number</span>
          <input
            name="trackingNumber"
            placeholder="Tracking number (optional)"
            maxLength={64}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="sr-only">Tracking link</span>
          <input
            name="trackingUrl"
            type="url"
            placeholder="Tracking link, https://… (optional)"
            className={inputClass}
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-ink text-cream rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 hover:opacity-85 active:scale-95 disabled:opacity-40"
        >
          {pending ? "Sending…" : "Mark as out for delivery"}
        </button>
        {state?.ok && <span className="text-teal text-sm">{state.ok}</span>}
        {state?.error && <span className="text-red-400 text-sm">{state.error}</span>}
      </div>
    </form>
  );
}
