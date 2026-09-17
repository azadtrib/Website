import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { listRecentOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/format";
import LoginForm from "./LoginForm";
import MarkDeliveredButton from "./MarkDeliveredButton";
import { logout } from "./actions";

export const metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="text-2xl font-bold">Admin not set up</h1>
        <p className="text-ink/70 mt-4">
          Set an <code>ADMIN_PASSWORD</code> environment variable to enable this page.
        </p>
      </div>
    );
  }

  if (!(await isAdminAuthenticated())) {
    return <LoginForm />;
  }

  let orders = [];
  let loadError = null;
  try {
    orders = await listRecentOrders();
  } catch (err) {
    loadError = err.message;
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Orders</h1>
        <form action={logout}>
          <button className="text-sm text-ink/60 hover:text-ink transition-colors">
            Sign out
          </button>
        </form>
      </div>

      {loadError && (
        <p className="text-red-400 text-sm mb-6">Could not load orders: {loadError}</p>
      )}

      {!loadError && orders.length === 0 && (
        <p className="text-ink/60">No paid orders yet.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-navy border border-ink/10 rounded-2xl p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{order.orderNumber}</p>
                <p className="text-ink/50 text-xs mt-0.5">
                  {new Date(order.createdAt).toLocaleString("en-GB")}
                </p>
              </div>
              <p className="font-bold">{formatPrice(order.totalCents)}</p>
            </div>

            <ul className="mt-3 text-sm text-ink/70 space-y-1">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.quantity} &times; {item.name}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-sm text-ink/70">
              <span className="text-ink/50">Ship to:</span>{" "}
              {order.address || "No address on file"}
            </p>
            <p className="text-sm text-ink/70">
              <span className="text-ink/50">Email:</span>{" "}
              {order.customerEmail || "unknown"}
            </p>

            <div className="mt-4">
              {order.outForDeliveryAt ? (
                <p className="text-teal text-sm font-semibold">
                  Out for delivery — customer emailed{" "}
                  {new Date(order.outForDeliveryAt).toLocaleDateString("en-GB")}
                </p>
              ) : (
                <MarkDeliveredButton sessionId={order.id} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
