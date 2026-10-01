import { Resend } from "resend";
import { siteConfig } from "./site-config";
import { formatPrice } from "./format";

// Until a domain is verified in Resend, EMAIL_FROM falls back to Resend's
// shared test sender, which can only deliver to the account owner's address.
// See README "Sending order emails" for the DNS steps.
const FROM = process.env.EMAIL_FROM || "AZAD BLACK <onboarding@resend.dev>";
const OWNER_EMAIL = process.env.OWNER_EMAIL || siteConfig.supportEmail;

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// Every value below that came from a customer or from the admin form —
// names, addresses, tracking numbers — is escaped. Otherwise someone could
// type markup into their delivery address and have it render inside the
// owner's new-order email.
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Email clients are unreliable with modern CSS, so these templates stay on
// inline styles and simple markup.
function layout(bodyHtml) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#16130f;font-family:Helvetica,Arial,sans-serif;color:#efe8e0;">
    <div style="max-width:520px;margin:0 auto;background:#221d18;border-radius:16px;padding:32px;">
      <h1 style="margin:0 0 24px;font-size:20px;letter-spacing:1px;color:#efe8e0;">${escapeHtml(siteConfig.brandName)}</h1>
      ${bodyHtml}
      <p style="margin:32px 0 0;font-size:12px;color:rgba(239,232,224,0.5);">
        Questions? Just reply to this email or contact us at ${escapeHtml(siteConfig.supportEmail)}.
      </p>
    </div>
  </body>
</html>`;
}

function itemsTable(items, totalCents) {
  const rows = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:6px 0;color:rgba(239,232,224,0.8);">${escapeHtml(item.quantity)} &times; ${escapeHtml(item.name)}</td>
          <td style="padding:6px 0;text-align:right;color:rgba(239,232,224,0.8);">${formatPrice(item.amountCents)}</td>
        </tr>`
    )
    .join("");

  return `<table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
    ${rows}
    <tr>
      <td style="padding:12px 0 0;border-top:1px solid rgba(239,232,224,0.15);font-weight:bold;">Total</td>
      <td style="padding:12px 0 0;border-top:1px solid rgba(239,232,224,0.15);text-align:right;font-weight:bold;">${formatPrice(totalCents)}</td>
    </tr>
  </table>`;
}

// Resend drops a repeat send with the same idempotency key, so a webhook that
// Stripe delivers twice still only produces one email.
function sendOptions(idempotencyKey) {
  return idempotencyKey ? { idempotencyKey } : undefined;
}

export async function sendOrderConfirmation({ to, orderNumber, items, totalCents, idempotencyKey }) {
  const resend = getResend();
  if (!resend || !to) return { skipped: true };

  return resend.emails.send(
    {
      from: FROM,
      to,
      subject: `Order confirmed — ${orderNumber}`,
      html: layout(`
        <p style="margin:0 0 16px;font-size:18px;font-weight:bold;">Thanks for your order.</p>
        <p style="margin:0 0 24px;color:rgba(239,232,224,0.7);line-height:1.6;">
          We've got your order and we're getting it ready. <strong style="color:#e2a582;">We'll email you
          again as soon as it's out for delivery.</strong>
        </p>
        ${itemsTable(items, totalCents)}
        <p style="margin:0;font-size:13px;color:rgba(239,232,224,0.5);">Order reference: ${escapeHtml(orderNumber)}</p>
      `),
    },
    sendOptions(idempotencyKey)
  );
}

export async function sendOutForDelivery({ to, orderNumber, trackingNumber, trackingUrl, idempotencyKey }) {
  const resend = getResend();
  if (!resend || !to) return { skipped: true };

  let tracking = "";
  if (trackingNumber || trackingUrl) {
    tracking = `<p style="margin:0 0 24px;color:rgba(239,232,224,0.7);line-height:1.6;">
      ${trackingNumber ? `Tracking number: <strong style="color:#efe8e0;">${escapeHtml(trackingNumber)}</strong><br/>` : ""}
      ${
        trackingUrl
          ? `<a href="${escapeHtml(trackingUrl)}" style="display:inline-block;margin-top:12px;background:#efe8e0;color:#16130f;padding:10px 20px;border-radius:999px;text-decoration:none;font-weight:bold;">Track your parcel</a>`
          : ""
      }
    </p>`;
  }

  return resend.emails.send(
    {
      from: FROM,
      to,
      subject: `Your order is out for delivery — ${orderNumber}`,
      html: layout(`
        <p style="margin:0 0 16px;font-size:18px;font-weight:bold;">Your order is out for delivery.</p>
        <p style="margin:0 0 24px;color:rgba(239,232,224,0.7);line-height:1.6;">
          Good news — your ${escapeHtml(siteConfig.brandName)} order has left us and is on its way to you.
          It should arrive in the next few days.
        </p>
        ${tracking}
        <p style="margin:0;font-size:13px;color:rgba(239,232,224,0.5);">Order reference: ${escapeHtml(orderNumber)}</p>
      `),
    },
    sendOptions(idempotencyKey)
  );
}

export async function sendOwnerNewOrder({ orderNumber, items, totalCents, customerEmail, shipping, idempotencyKey }) {
  const resend = getResend();
  if (!resend) return { skipped: true };

  const address = shipping
    ? [shipping.line1, shipping.line2, shipping.city, shipping.postal_code, shipping.country]
        .filter(Boolean)
        .join(", ")
    : "No address collected";

  return resend.emails.send(
    {
      from: FROM,
      to: OWNER_EMAIL,
      subject: `New order ${orderNumber} — ${formatPrice(totalCents)}`,
      html: layout(`
        <p style="margin:0 0 16px;font-size:18px;font-weight:bold;">New order received.</p>
        ${itemsTable(items, totalCents)}
        <p style="margin:0 0 6px;color:rgba(239,232,224,0.7);"><strong>Ship to:</strong> ${escapeHtml(address)}</p>
        <p style="margin:0 0 6px;color:rgba(239,232,224,0.7);"><strong>Customer:</strong> ${escapeHtml(customerEmail || "unknown")}</p>
        <p style="margin:16px 0 0;font-size:13px;color:rgba(239,232,224,0.5);">
          Post the parcel, then mark it as out for delivery at ${escapeHtml(siteConfig.url)}/admin
        </p>
      `),
    },
    sendOptions(idempotencyKey)
  );
}
