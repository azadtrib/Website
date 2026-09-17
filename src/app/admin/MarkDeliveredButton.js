"use client";

import { useActionState } from "react";
import { markDelivered } from "./actions";

export default function MarkDeliveredButton({ sessionId }) {
  const [state, formAction, pending] = useActionState(markDelivered, {
    error: null,
    ok: null,
  });

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="sessionId" value={sessionId} />
      <button
        type="submit"
        disabled={pending}
        className="bg-ink text-cream rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 hover:opacity-85 active:scale-95 disabled:opacity-40"
      >
        {pending ? "Sending…" : "Mark as out for delivery"}
      </button>
      {state?.ok && <span className="text-teal text-sm">{state.ok}</span>}
      {state?.error && <span className="text-red-400 text-sm">{state.error}</span>}
    </form>
  );
}
