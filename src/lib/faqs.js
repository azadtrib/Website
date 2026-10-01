import { siteConfig, shipStatus } from "./site-config";
import { formatPrice } from "./format";
import { BOTTLE_SIZE, ingredientsInci } from "./products";

// Plain-text answers, so the same words feed the page, the FAQPage
// structured data and /llms.txt. The optional link is added on the page only.
export const faqs = [
  {
    q: "What is beard oil?",
    text: "A light oil for your beard and the skin underneath it. It conditions coarse hair so it's softer and easier to shape, and it helps with the itch and flakes that come with growing one.",
  },
  {
    q: "Who is it for?",
    text: "Any man with a beard — from a few weeks of growth to a full one. It's made for all skin types.",
  },
  {
    q: "How do I use it?",
    text: "A few drops into your palm, rub your hands together, work it through your beard down to the skin, then shape it with your fingers or a comb. About thirty seconds, once a day — best after a shower.",
  },
  {
    q: "What does it help with?",
    text: "Coarse or wiry hair, the itch of a growing beard, dry skin and flakes underneath, and a beard that won't sit right. It's a cosmetic, not a treatment — it won't make your beard grow.",
  },
  {
    q: "How long does a bottle last?",
    text: `A ${BOTTLE_SIZE} bottle should last around two months with a few drops a day.`,
  },
  {
    q: "Why is this a pre-order?",
    text: `${siteConfig.brandName} is new. Rather than fill a warehouse and hope, we're taking pre-orders for the first drop so we make what people actually want. Every pre-order helps us get it right.`,
  },
  {
    q: "When will my order arrive?",
    text: `${shipStatus()} Once it's dispatched you'll get an email, and it arrives ${siteConfig.transitText} after that.`,
  },
  {
    q: "What happens if I change my mind?",
    text: `Cancel any time before it ships and we'll refund you in full — just email ${siteConfig.supportEmail}. After it arrives you've got our ${siteConfig.guaranteeDays}-day money-back guarantee, even if you've opened it.`,
    link: { href: "/returns", label: "Returns & refunds" },
  },
  {
    q: "How much is delivery?",
    text: `${formatPrice(siteConfig.flatShippingCents)} to anywhere in the ${siteConfig.shipsTo}, or free on orders over ${formatPrice(siteConfig.freeShippingThresholdCents)}. We only ship to the ${siteConfig.shipsTo} for now.`,
    link: { href: "/shipping", label: "Delivery details" },
  },
  {
    q: "What's in it?",
    text: ingredientsInci
      ? `${ingredientsInci}. If you have sensitive skin, patch test on a small area first.`
      : `The full ingredient list will be printed on the bottle. If you have allergies and want it before you order, email ${siteConfig.supportEmail}. If you have sensitive skin, patch test on a small area first.`,
  },
];
