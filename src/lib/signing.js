import { createHmac, timingSafeEqual } from "node:crypto";

// Shared HMAC signing for values the server hands to the browser and later
// trusts again (the admin session, the first-drop offer). A signed value can
// be read by anyone but not altered without the secret.

function getSecret() {
  // Falls back to the Stripe key so things keep working if only the
  // documented ADMIN_SESSION_SECRET is missing.
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("No secret available to sign values.");
  return secret;
}

export function hmacHex(value) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// "payload.signature"
export function signValue(payload) {
  return `${payload}.${hmacHex(payload)}`;
}

// Returns the payload if the signature checks out, otherwise null.
export function verifySignedValue(token) {
  if (typeof token !== "string") return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  return safeEqual(token.slice(dot + 1), hmacHex(payload)) ? payload : null;
}
