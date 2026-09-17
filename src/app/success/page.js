import Link from "next/link";
import ClearCartOnLoad from "@/components/ClearCartOnLoad";

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <ClearCartOnLoad />
      <h1 className="text-3xl font-bold">You&apos;re all set 🎉</h1>
      <p className="text-ink/70 mt-4">
        Thanks for your order — a confirmation email is on its way. We&apos;ll
        notify you again once it ships.
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
