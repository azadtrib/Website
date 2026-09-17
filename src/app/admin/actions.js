"use server";

import { revalidatePath } from "next/cache";
import {
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
  verifyPassword,
} from "@/lib/admin-auth";
import { markOutForDelivery } from "@/lib/orders";

export async function login(_prevState, formData) {
  if (!verifyPassword(formData.get("password"))) {
    return { error: "Incorrect password." };
  }
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
    const { alreadySent } = await markOutForDelivery(sessionId);
    revalidatePath("/admin");
    return {
      error: null,
      ok: alreadySent ? "Already marked — no duplicate sent." : "Customer notified.",
    };
  } catch (err) {
    return { error: err.message || "Could not update that order.", ok: null };
  }
}
