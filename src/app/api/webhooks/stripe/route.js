import { getStripeClient } from "@/lib/stripe";
import { sendOrderConfirmation, sendOwnerNewOrder } from "@/lib/email";
import { orderNumberFromSession } from "@/lib/orders";

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
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      return new Response("Not paid", { status: 200 });
    }

    const items = (session.line_items?.data || []).map((li) => ({
      name: li.description,
      quantity: li.quantity,
      amountCents: li.amount_total,
    }));

    const orderNumber = orderNumberFromSession(session.id);
    const customerEmail = session.customer_details?.email;

    // One failing email must not fail the webhook — Stripe would retry the
    // whole thing and the customer could get duplicates.
    const results = await Promise.allSettled([
      sendOrderConfirmation({
        to: customerEmail,
        orderNumber,
        items,
        totalCents: session.amount_total,
      }),
      sendOwnerNewOrder({
        orderNumber,
        items,
        totalCents: session.amount_total,
        customerEmail,
        shipping: session.collected_information?.shipping_details?.address,
      }),
    ]);

    for (const result of results) {
      if (result.status === "rejected") {
        console.error("Order email failed:", result.reason);
      }
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Stripe webhook handling failed:", err);
    return new Response("Handler error", { status: 500 });
  }
}
