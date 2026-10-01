import Hero from "@/components/Hero";
import TheIdea from "@/components/TheIdea";
import FirstProduct from "@/components/FirstProduct";
import Ritual from "@/components/Ritual";
import FirstStep from "@/components/FirstStep";
import FirstDrop from "@/components/FirstDrop";
import FAQAccordion from "@/components/FAQAccordion";
import JoinTheJourney from "@/components/JoinTheJourney";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata = {
  alternates: { canonical: "/" },
};

// The homepage has one job: turn interest into an audience and pre-orders.
// Problem → idea → product → how easy it is → why we exist → pre-order →
// objections → join the list.
export default function Home() {
  return (
    <>
      {/* Ties the brand to its social profiles and names the site in results. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema())} />

      <Hero />
      <TheIdea />
      <FirstProduct />
      <Ritual id="ritual" />
      <FirstStep />

      {/*
        ACTUALLY, THAT'S TOO MUCH RIGHT NOW.

        This is where a "what's next" / wider-range section would go — other
        grooming, self-care or wellness products. Deliberately not built.
        Build it once the beard oil has proved people want what AZAD BLACK
        makes, not before. Until then the site stays about one product.
      */}

      <FirstDrop />
      <FAQAccordion />
      <JoinTheJourney />
    </>
  );
}
