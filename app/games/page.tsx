"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import games from "@/data/games.json";

const genres = ["All", ...Array.from(new Set(games.map((g) => g.genre)))];
const platforms = ["All", ...Array.from(new Set(games.map((g) => g.platform)))];

export default function GamesPage() {
  const [genre, setGenre] = useState("All");
  const [platform, setPlatform] = useState("All");

  const filtered = games.filter((g) => {
    if (genre !== "All" && g.genre !== genre) return false;
    if (platform !== "All" && g.platform !== platform) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-2">
        All{" "}
        <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Games
        </span>
      </h1>
      <p className="text-gray-400 mb-8">Browse our full catalog of games.</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-dark-card border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-neon-purple focus:outline-none"
          >
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="bg-dark-card border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-neon-purple focus:outline-none"
          >
            {platforms.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <ProductGrid>
        {filtered.map((game) => (
          <ProductCard
            key={game.id}
            id={game.id}
            title={game.title}
            price={game.price}
            image={game.image}
            description={game.description}
            badges={[game.genre, game.platform]}
          />
        ))}
      </ProductGrid>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">No games match your filters.</p>
      )}
    </div>
  );
}
