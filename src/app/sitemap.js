import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...products.map((product) => ({
      url: `${siteConfig.url}/products/${product.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...["/shipping", "/returns", "/terms", "/privacy"].map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    })),
  ];
}
