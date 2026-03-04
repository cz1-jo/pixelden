import Link from "next/link";

const collections = [
  {
    title: "New Releases",
    description: "The hottest games just dropped",
    href: "/games",
    gradient: "from-neon-purple to-indigo-600",
  },
  {
    title: "Pro Gear",
    description: "Equipment used by esports pros",
    href: "/accessories",
    gradient: "from-neon-cyan to-teal-600",
  },
  {
    title: "Street Style",
    description: "Gaming meets fashion",
    href: "/apparel",
    gradient: "from-neon-pink to-rose-600",
  },
];

export default function CollectionBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold mb-2">
        Latest{" "}
        <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
          Collections
        </span>
      </h2>
      <p className="text-gray-400 mb-8">Curated picks for every type of gamer.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Link
            key={col.title}
            href={col.href}
            className="relative group rounded-xl overflow-hidden card-hover"
          >
            <div className={`bg-gradient-to-br ${col.gradient} p-8 h-48 flex flex-col justify-end`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-white">{col.title}</h3>
                <p className="text-white/80 mt-1">{col.description}</p>
                <span className="inline-block mt-3 text-sm font-medium text-white/90 group-hover:translate-x-1 transition-transform duration-200">
                  Shop now &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
