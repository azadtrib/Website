import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata = {
  title: "Terms & conditions",
  description: `The terms you agree to when buying from ${siteConfig.brandName}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & conditions"
      intro={`These are the terms that apply when you buy from ${siteConfig.brandName}.`}
    >
      <LegalSection heading="Orders">
        <p>
          Placing an order is an offer to buy. The contract is formed when we
          email you to confirm the order. If we can&apos;t fulfil it — for
          example if we&apos;ve run out of stock — we&apos;ll tell you and
          refund you in full.
        </p>
        <p>
          Prices include VAT where applicable and are shown in pounds sterling.
          We try to keep prices and product details accurate; if an obvious
          pricing error means we can&apos;t honour an order, we&apos;ll contact
          you before charging you and you can confirm or cancel.
        </p>
      </LegalSection>

      <LegalSection heading="Payment">
        <p>
          Payment is taken at checkout by Stripe. We don&apos;t receive or store
          your card details.
        </p>
      </LegalSection>

      <LegalSection heading="Delivery, returns and refunds">
        <p>
          Delivery costs and timings are on our{" "}
          <Link href="/shipping" className="text-teal hover:underline">
            delivery page
          </Link>
          . Your cancellation rights and our {siteConfig.guaranteeDays}-day
          guarantee are set out on our{" "}
          <Link href="/returns" className="text-teal hover:underline">
            returns page
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Using the product">
        <p>
          Our beard oil is a cosmetic for external use on facial hair and the
          skin beneath it. It is not a medicine and we make no medical claims
          for it.
        </p>
        <p>
          Check the ingredients before use if you have known allergies, and stop
          using it if you get a reaction. If you&apos;re unsure, patch test on a
          small area first. Keep out of reach of children and avoid contact with
          your eyes.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          We don&apos;t limit our liability for death or personal injury caused
          by our negligence, for fraud, or for anything else that can&apos;t
          legally be limited. Nothing here affects your statutory rights as a
          consumer.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the law of England and Wales, and disputes
          can be brought in the courts of England and Wales.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
