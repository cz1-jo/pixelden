"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  badges?: string[];
}

export default function ProductCard({ id, title, price, image, description, badges }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-dark-card rounded-xl overflow-hidden card-hover group border border-white/5">
      <Link href={id.startsWith("game-") ? `/games/${id}` : "#"} className="block">
        <div className="aspect-[4/3] bg-dark-surface relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-neon-purple/0 group-hover:bg-neon-purple/10 transition-colors duration-300" />
        </div>

        <div className="p-4">
          {badges && badges.length > 0 && (
            <div className="flex gap-2 mb-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="text-xs px-2 py-0.5 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-semibold text-gray-100 group-hover:text-neon-purple transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{description}</p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-neon-cyan">
            {price === 0 ? "Free" : `R${price.toFixed(2)}`}
          </span>
          <button
            onClick={() => addToCart({ id, title, price, image })}
            className="px-4 py-2 bg-neon-purple/20 hover:bg-neon-purple text-neon-purple hover:text-white text-sm font-medium rounded-lg transition-all duration-200 border border-neon-purple/30 hover:border-neon-purple"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
