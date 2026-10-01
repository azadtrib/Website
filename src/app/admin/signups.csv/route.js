import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listSignups } from "@/lib/offer";

export const dynamic = "force-dynamic";

// A spreadsheet opens a cell starting with = + - @ as a formula, so a crafted
// "email" could run one on the owner's machine. Prefixing a quote neutralises it.
function csvCell(value) {
  let text = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return new Response("Not signed in.", { status: 401 });
  }

  const signups = await listSignups();
  const rows = [
    ["email", "code", "signed_up_at", "code_expires_at", "used_code"],
    ...signups.map((s) => [s.email, s.code, s.signedUpAt, s.expiresAt, s.redeemed ? "yes" : "no"]),
  ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="azad-black-signups-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
