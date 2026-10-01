"use server";

import { revalidatePath } from "next/cache";
import {
  clearFailedLogins,
  createAdminSession,
  destroyAdminSession,
  FAILED_LOGIN_DELAY_MS,
  isAdminAuthenticated,
  loginLockedFor,
  recordFailedLogin,
  verifyPassword,
} from "@/lib/admin-auth";
import { markOutForDelivery, notifyShipDate, parseTrackingUrl } from "@/lib/orders";
import { clientId } from "@/lib/rate-limit";

export async function login(_prevState, formData) {
  const id = await clientId();

  const lockedMs = loginLockedFor(id);
  if (lockedMs > 0) {
    const minutes = Math.ceil(lockedMs / 60000);
    return {
      error: `Too many failed attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    };
  }

  if (!verifyPassword(formData.get("password"))) {
    recordFailedLogin(id);
    await new Promise((resolve) => setTimeout(resolve, FAILED_LOGIN_DELAY_MS));
    return { error: "Incorrect password." };
  }

  clearFailedLogins(id);
  await createAdminSession();
  revalidatePath("/admin");
  return { error: null };
}

export async function logout() {
  await destroyAdminSession();
  revalidatePath("/admin");
}

export async function markDelivered(_prevState, formData) {
  // Re-checked here because a server action is its own entry point — being
  // rendered behind the login screen does not protect it.
  if (!(await isAdminAuthenticated())) {
    return { error: "Not signed in.", ok: null };
  }

  const sessionId = formData.get("sessionId");
  if (typeof sessionId !== "string" || !sessionId) {
    return { error: "Missing order.", ok: null };
  }

  try {
    const trackingUrl = parseTrackingUrl(formData.get("trackingUrl"));
    const trackingNumber = String(formData.get("trackingNumber") || "");
    const { alreadySent } = await markOutForDelivery(sessionId, {
      trackingNumber,
      trackingUrl,
    });
    revalidatePath("/admin");
    return {
      error: null,
      ok: alreadySent ? "Already marked — no duplicate sent." : "Customer notified.",
    };
  } catch (err) {
    return { error: err.message || "Could not update that order.", ok: null };
  }
}

export async function sendShipDateToCustomers(_prevState, formData) {
  if (!(await isAdminAuthenticated())) {
    return { error: "Not signed in.", ok: null };
  }
  if (formData.get("confirm") !== "yes") {
    return { error: "Tick the box to confirm before emailing customers.", ok: null };
  }

  try {
    const { sent, alreadyTold, failed, waiting } = await notifyShipDate(formData.get("shipDate"));
    revalidatePath("/admin");
    const parts = [`Emailed ${sent} of ${waiting} waiting order${waiting === 1 ? "" : "s"}.`];
    if (alreadyTold) parts.push(`${alreadyTold} had already been told this date.`);
    if (failed) parts.push(`${failed} failed — run it again to retry just those.`);
    return { error: null, ok: parts.join(" ") };
  } catch (err) {
    return { error: err.message || "Could not send the ship date.", ok: null };
  }
}
