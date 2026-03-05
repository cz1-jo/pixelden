"use client";

import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { getOrdersByEmail } = useOrders();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/checkout");
  }, [user, router]);

  if (!user) {
    return null;
  }

  const orders = getOrdersByEmail(user.email);

  const statusColor: Record<string, string> = {
    Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
          My Profile
        </span>
      </h1>

      {/* User Card */}
      <div className="bg-dark-card border border-white/5 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center text-neon-purple font-bold text-xl">
            {user.avatar}
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-600 mt-1">
              Member since {new Date(user.joinedAt).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="text-sm text-gray-500 hover:text-neon-pink transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Order History */}
      <h2 className="text-xl font-bold text-white mb-4">Order History</h2>

      {orders.length === 0 ? (
        <div className="bg-dark-card border border-white/5 rounded-xl p-10 text-center">
          <p className="text-gray-400 mb-2">No orders yet.</p>
          <Link href="/games" className="text-neon-cyan text-sm hover:underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-dark-card border border-white/5 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-gray-500 font-mono">{order.id}</span>
                  <span className="text-gray-400">{new Date(order.date).toLocaleDateString("en-ZA")}</span>
                  <span className="text-gray-400">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-neon-cyan">R{order.total.toFixed(2)}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${expandedOrder === order.id ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expandedOrder === order.id && (
                <div className="border-t border-white/5 px-4 py-3 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {item.title} <span className="text-gray-600">×{item.quantity}</span>
                      </span>
                      <span className="text-gray-400">R{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/5 pt-2 flex justify-between text-xs text-gray-500">
                    <span>Subtotal: R{order.subtotal.toFixed(2)}</span>
                    <span>VAT: R{order.vat.toFixed(2)}</span>
                    <span className="font-bold text-white">Total: R{order.total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
