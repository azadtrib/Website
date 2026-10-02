import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

// The AZAD BLACK wordmark: script "AZAD", copper "BLACK". Cut out of the
// brand's logo artwork onto a transparent background, so it sits on any of
// the site's dark surfaces. Size it by height; the width follows.
export default function Logo({ className = "h-8", priority = false }) {
  return (
    <Image
      src="/brand/logo.png"
      alt={siteConfig.brandName}
      width={326}
      height={72}
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}
