import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-dark-base to-neon-cyan/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight">
            <span className="block text-white">Level Up Your</span>
            <span className="block bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
              Gaming Experience
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the latest games, premium apparel, and pro-grade accessories.
            Everything a gamer needs, all in one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/games"
              className="inline-flex items-center justify-center px-8 py-3 bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold rounded-lg transition-all duration-200 neon-glow-purple"
            >
              Browse Games
            </Link>
            <Link
              href="/accessories"
              className="inline-flex items-center justify-center px-8 py-3 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 font-semibold rounded-lg transition-all duration-200"
            >
              Shop Gear
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
