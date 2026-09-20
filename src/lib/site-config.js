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
  instagram: "https://instagram.com",
  tiktok: "https://tiktok.com",
  currency: "gbp",
  freeShippingThresholdCents: 3500,
  flatShippingCents: 399,
};
