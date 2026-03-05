"use client";

import { useAuth } from "@/context/AuthContext";
import { useOrders, Order } from "@/context/OrderContext";
import { useState } from "react";
import Link from "next/link";

type Filter = "All" | "Pending" | "Processing" | "Shipped" | "Delivered";

export default function AdminPage() {
  const { user } = useAuth();
  const { getAllOrders, updateOrderStatus } = useOrders();
  const [filter, setFilter] = useState<Filter>("All");

  if (!user || user.role !== "admin") {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="bg-dark-card border border-neon-pink/30 rounded-2xl p-10">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-6">You need admin privileges to view this page.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold rounded-lg transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const allOrders = getAllOrders();
  const filtered = filter === "All" ? allOrders : allOrders.filter((o) => o.status === filter);

  const totalRevenue = allOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingCount = allOrders.filter((o) => o.status === "Pending").length;

  const statuses: Order["status"][] = ["Pending", "Processing", "Shipped", "Delivered"];
  const filters: Filter[] = ["All", ...statuses];

  const statusColor: Record<string, string> = {
    Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
          Admin Console
        </span>
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-dark-card border border-white/5 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-white">{allOrders.length}</p>
        </div>
        <div className="bg-dark-card border border-white/5 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-neon-cyan">R{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-dark-card border border-white/5 rounded-xl p-5">
          <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
          <p className="text-2xl font-bold text-yellow-400">{pendingCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
              filter === f
                ? "bg-neon-purple/20 text-neon-purple border-neon-purple/30"
                : "text-gray-400 border-white/10 hover:border-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      {filtered.length === 0 ? (
        <div className="bg-dark-card border border-white/5 rounded-xl p-10 text-center">
          <p className="text-gray-400">No orders found.</p>
        </div>
      ) : (
        <div className="bg-dark-card border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 text-left">
                  <th className="px-4 py-3 font-medium">Order ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Items</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-gray-300">{order.id}</td>
                    <td className="px-4 py-3">
                      <p className="text-white">{order.userName}</p>
                      <p className="text-xs text-gray-500">{order.userEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {new Date(order.date).toLocaleDateString("en-ZA")}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{order.items.reduce((s, i) => s + i.quantity, 0)}</td>
                    <td className="px-4 py-3 font-bold text-neon-cyan">R{order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                        className={`text-xs px-2 py-1 rounded-full border bg-transparent cursor-pointer focus:outline-none ${statusColor[order.status]}`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s} className="bg-dark-base text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
