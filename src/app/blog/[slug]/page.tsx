import { posts } from "@/data/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Simple Header */}
            <div className="bg-apex-navy h-20"></div>

            <article className="max-w-3xl mx-auto px-6 py-16">
                <Link href="/blog" className="text-neutral-400 hover:text-apex-navy text-sm font-bold flex items-center mb-8">
                    ← BACK TO INTEL
                </Link>

                <header className="mb-10">
                    <div className="flex gap-4 items-center text-sm text-neutral-500 mb-4">
                        <span className="text-apex-gold font-bold uppercase">{post.category}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {post.title}
                    </h1>
                    <p className="text-xl text-neutral-600 leading-relaxed border-l-4 border-apex-gold pl-6 italic">
                        {post.excerpt}
                    </p>
                </header>

                {/* Content Body - Implementing simple HTML rendering for now */}
                <div
                    className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-headings:text-apex-navy prose-a:text-apex-gold"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* CTA Footer */}
                <div className="mt-16 p-8 bg-neutral-50 rounded-2xl border border-neutral-100 text-center">
                    <h3 className="text-2xl font-bold text-apex-navy mb-2">Need a Fortress Inspection?</h3>
                    <p className="text-neutral-600 mb-6">Our experts can identify these threats in under 20 minutes.</p>
                    <Link href="/" className="inline-block bg-apex-gold hover:bg-apex-gold-hover text-apex-navy font-bold py-3 px-8 rounded-lg transition shadow-lg">
                        Get Protected
                    </Link>
                </div>
            </article>
        </div>
    );
}
