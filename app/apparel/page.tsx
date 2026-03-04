"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import apparel from "@/data/apparel.json";

const categories = ["All", ...Array.from(new Set(apparel.map((a) => a.category)))];

export default function ApparelPage() {
  const [category, setCategory] = useState("All");

  const filtered = category === "All" ? apparel : apparel.filter((a) => a.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-2">
        Gaming{" "}
        <span className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
          Apparel
        </span>
      </h1>
      <p className="text-gray-400 mb-8">Wear your game. Hoodies, tees, hats, and more.</p>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              category === cat
                ? "bg-neon-purple border-neon-purple text-white"
                : "bg-dark-card border-white/10 text-gray-300 hover:border-neon-purple/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ProductGrid>
        {filtered.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            description={item.description}
            badges={[item.category, ...item.sizes.slice(0, 2)]}
          />
        ))}
      </ProductGrid>
    </div>
  );
}
