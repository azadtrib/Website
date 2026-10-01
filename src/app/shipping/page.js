import Link from "next/link";
import { siteConfig, shipStatus } from "@/lib/site-config";
import { formatPrice } from "@/lib/format";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata = {
  title: "Delivery & shipping",
  description: `Delivery costs and timings for ${siteConfig.brandName} orders.`,
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <LegalLayout
      title="Delivery & shipping"
      intro="What delivery costs, how long it takes, and where we send to."
    >
      <LegalSection heading="Cost">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Standard delivery:{" "}
            <strong className="text-ink">
              {formatPrice(siteConfig.flatShippingCents)}
            </strong>
          </li>
          <li>
            Free on orders over{" "}
            <strong className="text-ink">
              {formatPrice(siteConfig.freeShippingThresholdCents)}
            </strong>
          </li>
        </ul>
        <p>
          The delivery cost is shown at checkout before you pay, so there are no
          surprises at the end.
        </p>
      </LegalSection>

      <LegalSection heading="Timings — this is a pre-order">
        <p>
          The first drop is sold as a pre-order: you order now, and we ship
          everyone&apos;s together once the stock arrives. {shipStatus()}
        </p>
        <p>
          You&apos;ll get an email when you order, another when we have a
          confirmed ship date, and another as soon as your parcel is out for
          delivery. From there it usually takes {siteConfig.transitText}.
        </p>
        <p>
          If the wait doesn&apos;t suit you, you can cancel any time before
          it ships for a full refund.{" "}
          <Link href="/returns" className="text-teal hover:underline">
            How to cancel
          </Link>
        </p>
      </LegalSection>

      <LegalSection heading="Where we deliver">
        <p>
          We currently ship to the {siteConfig.shipsTo} only. If you&apos;re
          outside the {siteConfig.shipsTo} and want to order, email{" "}
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="text-teal hover:underline"
          >
            {siteConfig.supportEmail}
          </a>{" "}
          and we&apos;ll see what we can do.
        </p>
      </LegalSection>

      <LegalSection heading="Something gone missing?">
        <p>
          If your order hasn&apos;t turned up within 10 business days of
          dispatch, get in touch and we&apos;ll chase it or send a replacement.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
