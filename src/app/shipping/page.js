import { siteConfig } from "@/lib/site-config";
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

      <LegalSection heading="Timings">
        <p>
          We dispatch orders within {siteConfig.dispatchDays}. Delivery is
          usually {siteConfig.deliveryEstimate}.
        </p>
        <p>
          You&apos;ll get an email when you order, and another one as soon as
          your parcel is out for delivery.
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
