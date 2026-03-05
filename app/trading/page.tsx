"use client";

import { useState } from "react";

type SortKey = "rank" | "title" | "tradeValue" | "demand" | "change";
type SortDir = "asc" | "desc";

const games = [
  { rank: 1, title: "Grand Theft Auto VI", platform: "PS5", tradeValue: 1050, retail: 1299.99, demand: "Very High", change: 12, trend: "up" },
  { rank: 2, title: "Ghost of Yōtei", platform: "PS5", tradeValue: 950, retail: 1299.99, demand: "High", change: 8, trend: "up" },
  { rank: 3, title: "Monster Hunter Wilds", platform: "PC", tradeValue: 820, retail: 1099.99, demand: "High", change: -3, trend: "down" },
  { rank: 4, title: "Doom: The Dark Ages", platform: "Xbox", tradeValue: 880, retail: 1299.99, demand: "High", change: 5, trend: "up" },
  { rank: 5, title: "Death Stranding 2", platform: "PS5", tradeValue: 770, retail: 1299.99, demand: "Medium", change: -7, trend: "down" },
  { rank: 6, title: "Assassin's Creed Shadows", platform: "PC", tradeValue: 700, retail: 1299.99, demand: "Medium", change: -12, trend: "down" },
  { rank: 7, title: "Metroid Prime 4: Beyond", platform: "Switch 2", tradeValue: 920, retail: 1099.99, demand: "Very High", change: 15, trend: "up" },
  { rank: 8, title: "Civilization VII", platform: "PC", tradeValue: 650, retail: 1099.99, demand: "Medium", change: -2, trend: "down" },
  { rank: 9, title: "Split Fiction", platform: "PC", tradeValue: 520, retail: 749.99, demand: "High", change: 4, trend: "up" },
  { rank: 10, title: "Like a Dragon: Pirate Yakuza", platform: "PS5", tradeValue: 590, retail: 1099.99, demand: "Medium", change: -5, trend: "down" },
  { rank: 11, title: "Elden Ring: Nightreign", platform: "PC", tradeValue: 1000, retail: 1299.99, demand: "Very High", change: 18, trend: "up" },
  { rank: 12, title: "Pokémon Legends: Z-A", platform: "Switch 2", tradeValue: 850, retail: 1099.99, demand: "High", change: 6, trend: "up" },
  { rank: 13, title: "Marvel's Wolverine", platform: "PS5", tradeValue: 810, retail: 1299.99, demand: "High", change: 3, trend: "up" },
  { rank: 14, title: "Fable", platform: "Xbox", tradeValue: 740, retail: 1299.99, demand: "Medium", change: -1, trend: "down" },
  { rank: 15, title: "The Outer Worlds 2", platform: "Xbox", tradeValue: 660, retail: 1299.99, demand: "Medium", change: -4, trend: "down" },
];

const demandColor: Record<string, string> = {
  "Very High": "text-neon-cyan",
  "High": "text-neon-purple",
  "Medium": "text-gray-400",
  "Low": "text-gray-600",
};

const demandDot: Record<string, string> = {
  "Very High": "bg-neon-cyan",
  "High": "bg-neon-purple",
  "Medium": "bg-gray-500",
  "Low": "bg-gray-700",
};

export default function TradingPage() {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "title" ? "asc" : "desc");
    }
  }

  const sorted = [...games].sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortKey === "title") return mul * a.title.localeCompare(b.title);
    if (sortKey === "demand") {
      const order = ["Low", "Medium", "High", "Very High"];
      return mul * (order.indexOf(a.demand) - order.indexOf(b.demand));
    }
    return mul * ((a[sortKey] as number) - (b[sortKey] as number));
  });

  const arrow = (key: SortKey) =>
    sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-2">
        Top Selling{" "}
        <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
          Trade Values
        </span>
      </h1>
      <p className="text-gray-400 mb-4">
        Live trade-in values for the hottest games of 2025. Prices update based on market demand.
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-cyan" />
          <span className="text-gray-400">Very High Demand</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-purple" />
          <span className="text-gray-400">High Demand</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-500" />
          <span className="text-gray-400">Medium Demand</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-dark-card border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                {[
                  { key: "rank" as SortKey, label: "#" },
                  { key: "title" as SortKey, label: "Game" },
                  { key: "tradeValue" as SortKey, label: "Trade Value" },
                  { key: "demand" as SortKey, label: "Demand" },
                  { key: "change" as SortKey, label: "7d Change" },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-neon-cyan transition-colors select-none"
                  >
                    {col.label}{arrow(col.key)}
                  </th>
                ))}
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Retail
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Savings
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((game, i) => {
                const savings = Math.round(((game.retail - game.tradeValue) / game.retail) * 100);
                return (
                  <tr
                    key={game.rank}
                    className={`border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors ${
                      i < 3 ? "bg-white/[0.01]" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${i < 3 ? "text-neon-cyan" : "text-gray-500"}`}>
                        {game.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-sm font-medium text-white">{game.title}</span>
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
                          {game.platform}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-white">R{game.tradeValue}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${demandDot[game.demand]}`} />
                        <span className={`text-sm ${demandColor[game.demand]}`}>
                          {game.demand}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-medium ${
                          game.change > 0 ? "text-green-400" : game.change < 0 ? "text-red-400" : "text-gray-500"
                        }`}
                      >
                        {game.change > 0 ? "+" : ""}
                        {game.change}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">R{game.retail}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-400/10 text-green-400">
                        Save {savings}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-600 mt-4">
        Trade values are estimates based on current market demand and may vary at time of trade.
        Last updated: March 2025.
      </p>
    </div>
  );
}
