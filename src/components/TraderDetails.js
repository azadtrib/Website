import { siteConfig, hasTraderDetails } from "@/lib/site-config";

// UK law requires an online seller to identify itself, so this block is
// repeated across the legal pages. Until the real details are filled in it
// says so loudly rather than quietly printing "TODO" at a customer.
export default function TraderDetails() {
  const { legalName, addressLines, companyNumber, vatNumber } = siteConfig.business;

  if (!hasTraderDetails()) {
    return (
      <p className="border border-teal/40 bg-teal/10 rounded-xl p-4 text-ink">
        <strong>Trader details not set yet.</strong> The business name and
        address still need adding in <code>src/lib/site-config.js</code> before
        this site should take real orders — UK law requires a seller to show who
        they are and where they are based.
      </p>
    );
  }

  return (
    <div className="not-italic">
      <p className="text-ink font-medium">{legalName}</p>
      <p>
        {addressLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      {companyNumber && <p className="mt-2">Company number: {companyNumber}</p>}
      {vatNumber && <p>VAT number: {vatNumber}</p>}
      <p className="mt-2">
        Email:{" "}
        <a
          href={`mailto:${siteConfig.supportEmail}`}
          className="text-teal hover:underline"
        >
          {siteConfig.supportEmail}
        </a>
      </p>
    </div>
  );
}
