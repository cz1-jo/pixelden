"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import accessories from "@/data/accessories.json";

const types = ["All", ...Array.from(new Set(accessories.map((a) => a.type)))];
const brands = ["All", ...Array.from(new Set(accessories.map((a) => a.brand)))];

export default function AccessoriesPage() {
  const [type, setType] = useState("All");
  const [brand, setBrand] = useState("All");

  const filtered = accessories.filter((a) => {
    if (type !== "All" && a.type !== type) return false;
    if (brand !== "All" && a.brand !== brand) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-2">
        Gaming{" "}
        <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
          Accessories
        </span>
      </h1>
      <p className="text-gray-400 mb-8">Controllers, headsets, mice, and more.</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-dark-card border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-neon-purple focus:outline-none"
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Brand</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="bg-dark-card border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-neon-purple focus:outline-none"
          >
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <ProductGrid>
        {filtered.map((acc) => (
          <ProductCard
            key={acc.id}
            id={acc.id}
            title={acc.title}
            price={acc.price}
            image={acc.image}
            description={acc.description}
            badges={[acc.type, acc.brand]}
          />
        ))}
      </ProductGrid>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">No accessories match your filters.</p>
      )}
    </div>
  );
}
