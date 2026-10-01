import { headers } from "next/headers";

// Small fixed-window limiter for public endpoints. On serverless hosting each
// running instance keeps its own counts, so this slows down abuse rather than
// guaranteeing a global ceiling.
const buckets = new Map();

export async function clientId() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
}

export function allowRequest(key, { limit, windowMs }) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now - bucket.start > windowMs) {
    buckets.set(key, { start: now, count: 1 });
  } else if (bucket.count >= limit) {
    return false;
  } else {
    bucket.count += 1;
  }

  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (now - v.start > windowMs) buckets.delete(k);
  }
  return true;
}
