"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, { error: null });

  return (
    <div className="mx-auto max-w-sm px-5 py-24">
      <h1 className="text-2xl font-bold text-center">Orders</h1>
      <p className="text-ink/60 text-sm text-center mt-2">
        Sign in to manage orders.
      </p>
      <form action={formAction} className="mt-8 space-y-3">
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          required
          className="w-full bg-navy border border-ink/20 rounded-full px-5 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-teal"
        />
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-ink text-cream rounded-full py-3 font-semibold transition-all duration-200 hover:opacity-85 active:scale-95 disabled:opacity-40"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
        {state?.error && (
          <p className="text-red-400 text-sm text-center">{state.error}</p>
        )}
      </form>
    </div>
  );
}
