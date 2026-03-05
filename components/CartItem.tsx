"use client";

import { useCart, CartItem as CartItemType } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 bg-dark-card rounded-xl p-4 border border-white/5">
      <div className="w-20 h-20 bg-dark-surface rounded-lg flex-shrink-0 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-100 truncate">{item.title}</h3>
        <p className="text-neon-cyan font-medium">R{item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-lg bg-dark-surface border border-white/10 flex items-center justify-center text-gray-300 hover:border-neon-purple hover:text-neon-purple transition-colors"
        >
          -
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg bg-dark-surface border border-white/10 flex items-center justify-center text-gray-300 hover:border-neon-purple hover:text-neon-purple transition-colors"
        >
          +
        </button>
      </div>

      <p className="text-lg font-bold text-gray-100 w-24 text-right">
        R{(item.price * item.quantity).toFixed(2)}
      </p>

      <button
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-gray-500 hover:text-neon-pink transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
