import { cookies } from "next/headers";
import { safeEqual, signValue, verifySignedValue } from "./signing";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 12;

// Login throttling. On serverless hosting each running instance keeps its
// own copy of this map, so the lockout is per-instance rather than global —
// the fixed delay on every failed attempt is what slows guessing everywhere.
// A long, random ADMIN_PASSWORD remains the real protection.
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
export const FAILED_LOGIN_DELAY_MS = 1000;
const failedLogins = new Map();

export function loginLockedFor(clientId) {
  const entry = failedLogins.get(clientId);
  if (!entry?.lockedUntil) return 0;
  const remaining = entry.lockedUntil - Date.now();
  if (remaining <= 0) {
    failedLogins.delete(clientId);
    return 0;
  }
  return remaining;
}

export function recordFailedLogin(clientId) {
  const now = Date.now();
  const entry = failedLogins.get(clientId);
  const count = entry && now - entry.firstAt < LOCKOUT_MS ? entry.count + 1 : 1;
  failedLogins.set(clientId, {
    count,
    firstAt: count === 1 ? now : entry.firstAt,
    lockedUntil: count >= MAX_FAILED_ATTEMPTS ? now + LOCKOUT_MS : null,
  });

  if (failedLogins.size > 1000) {
    for (const [key, value] of failedLogins) {
      if (now - value.firstAt > LOCKOUT_MS) failedLogins.delete(key);
    }
  }
}

export function clearFailedLogins(clientId) {
  failedLogins.delete(clientId);
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function verifyPassword(candidate) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof candidate !== "string") return false;
  return safeEqual(candidate, expected);
}

export async function createAdminSession() {
  const token = signValue(String(Date.now() + MAX_AGE_SECONDS * 1000));
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const expiresAt = verifySignedValue(cookieStore.get(COOKIE_NAME)?.value);
  return expiresAt !== null && Number(expiresAt) > Date.now();
}
