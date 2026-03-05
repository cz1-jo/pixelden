import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "@/data/blog.json";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-neon-cyan transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>

      <div className="flex items-center gap-3 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full bg-neon-purple/10 text-neon-purple"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-10 pb-10 border-b border-white/5">
        <span>{post.author}</span>
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>

      <div className="space-y-6">
        {post.content.map((paragraph, i) => (
          <p key={i} className="text-gray-300 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-white/5">
        <Link
          href="/blog"
          className="text-neon-cyan hover:text-neon-purple transition-colors text-sm"
        >
          ← More articles
        </Link>
      </div>
    </article>
  );
}
