import { siteConfig } from "./site-config";
import { products, BOTTLE_SIZE } from "./products";
import { formatPrice } from "./format";

// Everything here describes the shop to machines — search engines through
// schema.org structured data, AI assistants through /llms.txt. It is built
// from the same catalogue and config the pages render, so a price or policy
// change can't leave a stale copy behind.

const absolute = (path) => `${siteConfig.url}${path}`;
const money = (cents) => (cents / 100).toFixed(2);
const currency = siteConfig.currency.toUpperCase();

export function lowestPriceCents() {
  return Math.min(...products.map((p) => p.priceCents));
}

export function siteDescription() {
  return (
    `Lightweight, fast-absorbing ${BOTTLE_SIZE} beard oil that softens coarse hair and calms itch. ` +
    `From ${formatPrice(lowestPriceCents())}, with a ${siteConfig.guaranteeDays}-day money-back guarantee and UK delivery.`
  );
}

// Search results cut descriptions off at roughly 155 characters, so this
// leads with what and how much, then the reason to trust it.
export function productDescription(product) {
  const what =
    product.bottles === 1
      ? `A ${BOTTLE_SIZE} bottle of ${siteConfig.brandName} beard oil for ${formatPrice(product.priceCents)}.`
      : `${product.bottles} x ${BOTTLE_SIZE} bottles of ${siteConfig.brandName} beard oil for ${formatPrice(product.priceCents)}, ${formatPrice(Math.round(product.priceCents / product.bottles))} a bottle.`;
  return `${what} Softens coarse hair and calms itch. ${siteConfig.guaranteeDays}-day money-back guarantee, UK delivery.`;
}

function shippingDetails() {
  return {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: money(siteConfig.flatShippingCents),
      currency,
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: siteConfig.shipsToCode,
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: siteConfig.dispatch.min,
        maxValue: siteConfig.dispatch.max,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: siteConfig.transit.min,
        maxValue: siteConfig.transit.max,
        unitCode: "DAY",
      },
    },
  };
}

// Mirrors /returns: 30 days, sent back by post, customer pays return postage
// unless the item was faulty.
function returnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: siteConfig.shipsToCode,
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: siteConfig.guaranteeDays,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/ReturnShippingFees",
  };
}

export function productSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${siteConfig.brandName} Beard Oil — ${product.name}`,
    description: product.description,
    sku: product.slug,
    category: "Health & Beauty > Personal Care > Shaving & Grooming > Beard Oil",
    image: product.image ? absolute(product.image) : undefined,
    brand: { "@type": "Brand", name: siteConfig.brandName },
    size: product.scent,
    offers: {
      "@type": "Offer",
      url: absolute(`/products/${product.slug}`),
      priceCurrency: currency,
      price: money(product.priceCents),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: siteConfig.brandName },
      shippingDetails: shippingDetails(),
      hasMerchantReturnPolicy: returnPolicy(),
    },
  };
}

export function breadcrumbSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Beard oil", item: absolute("/#shop") },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: absolute(`/products/${product.slug}`),
      },
    ],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    url: siteConfig.url,
    // A raster logo: Google's logo guidelines don't reliably accept SVG.
    logo: absolute("/apple-icon.png"),
    email: siteConfig.supportEmail,
    sameAs: [siteConfig.instagram, siteConfig.tiktok].filter(Boolean),
  };
}

// Lets Google show "AZAD BLACK" as the site name in results instead of the URL.
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brandName,
    url: siteConfig.url,
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.text },
    })),
  };
}

// JSON-LD sits inside a <script> tag. Escaping "<" stops any text in the
// data (a product name, an FAQ answer) from closing that tag early.
export function jsonLd(data) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
