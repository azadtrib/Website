import { getStripeClient } from "@/lib/stripe";
import { sendOrderConfirmation, sendOwnerNewOrder } from "@/lib/email";
import { orderNumberFromSession } from "@/lib/orders";

const CONFIRMATION_FLAG = "confirmation_sent_at";

// Stripe calls this endpoint directly. The signature check is what makes it
// safe to act on: without it anyone could POST a fake "order" and trigger
// emails. The raw body text is required — parsing it first breaks the check.
export async function POST(request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set; ignoring webhook.");
    return new Response("Webhook not configured", { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;
  try {
    const stripe = getStripeClient();
    event = await stripe.webhooks.constructEventAsync(body, signature, secret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return new Response("Ignored", { status: 200 });
  }

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ["line_items", "payment_intent"],
    });

    if (session.payment_status !== "paid") {
      return new Response("Not paid", { status: 200 });
    }

    // Stripe delivers webhooks at least once, not exactly once, so the same
    // order can arrive twice. The flag below catches repeats over Stripe's
    // whole retry window; the per-email idempotency keys catch two deliveries
    // landing at the same moment, before either has set the flag.
    const paymentIntent = session.payment_intent;
    if (paymentIntent?.metadata?.[CONFIRMATION_FLAG]) {
      return new Response("Already handled", { status: 200 });
    }

    const items = (session.line_items?.data || []).map((li) => ({
      name: li.description,
      quantity: li.quantity,
      amountCents: li.amount_total,
    }));

    const orderNumber = orderNumberFromSession(session.id);
    const customerEmail = session.customer_details?.email;

    // An email failure is logged, not returned as an error. Failing the
    // webhook would make Stripe retry for days and eventually disable the
    // endpoint — and while the Resend domain is unverified every customer
    // email fails, so that would happen on every single order.
    const results = await Promise.allSettled([
      sendOrderConfirmation({
        to: customerEmail,
        orderNumber,
        items,
        totalCents: session.amount_total,
        idempotencyKey: `order-confirmation/${session.id}`,
      }),
      sendOwnerNewOrder({
        orderNumber,
        items,
        totalCents: session.amount_total,
        customerEmail,
        shipping: session.collected_information?.shipping_details?.address,
        idempotencyKey: `owner-new-order/${session.id}`,
      }),
    ]);

    for (const result of results) {
      // Resend reports API errors in the return value rather than throwing.
      const error = result.status === "rejected" ? result.reason : result.value?.error;
      if (error) console.error(`Order email failed for ${orderNumber}:`, error);
    }

    if (paymentIntent?.id) {
      await stripe.paymentIntents.update(paymentIntent.id, {
        metadata: { ...paymentIntent.metadata, [CONFIRMATION_FLAG]: new Date().toISOString() },
      });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Stripe webhook handling failed:", err);
    return new Response("Handler error", { status: 500 });
  }
}
