import { siteConfig, shipStatus } from "@/lib/site-config";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata = {
  title: "Returns & refunds",
  description: `How to return an order or get a refund from ${siteConfig.brandName}.`,
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <LegalLayout
      title="Returns & refunds"
      intro="If something isn't right, we'll sort it out. Here's exactly where you stand."
    >
      <LegalSection heading="Cancelling a pre-order">
        <p>
          You can cancel a pre-order any time before it ships, for any reason, and we&apos;ll
          refund everything you paid — including delivery. Email{" "}
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="text-teal hover:underline"
          >
            {siteConfig.supportEmail}
          </a>{" "}
          with your order reference, or just reply to your confirmation email.
        </p>
        <p>
          {shipStatus()} If we haven&apos;t given you a ship date, UK law expects delivery
          within 30 days of your order — after that you can cancel regardless, though with us
          you can anyway.
        </p>
      </LegalSection>

      <LegalSection heading={`Our ${siteConfig.guaranteeDays}-day guarantee`}>
        <p>
          If you&apos;re not happy with your beard oil, contact us within{" "}
          {siteConfig.guaranteeDays} days of it arriving and we&apos;ll refund
          you. This is our own promise and it goes further than the law
          requires — it applies even if you&apos;ve opened the bottle and
          used it.
        </p>
        <p>
          Email{" "}
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="text-teal hover:underline"
          >
            {siteConfig.supportEmail}
          </a>{" "}
          with your order reference and we&apos;ll take it from there.
        </p>
      </LegalSection>

      <LegalSection heading="Your legal right to cancel">
        <p>
          Separately from our guarantee, UK law gives you 14 days from the day
          your order arrives to change your mind and cancel, and a further 14
          days to send the goods back.
        </p>
        <p>
          One thing to be aware of: because beard oil is a cosmetic, sealed
          items that have been opened are normally excluded from this
          statutory right on hygiene grounds. In practice this rarely matters
          here, because our own {siteConfig.guaranteeDays}-day guarantee above
          covers opened bottles anyway.
        </p>
      </LegalSection>

      <LegalSection heading="If something arrives damaged or wrong">
        <p>
          Email us with a photo and we&apos;ll replace it or refund you in full,
          including any delivery cost. You don&apos;t need to send a damaged item
          back before we put it right.
        </p>
      </LegalSection>

      <LegalSection heading="How refunds are paid">
        <p>
          Refunds go back to the card you paid with, through Stripe. Once
          we&apos;ve approved it, the money usually appears within 5–10 business
          days depending on your bank.
        </p>
        <p>
          Where you&apos;re returning an item because you changed your mind,
          you cover the cost of posting it back. Where the item was faulty,
          damaged or not what you ordered, we cover it.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
