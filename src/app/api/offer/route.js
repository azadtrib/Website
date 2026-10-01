import { NextResponse, after } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { issueOffer, normaliseEmail, rememberOffer } from "@/lib/offer";
import { addToAudience, sendOfferEmail } from "@/lib/email";
import { allowRequest, clientId } from "@/lib/rate-limit";

// Email sign-up → first-drop discount. Used by the welcome pop-up and the
// "join" form at the bottom of the homepage.
export async function POST(request) {
  if (!allowRequest(`offer:${await clientId()}`, { limit: 8, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json(
      { error: "Too many attempts. Give it a few minutes and try again." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a field people never see. Bots fill it in; they get a polite
  // non-answer and nothing is created in Stripe or Resend.
  if (body?.company) {
    return NextResponse.json({ ok: true });
  }

  const email = normaliseEmail(body?.email);
  if (!email) {
    return NextResponse.json({ error: "That doesn't look like an email address." }, { status: 400 });
  }

  let offer;
  try {
    offer = await issueOffer(email);
  } catch (err) {
    console.error("Could not issue first-drop offer:", err);
    return NextResponse.json(
      { error: "Something went wrong unlocking your discount. Please try again." },
      { status: 500 }
    );
  }

  // after(): on serverless hosting, work left running once the response is
  // sent can be frozen and never finish. These are scheduled to complete
  // after the reply, so the visitor isn't kept waiting on Resend.
  after(() =>
    addToAudience(email).catch((err) => console.error("Could not save contact:", err))
  );

  if (!offer.usable) {
    return NextResponse.json(
      { error: "That email has already claimed its first-drop discount." },
      { status: 409 }
    );
  }

  if (offer.isNew) {
    after(() =>
      sendOfferEmail({
        to: email,
        code: offer.code,
        percentOff: siteConfig.offer.percentOff,
        expiresAt: offer.expiresAt,
      })
        .then((result) => result?.error && console.error("Offer email failed:", result.error))
        .catch((err) => console.error("Offer email failed:", err))
    );
  }

  await rememberOffer(offer);

  return NextResponse.json({
    code: offer.code,
    percentOff: siteConfig.offer.percentOff,
    expiresAt: offer.expiresAt,
  });
}
