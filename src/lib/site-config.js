const FALLBACK_SITE_URL = "https://azadblack.co.uk";

// NEXT_PUBLIC_SITE_URL is typed by hand into a hosting dashboard, so it
// regularly arrives as a bare domain or with a stray slash. Left as-is that
// crashes `new URL()` in layout.js and takes the whole build down, so
// normalise it here rather than trusting it.
function resolveSiteUrl(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) return FALLBACK_SITE_URL;

  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

// Brand details — this is the only place most copy needs to change.
export const siteConfig = {
  // Used for canonical URLs, sitemap and social share links. Set
  // NEXT_PUBLIC_SITE_URL in the hosting environment to the live domain.
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  brandName: "AZAD BLACK",
  tagline: "Azad Black - Your Daily Essential.",
  description:
    "Take better care of yourself. It starts with the little things.",
  guaranteeDays: 30,
  supportEmail: "hello@azadblack.co.uk",

  // Social links are optional — the footer hides any that are left empty.
  // A link to instagram.com rather than an actual profile reads as fake, so
  // leave these blank until the real accounts exist.
  instagram: "",
  tiktok: "",

  currency: "gbp",
  freeShippingThresholdCents: 3500,
  flatShippingCents: 399,
  dispatchDays: "1-2 business days",
  deliveryEstimate: "2-4 business days after dispatch",
  shipsTo: "United Kingdom",

  // TRADER DETAILS — legally required on a UK selling site, and the legal
  // pages render these verbatim. Replace every "TODO" before launch.
  business: {
    legalName: "TODO: registered company name, or your own name if a sole trader",
    addressLines: [
      "TODO: first line of your business address",
      "TODO: town/city",
      "TODO: postcode",
      "United Kingdom",
    ],
    // Leave blank if trading as a sole trader rather than a limited company.
    companyNumber: "",
    vatNumber: "",
    // The person or company legally accountable for the cosmetic product in
    // the UK. Required by the UK Cosmetics Regulation. See COMPLIANCE.md.
    responsiblePerson: "TODO: name of the UK Responsible Person",
  },
};

// True once the trader details above have actually been filled in.
export function hasTraderDetails() {
  const { legalName, addressLines } = siteConfig.business;
  return (
    !legalName.startsWith("TODO") &&
    !addressLines.some((line) => line.startsWith("TODO"))
  );
}
