import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { formatPrice } from "@/lib/format";

// Shown at the two moments people hesitate — under Add to basket and above
// Checkout — so the delivery and returns terms are a tap away right where
// the decision gets made, not only buried in the footer.
export default function PurchaseReassurance({ onNavigate, className = "" }) {
  const linkClass = "text-teal hover:underline";

  return (
    <ul className={`text-xs text-ink/60 space-y-1.5 ${className}`}>
      <li>
        Free UK delivery over{" "}
        {formatPrice(siteConfig.freeShippingThresholdCents)} — dispatched in{" "}
        {siteConfig.dispatchDays}.{" "}
        <Link href="/shipping" className={linkClass} onClick={onNavigate}>
          Delivery info
        </Link>
      </li>
      <li>
        {siteConfig.guaranteeDays}-day money-back guarantee, even if opened.{" "}
        <Link href="/returns" className={linkClass} onClick={onNavigate}>
          Returns
        </Link>
      </li>
      <li>
        Secure card payment by Stripe — we never see your card details.
      </li>
    </ul>
  );
}
