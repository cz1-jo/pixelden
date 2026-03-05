"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import Link from "next/link";

type Tab = "login" | "signup";

export default function CheckoutPage() {
  const { user, signIn, signOut } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [tab, setTab] = useState<Tab>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleGoogleSSO() {
    // Simulated Google SSO — in production, use NextAuth / Firebase Auth
    signIn({
      name: "Gamer",
      email: "gamer@gmail.com",
      avatar: "G",
    });
  }

  function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    signIn({
      name: name || email.split("@")[0],
      email,
      avatar: (name || email)[0].toUpperCase(),
    });
  }

  function handlePlaceOrder() {
    if (user) {
      const vat = totalPrice * 0.15;
      const total = totalPrice + vat;
      placeOrder(user, items, totalPrice, vat, total);
    }
    setOrderPlaced(true);
    clearCart();
  }

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="bg-dark-card border border-neon-cyan/30 rounded-2xl p-10 neon-glow-cyan">
          <div className="text-5xl mb-4">&#x2713;</div>
          <h1 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h1>
          <p className="text-gray-400 mb-2">
            Thank you, {user?.name}. Your order has been placed.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            A confirmation email has been sent to {user?.email}.
          </p>
          <Link
            href="/games"
            className="inline-flex items-center px-6 py-3 bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold rounded-lg transition-all neon-glow-purple"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // If not logged in, show auth form
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-center">
          <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
            Checkout
          </span>
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Sign in or create an account to complete your order.
        </p>

        {/* Google SSO */}
        <button
          onClick={handleGoogleSSO}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-lg transition-all duration-200 mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-500 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-dark-card rounded-lg border border-white/5 p-1">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              tab === "login"
                ? "bg-neon-purple text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              tab === "signup"
                ? "bg-neon-purple text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {tab === "signup" && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:border-neon-purple focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:border-neon-purple focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-gray-200 focus:border-neon-purple focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold rounded-lg transition-all duration-200 neon-glow-purple"
          >
            {tab === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <p className="text-xs text-gray-600 text-center mt-6">
          By continuing, you agree to PixelDen&apos;s Terms of Service and Privacy Policy.
        </p>

        {/* Admin Login */}
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              signIn({
                name: "Admin",
                email: "admin@pixelden.gg",
                avatar: "A",
                role: "admin",
              });
            }}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Admin Login
          </button>
        </div>
      </div>
    );
  }

  // Logged in — show order review
  const vat = totalPrice * 0.15;
  const total = totalPrice + vat;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
          Review Order
        </span>
      </h1>

      {/* User info */}
      <div className="bg-dark-card border border-white/5 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center text-neon-purple font-bold text-sm">
            {user.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="text-xs text-gray-500 hover:text-neon-pink transition-colors"
        >
          Sign out
        </button>
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="bg-dark-card border border-white/5 rounded-xl p-8 text-center mb-6">
          <p className="text-gray-400">Your cart is empty.</p>
          <Link href="/games" className="text-neon-cyan text-sm hover:underline mt-2 inline-block">
            Browse games
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-dark-card border border-white/5 rounded-xl divide-y divide-white/5 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-neon-cyan">
                  R{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="bg-dark-card border border-white/5 rounded-xl p-4 mb-8 space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Subtotal</span>
              <span>R{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Shipping</span>
              <span className="text-neon-cyan">Free</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>VAT (15%)</span>
              <span>R{vat.toFixed(2)}</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-neon-cyan">R{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 bg-neon-purple hover:bg-neon-purple/80 text-white font-bold text-lg rounded-xl transition-all duration-200 neon-glow-purple"
          >
            Place Order — R{total.toFixed(2)}
          </button>
        </>
      )}
    </div>
  );
}
