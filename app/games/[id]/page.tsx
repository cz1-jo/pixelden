"use client";

import Link from "next/link";
import games from "@/data/games.json";
import { useCart } from "@/context/CartContext";
import { notFound } from "next/navigation";

export default function GameDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const game = games.find((g) => g.id === id);
  const { addToCart } = useCart();

  if (!game) return notFound();

  const longDesc = (game as any).longDescription as string[] | undefined;
  const features = (game as any).features as string[] | undefined;
  const developer = (game as any).developer as string | undefined;
  const releaseDate = (game as any).releaseDate as string | undefined;
  const rating = (game as any).rating as string | undefined;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/games"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-neon-cyan transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Games
      </Link>

      {/* Hero section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image placeholder */}
        <div className="aspect-[4/3] bg-dark-card rounded-2xl border border-white/5 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
            <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="flex gap-2 mb-3">
            <span className="text-xs px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
              {game.genre}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30">
              {game.platform}
            </span>
            {rating && (
              <span className="text-xs px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink border border-neon-pink/30">
                {rating}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {game.title}
          </h1>

          <p className="text-gray-400 text-lg mb-6">{game.description}</p>

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            {developer && (
              <div>
                <span className="text-gray-500 block">Developer</span>
                <span className="text-gray-200">{developer}</span>
              </div>
            )}
            {releaseDate && (
              <div>
                <span className="text-gray-500 block">Release Date</span>
                <span className="text-gray-200">
                  {new Date(releaseDate).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
            )}
          </div>

          {/* Price + Add to Cart */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-neon-cyan">
              {game.price === 0 ? "Free" : `R${game.price.toFixed(2)}`}
            </span>
            <button
              onClick={() => addToCart({ id: game.id, title: game.title, price: game.price, image: game.image })}
              className="px-8 py-3 bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold rounded-lg transition-all duration-200 neon-glow-purple"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      {features && features.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Key Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="bg-dark-card border border-white/5 rounded-xl p-4 text-center hover:border-neon-purple/20 transition-colors"
              >
                <p className="text-sm font-medium text-gray-200">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Long description */}
      {longDesc && longDesc.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">About This Game</h2>
          <div className="space-y-4">
            {longDesc.map((paragraph, i) => (
              <p key={i} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-dark-card border border-white/5 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Ready to play?</h3>
        <p className="text-gray-400 mb-6">Add {game.title} to your cart and check out.</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => addToCart({ id: game.id, title: game.title, price: game.price, image: game.image })}
            className="px-8 py-3 bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold rounded-lg transition-all duration-200 neon-glow-purple"
          >
            Add to Cart — {game.price === 0 ? "Free" : `R${game.price.toFixed(2)}`}
          </button>
          <Link
            href="/games"
            className="px-8 py-3 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 font-medium rounded-lg transition-all"
          >
            Browse More
          </Link>
        </div>
      </div>
    </div>
  );
}
