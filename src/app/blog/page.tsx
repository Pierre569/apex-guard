import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import { Shield, ArrowRight, Calendar, User, Clock } from 'lucide-react';

export default function BlogIndex() {
    const posts = getBlogPosts();
    const featuredPost = posts[0];
    const regularPosts = posts.slice(1);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200">
            {/* Hero Header */}
            <header className="relative bg-apex-navy pt-32 pb-20 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat opacity-20"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apex-gold/20 text-apex-gold text-xs font-bold uppercase tracking-wider mb-6 border border-apex-gold/30">
                        <Shield size={12} />
                        Apex Guard Intelligence
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        Protecting Your <span className="text-apex-gold">Sanctuary.</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Expert insights, local alerts, and seasonal strategies to keep your home pest-free and secure.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 pb-20">
                {/* Featured Post */}
                {featuredPost && (
                    <div className="mb-16">
                        <Link href={`/blog/${featuredPost.slug}`} className="group block">
                            <article className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-white/10 grid md:grid-cols-2">
                                <div className="h-64 md:h-auto bg-slate-200 dark:bg-white/5 relative overflow-hidden">
                                    {/* In a real app, use next/image with the post.image property */}
                                    <div className="absolute inset-0 flex items-center justify-center text-8xl group-hover:scale-105 transition duration-700 opacity-50">
                                        📰
                                    </div>
                                    <div className="absolute top-4 left-4 bg-apex-gold text-apex-navy font-bold px-3 py-1 rounded-lg text-xs shadow-lg">
                                        FEATURED STORY
                                    </div>
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(featuredPost.date).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> 5 min read</span>
                                    </div>
                                    <h2 className="text-3xl font-black mb-4 group-hover:text-apex-gold transition duration-300 leading-tight">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center text-apex-gold font-bold group-hover:translate-x-2 transition">
                                        Read Full Article <ArrowRight size={18} className="ml-2" />
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </div>
                )}

                {/* Grid Layout */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                            <article className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-slate-100 dark:border-white/10 h-full flex flex-col">
                                <div className="h-56 bg-slate-100 dark:bg-white/5 relative overflow-hidden group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition">
                                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:scale-110 transition duration-500">
                                        📄
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-xs font-bold text-apex-gold uppercase mb-3 tracking-wide">
                                        <div className="w-2 h-2 rounded-full bg-apex-gold"></div>
                                        Safety Guide
                                    </div>
                                    <h2 className="text-xl font-bold mb-3 group-hover:text-apex-gold transition leading-snug">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-6 border-t border-slate-100 dark:border-white/10">
                                        <span>{new Date(post.date).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1 text-slate-500 dark:text-slate-300">
                                            Read More <ArrowRight size={12} />
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
