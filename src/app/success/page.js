import Link from "next/link";
import ClearCartOnLoad from "@/components/ClearCartOnLoad";
import { getStripeClient } from "@/lib/stripe";

async function isSessionPaid(sessionId) {
  if (!sessionId) return false;
  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid";
  } catch {
    return false;
  }
}

export default async function SuccessPage({ searchParams }) {
  const { session_id: sessionId } = await searchParams;
  const paid = await isSessionPaid(sessionId);

  if (!paid) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="text-3xl font-bold">We couldn&apos;t confirm that order</h1>
        <p className="text-ink/70 mt-4">
          We&apos;re not able to verify a completed payment for this link. If you
          just placed an order and were charged, check your email for a
          receipt from Stripe, or contact us if anything looks wrong.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 bg-ink text-cream rounded-full px-6 py-3 font-semibold"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <ClearCartOnLoad />
      <h1 className="text-3xl font-bold">You&apos;re all set 🎉</h1>
      <p className="text-ink/70 mt-4">
        Thanks for your order — a confirmation email is on its way.
      </p>
      <p className="text-ink/70 mt-3">
        We&apos;ll email you again as soon as your package is{" "}
        <span className="text-teal font-semibold">out for delivery</span>.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 bg-ink text-cream rounded-full px-6 py-3 font-semibold"
      >
        Back to shop
      </Link>
    </div>
  );
}
