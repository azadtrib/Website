import { products, ingredientsInci, productDetails, oilDescription, BOTTLE_SIZE } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { formatPrice } from "@/lib/format";
import { siteDescription } from "@/lib/seo";

// /llms.txt — a plain markdown summary of the shop for AI assistants and
// other automated readers (see llmstxt.org). Generated from the same
// catalogue and config as the pages at build time, so prices and policies
// here can't fall out of date.
//
// Deliberately limited to facts the site states elsewhere. Anything put here
// gets repeated by AI tools as fact, so unverified claims stay out.

export const dynamic = "force-static";

function buildLlmsTxt() {
  const url = (path) => `${siteConfig.url}${path}`;

  const productLines = products.map((p) => {
    const perBottle = formatPrice(Math.round(p.priceCents / p.bottles));
    const saving =
      p.savingCents > 0
        ? ` Saves ${formatPrice(p.savingCents)} compared with buying ${p.bottles} single bottles.`
        : "";
    return `- [${p.name} (${p.scent})](${url(`/products/${p.slug}`)}): ${formatPrice(p.priceCents)}, ${perBottle} per bottle.${saving}`;
  });

  const socials = [
    siteConfig.instagram && `- [Instagram](${siteConfig.instagram})`,
    siteConfig.tiktok && `- [TikTok](${siteConfig.tiktok})`,
  ].filter(Boolean);

  return `# ${siteConfig.brandName}

> ${siteDescription()}

${siteConfig.brandName} sells one product: a beard oil in a ${BOTTLE_SIZE} dropper bottle, offered in packs of one, two or three bottles. Every pack contains the same oil. It is a cosmetic for external use on facial hair and the skin beneath it, not a medicine.

## Products

${productLines.join("\n")}

${oilDescription}

${productDetails.map((d) => `- ${d.label}: ${d.value}`).join("\n")}

Ingredients: ${
    ingredientsInci ||
    `the full ingredient list is printed on the bottle and available on request from ${siteConfig.supportEmail}.`
  }

## Buying

- Payment is by card through Stripe's hosted checkout. ${siteConfig.brandName} never sees or stores card details.
- Prices are in pounds sterling (GBP).
- Delivery is to the ${siteConfig.shipsTo} only.
- Delivery costs ${formatPrice(siteConfig.flatShippingCents)}, and is free on orders over ${formatPrice(siteConfig.freeShippingThresholdCents)}.
- Orders are dispatched within ${siteConfig.dispatchDays}; delivery usually takes ${siteConfig.deliveryEstimate}.
- Customers are emailed an order confirmation, and again when the order is out for delivery.

## Returns

- ${siteConfig.guaranteeDays}-day money-back guarantee from delivery, including on opened bottles.
- Separately, UK customers have a statutory 14-day right to cancel.
- Damaged or incorrect items are replaced or refunded in full, including delivery.

## Policies

- [Delivery & shipping](${url("/shipping")})
- [Returns & refunds](${url("/returns")})
- [Terms & conditions](${url("/terms")})
- [Privacy policy](${url("/privacy")})

## Contact

- Email: ${siteConfig.supportEmail}
${socials.join("\n")}
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
