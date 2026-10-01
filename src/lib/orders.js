import { getStripeClient } from "./stripe";
import { sendOutForDelivery, sendShipDateEmail } from "./email";
import { hmacHex } from "./signing";

// Stripe is the source of truth for orders — there is no separate database.
// Delivery state lives in the PaymentIntent's metadata.
const DELIVERY_FLAG = "out_for_delivery_at";
const TRACKING_NUMBER = "tracking_number";
const TRACKING_URL = "tracking_url";
const SHIP_DATE_NOTICE = "ship_date_notice";

export function orderNumberFromSession(sessionId) {
  return `AB-${sessionId.slice(-8).toUpperCase()}`;
}

// Only completed sessions, paged through. Every abandoned checkout also
// creates a session, so taking "the latest 50" of all of them would let real
// orders fall off the list once enough people changed their minds.
export async function listRecentOrders(max = 500) {
  const stripe = getStripeClient();
  const sessions = await stripe.checkout.sessions
    .list({
      status: "complete",
      limit: 100,
      expand: ["data.line_items", "data.payment_intent"],
    })
    .autoPagingToArray({ limit: max });

  return sessions
    .filter((session) => session.payment_status === "paid")
    .map((session) => {
      const address = session.collected_information?.shipping_details?.address;
      return {
        id: session.id,
        orderNumber: orderNumberFromSession(session.id),
        createdAt: new Date(session.created * 1000).toISOString(),
        customerEmail: session.customer_details?.email || null,
        customerName: session.customer_details?.name || null,
        totalCents: session.amount_total,
        items: (session.line_items?.data || []).map((li) => ({
          name: li.description,
          quantity: li.quantity,
        })),
        address: address
          ? [address.line1, address.line2, address.city, address.postal_code, address.country]
              .filter(Boolean)
              .join(", ")
          : null,
        outForDeliveryAt:
          session.payment_intent?.metadata?.[DELIVERY_FLAG] || null,
        trackingNumber: session.payment_intent?.metadata?.[TRACKING_NUMBER] || null,
        trackingUrl: session.payment_intent?.metadata?.[TRACKING_URL] || null,
        shipDateNotice: session.payment_intent?.metadata?.[SHIP_DATE_NOTICE] || null,
        paymentIntentId: session.payment_intent?.id || null,
      };
    });
}

// Emails every paid order that hasn't shipped yet with its expected ship
// date. Safe to run again: an order already told this exact date is skipped,
// and each email carries an idempotency key, so a retry after a timeout picks
// up where it stopped instead of emailing people twice.
export async function notifyShipDate(rawShipDate) {
  const shipDate = String(rawShipDate || "").trim().slice(0, 80);
  if (!shipDate) throw new Error("Enter the ship date first.");

  const stripe = getStripeClient();
  const waiting = (await listRecentOrders(2000)).filter(
    (o) => !o.outForDeliveryAt && o.customerEmail && o.paymentIntentId
  );

  const tally = { sent: 0, alreadyTold: 0, failed: 0 };
  const dateKey = hmacHex(shipDate).slice(0, 16);

  for (const order of waiting) {
    if (order.shipDateNotice === shipDate) {
      tally.alreadyTold += 1;
      continue;
    }
    const result = await sendShipDateEmail({
      to: order.customerEmail,
      orderNumber: order.orderNumber,
      shipDate,
      idempotencyKey: `ship-date/${order.id}/${dateKey}`,
    }).catch((err) => ({ error: err }));

    if (result?.error) {
      console.error(`Ship-date email failed for ${order.orderNumber}:`, result.error);
      tally.failed += 1;
      continue;
    }
    await stripe.paymentIntents.update(order.paymentIntentId, {
      metadata: { [SHIP_DATE_NOTICE]: shipDate },
    });
    tally.sent += 1;
  }

  return { ...tally, waiting: waiting.length };
}

// The tracking link ends up as an <a href> in a customer email, so only a
// plain https URL is accepted — anything else (javascript:, data:, a typo)
// is refused rather than mailed out.
export function parseTrackingUrl(value) {
  const trimmed = (value || "").trim();
  if (!trimmed) return null;
  let url;
  try {
    url = new URL(trimmed);
  } catch {
    throw new Error("That tracking link isn't a valid web address.");
  }
  if (url.protocol !== "https:") {
    throw new Error("The tracking link must start with https://");
  }
  return url.toString();
}

export async function markOutForDelivery(sessionId, { trackingNumber, trackingUrl } = {}) {
  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw new Error("That order has not been paid.");
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;
  if (!paymentIntentId) throw new Error("That order has no payment to update.");

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent.metadata?.[DELIVERY_FLAG]) {
    return { alreadySent: true };
  }

  const cleanTrackingNumber = (trackingNumber || "").trim().slice(0, 64) || null;

  const result = await sendOutForDelivery({
    to: session.customer_details?.email,
    orderNumber: orderNumberFromSession(session.id),
    trackingNumber: cleanTrackingNumber,
    trackingUrl,
    idempotencyKey: `out-for-delivery/${session.id}`,
  });

  // Resend reports failures in the return value rather than throwing. Bail
  // before recording the flag, so the button stays available to retry.
  if (result?.error) {
    throw new Error(`The email didn't send: ${result.error.message || "unknown error"}`);
  }

  await stripe.paymentIntents.update(paymentIntentId, {
    metadata: {
      ...paymentIntent.metadata,
      [DELIVERY_FLAG]: new Date().toISOString(),
      ...(cleanTrackingNumber && { [TRACKING_NUMBER]: cleanTrackingNumber }),
      ...(trackingUrl && { [TRACKING_URL]: trackingUrl }),
    },
  });

  return { alreadySent: false };
}
