import Link from "next/link";
import { siteConfig, hasTraderDetails } from "@/lib/site-config";
import Logo from "./Logo";

const icons = {
  Instagram: (
    <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm4.5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.25-1.5h.01" />
  ),
  TikTok: (
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.6" />
  ),
};

const socials = [
  { label: "Instagram", href: siteConfig.instagram },
  { label: "TikTok", href: siteConfig.tiktok },
];

export default function Footer() {
  // A social link pointing at instagram.com rather than a real profile looks
  // like a fake shop, so an unset one is simply not rendered.
  const activeSocials = socials.filter((s) => s.href);

  return (
    <footer className="bg-navy text-ink border-t border-ink/[0.06]">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 sm:grid-cols-4">
        <div>
          <Logo className="h-9" />
          <p className="text-ink/60 text-sm mt-4 max-w-xs">
            Men&apos;s grooming that doesn&apos;t feel like another job. Starting with beard oil.
          </p>
          <p className="eyebrow mt-4">{siteConfig.motto}</p>
          {activeSocials.length > 0 && (
            <div className="flex gap-2 mt-5 -ml-2">
              {activeSocials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`${siteConfig.brandName} on ${s.label}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-10 h-10 flex items-center justify-center text-ink/60 hover:text-teal transition-colors"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {icons[s.label]}
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="text-sm">
          <p className="eyebrow text-ink/45 mb-4">The first drop</p>
          <ul className="space-y-2.5 text-ink/70">
            <li>
              <Link href="/beard-oil" className="hover:text-teal transition-colors">
                Beard oil
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-teal transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="eyebrow text-ink/45 mb-4">Help</p>
          <ul className="space-y-2.5 text-ink/70">
            <li>
              <Link href="/shipping" className="hover:text-teal transition-colors">
                Delivery
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-teal transition-colors">
                Returns & refunds
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-teal transition-colors">
                Terms & conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-teal transition-colors">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="eyebrow text-ink/45 mb-4">Get in touch</p>
          <ul className="space-y-2.5 text-ink/70">
            <li>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="hover:text-teal transition-colors"
              >
                {siteConfig.supportEmail}
              </a>
            </li>
            {activeSocials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="hover:text-teal transition-colors"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/[0.07] py-6 px-5 text-center text-xs text-ink/45 space-y-1">
        {hasTraderDetails() && (
          <p>
            {siteConfig.business.legalName},{" "}
            {siteConfig.business.addressLines.join(", ")}
            {siteConfig.business.companyNumber &&
              ` · Company no. ${siteConfig.business.companyNumber}`}
          </p>
        )}
        <p>
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
