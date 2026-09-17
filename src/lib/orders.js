import { getStripeClient } from "./stripe";
import { sendOutForDelivery } from "./email";

// Stripe is the source of truth for orders — there is no separate database.
// Delivery state lives in the PaymentIntent's metadata.
const DELIVERY_FLAG = "out_for_delivery_at";

export function orderNumberFromSession(sessionId) {
  return `AB-${sessionId.slice(-8).toUpperCase()}`;
}

export async function listRecentOrders(limit = 50) {
  const stripe = getStripeClient();
  const sessions = await stripe.checkout.sessions.list({
    limit,
    expand: ["data.line_items", "data.payment_intent"],
  });

  return sessions.data
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
      };
    });
}

export async function markOutForDelivery(sessionId) {
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

  await sendOutForDelivery({
    to: session.customer_details?.email,
    orderNumber: orderNumberFromSession(session.id),
  });

  // Recorded only after the email goes out, so a send failure can be retried.
  await stripe.paymentIntents.update(paymentIntentId, {
    metadata: { ...paymentIntent.metadata, [DELIVERY_FLAG]: new Date().toISOString() },
  });

  return { alreadySent: false };
}
