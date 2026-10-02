import Link from "next/link";
import { siteConfig, shipStatus } from "@/lib/site-config";
import { formatPrice } from "@/lib/format";

// What happens after someone pre-orders — the honest version, including the
// bit a lot of shops leave out: that the date isn't fixed yet.
export default function PreorderSteps() {
  const steps = [
    {
      title: "You pre-order",
      body: "You pay today, securely through Stripe. We never see your card details.",
    },
    {
      title: "We confirm",
      body: "An order confirmation lands in your inbox straight away.",
    },
    {
      title: "We set the date",
      body: shipStatus(),
    },
    {
      title: "It's on its way",
      body: `You get another email when it's out for delivery. It arrives ${siteConfig.transitText} after that.`,
    },
  ];

  return (
    <div>
      <h3 className="eyebrow mb-5">What happens after you order</h3>
      <ol className="space-y-4">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex-none w-7 text-teal text-sm font-semibold tabular-nums pt-px">
              0{i + 1}
            </span>
            <div>
              <p className="font-semibold">{step.title}</p>
              <p className="text-ink/60 text-sm mt-0.5">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <ul className="mt-6 pt-6 border-t border-ink/10 space-y-2 text-sm text-ink/65">
        <li>
          <span className="text-ink">Changed your mind?</span> Cancel any time before it ships for a
          full refund — just email us.
        </li>
        <li>
          <span className="text-ink">After it arrives:</span> {siteConfig.guaranteeDays}-day
          money-back guarantee, even if you&apos;ve opened it.{" "}
          <Link href="/returns" className="text-teal hover:underline">
            Returns
          </Link>
        </li>
        <li>
          <span className="text-ink">Delivery:</span> {formatPrice(siteConfig.flatShippingCents)} UK,
          free over {formatPrice(siteConfig.freeShippingThresholdCents)}.{" "}
          <Link href="/shipping" className="text-teal hover:underline">
            Details
          </Link>
        </li>
      </ul>
    </div>
  );
}
