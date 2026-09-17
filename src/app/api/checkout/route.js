import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

// Prices always come from our own product catalog, never from the client —
// otherwise a tampered request could check out at an arbitrary price.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const requestedItems = Array.isArray(body?.items) ? body.items : [];
  if (requestedItems.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const lineItems = [];
  let subtotalCents = 0;

  for (const requested of requestedItems) {
    const product = getProduct(requested?.slug);
    const quantity = Number(requested?.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return NextResponse.json(
        { error: "Cart contains an invalid item" },
        { status: 400 }
      );
    }
    subtotalCents += product.priceCents * quantity;
    lineItems.push({
      quantity,
      price_data: {
        currency: siteConfig.currency,
        unit_amount: product.priceCents,
        product_data: { name: `${siteConfig.brandName} — ${product.name}` },
      },
    });
  }

  const freeShipping = subtotalCents >= siteConfig.freeShippingThresholdCents;

  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    new URL(request.url).origin;

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ["GB"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: freeShipping ? 0 : siteConfig.flatShippingCents,
              currency: siteConfig.currency,
            },
            display_name: freeShipping ? "Free shipping" : "Standard shipping",
          },
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}
