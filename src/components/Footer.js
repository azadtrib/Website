import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-navy text-ink mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="font-bold text-lg">{siteConfig.brandName}</p>
          <p className="text-ink/70 text-sm mt-2 max-w-xs">
            {siteConfig.description}
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold mb-3">Shop</p>
          <ul className="space-y-2 text-ink/70">
            <li>
              <Link href="/#shop" className="hover:text-teal">
                All products
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-teal">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold mb-3">Get in touch</p>
          <ul className="space-y-2 text-ink/70">
            <li>{siteConfig.supportEmail}</li>
            <li>
              <a href={siteConfig.instagram} className="hover:text-teal">
                Instagram
              </a>
            </li>
            <li>
              <a href={siteConfig.tiktok} className="hover:text-teal">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/10 py-5 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
      </div>
    </footer>
  );
}
