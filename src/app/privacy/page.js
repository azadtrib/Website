import { siteConfig } from "@/lib/site-config";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";
import TraderDetails from "@/components/TraderDetails";

export const metadata = {
  title: "Privacy policy",
  description: `How ${siteConfig.brandName} collects, uses and stores your personal information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy policy"
      intro={`This explains what personal information ${siteConfig.brandName} collects when you buy from us, why we need it, and who else sees it.`}
    >
      <LegalSection heading="Who is responsible for your data">
        <TraderDetails />
        <p>
          If you have any question about your data, or want a copy of it
          deleted, email{" "}
          <a href={`mailto:${siteConfig.supportEmail}`} className="text-teal hover:underline">
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>When you place an order we receive:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>your name and delivery address, so we can post your order</li>
          <li>your email address, so we can send order and delivery updates</li>
          <li>
            what you bought and what you paid, so we have a record of the sale
          </li>
        </ul>
        <p>
          We never see or store your card details. Payment is handled entirely
          by Stripe on their own secure checkout page.
        </p>
        <p>
          Your basket is stored in your own browser, not on our servers. It
          stays on your device until you check out or clear it.
        </p>
        <p>
          We count visits using Vercel Web Analytics, which records which pages
          are viewed in aggregate. It sets no cookies and doesn&apos;t identify
          you or follow you across other sites.
        </p>
        <p>
          We do not run advertising trackers on this site, and we do not sell or
          share your information with anyone for marketing.
        </p>
      </LegalSection>

      <LegalSection heading="If you sign up for the discount">
        <p>
          When you enter your email to unlock the first-drop discount, we use it
          to send you your code, and then occasional updates about{" "}
          {siteConfig.brandName} as we build it. We only do that because you
          asked to sign up, and you can stop it at any time — use the
          unsubscribe link in any update, or reply to one asking us to remove
          you.
        </p>
        <p>
          Your code is stored with Stripe alongside your email address, so that
          it can be applied at checkout. A cookie on your device remembers your
          code for 24 hours so it&apos;s applied automatically; it holds no
          personal details.
        </p>
      </LegalSection>

      <LegalSection heading="Who processes it for us">
        <p>
          We use a small number of companies to actually run the shop. Each of
          them only receives what they need to do their job:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-ink">Stripe</strong> — takes the payment,
            holds the order record, and stores discount codes.
          </li>
          <li>
            <strong className="text-ink">Resend</strong> — sends your order,
            discount and delivery emails, and holds the mailing list if you
            signed up.
          </li>
          <li>
            <strong className="text-ink">Vercel</strong> — hosts the website,
            keeps standard server logs (which include visitors&apos; IP
            addresses), and provides the cookieless visit counts above.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          We keep order records for six years, because UK tax rules require
          business records to be kept for that long. Email correspondence is
          kept for as long as it is useful for supporting you, then deleted.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Under UK data protection law you can ask us for a copy of the
          information we hold about you, ask us to correct it, or ask us to
          delete it. Email us and we will respond within one month.
        </p>
        <p>
          If you are not happy with how we have handled your information you can
          complain to the Information Commissioner&apos;s Office at{" "}
          <a
            href="https://ico.org.uk"
            className="text-teal hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            ico.org.uk
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
