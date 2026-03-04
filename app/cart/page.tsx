"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import Link from "next/link";

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <svg className="w-24 h-24 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/games"
          className="inline-flex items-center px-6 py-3 bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold rounded-lg transition-all neon-glow-purple"
        >
          Browse Games
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">
        Your{" "}
        <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
          Cart
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-dark-card rounded-xl p-6 border border-white/5 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span className="text-neon-cyan">Free</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Tax</span>
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-neon-cyan">${(totalPrice * 1.08).toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full py-3 bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold rounded-lg transition-all duration-200 neon-glow-purple mb-3">
            Checkout
          </button>
          <button
            onClick={clearCart}
            className="w-full py-3 border border-white/10 text-gray-400 hover:text-neon-pink hover:border-neon-pink/50 font-medium rounded-lg transition-all duration-200"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
