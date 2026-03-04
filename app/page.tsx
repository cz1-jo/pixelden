import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import VideoSection from "@/components/VideoSection";
import CollectionBanner from "@/components/CollectionBanner";
import games from "@/data/games.json";
import accessories from "@/data/accessories.json";

export default function HomePage() {
  const featuredGames = games.filter((g) => g.featured);
  const spotlightAccessories = accessories.slice(0, 4);

  return (
    <>
      <Hero />

      {/* Featured Games */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-2">
          Featured{" "}
          <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Games
          </span>
        </h2>
        <p className="text-gray-400 mb-8">Top picks this season.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGames.map((game) => (
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
        </div>
      </section>

      <VideoSection />
      <CollectionBanner />

      {/* Accessories Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-2">
          Gear{" "}
          <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            Spotlight
          </span>
        </h2>
        <p className="text-gray-400 mb-8">Upgrade your setup with pro-grade accessories.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {spotlightAccessories.map((acc) => (
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
        </div>
      </section>
    </>
  );
}
