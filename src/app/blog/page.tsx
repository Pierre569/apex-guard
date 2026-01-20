import Link from "next/link";
import { posts } from "@/data/posts";

export default function BlogListing() {
    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            {/* Page Header */}
            <div className="bg-apex-navy pt-32 pb-16 px-6 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Command Center Intel</h1>
                <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                    Tactical guides on home defense, pest identification, and value protection.
                </p>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-neutral-100">
                        <div className="h-48 bg-neutral-200 relative overflow-hidden">
                            {/* Placeholder Image - Would use real images in prod */}
                            <div className="absolute inset-0 bg-gradient-to-br from-apex-navy to-black opacity-80 group-hover:scale-105 transition duration-500"></div>
                            <div className="absolute top-4 left-4 bg-apex-gold text-apex-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {post.category}
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="text-sm text-neutral-400 mb-2">{post.date} • {post.readTime}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-apex-navy transition">
                                {post.title}
                            </h3>
                            <p className="text-neutral-500 line-clamp-3 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <div className="mt-6 flex items-center text-apex-gold font-bold text-sm uppercase tracking-wide">
                                Read Briefing <span className="ml-2 group-hover:translate-x-1 transition">→</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
