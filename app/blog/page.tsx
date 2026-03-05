import Link from "next/link";
import posts from "@/data/blog.json";

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-2">
        <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Blog
        </span>
      </h1>
      <p className="text-gray-400 mb-12">
        The latest news, guides, and deep dives on the games you love.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-dark-card border border-white/5 rounded-2xl overflow-hidden hover:border-neon-purple/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="aspect-video bg-gradient-to-br from-neon-purple/20 via-dark-card to-neon-cyan/20 flex items-center justify-center">
              <span className="text-4xl opacity-60 group-hover:opacity-100 transition-opacity">
                {post.tags[0] === "GTA VI" && "🌴"}
                {post.tags[0] === "Ghost of Yōtei" && "⚔️"}
                {post.tags[0] === "Monster Hunter" && "🐉"}
                {post.tags[0] === "Doom" && "🔥"}
                {post.tags[0] === "Split Fiction" && "🎮"}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-gray-500">{post.date}</span>
                <span className="text-xs text-gray-500">{post.readTime}</span>
              </div>
              <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-neon-purple transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400 line-clamp-3">{post.excerpt}</p>
              <div className="flex gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
