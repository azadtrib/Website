import { siteConfig } from "@/lib/site-config";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Order outcome pages carry a Stripe session id and have no search value.
      disallow: ["/success", "/cancel", "/api/", "/admin"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
